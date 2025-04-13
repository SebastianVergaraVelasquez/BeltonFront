import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Por ahora para simular los datos de inicio de sesión
    if (email === "admin@admin" && password === "admin") {
      setUser({ name: "Admin", email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
