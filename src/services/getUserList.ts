import appAxios from './axios/appAxios.ts';
import { User } from '../utils/types/types.ts';

const getUserList = async (): Promise<User[]> => {
  return appAxios.get(`/users`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

export default { getUserList };
