import { useQuery } from 'react-query';
import { UserService } from '../services';

const useUsers = () => {
  // third param used for refetching (to keep cache up to date
  return useQuery('users', async () => UserService.getUserList());
};

export default useUsers;
