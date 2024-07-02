import { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:4000/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const user = await response.json();
            console.log('User retrieved from backend:', user);
            setCurrentUser(user); // Assuming user object includes firstName and lastName
          } else {
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
        setCurrentUser(null);
      }
    };
    getLoggedInUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </CurrentUser.Provider>
  );
}

export { CurrentUserProvider };




