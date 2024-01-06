import type {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
  CREATOR,
  CUSTOMER,
  LOGO_CONTEST,
  NAME_CONTEST,
  TAGLINE_CONTEST,
} from 'constants/general';
import type {
  UserInOffer,
  WithFile,
  WithId,
  WithPagination,
  WithTimeStamps,
  WithUUID,
} from 'types/_common';
import type { Priority, Rating, WithOfferStatus } from 'types/offer';
import type { CreatorFilter } from 'types/slices';

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
export type Contest = LogoContest | NameContest | TaglineContest;

export type NameContest = BaseContest & {
  contestType: typeof NAME_CONTEST;
  typeOfName: TypeOfName;
  styleName: StyleName;
  nameVenture?: null;
  typeOfTagline?: null;
  brandStyle?: null;
};

export type LogoContest = BaseContest & {
  contestType: typeof LOGO_CONTEST;
  nameVenture: string;
  brandStyle: BrandStyle;
  typeOfName?: null;
  styleName?: null;
  typeOfTagline?: null;
};

export type TaglineContest = BaseContest & {
  contestType: typeof TAGLINE_CONTEST;
  nameVenture: string;
  typeOfTagline: TypeOfTagline;
  typeOfName?: null;
  styleName?: null;
  brandStyle?: null;
};

export type BaseContest = Omit<WithTimeStamps, 'updatedAt'> &
  Partial<WithFile> &
  WithId<'id' | 'userId'> &
  WithUUID<'orderId'> & {
    title: string;
    focusOfWork: string;
    targetCustomer: string;
    prize: number | string;
    industry: Industry;
    status: Status;
    priority: Priority;
    Offers: WithId[];
    count: BaseContest['Offers']['length'];
  };

export type TypeOfName = 'Company' | 'Product' | 'Project';

export type StyleName =
  | 'Any'
  | 'Classic'
  | 'Descriptive'
  | 'Fun'
  | 'Professional'
  | 'Youthful';

export type BrandStyle =
  | 'Brick & Mortar'
  | 'Fancy'
  | 'Fun'
  | 'Minimal'
  | 'Photo-based'
  | 'Techy';

export type Industry =
  | 'Biotech'
  | 'Builders'
  | 'Consulting Firm'
  | 'Creative Agency'
  | 'Education'
  | 'Footwear'
  | 'Medical'
  | 'Publisher'
  | 'Skin care';

export type TypeOfTagline =
  | 'Any'
  | 'Classic'
  | 'Descriptive'
  | 'Fun'
  | 'Modern'
  | 'Powerful';

export type Status =
  | typeof CONTEST_STATUS_ACTIVE
  | typeof CONTEST_STATUS_FINISHED
  | typeof CONTEST_STATUS_PENDING;

export type ContestType =
  | typeof LOGO_CONTEST
  | typeof NAME_CONTEST
  | typeof TAGLINE_CONTEST;
