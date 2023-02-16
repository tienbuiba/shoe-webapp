import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constants/Constant';

export const apiUserCreateComment = async (id, content) => {
  const url = userService + `/comment-posts/comment?postId=${id}`;
  const data = {
    content: content
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

export const apiUserCommentPostById = async (id) => {
  const url = userService + `/comment-posts/delete/${id}`;
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.delete(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }
  );
  return res;
}


export const apiUserEditCommentById = async (id, content) => {
  const url = userService + `/comment-posts/update-comment?commentId=${id}`;
  const data = {
    content: content
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

// export const apiUserGetNewsCommentById = async (id) => {
//   const url = userService + `/comment-posts/list-comment?postId=${id}`;
//   let res;
//   const accessToken = TokenService.getLocalAccessToken();
//   res = await api.get(url, {
//     headers: {
//       "Authorization": accessToken,
//       "Content-Type": "application/json"
//     }
//   }
//   );
//   return res;
// }