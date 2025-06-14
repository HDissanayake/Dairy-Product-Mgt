import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import RevenueChart from './RevenueChart';
import {
  Package,
  ShoppingCart,
  Clock,
  Flame,
  Coins
} from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {/* Summary Cards */}
      <section className="grid md:grid-cols-3 gap-6 mb-8">
        {/* ✅ Total Products - First */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <Package className="text-blue-500 w-10 h-10" />
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Total Products</h2>
            <p className="text-2xl font-bold text-gray-800">{data.totalProducts ?? 0}</p>
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <ShoppingCart className="text-purple-500 w-10 h-10" />
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Total Sales</h2>
            <p className="text-2xl font-bold text-gray-800">{data.totalSales ?? 0}</p>
          </div>
        </div>

        {/* Trending Products */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <Flame className="text-red-500 w-10 h-10" />
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Trending Products in This Month</h2>
            <p className="text-2xl font-bold text-gray-800">{data?.trendingProducts}</p>
          </div>
        </div>

        
      </section>

      {/* Graphs & Charts */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100 text-gray-700">
            Orders Per Month
          </div>
          <div className="p-4 flex-grow">
            <RevenueChart />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
