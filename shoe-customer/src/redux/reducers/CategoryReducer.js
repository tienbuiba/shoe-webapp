import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    id: ''
  },
};

// ==============================|| NEW REDUCER ||============================== //

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORY_ID:
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

export default categoryReducer;
