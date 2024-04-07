import { NextResponse, type NextRequest } from 'next/server';
import { NotFoundError } from 'errors';
import { Conversation } from 'models';
import { NEXT_PUBLIC_WS_SERVER_URL } from 'constants/general';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!;
    const token = authorization.split(' ')[1]!;
    const { userId } = await verifyAccessToken(token);
    const { participants, blackListFlag } = await json();
    const [participant1, participant2] = participants;
    const predicate = participants.indexOf(userId);

    const foundChat = await Conversation.findOne({
      where: { participant1, participant2 },
    });
    if (!foundChat) {
      throw new NotFoundError('Conversation was not found');
    }
    foundChat.blackList[predicate] = blackListFlag;

    const [count, [chat]] = await Conversation.update(
      { blackList: foundChat.blackList },
      { where: { participant1, participant2 }, returning: true },
    );
    if (!count) {
      throw new NotFoundError('Conversation could not be modified');
    }

    Object.assign(chat!.dataValues, {
      participants: [participant1, participant2],
    });

    const newMessageHeaders = new Headers();
    newMessageHeaders.append('Authorization', token);

    await fetch(`${NEXT_PUBLIC_WS_SERVER_URL}/blackList`, {
      headers: newMessageHeaders,
      method: 'POST',
      body: JSON.stringify({
        recipient: participants.find((id: number) => id !== userId),
        message: chat,
      }),
    });

    return NextResponse.json(chat as _Chat);

    type _Chat = NonNullable<typeof chat> & {
      participants: [typeof participant1, typeof participant2];
    };
  } catch (error) {
    return handleError(error);
  }
}
