import TokenService from "./TokenService";
import api from "./Api"
import { userService } from "../constant/Constants";

export const apiAminGetAllOrder = async (rowsPerPage, page,keyword) => {
  const url = userService + `/orders/list`;
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

export const apiAdminExportOrder = async (orderID) => {
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