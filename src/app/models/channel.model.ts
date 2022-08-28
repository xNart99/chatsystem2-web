import { Message } from "./message.model";
import { User } from "./user.model";

export interface Channel {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[]; 
  accessingUsers: string[];
}