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
    <form onSubmit={handleSubmitForm}>
      <label>
        <input
          className={styles.input}
          type="text"
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
