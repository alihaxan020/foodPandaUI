import {CART} from '../actionTypes';

export const addToCart = id => {
  console.log('id==>', id);
  return dispatch => {
    dispatch({
      type: CART.ADD_TO_CART,
      payload: id,
    });
  };
};
export const removeFromCart = id => {
  return dispatch => {
    dispatch({
      type: CART.REMOVE_FROM_CART,
      payload: id,
    });
  };
};
export const emptyCart = () => {
  return {
    type: CART.EMPTY_CART,
  };
};
export const subtractQuantity = id => {
  return dispatch => {
    dispatch({
      type: CART.SUB_QUANTITY,
      payload: id,
    });
  };
};
export const addQuantity = id => {
  console.log('add to quantity==>', id);
  return dispatch => {
    dispatch({
      type: CART.ADD_QUANTITY,
      payload: id,
    });
  };
};
export const getProducts = value => {
  return dispatch => {
    dispatch({
      type: CART.GET_PRODUCTS,
      payload: value,
    });
  };
};
