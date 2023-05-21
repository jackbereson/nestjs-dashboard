import md5 from "md5";
import {
  clearUserToken,
  getUserToken,
  setUserToken,
  User,
} from "../../lib/modules/user/user.model";
import { UserService } from "../../lib/modules/user/user.repo";
import { CustomerWalletType } from "../../lib/modules/wallet/wallet.model";

export enum UserConstants {
  USER_GET_ME = "USER_GET_ME",
  USER_GET_ME_LOADED = "USER_GET_ME_LOADED",
  //signupUserByPhoneToken
  SIGNUP_USER_BY_PHONE = "SIGNUP_USER_BY_PHONE",
  SIGNUP_USER_BY_PHONE_LOADED = "SIGNUP_USER_BY_PHONE_LOADED",
  //signinUserByPhone
  SIGNIN_USER_BY_PHONE = "SIGNIN_USER_BY_PHONE",
  SIGNIN_USER_BY_PHONE_LOADED = "SIGNIN_USER_BY_PHONE_LOADED",
  //signupUserByEmail
  SIGNUP_USER_BY_EMAIL = "SIGNUP_USER_BY_EMAIL",
  SIGNUP_USER_BY_EMAIL_LOADED = "SIGNUP_USER_BY_EMAIL_LOADED",
  //signinUserByEmail
  SIGNIN_USER_BY_EMAIL = "SIGNIN_USER_BY_EMAIL",
  SIGNIN_USER_BY_EMAIL_LOADED = "SIGNIN_USER_BY_EMAIL_LOADED",

  LOGOUT_USER = "LOGOUT_USER",

  SET_BALANCE = "SET_BALANCE",
  LOGIN_BY_ADDRESS_LOADED = "LOGIN_BY_ADDRESS_LOADED",
}

export type UserEvent =
  | { type: UserConstants.USER_GET_ME }
  | { type: UserConstants.USER_GET_ME_LOADED; user: User }
  //signupUserByPhoneToken
  | { type: UserConstants.SIGNUP_USER_BY_PHONE }
  | { type: UserConstants.SIGNUP_USER_BY_PHONE_LOADED; user: User }
  //signinUserByPhone
  | { type: UserConstants.SIGNIN_USER_BY_PHONE }
  | { type: UserConstants.SIGNIN_USER_BY_PHONE_LOADED; user: User }
  //signupUserByEmail
  | { type: UserConstants.SIGNUP_USER_BY_EMAIL }
  | { type: UserConstants.SIGNUP_USER_BY_EMAIL_LOADED; user: User }
  //signinUserByEmail
  | { type: UserConstants.SIGNIN_USER_BY_EMAIL }
  | { type: UserConstants.SIGNIN_USER_BY_EMAIL_LOADED; user: User }
  | { type: UserConstants.LOGOUT_USER }
  | { type: UserConstants.SET_BALANCE; amount: number }
  | { type: UserConstants.LOGIN_BY_ADDRESS_LOADED };

export const userGetMe =
  (handleError?: (error: Error) => void) =>
  (dispatch: any): UserEvent => {
    const handleResult = ({ data }: any) => {
      return dispatch({ type: UserConstants.USER_GET_ME_LOADED, user: data.userGetMe });
    };

    const token = getUserToken(false);

    UserService.userGetMe(token).then(handleResult).catch(handleError);

    return dispatch({ type: UserConstants.USER_GET_ME });
  };

export const signupUserByPhone =
  (
    country: string,
    phonecode: string,
    phone: string,
    password: string,
    handleError?: (error: Error) => void
  ) =>
  (dispatch: any): UserEvent => {
    const handleResult = ({ user, token }: any) => {
      setUserToken(token);
      return dispatch({ type: UserConstants.SIGNUP_USER_BY_PHONE_LOADED, user });
    };

    const md5Password = md5(password);

    UserService.signupUserByPhone(country, phonecode, phone, md5Password)
      .then(handleResult)
      .catch(handleError);

    return dispatch({ type: UserConstants.SIGNUP_USER_BY_PHONE });
  };

export const signupUserByEmail =
  (email: string, password: string, handleError?: (error: Error) => void) =>
  (dispatch: any): UserEvent => {
    const handleResult = ({ user, token }: any) => {
      setUserToken(token);
      return dispatch({ type: UserConstants.SIGNUP_USER_BY_EMAIL_LOADED, user });
    };

    const md5Password = md5(password);

    UserService.signupUserByEmail(email, md5Password).then(handleResult).catch(handleError);

    return dispatch({ type: UserConstants.SIGNUP_USER_BY_EMAIL });
  };

export const signinUserByEmail =
  (email: string, password: string, handleError?: (error: Error) => void) =>
  (dispatch: any): UserEvent => {
    const handleResult = ({ user, token }: any) => {
      setUserToken(token);
      return dispatch({ type: UserConstants.SIGNIN_USER_BY_EMAIL_LOADED, user });
    };

    const md5Password = md5(password);

    UserService.signinUserByEmail(email, md5Password).then(handleResult).catch(handleError);

    return dispatch({ type: UserConstants.SIGNIN_USER_BY_EMAIL });
  };

export const signinUserByPhone =
  (phone: string, password: string, handleError?: (error: Error) => void) =>
  (dispatch: any): UserEvent => {
    const handleResult = ({ user, token }: any) => {
      setUserToken(token);
      return dispatch({ type: UserConstants.SIGNIN_USER_BY_PHONE_LOADED, user });
    };

    const md5Password = md5(password);

    UserService.signinUserByPhone(phone, md5Password).then(handleResult).catch(handleError);

    return dispatch({ type: UserConstants.SIGNIN_USER_BY_PHONE });
  };

export const logoutUser =
  () =>
  (dispatch: any): UserEvent => {
    clearUserToken();
    return dispatch({ type: UserConstants.LOGOUT_USER });
  };

export const setBalance =
  (amount: number) =>
  (dispatch: any): UserEvent => {
    // console.log("amount", amount);
    return dispatch({ type: UserConstants.SET_BALANCE, amount });
  };