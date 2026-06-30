import { useEffect, useState } from "react";
import type { Item } from "../types/Item";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { userPayload } from "../types/User";
import { itemService } from "../services/itemService";
interface ItemExtendedCardProps {
  currUser: userPayload | null;
}

export function ItemExtendedCard({ currUser }: ItemExtendedCardProps) {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const result = await itemService.getById(id);
        setItem(result);
      } catch (err) {
        console.error("Помилка запиту:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]); //треба викликати кожен раз коли значення змінної id зміниться, тобто якщо ми перейшли на іншу сторінку ми знову фетчимо річ

  const handleDelete = async () => {
    if (!window.confirm("Ви впевнені?")) return;
    try {
      await itemService.delete(id);
      alert("Успішно видалено!");
      navigate("/");
    } catch (err) {
      alert("Щось пішло не так при видаленні");
    }
  };

  if (loading) return <p>Завантаження даних з сервера...</p>;
  if (!item) return <p>Такої речі не знайшлось</p>;
  const isOwner = currUser !== null && currUser.id === item?.userId;

  const hasImage = item.image && item.image.length > 0;
  const imageUrl = hasImage
    ? `http://localhost:8080/uploads/${item.image![0]}`
    : "http://localhost:8080/uploads/blankimage.jpg";
  return (
    <>
      <div>
        <img src={imageUrl} style={{ width: 400 }} alt={item.title} />
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <p>{item.foundAt.toString()}</p>
        <p>{item.place}</p>
        <p>{item.status}</p>
      </div>
      {isOwner && (
        <div>
          <button onClick={handleDelete}>Видалити річ</button>
          <button>Оновити річ</button>
        </div>
      )}
      {!isOwner && (
        <Link to={`/chats/item/${item.id}`} className="my-button-style">
          Написати продавцю
        </Link>
      )}
    </>
  );
}
