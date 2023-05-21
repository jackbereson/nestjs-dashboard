import { LoadingConstants, LoadingEvent } from "../actions/loading.action";

export interface LoadingStore {
  loadingStatus: boolean;
}

const init: LoadingStore = {
  loadingStatus: false,
};

export const loadingReducer = (
  state: LoadingStore = init,
  event: LoadingEvent
) => {
  switch (event.type) {
    case LoadingConstants.SET_LOADING:
      // console.log("CUSTOMER_GET_ME");
      return {
        ...state,
        loadingStatus: event.status,
      };

    default:
      return state;
  }
};
