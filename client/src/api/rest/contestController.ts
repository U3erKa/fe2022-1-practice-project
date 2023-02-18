import queryString from 'query-string';

import http from '../interceptor';

import type {
  DataForContestParams,
  DataForContestResponse,
  DownloadContestFileParams,
  GetCustomersContestsParams,
  GetContestsResponse,
  GetActiveContestsParams,
  GetContestParams,
  GetContestResponse,
  UpdateContestResponse,
} from 'types/api/contest';

export const dataForContest = (data?: DataForContestParams) =>
  http.post<DataForContestResponse>('dataForContest', data);

export const downloadContestFile = ({ fileName }: DownloadContestFileParams) =>
  http.get(`downloadFile/${fileName}`);

export const getCustomersContests = (data: GetCustomersContestsParams) =>
  http.get<GetContestsResponse>(
    `contests?${queryString.stringify({
      limit: data.limit,
      offset: data.offset,
    })}`,
    {
      headers: {
        status: data.contestStatus,
      },
    },
  );

export const getActiveContests = (options: GetActiveContestsParams) =>
  http.get<GetContestsResponse>(`contests?${queryString.stringify(options)}`);

export const getContestById = ({ contestId }: GetContestParams) =>
  http.get<GetContestResponse>(`contests/${contestId}`);

export const updateContest = (data: FormData) =>
  http.put<UpdateContestResponse>(`contests/${data.get('contestId')}`, data);
