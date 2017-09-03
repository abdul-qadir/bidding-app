import Types from './actionTypes';

export const loginRequest = (profile, preview) => ({
  type: Types.LOGIN_REQUEST,
  preview,
  profile,
});

export const loginSuccess = userInfo => ({
  type: Types.LOGIN_SUCCESS,
  userInfo,
});

export const logoutSuccess = () => ({
  type: Types.LOGOUT_SUCCESS,
});
