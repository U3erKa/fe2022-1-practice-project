import { type NextRequest, NextResponse } from 'next/server';
import type { InferAttributes } from 'sequelize';
import { NotFoundError } from 'errors';
import { Catalog } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const { catalogId, chatId } = await json();

    const catalog = await Catalog.findOne({
      where: { _id: catalogId, userId },
    });

    if (!catalog) {
      throw new NotFoundError('Catalog not found');
    }
    await catalog.addChat(chatId);
    const chats = await catalog.getChats();

    for (const { dataValues, participant1, participant2 } of chats) {
      Object.assign(dataValues, { participants: [participant1, participant2] });
    }
    Object.assign(catalog.dataValues, { chats: chats ?? [] });

    return NextResponse.json(catalog as _Catalog);

    type _Chat = InferAttributes<(typeof chats)[number]>;
    type _Catalog = typeof catalog & {
      chats: (_Chat & {
        participants: [_Chat['participant1'], _Chat['participant2']];
      })[];
    };
  } catch (error) {
    return handleError(error);
  }
}
