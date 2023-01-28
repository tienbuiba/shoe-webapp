import TokenService from "./TokenService";
import api from "./Api";
import { userService } from "../constant/Constants";



export const apiAdminGetPostList = async (rowsPerPage, page, keyword) => {
  let url = userService + '/posts/list'
  let res;
  const data = {
    limit: rowsPerPage,
    offset: page,
    keyword: keyword
  }
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }, data)
  return res;
}



export const apiAdminGetPostById = async (id) => {
  const url = userService + `/posts/detail/${id}`;
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }
  );
  return res;
}


export const apiAdminCreatePost = async (data) => {
  let url = userService + '/posts/create'
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


export const apiAdminUpdatePostById = async (id, data) => {
  let url = userService + `/posts/update/${id}`
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

export const apiAdminDeletePost = async (id) => {
  let url = userService + `/posts/delete/${id}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  try {
    res = await api.delete(url, {
      headers: {
        "Authorization": accessToken,
      }
    });
  } catch (err) {
    console.log(err);
  }

  return res;
}