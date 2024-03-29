import { NextResponse, type NextRequest } from 'next/server';
import { Op } from 'sequelize';
import { NotFoundError, RightsError } from 'errors';
import { Contest, Offer, Rating, User } from 'models';
import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CREATOR,
  CUSTOMER,
  OFFER_STATUS_DISCARDED,
  OFFER_STATUS_PENDING,
} from 'constants/general';
import { updateContest } from 'controllers/queries/contestQueries';
import { verifyAccessToken } from 'services/jwtService';
import { uploadFile } from 'utils/backend';
import handleError from 'utils/handleError';
import type { Context } from 'types/_common';
import type { Offer as _Offer, Rating as _Rating } from 'types/models';

type RouteContext = Context<{
  contestId: `${number}`;
}>;

export async function GET(
  req: NextRequest,
  { params: { contestId } }: RouteContext,
) {
  try {
    const { headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { role, userId } = await verifyAccessToken(authorization);

    let result: number;
    switch (role) {
      case CUSTOMER: {
        result = await Contest.count({
          where: { id: contestId, userId },
        });
        break;
      }
      case CREATOR: {
        result = await Contest.count({
          where: {
            id: contestId,
            status: {
              [Op.or]: [CONTEST_STATUS_ACTIVE, CONTEST_STATUS_FINISHED],
            },
          },
        });
        break;
      }
      default: {
        throw new RightsError();
      }
    }

    if (!result) throw new NotFoundError('Contests not found');

    const contests = await Contest.findOne({
      where: { id: contestId },
      order: [[Offer, 'id', 'asc']],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['accessToken', 'balance', 'password', 'role'],
          },
        },
        {
          model: Offer,
          required: false,
          where:
            role === CREATOR
              ? { userId }
              : {
                  status: {
                    [Op.and]: [
                      { [Op.ne]: OFFER_STATUS_PENDING },
                      { [Op.ne]: OFFER_STATUS_DISCARDED },
                    ],
                  },
                },
          attributes: { exclude: ['contestId', 'userId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ['accessToken', 'balance', 'password', 'role'],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId },
              attributes: { exclude: ['offerId', 'userId'] },
            },
          ],
        },
      ],
    });

    if (!contests) throw new NotFoundError('Contests not found');

    const contestInfo = contests.get({ plain: true });
    type ContestInfo = typeof contestInfo & {
      Offers: (_Offer & { Rating: _Rating })[];
    };

    for (const offer of (contestInfo as ContestInfo).Offers) {
      if (offer.Rating) Object.assign(offer, { mark: offer.Rating.mark });
      // @ts-expect-error
      delete offer.Rating;
    }
    return NextResponse.json(contestInfo as ContestInfo, { status: 200 });
  } catch (e) {
    return handleError(e);
  }
}

export async function PUT(
  req: NextRequest,
  { params: { contestId } }: RouteContext,
) {
  try {
    const { headers, formData } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const body = await formData();
    const { file, ...restBody } = Object.fromEntries(body);

    const result = await Contest.findOne({
      where: {
        id: contestId,
        status: { [Op.not]: CONTEST_STATUS_FINISHED },
        userId,
      },
    });
    if (!result) throw new RightsError();

    if (file instanceof File) {
      const fileData = await uploadFile(file);
      Object.assign(restBody, fileData);
    }

    const updatedContest = await updateContest(restBody, {
      id: contestId,
      userId,
    });

    return NextResponse.json(updatedContest, { status: 200 });
  } catch (e) {
    return handleError(e);
  }
}
