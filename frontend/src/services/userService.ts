import type { ServerResponse } from "../types/Item";
import type { User } from "../types/User";

export const userService = {
  getUserById: async (id: number) => {
    const response = await fetch(`/api/user/users/${id}`);
    if (!response.ok) {
      throw new Error("Не вдалось завантажити користувача");
    }
    const data: ServerResponse<User> = await response.json();
    return data.data;
  },
};
