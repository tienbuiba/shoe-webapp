import * as actionTypes from '../actions/Actions'

export const addToCart = (productId, quantity, size, color) => ({ type: actionTypes.ADD_TO_CART, productId, quantity, size, color });
export const removeAddToCart = () => ({ type: actionTypes.REMOVE_ADD_TO_CART });
