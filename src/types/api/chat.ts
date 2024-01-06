import type { User } from 'types/models';
import type {
  InterlocutorId,
  SenderId,
  WithId,
  WithTimeStamps,
} from './_common';

export type GetDialogParams = {
  interlocutorId: InterlocutorId;
};

export type ChangeChatFavoriteParams = WithParticipants & {
  favoriteFlag: boolean;
};

export type ChangeChatBlockParams = WithParticipants & {
  blackListFlag: boolean;
};

export type NewMessageParams = WithInterlocutor & {
  recipient: InterlocutorId;
  messageBody: Message['body'];
};

export type AddMessage = {
  message: Message & WithParticipants;
  preview: Omit<Message, 'body' | 'conversation' | 'updatedAt'> &
    WithParticipantTuples & {
      text: Message['body'];
    };
} & {
  preview: { interlocutor: { email: string } };
};

export type GoToExtendedDialog = WithInterlocutor & {
  conversationData: WithId<'_id'> & WithParticipantTuples;
};

export type Interlocutor = Pick<
  User,
  'avatar' | 'displayName' | 'firstName' | 'lastName'
> &
  WithId;

export type Message = WithId<'_id' | 'conversation' | 'sender'> &
  WithTimeStamps & {
    body: string;
  };

export type WithParticipantTuples = WithBlackList &
  WithFavoriteList &
  WithParticipants;

export type WithInterlocutor = { interlocutor: Interlocutor };
export type WithParticipants = { participants: [InterlocutorId, SenderId] };
export type WithFavoriteList = { favoriteList: [boolean, boolean] };
export type WithBlackList = { blackList: [boolean, boolean] };
