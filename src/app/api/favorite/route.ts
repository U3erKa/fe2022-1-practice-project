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
    const [participant1, participant2] = participants;
    const predicate = participants.indexOf(userId);

    const foundChat = await Conversation.findOne({
      where: { participant1, participant2 },
    });
    if (!foundChat) {
      throw new NotFoundError('Conversation was not found');
    }
    foundChat.favoriteList[predicate] = favoriteFlag;

    const [count, [chat]] = await Conversation.update(
      { favoriteList: foundChat.favoriteList },
      { where: { participant1, participant2 }, returning: true },
    );
    if (!count) {
      throw new NotFoundError('Conversation could not be modified');
    }

    Object.assign(chat!.dataValues, {
      participants: [participant1, participant2],
    });

    return NextResponse.json(chat);
  } catch (error) {
    return handleError(error);
  }
}
