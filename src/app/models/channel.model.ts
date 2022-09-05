import { Message } from './message.model'

export interface Channel {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[]; 
  read: string[];
  accessingUsers: string[];
}