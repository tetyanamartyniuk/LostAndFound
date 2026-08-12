import type { Conversation } from "../types/Chat";
import type { ServerResponse } from "../types/Item";
import type { Message } from "../types/Message";

export const chatService = {
  getAllMessages: async (itemId: number): Promise<Conversation | null> => {
    const response = await fetch(`/api/user/messages/${itemId}`);
    if (!response.ok) {
      throw new Error("Failed to get the messages");
    }
    const dataFromServer: ServerResponse<Conversation | null> =
      await response.json();

    return dataFromServer.data;
  },

  createMessage: async (itemId: number, text: string) => {
    const response = await fetch(`/api/user/messages/${itemId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      throw new Error("Failed to send the message");
    }
    const data: ServerResponse<{
      conversation: Conversation;
      message: Message;
    }> = await response.json();
    return data.data;
  },

  getAllMyConversations: async (): Promise<Conversation[]> => {
    const response = await fetch("/api/user/conversations");
    if (!response.ok) {
      throw new Error("Failed to get the conversation");
    }
    const data: ServerResponse<Conversation[]> = await response.json();
    return data.data;
  },
};
