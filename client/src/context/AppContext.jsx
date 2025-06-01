// context/AppContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

 import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";


axios.defaults.withCredentials = true; // ✅ typo fixed: `axios.defaults.withCredentials` instead of `axios.defaults.withCredentials`
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; // ✅ typo fixed: `import.meta.VITE_BASE_URL` instead of `import.meta.VITE_BASE_URL`

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency=import.meta.env.VITE_CURRENCY; // ✅ typo fixed: `import.meta.VITE_CURRENCY` instead of `import.meta.VITE_CURRENCY`

  const [user, setUser] = useState(null);       // ✅ typo fixed: `userState` → `useState`
  const [isSeller, setIsSeller] = useState(false); // ✅ typo fixed: same as above
  const [showUserLogin, setShowUserLogin] = useState(false); // ✅ typo fixed: `showUserLogin` added
  const [products,setProducts] = useState([]); // ✅ typo fixed: `products` added
  const [cartItems, setCartItems] = useState({}); // ✅ typo fixed: `cartItems` added
  const [searchQuery,setSearchQuery] = useState(""); // ✅ typo fixed: `searchQuery` added
const   navigate = useNavigate(); // ✅ typo fixed: `useNavigate` instead of `useNavigate()`
//fetch seller statsu
const fetchSeller=async ()=>{
  try {
    const {data}=await axios.get('/api/seller/is-auth');
    if(data.success){
      setIsSeller(true);

  }else{
      setIsSeller(false);
    }
  }
   catch (error) {
    setIsSeller(false);
  }
}

//fetch User Auth Status ,  User Data and Cart Items

const fetchUser=async () => {
  try {
    const {data}= await axios.get('/api/user/auth');
    if(data.success){
      setUser(data.user);
      setCartItems(data.user.cartItems);
    
      
      }
    } catch (error) {
      setUser(null);
    }
  };



  //fetch all products
  const fetchProducts = async () => {
 try {
  const {data} =await axios.get('/api/product/list')
  if(data.success){
    setProducts(data.products);
  }else{
    toast.error(data.message);
  }
  }
 
 catch (error) {
  toast.error(error.message);
 }
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
    fetchUser()
    fetchSeller()
    fetchProducts()
  } ,[])


  const value = { navigate, user, setUser, isSeller,
     setIsSeller, showUserLogin, setShowUserLogin,products,currency,addToCart,
    updateCartItem ,removeFromCart,cartItems,searchQuery,setSearchQuery,
  getCartAmount,getCartCount,axios,fetchProducts
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



