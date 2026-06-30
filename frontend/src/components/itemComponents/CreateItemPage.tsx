import { useNavigate } from "react-router-dom";
import { itemService } from "../services/itemService";
import { CreateItemForm } from "./itemComponents/CreateItemForm";

export function CreateItemPage() {
  const navigate = useNavigate();

  const handleItemCreate = async (formData: any) => {
    try {
      await itemService.create(formData);
      alert("Річ успішно додана");
      navigate("/");
    } catch (err: any) {
      console.error("Помилка створення речі:", err);
      alert(err.message || "Не вдалося створити оголошення. Спробуйте ще раз.");
    }
  };
  return <CreateItemForm onCreate={handleItemCreate}></CreateItemForm>;
}
