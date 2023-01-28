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









