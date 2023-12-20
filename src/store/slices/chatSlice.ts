import {
  type ActionReducerMapBuilder,
  type PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { isEqual } from 'radash';
import * as catalogController from 'api/rest/catalogController';
import * as chatController from 'api/rest/chatController';
import {
  ADD_CHAT_TO_OLD_CATALOG,
  NORMAL_PREVIEW_CHAT_MODE,
} from 'constants/general';
import {
  createExtraReducers,
  decorateAsyncThunk,
  rejectedReducer,
} from 'utils/store';
import type {
  AddChatToCatalogParams,
  AddChatToCatalogResponse,
  ChangeCatalogNameParams,
  ChangeCatalogNameResponse,
  CreateCatalogParams,
  CreateCatalogResponse,
  DeleteCatalogParams,
  DeleteCatalogResponse,
  GetCatalogListResponse,
  RemoveChatFromCatalogParams,
  RemoveChatFromCatalogResponse,
} from 'types/api/catalog';
import type {
  AddMessage,
  ChangeChatBlockParams,
  ChangeChatBlockResponse,
  ChangeChatFavoriteParams,
  ChangeChatFavoriteResponse,
  GetDialogParams,
  GetDialogResponse,
  GoToExtendedDialog,
  NewMessageParams,
  NewMessageResponse,
} from 'types/api/chat';
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
  addChatId: null,
  isShowCatalogCreation: false,
  currentCatalog: null,
  chatData: null,
  messages: [],
  error: null,
  isExpanded: false,
  interlocutor: null,
  messagesPreview: [],
  isShow: false,
  chatMode: NORMAL_PREVIEW_CHAT_MODE,
  catalogList: [],
  isRenameCatalog: false,
  isShowChatsInCatalog: false,
  catalogCreationMode: ADD_CHAT_TO_OLD_CATALOG,
};

//---------- getPreviewChat
export const getPreviewChat = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getPreviewChat`,
  thunk: async () => {
    const { data } = await chatController.getPreviewChat();
    return data;
  },
});

const getPreviewChatExtraReducers = createExtraReducers({
  thunk: getPreviewChat,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['messagesPreview']>,
  ) => {
    state.messagesPreview = payload;
    state.error = null;
  },
  rejectedReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['error']>,
  ) => {
    state.error = payload;
    state.messagesPreview = [];
  },
});

//---------- getDialogMessages
export const getDialogMessages = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getDialogMessages`,
  thunk: async (payload: GetDialogParams) => {
    const { data } = await chatController.getDialog(payload);
    return data;
  },
});

const getDialogMessagesExtraReducers = createExtraReducers({
  thunk: getDialogMessages,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<GetDialogResponse>,
  ) => {
    state.messages = payload.messages;
    state.interlocutor = payload.interlocutor;
  },
  rejectedReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['error']>,
  ) => {
    state.messages = [];
    state.interlocutor = null;
    state.error = payload;
  },
});

//---------- sendMessage
export const sendMessage = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/sendMessage`,
  thunk: async (payload: NewMessageParams) => {
    const { data } = await chatController.newMessage(payload);
    return data;
  },
});

const sendMessageExtraReducers = createExtraReducers({
  thunk: sendMessage,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<NewMessageResponse>,
  ) => {
    const { messagesPreview } = state;
    let isNew = true;
    for (const preview of messagesPreview) {
      if (isEqual(preview.participants, payload.message.participants)) {
        preview.text = payload.message.body;
        preview.sender = payload.message.sender;
        preview.createdAt = payload.message.createdAt;
        isNew = false;
      }
    }
    if (isNew) {
      messagesPreview.push(payload.preview);
    }
    const chatData = {
      _id: payload.preview._id,
      participants: payload.preview.participants,
      favoriteList: payload.preview.favoriteList,
      blackList: payload.preview.blackList,
    };
    state.chatData = { ...state.chatData, ...chatData };
    state.messagesPreview = messagesPreview;
    state.messages = [...state.messages, payload.message];
  },
  rejectedReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['error']>,
  ) => {
    state.error = payload;
  },
});

//---------- changeChatFavorite
export const changeChatFavorite = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatFavorite`,
  thunk: async (payload: ChangeChatFavoriteParams) => {
    const { data } = await chatController.changeChatFavorite(payload);
    return data;
  },
});

const changeChatFavoriteExtraReducers = createExtraReducers({
  thunk: changeChatFavorite,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChangeChatFavoriteResponse>,
  ) => {
    const { messagesPreview } = state;
    for (const preview of messagesPreview) {
      if (isEqual(preview.participants, payload.participants))
        preview.favoriteList = payload.favoriteList;
    }
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  },
  rejectedReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['error']>,
  ) => {
    state.error = payload;
  },
});

