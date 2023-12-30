import { useQuery } from 'react-query';
import { MessageService } from '../services';

const useMessage = () => {
  return useQuery('message', async () => MessageService.getMessage());
  // third param used for refetching (to keep cache up to date
};

export default useMessage;
