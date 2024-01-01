import type { Attributes, Transaction, WhereOptions } from 'sequelize';
import { BankDeclineError } from 'errors';
import { Bank } from 'models';
import type { ModelUpdateAttributes, Bank as _Bank } from 'types/models';

export const updateBankBalance = async (
  data: ModelUpdateAttributes<_Bank>,
  predicate: WhereOptions<Attributes<_Bank>>,
  transaction?: Transaction,
) => {
  const [updatedCount] = await Bank.update(data, {
    where: predicate,
    transaction,
  });
  if (updatedCount < 2) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
