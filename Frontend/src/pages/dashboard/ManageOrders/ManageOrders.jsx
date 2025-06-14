// src/pages/dashboard/manageOrders/ManageOrders.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';
import OrderReportButton from './OrderReportButton';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch orders from backend
  const fetchOrders = () => {
    axios
      .get(`${getBaseUrl()}/api/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  };

  // Update order status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `${getBaseUrl()}/api/orders/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchOrders(); // Refresh orders
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading orders...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-lime-700 border-b-2 border-lime-400 pb-1">Manage Orders</h2>
        <OrderReportButton />
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">No orders found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-100 text-lime-700 font-semibold">
              <tr>
                
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  
                  <td className="px-4 py-2">{order.name}</td>
                  <td className="px-4 py-2">{order.phone}</td>
                  <td className="px-4 py-2">Rs.{order.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-2 font-semibold text-gray-700">{order.status}</td>
                  <td className="px-4 py-2 space-x-2 text-center">
                    <button
                      onClick={() => updateStatus(order._id, 'Shipped')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Ship
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, 'Delivered')}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Deliver
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, 'Rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => openModal(order)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for order details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
            <h3 className="text-lg font-bold text-lime-700 mb-4">Order Details</h3>
            <div className="space-y-2 text-sm text-gray-800">
              <p><strong>Name:</strong> {selectedOrder.name}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Total Price:</strong> Rs.{selectedOrder.totalPrice.toFixed(2)}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              {selectedOrder.products?.length > 0 && (
                <div>
                  <p className="font-semibold mt-2">Products:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedOrder.products.map((item, idx) => (
                      <li key={idx}>
                        {item.productName} - {item.quantity} {item.unit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={closeModal}
                className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-1 rounded-md text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
