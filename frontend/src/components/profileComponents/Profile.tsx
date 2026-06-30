import { useEffect, useState } from "react";
import type { User, userPayload } from "../../types/User";
import { userService } from "../../services/userService";
import { Link } from "react-router-dom";

export interface ProfileProps {
  currUser: userPayload | null;
}

export function Profile({ currUser }: ProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(false);
  useEffect(() => {
    const fetchUser = async () => {
      if (currUser) {
        try {
          const user = await userService.getUserById(currUser?.id);
          setUser(user);
          setAuthorized(true);
        } catch (err) {
          console.error(err);
          alert("Ooops smth went wrong" + err);
        }
      }
    };
    fetchUser();
  }, [currUser?.id]);

  return (
    <div>
      {authorized ? (
        <>
          <h1>Hello, {user?.username}</h1>
          <br></br>
          <Link to="/">Знайдені та загублені речі</Link>
          <br></br>
          <Link to="/chats">Мої чати</Link>
        </>
      ) : (
        <>
          <h1>Бюро знахідок</h1>
          <h4>Не маєте акаунту?</h4>
          <Link to="/auth/LoginPage">Увійти</Link>
          <Link to="/auth/registerPage">Зареєструватись</Link>
        </>
      )}
    </div>
  );
}
