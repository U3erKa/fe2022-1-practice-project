import { type NextRequest, NextResponse } from 'next/server';
import { Conversation, Message, User } from 'models';
import { Op } from 'sequelize';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const conversations = await Conversation.findAll({
      include: {
        model: Message,
        as: 'messages',
        attributes: ['body', 'sender', 'createdAt'],
      },
      order: [['createdAt', 'DESC']],
      attributes: [
        '_id',
        'participant1',
        'participant2',
        'blackList',
        'favoriteList',
        'createdAt',
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
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    for (const conversation of conversations) {
      const { participant1, participant2, dataValues, messages } = conversation;
      const participants = [participant1, participant2];
      Object.assign(dataValues, {
        // @ts-expect-error
        text: messages?.at(-1).body,
        participants,
      });

      for (const { dataValues } of senders) {
        const { id, firstName, lastName, displayName, avatar } = dataValues;
        if (participants.includes(id)) {
          Object.assign(dataValues, {
            interlocutor: { id, firstName, lastName, displayName, avatar },
          });
        }
      }
    }

    return NextResponse.json(conversations);
  } catch (error) {
    return handleError(error);
  }
}
