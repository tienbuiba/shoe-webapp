import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    total: null,
    amount: null,
    name: null,
    orderDetails: [],
    orderCode: '',
    orderID: '',
    details: null,
    cancel:false
  },
};

// ==============================|| Otp REDUCER ||============================== //

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONFIRM_ORDER:
      return {
        ...state,
        data: {
          ...state.data,
          total: action.total,
          amount: action.amount,
          name: action.name,
        }
      };

    case actionTypes.CLOSE_CONFIRM_ORDER:
      return {
        ...state,
        data: {
          ...state.data,
          total: null,
          amount: null,
          name: null
        }
      };
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

    case actionTypes.ORDER_DETAIL:
      return {
        ...state,
        data: {
          ...state.data,
          details: action.details
        }
      }


      case actionTypes.CANCEL_ORDER:
        return {
          ...state,
          data: {
            ...state.data,
            cancel: !state.data.cancel
          }
        }
    default:
      return state;
  }
};

export default orderReducer;
