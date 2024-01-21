export default interface Message {
  id: number;
  text: string;
  sender: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'GUEST' | 'STUDENT' | 'EDUCATOR';
  creationDate: string;
}

export type RegisterFormData = {
  email: string;
  password: string;
  username: string;
  role: 'GUEST' | 'STUDENT' | 'EDUCATOR';
};

export type LoginFormData = {
  username: string;
  password: string;
};
