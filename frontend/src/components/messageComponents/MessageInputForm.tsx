import { useState } from "react";
import styles from "./messageInputForm.module.css";

interface MessageInputFormProps {
  onSend: (text: string) => void;
}

export function MessageInputForm({ onSend }: MessageInputFormProps) {
  const [text, setText] = useState<string>("");

  const isValid = text.trim() !== "";

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Current message: ", text);

    if (!isValid) return;
    onSend(text);
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <label className={styles.inputLabel}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button disabled={!isValid} className={styles.button}>
        Send
      </button>
    </form>
  );
}
