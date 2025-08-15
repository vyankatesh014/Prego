import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY; // Currency state to manage the currency symbol

  const navigate = useNavigate();
  const [user, setUser] = useState(null); // User state to manage authentication
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]); // State to manage products
  const [cartItems, setCartItems] = useState({}); // State to manage cart items

  const fetchProducts = async () => {
    setProducts(dummyProducts); // Fetch products from the dummy data
  };

  // Function to add items to the cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId].quantity += 1; // Increment quantity if item already exists
    } else {
      cartData[itemId] = { quantity: 1 }; // Add new item with quantity 1
    }

    setCartItems(cartData); // Update cart items state
    toast.success("Item added to cart successfully");
  };

  // Function to update the quantity of an item in the cart
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId].quantity = quantity; // Update to given quantity
      if (quantity <= 0) {
        delete cartData[itemId]; // Remove item if quantity is 0 or less
      }
    }
    setCartItems(cartData);
    toast.success("Cart item quantity updated successfully");
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId].quantity -= 1; // Decrement quantity if item exists
      if (cartData[itemId].quantity === 0) {
        delete cartData[itemId]; // Remove item if quantity is zero
      }
    }
    toast.success("Item removed from cart successfully");
    setCartItems(cartData); // Update cart items state
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
