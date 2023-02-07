import TokenService from "./TokenService";
import api from "./Api";
import { userService } from "../constant/Constants";

export const apiAdminCreateProduct = async (productForm) => {
  let url = userService + '/products/admin/create'
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, productForm, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  });

  return res;
}

export const apiAdminGetProductList = async () => {
  let url = userService + '/products/list'
  let res;
  res = await api.get(url);
  return res;
}


export const apiAdminGetProductByCategoryId = async (categoryId, rowsPerPage, page, keyword) => {
  let url = userService + `/products/list?categoryId=${categoryId}`
  let res;
  const data = {
    limit: rowsPerPage,
    offset: page,
    keyword: keyword
  }
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  })
  return res;
}


export const apiAdminGetProductById = async (id) => {
  const url = userService + `/products/detail/${id}`  ;
  const data = {
  }
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url,data, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }}
  );
  return res;
}


export const apiAdminDeleteProduct = async (id) => {
  let url = userService + `/products/admin/delete/${id}`
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





