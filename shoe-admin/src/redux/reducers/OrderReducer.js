import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    orderDetails: [],
    orderCode: '',
    orderID: '',
    details: []
  },
}

const orderReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ORDER_ID:
      return {
        ...state,
        data: {
          ...state.data,
          orderDetails: action.orderDetails,
          orderCode: action.orderCode,
          orderID: action.orderID
        }
      }
      case actionTypes.ORDER_DETAILS:
        return {
          ...state,
          data: {
            ...state.data,         
            details: action.details
          }
        }
    default:
      return state;
  }
}

export default orderReducer;

