import type {
  ADD_CHAT_TO_OLD_CATALOG,
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  CREATE_NEW_CATALOG_AND_ADD_CHAT,
  FAVORITE_PREVIEW_CHAT_MODE,
  NORMAL_PREVIEW_CHAT_MODE,
} from 'constants/general';
import type { User } from 'types/models';
import type {
  ChatId,
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
export type ChatMode =
  | typeof BLOCKED_PREVIEW_CHAT_MODE
  | typeof CATALOG_PREVIEW_CHAT_MODE
  | typeof FAVORITE_PREVIEW_CHAT_MODE
  | typeof NORMAL_PREVIEW_CHAT_MODE;

export type CatalogCreationMode =
  | typeof ADD_CHAT_TO_OLD_CATALOG
  | typeof CREATE_NEW_CATALOG_AND_ADD_CHAT;

export type Catalog = WithId<'_id'> & {
  chats: ChatId[];
  catalogName: string;
};

export type MessagePreview = ChatData &
  Omit<WithTimeStamps, 'updatedAt'> &
  WithId<'_id'> & {
    interlocutor: Interlocutor;
    sender: SenderId;
    text: Message['body'];
  };

export type ChatData = WithBlackList &
  WithFavoriteList &
  WithId<'_id'> &
  WithParticipants;
