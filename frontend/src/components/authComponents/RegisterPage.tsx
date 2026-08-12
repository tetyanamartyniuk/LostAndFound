import { RegisterForm } from "./RegisterForm";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const navigate = useNavigate();
  const handleRegisterSubmit = async (formData: any) => {
    try {
      await authService.register(formData);
      alert("Your account was successfully created.");
      navigate("/auth/loginPage");
    } catch (err: any) {
      console.error("Registration error:", err);
      alert(err.message);
    }
  };
  return <RegisterForm onRegister={handleRegisterSubmit}></RegisterForm>;
}
