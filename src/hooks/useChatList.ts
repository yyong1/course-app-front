import { useQuery } from 'react-query';
import { ChatService } from '../services';

const useChatList = (userId: string) => {
  // third param used for refetching (to keep cache up to date
  return useQuery('chatList', async () => ChatService.getChatList(userId));
};

export default useChatList;
