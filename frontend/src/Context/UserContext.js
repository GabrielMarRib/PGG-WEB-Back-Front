import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('User');
    console.log("LocalStorage: " + savedUser);
    if (savedUser) {
      console.log("Setting User from LocalStorage...");
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false); 
  }, []);

  return (
    <UserContext.Provider value={{ User, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
