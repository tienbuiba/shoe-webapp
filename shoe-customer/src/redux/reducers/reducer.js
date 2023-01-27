import { combineReducers } from 'redux';
import cartReducer from './CartReducer';
import languageReducer from './languageReducer';
import loadingReducer from './LoadingReducer';
import newReducer from './NewReducer';
import orderReducer from './OrderReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const Reducer = combineReducers({
    loading: loadingReducer,
    order: orderReducer,
    language: languageReducer,
    cart: cartReducer,
    new: newReducer

});

export default Reducer;
