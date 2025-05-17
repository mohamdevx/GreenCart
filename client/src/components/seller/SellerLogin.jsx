import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const SellerLogin = () => {
  const { isSeller, setIsSeller } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSeller(true);
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller/");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <>
        <form
          onSubmit={onSubmitHandler}
          className="min-h-screen flex items-center justify-center bg-gray-50 text-sm text-gray-600"
        >
          <div className="flex flex-col gap-5 bg-white p-8 py-12 w-full max-w-md rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-3xl font-semibold text-center">
              <span className="text-primary">Seller</span> Login
            </h2>

            <div className="w-full">
              <label htmlFor="email" className="block text-sm mb-1">
                Email Address
              </label>
              <input
              onChange={(e) => setEmail(e.target.value)} value={email}
                type="email"
                id="email"
                placeholder="e.g. seller@example.com"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="password" className="block text-sm mb-1">
                Password
              </label>
              <input
              onChange={(e) => setPassword(e.target.value)} value={password}
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md hover:bg-opacity-90 transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </>
    )
  );
};

export default SellerLogin;
