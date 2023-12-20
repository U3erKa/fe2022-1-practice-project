import { Catalog, Conversation, Message, User } from '../models';
import * as controller from '../socketInit';
import NotFoundError from '../errors/NotFoundError';
import RightsError from '../errors/RightsError';
import type { RequestHandler } from 'express';
import type {
  Catalog as _Catalog,
  Conversation as _Conversation,
  Message as _Message,
} from '../types/models';

export const addMessage: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId, firstName, lastName, displayName, avatar, email },
    body: { recipient, messageBody, interlocutor },
  } = req;

  const participants = [userId, recipient].sort(
    (participant1, participant2) => participant1 - participant2,
  ) as [number, number];
  const [participant1, participant2] = participants;
  try {
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
    );

    const preview = {
      _id,
      sender: userId,
      text: messageBody,
      createdAt: message.createdAt,
      participants,
      blackList,
      favoriteList,
    };

    controller.getChatController().emitNewMessage(interlocutorId, {
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

    res.send({ message, preview: { ...preview, interlocutor } });
  } catch (err) {
    next(err);
  }
};

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

export const addNewChatToCatalog: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { catalogId, chatId },
  } = req;

  try {
    const catalog = await Catalog.findOne({
      where: { _id: catalogId, userId },
    });

    if (!catalog) {
      throw new NotFoundError('Catalog not found');
    }
    await catalog.addChat(chatId);
    const chats = (await catalog.getChats()) as unknown as _Conversation[];

    chats.forEach((chat) => {
      Object.assign(chat.dataValues, {
        participants: [chat.participant1, chat.participant2],
      });
    });
    Object.assign(catalog.dataValues, { chats: chats ?? [] });

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

export const removeChatFromCatalog: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { catalogId, chatId },
  } = req;

  try {
    const catalog = await Catalog.findOne({
      where: { _id: catalogId, userId },
      include: { model: Conversation, as: 'chats', attributes: ['_id'] },
    });

    if (!catalog) {
      throw new NotFoundError('Catalog not found');
    }
    await catalog.removeChat(chatId);

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

export const deleteCatalog: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { catalogId },
  } = req;

  try {
    await Catalog.destroy({ where: { _id: catalogId, userId } });
    res.end();
  } catch (err) {
    next(err);
  }
};

export const getCatalogs: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
  } = req;

  try {
    const catalogs = (await Catalog.findAll({
      where: { userId },
      attributes: ['_id', 'catalogName'],
      include: {
        model: Conversation,
        as: 'chats',
        attributes: ['_id'],
        through: { attributes: [] },
      },
    })) as unknown as _Catalog[];

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
