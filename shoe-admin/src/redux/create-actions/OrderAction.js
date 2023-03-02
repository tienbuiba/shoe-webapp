import * as actionTypes from '../actions/Actions'

export const orderId = ( orderCode,orderID) => ({ type: actionTypes.ORDER_ID,  orderCode: orderCode,orderID:orderID });

export const orderDetails = (details) => ({ type: actionTypes.ORDER_DETAILS, details:details });



