import _ from 'lodash';
import { ADD_TO_BASKET, REMOVE_FROM_BASKET, RESET_BASKET, REMOVE_ITEM_FROM_BASKET } from './basketTypes';

const INITIAL_STATE = {
  basket: [],
  basketTotalPrice: 0,
  previousItem: [],
};

const updateBasketAtIndex = (basket, initialIndex) => {
  const newBasket = basket.map((item, index) => {
    return index === initialIndex ? { ...item, quantity: item.quantity + 1 } : item;
  });

  return newBasket;
};

const purgeBasket = (basket) => {
  const newBasket = _.remove(basket, (n) => {
    return n.quantity !== 0;
  });
  return newBasket;
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  console.log(state, payload);
  switch (type) {
    case ADD_TO_BASKET:
      const basketItem = payload;
      const initialIndex = state.basket.findIndex(x => x.name === basketItem.name);

      return {
        ...state,
        basketTotalPrice: state.basketTotalPrice + basketItem.price,
        basket: initialIndex !== -1 ? [...updateBasketAtIndex(state.basket, initialIndex)] : [...state.basket, { ...basketItem, quantity: 1 }],
        previousItem: [...state.previousItem, basketItem],
      };
    case REMOVE_FROM_BASKET:
      const previousItems = [...state.previousItem];
      const basket = [...state.basket];
      const previousItem = previousItems.pop();

      if (basket.length !== 0) {
        basket.map((item) => {
          if (item.name === previousItem.name) {
            item.quantity -= 1;
          }
        });
      }
        
      const newBasket = purgeBasket(basket);

      return {
        ...state,
        basket: [...newBasket],
        previousItem: [...previousItems],
        basketTotalPrice: previousItem !== undefined ? state.basketTotalPrice - previousItem.price : state.basketTotalPrice,
      };
    case REMOVE_ITEM_FROM_BASKET:
      const removeItem = payload;
      const tempBasket = [...state.basket];

      if (tempBasket.length !== 0) {
        tempBasket.map((item) => {
          if (item.name === removeItem.name) {
            item.quantity -= 1;
          }
        });
      }

      const newStateBasket = purgeBasket(tempBasket);

      return {
        ...state,
        basket: [...newStateBasket],
        basketTotalPrice: state.basketTotalPrice - removeItem.price,
      };
    case RESET_BASKET:
      return {
        basket: [],
        basketTotalPrice: 0,
        previousItem: [],
      };
    default:
      return state;
  }
};
