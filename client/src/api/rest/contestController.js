import queryString from 'query-string';

import http from '../interceptor';

export const dataForContest = (data) => http.post('dataForContest', data);
export const downloadContestFile = (data) =>
  http.get(`downloadFile/${data.fileName}`);

export const getCustomersContests = (data) =>
  http.get(
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

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.get(
    `contests?${queryString.stringify({
      offset,
      limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries,
    })}`,
  );

export const getContestById = (data) => http.get(`contests/${data.contestId}`);
export const updateContest = (/** @type {FormData} */ data) =>
  http.put(`contests/${data.get('contestId')}`, data);
