import axios from 'axios';
import { userService } from 'src/constants/Constant';

export const apiUserForgotPassword = async (email) => {
  const url = userService + `/auth/forgot-password`;
  const data = {
    email: email
  }
  let res;
  res = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
  return res;
}

// export const apiUserForgotPass = async (email) => {
//   let url = userService + '/auth/forgot-password';
//   let data = {
//     email: email,
//   };
//   let res;
//   const accessToken = TokenService.getLocalAccessToken();
//   res = await axios.post(url, data, {
//     headers: {
//       Authorization: accessToken,
//       'Content-Type': 'application/json',
//     },
//   });

//   return res;
// };