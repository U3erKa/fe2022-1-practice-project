import type {
  Attributes,
  CreationAttributes,
  Transaction,
  WhereOptions,
} from 'sequelize';
import { Rating } from 'models';
import ServerError from 'errors/ServerError';
import type { Rating as _Rating } from 'types/models';
import type { ModelUpdateAttributes } from 'types/models';

export const updateRating = async (
  data: ModelUpdateAttributes<_Rating>,
  predicate: WhereOptions<Attributes<_Rating>>,
  transaction?: Transaction,
) => {
  const [updatedCount, [updatedRating]] = await Rating.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update mark on this offer');
  }
  return updatedRating!.dataValues;
};

export const createRating = async (
  data: CreationAttributes<_Rating>,
  transaction?: Transaction,
) => {
  const result = await Rating.create(data, { transaction });
  if (!result) {
    throw new ServerError('cannot mark offer');
  } else {
    return result.get({ plain: true });
  }
};
