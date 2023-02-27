import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    id: '',
    brands: '',
    sizes: '',
    colors: '',
    min: '',
    max: ''
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
    case actionTypes.SET_FILTER:
      return {
        ...state,
        data: {
          ...state.data,
          brands: action.brands,
          sizes: action.sizes,
          colors: action.colors,
          min: action.min,
          max: action.max
        }
      };
    default:
      return state;
  }
};

export default categoryReducer;
