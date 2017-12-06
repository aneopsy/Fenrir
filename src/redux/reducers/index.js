import { combineReducers } from 'redux';

import auth from './auth';
import infura from './infura';
import sidebar from './sidebar';


const rootReducer = combineReducers({
  auth,
  infura,
  sidebar,
});

export default rootReducer;
