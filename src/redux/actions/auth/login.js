import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from '../../../constants';


export const login = payload => ({
  type: LOGIN,
  payload,
});

export const loginFailure = payload => ({
  type: LOGIN_FAILURE,
  payload,
});

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});
