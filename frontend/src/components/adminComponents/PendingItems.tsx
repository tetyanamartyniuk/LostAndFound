import { useEffect, useState } from "react";
import { itemService } from "../../services/itemService";
import type { Item } from "../../types/Item";

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
    <div>
      <ul>
        {pendingItems.map((pendingItem) => (
          <li key={pendingItem.id}>
            {pendingItem.title}
            <button onClick={() => handleApprove(pendingItem.id)}>
              Approve
            </button>
            <button onClick={() => handleDisapprove(pendingItem.id)}>
              Disapprove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
