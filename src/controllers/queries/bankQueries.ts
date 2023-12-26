import type { Attributes, Transaction, WhereOptions } from 'sequelize';
import { Bank } from 'models';
import BankDeclineError from 'errors/BankDeclineError';
import type { ModelUpdateAttributes, Bank as _Bank } from 'types/models';

export const updateBankBalance = async (
  data: ModelUpdateAttributes<_Bank>,
  predicate: WhereOptions<Attributes<_Bank>>,
  transaction?: Transaction,
) => {
  const [updatedCount, [updatedBank]] = await Bank.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount < 2) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
