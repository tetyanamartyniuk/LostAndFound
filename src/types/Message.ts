export type Message = {
  id: number;
  text: string;
  sentAt: Date;
  readAt: Date;
  sender: number;
  chatId: number;
};

export type CreateMessageDTO = {
  text: string;
};

export interface CreateMessagePayload extends CreateMessageDTO {
  senderId: number;
  chatId: number;
}

export type itemId = {
  itemId: string;
};
