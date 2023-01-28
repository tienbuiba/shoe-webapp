import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    delete: false
  },
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_POST:
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

export default postReducer;

