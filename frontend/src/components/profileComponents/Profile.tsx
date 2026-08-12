import { useEffect, useState } from "react";
import type { User, userPayload } from "../../types/User";
import { userService } from "../../services/userService";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const { currUser, authenticated } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (currUser?.id) {
        try {
          const user = await userService.getUserById(currUser?.id);
          setUser(user);
        } catch (err) {
          console.error(err);
          alert("Something went wrong" + err);
        }
      }
    };
    fetchUser();
  }, [currUser?.id]);

  return (
    <div>
      {authenticated ? (
        <>
          <h1>Hello, {user?.username}</h1>
          <br></br>
          <Link to="/">Lost&Found things</Link>
          <br></br>
          <Link to="/chats">My chats</Link>
          <Link to="/createItemPage">Found or lost something?</Link>
          {currUser?.role === "admin" && (
            <Link to="/admin">Administration panel</Link>
          )}
        </>
      ) : (
        <>
          <h1>Lost&Found</h1>
          <h4>Don`t have an account yet?</h4>
          <Link to="/auth/LoginPage">Login</Link>
          <Link to="/auth/registerPage">Register</Link>
        </>
      )}
    </div>
  );
}
