import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constants/Constant';

export const apiUserCreateOrder = async (cartIds, addressId) => {
  const url = userService + '/orders/create';
  const data = {
    cartIds: cartIds,
    addressId: addressId
  }
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


export const apiUserGetAllOrder = async (rowsPerPage, page, keyword) => {
  const url = userService + `/orders/list`;
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


export const apiUserExportOrder = async (orderID) => {
  const url = userService + `/orders/export-mail?orderId=${orderID}`;
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  },
  );

  return res;
}


export const apiUserCancelOrder = async (id, reason) => {
  const url = userService + `/orders/cancel/${id}`;
  const data = {
    reason: reason
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
