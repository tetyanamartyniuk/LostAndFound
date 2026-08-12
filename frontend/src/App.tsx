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
import { MainLayout } from "./components/layoutComponents.tsx/MainLayout";
import { MainPage } from "./components/MainPage";
import { AuthProvider } from "./context/AuthContext";
import { CategoriesProvider } from "./context/CategoriesContext";

function App() {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <div>
          <Routes>
            <Route element={<MainLayout></MainLayout>}>
              <Route path="/" element={<MainPage></MainPage>}></Route>
              <Route path="items" element={<ItemList />}></Route>
              <Route path="items/new" element={<CreateItemPage />}></Route>

              <Route path="items/:id" element={<ItemExtendedCard />}></Route>
              <Route path="auth/register" element={<RegisterPage />}></Route>
              <Route path="auth/login" element={<LoginPage />}></Route>
              <Route
                path="chats/item/:itemId"
                element={<ChatLayout></ChatLayout>}
              ></Route>
              <Route path="profile" element={<Profile></Profile>}></Route>
              <Route path="chats" element={<ChatSidebar></ChatSidebar>}></Route>
            </Route>

            <Route path="admin" element={<AdminPanel />}></Route>
          </Routes>
        </div>
      </CategoriesProvider>
    </AuthProvider>
  );
}

export default App;
