import http from 'api/interceptor';
import type {
  GET as GetContestHandler,
  PUT as UpdateContestHandler,
} from 'app/api/contests/[contestId]/route';
import type { GET as GetContestsHandler } from 'app/api/contests/route';
import type { POST as DataForContestHandler } from 'app/api/dataForContest/route';
import { ROUTE } from 'constants/general';
import type { APIHandlerReturn } from 'types/_common';
import type {
  DataForContestParams,
  GetActiveContestsParams,
  GetContestParams,
  GetCustomersContestsParams,
} from 'types/api/contest';

export type DataForContestResponse = APIHandlerReturn<
  typeof DataForContestHandler
>;
export type GetContestsResponse = APIHandlerReturn<typeof GetContestsHandler>;
export type GetContestResponse = APIHandlerReturn<typeof GetContestHandler>;
export type UpdateContestResponse = APIHandlerReturn<
  typeof UpdateContestHandler
>;

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
