import { combineReducers } from 'redux';
import sendFormReducer from './sendFormReducer';

const rootReducer = combineReducers({
  sendFormReducer,
});

export default rootReducer;
