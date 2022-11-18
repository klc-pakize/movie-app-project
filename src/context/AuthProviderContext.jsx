import React, { createContext, useEffect, useState } from "react";
import { userObserver } from "../auth/firebase";
export const AuthContext = createContext();
const AuthProviderContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviderContext;
