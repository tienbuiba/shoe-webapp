import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
  block: false,
  id: ''
  },
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BLOCK_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
         block: true,
        }
      }
      case actionTypes.BLOCK_USER_SUCCESS_CONTINUE:
        return {
          ...state,
          data: {
            ...state.data,
           block: false,
          }
        }
        case actionTypes.USER_ID:
          return {
            ...state,
            data: {
              ...state.data,
             id: action.id,
            }
          }
    default:
      return state;
  }
}

export default userReducer;

