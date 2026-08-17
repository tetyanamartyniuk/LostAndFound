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
  console.log("imageUrl", imageUrl);
  return (
    <div onClick={handleCardClick} className={styles.itemContainer}>
      <li>
        <img src={imageUrl} className={styles.itemImg} />
        <div className={styles.itemCardText}>
          <h3>{item.title}</h3>
          <p>
            <span
              className={`${styles.status} ${
                item.status === "lost" ? styles.statusLost : styles.statusFound
              }`}
            >
              {item.status}
            </span>{" "}
            in <span className={styles.location}>{item.place}</span>
          </p>
        </div>
      </li>
    </div>
  );
}
