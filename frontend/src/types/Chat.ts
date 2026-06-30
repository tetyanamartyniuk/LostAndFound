import type { Message } from "./Message";
import type { User } from "./User";

export type Chat = {
  id: number;
  itemId: number;
  user1id: number;
  user2id: number;
  messages: Message[];
};

export type Conversation = {
  id: number;
  itemId: number;
  messages: Message[];
  participants: Participant[];
};

export type Participant = {
  id: number;
  conversationId: number;
  userId: number;
  user: User;
};
