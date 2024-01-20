import appAxios from './axios/appAxios.ts';
import { Message } from '../utils/types';

const getMessage = async (): Promise<Message[]> => {
  return appAxios.get(`/message`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

export default { getMessage };
