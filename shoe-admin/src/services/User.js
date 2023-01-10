import TokenService from "./TokenService";
import api from "./Api"
import { userService } from "../constant/Constants";

export const apiAdminGetListUser = async (limit, offset, keyword) => {
  let url = userService + '/users/admin/list-users'
  let data = {
    limit: limit,
    offset: offset,
    keyword: keyword
  };
  let res;
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


