import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || ""); // geting token from localStorage
  const [user, setUser] = useState(null); // Store the user object

  // setting the token in localStorage
  const storeTokenInLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };
  // checking weather the user is loged in or n ot
  const isLoggedin = !!token;

  // removing the token when the user logs out
  const LogoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null); // Clear user data on logout
  };

  // getting user information
  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setUser(null); // Ensure user data is cleared if no token
    }
  }, [token]);

  const userAuthentication = async () => {
    try {
      const response = await fetch(`http://localhost:9001/users/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to authenticate user");
      } 

      const userData = await response.json();
      console.log("User data:", userData);
      setUser(userData); // Store the user data (including ID)
    } catch (error) {
      console.log("Error fetching user data:", error);
      setUser(null); // Clear user data if there’s an error
    }
  };

  return (
    <AuthContext.Provider
      value={{ storeTokenInLocalStorage, isLoggedin, LogoutUser, user  }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
