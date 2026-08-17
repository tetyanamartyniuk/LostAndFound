export const authService = {
  login: async (formData: FormData): Promise<User> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const { data } = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Authentication error");
    }
    return data;
  },
  register: async (formData: FormData): Promise<void> => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Registration error");
    }
  },
  getCurrUser: async () => {
    const response = await fetch("/api/auth/currUser");
    if (!response.ok) {
      throw new Error("Failed to get the current user");
    }
    const { data } = await response.json();
    console.log(data);
    return data;
  },
};
