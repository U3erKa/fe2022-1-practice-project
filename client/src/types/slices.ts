import type { ChatId } from './api/_common';
import type { Interlocutor, Message } from './api/chat';

import type {
  Catalog,
  CatalogCreationMode,
  ChatData,
  ChatMode,
  MessagePreview,
} from './chat';

import type { Card, ProfileViewMode, User } from './api/user';
import type { DataForContest } from './api/contest';

export type AuthState = {
  isFetching: boolean;
  error: Error | null;
};

export type BundleState = {
  bundle: Bundle | null;
};

export type ChatState = {
  isFetching: boolean;
  error: Error | null;
  isShowCatalogCreation: boolean;
  isExpanded: boolean;
  isShow: boolean;
  isRenameCatalog: boolean;
  isShowChatsInCatalog: boolean;
  addChatId: ChatId | null;
  currentCatalog: Catalog | null;
  chatData: ChatData | null;
  messages: Message[];
  interlocutor: Interlocutor | null;
  messagesPreview: MessagePreview[];
  catalogList: Catalog[];
  chatMode: ChatMode;
  catalogCreationMode: CatalogCreationMode;
};

export type DataForContestState = {
  isFetching: boolean;
  data: DataForContest | null;
  error: Error | null;
};

export type PaymentState = {
  isFetching: boolean;
  error: Error | null;
  focusOnElement: keyof Omit<Card, 'balance'>;
};

export type UserProfileState = {
  profileViewMode: ProfileViewMode;
  isEdit: boolean;
};

export type UserState = {
  isFetching: boolean;
  error: Error | null;
  data: User | null;
};

export type Bundle = {
  first: Omit<ContestsOrder, 'payment'>;
  name: Omit<ContestsOrder, 'name'>;
  logo: Omit<ContestsOrder, 'name' | 'logo'>;
  tagline: Omit<ContestsOrder, 'name' | 'logo' | 'payment'>;
};

export type ContestsOrder = 'name' | 'logo' | 'tagline' | 'payment';
