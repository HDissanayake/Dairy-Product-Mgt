// src/components/RevenueChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  // Example revenue data per month
  const revenueData = [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];

  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Revenue (LKR)',
        data: revenueData,
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
        font: {
          size: 18
        }
      },
    },
    scales: {
  y: {
    beginAtZero: true,
    ticks: {
      callback: function (value) {
        return new Intl.NumberFormat('en-LK', {
          style: 'currency',
          currency: 'LKR',
          minimumFractionDigits: 0
        }).format(value);
      }
    }
  }
}

  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Revenue Overview</h2>
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
