import { type NextRequest, NextResponse } from 'next/server';
import { Op } from 'sequelize';
import { Select } from 'models';
import handleError from 'utils/handleError';
import ServerError from 'errors/ServerError';

export async function POST(req: NextRequest) {
  try {
    const { json } = req;
    const { characteristic1, characteristic2 } = (await json()) ?? {};
    const response: Record<string, string[]> = {};
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean,
    );

    const characteristics = await Select.findAll({
      where: {
        type: { [Op.or]: types },
      },
    });
    if (!characteristics) throw new ServerError();

    characteristics.forEach((characteristic) => {
      response[characteristic.type] ??= [];
      response[characteristic.type]!.push(characteristic.describe);
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
