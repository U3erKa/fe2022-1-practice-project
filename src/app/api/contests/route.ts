import { NextResponse, type NextRequest } from 'next/server';
import {
  Op,
  type Attributes,
  type InferAttributes,
  type Order,
  type WhereOptions,
} from 'sequelize';
import { RightsError } from 'errors';
import { Contest, Offer } from 'models';
import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_TYPES,
  CREATOR,
  CUSTOMER,
} from 'constants/general';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';
import type { Contest as _Contest, Offer as _Offer } from 'types/models';

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

    let where: WhereOptions<Attributes<_Contest>>;
    let order: Order;
    let isRequiredOffer: boolean;
    let offerFilter: WhereOptions<Attributes<_Offer>> | undefined;

    switch (role) {
      case CREATOR: {
        const _order = [['id', 'desc']] satisfies Order;
        if (awardSort) _order.push(['prize', awardSort]);

        where = {
          id: contestId!,
          industry: industry!,
          contestType: {
            [Op.or]: [
              CONTEST_TYPES[typeIndex as unknown as number]?.split(','),
            ],
          },
          status: {
            [Op.or]: [CONTEST_STATUS_FINISHED, CONTEST_STATUS_ACTIVE],
          },
        };

        order = _order;
        isRequiredOffer = ownEntries;
        offerFilter = { userId };
        break;
      }

      case CUSTOMER: {
        where = { status: status!, userId };
        order = [['id', 'desc']];
        isRequiredOffer = false;
        break;
      }

      default: {
        throw new RightsError();
      }
    }

    const contests = await Contest.findAll({
      where,
      order,
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

    const contestsCount = await Contest.count({ where });

    for (const { dataValues } of contests as _Contests) {
      dataValues.count = dataValues.Offers.length;
    }
    const haveMore = contestsCount > offset + contests.length;

    return NextResponse.json({ contests, haveMore } as Response, {
      status: 200,
    });

    type DataValues = { Offers: InferAttributes<_Offer>[]; count: number };
    type _Contests = ((typeof contests)[number] & { dataValues: DataValues })[];
    type Response = { contests: _Contests; haveMore: typeof haveMore };
  } catch (error) {
    return handleError(error);
  }
}
