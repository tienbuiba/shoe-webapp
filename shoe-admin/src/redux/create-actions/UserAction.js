import * as actionTypes from '../actions/Actions'

export const blockUserSuccess = () => ({ type: actionTypes.BLOCK_USER_SUCCESS });
export const blockUserSuccessContinue = () => ({ type: actionTypes.BLOCK_USER_SUCCESS_CONTINUE });
export const userId = (id) => ({ type: actionTypes.USER_ID, id: id });




