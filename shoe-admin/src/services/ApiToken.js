import TokenService from "./TokenService";
import api from "./Api"
import { userService } from "../constant/Constants";


export const apiAdminApiToken = async () => {
  const url = userService + '/users/api-token';
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }
  );

  return res.data;
}

export const apiAdminRenewApiToken = async () => {
  const url = userService + '/users/renew-api-token';
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }
  );

  return res.data;
}


















