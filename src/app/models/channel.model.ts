import { Message } from './message.model'

export interface Channel {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[]; 
  accessingUsers: string[];
}