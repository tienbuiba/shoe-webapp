import axios from 'axios';
import { userService } from 'src/constants/Constant';
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
        alert("Bạn chưa đăng nhập, vui lòng đăng nhập để thực hiện hành động này");
        localStorage.clear();
        window.location = '/login';
        TokenService.removeAccessToken();
        TokenService.removeLocalExpiresIn();
        TokenService.removeLocalProfile();
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
