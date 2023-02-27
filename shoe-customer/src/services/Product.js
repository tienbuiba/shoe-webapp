import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constants/Constant';

export const apiUserGetAllProductByCategoryId = async (
  rowsPerPage, page, keyword, categoryId,brand,size,price,color) => {
 
  const params = new URLSearchParams({
    categoryId:categoryId,
    ...(brand? { brand: brand } : {}),
    ...(size? { size: size } : {}),
    ...(price? { price: price } : {}),
    ...(color? { color: color } : {}),

  }).toString();
  const url = userService + `/products/list?` + params;
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

export const apiUserGetProductById = async (id) => {
  const url = userService + `/products/detail/${id}`;
  const data = {
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



export const apiUserGetDetailsMail = async (id) => {
  const url = userService + `/orders/detail/${id}`;
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    }
  }, {}

  );
  return res;
};


export const apiUserGetAllTopProductSell = async () => {
  const url = userService + `/products/top-10-best-seller`;
  const data = {};
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }, data
  );
  return res;
}

export const apiUserGetProductCommentById = async (id) => {
  const url = userService + `/comment-products/list-comments?productId=${id}`;
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

export const apiUseCreateProductCommentById = async (id, content, ratingStar) => {
  const url = userService + `/comment-products/comment?productId=${id}`;
  let res;
  const data = {
    content: content,
    ratingStar: ratingStar,
  }
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