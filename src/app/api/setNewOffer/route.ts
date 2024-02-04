import { NextResponse, type NextRequest } from 'next/server';
import { BadRequestError, NotFoundError, RightsError } from 'errors';
import { Contest } from 'models';
import {
  CONTEST_STATUS_ACTIVE,
  CREATOR,
  LOGO_CONTEST,
} from 'constants/general';
import { createOffer } from 'controllers/queries/contestQueries';
import { verifyAccessToken } from 'services/jwtService';
import { uploadFile } from 'utils/backend';
import handleError from 'utils/handleError';
import { SetNewOfferSchema } from 'utils/schemas';

export async function POST(req: NextRequest) {
  try {
    const { formData, headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const tokenData = await verifyAccessToken(authorization);
    const data = await formData();
    const body = Object.fromEntries(data);

    const validationResult = await SetNewOfferSchema.safeParseAsync(body);
    if (!validationResult.success) throw new BadRequestError();
    const {
      data: { contestType, offerData, contestId, customerId },
    } = validationResult;

    if (tokenData.role !== CREATOR) throw new RightsError();
    const result = await Contest.findOne({
      where: {
        id: contestId,
      },
      attributes: ['status'],
    });

    if (!result) throw new NotFoundError('Contest not found');

    if (result.get({ plain: true }).status !== CONTEST_STATUS_ACTIVE) {
      throw new RightsError();
    }

    const obj: Record<string, unknown> = {
      contestId,
      userId: tokenData.userId,
    };

    if (contestType === LOGO_CONTEST) {
      const fileData = await uploadFile(offerData as File);
      Object.assign(obj, fileData);
    } else {
      Object.assign(obj, { text: offerData as string });
    }

    const { userId, contestId: _contestId, ...offer } = await createOffer(obj);
    const User = { ...tokenData, id: tokenData.userId };
    return NextResponse.json({ ...offer, User });
  } catch (error) {
    return handleError(error);
  }
}
