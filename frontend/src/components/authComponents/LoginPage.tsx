import { LoginForm } from "./LoginForm";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  async function handleLoginSubmit(formData: any) {
    try {
      await authService.login(formData);
      alert("Your login was successful");
      setAuthenticated(true);
      navigate("/profile");
    } catch (err: any) {
      console.error("Authentication error:", err);
      alert(err.message);
    }
  }
  return <LoginForm onLogin={handleLoginSubmit}></LoginForm>;
}
