import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  // 🔥 Include user from context
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-start w-max mb-8'>
        <p className='text-2xl font-medium uppercase text-blue-600 bg-blue-100 px-2 py-1 rounded-sm'>MY ORDERS</p>
        <div className='w-16 h-0.5 bg-primary rounded-full mt-2'></div>
      </div>

      {/* Orders List */}
      {myOrders.map((order, index) => (
        <div
          key={index}
          className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-5xl w-full'
        >
          <div className='flex justify-between text-gray-500 text-sm mb-4'>
            <span>OrderId : {order._id}</span>
            <span>Payment : {order.paymentType}</span>
            <span>Total Amount : {currency}{order.amount}</span>
          </div>

          {order.items?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row justify-between items-start md:items-center bg-white border-t border-gray-200 py-4 px-2 ${
                order.items.length !== index + 1 ? 'border-b' : ''
              }`}
            >
              <div className='flex items-center gap-4 w-full md:w-1/3 mb-4 md:mb-0'>
                <img
                  src={item.product?.image?.[0]}
                  alt={item.product?.name}
                  className='w-16 h-16 object-cover bg-primary/10 rounded-lg'
                />
                <div>
                  <p className='text-lg font-medium text-gray-800'>{item.product?.name}</p>
                  <p className='text-sm text-gray-500'>Category: {item.product?.category}</p>
                </div>
              </div>

              <div className='w-full md:w-1/3 text-sm text-gray-700 space-y-1'>
                <p>Quantity: {item.quantity || '1'}</p>
                <p>Status: {order.status}</p>
                <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>

              <div className='w-full md:w-1/3 text-right md:text-left'>
                <p className='text-green-600 font-semibold text-md'>
                  Amount: {currency}{item.product?.offerPrice * item.quantity || 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
