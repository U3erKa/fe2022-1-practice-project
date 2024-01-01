import { type NextRequest, NextResponse } from 'next/server';
import { NotFoundError } from 'errors';
import { Conversation } from 'models';
import { getChatController } from 'socketInit';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
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

    const [interlocutorId] = participants.filter(
      (participant: number) => participant !== userId,
    );
    getChatController().emitChangeBlockStatus(interlocutorId, chat!);
    return NextResponse.json(chat!);
  } catch (error) {
    return handleError(error);
  }
}
