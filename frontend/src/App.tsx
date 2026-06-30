import { Route, Routes } from "react-router-dom";
import "./App.css";
import ItemList from "./components/itemComponents/ItemList";
import { ItemExtendedCard } from "./components/itemComponents/ItemExtendedCard";
import { RegisterPage } from "./components/authComponents/RegisterPage";
import { LoginPage } from "./components/authComponents/LoginPage";
import type { User, userPayload } from "./types/User";
import { useEffect, useState } from "react";
import { CreateItemPage } from "./components/itemComponents/CreateItemPage";
import { AdminPanel } from "./components/adminComponents/AdminPanel";
import { ChatLayout } from "./components/messageComponents/ChatLayout";

import { Profile } from "./components/profileComponents/Profile";
import { ChatSidebar } from "./components/messageComponents/ChatSidebar";

function App() {
  const [currUser, setCurrUser] = useState<userPayload | null>(null);
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    const fetchCurrUser = async () => {
      try {
        const response = await fetch("/api/auth/currUser");
        if (!response.ok) {
          throw new Error("");
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (!data) {
          setCurrUser(null);
          setAuthorized(false);
        } else {
          setCurrUser(data);
          setAuthorized(true);
          console.log(currUser);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurrUser();
  }, []);
  console.log("Поточний стан користувача в App:", currUser);
  return (
    <Routes>
      <Route path="/" element={<ItemList />}></Route>
      <Route
        path="/:id"
        element={<ItemExtendedCard currUser={currUser} />}
      ></Route>
      <Route path="auth/registerPage" element={<RegisterPage />}></Route>
      <Route path="auth/loginPage" element={<LoginPage />}></Route>
      <Route path="createItemPage" element={<CreateItemPage />}></Route>
      <Route path="admin" element={<AdminPanel />}></Route>
      <Route
        path="chats/item/:itemId"
        element={<ChatLayout currUser={currUser}></ChatLayout>}
      ></Route>
      <Route
        path="profile"
        element={<Profile currUser={currUser}></Profile>}
      ></Route>
      <Route path="chats" element={<ChatSidebar></ChatSidebar>}></Route>
    </Routes>
  );
}

export default App;
