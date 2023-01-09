import * as actionTypes from '../actions/Actions';


export const initialState = {
  data: {
    isOpen: false,
    feature: '',
    title: '',
    id: '',
    message: ' This is message',
  },
}

const confirmReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.SHOW_CONFIRM_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          isOpen: true,
          title: action.title,
          message: action.message,
          id: action.id,
          feature: action.feature,
        }
      }
    case actionTypes.CLOSE_CONFIRM_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          isOpen: false,
          title: '',
          message: '',
          id:'',
          feature: '',
        },
      }
    default:
      return state;
  }
}

export default confirmReducer;

