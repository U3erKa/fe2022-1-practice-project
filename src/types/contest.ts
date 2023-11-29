import type {
  OfferId,
  OrderId,
  UserId,
  WithFile,
  WithId,
  WithTimeStamps,
  WithUUID,
} from './api/_common';
import type { Priority } from './api/offer';
import type {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
  LOGO_CONTEST,
  NAME_CONTEST,
  TAGLINE_CONTEST,
} from 'constants/general';

export type Contest = NameContest | LogoContest | TaglineContest;

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

export type BaseContest = WithId &
  WithId<UserId, 'userId'> &
  WithUUID<'orderId'> &
  Omit<WithTimeStamps, 'updatedAt'> &
  Partial<WithFile> & {
    title: string;
    focusOfWork: string;
    targetCustomer: string;
    prize: string | number;
    industry: Industry;
    status: Status;
    priority: Priority;
    Offers: WithId<OfferId>[];
    count: BaseContest['Offers']['length'];
  };

export type TypeOfName = 'Company' | 'Product' | 'Project';

export type StyleName =
  | 'Classic'
  | 'Fun'
  | 'Professional'
  | 'Descriptive'
  | 'Youthful'
  | 'Any';

export type BrandStyle =
  | 'Techy'
  | 'Fun'
  | 'Fancy'
  | 'Minimal'
  | 'Brick & Mortar'
  | 'Photo-based';

export type Industry =
  | 'Creative Agency'
  | 'Consulting Firm'
  | 'Skin care'
  | 'Biotech'
  | 'Publisher'
  | 'Education'
  | 'Footwear'
  | 'Medical'
  | 'Builders';

export type TypeOfTagline =
  | 'Classic'
  | 'Fun'
  | 'Powerful'
  | 'Descriptive'
  | 'Modern'
  | 'Any';

export type Status =
  | typeof CONTEST_STATUS_ACTIVE
  | typeof CONTEST_STATUS_FINISHED
  | typeof CONTEST_STATUS_PENDING;

export type ContestType =
  | typeof NAME_CONTEST
  | typeof LOGO_CONTEST
  | typeof TAGLINE_CONTEST;
