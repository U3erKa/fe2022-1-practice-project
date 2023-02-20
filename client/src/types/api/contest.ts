import type { BrandStyle, Contest, Industry } from 'types/contest';
import type { ContestId, WithId, WithPagination } from './_common';

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

export type DataForContestParams = {
  characteristic1?: 'nameStyle' | 'typeOfTagline' | 'brandStyle';
  characteristic2?: 'typeOfName';
};

export type DataForContestResponse = {
  brandStyle: BrandStyle;
  industry: Industry;
};

export type DownloadContestFileParams = { fileName: string };
export type GetContestsResponse = { contests: Contest[]; haveMore: boolean };
export type GetContestResponse = { contestData: Contest };
export type UpdateContestResponse = Contest;
