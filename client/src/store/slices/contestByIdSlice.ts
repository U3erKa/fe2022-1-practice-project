import { createSlice } from '@reduxjs/toolkit';

import * as offerController from 'api/rest/offerController';
import * as contestController from 'api/rest/contestController';

import {
  decorateAsyncThunk,
  rejectedReducer,
  createExtraReducers,
} from 'utils/store';
import { OFFER_STATUS_WON, OFFER_STATUS_REJECTED } from 'constants/general';

const CONTEST_BY_ID_SLICE_NAME = 'getContestById';

const initialState = {
  isFetching: true,
  contestData: null,
  error: null,
  offers: [],
  addOfferError: null,
  setOfferStatusError: null,
  changeMarkError: null,
  isEditContest: false,
  isBrief: true,
  isShowOnFull: false,
  isShowModal: false,
  imagePath: null,
};

//---------- getContestById
export const getContestById = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/getContest`,
  thunk: async (payload) => {
    const { data } = await contestController.getContestById(payload);
    const { Offers } = data;
    delete data.Offers;
    return { contestData: data, offers: Offers };
  },
});

const getContestByIdExtraReducers = createExtraReducers({
  thunk: getContestById,
  pendingReducer: (state) => {
    state.isFetching = true;
    state.contestData = null;
    state.error = null;
    state.offers = [];
  },
  fulfilledReducer: (state, { payload: { contestData, offers } }) => {
    state.isFetching = false;
    state.contestData = contestData;
    state.error = null;
    state.offers = offers;
  },
  rejectedReducer,
});

//---------- addOffer
export const addOffer = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/addOffer`,
  thunk: async (payload: FormData) => {
    const { data } = await offerController.setNewOffer(payload);
    return data;
  },
});

const addOfferExtraReducers = createExtraReducers({
  thunk: addOffer,
  fulfilledReducer: (state, { payload }) => {
    state.offers.unshift(payload);
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.addOfferError = payload;
  },
});

//---------- setOfferStatus
export const setOfferStatus = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/setOfferStatus`,
  thunk: async (payload) => {
    const { data } = await offerController.setOfferStatus(payload);
    return data;
  },
});

const setOfferStatusExtraReducers = createExtraReducers({
  thunk: setOfferStatus,
  fulfilledReducer: (state, { payload }) => {
    state.offers.forEach((offer) => {
      if (payload.status === OFFER_STATUS_WON) {
        offer.status =
          payload.id === offer.id ? OFFER_STATUS_WON : OFFER_STATUS_REJECTED;
      } else if (payload.id === offer.id) {
        offer.status = OFFER_STATUS_REJECTED;
      }
    });
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.setOfferStatusError = payload;
  },
});

//---------- changeMark
export const changeMark = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/changeMark`,
  thunk: async (payload) => {
    const { data } = await offerController.changeMark(payload);
    return { data, offerId: payload.offerId, mark: payload.mark };
  },
});

const changeMarkExtraReducers = createExtraReducers({
  thunk: changeMark,
  fulfilledReducer: (state, { payload: { data, offerId, mark } }) => {
    state.offers.forEach((offer) => {
      if (offer.User.id === data.userId) {
        offer.User.rating = data.rating;
      }
      if (offer.id === offerId) {
        offer.mark = mark;
      }
    });
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.changeMarkError = payload;
  },
});

//-----------------------------------------------------

const reducers = {
  updateStoreAfterUpdateContest: (state, { payload }) => {
    state.error = null;
    state.isEditContest = false;
    state.contestData = { ...state.contestData, ...payload };
  },
  changeContestViewMode: (state, { payload }) => {
    state.isEditContest = false;
    state.isBrief = payload;
  },
  changeEditContest: (state, { payload }) => {
    state.isEditContest = payload;
  },
  clearAddOfferError: (state) => {
    state.addOfferError = null;
  },
  clearSetOfferStatusError: (state) => {
    state.setOfferStatusError = null;
  },
  clearChangeMarkError: (state) => {
    state.changeMarkError = null;
  },
  changeShowImage: (state, { payload: { isShowOnFull, imagePath } }) => {
    state.isShowOnFull = isShowOnFull;
    state.imagePath = imagePath;
  },
};

const extraReducers = (builder) => {
  getContestByIdExtraReducers(builder);
  addOfferExtraReducers(builder);
  setOfferStatusExtraReducers(builder);
  changeMarkExtraReducers(builder);
};

const contestByIdSlice = createSlice({
  name: CONTEST_BY_ID_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestByIdSlice;

export const {
  updateStoreAfterUpdateContest,
  changeContestViewMode,
  changeEditContest,
  clearAddOfferError,
  clearSetOfferStatusError,
  clearChangeMarkError,
  changeShowImage,
} = actions;

export default reducer;