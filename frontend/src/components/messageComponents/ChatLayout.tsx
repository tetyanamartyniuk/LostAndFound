import { useEffect, useState } from "react";
import { chatService } from "../../services/chatService.js";
import { useParams } from "react-router-dom";
import type { Message } from "../../types/Message.js";
import type { Item } from "../../types/Item.js";
import { MessageInputForm } from "./MessageInputForm.js";
import { ChatSidebar } from "./ChatSidebar.js";
import styles from "./chatLayout.module.css";
import type { User, userPayload } from "../../types/User.js";
import { itemService } from "../../services/itemService.js";
import { useAuth } from "../../context/AuthContext.js";

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [item, setItem] = useState<Item | null>(null);
  const [partner, setPartner] = useState<User | null>(null);

  const { currUser } = useAuth();
  const params = useParams();
  const id = Number(params.itemId);
  if (!id) {
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedItem, conversation] = await Promise.all([
          itemService.getById(id),
          chatService.getAllMessages(id),
        ]);

        if (fetchedItem) {
          setItem(fetchedItem);
        }

        if (conversation) {
          const { messages, participants } = conversation;

          if (messages) {
            setMessages(messages);
          }

          if (participants && currUser) {
            const chatPartner = participants.find(
              (p) => p.user.id !== currUser.id,
            );
            if (chatPartner) {
              setPartner(chatPartner.user);
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (currUser) {
      fetchData();
    }
  }, [id, currUser]);

  const handleSendMessage = async (text: string) => {
    try {
      const result = await chatService.createMessage(id, text);
      console.log("handleSendMessage: ", result.conversation.messages);
      setMessages((prev) => [...prev, result.message]);
    } catch (error) {
      console.error(error);
      alert("Failed to send the message");
    }
  };

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <ChatSidebar />
      </aside>

      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <h1>{item?.title}</h1>
          <h2>
            Your chat with {item.user?.username ? item.user?.username : ""}
          </h2>
        </div>

        <div className={styles.messagesList}>
          {messages.map((message) => (
            <div key={message.id} className={styles.messageWrapper}>
              {currUser?.id === message.senderId ? (
                <div className={styles.sentMessages}>{message.text}</div>
              ) : (
                <div className={styles.receivedMessages}>{message.text}</div>
              )}
            </div>
          ))}
        </div>

        <MessageInputForm onSend={handleSendMessage} />
      </div>
    </div>
  );
}
