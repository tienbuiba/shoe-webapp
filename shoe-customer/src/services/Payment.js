import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constant/Constants';

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
