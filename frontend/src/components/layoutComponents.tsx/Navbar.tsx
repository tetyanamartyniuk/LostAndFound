import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context/AuthContext";

export function Navbar() {
  const { authenticated } = useAuth();

  return (
    <header className={styles.header}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.active : styles.notActive
        }
      >
        🏠 Lost and Found
      </NavLink>
      <nav className={styles.navbar}>
        <NavLink
          to={"/items/new"}
          className={({ isActive }) =>
            `${styles.reportBtn} ${isActive ? styles.active : styles.notActive}`
          }
        >
          Report an item
        </NavLink>

        <NavLink
          to="/items"
          className={({ isActive }) =>
            isActive ? styles.active : styles.notActive
          }
        >
          All items
        </NavLink>
        {!authenticated ? (
          <div className={styles.authBtns}>
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `${styles.loginBtn} ${isActive ? styles.active : styles.notActive}`
              }
            >
              Login
            </NavLink>
            <span>|</span>
            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                isActive ? styles.active : styles.notActive
              }
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div className={styles.profileBtn}>
            <NavLink to="profile">👤Your profile</NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}
