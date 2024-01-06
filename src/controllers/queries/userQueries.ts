import type {
  Attributes,
  CreationAttributes,
  Transaction,
  WhereOptions,
} from 'sequelize';
import { NotFoundError, ServerError } from 'errors';
import { User } from 'models';
import type { UserId } from 'types/_common';
import type { ModelUpdateAttributes, User as _User } from 'types/models';

export const updateUser = async (
  data: ModelUpdateAttributes<_User>,
  userId: UserId,
  transaction?: Transaction,
) => {
  const [updatedCount, [updatedUser]] = await User.update(data, {
    where: { id: userId },
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update user');
  }
  return updatedUser!.dataValues;
};

export const findUser = async (
  predicate: WhereOptions<Attributes<_User>>,
  transaction?: Transaction,
) => {
  const user = await User.findOne({ where: predicate, transaction });
  if (!user) {
    throw new NotFoundError('user with this data didn`t exist');
  }
  return user.get({ plain: true });
};
