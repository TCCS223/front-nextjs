'use client'

import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Função para carregar o valor inicial do localStorage
    const loadUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser?.id || null);
      }
    };

    // Carregar o valor inicial do localStorage
    loadUserFromLocalStorage();

    // Listener para monitorar as mudanças no localStorage
    const handleStorageChange = (event) => {
      if (event.key === 'user') {
        loadUserFromLocalStorage(); // Recarrega o valor do localStorage
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpeza do listener quando o componente desmontar
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}