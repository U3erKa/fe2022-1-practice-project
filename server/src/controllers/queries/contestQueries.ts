import { Contest, Offer } from '../../models';
import ServerError from '../../errors/ServerError';
import type {
  Attributes,
  InferAttributes,
  Transaction,
  WhereOptions,
} from 'sequelize';
import type { Col, Fn, Literal } from 'sequelize/types/utils';
import type { Offer as _Offer } from '../../types/models';

export const updateContest = async (data, predicate, transaction?) => {
  const [updatedCount, [updatedContest]] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updatedContest.dataValues;
  }
};

export const updateContestStatus = async (data, predicate, transaction?) => {
  const updateResult = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updateResult[0] < 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updateResult[1][0].dataValues;
  }
};

export const updateOffer = async (
  data: {
    [key in keyof Attributes<_Offer>]?:
      | Attributes<_Offer>[key]
      | Fn
      | Col
      | Literal;
  },
  predicate: WhereOptions<InferAttributes<_Offer>>,
  transaction?: Transaction,
) => {
  const [updatedCount, [updatedOffer]] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update offer!');
  } else {
    return updatedOffer.dataValues;
  }
};

export const updateOfferStatus = async (
  data: {
    [key in keyof Attributes<_Offer>]?:
      | Attributes<_Offer>[key]
      | Fn
      | Col
      | Literal;
  },
  predicate: WhereOptions<InferAttributes<_Offer>>,
  transaction?: Transaction,
) => {
  const [approvedOffers, offers] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (!approvedOffers) {
    throw new ServerError('cannot update offer!');
  }
  return offers;
};

export const createOffer = async (data) => {
  const result = await Offer.create(data);
  if (!result) {
    throw new ServerError('cannot create new Offer');
  } else {
    return result.get({ plain: true });
  }
};
