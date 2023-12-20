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
  favoriteFlag: boolean;
};

export type ChangeChatFavoriteResponse = WithParticipantTuples & WithTimeStamps;
export type ChangeChatBlockParams = WithParticipants & {
  blackListFlag: boolean;
};

export type ChangeChatBlockResponse = WithParticipantTuples & WithTimeStamps;
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
  WithInterlocutor &
  WithTimeStamps['createdAt'] & {
    sender: SenderId;
    text: Message['body'];
  };

export type AddMessage = NewMessageResponse & {
  preview: { interlocutor: { email: string } };
};

export type GoToExtendedDialog = WithInterlocutor & {
  conversationData: WithParticipantTuples;
};

export type Interlocutor = WithId<InterlocutorId> &
  Pick<User, 'firstName' | 'lastName' | 'displayName' | 'avatar'>;

export type Message = With_id<MessageId> &
  With_id<ConversationId, 'conversation'> &
  WithId<SenderId, 'sender'> &
  WithTimeStamps & {
    body: string;
  };

export type WithParticipantTuples = With_id<ConversationId> &
  WithParticipants &
  WithFavoriteList &
  WithBlackList;

export type WithInterlocutor = { interlocutor: Interlocutor };
export type WithParticipants = { participants: [InterlocutorId, SenderId] };
export type WithFavoriteList = { favoriteList: [boolean, boolean] };
export type WithBlackList = { blackList: [boolean, boolean] };
