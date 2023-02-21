import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constants/Constant';

export const apiUserDepositPayPal = async (amount) => {
  let url = userService + '/transactions/payment-paypal';
  let data = {
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

export const apiUserCheckPayPal = async () => {
  let url = userService + '/transactions/check-paypal';
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(
    url,
    {},
    {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
    }
  );

  return res;
};

export const apiUserCheckOrderPaid = async (orderCode) => {
  const url = userService + `/transactions/check-order-paied?order_code=${orderCode}`;
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  return res;
};
