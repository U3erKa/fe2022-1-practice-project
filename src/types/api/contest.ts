import type {
  CREATOR,
  CUSTOMER,
  LOGO_CONTEST,
  NAME_CONTEST,
  TAGLINE_CONTEST,
} from 'constants/general';
import type {
  BrandStyle,
  Contest,
  Industry,
  StyleName,
  TypeOfName,
  TypeOfTagline,
} from 'types/contest';
import type { CreatorFilter } from 'types/slices';
import type {
  ContestId,
  OfferId,
  WithFile,
  WithId,
  WithPagination,
} from './_common';
import type { UserInOffer } from './_common';
import type { Rating, WithOfferStatus } from './offer';

export type GetContestsThunk =
  | { requestData: GetCustomersContestsParams; role: typeof CUSTOMER }
  | { requestData: GetActiveContestsParams; role: typeof CREATOR };

export type GetCustomersContestsParams = Partial<WithPagination> & {
  contestStatus?: Contest['status'];
};

export type GetActiveContestsParams = Partial<WithPagination> & CreatorFilter;

export type GetContestParams = WithId<ContestId, 'contestId'>;
export type GetContestResponse = WithId<ContestId> &
  Contest & { User: UserInOffer; Offers: Offer[] };

export type DataForContestParams = {
  characteristic1?: 'nameStyle' | 'typeOfTagline' | 'brandStyle';
  characteristic2?: 'typeOfName';
};

export type DataForContestResponse = DataForContest;

export type GetContestsResponse = { contests: Contest[]; haveMore: boolean };
export type UpdateContestResponse = Contest;

export type Offer = WithId<OfferId> &
  Partial<WithFile> &
  WithOfferStatus & {
    User: UserInOffer;
    text: string;
    mark?: Rating;
  };

export type DataForContest = {
  nameStyle?: StyleName[];
  typeOfName?: TypeOfName[];
  brandStyle?: BrandStyle[];
  typeOfTagline?: TypeOfTagline[];
  industry?: Industry[];
};

export type SaveContestToStore =
  | { type: typeof NAME_CONTEST; info: NameContestInfo }
  | { type: typeof LOGO_CONTEST; info: LogoContestInfo }
  | { type: typeof TAGLINE_CONTEST; info: TaglineContestInfo };

export type ContestInfo =
  | NameContestInfo
  | LogoContestInfo
  | TaglineContestInfo;

export type NameContestInfo = BaseContestInfo & {
  styleName: StyleName;
  typeOfName: TypeOfName;
};

export type LogoContestInfo = BaseContestInfo & {
  nameVenture: string;
  brandStyle: BrandStyle;
};

export type TaglineContestInfo = BaseContestInfo & {
  nameVenture: string;
  typeOfTagline: TypeOfTagline;
};

export type BaseContestInfo = {
  title: string;
  industry: string;
  focusOfWork: string;
  targetCustomer: string;
  file?: File;
};
