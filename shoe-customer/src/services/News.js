import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constants/Constant';

export const apiUserGetAllListPosts = async (rowsPerPage, page, keyword) => {
  const url = userService + `/posts/list`;
  const data = {
    limit: rowsPerPage,
    offset: page,
    keyword: keyword
  }
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }
  );
  return res;
}

export const apiUserGetNewsById = async (id) => {
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

export const apiUserGetNewsCommentById = async (id) => {
  const url = userService + `/comment-posts/list-comment?postId=${id}`;
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