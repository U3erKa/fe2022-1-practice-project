import { NextResponse, type NextRequest } from 'next/server';
import { Op, type Attributes, type WhereOptions } from 'sequelize';
import { NotFoundError, RightsError } from 'errors';
import { Contest, Offer, User } from 'models';
import {
  MODERATOR,
  OFFER_STATUS_APPROVED,
  OFFER_STATUS_DISCARDED,
  OFFER_STATUS_PENDING,
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_WON,
} from 'constants/general';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';
import type { Contest as _Contest, Offer as _Offer } from 'types/models';

export async function GET(req: NextRequest) {
  try {
    const { headers, nextUrl } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { role } = await verifyAccessToken(authorization);
    if (role !== MODERATOR)
      throw new RightsError('This page is only for moderators');

    const { searchParams } = nextUrl;
    const isReviewed = searchParams.get('isReviewed') === 'true';
    const limit = +(searchParams.get('limit') ?? 8);
    const offset = +(searchParams.get('offset') ?? 0);

    const where: WhereOptions<Attributes<_Offer>> = {
      [Op.or]: isReviewed
        ? [
            { status: OFFER_STATUS_APPROVED },
            { status: OFFER_STATUS_DISCARDED },
            { status: OFFER_STATUS_WON },
            { status: OFFER_STATUS_REJECTED },
          ]
        : [{ status: OFFER_STATUS_PENDING }],
    };

    const offers = await Offer.findAll({
      limit,
      offset,
      where,
      include: [
        {
          model: Contest,
          required: true,
          attributes: ['contestType'],
        },
        {
          model: User,
          required: true,
          attributes: { exclude: ['accessToken', 'password'] },
        },
      ],
    });

    if (!offers.length) throw new NotFoundError('Offers not found');
    const offersCount = await Offer.count({ where });
    const haveMore = offersCount > offset + offers.length;

    type Offers = { Contest: _Contest }[] & typeof offers;
    for (const { Contest, dataValues } of offers as Offers) {
      Object.assign(dataValues, Contest.dataValues);
      // @ts-expect-error
      delete Contest.dataValues;
    }
    return NextResponse.json({ haveMore, offers });
  } catch (error) {
    return handleError(error);
  }
}
