import { Contest, Offer } from '../../models';
import ServerError from '../../errors/ServerError';
import type {
  Attributes,
  CreationAttributes,
  InferAttributes,
  Transaction,
  WhereOptions,
} from 'sequelize';
import type {
  ModelUpdateAttributes,
  Contest as _Contest,
  Offer as _Offer,
} from '../../types/models';

export const updateContest = async (
  data: ModelUpdateAttributes<_Contest>,
  predicate: WhereOptions<Attributes<_Contest>>,
  transaction?: Transaction,
) => {
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

export const updateOffer = async (
  data: ModelUpdateAttributes<_Offer>,
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
  data: ModelUpdateAttributes<_Offer>,
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

export const createOffer = async (data: CreationAttributes<_Offer>) => {
  const result = await Offer.create(data);
  if (!result) {
    throw new ServerError('cannot create new Offer');
  } else {
    return result.get({ plain: true });
  }
};
