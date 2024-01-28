export default interface Message {
  id: string;
  senderId: string;
  chatId: string;
  content: string;
  timestamp: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
}

export interface Chat {
  id: string;
  chatName: string;
  userIds: string[];
  messages: Message[];
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
  email: string;
  password: string;
};
