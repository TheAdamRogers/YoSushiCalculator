import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  RESET_BASKET,
  REMOVE_ITEM_FROM_BASKET,
} from './basketTypes';

export const addToBasket = (item) => {
  return (dispatch) => {
    dispatch({ type: ADD_TO_BASKET, payload: item });
  };
};

export const removeFromBasket = () => {
  return (dispatch) => {
    dispatch({ type: REMOVE_FROM_BASKET, payload: null });
  };
};

export const removeItemFromBasket = (item) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_ITEM_FROM_BASKET, payload: item });
  };
};

export const resetBasket = () => {
  return (dispatch) =>{
    dispatch({ type: RESET_BASKET, payload: null });
  };
};
