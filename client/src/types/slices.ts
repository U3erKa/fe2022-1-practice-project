import type { ChatId, ContestId, WithId } from './api/_common';
import type { Interlocutor, Message } from './api/chat';
import type { DataForContest, Offer } from './api/contest';
import type { Card, ProfileViewMode, User, UserInOffer } from './api/user';

import type {
  Catalog,
  CatalogCreationMode,
  ChatData,
  ChatMode,
  MessagePreview,
} from './chat';

import type { Contest, Industry, Status } from './contest';

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

export type ContestByIdState = {
  isFetching: boolean;
  contestData: ContestData | null;
  offers: Offer[];
  error: Error | null;
  addOfferError: Error | null;
  setOfferStatusError: Error | null;
  changeMarkError: Error | null;
  isEditContest: boolean;
  isBrief: boolean;
  isShowOnFull: boolean;
  isShowModal: boolean;
  imagePath: string | null;
};

export type ContestsState = {
  isFetching: boolean;
  error: Error | null;
  contests: Contest[];
  customerFilter: Status;
  creatorFilter: CreatorFilter;
  haveMore: boolean;
};

export type ContestUpdationState = {
  isFetching: boolean;
  error: Error | null;
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

export type CreatorFilter = {
  contestId?: string | ContestId;
  typeIndex?: number;
  industry?: Industry | '';
  awardSort?: 'ASC' | 'DESC';
  ownEntries?: boolean;
};

export type ContestData = WithId<ContestId> &
  Omit<Contest, 'Offers'> & {
    User: UserInOffer;
  };
