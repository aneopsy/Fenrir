import {
  CALL_API
} from '../middleware/api';
import * as ACTION from '../constants/auth';

const SERVER = "http://localhost:4000";

export const login = (auth) => {
  return {
    [CALL_API]: {
      endpoint: SERVER + '/auth/login',
      init: {
        method: 'POST',
        body: JSON.stringify(auth),
      },
      types: [
        ACTION.LOGIN_REQUEST,
        ACTION.LOGIN_SUCCESS,
        ACTION.LOGIN_FAILURE,
      ],
    }
  };
};

export const register = (auth) => {
  return {
    [CALL_API]: {
      endpoint: SERVER + '/auth/register',
      init: {
        method: 'POST',
        body: JSON.stringify(auth),
      },
      types: [
        ACTION.REGISTER_REQUEST,
        ACTION.REGISTER_SUCCESS,
        ACTION.REGISTER_FAILURE,
      ],
    }
  };
};

export const logout = () => {
  return {
    [CALL_API]: {
      endpoint: SERVER + '/auth/logout',
      init: {
        method: 'GET',
      },
      types: [
        ACTION.LOGOUT_REQUEST,
        ACTION.LOGOUT_SUCCESS,
        ACTION.LOGOUT_FAILURE,
      ],
    }
  };
};
