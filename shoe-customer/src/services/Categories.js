import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constants/Constant';

export const apiUserGetAllCategories = async (rowsPerPage, page,keyword) => {
  const url = userService + `/categories/list`;
  const data = {
    limit: rowsPerPage,
    offset: page, 
    keyword: keyword
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





export const apiUserExportOrder = async (orderID) => {
  const url = userService + `/orders/export-mail?orderId=${orderID}`;
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url,  {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  },
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
  },  {}
  
  );
  return res;
};