import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { userPayload } from "../types/User";

type AuthContextType = {
  currUser: userPayload | null;
  authenticated: boolean;
  setCurrUser: (user: userPayload | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currUser, setCurrUser] = useState<userPayload | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchCurrUser = async () => {
      try {
        const response = await fetch("/api/auth/currUser");
        if (!response.ok) {
          throw new Error("Помилка авторизації");
        }
        const data = await response.json();

        if (!data) {
          setCurrUser(null);
          setAuthenticated(false);
        } else {
          setCurrUser(data);
          setAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurrUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currUser, authenticated, setCurrUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside of AuthProvider");
  }
  return context;
};
