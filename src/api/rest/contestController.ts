import http from '../interceptor';

import type {
  DataForContestParams,
  DataForContestResponse,
  DownloadContestFileParams,
  GetActiveContestsParams,
  GetContestParams,
  GetContestResponse,
  GetContestsResponse,
  GetCustomersContestsParams,
  UpdateContestResponse,
} from 'types/api/contest';

export const dataForContest = (data?: DataForContestParams) =>
  http.post<DataForContestResponse>('dataForContest', data);

export const downloadContestFile = ({ fileName }: DownloadContestFileParams) =>
  http.get(`downloadFile/${fileName}`);

export const getCustomersContests = (data: GetCustomersContestsParams) =>
  http.get<GetContestsResponse>(
    `contests?${new URLSearchParams({
      limit: data.limit,
      offset: data.offset,
    } as any)}`,
    {
      headers: {
        status: data.contestStatus,
      },
    },
  );

export const getActiveContests = (options: GetActiveContestsParams) =>
  http.get<GetContestsResponse>(
    `contests?${new URLSearchParams(options as any)}`,
  );

export const getContestById = ({ contestId }: GetContestParams) =>
  http.get<GetContestResponse>(`contests/${contestId}`);

export const updateContest = (data: FormData) =>
  http.put<UpdateContestResponse>(`contests/${data.get('contestId')}`, data);