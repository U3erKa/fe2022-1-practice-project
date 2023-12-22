import { type NextRequest, NextResponse } from 'next/server';
import { Conversation, Message } from 'models';
import { findUser } from 'controllers/queries/userQueries';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';
import type { Message as _Message } from 'types/models';

export async function POST(req: NextRequest) {
  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const { interlocutorId } = await json();
    const [participant1, participant2] = [userId, interlocutorId].sort(
      (participant1, participant2) => participant1 - participant2,
    ) as [number, number];

    const [conversation, isCreated] = await Conversation.findOrCreate({
      where: { participant1, participant2 },
      include: {
        as: 'messages',
        model: Message,
        order: [['createdAt', 'ASC']],
      },
      attributes: ['participant1', 'participant2'],
      defaults: {
        blackList: [false, false],
        favoriteList: [false, false],
        participant1,
        participant2,
      },
    });

    const { messages } =
      conversation.dataValues as typeof conversation.dataValues & {
        messages: _Message[];
      };

    const { id, firstName, lastName, displayName, avatar } = await findUser({
      id: interlocutorId,
    });

    Object.assign(conversation, {
      participants: [conversation.participant1, conversation.participant2],
    });

    return NextResponse.json({
      interlocutor: { avatar, displayName, firstName, id, lastName },
      messages,
    });
  } catch (error) {
    return handleError(error);
  }
}
