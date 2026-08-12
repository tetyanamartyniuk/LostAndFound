import styles from "./MainPage.module.css";
// import styles from "../assets/mainPageBox.png";
import boxImage from "../assets/boxImage.png";
import { Link } from "react-router-dom";
export function MainPage() {
  return (
    <>
      <div className={styles.imgContainer}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>Lost something important?</h1>
          <div className={styles.pText}>
            <p>We help reunite lost items with their owners.</p>
            <p>Search or report a lost or found item.</p>
          </div>
          <div className={styles.buttons}>
            <Link to="/items" className={styles.foundItemsBtn}>
              Found items
            </Link>
            <Link to="items/new" className={styles.reportItemBtn}>
              Report an item
            </Link>
          </div>
        </div>

        <img src={boxImage} alt="Зображення" className={styles.boxImg}></img>
      </div>
    </>
  );
}
