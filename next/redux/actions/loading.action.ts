
export enum LoadingConstants {
  SET_LOADING = "SET_LOADING",
}

export type LoadingEvent =
  | { type: LoadingConstants.SET_LOADING, status: boolean }

export const setLoading = (status: boolean) => (dispatch: any): LoadingEvent => {
  return dispatch({ type: LoadingConstants.SET_LOADING, status });
};