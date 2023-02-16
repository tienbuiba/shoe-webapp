import * as actionTypes from '../actions/Actions'

export const closeConfirmModal = () => ({ type: actionTypes.CLOSE_CONFIRM_MODAL });
export const showConfirmModal = (title, message, id, feature) => ({ type: actionTypes.SHOW_CONFIRM_MODAL, title: title, message: message, id: id, feature: feature });




