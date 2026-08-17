import { useEffect, useState } from "react";
import type { User } from "../../types/User";
import { userService } from "../../services/userService";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Profile.module.css";
import { useLocation } from "react-router-dom";

export function Profile() {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.profileData || null);
  const { currUser, authenticated } = useAuth();
  const [loading, setLoading] = useState(!user);
  useEffect(() => {
    if (user) return;
    const fetchUser = async () => {
      if (!currUser?.id) return;

      try {
        setLoading(true);
        const user = await userService.getUserById(currUser?.id);
        console.log("user: ", user);
        setUser(user);
      } catch (err) {
        console.error(err);
        alert("Something went wrong" + err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user, currUser?.id]);

  if (loading) return <div>Profile loading...</div>;
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
              <>
                {" "}
                <Link to="/chats" className={styles.profileLink}>
                  My chats
                </Link>
                <Link
                  to="/admin"
                  className={`${styles.profileLink} ${styles.adminLink}`}
                >
                  Administration panel
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
