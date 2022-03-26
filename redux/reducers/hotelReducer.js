import {HOTELS} from '../actions';
// inital state => object with two arrays
const initialState = {
  hotels: [],
};
function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case HOTELS:
      return {...state, hotels: action.payload};

    default:
      return state;
  }
}

export default hotelReducer;
