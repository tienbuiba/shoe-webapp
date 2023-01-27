import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    id: ''
  },
};

// ==============================|| NEW REDUCER ||============================== //

const newReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_ID:
      return {
        ...state,
        data: {
          ...state.data,
          id: action.id,
        }
      };
    default:
      return state;
  }
};

export default newReducer;
