import appAxios from '../axios/appAxios';
import { Chat, User } from '../../utils/types/types';

const setNewChat = async (chatData: { chatName: string; userIds: string[] }): Promise<User[]> => {
  try {
    const response = await appAxios.post(`/chats`, chatData);
    return response.data;
  } catch (error) {
    console.error('Error creating new chat:', error);
    throw error;
  }
};

const getChatList = async (userId: string): Promise<Chat[]> => {
  try {
    const response = await appAxios.get(`/chats/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

export default { setNewChat, getChatList };
