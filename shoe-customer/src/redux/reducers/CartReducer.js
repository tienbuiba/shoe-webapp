import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    add: false
  },
};

// ==============================|| Loading REDUCER ||============================== //

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        data: {
          ...state.data,
          add: !state.data.add
        }
      };
    case actionTypes.REMOVE_ADD_TO_CART:
      return {
        ...state,
        data: {
          ...state.data,
        }
      };
    default:
      return state;
  }
};

export default cartReducer;
