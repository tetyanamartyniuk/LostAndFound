import styles from "./FilterByPlace.module.css";
export function FilterByPlace() {
  return (
    <div className={styles.placeInputContainer}>
      <label>
        <input type="text" name="place" placeholder="City"></input>
      </label>
    </div>
  );
}
