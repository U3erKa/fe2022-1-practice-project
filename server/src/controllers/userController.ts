import * as CONSTANTS from '../constants';
import { sequelize, Sequelize, Rating, Offer, Contest } from '../models';
import { v4 as uuid } from 'uuid';
import * as controller from '../socketInit';
import * as userQueries from './queries/userQueries';
import * as bankQueries from './queries/bankQueries';
import * as ratingQueries from './queries/ratingQueries';
import type { RequestHandler } from 'express';

function getQuery(offerId, userId, mark, isFirst, transaction?) {
  const getCreateQuery = () =>
    ratingQueries.createRating(
      {
        offerId,
        mark,
        userId,
      },
      transaction,
    );
  const getUpdateQuery = () =>
    ratingQueries.updateRating({ mark }, { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

export const changeMark: RequestHandler = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const userId = req.tokenData.userId;
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
  });

  try {
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();

    const offersArray = await Rating.findAll({
      include: [
        {
          model: Offer,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });

    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[i].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

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
          [Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            number.replace(/ /g, ''),
          ],
        },
      },
      transaction,
    );

    const orderId = uuid();
    contests.forEach((contest, index) => {
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

export const updateUser: RequestHandler = async (req, res, next) => {
  const { tokenData, file, body } = req;
  try {
    if (file) {
      body.avatar = file.filename;
    }
    const updatedUser = await userQueries.updateUser(body, tokenData.userId);
    res.send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
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
          [Sequelize.Op.in]: [
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
