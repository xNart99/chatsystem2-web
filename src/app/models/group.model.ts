import { Channel } from "./channel.model";

export interface Group {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  members: string[];
  channels: Channel[];
  read: string[];
}