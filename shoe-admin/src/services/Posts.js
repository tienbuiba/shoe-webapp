import TokenService from "./TokenService";
import api from "./Api";
import { userService } from "../constant/Constants";



export const apiAdminGetPostList = async () => {
  let url = userService + '/posts/list'
  let res;
  res = await api.get(url);
  return res;
}


export const apiAdminCreatePost = async (shortDesc, longDesc) => {
  let url = userService + '/posts/create'
  let data = {
    shortDesc: shortDesc,
    longDesc: longDesc
  };
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  });

  return res;
}

