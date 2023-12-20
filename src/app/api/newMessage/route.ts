import { type NextRequest, NextResponse } from 'next/server';
import { Conversation, Message } from 'models';
import { getChatController } from 'socketInit';
import RightsError from 'errors/RightsError';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';
import type { Message as _Message } from 'types/models';

export async function POST(req: NextRequest) {
  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId, firstName, lastName, displayName, avatar, email } =
      await verifyAccessToken(authorization);
    const { recipient, messageBody, interlocutor } = await json();
    const participants = [userId, recipient].sort(
      (participant1, participant2) => participant1 - participant2,
    ) as [number, number];
    const [participant1, participant2] = participants;

    const [newConversation, isCreated] = await Conversation.findOrCreate({
      where: { participant1, participant2 },
      defaults: {
        participant1,
        participant2,
        blackList: [false, false],
        favoriteList: [false, false],
      },
    });

    const { _id, blackList, favoriteList } = newConversation;
    if (blackList.includes(true)) {
      throw new RightsError(
        'Cannot send message while one of the interlocutors is blacklisted',
      );
    }

    const message = await Message.create({
      sender: userId,
      body: messageBody,
      conversation: _id,
    });

    Object.assign(message.dataValues, { participants });
    const [interlocutorId] = participants.filter(
      (participant) => participant !== userId,
    ) as [number];

    const preview = {
      _id,
      sender: userId,
      text: messageBody,
      createdAt: message.createdAt,
      participants,
      blackList,
      favoriteList,
    };

    getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          id: userId,
          firstName,
          lastName,
          displayName,
          avatar,
          email,
        },
      },
    });

    return NextResponse.json({
      message,
      preview: { ...preview, interlocutor },
    });
  } catch (error) {
    return handleError(error);
  }
}
