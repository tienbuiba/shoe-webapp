import TokenService from "./TokenService";
import api from "./Api";
import { userService } from "../constant/Constants";


export const apiAdminGetCountNewUsers= async (day) => {
  let url = userService + `/users/admin/new-users?days=${day}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {}, {headers: { 'Content-Type': 'application/json', 'Authorization': accessToken }}
  
  );

  return res;
}

export const apiAdminGetCountNewTransactions= async (day) => {
  let url = userService + `/transactions/admin/new-transactions?days=${day}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {}, {headers: { 'Content-Type': 'application/json', 'Authorization': accessToken }}
  
  );

  return res;
}


export const apiAdminGetCountNewOrders= async (day) => {
  let url = userService + `/orders/admin/new-orders?days=${day}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {}, {headers: { 'Content-Type': 'application/json', 'Authorization': accessToken }}
  
  );

  return res;
}


export const apiAdminGetCalculateRevenue= async (day) => {
  let url = userService + `/orders/admin/revenue?days=${day}`
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.get(url, {}, {headers: { 'Content-Type': 'application/json', 'Authorization': accessToken }}
  
  );

  return res;
}