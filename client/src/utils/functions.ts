/**
 * Filters old items by id and appends new items. Returns new array
 */
export function addNewItems<T extends any[]>(initial: T, items: T): T {
  const newItemIds = items.map((item) => item.id);
  const uniqueItems = initial.filter((item) => !newItemIds.includes(item.id));

  return [...uniqueItems, ...items] as T;
}
