import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constant/Constants';

export const apiAdminGetAllCategories = async (rowsPerPage, page, keyword) => {
  const url = userService + `/categories/list`;
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

export const apiAdminUpdateCategory = async (id, name) => {
  let url = userService + `/categories/admin/update/${id}`
  let res;
  const data = {
    name: name
  }
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      "Authorization": accessToken,
    }
  });

  return res;
}
export const apiAdminDeleteCategory = async (id) => {
  let url = userService + `/categories/admin/delete/${id}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.delete(url, {
    headers: {
      "Authorization": accessToken,
    }
  });

  return res;
}

export const apiUserCreateOrder = async (mailTypeId, orderType, totalPrice, amount) => {
  const url = userService + '/orders/create';
  const data = {
    mailTypeId: mailTypeId,
    orderType: orderType,
    totalPrice: totalPrice,
    amount: amount,
  };
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  return res;
};


