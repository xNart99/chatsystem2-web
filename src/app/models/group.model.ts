import { Channel } from "./channel.model";
import { User } from "./user.model";

export interface Group {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  members: User[];
  channels: Channel[];
  read: string[];
}