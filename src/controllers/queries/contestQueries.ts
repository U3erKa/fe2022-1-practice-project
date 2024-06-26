import type {
  Attributes,
  CreationAttributes,
  InferAttributes,
  Transaction,
  WhereOptions,
} from 'sequelize';
import { ServerError } from 'errors';
import { Contest, Offer, sequelize } from 'models';
import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
  OFFER_STATUS_APPROVED,
  OFFER_STATUS_DISCARDED,
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_WON,
} from 'constants/general';
import { updateUser } from 'controllers/queries/userQueries';
import type {
  Contest as _Contest,
  Offer as _Offer,
  ModelUpdateAttributes,
} from 'types/models';

export const updateContest = async (
  data: ModelUpdateAttributes<_Contest>,
  predicate: WhereOptions<Attributes<_Contest>>,
  transaction?: Transaction,
) => {
  const [updatedCount, [updatedContest]] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update Contest');
  }
  return updatedContest!.dataValues;
};

export const updateOfferStatus = async (
  data: ModelUpdateAttributes<_Offer>,
  predicate: WhereOptions<InferAttributes<_Offer>>,
  transaction?: Transaction,
) => {
  const [approvedOffers, offers] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (!approvedOffers) {
    throw new ServerError('cannot update offer!');
  }
  return offers;
};

export const createOffer = async (data: CreationAttributes<_Offer>) => {
  const result = await Offer.create(data);
  if (!result) {
    throw new ServerError('cannot create new Offer');
  } else {
    return result.get({ plain: true });
  }
};

export const rejectOffer = async (offerId: number) => {
  const [rejectedOffer] = await updateOfferStatus(
    { status: OFFER_STATUS_REJECTED },
    { id: offerId },
  );
  return rejectedOffer!.dataValues;
};

export const resolveOffer = async (
  contestId: number,
  creatorId: number,
  orderId: number,
  offerId: number,
  priority: number,
  transaction: Transaction,
) => {
  const finishedContest = await updateContest(
    {
      status: sequelize.literal(`CASE
WHEN "id"=${contestId} AND "orderId"='${orderId}'
THEN '${CONTEST_STATUS_FINISHED}'
WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}
THEN '${CONTEST_STATUS_ACTIVE}'
ELSE '${CONTEST_STATUS_PENDING}'
END`),
    },
    { orderId },
    transaction,
  );
  await updateUser(
    { balance: sequelize.literal(`balance + ${finishedContest.prize}`) },
    creatorId,
    transaction,
  );
  const updatedOffers = await updateOfferStatus(
    {
      status: sequelize.literal(`CASE
WHEN "id"=${offerId} THEN '${OFFER_STATUS_WON}'
WHEN "status"=${OFFER_STATUS_APPROVED} THEN '${OFFER_STATUS_REJECTED}'
ELSE '${OFFER_STATUS_DISCARDED}'
END`),
    },
    { contestId },
    transaction,
  );
  await transaction.commit();

  const arrayRoomsId: number[] = [];
  for (const offer of updatedOffers) {
    if (offer.status === OFFER_STATUS_REJECTED && creatorId !== offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
  }
  return updatedOffers[0]!.dataValues;
};
