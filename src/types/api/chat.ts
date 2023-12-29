import type { User } from 'types/models';
import type {
  ConversationId,
  InterlocutorId,
  MessageId,
  SenderId,
  WithId,
  WithTimeStamps,
  With_id,
} from './_common';

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

export type GetPreviewChatResponse = WithInterlocutor &
  WithParticipantTuples &
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

export type Interlocutor = Pick<
  User,
  'avatar' | 'displayName' | 'firstName' | 'lastName'
> &
  WithId<InterlocutorId>;

export type Message = With_id<ConversationId, 'conversation'> &
  With_id<MessageId> &
  WithId<SenderId, 'sender'> &
  WithTimeStamps & {
    body: string;
  };

export type WithParticipantTuples = With_id<ConversationId> &
  WithBlackList &
  WithFavoriteList &
  WithParticipants;

export type WithInterlocutor = { interlocutor: Interlocutor };
export type WithParticipants = { participants: [InterlocutorId, SenderId] };
export type WithFavoriteList = { favoriteList: [boolean, boolean] };
export type WithBlackList = { blackList: [boolean, boolean] };
