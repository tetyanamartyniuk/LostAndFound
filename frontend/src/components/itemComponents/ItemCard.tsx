import { useNavigate } from "react-router-dom";
import type { ItemProps } from "../../types/Item";
import styles from "./ItemCard.module.css";

export function ItemCard({ item }: ItemProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/items/${item.id}`);
  };
  const hasImage = item.image && item.image.length > 0;
  const imageUrl = hasImage
    ? `http://localhost:8080/uploads/${item.image![0]}`
    : "http://localhost:8080/uploads/blankimage.jpg";
  return (
    <div onClick={handleCardClick} className={styles.itemContainer}>
      <li>
        <img src={imageUrl} className={styles.itemImg} />
        <div className={styles.itemCardText}>
          <h3>{item.title}</h3>
          <p>Found: {item.place}</p>

          <p>
            Status: <span className={styles.statusSpam}>{item.status} </span>
          </p>
        </div>
      </li>
    </div>
  );
}
