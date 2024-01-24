import {
  type ActionReducerMapBuilder,
  type PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import isEqual from 'fast-deep-equal/es6/react';
import * as catalogController from 'api/rest/catalogController';
import * as chatController from 'api/rest/chatController';
import {
  ADD_CHAT_TO_OLD_CATALOG,
  NORMAL_PREVIEW_CHAT_MODE,
} from 'constants/general';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from 'utils/store';
import type {
  AddChatToCatalogParams,
  ChangeCatalogNameParams,
  CreateCatalogParams,
  DeleteCatalogParams,
  RemoveChatFromCatalogParams,
} from 'types/catalog';
import type {
  AddMessage,
  ChangeChatBlockParams,
  ChangeChatFavoriteParams,
  GetDialogParams,
  GoToExtendedDialog,
  NewMessageParams,
} from 'types/chat';
import type {
  Catalog,
  CatalogCreationMode,
  ChatData,
  ChatMode,
} from 'types/chat';
import type { ChatState } from 'types/slices';

const CHAT_SLICE_NAME = 'chat';

const initialState: ChatState = {
  isFetching: true,
  error: null,
  addChatId: null,
  catalogCreationMode: ADD_CHAT_TO_OLD_CATALOG,
  catalogList: [],
  chatData: null,
  chatMode: NORMAL_PREVIEW_CHAT_MODE,
  currentCatalog: null,
  interlocutor: null,
  isExpanded: false,
  isRenameCatalog: false,
  isShow: false,
  isShowCatalogCreation: false,
  isShowChatsInCatalog: false,
  messages: [],
  messagesPreview: [],
};

export const getPreviewChat = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getPreviewChat`,
  thunk: async () => {
    const { data } = await chatController.getPreviewChat();
    return data;
  },
});

const getPreviewChatExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(getPreviewChat.pending, pendingReducer)
    .addCase(getPreviewChat.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.messagesPreview = payload;
      state.error = null;
    })
    .addCase(getPreviewChat.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
      state.messagesPreview = [];
    });
};

export const getDialogMessages = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getDialogMessages`,
  thunk: async (payload: GetDialogParams) => {
    const { data } = await chatController.getDialog(payload);
    return data;
  },
});

const getDialogMessagesExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(getDialogMessages.pending, pendingReducer)
    .addCase(getDialogMessages.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { interlocutor, messages } = payload;
      state.interlocutor = interlocutor;
      state.messages = messages;
    })
    .addCase(getDialogMessages.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.interlocutor = null;
      state.messages = [];
      state.error = payload;
    });
};

export const sendMessage = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/sendMessage`,
  thunk: async (payload: NewMessageParams) => {
    const { data } = await chatController.newMessage(payload);
    return data;
  },
});

const sendMessageExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(sendMessage.pending, pendingReducer)
    .addCase(sendMessage.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { messagesPreview } = state;
      const { message, preview } = payload;
      let isNew = true;
      for (const preview of messagesPreview) {
        if (isEqual(preview.participants, message.participants)) {
          preview.createdAt = message.createdAt;
          preview.sender = message.sender;
          preview.text = message.body;
          isNew = false;
        }
      }
      if (isNew) {
        messagesPreview.push(preview);
      }
      const chatData = {
        _id: preview._id,
        blackList: preview.blackList,
        favoriteList: preview.favoriteList,
        participants: preview.participants,
      };
      state.chatData = { ...state.chatData!, ...chatData };
      state.messages = [...state.messages, message];
      state.messagesPreview = messagesPreview;
    })
    .addCase(sendMessage.rejected, rejectedReducer);
};

export const changeChatFavorite = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatFavorite`,
  thunk: async (payload: ChangeChatFavoriteParams) => {
    const { data } = await chatController.changeChatFavorite(payload);
    return data;
  },
});

const changeChatFavoriteExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(changeChatFavorite.pending, pendingReducer)
    .addCase(changeChatFavorite.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { messagesPreview } = state;
      for (const preview of messagesPreview) {
        if (isEqual(preview.participants, payload.participants))
          preview.favoriteList = payload.favoriteList;
      }
      state.chatData = payload;
      state.messagesPreview = messagesPreview;
    })
    .addCase(changeChatFavorite.rejected, rejectedReducer);
};

