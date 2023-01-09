import * as actionTypes from '../actions/Actions'

export const productId = (id, price, name, time) => ({ type: actionTypes.PRODUCT_ID, id: id, price: price, name: name, time });
export const deleteProduct = () => ({ type: actionTypes.DELETE_PRODUCT });
export const productRentId = (id, name, price, status) => ({ type: actionTypes.RENT_PRODUCT_ID, id: id, name: name, price: price, status: status });





