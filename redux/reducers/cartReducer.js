import {CART} from '../actionTypes';

// inital state => object with two arrays
const initialState = {
  products: [],
  cartItems: [],
};
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART.GET_PRODUCTS:
      console.log('Get menu products to CART ==>, ', action.payload);
      return {
        ...state,
        products: action.payload,
      };
    case CART.ADD_TO_CART:
      console.log('ADD to CART ==>, ', action.payload);
      const item = state.products.find(
        element => element.id === action.payload,
      );
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload
            ? {...product, selected: true}
            : product,
        ),
        cartItems: [...state.cartItems, item],
      };
    case CART.REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.id
            ? {...product, selected: false, quantity: 1}
            : product,
        ),
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case CART.ADD_QUANTITY:
      console.log('action payload===>', action.payload);
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload
            ? {...product, quantity: product.quantity + 1}
            : product,
        ),
        cartItems: state.cartItems.map(product =>
          product.id === action.payload
            ? {...product, quantity: product.quantity + 1}
            : product,
        ),
      };
    case CART.SUB_QUANTITY:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload
            ? {
                ...product,
                quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
              }
            : product,
        ),
        cartItems: state.cartItems.map(product =>
          product.id === action.payload
            ? {
                ...product,
                quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
              }
            : product,
        ),
      };
    case CART.EMPTY_CART:
      return {
        ...state,
        products: state.products.map(product =>
          product.selected
            ? {...product, selected: false, quantity: 1}
            : product,
        ),
        cartItems: [],
      };
    default:
      return state;
  }
}

export default cartReducer;