//---------- changeChatBlock
export const changeChatBlock = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatBlock`,
  thunk: async (payload: ChangeChatBlockParams) => {
    const { data } = await chatController.changeChatBlock(payload);
    return data;
  },
});

const changeChatBlockExtraReducers = createExtraReducers({
  thunk: changeChatBlock,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChangeChatBlockResponse>,
  ) => {
    const { messagesPreview } = state;
    for (const preview of messagesPreview) {
      if (isEqual(preview.participants, payload.participants))
        preview.blackList = payload.blackList;
    }
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  },
  rejectedReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['error']>,
  ) => {
    state.error = payload;
  },
});

//---------- getCatalogList
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

const getCatalogListExtraReducers = createExtraReducers({
  thunk: getCatalogList,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<GetCatalogListResponse>,
  ) => {
    state.isFetching = false;
    state.catalogList = [...payload];
  },
  rejectedReducer,
});

//---------- addChatToCatalog
export const addChatToCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/addChatToCatalog`,
  thunk: async (payload: AddChatToCatalogParams) => {
    const { data } = await catalogController.addChatToCatalog(payload);
    return data;
  },
});

const addChatToCatalogExtraReducers = createExtraReducers({
  thunk: addChatToCatalog,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<AddChatToCatalogResponse>,
  ) => {
    const { catalogList } = state;
    for (const catalog of catalogList) {
      if (catalog._id === payload._id) {
        catalog.chats = payload.chats;
        break;
      }
    }
    state.isShowCatalogCreation = false;
    state.catalogList = [...catalogList];
  },
  rejectedReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['error']>,
  ) => {
    state.error = payload;
    state.isShowCatalogCreation = false;
  },
});

//---------- createCatalog
export const createCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/createCatalog`,
  thunk: async (payload: CreateCatalogParams) => {
    const { data } = await catalogController.createCatalog(payload);
    return data;
  },
});

const createCatalogExtraReducers = createExtraReducers({
  thunk: createCatalog,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<CreateCatalogResponse>,
  ) => {
    state.catalogList = [...state.catalogList, payload];
    state.isShowCatalogCreation = false;
  },
  rejectedReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['error']>,
  ) => {
    state.isShowCatalogCreation = false;
    state.error = payload;
  },
});

//---------- deleteCatalog
export const deleteCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/deleteCatalog`,
  thunk: async (payload: DeleteCatalogParams) => {
    await catalogController.deleteCatalog(payload);
    return payload;
  },
});

const deleteCatalogExtraReducers = createExtraReducers({
  thunk: deleteCatalog,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<DeleteCatalogResponse>,
  ) => {
    const { catalogList } = state;
    const newCatalogList = catalogList.filter(
      (catalog) => payload.catalogId !== catalog._id,
    );
    state.catalogList = [...newCatalogList];
  },
  rejectedReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['error']>,
  ) => {
    state.error = payload;
  },
});

//---------- removeChatFromCatalog
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

const removeChatFromCatalogExtraReducers = createExtraReducers({
  thunk: removeChatFromCatalog,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<RemoveChatFromCatalogResponse>,
  ) => {
    const { catalogList } = state;
    for (const catalog of catalogList) {
      if (catalog._id === payload._id) {
        catalog.chats = payload.chats;
        break;
      }
    }
    state.currentCatalog = payload;
    state.catalogList = [...catalogList];
  },
  rejectedReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChatState['error']>,
  ) => {
    state.error = payload;
  },
});

//---------- changeCatalogName
export const changeCatalogName = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeCatalogName`,
  thunk: async (payload: ChangeCatalogNameParams) => {
    const { data } = await catalogController.changeCatalogName(payload);
    return data;
  },
});

const changeCatalogNameExtraReducers = createExtraReducers({
  thunk: changeCatalogName,
  fulfilledReducer: (
    state: ChatState,
    { payload }: PayloadAction<ChangeCatalogNameResponse>,
  ) => {
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
  },
  rejectedReducer: (state: ChatState) => {
    state.isRenameCatalog = false;
  },
});
//-------------------------------------------------------

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
        preview.text = message.body;
        preview.sender = message.sender;
        preview.createdAt = message.createdAt;
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
  getPreviewChatExtraReducers(builder);
  getDialogMessagesExtraReducers(builder);
  sendMessageExtraReducers(builder);
  changeChatFavoriteExtraReducers(builder);
  changeChatBlockExtraReducers(builder);
  getCatalogListExtraReducers(builder);
  addChatToCatalogExtraReducers(builder);
  createCatalogExtraReducers(builder);
  deleteCatalogExtraReducers(builder);
  removeChatFromCatalogExtraReducers(builder);
  changeCatalogNameExtraReducers(builder);
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
