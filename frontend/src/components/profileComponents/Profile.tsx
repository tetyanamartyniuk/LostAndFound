import { useEffect, useState } from "react";
import type { User, userPayload } from "../../types/User";
import { userService } from "../../services/userService";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Profile.module.css";

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
    <div className={styles.profilePage}>
      {authenticated && (
        <div className={styles.profileCard}>
          <h1 className={styles.greeting}>Hello, {user?.username} 👋</h1>

          <div className={styles.linksContainer}>
            {currUser?.role === "user" && (
              <>
                <Link to="/items" className={styles.profileLink}>
                  Lost&Found things
                </Link>

                <Link to="/chats" className={styles.profileLink}>
                  My chats
                </Link>

                <Link
                  to="/items/new"
                  className={`${styles.profileLink} ${styles.accentLink}`}
                >
                  Found or lost something?
                </Link>
              </>
            )}
            {currUser?.role === "admin" && (
              <Link
                to="/admin"
                className={`${styles.profileLink} ${styles.adminLink}`}
              >
                Administration panel
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
