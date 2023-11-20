import { type NextRequest, NextResponse } from 'next/server';
import { Contest, Offer } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import {
  createWhereForAllContests,
  createWhereForCustomerContests,
} from 'utils/db';
import { CREATOR, CUSTOMER } from 'constants/general';
import RightsError from 'errors/RightsError';
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

    const offset = +(searchParams.get('offset') ?? 0);
    const limit = +(searchParams.get('limit') ?? 8);
    const typeIndex = searchParams.get('typeIndex');
    const contestId = searchParams.get('contestId');
    const industry = searchParams.get('industry');
    const awardSort = searchParams.get('awardSort');
    const ownEntries = searchParams.get('ownEntries') === 'true';

    let predicates: ReturnType<
      typeof createWhereForAllContests | typeof createWhereForCustomerContests
    >;
    let isRequiredOffer: boolean;
    const offerFilter = {};

    switch (role) {
      case CREATOR: {
        const sellerParams = { typeIndex, contestId, industry, awardSort };

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
          model: Offer,
          required: isRequiredOffer,
          where: offerFilter,
          attributes: ['id'],
        },
      ],
    });

    const contestsCount = await Contest.count({
      where: predicates.where as any,
    });

    contests.forEach(
      (contest) =>
        // @ts-expect-error
        (contest.dataValues.count = contest.dataValues.Offers.length),
    );
    const haveMore = contestsCount > offset + contests.length;

    return NextResponse.json({ contests, haveMore }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
