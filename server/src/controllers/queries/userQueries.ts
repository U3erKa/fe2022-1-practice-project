import type {
  Attributes,
  CreationAttributes,
  Transaction,
  WhereOptions,
} from 'sequelize';
import { User } from 'models';
import NotFound from 'errors/UserNotFoundError';
import ServerError from 'errors/ServerError';
import type { ModelUpdateAttributes, User as _User } from 'types/models';
import type { UserId } from 'types';

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
  return updatedUser.dataValues;
};

export const findUser = async (
  predicate: WhereOptions<Attributes<_User>>,
  transaction?: Transaction,
) => {
  const result = await User.findOne({ where: predicate, transaction });
  if (!result) {
    throw new NotFound('user with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

export const userCreation = async (data: CreationAttributes<_User>) => {
  const newUser = await User.create(data);
  if (!newUser) {
    throw new ServerError('server error on user creation');
  } else {
    return newUser.get({ plain: true });
  }
};
