import type { Item, ServerResponse } from "../types/Item";

export const itemService = {
  getAll: async (filters?: Record<string, string>) => {
    const queryString = filters ? new URLSearchParams(filters).toString() : "";
    const actualQuery = queryString ? `?${queryString}` : "";
    const response = await fetch(`/api/items${actualQuery}`);
    if (!response.ok) {
      throw new Error("Не вдалося завантажити речі з сервера");
    }
    const data: ServerResponse<Item[]> = await response.json();
    return data;
  },
  getById: async (id: number) => {
    const response = await fetch(`/api/items/${id}`);
    if (!response.ok) {
      throw new Error("Не вдалося завантажити річ з сервера");
    }
    const data: ServerResponse<Item> = await response.json();
    return data.data;
  },
  delete: async (id: number) => {
    const response = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Не вдалося видалити річ на сервері");
    }
  },
  create: async (formData: FormData) => {
    const response = await fetch("/api/items", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Не вдалося додати річ");
    }
    const data: ServerResponse<Item> = await response.json();
    return data;
  },
  getPendingItems: async () => {
    const response = await fetch("/api/admin/pendingItems");
    if (!response.ok) {
      throw new Error("Не вдалось отримати речі, що очікують на підтвердження");
    }
    const data: ServerResponse<Item[]> = await response.json();
    return data;
  },
  approveItem: async (id: number): Promise<void> => {
    const response = await fetch(`/api/admin/panel/${id}/approve`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Не вдалось схвалити річ");
    }
  },
  disapproveItem: async (id: number): Promise<void> => {
    const response = await fetch(`/api/admin/panel/${id}/disapprove`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Не вдалось відхилити річ");
    }
  },
};
