import { NextRequest, NextResponse } from 'next/server';
import { Op } from 'sequelize';
import { sequelize } from 'models';
import {
  SQUADHELP_BANK_CVC,
  SQUADHELP_BANK_EXPIRY,
  SQUADHELP_BANK_NUMBER,
} from 'constants/backend';
import { CREATOR } from 'constants/general';
import { updateBankBalance } from 'controllers/queries/bankQueries';
import { updateUser } from 'controllers/queries/userQueries';
import RightsError from 'errors/RightsError';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  const transaction = await sequelize.transaction();

  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { role, userId } = await verifyAccessToken(authorization);
    const { number, expiry, cvc, sum } = await json();
    if (role !== CREATOR) {
      throw new RightsError('This page is only for creators');
    }
    const updatedUser = await updateUser(
      { balance: sequelize.literal(`balance - '${sum}'`) },
      userId,
      transaction,
    );
    const cardNumber = number.replace(/ /g, '');

    await updateBankBalance(
      {
        balance: sequelize.literal(`CASE
WHEN "cardNumber"='${cardNumber}'
AND "expiry"='${expiry}' AND "cvc"='${cvc}'
THEN "balance"+${sum}
WHEN "cardNumber"='${SQUADHELP_BANK_NUMBER}'
AND "expiry"='${SQUADHELP_BANK_EXPIRY}'
AND "cvc"='${SQUADHELP_BANK_CVC}'
THEN "balance"-${sum}
END`),
      },
      {
        cardNumber: {
          [Op.in]: [SQUADHELP_BANK_NUMBER, cardNumber],
        },
      },
      transaction,
    );

    transaction.commit();
    return NextResponse.json({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    return handleError(err);
  }
}
