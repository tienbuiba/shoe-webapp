import TokenService from './TokenService';
import { userService } from 'src/constants/Constant';
import api from './Api';
import axios from 'axios';

export const apiUserGetAllCartItem = async () => {
  const url = userService + `/carts/user/carts`;
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await axios.get(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  },
  );
  return res;
}

export const apiUserCreateCart = async (productId, quantity, size, color) => {
  const url = userService + `/carts/user/create`;
  const data = {
    productId: productId,
    quantity: quantity,
    size: size,
    color: color
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

export const apiUserUpdateCartById = async (id, quantity, size, color) => {
  const url = userService + `/carts/user/update/${id}`;
  const data = {
    quantity: quantity,
    size: size,
    color: color
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


export const apiUserDeleteCartById = async (id) => {
  const url = userService + `/carts/user/delete/${id}`;
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.delete(url, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  }
  );
  return res;
}
