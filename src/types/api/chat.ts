import type {
  ConversationId,
  InterlocutorId,
  MessageId,
  SenderId,
  WithId,
  WithTimeStamps,
  With_id,
} from './_common';
import type { User } from './user';

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
  message: Message & WithParticipants;
  preview: Omit<Message, 'body' | 'conversation' | 'updatedAt'> &
    Omit<WithParticipantTuples, '_id'> & {
      text: Message['body'];
    };
};

export type GetPreviewChatResponse = WithParticipantTuples &
  WithTimeStamps['createdAt'] & {
    sender: SenderId;
    text: Message['body'];
  };

export type ChangeChatResponse = WithParticipantTuples & WithTimeStamps;

export type AddMessage = NewMessageResponse & {
  preview: { interlocutor: { email: string } };
};

export type GoToExtendedDialog = WithInterlocutor & {
  conversationData: Omit<WithParticipantTuples, 'interlocutor'>;
};

export type Interlocutor = {
  id: InterlocutorId;
  firstName: User['firstName'];
  lastName: User['lastName'];
  displayName: User['displayName'];
  avatar: User['avatar'];
};

export type Message = With_id<MessageId> &
  With_id<ConversationId, 'conversation'> &
  WithId<SenderId, 'sender'> &
  WithTimeStamps & {
    body: string;
  };

export type FavoriteFlag = boolean;
export type BlackListFlag = boolean;

export type WithParticipantTuples = With_id<ConversationId> &
  WithParticipants &
  WithFavoriteList &
  WithBlackList &
  WithInterlocutor;

export type WithInterlocutor = { interlocutor: Interlocutor };
export type WithParticipants = { participants: [InterlocutorId, SenderId] };
export type WithFavoriteList = { favoriteList: [FavoriteFlag, FavoriteFlag] };
export type WithBlackList = { blackList: [BlackListFlag, BlackListFlag] };
