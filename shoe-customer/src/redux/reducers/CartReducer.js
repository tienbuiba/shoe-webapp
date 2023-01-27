import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    productId: null,
    quantity: null,
    size: null,
    color: null
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
          productId: action.productId,
          quantity: action.quantity,
          size: action.size,
          color: action.color
        }
      };
    case actionTypes.REMOVE_ADD_TO_CART:
      return {
        ...state,
        data: {
          ...state.data,
          productId: null,
          quantity: null,
          size: null,
          color: null
        }
      };
    default:
      return state;
  }
};

export default cartReducer;
