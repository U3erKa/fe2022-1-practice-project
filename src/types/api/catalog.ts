import type { WithId } from 'types/api/_common';

export type AddChatToCatalogParams = WithId<'catalogId' | 'chatId'>;
export type RemoveChatFromCatalogParams = WithId<'catalogId' | 'chatId'>;
export type CreateCatalogParams = WithCatalogName & WithId<'chatId'>;
export type DeleteCatalogParams = WithId<'catalogId'>;
export type ChangeCatalogNameParams = WithCatalogName & WithId<'catalogId'>;

export type WithCatalogName = { catalogName: string };
