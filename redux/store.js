import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import moviesReducer from './reducers/reducers';
import userReducer from './reducers/userReducer';
import hotelReducer from './reducers/hotelReducer';
import cartReducer from './reducers/cartReducer';
const rootReducer = combineReducers({
  moviesReducer,
  userReducer,
  hotelReducer,
  cartReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
