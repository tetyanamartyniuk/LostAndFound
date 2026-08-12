import { useNavigate } from "react-router-dom";
import { itemService } from "../../services/itemService";
import { CreateItemForm } from "./CreateItemForm";

export function CreateItemPage() {
  const navigate = useNavigate();

  const handleItemCreate = async (formData: any) => {
    try {
      await itemService.create(formData);
      alert("Item successfully created");
      navigate("/");
    } catch (err: any) {
      console.error("Something went wrond during item creation :", err);
      alert(
        err.message ||
          "Something went wrond during item creation. Please try again.",
      );
    }
  };
  return <CreateItemForm onCreate={handleItemCreate}></CreateItemForm>;
}
