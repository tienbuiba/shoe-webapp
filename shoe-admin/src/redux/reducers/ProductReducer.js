import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    id: '',
    price: '',
    name: '',
    time: '',
    status: '',
    delete: false
  },
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_ID:
      return {
        ...state,
        data: {
          ...state.data,
          id: action.id,
          price: action.price,
          name: action.name,
          time: action.time
        }
      }
    case actionTypes.RENT_PRODUCT_ID:
      return {
        ...state,
        data: {
          ...state.data,
          id: action.id,
          price: action.price,
          name: action.name,
          status: action.status
        }
      }
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        data: {
          ...state.data,
          delete: !state.data.delete
        }
      }

    default:
      return state;
  }
}

export default productReducer;

