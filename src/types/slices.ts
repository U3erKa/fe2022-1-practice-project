import type { RefreshResponse } from 'api/rest/authController';
import type {
  GetCatalogsResponse,
  RemoveChatFromCatalogResponse,
} from 'api/rest/catalogController';
import type {
  GetChatResponse,
  GetPreviewResponse,
} from 'api/rest/chatController';
import type {
  DataForContestResponse,
  GetContestResponse,
  GetContestsResponse,
} from 'api/rest/contestController';
import type { GetEventsResponse } from 'api/rest/eventController';
import type {
  EXACT_CHOISE,
  NAME_ONLY_CHOISE,
  SIMILAR_CHOISE,
} from 'constants/buttonGroup';
import type {
  CASHOUT_MODE,
  LOGO_CONTEST,
  NAME_CONTEST,
  TAGLINE_CONTEST,
  USER_INFO_MODE,
} from 'constants/general';
import type {
  LogoContestContestType,
  NameContestContestType,
  TaglineContestContestType,
} from 'utils/schemas';
import type { ChatId, ContestId, WithId } from 'types/_common';
import type {
  LogoContestInfo,
  NameContestInfo,
  TaglineContestInfo,
} from 'types/contest';
import type { Offer } from 'types/models';
import type { CardField } from 'types/offer';
import type { UserInOffer } from './_common';
import type { CatalogCreationMode, ChatData, ChatMode } from './chat';
import type { Contest, Industry, Status } from './contest';

export type AuthState = WithFetch;

export type BundleState = {
  bundle: Bundle | null;
};

export type ChatState = GetChatResponse &
  WithFetch & {
    isShowCatalogCreation: boolean;
    isExpanded: boolean;
    isShow: boolean;
    isRenameCatalog: boolean;
    isShowChatsInCatalog: boolean;
    addChatId: ChatId | null;
    currentCatalog: RemoveChatFromCatalogResponse | null;
    chatData: ChatData | null;
    messagesPreview: GetPreviewResponse;
    catalogList: GetCatalogsResponse;
    chatMode: ChatMode;
    catalogCreationMode: CatalogCreationMode;
  };

export type ContestByIdState = WithFetch & {
  contestData:
    | (GetContestResponse & { Offers: ContestByIdState['offers'] })
    | null;
  offers: Offer['dataValues'][];
  haveMore: boolean;
  addOfferError: unknown;
  setOfferStatusError: unknown;
  changeMarkError: unknown;
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

export type ContestsState = GetContestsResponse &
  WithFetch & {
    customerFilter: Status;
    creatorFilter: CreatorFilter;
  };

export type ContestUpdationState = WithFetch;

export type DataForContestState = WithFetch & {
  data: DataForContestResponse | null;
};

export type EventState = WithFetch & { events: GetEventsResponse };

export type PaymentState = WithFetch & {
  focusOnElement: CardField;
};

export type UserProfileState = {
  profileViewMode: typeof CASHOUT_MODE | typeof USER_INFO_MODE;
  isEdit: boolean;
};

export type UserState = WithFetch & {
  data: RefreshResponse['user'] | null;
};

export type Bundle = {
  first: Omit<ContestsOrder, 'payment'>;
  name: Omit<ContestsOrder, NameContestContestType>;
  logo: Omit<ContestsOrder, LogoContestContestType | NameContestContestType>;
  tagline: Omit<
    ContestsOrder,
    LogoContestContestType | NameContestContestType | TaglineContestContestType
  >;
};

export type ContestsOrder =
  | 'payment'
  | LogoContestContestType
  | NameContestContestType
  | TaglineContestContestType;

export type CreatorFilter = {
  contestId?: ContestId;
  typeIndex?: number | string;
  industry?: '' | Industry;
  awardSort?: 'ASC' | 'DESC';
  ownEntries?: boolean;
};

export type ContestData = Omit<Contest, 'Offers'> &
  WithId & { User: UserInOffer };

export type WithFetch = { isFetching: boolean; error: unknown };

export type NameMatchesDomain =
  | typeof EXACT_CHOISE
  | typeof NAME_ONLY_CHOISE
  | typeof SIMILAR_CHOISE;
