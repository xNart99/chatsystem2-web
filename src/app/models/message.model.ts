export interface Message {
  id: string;
  createdAt: Date;
  type: 'text' | 'image' | 'video';
  content: string;
  from: string;
}