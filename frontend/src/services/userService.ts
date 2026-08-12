import type { ServerResponse } from "../types/Item";
import type { User } from "../types/User";

export const userService = {
  getUserById: async (id: number): Promise<User> => {
    const response = await fetch(`/api/user/users/${id}`);
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to get the user");
    }
    const data: ServerResponse<User> = await response.json();
    return data.data;
  },
};
