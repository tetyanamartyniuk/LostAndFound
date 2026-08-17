import { useEffect, useState } from "react";
import type { Item } from "../../types/Item";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { userPayload } from "../../types/User";
import { itemService } from "../../services/itemService";
import { useAuth } from "../../context/AuthContext";
import { ImageSlidebar } from "./ImageSlidebar";
import styles from "./ItemExtendedCard.module.css";

export function ItemExtendedCard() {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const result = await itemService.getById(id);
        setItem(result);
      } catch (err) {
        console.error("Request error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure that you want to delete this item?"))
      return;
    try {
      await itemService.delete(id);
      alert("Successfully deleted");
      navigate("/");
    } catch (err) {
      alert("Something went wrong during deletion");
    }
  };

  if (loading) return <p>Loading ...</p>;
  if (!item) return <p>This item wasn`t found</p>;
  const isOwner = currUser !== null && currUser.id === item?.userId;

  console.log("item.image: ", item.image);
  const imageUrls = [];
  if (item.image && item.image.length > 0) {
    for (let i = 0; i < item.image?.length; i++) {
      imageUrls.push(`http://localhost:8080/uploads/${item.image![i]}`);
    }
  } else {
    imageUrls.push("http://localhost:8080/uploads/blankimage.jpg");
  }
  console.log("imageUrls", imageUrls);

  return (
    <>
      <div className={styles.container}>
        <ImageSlidebar imageUrls={imageUrls}></ImageSlidebar>
        <div>
          <div className={styles.itemDetails}>
            <h1 className={styles.itemTitle}>{item.title}</h1>
            <p>{item.description}</p>
            <p>
              {item.status}: {item.foundAt.toString()}
            </p>
            <p>where: {item.place}</p>
          </div>
          <div className={styles.actionBtns}>
            {isOwner && (
              <div>
                <button onClick={handleDelete} className={styles.deleteBtn}>
                  Delete item
                </button>
              </div>
            )}
            {!isOwner && (
              <Link to={`/chats/item/${item.id}`} className={styles.contactBtn}>
                Contact poster ✉
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
