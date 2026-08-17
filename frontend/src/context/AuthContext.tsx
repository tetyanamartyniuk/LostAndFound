import { createContext, useContext, useState, type ReactNode } from "react";
import type { userPayload } from "../types/User";
import { authService } from "../services/authService";

type AuthContextType = {
  currUser: userPayload | null;
  authenticated: boolean;
  setCurrUser: (user: userPayload | null) => void;
  loading: boolean;
  setAuthenticated: (auth: boolean) => void;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currUser, setCurrUser] = useState<userPayload | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const currUserData = await authService.getCurrUser();
      if (!currUserData) {
        setCurrUser(null);
        setAuthenticated(false);
      } else {
        setCurrUser(currUserData);
        setAuthenticated(true);
        console.log("currUser authContext: ", currUserData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currUser,
        authenticated,
        setCurrUser,
        loading,
        checkAuth,
        setAuthenticated,
      }}
    >
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