export const changeChatBlock = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatBlock`,
  thunk: async (payload: ChangeChatBlockParams) => {
    const { data } = await chatController.changeChatBlock(payload);
    return data;
  },
});

const changeChatBlockExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(changeChatBlock.pending, pendingReducer)
    .addCase(changeChatBlock.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { messagesPreview } = state;
      for (const preview of messagesPreview) {
        if (isEqual(preview.participants, payload.participants))
          preview.blackList = payload.blackList;
      }
      state.chatData = payload;
      state.messagesPreview = messagesPreview;
    })
    .addCase(changeChatBlock.rejected, rejectedReducer);
};

export const getCatalogList = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getCatalogList`,
  thunk: async () => {
    const { data } = await catalogController.getCatalogList();
    for (const { chats } of data) {
      // @ts-expect-error
      const chatIds = chats.map(({ _id }) => _id);
      Object.assign(chats, chatIds);
    }
    return data;
  },
});

const getCatalogListExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(getCatalogList.pending, pendingReducer)
    .addCase(getCatalogList.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.catalogList = payload;
    })
    .addCase(getCatalogList.rejected, rejectedReducer);
};

export const addChatToCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/addChatToCatalog`,
  thunk: async (payload: AddChatToCatalogParams) => {
    const { data } = await catalogController.addChatToCatalog(payload);
    return data;
  },
});

const addChatToCatalogExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(addChatToCatalog.pending, pendingReducer)
    .addCase(addChatToCatalog.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { catalogList } = state;
      for (const catalog of catalogList) {
        if (catalog._id === payload._id) {
          catalog.chats = payload.chats;
          break;
        }
      }
      state.isShowCatalogCreation = false;
      state.catalogList = [...catalogList];
    })
    .addCase(addChatToCatalog.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
      state.isShowCatalogCreation = false;
    });
};

export const createCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/createCatalog`,
  thunk: async (payload: CreateCatalogParams) => {
    const { data } = await catalogController.createCatalog(payload);
    return data;
  },
});

const createCatalogExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(createCatalog.pending, pendingReducer)
    .addCase(createCatalog.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.catalogList = [...state.catalogList, payload];
      state.isShowCatalogCreation = false;
    })
    .addCase(createCatalog.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isShowCatalogCreation = false;
      state.error = payload;
    });
};

export const deleteCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/deleteCatalog`,
  thunk: async (payload: DeleteCatalogParams) => {
    await catalogController.deleteCatalog(payload);
    return payload;
  },
});

const deleteCatalogExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(deleteCatalog.pending, pendingReducer)
    .addCase(deleteCatalog.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { catalogList } = state;
      const newCatalogList = catalogList.filter(
        (catalog) => payload.catalogId !== catalog._id,
      );
      state.catalogList = newCatalogList;
    })
    .addCase(deleteCatalog.rejected, rejectedReducer);
};

export const removeChatFromCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/removeChatFromCatalog`,
  thunk: async (payload: RemoveChatFromCatalogParams) => {
    const { data } = await catalogController.removeChatFromCatalog(payload);
    const chatIds: string[] = [];

    // @ts-expect-error
    for (const { _id } of data.chats) {
      if (_id !== payload.chatId) chatIds.push(_id);
    }

    Object.assign(data, { chats: chatIds });

    return data;
  },
});

const removeChatFromCatalogExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(removeChatFromCatalog.pending, pendingReducer)
    .addCase(removeChatFromCatalog.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { catalogList } = state;
      for (const catalog of catalogList) {
        if (catalog._id === payload._id) {
          catalog.chats = payload.chats;
          break;
        }
      }
      state.currentCatalog = payload;
      state.catalogList = [...catalogList];
    })
    .addCase(removeChatFromCatalog.rejected, rejectedReducer);
};

