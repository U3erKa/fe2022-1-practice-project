import { Op } from 'sequelize';
import { Conversation, Message, Catalog, User } from '../models';
import * as userQueries from './queries/userQueries';
import * as controller from '../socketInit';
import _ from 'lodash';

import type { RequestHandler } from 'express';
import type { _Conversation, ConversationSchema } from '../types/models';

export const addMessage: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId, firstName, lastName, displayName, avatar, email },
    body: { recipient, messageBody, interlocutor },
  } = req;

  const participants = [userId, recipient].sort(
    (participant1, participant2) => participant1 - participant2,
  ) as [number, number];
  try {
    const newConversation = await Conversation.findOneAndUpdate(
      { participants },
      { participants, blackList: [false, false], favoriteList: [false, false] },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      },
    );
    const { _id, blackList, favoriteList } = newConversation;

    const message = await Message.create({
      sender: userId,
      body: messageBody,
      conversation: _id,
    });
    // @ts-expect-error
    message._doc.participants = participants;

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

export const getChat: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { interlocutorId },
  } = req;

  const [participant1, participant2] = [userId, interlocutorId].sort(
    (participant1, participant2) => participant1 - participant2,
  ) as [number, number];
  try {
    const conversation = await Conversation.findOne({
      include: {
        model: Message,
        as: 'messages',
        order: [['createdAt', 'ASC']],
        },
      attributes: ['participant1', 'participant2'],
      where: { participant1, participant2 },
    });

    const { messages } = conversation!.dataValues as unknown as {
      messages: _Message[];
    };

    const { id, firstName, lastName, displayName, avatar } =
      await userQueries.findUser({ id: interlocutorId });

    Object.assign(conversation!, {
      participants: [conversation!.participant1, conversation!.participant2],
    });

    res.send({
      messages,
      interlocutor: { id, firstName, lastName, displayName, avatar },
    });
  } catch (err) {
    next(err);
  }
};

export const getPreview: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
  } = req;

  try {
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
      ],
      where: {
        [Op.or]: [{ participant1: userId }, { participant2: userId }],
      },
    });

    const interlocutors = conversations.map(({ participant1, participant2 }) =>
      participant1 === userId ? participant2 : participant1,
    ) as [number, number];

    const senders = await User.findAll({
      // @ts-ignore
      where: { id: interlocutors },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    conversations.forEach((conversation) => {
      const { participant1, participant2, dataValues, messages } = conversation;
      Object.assign(dataValues, {
        // @ts-expect-error
        text: messages[0].body,
        participants: [participant1, participant2],
      });

      senders.forEach(
        ({ dataValues: { id, firstName, lastName, displayName, avatar } }) => {
          if ([participant1, participant2].includes(id)) {
            Object.assign(dataValues, {
              interlocutor: { id, firstName, lastName, displayName, avatar },
            });
          }
        },
      );
    });

    res.send(conversations);
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
    const predicate = 'blackList.' + participants.indexOf(userId);
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [predicate]: blackListFlag } },
      { new: true },
    );
    res.send(chat);

    const [interlocutorId] = participants.filter(
      (participant) => participant !== userId,
    );
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

export const favoriteChat: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { participants, favoriteFlag },
  } = req;

  try {
    const predicate = 'favoriteList.' + participants.indexOf(userId);
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [predicate]: favoriteFlag } },
      { new: true },
    );
    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};

export const createCatalog: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { chatId, catalogName },
  } = req;

  try {
    const catalog = await Catalog.create({
      userId,
      catalogName,
      chats: [chatId],
    });

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

export const updateNameCatalog: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { catalogId, catalogName },
  } = req;

  try {
    const catalog = await Catalog.findOneAndUpdate(
      { _id: catalogId, userId },
      { catalogName },
      { new: true },
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

export const addNewChatToCatalog: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { catalogId, chatId },
  } = req;

  try {
    const catalog = await Catalog.findOneAndUpdate(
      { _id: catalogId, userId },
      { $addToSet: { chats: chatId } },
      { new: true },
    );
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
    const catalog = await Catalog.findOneAndUpdate(
      { _id: catalogId, userId },
      { $pull: { chats: chatId } },
      { new: true },
    );
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
    await Catalog.remove({ _id: catalogId, userId });
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
    const catalogs = await Catalog.aggregate([
      { $match: { userId } },
      { $project: { _id: 1, catalogName: 1, chats: 1 } },
    ]);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
