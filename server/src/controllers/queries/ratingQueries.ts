import { Rating } from '../../models';
import ServerError from '../../errors/ServerError';

export const updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await Rating.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update mark on this offer');
  }
  return updatedRating.dataValues;
};

export const createRating = async (data, transaction) => {
  const result = await Rating.create(data, { transaction });
  if (!result) {
    throw new ServerError('cannot mark offer');
  } else {
    return result.get({ plain: true });
  }
};
