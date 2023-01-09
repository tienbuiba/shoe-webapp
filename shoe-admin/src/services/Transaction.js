import TokenService from "./TokenService";
import api from "./Api";
import { userService } from "../constant/Constants";

export const apiAdminGetListTransaction = async (rowsPerPage, page,keyword) => {
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


export const apiAdminBlockUser = async (id) => {
  let url = userService + `/users/admin/update-status?userId=${id}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, {}, {
    headers: {
      'Authorization': accessToken
    }
  }
  );
  return res;
}


export const apiAdminUpdateBalance = async (userId, type, amount, from, to, message) => {
  let url = userService + `/users/admin/update-balance`
  let res;
  let data = {
    userId: userId,
    type: type,
    amount: amount,
    from: from,
    to: to,
    message: message
  };
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      'Authorization': accessToken
    }
  }
  );
  return res;
}

