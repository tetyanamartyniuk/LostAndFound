import { useEffect, useState } from "react";
import { itemService } from "../../services/itemService";
import type { Item } from "../../types/Item";
import styles from "./PendingItems.module.css"; // Додано імпорт стилів
import { ImageSlidebar } from "../itemComponents/ImageSlidebar";

export function PendingItems() {
  const [pendingItems, setPendingItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchPendingItems = async () => {
      try {
        const result = await itemService.getPendingItems();
        setPendingItems(result);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchPendingItems();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const userAgreed = window.confirm(
        "Are you sure that you want to approve this item?",
      );
      if (!userAgreed) {
        return;
      }
      await itemService.approveItem(id);
      setPendingItems(pendingItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisapprove = async (id: number) => {
    try {
      const userAgreed = window.confirm(
        "Are you sure that you want to disapprove this item?",
      );
      if (!userAgreed) {
        return;
      }
      await itemService.disapproveItem(id);
      setPendingItems(pendingItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Pending Items ({pendingItems.length})</h2>

      {pendingItems.length === 0 ? (
        <p className={styles.emptyMessage}>
          There are no items waiting for approval.
        </p>
      ) : (
        <ul className={styles.itemList}>
          {pendingItems.map((pendingItem) => (
            <li key={pendingItem.id} className={styles.listItem}>
              <ImageSlidebar
                imageUrls={
                  pendingItem.image?.map(
                    (image) =>
                      image && `http://localhost:8080/uploads/${image}`,
                  ) || ["http://localhost:8080/uploads/blankimage.jpg"]
                }
              ></ImageSlidebar>
              <div>
                <div className={styles.pendingItemInfo}>
                  <span className={styles.itemTitle}>{pendingItem.title}</span>
                  <p className={styles.itemDescription}>
                    {pendingItem.description}
                  </p>
                  <p className={styles.itemStatus}>
                    {pendingItem.status}: {pendingItem.foundAt.toString()}
                  </p>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleApprove(pendingItem.id)}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleDisapprove(pendingItem.id)}
                  >
                    Disapprove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
