import { type NextRequest, NextResponse } from 'next/server';
import { Op } from 'sequelize';
import { Contest, Offer, Rating, User } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';
import NotFoundError from 'errors/NotFoundError';
import RightsError from 'errors/RightsError';
import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CREATOR,
  CUSTOMER,
  OFFER_STATUS_DISCARDED,
  OFFER_STATUS_PENDING,
} from 'constants/general';
import type { Context } from 'types/api/_common';

export const GET = async function (
  req: NextRequest,
  { params: { contestId } }: Context<{ contestId: `${number}` }>,
) {
  try {
    const { headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { role, userId } = await verifyAccessToken(authorization);

    let result: number | boolean = [CUSTOMER, CREATOR].includes(role);
    if (!result) throw new RightsError();

    switch (role) {
      case CUSTOMER: {
        result = await Contest.count({
          where: { id: contestId, userId: userId },
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
            exclude: ['password', 'role', 'balance', 'accessToken'],
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
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });

    if (!contests) throw new NotFoundError('Contests not found');

    const contestInfo = contests.get({ plain: true });
    // @ts-expect-error
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    return NextResponse.json(contestInfo, { status: 200 });
  } catch (e) {
    return handleError(e);
  }
};
