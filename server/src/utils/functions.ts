import { Op } from 'sequelize';
import * as CONSTANTS from '../constants';
import type { OrderPredicate, SortOrder } from '../types';
import type {
  Contest,
  ContestData,
  WhereForAllContests,
  WhereForCustomerContests,
} from '../types/services';

export const createWhereForAllContests = ({
  typeIndex,
  contestId,
  industry,
  awardSort,
}: ContestData) => {
  const where = {} as WhereForAllContests;
  const order: OrderPredicate = [['id', 'desc']];

  if (typeIndex) {
    Object.assign(where, {
      contestType: getPredicateTypes(typeIndex as unknown as number),
    });
  }
  if (contestId) {
    Object.assign(where, { id: contestId });
  }
  if (industry) {
    Object.assign(where, { industry });
  }
  if (awardSort) {
    order.push(['prize', awardSort as unknown as SortOrder]);
  }
  Object.assign(where, {
    status: {
      [Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });

  return { where, order };
};

export const createWhereForCustomerContests = ({ status, userId }: Contest) => {
  const where: WhereForCustomerContests = {};
  const order: OrderPredicate = [['id', 'desc']];

  if (status) {
    Object.assign(where, { status });
  }
  if (userId) {
    Object.assign(where, { userId });
  }

  return { where, order };
};

function getPredicateTypes(index: number) {
  return { [Op.or]: [types[index].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];
