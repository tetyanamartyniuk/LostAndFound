export type Item = {
  id: number;
  title: string;
  description: string;
  place: string;
  foundAt: Date;
  status: "lost" | "found";
  userId: number;
  user?: User;
  image?: string[] | null;
};

export interface ItemProps {
  item: Item;
}

export interface ServerResponse<T> {
  success: boolean;
  data: T;
}
