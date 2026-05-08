export type Message = {
  id: number;
  text: string;
  sentAt: Date;
  readAt: Date;
  receiver: number;
  sender: number;
};

export type CreateMessageDTO = {
  text: string;
};

export type itemId = {
  itemId: string;
};
