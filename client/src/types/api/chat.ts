import type { User } from './user';

import type {
  ConversationId,
  InterlocutorId,
  MessageId,
  SenderId,
  TimeStamp,
  WithTimeStamps,
  With_id,
  With__v,
} from './_common';

export type GetDialogParams = {
  interlocutorId: InterlocutorId;
};

export type GetDialogResponse = WithInterlocutor & { messages: Message[] };
export type ChangeChatFavoriteParams = WithParticipants & {
  favoriteFlag: FavoriteFlag;
};

export type ChangeChatFavoriteResponse = ChangeChatResponse;
export type ChangeChatBlockParams = WithParticipants & {
  blackListFlag: BlackListFlag;
};

export type ChangeChatBlockResponse = ChangeChatResponse;
export type NewMessageParams = WithInterlocutor & {
  recipient: InterlocutorId;
  messageBody: Message['body'];
};

export type NewMessageResponse = {
  message: Message & WithParticipants & With__v;
  preview: Omit<Message, 'body' | 'conversation' | 'updatedAt'> & {
    text: Message['body'];
  };
};

export type GetPreviewChatResponse = WithParticipantTuples & {
  sender: SenderId;
  text: Message['body'];
  createAt: TimeStamp;
};

export type ChangeChatResponse = WithParticipantTuples &
  With__v &
  WithTimeStamps;

export type Interlocutor = {
  id: InterlocutorId;
  firstName: User['firstName'];
  lastName: User['lastName'];
  displayName: User['displayName'];
  avatar: User['avatar'];
};

export type Message = With_id<MessageId> &
  WithTimeStamps & {
    body: string;
    conversation: ConversationId;
    sender: SenderId;
  };

export type FavoriteFlag = boolean;
export type BlackListFlag = boolean;

export type WithParticipantTuples = With_id &
  WithParticipants &
  WithFavoriteList &
  WithBlackList &
  WithInterlocutor;

export type WithInterlocutor = { interlocutor: Interlocutor };
export type WithParticipants = { participants: [InterlocutorId, SenderId] };
export type WithFavoriteList = { favoriteList: [FavoriteFlag, FavoriteFlag] };
export type WithBlackList = { blackList: [BlackListFlag, BlackListFlag] };
