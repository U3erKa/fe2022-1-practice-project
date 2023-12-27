import { type NextRequest, NextResponse } from 'next/server';
import { Conversation, Message } from 'models';
import { getChatController } from 'socketInit';
import RightsError from 'errors/RightsError';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

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
        blackList: [false, false],
        favoriteList: [false, false],
        participant1,
        participant2,
      },
    });

    const { _id, blackList, favoriteList } = newConversation;
    if (blackList.includes(true)) {
      throw new RightsError(
        'Cannot send message while one of the interlocutors is blacklisted',
      );
    }

    const message = await Message.create({
      body: messageBody,
      conversation: _id,
      sender: userId,
    });

    Object.assign(message.dataValues, { participants });
    const [interlocutorId] = participants.filter(
      (participant) => participant !== userId,
    ) as [number];

    const preview = {
      _id,
      blackList,
      createdAt: message.createdAt,
      favoriteList,
      participants,
      sender: userId,
      text: messageBody,
    };

    getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          avatar,
          displayName,
          email,
          firstName,
          id: userId,
          lastName,
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
