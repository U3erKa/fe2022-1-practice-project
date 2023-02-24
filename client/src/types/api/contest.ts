import type { CREATOR, CUSTOMER } from 'constants/general';
import type { BrandStyle, Contest, Industry } from 'types/contest';
import type { Rating, WithOfferStatus } from './offer';
import type { UserWithoutPassword } from './user';

import type {
  ContestId,
  OfferId,
  WithFile,
  WithId,
  WithPagination,
} from './_common';

export type GetContestsThunk =
  | {
      requestData: GetCustomersContestsParams;
      role: typeof CUSTOMER;
    }
  | {
      requestData: GetActiveContestsParams;
      role: typeof CREATOR;
    };

export type GetCustomersContestsParams = Partial<WithPagination> & {
  contestStatus?: Contest['status'];
};

export type GetActiveContestsParams = Partial<
  WithId<ContestId, 'contestId'> & WithPagination
> & {
  typeIndex?: number;
  industry?: Industry;
  awardSort?: 'ASC' | 'DESC';
  ownEntries?: boolean;
};

export type GetContestParams = WithId<ContestId, 'contestId'>;
export type GetContestResponse = WithId<OfferId> &
  Contest & {
    Offers: Offer[];
  };

export type DataForContestParams = {
  characteristic1?: 'nameStyle' | 'typeOfTagline' | 'brandStyle';
  characteristic2?: 'typeOfName';
};

export type DataForContestResponse = DataForContest;

export type DownloadContestFileParams = { fileName: string };
export type GetContestsResponse = { contests: Contest[]; haveMore: boolean };
export type UpdateContestResponse = Contest;

export type Offer = Partial<WithFile> &
  WithOfferStatus & {
    User: Omit<UserWithoutPassword, 'role' | 'balance'> & { rating: Rating };
    text: string;
  };

export type DataForContest = {
  brandStyle: BrandStyle;
  industry: Industry;
};
