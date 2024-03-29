import TokenService from './TokenService';
import api from './Api';
import { userService } from 'src/constant/Constants';

export const uploadImage = async (file) => {
  const url = userService + `/upload-files/push`;
  let requestBody = new FormData();
  requestBody.append('file', file);
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, requestBody, {
    headers: {
      "Authorization": accessToken,
      'Content-Type': 'multipart/form-data',
    }
  }
  );
  return res;
}
