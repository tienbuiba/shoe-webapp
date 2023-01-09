import { userService } from "../constant/Constants";
import api from "./Api"


export const apiGetAllCountryId = async () => {
  const url = userService + `/countries`;
  let res;
  res = await api.get(url,  {
    headers: {
      "Content-Type": "application/json"
    }
  }, 
  );

  return res;
}

