import { combineReducers } from 'redux';
import categoryReducer from './CategoryReducer';
import confirmReducer from './ConfirmReducer';
import loadingReducer from './LoadingReducer';
import orderReducer from './OrderReducer';
import productReducer from './ProductReducer';
import rentProductReducer from './RentProductReducer';
import userReducer from './UserReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const Reducer = combineReducers({
    confirm: confirmReducer,
    product: productReducer,
    user:  userReducer,
    order: orderReducer,
    rent:rentProductReducer,
    loading: loadingReducer,
    category: categoryReducer
});

export default Reducer;
