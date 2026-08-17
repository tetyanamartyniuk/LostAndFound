import { useEffect, useState } from "react";
import type { Conversation } from "../../types/Chat";
import { chatService } from "../../services/chatService";
import { Link } from "react-router-dom";
import styles from "./ChatSidebar.module.css";

export function ChatSidebar() {
  const [chats, setChats] = useState<Conversation[]>([]);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const result = await chatService.getAllMyConversations();
        setChats(result);
      } catch (err) {
        console.error(err);
        alert("Failed to load your chats");
      }
    };
    fetchChats();
  }, []);
  return (
    <ul className={styles.chatList}>
      {chats.map((chat) => (
        <li key={chat.id}>
          <Link to={`/chats/item/${chat.itemId}`} className={styles.chatItem}>
            <span className={styles.previewText}>{chat.messages[0].text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
