import { RegisterForm } from "./RegisterForm";

export function RegisterPage() {
  const handleRegisterSubmit = async (formData: any) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error(result.message || "Помилка реєстрації");
      }
      alert("Чудово! Акаунт успішно створено.");
    } catch (err: any) {
      console.error("Помилка при реєстрації:", err);
      alert(err.message);
    }
  };
  return <RegisterForm onRegister={handleRegisterSubmit}></RegisterForm>;
}
