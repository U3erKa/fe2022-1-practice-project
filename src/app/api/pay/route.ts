import { type NextRequest, NextResponse } from 'next/server';
import { Op } from 'sequelize';
import { randomUUID } from 'crypto';
import { Contest, sequelize } from 'models';
import {
  SQUADHELP_BANK_CVC,
  SQUADHELP_BANK_EXPIRY,
  SQUADHELP_BANK_NUMBER,
} from 'constants/backend';
import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_PENDING,
  CUSTOMER,
} from 'constants/general';
import { updateBankBalance } from 'controllers/queries/bankQueries';
import BadRequestError from 'errors/BadRequestError';
import RightsError from 'errors/RightsError';
import { verifyAccessToken } from 'services/jwtService';
import { uploadFile } from 'utils/backend';
import handleError from 'utils/handleError';
import { ContestSchema, type Contest as __Contest } from 'utils/schemas';
import type { Contest as _Contest } from 'types/models';

export async function POST(req: NextRequest) {
  const transaction = await sequelize.transaction();

  try {
    const { formData, headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId, role } = await verifyAccessToken(authorization);
    if (role !== CUSTOMER) {
      throw new RightsError('This page is only for customers');
    }
    const data = await formData();
    const { number, cvc, expiry, price, contests } = Object.fromEntries(data);
    const parsedContests: __Contest[] = JSON.parse(contests as string);
    const promiseArray = parsedContests.map((contest) =>
      ContestSchema.safeParseAsync(contest).then((res) => res.success),
    );
    const results = await Promise.all(promiseArray);
    if (results.includes(false)) {
      throw new BadRequestError('Invalid contest creation data');
    }
    const files = data.getAll('files');

    const fileUploads: ReturnType<typeof uploadFile>[] = [];
    for (const contest of parsedContests) {
      if (contest.haveFile) {
        const [file] = files.splice(0, 1);
        if (!(file instanceof File)) continue;
        fileUploads.push(
          uploadFile(file).then((fileData) => Object.assign(contest, fileData)),
        );
      }
    }

    const cardNumber = (number as string).replace(/ /g, '');
    await updateBankBalance(
      {
        balance: sequelize.literal(`CASE
WHEN "cardNumber"='${cardNumber}'
 AND "cvc"='${cvc}'
 AND "expiry"='${expiry}'
THEN "balance"-${price}
WHEN "cardNumber"='${SQUADHELP_BANK_NUMBER}'
 AND "cvc"='${SQUADHELP_BANK_CVC}'
 AND "expiry"='${SQUADHELP_BANK_EXPIRY}'
THEN "balance"+${price}
END`),
      },
      {
        cardNumber: {
          [Op.in]: [SQUADHELP_BANK_NUMBER!, cardNumber],
        },
      },
      transaction,
    );

    const orderId = randomUUID();
    await Promise.all(fileUploads);
    for (let index = 0; index < parsedContests.length; index++) {
      const contest = parsedContests[index]!;
      const prize =
        index === parsedContests.length - 1
          ? Math.ceil(+price! / parsedContests.length)
          : Math.floor(+price! / parsedContests.length);
      Object.assign(contest, {
        status: index === 0 ? CONTEST_STATUS_ACTIVE : CONTEST_STATUS_PENDING,
        userId,
        priority: index + 1,
        orderId,
        createdAt: new Date().toISOString(),
        prize,
      });
    }
    await Contest.bulkCreate(parsedContests as any, { transaction });
    transaction.commit();
    return new NextResponse();
  } catch (error) {
    transaction.rollback();
    return handleError(error);
  }
}
