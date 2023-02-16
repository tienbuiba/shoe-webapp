import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    delete: false
  },
};

// ==============================|| Loading REDUCER ||============================== //

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_COMMENT_POST:
      return {
        ...state,
        data: {
          ...state.data,
          delete: !state.data.delete
        }
      };
    default:
      return state;
  }
};

export default commentReducer;
