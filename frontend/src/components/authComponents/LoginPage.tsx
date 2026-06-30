import { LoginForm } from "./LoginForm";

export function LoginPage() {
  async function handleLoginSubmit(formData: any) {
    try {
      const response = await fetch("/api/auth/login", {
        //фетчимо запит на бек
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), //передаємо в тіло запиту дані з форми
      });
      const result = await response.json(); //перекидаємо в джсон
      if (!response.ok) {
        throw new Error(result.message || "Помилка авторизації");
      }
      alert("Чудово! Ви успішно зареєструвались");
    } catch (err: any) {
      console.error("Помилка при реєстрації:", err);
      alert(err.message);
    }
  }
  return <LoginForm onLogin={handleLoginSubmit}></LoginForm>;
}
