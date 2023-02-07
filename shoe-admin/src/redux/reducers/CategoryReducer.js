import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    id: '',
    name: ''
  },
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORY_ID:
      return {
        ...state,
        data: {
          ...state.data,
          id: action.id,     
          name: action.name
        }
      }
    case actionTypes.DELETE_CATEGORY:
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

export default categoryReducer;