export const changeCatalogName = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeCatalogName`,
  thunk: async (payload: ChangeCatalogNameParams) => {
    const { data } = await catalogController.changeCatalogName(payload);
    return data;
  },
});

const changeCatalogNameExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder
    .addCase(changeCatalogName.pending, pendingReducer)
    .addCase(changeCatalogName.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { catalogList } = state;
      for (const catalog of catalogList) {
        if (catalog._id === payload._id) {
          catalog.catalogName = payload.catalogName;
          break;
        }
      }
      state.catalogList = [...catalogList];
      state.currentCatalog = payload;
      state.isRenameCatalog = false;
    })
    .addCase(changeCatalogName.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isRenameCatalog = false;
      state.error = payload;
    });
};

const reducers = {
  changeBlockStatusInStore: (
    state: ChatState,
    { payload }: PayloadAction<ChatData>,
  ) => {
    const { messagesPreview } = state;
    for (const preview of messagesPreview) {
      if (isEqual(preview.participants, payload.participants))
        preview.blackList = payload.blackList;
    }
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  },

  addMessage: (state: ChatState, { payload }: PayloadAction<AddMessage>) => {
    const { message, preview } = payload;
    const { messagesPreview } = state;
    let isNew = true;
    for (const preview of messagesPreview) {
      if (isEqual(preview.participants, message.participants)) {
        preview.createdAt = message.createdAt;
        preview.sender = message.sender;
        preview.text = message.body;
        isNew = false;
      }
    }
    if (isNew) {
      messagesPreview.push(preview);
    }
    state.messagesPreview = messagesPreview;
    state.messages = [...state.messages, message];
  },

  backToDialogList: (state: ChatState) => {
    state.isExpanded = false;
  },

  goToExpandedDialog: (
    state: ChatState,
    { payload }: PayloadAction<GoToExtendedDialog>,
  ) => {
    state.interlocutor = { ...state.interlocutor, ...payload.interlocutor };
    state.chatData = payload.conversationData;
    state.isShow = true;
    state.isExpanded = true;
    state.messages = [];
  },

  clearMessageList: (state: ChatState) => {
    state.messages = [];
  },

  changeChatShow: (state: ChatState) => {
    state.isShowCatalogCreation = false;
    state.isShow = !state.isShow;
  },

  setPreviewChatMode: (
    state: ChatState,
    { payload }: PayloadAction<ChatMode>,
  ) => {
    state.chatMode = payload;
  },

  changeShowModeCatalog: (
    state: ChatState,
    { payload }: PayloadAction<Catalog | undefined>,
  ) => {
    // @ts-expect-error
    state.currentCatalog = { ...state.currentCatalog, ...payload };
    state.isShowChatsInCatalog = !state.isShowChatsInCatalog;
    state.isRenameCatalog = false;
  },

  changeTypeOfChatAdding: (
    state: ChatState,
    { payload }: PayloadAction<CatalogCreationMode>,
  ) => {
    state.catalogCreationMode = payload;
  },

  changeShowAddChatToCatalogMenu: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['addChatId']>,
  ) => {
    state.addChatId = payload;
    state.isShowCatalogCreation = !state.isShowCatalogCreation;
  },

  changeRenameCatalogMode: (state: ChatState) => {
    state.isRenameCatalog = !state.isRenameCatalog;
  },

  clearChatError: (state: ChatState) => {
    state.error = null;
  },
};

const extraReducers = (builder: ActionReducerMapBuilder<ChatState>) => {
  addChatToCatalogExtraReducers(builder);
  changeCatalogNameExtraReducers(builder);
  changeChatBlockExtraReducers(builder);
  changeChatFavoriteExtraReducers(builder);
  createCatalogExtraReducers(builder);
  deleteCatalogExtraReducers(builder);
  getCatalogListExtraReducers(builder);
  getDialogMessagesExtraReducers(builder);
  getPreviewChatExtraReducers(builder);
  removeChatFromCatalogExtraReducers(builder);
  sendMessageExtraReducers(builder);
};

const chatSlice = createSlice({
  name: CHAT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = chatSlice;

export const {
  changeBlockStatusInStore,
  addMessage,
  backToDialogList,
  goToExpandedDialog,
  clearMessageList,
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  changeTypeOfChatAdding,
  changeShowAddChatToCatalogMenu,
  changeRenameCatalogMode,
  clearChatError,
} = actions;

export default reducer;
