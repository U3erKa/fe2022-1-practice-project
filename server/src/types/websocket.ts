import type { Conversation, Message, User } from './models';

export type WebSocketMessage = {
  message: Message;
  preview: Pick<Message, '_id' | 'sender' | 'createdAt'> &
    Pick<Conversation, 'blackList' | 'favoriteList'> & {
      text: Message['body'];
      participants: [User['id'], User['id']];
      interlocutor: Pick<
        User,
        'id' | 'firstName' | 'lastName' | 'displayName' | 'avatar' | 'email'
      >;
    };
};
