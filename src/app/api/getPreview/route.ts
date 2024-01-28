import { NextResponse, type NextRequest } from 'next/server';
import { Op } from 'sequelize';
import { Conversation, Message, User } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const conversations = await Conversation.findAll({
      include: {
        as: 'messages',
        attributes: ['body', 'createdAt', 'sender'],
        model: Message,
      },
      order: [['createdAt', 'DESC']],
      attributes: [
        '_id',
        'blackList',
        'createdAt',
        'favoriteList',
        'participant1',
        'participant2',
      ],
      where: {
        [Op.or]: [{ participant1: userId }, { participant2: userId }],
      },
    });

    const interlocutors = conversations.map(({ participant1, participant2 }) =>
      participant1 === userId ? participant2 : participant1,
    ) as [number, number];

    const senders = await User.findAll({
      where: { id: interlocutors },
      attributes: ['avatar', 'displayName', 'firstName', 'id', 'lastName'],
    });

    for (const conversation of conversations) {
      const { participant1, participant2, dataValues, messages } = conversation;
      const participants = [participant1, participant2];
      Object.assign(dataValues, {
        participants,
        // @ts-expect-error
        text: messages?.at(-1).body,
      });

      for (const { dataValues } of senders) {
        const { avatar, displayName, firstName, id, lastName } = dataValues;
        if (participants.includes(id)) {
          Object.assign(dataValues, {
            interlocutor: { avatar, displayName, firstName, id, lastName },
          });
        }
      }
    }

    return NextResponse.json(conversations);
  } catch (error) {
    return handleError(error);
  }
}
