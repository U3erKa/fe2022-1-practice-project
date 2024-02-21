import { ApplicationError } from 'errors';
import type { CreateEventResponse } from 'api/rest/eventController';
import type { WithId } from 'types/_common';

/**
 * Filters old items by id and appends new items. Returns new array
 */
export function addNewItems<T extends WithId[]>(initial: T, items: T): T {
  const newItemIds = items.map((item) => item.id);
  const uniqueItems = initial.filter((item) => !newItemIds.includes(item.id));

  return [...uniqueItems, ...items] as T;
}

export const getDays = (time: number) =>
  Math.floor(time / (1000 * 60 * 60 * 24));
export const getHours = (time: number) =>
  Math.floor((time / (1000 * 60 * 60)) % 24);
export const getMinutes = (time: number) =>
  Math.floor((time / (1000 * 60)) % 60);
export const getSeconds = (time: number) => Math.floor((time / 1000) % 60);

export const getRemainingTime = (time: number) => {
  const days = getDays(time);
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);
  const result: string[] = [];

  if (days > 0) result.push(`${days}d`);
  if (hours > 0) result.push(`${hours}h`);
  if (minutes > 0) result.push(`${minutes}m`);
  if (seconds > 0) result.push(`${seconds}s`);
  return result.join(' ') || '0s';
};

export const getLongTimeStr = (date: number | string | Date) => {
  const diff = Date.now() - new Date(date).valueOf();
  const days = getDays(diff);
  const hours = getHours(diff);
  const result: string[] = [];

  if (days !== 0) result.push(`${days} days`);
  if (hours !== 0) result.push(`${hours} hours`);
  return result.join(' ') || 'less than one hour';
};

export const getShortTimeStr = (time: number | string | Date) => {
  const currentTime = Date.now();
  const date = new Date(time);
  const days = getDays(currentTime) - getDays(date.valueOf());

  if (days <= 0) return `${date.getHours()}:${date.getMinutes()}`;
  if (days <= 7) return date.toDateString().substring(0, 3);
  if (days <= 365) return date.toDateString().substring(4, 10);
  return date.toDateString();
};

export function getEventProgress({
  date,
  createdAt,
}: Pick<CreateEventResponse, 'createdAt' | 'date'>) {
  const currentDate = Date.now();
  const plannedDate = Date.parse(date);
  const createdAtDate = Date.parse(createdAt as unknown as string);
  const createdAtTimeframe = plannedDate - createdAtDate;
  const currentDateTimeframe = plannedDate - currentDate;
  const progressValue = 1 - currentDateTimeframe / createdAtTimeframe;

  const progress = Math.min(isNaN(progressValue) ? 0 : progressValue, 1);
  const time = getRemainingTime(currentDateTimeframe);
  return { progress, time };
}

let _uniqueIdNum = 0;
/** Generates a unique ID. If `prefix` is given, the ID is appended to it */
export function uniqueId(prefix?: any) {
  return `${prefix?.toString() ?? ''}${++_uniqueIdNum}`;
}

export function isTuple(list: boolean[]): asserts list is [boolean, boolean] {
  if (!(list instanceof Array)) {
    throw new ApplicationError('Must be an array');
  }
  if (list.length !== 2) {
    throw new ApplicationError('Must be tuple of 2 booleans');
  }
}
