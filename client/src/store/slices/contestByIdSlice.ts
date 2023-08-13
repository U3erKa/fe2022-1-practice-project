import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as offerController from 'api/rest/offerController';
import * as contestController from 'api/rest/contestController';

import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
  createExtraReducers,
} from 'utils/store';

import { OFFER_STATUS_WON, OFFER_STATUS_REJECTED } from 'constants/general';

import type { GetContestParams, GetContestResponse } from 'types/api/contest';
import type {
  ChangeMarkParams,
  ChangeMarkResponse,
  GetOffersParams,
  GetOffersResponse,
  SetNewOfferResponse,
  SetOfferStatusParams,
  SetOfferStatusResponse,
} from 'types/api/offer';
import type { ContestByIdState } from 'types/slices';

const CONTEST_BY_ID_SLICE_NAME = 'getContestById';

const initialState: ContestByIdState = {
  isFetching: true,
  contestData: null,
  error: null,
  offers: [],
  haveMore: false,
  addOfferError: null,
  setOfferStatusError: null,
  changeMarkError: null,
  isReviewed: false,
  isEditContest: false,
  isBrief: true,
  isShowOnFull: false,
  isShowModal: false,
  imagePath: null,
};

//---------- getContestById
export const getContestById = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/getContest`,
  thunk: async (payload: GetContestParams) => {
    const { data } = await contestController.getContestById(payload);
    const { Offers, ...contestData } = data;
    return { contestData, offers: Offers };
  },
});

const getContestByIdExtraReducers = createExtraReducers({
  thunk: getContestById,
  pendingReducer: (state: ContestByIdState) => {
    state.isFetching = true;
    state.contestData = null;
    state.error = null;
    state.offers = [];
  },
  fulfilledReducer: (
    state: ContestByIdState,
    {
      payload: { contestData, offers },
    }: PayloadAction<{
      contestData: Omit<GetContestResponse, 'Offers'>;
      offers: GetContestResponse['Offers'];
    }>,
  ) => {
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
  fulfilledReducer: (
    state: ContestByIdState,
    { payload }: PayloadAction<SetNewOfferResponse>,
  ) => {
    state.offers.unshift(payload);
    state.error = null;
  },
  rejectedReducer: (
    state: ContestByIdState,
    { payload }: PayloadAction<ContestByIdState['addOfferError']>,
  ) => {
    state.addOfferError = payload;
  },
});

//---------- setOfferStatus
export const setOfferStatus = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/setOfferStatus`,
  thunk: async (payload: SetOfferStatusParams) => {
    const { data } = await offerController.setOfferStatus(payload);
    return data;
  },
});

const setOfferStatusExtraReducers = createExtraReducers({
  thunk: setOfferStatus,
  fulfilledReducer: (
    state: ContestByIdState,
    { payload }: PayloadAction<SetOfferStatusResponse>,
  ) => {
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
  rejectedReducer: (
    state: ContestByIdState,
    { payload }: PayloadAction<ContestByIdState['setOfferStatusError']>,
  ) => {
    state.setOfferStatusError = payload;
  },
});

//---------- changeMark
export const changeMark = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/changeMark`,
  thunk: async (payload: ChangeMarkParams) => {
    const { data } = await offerController.changeMark(payload);
    return { data, offerId: payload.offerId, mark: payload.mark };
  },
});

const changeMarkExtraReducers = createExtraReducers({
  thunk: changeMark,
  fulfilledReducer: (
    state: ContestByIdState,
    {
      payload: { data, offerId, mark },
    }: PayloadAction<{
      data: ChangeMarkResponse;
      offerId: ChangeMarkParams['offerId'];
      mark: ChangeMarkParams['mark'];
    }>,
  ) => {
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
  rejectedReducer: (
    state: ContestByIdState,
    { payload }: PayloadAction<ContestByIdState['changeMarkError']>,
  ) => {
    state.changeMarkError = payload;
  },
});

//-----------getOffers
export const getOffers = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/getOffers`,
  thunk: async (payload: GetOffersParams) => {
    const { data } = await offerController.getOffers<typeof payload.isReviewed>(
      payload,
    );
    return data;
  },
});

const getOffersExtraReducers = createExtraReducers({
  thunk: getOffers,
  pendingReducer,
  fulfilledReducer: <IsReviewed>(
    state: ContestByIdState,
    { payload }: PayloadAction<GetOffersResponse<IsReviewed>>,
  ) => {
    state.isFetching = false;
    state.offers = payload.offers;
    state.haveMore = payload.haveMore;
    state.error = null;
  },
  rejectedReducer,
});

//-----------------------------------------------------

const reducers = {
  updateStoreAfterUpdateContest: (
    state: ContestByIdState,
    { payload }: PayloadAction<ContestByIdState['contestData']>,
  ) => {
    state.error = null;
    state.isEditContest = false;
    state.contestData = { ...state.contestData, ...payload! };
  },
  changeContestViewMode: (
    state: ContestByIdState,
    { payload }: PayloadAction<ContestByIdState['isBrief']>,
  ) => {
    state.isEditContest = false;
    state.isBrief = payload;
  },
  changeEditContest: (
    state: ContestByIdState,
    { payload }: PayloadAction<ContestByIdState['isEditContest']>,
  ) => {
    state.isEditContest = payload;
  },
  setIsReviewed: (
    state: ContestByIdState,
    { payload }: PayloadAction<ContestByIdState['isReviewed']>,
  ) => {
    state.isReviewed = payload;
  },
  clearAddOfferError: (state: ContestByIdState) => {
    state.addOfferError = null;
  },
  clearSetOfferStatusError: (state: ContestByIdState) => {
    state.setOfferStatusError = null;
  },
  clearChangeMarkError: (state: ContestByIdState) => {
    state.changeMarkError = null;
  },
  changeShowImage: (
    state: ContestByIdState,
    {
      payload: { isShowOnFull, imagePath },
    }: PayloadAction<{
      isShowOnFull: ContestByIdState['isShowOnFull'];
      imagePath: ContestByIdState['imagePath'];
    }>,
  ) => {
    state.isShowOnFull = isShowOnFull;
    state.imagePath = imagePath;
  },
};

const extraReducers = (builder) => {
  getContestByIdExtraReducers(builder);
  addOfferExtraReducers(builder);
  setOfferStatusExtraReducers(builder);
  changeMarkExtraReducers(builder);
  getOffersExtraReducers(builder);
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
  setIsReviewed,
  clearAddOfferError,
  clearSetOfferStatusError,
  clearChangeMarkError,
  changeShowImage,
} = actions;

export default reducer;
