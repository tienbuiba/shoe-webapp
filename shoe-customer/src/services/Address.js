
import axios from 'axios';
import { userService } from 'src/constants/Constant';
import TokenService from './TokenService';
import api from './Api';

export const apiUserGetCity = async () => {
  const url = userService + '/city-references/list';
  let res;
  res = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};


export const apiUserGetDistrictByCity = async (id) => {
  const url = userService + `/district-references/list-by-city?cityId=${id}`;
  let res;
  res = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

export const apiUserGetWardByDistrict = async (id) => {
  const url = userService + `/ward-references/list-by-district?districtId=${id}`;
  let res;
  res = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

export const apiUserCreateDeliveryAddress = async (fullname, phone, cityId, wardId, districtId, detail) => {
  let url = userService + '/delivery-addresses/user/create';
  let data = {
    fullname: fullname,
    phone: phone,
    cityId: cityId,
    wardId: wardId,
    districtId: districtId,
    detail: detail
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

export const apiUserGetDeliveryAddress = async () => {
  let url = userService + '/delivery-addresses/user/list';
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



export const apiUserUpdateDeliveryAddress = async (id,fullname, phone, cityId, wardId, districtId, detail) => {
  let url = userService + `/delivery-addresses/user/update/${id}`;
  let data = {
    fullname: fullname,
    phone: phone,
    cityId: cityId,
    wardId: wardId,
    districtId: districtId,
    detail: detail
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