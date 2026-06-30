import { useEffect, useState } from "react";
import { itemService } from "../../services/itemService";
import type { Item } from "../../types/Item";

export function PendingItems() {
  const [pendingItems, setPendingItems] = useState<Item[]>([]);
  useEffect(() => {
    const fetchPendingItems = async () => {
      try {
        const result = await itemService.getPendingItems();
        setPendingItems(result.data);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchPendingItems();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const userAgreed = window.confirm("Ви впевнені, що хочете схвалити річ?");
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
        "Ви впевнені, що хочете відхилити річ?",
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
    <ul>
      {pendingItems.map((pendingItem) => (
        <li key={pendingItem.id}>
          {pendingItem.title}
          <button onClick={() => handleApprove(pendingItem.id)}>
            Підтвердити
          </button>
          <button onClick={() => handleDisapprove(pendingItem.id)}>
            Відхилити
          </button>
        </li>
      ))}
    </ul>
  );
}
