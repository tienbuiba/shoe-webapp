import { combineReducers } from 'redux';
import authenReducer from './AuthenReducer';
import cartReducer from './CartReducer';
import categoryReducer from './CategoryReducer';
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
    new: newReducer,
    authen: authenReducer,
    category: categoryReducer
});

export default Reducer;
