import type { User } from './models';

export type WithId<T extends Id = Id, K extends string = 'id'> = {
  [key in K]: T;
};
/** SQL's unique id parameter */
export type Id = number | string;

export type UserId = User['id'];

export type SortOrder = 'ASC' | 'asc' | 'DESC' | 'desc';
export type OrderPredicate = [string, SortOrder][];

export type WithTimeStamps = { createdAt: Date; updatedAt: Date };
