import { NextResponse, type NextRequest } from 'next/server';
import { Transaction } from 'sequelize';
import { RightsError } from 'errors';
import { Offer, Rating, sequelize } from 'models';
import { CUSTOMER } from 'constants/general';
import { createRating, updateRating } from 'controllers/queries/ratingQueries';
import { updateUser } from 'controllers/queries/userQueries';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  const transaction = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
  });

  try {
    const { json, headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId, role } = await verifyAccessToken(authorization);
    if (role !== CUSTOMER) {
      throw new RightsError('This page is only for customers');
    }
    const { isFirst, offerId, mark, creatorId } = await json();
    await (isFirst
      ? createRating({ offerId, mark, userId }, transaction)
      : updateRating({ mark }, { offerId, userId }, transaction));

    const offers = await Rating.findAll({
      include: [
        {
          model: Offer,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });

    let sum = 0;
    for (const offer of offers) {
      sum += offer.dataValues.mark;
    }
    const avg = sum / offers.length;

    await updateUser({ rating: avg }, creatorId, transaction);
    await transaction.commit();
    return NextResponse.json({ userId: creatorId, rating: avg });
  } catch (error) {
    await transaction.rollback();
    return handleError(error);
  }
}
