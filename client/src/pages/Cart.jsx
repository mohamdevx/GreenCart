import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,setCartItems
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // Build cart items from product list and cart item keys
  const getCart = () => {
    const tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArray);
  };

  // ✅ FIXED: Function properly closed
  const getUserAddress = async () => {
    try {
      const { data } = await axios.get('/api/address/get');
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
  
      // Place order with COD
      if (paymentOption === "COD") {
        const { data } = await axios.post('/api/order/cod', {
          userId: user._id,
          items: cartArray.map(item => ({
            product: item._id, // ✅ fixed typo: 'proudct' ➝ 'product'
            quantity: item.quantity
          })),
          address: selectedAddress._id
        });
  
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate('/my-orders');
        } else {
          toast.error(data.message);
        }
    }else{
      //place order iwth strpe
      const {data} = await axios.post('/api/order/stripe', {
        userId: user._id,
        items: cartArray.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        address: selectedAddress._id
      });
      if (data.success) {
        window.location.replace(data.url);
      } else {
        toast.error(data.message);
      }
    }
    } catch (error) {
      toast.error(error.message);
    }
  };
  


  useEffect(() => {
    if (products.length && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  const cartAmount = getCartAmount();
  const tax = +(cartAmount * 0.02).toFixed(2);
  const totalAmount = +(cartAmount + tax).toFixed(2);

  if (!products.length || !cartItems) return null;

  if (!cartArray.length) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dull"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-16 md:flex-row md:items-start gap-10">
      {/* Left: Cart Items */}
      <div className="flex-1 max-w-4xl w-full">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">({getCartCount()})</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  scrollTo(0, 0);
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img src={product.image} alt={product.name} className="h-full" />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Weight: <span>{product.weight || "N/A"}</span></p>
                  <div className="flex items-center gap-1">
                    <p>Qty:</p>
                    <select
                      className="outline-none border px-1"
                      value={cartItems[product._id]}
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                    >
                      {Array.from({ length: Math.max(cartItems[product._id], 9) }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center my-8 gap-2 text-primary font-medium"
        >
          <img
            className="group-hover:-translate-x-1 transition"
            src={assets.arrow_right_icon_colored}
            alt="arrow"
          />
          Continue Shopping
        </button>
      </div>

      {/* Right: Order Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Address */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500 text-sm w-[75%]">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 left-0 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        {/* Price Summary */}
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>{currency}{cartAmount}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{tax}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>{currency}{totalAmount}</span>
          </p>
        </div>

        <button
          onClick={() => {
            if (paymentOption === "COD") {
              alert("Order placed with Cash on Delivery!");
            } else {
              navigate("/checkout");
            }
          }}
          className="w-full py-3 mt-6 bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
