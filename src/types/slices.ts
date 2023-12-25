import type { ChatId, ContestId, WithId } from './api/_common';
import type { Interlocutor, Message } from './api/chat';
import type {
  DataForContest,
  LogoContestInfo,
  NameContestInfo,
  Offer,
  TaglineContestInfo,
} from './api/contest';
import type { CardField } from './api/offer';
import type { ProfileViewMode, User, UserInOffer } from './api/user';
import type {
  Catalog,
  CatalogCreationMode,
  ChatData,
  ChatMode,
  MessagePreview,
} from './chat';
import type { Contest, Industry, Status } from './contest';
import type {
  LOGO_CONTEST,
  NAME_CONTEST,
  TAGLINE_CONTEST,
} from 'constants/general';
import type {
  EXACT_CHOISE,
  NAME_ONLY_CHOISE,
  SIMILAR_CHOISE,
} from 'constants/buttonGroup';

export type AuthState = WithFetch;

export type BundleState = {
  bundle: Bundle | null;
};

export type ChatState = WithFetch & {
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

export type ContestByIdState = WithFetch & {
  contestData: ContestData | null;
  offers: Offer[];
  haveMore: boolean;
  addOfferError: ServerError | null;
  setOfferStatusError: ServerError | null;
  changeMarkError: Error | null;
  isReviewed: boolean;
  isEditContest: boolean;
  isBrief: boolean;
  isShowOnFull: boolean;
  isShowModal: boolean;
  imagePath: string | null;
};

export type ContestCreationState = {
  contests: {
    [NAME_CONTEST]?: NameContestInfo;
    [LOGO_CONTEST]?: LogoContestInfo;
    [TAGLINE_CONTEST]?: TaglineContestInfo;
  };
  nameMathesDomain: NameMatchesDomain;
};

export type ContestsState = WithFetch & {
  contests: Contest[];
  customerFilter: Status;
  creatorFilter: CreatorFilter;
  haveMore: boolean;
};

export type ContestUpdationState = WithFetch;

export type DataForContestState = WithFetch & {
  data: DataForContest | null;
};

export type PaymentState = WithFetch & {
  focusOnElement: CardField;
};

export type UserProfileState = {
  profileViewMode: ProfileViewMode;
  isEdit: boolean;
};

export type UserState = WithFetch & {
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
  contestId?: ContestId;
  typeIndex?: string | number;
  industry?: Industry | '';
  awardSort?: 'ASC' | 'DESC';
  ownEntries?: boolean;
};

export type ContestData = WithId<ContestId> &
  Omit<Contest, 'Offers'> & {
    User: UserInOffer;
  };

export type ServerError = { data: string; status: number };
export type WithFetch = { isFetching: boolean; error: ServerError | null };

export type NameMatchesDomain =
  | typeof EXACT_CHOISE
  | typeof SIMILAR_CHOISE
  | typeof NAME_ONLY_CHOISE;
