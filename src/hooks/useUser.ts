import { useState, useEffect } from "react";

export function useUser() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Load username from localStorage on mount
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const login = (newUsername: string) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername(null);
  };

  return { username, login, logout };
}
