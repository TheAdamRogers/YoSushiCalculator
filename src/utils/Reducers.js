import { combineReducers } from 'redux';
import basketReducer from '../components/Basket/basketReducer';

export default combineReducers({
  basket: basketReducer,
});