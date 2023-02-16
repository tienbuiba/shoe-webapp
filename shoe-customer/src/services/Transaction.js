import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constants/Constant';


export const apiUserGetTransactionList = async (rowsPerPage, page, keyword, categoryId) => {
  const url = userService + `/transactions/list`;
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