import type {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
  LOGO_CONTEST,
  NAME_CONTEST,
  TAGLINE_CONTEST,
} from 'constants/general';
import type {
  OfferId,
  UserId,
  WithFile,
  WithId,
  WithTimeStamps,
  WithUUID,
} from './api/_common';
import type { Priority } from './api/offer';

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
  WithId &
  WithId<UserId, 'userId'> &
  WithUUID<'orderId'> & {
    title: string;
    focusOfWork: string;
    targetCustomer: string;
    prize: number | string;
    industry: Industry;
    status: Status;
    priority: Priority;
    Offers: WithId<OfferId>[];
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
