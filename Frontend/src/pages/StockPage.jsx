import React from 'react';
import { PackageOpen, RefreshCw, Trash2 } from 'lucide-react'; // lucide-react icons

const stockItems = [
  {
    id: 1,
    name: 'Full Cream Milk',
    category: 'Milk Product',
    quantity: 120,
    lastUpdated: '2025-04-08',
  },
  {
    id: 2,
    name: 'Cheese Blocks',
    category: 'Dairy Product',
    quantity: 60,
    lastUpdated: '2025-04-06',
  },
  {
    id: 3,
    name: 'Butter 500g',
    category: 'Butter',
    quantity: 10,
    lastUpdated: '2025-04-07',
  },
];

const getStockStatus = (quantity) => {
  if (quantity < 20) return 'Low Stock';
  if (quantity < 100) return 'Moderate';
  return 'In Stock';
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Low Stock':
      return 'bg-red-100 text-red-600';
    case 'Moderate':
      return 'bg-yellow-100 text-yellow-600';
    case 'In Stock':
    default:
      return 'bg-green-100 text-green-600';
  }
};

const StockPage = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">📦 Stock Management </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stockItems.map((item) => {
          const status = getStockStatus(item.quantity);
          const statusColor = getStatusColor(status);

          return (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-indigo-700">{item.name}</h2>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}>
                  {status}
                </span>
              </div>

              <div className="mb-4 text-sm text-gray-600 space-y-1">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Stock:</strong> {item.quantity} units</p>
                <p><strong>Last Updated:</strong> {item.lastUpdated}</p>
              </div>

              <div className="flex justify-between pt-3 border-t">
                <button className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition">
                  <RefreshCw className="w-4 h-4" /> Restock
                </button>
                <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockPage;
