import React from 'react';
import getBaseUrl from '../../../utils/baseURL';

const OrderReportButton = () => {
  const handleDownload = async () => {
    try {
      const res = await fetch(`${getBaseUrl()}/api/reports/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to download report');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "order_report.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded shadow text-sm transition duration-200"
    >
      📄 Download Report
    </button>
  );
};

export default OrderReportButton;
