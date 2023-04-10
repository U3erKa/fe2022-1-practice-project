import Conversation from '../models/mongoModels/Conversation';
import Message from '../models/mongoModels/Message';
import Catalog from '../models/mongoModels/Catalog';
import { User } from '../models';
import * as userQueries from './queries/userQueries';
import * as controller from '../socketInit';
import _ from 'lodash';

import type { RequestHandler } from 'express';
import type { _Conversation, ConversationSchema } from '../types/models';

export const addMessage: RequestHandler = async (req, res, next) => {
  const participants: [number, number] = [
    req.tokenData.userId,
    req.body.recipient,
  ];
  participants.sort(
    (participant1, participant2) => participant1 - participant2,
  );
  try {
    const newConversation = await Conversation.findOneAndUpdate(
      {
        participants,
      },
      { participants, blackList: [false, false], favoriteList: [false, false] },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      },
    );
    const message = new Message({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: newConversation._id,
    });
    await message.save();
    // @ts-expect-error
    message._doc.participants = participants;
    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId,
    )[0];
    const preview = {
      _id: newConversation._id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createdAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        _id: newConversation._id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createdAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

export const getChat: RequestHandler = async (req, res, next) => {
  const {
    tokenData,
    body: { interlocutorId },
  } = req;
  const participants = [tokenData.userId, interlocutorId].sort(
    (participant1, participant2) => participant1 - participant2,
  );

  try {
    const messages = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      { $match: { 'conversationData.participants': participants } },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          _id: 1,
          sender: 1,
          body: 1,
          conversation: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    const interlocutor = await userQueries.findUser({
      id: interlocutorId,
    });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getPreview: RequestHandler = async (req, res, next) => {
  const { tokenData } = req;
  try {
    const conversations = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      {
        $unwind: '$conversationData',
      },
      {
        $match: {
          'conversationData.participants': tokenData.userId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$conversationData._id',
          sender: { $first: '$sender' },
          text: { $first: '$body' },
          createdAt: { $first: '$createdAt' },
          participants: { $first: '$conversationData.participants' },
          blackList: { $first: '$conversationData.blackList' },
          favoriteList: { $first: '$conversationData.favoriteList' },
        },
      },
    ]);
    const interlocutors: Partial<ConversationSchema['participants']> = [];
    conversations.forEach((conversation: _Conversation) => {
      interlocutors.push(
        conversation.participants.find(
          (participant) => participant !== tokenData.userId,
        ),
      );
    });
    const senders = await User.findAll({
      // @ts-ignore
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    conversations.forEach((conversation) => {
      senders.forEach((sender) => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

export const blackList: RequestHandler = async (req, res, next) => {
  const predicate =
    'blackList.' + req.body.participants.indexOf(req.tokenData.userId);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants: req.body.participants },
      { $set: { [predicate]: req.body.blackListFlag } },
      { new: true },
    );
    res.send(chat);
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId,
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

export const favoriteChat: RequestHandler = async (req, res, next) => {
  const predicate =
    'favoriteList.' + req.body.participants.indexOf(req.tokenData.userId);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants: req.body.participants },
      { $set: { [predicate]: req.body.favoriteFlag } },
      { new: true },
    );
    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};

export const createCatalog: RequestHandler = async (req, res, next) => {
  console.log(req.body);
  const catalog = new Catalog({
    userId: req.tokenData.userId,
    catalogName: req.body.catalogName,
    chats: [req.body.chatId],
  });
  try {
    await catalog.save();
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

export const updateNameCatalog: RequestHandler = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      { catalogName: req.body.catalogName },
      { new: true },
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

export const addNewChatToCatalog: RequestHandler = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      { $addToSet: { chats: req.body.chatId } },
      { new: true },
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

export const removeChatFromCatalog: RequestHandler = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOneAndUpdate(
      {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      { $pull: { chats: req.body.chatId } },
      { new: true },
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

export const deleteCatalog: RequestHandler = async (req, res, next) => {
  try {
    await Catalog.remove({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    });
    res.end();
  } catch (err) {
    next(err);
  }
};

export const getCatalogs: RequestHandler = async (req, res, next) => {
  try {
    const catalogs = await Catalog.aggregate([
      { $match: { userId: req.tokenData.userId } },
      {
        $project: {
          _id: 1,
          catalogName: 1,
          chats: 1,
        },
      },
    ]);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
