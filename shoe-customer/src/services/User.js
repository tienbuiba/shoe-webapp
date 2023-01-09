import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constant/Constants';



export const apiUserGetTransactionDetail = async (rowsPerPage, page,keyword) => {
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

export const apiUserGetBalance = async () => {
  const url = userService + '/users/detail-balance';
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  return res;
};
