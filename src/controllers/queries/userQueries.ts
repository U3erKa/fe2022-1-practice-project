import type {
  Attributes,
  CreationAttributes,
  Transaction,
  WhereOptions,
} from 'sequelize';
import { User } from 'models';
import type { UserId } from 'types';
import ServerError from 'errors/ServerError';
import NotFound from 'errors/UserNotFoundError';
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
    throw new NotFound('user with this data didn`t exist');
  }
  return user.get({ plain: true });
};

export const userCreation = async (data: CreationAttributes<_User>) => {
  const newUser = await User.create(data);
  if (!newUser) {
    throw new ServerError('server error on user creation');
  }
  return newUser.get({ plain: true });
};
