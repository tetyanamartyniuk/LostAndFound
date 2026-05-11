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

export interface CreateMessagePayload extends CreateMessageDTO {
  senderId: number;
  receiverId: number;
  itemId: number;
}

export type itemId = {
  itemId: string;
};
