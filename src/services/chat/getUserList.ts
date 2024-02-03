import appAxios from '../axios/appAxios.ts';
import { User } from '../../utils/types/types.ts';

const getUserList = async (): Promise<User[]> => {
  try {
    const response = await appAxios.get(`/users`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default { getUserList };
