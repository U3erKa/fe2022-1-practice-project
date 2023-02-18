import type {
  NAME_CONTEST,
  TAGLINE_CONTEST,
  LOGO_CONTEST,
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
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
  typeOfTagline: string;
  typeOfName?: null;
  styleName?: null;
  brandStyle?: null;
};

export type BaseContest = {
  id: number;
  orderId: string;
  userId: number;
  title: string;
  industry: Industry;
  focusOfWork: string;
  targetCustomer: string;
  createdAt: string;
  status: Status;
  prize: string | number;
  priority: number;
  Offers: { id: number }[];
  count: number;
  fileName?: string | null;
  originalFileName?: string | null;
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

export type Status =
  | typeof CONTEST_STATUS_ACTIVE
  | typeof CONTEST_STATUS_FINISHED
  | typeof CONTEST_STATUS_PENDING;
