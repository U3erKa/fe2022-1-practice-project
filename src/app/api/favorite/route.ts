import { type NextRequest, NextResponse } from 'next/server';
import { NotFoundError } from 'errors';
import { Conversation } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const { participants, favoriteFlag } = await json();
    const predicate = participants.indexOf(userId);

    const foundChat = await Conversation.findOne({
      where: { participants },
    });
    if (!foundChat) {
      throw new NotFoundError('Conversation was not found');
    }
    foundChat.favoriteList[predicate] = favoriteFlag;

    const [count, [chat]] = await Conversation.update(
      { favoriteList: foundChat.favoriteList },
      { where: { participants }, returning: true },
    );
    if (!count) {
      throw new NotFoundError('Conversation could not be modified');
    }

    return NextResponse.json(chat!);
  } catch (error) {
    return handleError(error);
  }
}
