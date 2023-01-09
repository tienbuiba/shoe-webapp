import TokenService from "./TokenService";
import api from "./Api";
import { userService } from "../constant/Constants";

// export const apiAdminCreateTrustedMailProduct = async (name, price, countryId) => {
//   let url = userService + '/mail-types/admin/create'
//   let data = {
//     name: name,
//     price: price,
//     countryId: countryId
//   };
//   let res;
//   const accessToken = TokenService.getLocalAccessToken();
//   res = await api.post(url, data, {
//     headers: {
//       "Authorization": accessToken,
//       "Content-Type": "application/json"
//     }
//   });

//   return res;
// }

export const apiAdminGetPostList = async () => {
  let url = userService + '/posts/list'
  let res;
  res = await api.get(url);
  return res;
}


export const apiAdminCreatePost = async (shortDesc, longDesc) => {
  let url = userService + '/posts/create'
  let data = {
    shortDesc: shortDesc,
    longDesc: longDesc
  };
  let res;
  const accessToken = TokenService.getLocalAccessToken();
  res = await api.post(url, data, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    }
  });

  return res;
}

// export const apiAdminDeleteMailType = async (id) => {
//   let url = userService + `/mail-types/admin/delete/${id}`
//   let res;
//   const accessToken = TokenService.getLocalAccessToken();
//   res = await api.delete(url, {
//     headers: {
//       "Authorization": accessToken,
//     }
//   });

//   return res;
// }

// export const apiAdminUpdateMailType = async (id, price, name) => {
//   let url = userService + `/mail-types/admin/update/${id}`
//   let res;
//   const data = {
//     price: price,
//      name:name
//   }
//   const accessToken = TokenService.getLocalAccessToken();
//   res = await api.post(url, data, {
//     headers: {
//       "Authorization": accessToken,
//     }
//   });

//   return res;
// }




// export const apiGetListMailTypeTrusted = async () => {
//   const url = userService + `/mail-types/list-trusted`;
//   let res;
//   res = await api.get(url, {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   },
//   );

//   return res;
// }

// export const apiAdminPostMailTrusted = async (id, data) => {
//   let url = userService + `/mails/admin/create-trusted?mailTypeId=${id}`
//   let res;

//   const accessToken = TokenService.getLocalAccessToken();
//   res = await api.post(url, data, {
//     headers: {
//       "Authorization": accessToken,
//     }
//   });

//   return res;
// }



// // ============================||RENT MAIL




// export const apiAdminGetRentServiceLists = async () => {
//   let url = userService + `/rent-services/admin/list`
//   let res;
//   const accessToken = TokenService.getLocalAccessToken();
//   res = await api.get(url, {}, {headers: { 'Content-Type': 'application/json', 'Authorization': accessToken }}
  
//   );

//   return res;
// }



// export const apiAdminCreateRentMailService = async (name, price) => {
//   let url = userService + '/rent-services/admin/create'
//   let data = {
//     name: name,
//     price: price
//   };
//   let res;
//   const accessToken = TokenService.getLocalAccessToken();
//   res = await api.post(url, data, {
//     headers: {
//       "Authorization": accessToken,
//       "Content-Type": "application/json"
//     }
//   });

//   return res;
// }


// export const apiAdminUpdateRentMailType = async (id, price, name,status) => {
//   let url = userService + `/rent-services/admin/update/${id}`
//   let res;
//   const data = {
//     name:name, 
//      price: price,
//      status:status
//   }
//   const accessToken = TokenService.getLocalAccessToken();
//   res = await api.post(url, data, {
//     headers: {
//       "Authorization": accessToken,
//     }
//   });

//   return res;
// }

