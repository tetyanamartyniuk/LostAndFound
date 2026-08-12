import { useEffect, useState } from "react";
import type { Item } from "../../types/Item";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { userPayload } from "../../types/User";
import { itemService } from "../../services/itemService";
import { useAuth } from "../../context/AuthContext";
import { SearchByName } from "../filterComponents/SearchByName";

export function ItemExtendedCard() {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const result = await itemService.getById(id);
        setItem(result);
      } catch (err) {
        console.error("Request error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure that you want to delete this item?"))
      return;
    try {
      await itemService.delete(id);
      alert("Successfully deleted");
      navigate("/");
    } catch (err) {
      alert("Something went wrong during deletion");
    }
  };

  if (loading) return <p>Loading ...</p>;
  if (!item) return <p>This item wasn`t found</p>;
  const isOwner = currUser !== null && currUser.id === item?.userId;

  const hasImage = item.image && item.image.length > 0;
  const imageUrl = hasImage
    ? `http://localhost:8080/uploads/${item.image![0]}`
    : "http://localhost:8080/uploads/blankimage.jpg";
  return (
    <>
      <div>
        <img src={imageUrl} style={{ width: 400 }} alt={item.title} />
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <p>{item.foundAt.toString()}</p>
        <p>{item.place}</p>
        <p>{item.status}</p>
      </div>
      {isOwner && (
        <div>
          <button onClick={handleDelete}>Delete item</button>
          <button>Update item</button>
        </div>
      )}
      {!isOwner && (
        <Link to={`/chats/item/${item.id}`} className="my-button-style">
          Contact poster
        </Link>
      )}
    </>
  );
}
