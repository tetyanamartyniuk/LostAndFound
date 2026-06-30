export type Message = {
  id: number;
  text: string;
  sentAt: Date;
  readAt: Date;
  senderId: number;
  chatId: number;
};
