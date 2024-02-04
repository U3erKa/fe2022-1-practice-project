import { NextResponse, type NextRequest } from 'next/server';
import type { InferAttributes } from 'sequelize';
import { Catalog, Conversation } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';
import type { Conversation as _Conversation } from 'types/models';

export async function POST(req: NextRequest) {
  try {
    const { headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const catalogs = await Catalog.findAll({
      where: { userId },
      attributes: ['_id', 'catalogName'],
      include: {
        as: 'chats',
        attributes: ['_id'],
        model: Conversation,
        through: { attributes: [] },
      },
    });

    return NextResponse.json(catalogs as Response);

    type Response = ((typeof catalogs)[number] & {
      chats: InferAttributes<_Conversation>[];
    })[];
  } catch (error) {
    return handleError(error);
  }
}
