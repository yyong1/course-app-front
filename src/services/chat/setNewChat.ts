import appAxios from '../axios/appAxios';
import { User } from '../../utils/types/types';

const setNewChat = async (chatData: { chatName: string; userIds: string[] }): Promise<User[]> => {
  try {
    const response = await appAxios.post(`/chats`, chatData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating new chat:', error);
    throw error;
  }
};

const getChatList = async (): Promise<User[]> => {
  try {
    const response = await appAxios.get(`/chats`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

export default { setNewChat };
