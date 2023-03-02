import { Sequelize } from '../models';
import * as CONSTANTS from '../constants';

export const createWhereForAllContests = ({
  typeIndex,
  contestId,
  industry,
  awardSort,
}) => {
  const where = {};
  const order = [];

  if (typeIndex) {
    Object.assign(where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(where, { id: contestId });
  }
  if (industry) {
    Object.assign(where, { industry });
  }
  if (awardSort) {
    order.push(['prize', awardSort]);
  }
  Object.assign(where, {
    status: {
      [Sequelize.Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });

  order.push(['id', 'desc']);
  return { where, order };
};

export const createWhereForCustomerContests = ({ status, userId }) => {
  const where = {};
  const order = [];

  if (status) {
    Object.assign(where, { status });
  }
  if (userId) {
    Object.assign(where, { userId });
  }
  order.push(['id', 'desc']);

  return { where, order };
};

function getPredicateTypes(index) {
  return { [Sequelize.Op.or]: [types[index].split(',')] };
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
