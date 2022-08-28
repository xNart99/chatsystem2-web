import { Channel } from "./channel.model";
import { User } from "./user.model";

export interface Group {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  members: User[];
  channels: Channel[];
}