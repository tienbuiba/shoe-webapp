import axios from 'axios';
import { userService } from 'src/constant/Constants';
import TokenService from './TokenService';

const instance = axios.create({
  baseURL: userService,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== userService && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        alert("Phiên đăng nhập của bạn đã hết hạn, làm ơn đăng nhập lại");
        localStorage.clear();
        window.location = '/';
        TokenService.removeAccessToken();
        TokenService.removeLocalExpiresIn();
        TokenService.removeLocalProfile();
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
