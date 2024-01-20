import appAxios from './axios/appAxios.ts';
import { Course } from '../utils/types/types.ts';

const getCourse = async (): Promise<Course[]> => {
  return appAxios.get(`/course`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

export default { getCourse };
