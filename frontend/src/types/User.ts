export type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  role: "admin" | "user";
};

export type userPayload = {
  id: number;
  email: string;
  role: "admin" | "user";
};
