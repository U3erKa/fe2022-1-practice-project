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
import type { ContestId, WithFile, WithId, WithPagination } from './_common';
import type { UserInOffer } from './_common';
import type { Rating, WithOfferStatus } from './offer';

export type GetContestsThunk =
  | { requestData: GetActiveContestsParams; role: typeof CREATOR }
  | { requestData: GetCustomersContestsParams; role: typeof CUSTOMER };

export type GetCustomersContestsParams = Partial<WithPagination> & {
  contestStatus?: Contest['status'];
};

export type GetActiveContestsParams = CreatorFilter & Partial<WithPagination>;

export type GetContestParams = WithId<'contestId'>;

export type DataForContestParams = {
  characteristic1?: 'brandStyle' | 'nameStyle' | 'typeOfTagline';
  characteristic2?: 'typeOfName';
};

export type Offer = Partial<WithFile> &
  WithId &
  WithOfferStatus & {
    User: UserInOffer;
    text: string;
    mark?: Rating;
  };

export type SaveContestToStore =
  | { type: typeof LOGO_CONTEST; info: LogoContestInfo }
  | { type: typeof NAME_CONTEST; info: NameContestInfo }
  | { type: typeof TAGLINE_CONTEST; info: TaglineContestInfo };

export type ContestInfo =
  | LogoContestInfo
  | NameContestInfo
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
