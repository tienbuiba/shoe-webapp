import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constants/Constant';

export const apiUserGetTransactionDetail = async (rowsPerPage, page, keyword) => {
  let url = userService + '/transactions/list-by-user'
  let res;
  let data = {
    limit: rowsPerPage,
    offset: page,
    keyword: keyword
  };
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, { headers: { 'Content-Type': 'application/json', 'Authorization': accessToken } });
  return res;
}




export const apiUserUpdateProfile = async (phone, username, avartarUrl) => {
  let url = userService + '/users/update-profile'
  let res;
  let data = {
    phone: phone,
    username: username,
    avartarUrl: avartarUrl
  }
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data,
     { headers: {
       'Content-Type': 'application/json', 
     'Authorization': accessToken } });
  return res;
}