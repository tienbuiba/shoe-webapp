import { createStore } from 'redux';
import Reducer from '../redux/reducers/Reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(Reducer);

export { store };
