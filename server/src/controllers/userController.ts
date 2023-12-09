import type { RequestHandler } from 'express';
import { Op } from 'sequelize';
import * as CONSTANTS from '../constants';
import { Contest, sequelize } from '../models';
import { v4 as uuid } from 'uuid';
import * as userQueries from './queries/userQueries';
import * as bankQueries from './queries/bankQueries';
import type { Contest as _Contest } from '../types/models';

export const payment: RequestHandler = async (req, res, next) => {
  const {
    tokenData,
    body: { number, cvc, expiry, price, contests },
  } = req;
  const transaction = await sequelize.transaction();

  try {
    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(`
CASE
  WHEN "cardNumber"='${number.replace(/ /g, '')}'
    AND "cvc"='${cvc}'
    AND "expiry"='${expiry}'
  THEN "balance"-${price}
  WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}'
    AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
    AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
  THEN "balance"+${price}
END
        `),
      },
      {
        cardNumber: {
          [Op.in]: [CONSTANTS.SQUADHELP_BANK_NUMBER, number.replace(/ /g, '')],
        },
      },
      transaction,
    );

    const orderId = uuid();
    contests.forEach((contest: _Contest, index: number) => {
      const prize =
        index === contests.length - 1
          ? Math.ceil(price / contests.length)
          : Math.floor(price / contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: new Date().toISOString(),
        prize,
      });
    });
    await Contest.bulkCreate(contests, { transaction });
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

export const cashout: RequestHandler = async (req, res, next) => {
  const {
    body: { number, expiry, cvc, sum },
  } = req;
  const transaction = await sequelize.transaction();

  try {
    const updatedUser = await userQueries.updateUser(
      { balance: sequelize.literal('balance - ' + sum) },
      req.tokenData.userId,
      transaction,
    );

    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(`
CASE 
  WHEN "cardNumber"='${number.replace(/ /g, '')}'
  AND "expiry"='${expiry}' AND "cvc"='${cvc}'
  THEN "balance"+${sum}
  WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}'
  AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
  AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
  THEN "balance"-${sum}
END
        `),
      },
      {
        cardNumber: {
          [Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction,
    );

    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};
