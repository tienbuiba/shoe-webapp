import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    id: '',
    price: '',
    name: '',
    status: '',
  },
}

const rentProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RENT_PRODUCT_ID:
      return {
        ...state,
        data: {
          ...state.data,
          id: action.id,
          name: action.name,
          price: action.price,
          status: action.status
        }
      }

    default:
      return state;
  }
}

export default rentProductReducer;

