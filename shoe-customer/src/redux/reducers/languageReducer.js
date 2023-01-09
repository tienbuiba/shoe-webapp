import * as actionTypes from '../actions/Actions';

export const initialState = {
    data: {
        state: true
    },
};

// ==============================|| Loading REDUCER ||============================== //

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STATE_LANGUAGE:
            return {
                ...state,
                data: {
                    ...state.data,
                    state: !state.data.state
                }
            };
        case actionTypes.CLOSE_LOADING_API:
            return {
                ...state,
                data: {
                    ...state.data,
                    state: !state.data.state
                }
            };
        default:
            return state;
    }
};

export default languageReducer;
