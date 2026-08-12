import { LoginForm } from "./LoginForm";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  async function handleLoginSubmit(formData: any) {
    try {
      await authService.login(formData);
      alert("Your login was successful");
      navigate("/profile");
    } catch (err: any) {
      console.error("Authentication error:", err);
      alert(err.message);
    }
  }
  return <LoginForm onLogin={handleLoginSubmit}></LoginForm>;
}
