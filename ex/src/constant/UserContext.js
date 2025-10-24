import React, { createContext, useState } from 'react';
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState(storedUser);

  const loginUser = (username) => {
    const newUser = { username };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
