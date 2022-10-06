export interface Message {
  id?: string;
  createdAt: number;
  type: 'text' | 'image' | 'video';
  content?: string;
  from: string;
}