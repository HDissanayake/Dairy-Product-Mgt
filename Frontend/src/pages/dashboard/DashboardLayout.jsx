import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  MdDashboard,
  MdAddBox,
  MdViewList,
  MdAssignment,
  MdMessage,
  MdLogout,
  MdEdit,
} from 'react-icons/md';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <section className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden sm:flex sm:flex-col bg-gray-800 text-white w-64">
        {/* Header */}
        <div
          className="bg-green-500 text-white text-center py-6 font-bold text-xl cursor-pointer hover:bg-green-600 transition"
          onClick={() => navigate('/')}
        >
          DairyPro
        </div>

        {/* Navigation */}
        <div className="flex flex-col justify-between h-full px-4 pb-6">
          <nav className="mt-6 space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              <MdDashboard size={20} /> Dashboard
            </Link>

            <Link
              to="/dashboard/add-new-product"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              <MdAddBox size={20} /> Add New Product
            </Link>

            <Link
              to="/dashboard/manage-products"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              <MdViewList size={20} /> Manage Products
            </Link>

            <Link
              to="/dashboard/manage-orders"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              <MdAssignment size={20} /> Manage Orders
            </Link>

            <Link
              to="/dashboard/view-messages"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              <MdMessage size={20} /> View Messages
            </Link>
          </nav>

          {/* Logout */}
          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition"
            >
              <MdLogout size={20} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Header */}
        <header className="flex items-center justify-end px-6 py-4 bg-white shadow">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              title="Logout"
              className="text-red-600 hover:text-red-800 transition"
            >
              <MdLogout className="h-6 w-6" />
            </button>
            <div className="hidden md:block text-right">
              <div className="font-semibold text-gray-800">Admin</div>
              <div className="text-sm text-gray-500">Dairy Manager</div>
            </div>
            <img
             src="https://randomuser.me/api/portraits/women/45.jpg"
             alt="Admin"
            className="h-12 w-12 rounded-full border-2 border-green-500 object-cover"
/>

          </div>
        </header>

        {/* Main Body */}
        <main className="p-6 sm:p-10">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-500">Welcome to Dairy Product Management</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                to="/dashboard/manage-products"
                className="inline-flex items-center px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-100"
              >
                <MdEdit className="mr-2" /> Manage
              </Link>
              <Link
                to="/dashboard/add-new-product"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + Add Product
              </Link>
            </div>
          </div>

          {/* Nested routes render here */}
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
