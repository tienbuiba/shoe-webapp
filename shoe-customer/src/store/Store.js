import { createStore } from 'redux';
import Reducer from '../redux/reducers/reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(Reducer);

export default store;
