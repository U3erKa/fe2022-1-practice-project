import type { User } from './models';

export type WithId<T extends Id = Id, K extends string = 'id'> = {
  [key in K]: T;
};
/** SQL's unique id parameter */
export type Id = string | number;

export type UserId = User['id'];

export type SortOrder = 'asc' | 'desc' | 'ASC' | 'DESC';
export type OrderPredicate = [string, SortOrder][];

export type WithTimeStamps = { createdAt: Date; updatedAt: Date };
