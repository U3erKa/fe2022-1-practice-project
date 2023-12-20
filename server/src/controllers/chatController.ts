import { Conversation } from '../models';
import * as controller from '../socketInit';
import NotFoundError from '../errors/NotFoundError';
import type { RequestHandler } from 'express';
import type {
  Catalog as _Catalog,
  Conversation as _Conversation,
  Message as _Message,
} from '../types/models';

export const blackList: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { participants, blackListFlag },
  } = req;

  try {
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

    Object.assign(chat.dataValues, {
      participants: [participant1, participant2],
    });
    res.send(chat);

    const [interlocutorId] = participants.filter(
      (participant: number) => participant !== userId,
    );
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};
