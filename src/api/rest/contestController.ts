import http from 'api/interceptor';
import { ROUTE } from 'constants/general';
import type {
  DataForContestParams,
  DataForContestResponse,
  GetActiveContestsParams,
  GetContestParams,
  GetContestResponse,
  GetContestsResponse,
  GetCustomersContestsParams,
  UpdateContestResponse,
} from 'types/api/contest';

export const dataForContest = (data?: DataForContestParams) =>
  http.post<DataForContestResponse>(ROUTE.DATA_FOR_CONTEST, data);

export const getCustomersContests = (data: GetCustomersContestsParams) =>
  http.get<GetContestsResponse>(
    `${ROUTE.CONTESTS}?${new URLSearchParams({
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
    `${ROUTE.CONTESTS}?${new URLSearchParams(options as any)}`,
  );

export const getContestById = ({ contestId }: GetContestParams) =>
  http.get<GetContestResponse>(`${ROUTE.CONTESTS}/${contestId}`);

export const updateContest = (data: FormData) =>
  http.put<UpdateContestResponse>(
    `${ROUTE.CONTESTS}/${data.get('contestId')}`,
    data,
  );
