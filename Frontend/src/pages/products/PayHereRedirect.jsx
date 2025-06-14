// src/pages/products/PayHereRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PayHereRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const order_id = urlParams.get("order_id");
      const status = urlParams.get("status");

      if (status === "success" && order_id) {
        // Confirm order creation
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/payhere/confirm/${order_id}`);
        navigate('/orders');
      } else {
        navigate('/checkout');
      }
    };

    handleRedirect();
  }, [navigate]);

  return <div className="text-center mt-20">Verifying Payment...</div>;
};

export default PayHereRedirect;
