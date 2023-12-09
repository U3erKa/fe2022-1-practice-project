import { type NextRequest, NextResponse } from 'next/server';
import { Contest, sequelize } from 'models';
import {
  rejectOffer,
  resolveOffer,
  updateOfferStatus,
} from 'controllers/queries/contestQueries';
import { verifyAccessToken } from 'services/jwtService';
import { sendCreatorOfferEmail } from 'utils/email';
import handleError from 'utils/handleError';
import BadRequestError from 'errors/BadRequestError';
import RightsError from 'errors/RightsError';
import {
  CONTEST_STATUS_ACTIVE,
  CUSTOMER,
  MODERATOR,
  OFFER_STATUS_APPROVED,
  OFFER_STATUS_DISCARDED,
} from 'constants/general';
import {
  OFFER_COMMAND_APPROVE,
  OFFER_COMMAND_DISCARD,
  OFFER_COMMAND_REJECT,
  OFFER_COMMAND_RESOLVE,
} from 'constants/general';

export async function POST(req: NextRequest) {
  try {
    const { json, headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { role, userId } = await verifyAccessToken(authorization);
    const { command, offerId, creatorId, contestId, orderId, priority } =
      await json();

    if (role !== CUSTOMER && role !== MODERATOR) throw new RightsError();

    const result = await Contest.findOne({
      where: { userId, id: contestId, status: CONTEST_STATUS_ACTIVE },
    });
    if (!result) throw new RightsError();

    if (role === CUSTOMER) {
      if (command === OFFER_COMMAND_REJECT) {
        const offer = await rejectOffer(offerId, creatorId, contestId);
        return NextResponse.json(offer, { status: 200 });
      }

      if (command === OFFER_COMMAND_RESOLVE) {
        const transaction = await sequelize.transaction();
        try {
          const winningOffer = await resolveOffer(
            contestId,
            creatorId,
            orderId,
            offerId,
            priority,
            transaction,
          );
          return NextResponse.json(winningOffer, { status: 200 });
        } catch (err) {
          transaction.rollback();
          throw err;
        }
      }
    } else if (role === MODERATOR) {
      if (command === OFFER_COMMAND_APPROVE) {
        const [offer] = await updateOfferStatus(
          { status: OFFER_STATUS_APPROVED },
          { id: offerId },
        );
        sendCreatorOfferEmail(offer!, command);
        return NextResponse.json(offer, { status: 200 });
      }
      if (command === OFFER_COMMAND_DISCARD) {
        const [offer] = await updateOfferStatus(
          { status: OFFER_STATUS_DISCARDED },
          { id: offerId },
        );
        sendCreatorOfferEmail(offer!, command);
        return NextResponse.json(offer, { status: 200 });
      }
    }
    throw new BadRequestError('Invalid command');
  } catch (error) {
    return handleError(error);
  }
}
