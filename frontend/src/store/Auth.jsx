import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || ""); // getting token from localStorage
  const [user, setUser] = useState(null); // Store the user object
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []); // Store the cart in localStorage

  // setting the token in localStorage
  const storeTokenInLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  // setting the cart in localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    try {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      console.log("Cart updated in local storage:", updatedCart);
    } catch (error) {
      console.error("Failed to update cart in local storage", error);
    }
  };

  // Add item to cart
  const addToCart = (cartItem) => {
    // Retrieve existing cart from local storage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    console.log("Existing Cart:", existingCart);
    console.log("New Cart Item:", cartItem);
  
    // Check if the item with the same ID and size already exists in the cart
    const itemExists = existingCart.some(
      (item) => item.id === cartItem.id && item.size === cartItem.size
    );
  
    console.log("Item exists:", itemExists);
  
    if (itemExists) {
      // If the item exists, show an alert
      alert("This item is already in the saved");
    } else {
      // If the item doesn't exist, add the new item to the cart
      const updatedCart = [...existingCart, cartItem];
      updateCartInLocalStorage(updatedCart);
      alert("One item saved");
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    updateCartInLocalStorage(updatedCart);
  };

  // Clear the cart
  const clearCart = () => {
    updateCartInLocalStorage([]);
  };

  // checking whether the user is logged in or not
  const isLoggedin = !!token;

  // removing the token when the user logs out
  const LogoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart"); // Clear cart from localStorage on logout
    setToken("");
    setUser(null); // Clear user data on logout
    setCart([]); // Clear cart data on logout
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
      value={{
        storeTokenInLocalStorage,
        isLoggedin,
        LogoutUser,
        user,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
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
