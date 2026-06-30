import type { Conversation } from "../types/Chat";
import type { ServerResponse } from "../types/Item";
import type { Message } from "../types/Message";

export const chatService = {
  getAllMessages: async (itemId: number) => {
    const response = await fetch(`/api/user/messages/${itemId}`);
    if (!response.ok) {
      throw new Error("Не вдалось завантажити повідомлення");
    }
    const dataFromServer: ServerResponse<Conversation | null> =
      await response.json();
    console.log("Дані з сереверу", dataFromServer);
    console.log("dataFromServer.data", dataFromServer.data);
    return dataFromServer.data;
  },

  createMessage: async (itemId: number, text: string) => {
    console.log("chatService(itemId): ", itemId);
    console.log("chatService(text): ", text);

    const response = await fetch(`/api/user/send-message/${itemId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      throw new Error("Не вдалось надіслати повідомлення");
    }
    const data: ServerResponse<{
      conversation: Conversation;
      message: Message;
    }> = await response.json();
    console.log("DATA", data);
    return data;
  },

  getAllMyConversations: async () => {
    const response = await fetch("/api/user/get-conversations");
    if (!response.ok) {
      throw new Error("Не вдалось завантажити чати");
    }
    const data: ServerResponse<Conversation[]> = await response.json();
    return data.data;
  },
};
