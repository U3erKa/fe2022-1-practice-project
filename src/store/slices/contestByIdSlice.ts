import {
  type ActionReducerMapBuilder,
  type PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import * as contestController from 'api/rest/contestController';
import * as offerController from 'api/rest/offerController';
import {
  OFFER_STATUS_APPROVED,
  OFFER_STATUS_DISCARDED,
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_WON,
} from 'constants/general';
import { addNewItems } from 'utils/functions';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from 'utils/store';
import type { GetContestParams } from 'types/api/contest';
import type {
  ChangeMarkParams,
  GetOffersParams,
  SetOfferStatusParams,
} from 'types/api/offer';
import type { ContestByIdState } from 'types/slices';

const CONTEST_BY_ID_SLICE_NAME = 'getContestById';

const initialState: ContestByIdState = {
  isFetching: true,
  error: null,
  addOfferError: null,
  changeMarkError: null,
  contestData: null,
  haveMore: false,
  imagePath: null,
  isBrief: true,
  isEditContest: false,
  isReviewed: false,
  isShowModal: false,
  isShowOnFull: false,
  offers: [],
  setOfferStatusError: null,
};

export const getContestById = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/getContest`,
  thunk: async (payload: GetContestParams) => {
    const { data } = await contestController.getContestById(payload);
    const { Offers, ...contestData } = data;
    return { contestData, offers: Offers };
  },
});

const getContestByIdExtraReducers = (
  builder: ActionReducerMapBuilder<ContestByIdState>,
) => {
  builder
    .addCase(getContestById.pending, (state) => {
      state.isFetching = true;
      state.contestData = null;
      state.error = null;
      state.offers = [];
    })
    .addCase(getContestById.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { contestData, offers } = payload;
      state.contestData = contestData;
      state.offers = offers;
      state.error = null;
    })
    .addCase(getContestById.rejected, rejectedReducer);
};

export const addOffer = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/addOffer`,
  thunk: async (payload: FormData) => {
    const { data } = await offerController.setNewOffer(payload);
    return data;
  },
});

const addOfferExtraReducers = (
  builder: ActionReducerMapBuilder<ContestByIdState>,
) => {
  builder
    .addCase(addOffer.pending, pendingReducer)
    .addCase(addOffer.fulfilled, (state, { payload }) => {
      state.offers.unshift(payload);
      state.error = null;
    })
    .addCase(addOffer.rejected, (state, { payload }) => {
      state.addOfferError = payload;
    });
};

export const setOfferStatus = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/setOfferStatus`,
  thunk: async (payload: SetOfferStatusParams) => {
    const { data } = await offerController.setOfferStatus(payload);
    return data;
  },
});

const setOfferStatusExtraReducers = (
  builder: ActionReducerMapBuilder<ContestByIdState>,
) => {
  builder
    .addCase(setOfferStatus.pending, pendingReducer)
    .addCase(setOfferStatus.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      for (const offer of state.offers) {
        switch (payload.status) {
          case OFFER_STATUS_WON:
            offer.status =
              payload.id === offer.id
                ? OFFER_STATUS_WON
                : OFFER_STATUS_REJECTED;
            break;
          case OFFER_STATUS_REJECTED:
          case OFFER_STATUS_APPROVED:
          case OFFER_STATUS_DISCARDED:
            if (payload.id === offer.id) offer.status = payload.status;
            break;
          default:
            break;
        }
      }
      state.error = null;
    })
    .addCase(setOfferStatus.rejected, (state, { payload }) => {
      state.setOfferStatusError = payload;
    });
};

export const changeMark = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/changeMark`,
  thunk: async (payload: ChangeMarkParams) => {
    const { data } = await offerController.changeMark(payload);
    return { data, offerId: payload.offerId, mark: payload.mark };
  },
});

const changeMarkExtraReducers = (
  builder: ActionReducerMapBuilder<ContestByIdState>,
) => {
  builder
    .addCase(changeMark.pending, pendingReducer)
    .addCase(changeMark.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const { data, offerId, mark } = payload;
      for (const offer of state.offers) {
        if (offer.User.id === data.userId) {
          offer.User.rating = data.rating;
        }
        if (offer.id === offerId) {
          offer.mark = mark;
        }
      }
      state.error = null;
    })
    .addCase(changeMark.rejected, (state, { payload }) => {
      state.changeMarkError = payload;
    });
};

export const getOffers = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/getOffers`,
  thunk: async (payload: GetOffersParams) => {
    const { data } = await offerController.getOffers(payload);
    return data;
  },
});

const getOffersExtraReducers = (
  builder: ActionReducerMapBuilder<ContestByIdState>,
) => {
  builder
    .addCase(getOffers.pending, pendingReducer)
    .addCase(getOffers.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.offers = addNewItems(state.offers, payload.offers as any[]);
      state.haveMore = payload.haveMore;
      state.error = null;
    })
    .addCase(getOffers.rejected, rejectedReducer);
};

const reducers = {
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
  changeShowImage: (
    state: ContestByIdState,
    {
      payload: { isShowOnFull, imagePath },
    }: PayloadAction<Pick<ContestByIdState, 'imagePath' | 'isShowOnFull'>>,
  ) => {
    state.isShowOnFull = isShowOnFull;
    state.imagePath = imagePath;
  },
  clearAddOfferError: (state: ContestByIdState) => {
    state.addOfferError = null;
  },
  clearChangeMarkError: (state: ContestByIdState) => {
    state.changeMarkError = null;
  },
  clearSetOfferStatusError: (state: ContestByIdState) => {
    state.setOfferStatusError = null;
  },
  setIsReviewed: (
    state: ContestByIdState,
    { payload }: PayloadAction<ContestByIdState['isReviewed']>,
  ) => {
    state.isReviewed = payload;
    state.offers = [];
  },
  updateStoreAfterUpdateContest: (
    state: ContestByIdState,
    { payload }: PayloadAction<NonNullable<ContestByIdState['contestData']>>,
  ) => {
    state.error = null;
    state.isEditContest = false;
    state.contestData = { ...state.contestData, ...payload };
  },
};

const extraReducers = (builder: ActionReducerMapBuilder<ContestByIdState>) => {
  addOfferExtraReducers(builder);
  changeMarkExtraReducers(builder);
  getContestByIdExtraReducers(builder);
  getOffersExtraReducers(builder);
  setOfferStatusExtraReducers(builder);
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
