import { combineReducers } from 'redux';
import table from './tableReducer';

const rootReducer = combineReducers({
  table,
});

export default rootReducer;
