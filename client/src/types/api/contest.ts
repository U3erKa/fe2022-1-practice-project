import { BrandStyle, Contest, Industry } from 'types/contest';

export type GetCustomersContestsParams = {
  limit?: number;
  offset?: number;
  contestStatus?: string;
};

export type GetActiveContestsParams = {
  offset?: number;
  limit?: number;
  typeIndex?: number;
  contestId?: number;
  industry?: Industry;
  awardSort?: 'ASC' | 'DESC';
  ownEntries?: boolean;
};

export type GetContestParams = { contestId: string | number };

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
