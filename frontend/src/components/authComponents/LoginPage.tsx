import { LoginForm } from "./LoginForm";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { setAuthenticated, checkAuth } = useAuth();

  async function handleLoginSubmit(formData: any) {
    try {
      const dbUser = await authService.login(formData);
      alert("Your login was successful");
      setAuthenticated(true);
      await checkAuth();
      navigate("/profile", { replace: true, state: { profileData: dbUser } });
    } catch (err: any) {
      console.error("Authentication error:", err);
      alert(err.message);
    }
  }
  return <LoginForm onLogin={handleLoginSubmit}></LoginForm>;
}
