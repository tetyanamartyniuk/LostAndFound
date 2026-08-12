import type { Item, ServerResponse } from "../types/Item";

export const itemService = {
  getAll: async (filters?: Record<string, string>): Promise<Item[]> => {
    const queryString = filters ? new URLSearchParams(filters).toString() : "";
    const actualQuery = queryString ? `?${queryString}` : "";
    const response = await fetch(`/api/items${actualQuery}`);
    if (!response.ok) {
      throw new Error("Failed to get the items list");
    }
    const data: ServerResponse<Item[]> = await response.json();
    return data.data;
  },
  getById: async (id: number): Promise<Item> => {
    const response = await fetch(`/api/items/${id}`);
    if (!response.ok) {
      throw new Error("Failed to get information about the item");
    }
    const data: ServerResponse<Item> = await response.json();
    return data.data;
  },
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to delete the item");
    }
  },
  create: async (formData: FormData): Promise<Item> => {
    const response = await fetch("/api/items", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to create the item");
    }
    const data: ServerResponse<Item> = await response.json();
    return data.data;
  },
  getPendingItems: async (): Promise<Item[]> => {
    const response = await fetch("/api/admin/pendingItems");
    if (!response.ok) {
      throw new Error("Failed to get pending items list");
    }
    const data: ServerResponse<Item[]> = await response.json();
    return data.data;
  },

  approveItem: async (id: number): Promise<void> => {
    const response = await fetch(`/api/admin/panel/${id}/approve`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Failed to approve the item");
    }
  },
  disapproveItem: async (id: number): Promise<void> => {
    const response = await fetch(`/api/admin/panel/${id}/disapprove`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Failed to disapprove the item");
    }
  },
};
