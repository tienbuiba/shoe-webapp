import TokenService from "./TokenService";
import api from "./Api";
import { userService } from "../constant/Constants";

export const apiAdminGetAllStatistic= async (days) => {
  let url = userService + `/statistic/admin/detail?days=${days}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {}, {headers: { 'Content-Type': 'application/json', 'Authorization': accessToken }}
  
  );

  return res;
}

