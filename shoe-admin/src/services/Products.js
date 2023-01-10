import TokenService from "./TokenService";
import api from "./Api";
import { userService } from "../constant/Constants";





export const apiAdminCreateProduct= async (productForm) => {
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

export const apiAdminDeleteMailType = async (id) => {
  let url = userService + `/mail-types/admin/delete/${id}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.delete(url, {
    headers: {
      "Authorization": accessToken,
    }
  });

  return res;
}

export const apiAdminUpdateMailType = async (id, price, name) => {
  let url = userService + `/mail-types/admin/update/${id}`
  let res;
  const data = {
    price: price,
     name:name
  }
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      "Authorization": accessToken,
    }
  });

  return res;
}




export const apiGetListMailTypeTrusted = async () => {
  const url = userService + `/mail-types/list-trusted`;
  let res;
  res = await api.get(url, {
    headers: {
      "Content-Type": "application/json"
    }
  },
  );

  return res;
}

export const apiAdminPostMailTrusted = async (id, data) => {
  let url = userService + `/mails/admin/create-trusted?mailTypeId=${id}`
  let res;

  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      "Authorization": accessToken,
    }
  });

  return res;
}




