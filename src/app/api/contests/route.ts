import { type NextRequest, NextResponse } from 'next/server';
import { Contest, Offer } from 'models';
import { CREATOR, CUSTOMER } from 'constants/general';
import RightsError from 'errors/RightsError';
import { verifyAccessToken } from 'services/jwtService';
import {
  createWhereForAllContests,
  createWhereForCustomerContests,
} from 'utils/db';
import handleError from 'utils/handleError';

export async function GET(req: NextRequest) {
  try {
    const {
      headers,
      nextUrl: { searchParams },
    } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const status = headers.get('Status');
    const { role, userId } = await verifyAccessToken(authorization);

    const awardSort = searchParams.get('awardSort');
    const contestId = searchParams.get('contestId');
    const industry = searchParams.get('industry');
    const limit = +(searchParams.get('limit') ?? 8);
    const offset = +(searchParams.get('offset') ?? 0);
    const ownEntries = searchParams.get('ownEntries') === 'true';
    const typeIndex = searchParams.get('typeIndex');

    let predicates: ReturnType<
      typeof createWhereForAllContests | typeof createWhereForCustomerContests
    >;
    let isRequiredOffer: boolean;
    const offerFilter = {};

    switch (role) {
      case CREATOR: {
        const sellerParams = { awardSort, contestId, industry, typeIndex };

        predicates = createWhereForAllContests(sellerParams);
        isRequiredOffer = ownEntries;
        Object.assign(offerFilter, { userId });
        break;
      }

      case CUSTOMER: {
        const buyerParams = { status, userId };

        predicates = createWhereForCustomerContests(buyerParams);
        isRequiredOffer = false;
        break;
      }

      default: {
        throw new RightsError();
      }
    }

    const contests = await Contest.findAll({
      where: predicates.where as any,
      order: predicates.order,
      limit,
      offset,
      include: [
        {
          attributes: ['id'],
          model: Offer,
          required: isRequiredOffer,
          where: offerFilter,
        },
      ],
    });

    const contestsCount = await Contest.count({
      where: predicates.where as any,
    });

    for (const { dataValues } of contests) {
      // @ts-expect-error
      dataValues.count = dataValues.Offers.length;
    }
    const haveMore = contestsCount > offset + contests.length;

    return NextResponse.json({ contests, haveMore }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
