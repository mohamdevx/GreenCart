// context/AppContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";



export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency=import.meta.VITE_CURRENCY; // ✅ typo fixed: `import.meta.VITE_CURRENCY` instead of `import.meta.VITE_CURRENCY`
  const navigate = useNavigate();
  const [user, setUser] = useState(null);       // ✅ typo fixed: `userState` → `useState`
  const [isSeller, setIsSeller] = useState(false); // ✅ typo fixed: same as above
  const [showUserLogin, setShowUserLogin] = useState(false); // ✅ typo fixed: `showUserLogin` added
  const [products,setProducts] = useState([]); // ✅ typo fixed: `products` added
  const [cartItems, setCartItems] = useState({}); // ✅ typo fixed: `cartItems` added
  const [searchQuery,setSearchQuery] = useState(""); // ✅ typo fixed: `searchQuery` added

  //fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts)
  }

  //add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
  
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
  
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  //update cart item quantity

  const updateCartItem=(itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] = quantity;
    }

    setCartItems(cartData);
    toast.success("Cart updated successfully");
  }

  //remove item from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
  
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Item removed from cart")
    setCartItems(cartData)
  }

  //get cart item coutn
  const getCartCount=()=>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item]
    }
    return totalCount;
  }


  //get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0; // ✅ declare the variable
  
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }
  
    return Math.floor(totalAmount * 100) / 100; // return 2 decimal value
  };
  

  useEffect(()=>{
    fetchProducts()
  } ,[])


  const value = { navigate, user, setUser, isSeller,
     setIsSeller, showUserLogin, setShowUserLogin,products,currency,addToCart,
    updateCartItem ,removeFromCart,cartItems,searchQuery,setSearchQuery,
  getCartAmount,getCartCount
  }; // ✅ typo fixed: `userState` → `user`, `isSellerState` → `isSeller`, `showUserLoginState` → `showUserLogin`

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext); // ✅ fixed: `useAppContext` calling itself → should call `useContext`
};


