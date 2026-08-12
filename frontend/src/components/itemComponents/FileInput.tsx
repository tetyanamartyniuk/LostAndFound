import { useState, type ChangeEvent } from "react";
import styles from "./FileInput.module.css";

export function FileInput() {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const names = Array.from(uploadedFiles).map((file) => file.name);
      setFileNames(names);
    } else {
      setFileNames([]);
    }
  };

  let displayText = "File is not chosen";
  if (fileNames.length === 1) {
    displayText = fileNames[0];
  } else if (fileNames.length > 1) {
    displayText = `Files chosen: ${fileNames.length}`;
  }

  return (
    <div className={styles.container}>
      <label className={styles.fileLabel}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />
        <span className={styles.customBtn}>Choose files</span>

        <span className={styles.fileNameText}>{displayText}</span>
      </label>
    </div>
  );
}
