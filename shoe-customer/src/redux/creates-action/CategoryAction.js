import * as actionTypes from '../actions/Actions'

export const setCategoryId = (id) => ({ type: actionTypes.CATEGORY_ID, id: id});
export const setFilter = (brands, sizes, colors, min, max) => ({ type: actionTypes.SET_FILTER,brands, sizes, colors, min, max});




