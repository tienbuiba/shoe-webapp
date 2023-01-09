import * as actionTypes from '../actions/Actions'

export const confirmOrder = (id, total, amount,name) => ({ type: actionTypes.CONFIRM_ORDER, id: id, total: total, amount: amount ,name:name});
export const closeConfirmOrder = () => ({ type: actionTypes.CLOSE_CONFIRM_ORDER });
export const orderId = (orderDetails, orderCode,orderID) => ({ type: actionTypes.ORDER_ID, orderDetails: orderDetails, orderCode: orderCode,orderID:orderID });



