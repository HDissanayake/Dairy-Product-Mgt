import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaTag,
} from 'react-icons/fa';

const OrderPage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div className="text-center text-red-600">Please log in to view your orders.</div>;
  }

  // Added pollingInterval to auto-refresh orders every 5 seconds
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email, {
    pollingInterval: 5000, // fetch updated data every 5 seconds
  });

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (isError) return <div className="text-center text-red-600">Error getting orders data.</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-lime-700 mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-gray-500">No orders found!</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border shadow-md rounded-xl p-6 hover:shadow-lg transition">
              {/* Payment Method Status Badge */}
              <p className={`text-sm text-white px-3 py-1 rounded-full inline-block mb-2 ${
                order.paymentMethod === 'online' ? 'bg-blue-600' : 'bg-yellow-500'
              }`}>
                {order.paymentMethod === 'online' ? 'Paid - Online' : 'Status - COD'}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                <FaBoxOpen className="inline mr-2 text-lime-700" />
                Order ID: {order._id}
              </h3>

              <p className="text-gray-600">
                <FaTag className="inline mr-2 text-gray-500" />
                Name: <span className="font-medium">{order.name}</span>
              </p>

              <p className="text-gray-600">
                <FaEnvelope className="inline mr-2 text-gray-500" />
                Email: <span className="font-medium">{order.email}</span>
              </p>

              <p className="text-gray-600">
                <FaPhoneAlt className="inline mr-2 text-gray-500" />
                Phone: <span className="font-medium">{order.phone}</span>
              </p>

              <p className="text-gray-700 font-semibold mt-3">
                Total Price: Rs.{order.totalPrice}
              </p>

              <p className="text-sm mt-2">
                <span className="font-semibold text-gray-700">Order Status:</span>{' '}
                <span className="text-gray-800">{order.status}</span>
              </p>

              <div className="mt-3">
                <h4 className="font-semibold text-gray-700 flex items-center mb-1">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />
                  Shipping Address
                </h4>
                <p className="text-gray-600">
                  {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                </p>
              </div>

              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
