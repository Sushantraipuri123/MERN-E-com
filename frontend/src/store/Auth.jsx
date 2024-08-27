import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      console.log("Cart before removing:", prevCart);  // Debugging statement
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      console.log("Updated cart:", updatedCart);  // Debugging statement
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    
  };
  
  

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <AuthContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity }}>
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
