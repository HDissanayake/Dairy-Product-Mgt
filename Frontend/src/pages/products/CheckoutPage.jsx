import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import Swal from 'sweetalert2';
import { FaUser, FaShoppingCart } from 'react-icons/fa';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const totalPrice = cartItems
    .reduce((acc, item) => acc + (item.newPrice || 0) * (item.quantity || 1), 0)
    .toFixed(2);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [isChecked, setIsChecked] = useState(false);
  const paymentMethod = watch('paymentMethod');

  const processPayment = (cardData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cardData.cardNumber.length === 16) {
          resolve("Payment Successful");
        } else {
          reject("Invalid card details");
        }
      }, 1500);
    });
  };

  const onSubmit = async (data) => {
    if (!isChecked) {
      alert("Please agree to the Terms & Conditions before placing the order.");
      return;
    }

    const newOrder = {
      name: data.name,
      email: currentUser?.email || data.email || "",
      phone: data.phone,
      address: {
        street: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode
      },
      paymentMethod: data.paymentMethod,
      productIds: cartItems.map(item => item._id),
      totalPrice: parseFloat(totalPrice),
      cartItems
    };

    try {
      if (data.paymentMethod === 'Online') {
        const cardData = {
          cardNumber: data.cardNumber,
          expiry: data.expiry,
          cvv: data.cvv,
          cardHolder: data.cardHolder
        };

        Swal.fire({
          title: 'Processing Payment...',
          html: 'Please wait while we verify your card.',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        await processPayment(cardData);

        Swal.close();

        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Your order is being placed...',
          timer: 2000,
          showConfirmButton: false
        });

        await createOrder(newOrder).unwrap();
        navigate('/orders');
        return;
      }

      await createOrder(newOrder).unwrap();

      await Swal.fire({
        title: "Order Confirmed!",
        text: "Your order has been placed successfully.",
        icon: "success",
        confirmButtonText: "OK"
      });

      navigate('/orders');
    } catch (error) {
      Swal.close();
      console.error("Order or Payment failed:", error);
      Swal.fire({
        title: "Error",
        text: error?.message || "Failed to place the order. Please try again.",
        icon: "error"
      });
    }
  };

  if (isLoading) return <div className="text-center mt-10">Placing your order...</div>;

  return (
    <section className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-4 text-xs">
        <h2 className="text-base font-bold text-lime-600 mb-1 flex items-center gap-2">
          <FaUser /> Checkout
        </h2>
        <p className="text-[11px] text-gray-500 mb-3">Please complete your order details</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">Full Name *</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full border rounded px-2 py-1"
              />
              {errors.name && <span className="text-red-500 text-[10px]">Full name is required</span>}
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                defaultValue={currentUser?.email}
                disabled
                {...register("email")}
                className="w-full border rounded px-2 py-1 bg-gray-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1">Phone Number *</label>
              <input
                type="text"
                {...register("phone", { required: true })}
                className="w-full border rounded px-2 py-1"
              />
              {errors.phone && <span className="text-red-500 text-[10px]">Phone is required</span>}
            </div>
          </div>

          <h3 className="text-lime-700 font-semibold mt-2">Shipping Address</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input type="text" placeholder="Street" {...register("address", { required: true })} className="p-1 border rounded" />
            <input type="text" placeholder="City" {...register("city")} className="p-1 border rounded" />
            <input type="text" placeholder="State" {...register("state")} className="p-1 border rounded" />
            <input type="text" placeholder="Country" {...register("country")} className="p-1 border rounded" />
            <input type="text" placeholder="Zip Code" {...register("zipcode")} className="p-1 border rounded" />
          </div>
          {errors.address && <span className="text-red-500 text-[10px]">Address is required</span>}

          <h3 className="text-lime-700 font-semibold mt-2">Payment Method</h3>
          <div className="flex gap-4">
            <label>
              <input type="radio" value="Cash on Delivery" {...register("paymentMethod", { required: true })} />
              <span className="ml-1">Cash</span>
            </label>
            <label>
              <input type="radio" value="Online" {...register("paymentMethod", { required: true })} />
              <span className="ml-1">Online</span>
            </label>
          </div>
          {errors.paymentMethod && <span className="text-red-500 text-[10px]">Select a method</span>}

          {paymentMethod === 'Online' && (
            <div className="bg-gray-100 p-3 rounded space-y-2 mt-2">
              <input type="text" placeholder="Card Holder" {...register("cardHolder", { required: true })} className="w-full p-1 border rounded" />
              <input type="text" placeholder="Card Number" {...register("cardNumber", { required: true, minLength: 16, maxLength: 16 })} className="w-full p-1 border rounded" />
              <div className="flex gap-2">
                <input type="text" placeholder="MM/YY" {...register("expiry", { required: true })} className="w-full p-1 border rounded" />
                <input type="password" placeholder="CVV" {...register("cvv", { required: true })} className="w-full p-1 border rounded" />
              </div>
            </div>
          )}

          <div className="flex items-start gap-2 mt-2">
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            <label className="text-[11px]">
              I agree to the <a href="/terms" className="text-lime-600 underline">Terms</a> & <a href="/policy" className="text-lime-600 underline">Policy</a>
            </label>
          </div>

          <div className="text-right mt-4">
            <button
              type="submit"
              disabled={!isChecked}
              className={`px-4 py-1.5 font-medium rounded text-xs transition text-white ${
                isChecked ? 'bg-lime-600 hover:bg-lime-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <FaShoppingCart className="inline mr-1" />
              Place Order – Rs. {totalPrice}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;
