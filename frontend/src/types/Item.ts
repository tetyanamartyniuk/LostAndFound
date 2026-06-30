export type Item = {
  id: number;
  title: string;
  description: string;
  place: string;
  foundAt: Date;
  status: "lost" | "found";
  userId: number;
  image?: string[] | null;
};

export interface ItemProps {
  item: Item;
}

// Описуємо загальний формат відповіді сервера
export interface ServerResponse<T> {
  success: boolean;
  data: T; //юзаємо generic, бо тип даних, які повертаються у нас може бути різним
}
