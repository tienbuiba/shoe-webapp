import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constant/Constants';
import axios from 'axios';

export const apiUserLogin = async (email, password) => {
  let url = userService + '/auth/login';
  let data = {
    email: email,
    password: password,
  };
  let res;
  res = await axios.post(url, data, {
    headers: { 'Content-Type': 'application/json' },
  });

  return res;
};

export const apiUserRegister = async (userName, password, email, phone) => {
  const url = userService + '/auth/register';
  let data = {
    username: userName,
    password: password,
    email: email,
    phone: phone,
  };
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await axios.post(url, data, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  return res;
};

export const apiUserProfile = async () => {
  const url = userService + '/users/me';
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await axios.get(url, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

export const apiUserChangePassword = async (password, newPassword) => {
  let url = userService + '/auth/change-password';
  let data = {
    password: password,
    newPassword: newPassword,
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
export const apiUserForgotPass = async (email) => {
  let url = userService + '/auth/forgot-password';
  let data = {
    email: email,
  };
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await axios.post(url, data, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  return res;
};
export const apiUserResetPassword = async (token, newPassword) => {
  let url = userService + '/auth/set-new-password';
  let data = {
    token: token,
    newPassword: newPassword
  };
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await axios.post(url, data, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  return res;
};
