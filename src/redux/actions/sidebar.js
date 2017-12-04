import { CALL_API } from '../middleware/api';
import * as ACTION from '../constants/sidebar';

const SERVER = "http://aneopsy.xyz:4000";

export const list = () => {
  return {
    [CALL_API]: {
      endpoint: SERVER + '/nav',
      init: {
        method: 'GET',
      },
      types: [
        ACTION.SIDEBAR_LIST_REQUEST,
        ACTION.SIDEBAR_LIST_SUCCESS,
        ACTION.SIDEBAR_LIST_FAILURE,
      ],
    }
  };
};
