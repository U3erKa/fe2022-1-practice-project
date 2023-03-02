import { Bank } from '../../models';
import BankDeclineError from '../../errors/BankDeclineError';

export const updateBankBalance = async (data, predicate, transaction) => {
  const [updatedCount, [updatedBank]] = await Bank.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount < 2) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
