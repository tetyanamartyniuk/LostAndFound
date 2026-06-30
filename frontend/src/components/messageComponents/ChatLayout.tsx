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

interface ChatLayoutProps {
  currUser: userPayload | null;
}

export function ChatLayout({ currUser }: ChatLayoutProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [item, setItem] = useState<Item | null>(null);
  const [partner, setPartner] = useState<User | null>(null);

  const params = useParams();
  const id = Number(params.itemId);
  if (!id) {
  }
  // if (isNaN(itemId)) {pa
  //     throw new NotFoundError("Invalid item ID format");
  //   }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedItem, conversation] = await Promise.all([
          itemService.getById(id),
          chatService.getAllMessages(id),
        ]);

        if (fetchedItem) {
          setItem(fetchedItem);
          console.log("Таня лох, а айтем отакий: " + fetchedItem.title);
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
              console.log("Partner: ", chatPartner.user.id);
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
      console.log("handleSendMessage: ", result.data.conversation.messages);
      setMessages((prev) => [...prev, result.data.message]); //змінюємо змінну стану тільки так
    } catch (error) {
      console.error(error);
      alert("Не вдалось надіслати повідомлення");
    }
  };

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <ChatSidebar />
      </aside>

      <div className={styles.chatContainer}>
        <h1>{item?.title}</h1>
        <h2>Листування з {partner?.username}</h2>

        {/* Замінили ul на div для правильної семантики */}
        <div className={styles.messagesList}>
          {messages.map((message) => (
            // KEY ТЕПЕР ТУТ — на найвищому рівні!
            <div key={message.id} className={styles.messageWrapper}>
              {/* Перевіряємо, чиє це повідомлення, і малюємо відповідний стиль */}
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
