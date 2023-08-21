import type { Event as _Event } from 'types/api/event';

/**
 * Filters old items by id and appends new items. Returns new array
 */
export function addNewItems<T extends any[]>(initial: T, items: T): T {
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

export function getEventProgress({ date, createdAt }: _Event) {
  const currentDate = Date.now();
  const plannedDate = Date.parse(date);
  const createdAtDate = Date.parse(createdAt);
  const createdAtTimeframe = plannedDate - createdAtDate;
  const currentDateTimeframe = plannedDate - currentDate;
  const progressValue = 1 - currentDateTimeframe / createdAtTimeframe;

  const progress = Math.min(isNaN(progressValue) ? 0 : progressValue, 1);
  const time = getRemainingTime(currentDateTimeframe);
  return { progress, time };
}
