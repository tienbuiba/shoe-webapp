import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    stateChange: null,
  },
};

// ==============================|| Loading REDUCER ||============================== //

const authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN_PAGE:
      return {
        ...state,
        data: {
          ...state.data,
          stateChange: action.stateChange,
        }
      };

    default:
      return state;
  }
};

export default authenReducer;
