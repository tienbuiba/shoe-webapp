import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import loadingReducer from './LoadingReducer';
import orderReducer from './OrderReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const Reducer = combineReducers({
    loading: loadingReducer,
    order: orderReducer,
    language: languageReducer
});

export default Reducer;
