import { type NextRequest, NextResponse } from 'next/server';
import { NotFoundError } from 'errors';
import { Catalog, Conversation } from 'models';
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
      include: { model: Conversation, as: 'chats', attributes: ['_id'] },
    });

    if (!catalog) {
      throw new NotFoundError('Catalog not found');
    }
    await catalog.removeChat(chatId);

    return NextResponse.json(catalog);
  } catch (error) {
    return handleError(error);
  }
}
