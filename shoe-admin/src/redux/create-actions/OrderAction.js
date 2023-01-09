import * as actionTypes from '../actions/Actions'

export const orderId = (orderDetails, orderCode,orderID) => ({ type: actionTypes.ORDER_ID, orderDetails: orderDetails, orderCode: orderCode,orderID:orderID });




