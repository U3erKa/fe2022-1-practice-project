export type WithId<T extends Id = Id, K extends string = 'id'> = {
  [key in K]: T;
};
/** SQL's unique id parameter */
export type Id = string | number;
/** MongoDB's `_id` parameter */
export type _Id = string;

export type UserId = Id;
