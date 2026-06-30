import { useEffect, useState } from "react";
import type { Conversation } from "../../types/Chat";
import { chatService } from "../../services/chatService";
import { Link } from "react-router-dom";

export function ChatSidebar() {
  const [chats, setChats] = useState<Conversation[]>([]);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const result = await chatService.getAllMyConversations();
        setChats(result);
      } catch (err) {
        console.error(err);
        alert("Не вдалось завантажити чати");
      }
    };
    fetchChats();
  }, []);
  return (
    <>
      {chats.map((chat) => (
        <li key={chat.id}>
          <Link to={`/chats/item/${chat.itemId}`} className="my-button-style">
            {chat.messages[0].text}
          </Link>
        </li>
      ))}
    </>
  );
}
