import { type NextRequest, NextResponse } from 'next/server';
import { Catalog } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const { chatId, catalogName } = await json();

    const catalog = await Catalog.create(
      { userId, catalogName },
      { returning: true },
    );
    await catalog.addChat(chatId);
    Object.assign(catalog.dataValues, { chats: [chatId] });

    return NextResponse.json(catalog);
  } catch (error) {
    return handleError(error);
  }
}
