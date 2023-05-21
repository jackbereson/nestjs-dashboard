
import { User } from "../../lib/modules/user/user.model";
import { UserConstants, UserEvent } from "../actions/user.action";
import { ApiStatus } from "../redux.helper";

export interface UserStore {
  status: ApiStatus;
  user: User;
}

const init: UserStore = {
  status: ApiStatus.INIT,
  user: null,
};

export const userReducer = (
  state: UserStore = init,
  event: UserEvent
) => {
  switch (event.type) {
    case UserConstants.USER_GET_ME:
      // console.log("USER_GET_ME");
      return {
        ...state,
        status: ApiStatus.LOADING,
      };
    case UserConstants.USER_GET_ME_LOADED:
      // console.log("USER_GET_ME_LOADED");
      // console.log('event.customer', event.customer)
      return {
        ...state,
        status: ApiStatus.LOADED,
        user: event.user
      };

    //signupCustomerByPhoneToken
    case UserConstants.SIGNUP_USER_BY_PHONE:
      // console.log("SIGNUP_USER_BY_PHONE");
      return {
        ...state,
        status: ApiStatus.LOADING,
      };
    case UserConstants.SIGNUP_USER_BY_PHONE_LOADED:
      // console.log("SIGNUP_USER_BY_PHONE_LOADED");
      return {
        ...state,
        status: ApiStatus.LOADED,
        user: event.user
      };

    //signupCustomerByEmail
    case UserConstants.SIGNUP_USER_BY_EMAIL:
      // console.log(".SIGNUP_USER_BY_EMAIL");
      return {
        ...state,
        status: ApiStatus.LOADING,
      };
    case UserConstants.SIGNUP_USER_BY_EMAIL_LOADED:
      // console.log(".SIGNUP_USER_BY_EMAIL_LOADED");
      return {
        ...state,
        status: ApiStatus.LOADED,
        user: event.user
      };

    //signinCustomerByPhone
    case UserConstants.SIGNIN_USER_BY_PHONE:
      // console.log("SIGNIN_USER_BY_PHONE");
      return {
        ...state,
        status: ApiStatus.LOADING,
      };
    case UserConstants.SIGNIN_USER_BY_PHONE_LOADED:
      // console.log("SIGNIN_USER_BY_PHONE_LOADED");
      return {
        ...state,
        status: ApiStatus.LOADED,
        user: event.user
      };

    //signinCustomerByEmail
    case UserConstants.SIGNIN_USER_BY_EMAIL:
      // console.log("SIGNIN_USER_BY_EMAIL");
      return {
        ...state,
        status: ApiStatus.LOADING,
      };
    case UserConstants.SIGNIN_USER_BY_EMAIL_LOADED:
      // console.log("SIGNIN_USER_BY_EMAIL");
      return {
        ...state,
        status: ApiStatus.LOADED,
        user: event.user
      };

    case UserConstants.LOGOUT_USER:
      return {
        ...state,
        status: ApiStatus.INIT,
        user: null
      };

    case UserConstants.SET_BALANCE:
      const user = Object.assign({}, state.user);
      user.balance = user.balance - event.amount;
      // console.log("customer", customer);
      return {
        ...state,
        user
      };

    default:
      return state;

  }
};
