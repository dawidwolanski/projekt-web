type ISOString = string;

export interface Notification {
  id: number
  title: string;
  message: string;
  date: ISOString;
  priority: 'low' | 'medium' | 'high';
  isread: 0 | 1;
}