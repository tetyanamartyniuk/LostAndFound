import { useNavigate } from "react-router-dom";
import type { ItemProps } from "../types/Item";

export function ItemCard({ item }: ItemProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/${item.id}`);
  };
  const hasImage = item.image && item.image.length > 0;
  const imageUrl = hasImage
    ? `http://localhost:8080/uploads/${item.image![0]}`
    : "http://localhost:8080/uploads/blankimage.jpg";
  return (
    <div onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <li
        style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}
      >
        <img src={imageUrl} style={{ width: 200 }} />
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <small>Де знайдено: {item.place}</small>
        <br />
        <span>
          Статус: <strong>{item.status}</strong>
        </span>
      </li>
    </div>
  );
}
