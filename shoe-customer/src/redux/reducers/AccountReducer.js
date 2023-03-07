import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    stateUpdate: null,
  },
};

// ==============================|| Loading REDUCER ||============================== //

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        data: {
          ...state.data,
          stateUpdate: !state.data.stateUpdate,
        }
      };

    default:
      return state;
  }
};

export default accountReducer;
