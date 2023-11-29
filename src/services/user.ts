import { UserinfoType } from "types/userAjax";
import axios from "./ajax";

export const createUser = async (id: string, data: Partial<UserinfoType>) => {
  const url = `/api/user/create/${id}`;
  return await axios.post(url, data);
};

export const getUserinfo = async (id: string) => {
  const url = `/api/user/get/${id}`;
  return (await axios.get(url)) as UserinfoType;
};

export const updateUserinfo = async (
  id: string,
  data: Partial<UserinfoType>
) => {
  const url = `/api/user/update/${id}`;
  return (await axios.post(url, data)) as UserinfoType;
};
