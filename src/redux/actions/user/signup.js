import {
  SIGN_UP,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS
} from "../../../constants/user/signup";

export const signUp = payload => ({
  type: SIGN_UP,
  payload
});

export const signUpSuccess = payload => ({
  type: SIGN_UP_SUCCESS,
  payload
});

export const signUpFailure = payload => ({
  type: SIGN_UP_FAILURE,
  payload
});
