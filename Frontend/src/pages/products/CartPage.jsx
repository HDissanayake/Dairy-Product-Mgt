import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {removeFromCart} from '../../redux/features/cart/cartSlice';

// Utility function to get correct image URL from public/images folder
const getImgUrl = (imagePath) => {
  return `/images/${imagePath}`;
};

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch()

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.newPrice * (item.quantity || 1),
  0).toFixed(2);

  const  handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }
  
  return (
    <div className="max-w-4xl mx-auto mt-12 p-4 bg-white shadow rounded-lg">


      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping cart</div>
          <div className="ml-3 flex h-7 items-center">
            
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {
            cartItems.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product?._id} className="flex py-6">
                    <div className="w-20 h-20 rounded border object-cover">
                      <img
                        alt={product?.title}
                        src={getImgUrl(product?.coverImage)}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to="/">{product?.title}</Link>
                          </h3>
                          <p className="sm:ml-4">Rs.{product?.newPrice}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Category:</strong> {product?.category}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                        <p className="text-gray-500">
                          <strong>Qty:</strong> 1
                        </p>
                        <div className="flex">
                          <button
                          onClick={() => handleRemoveFromCart(product)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Product found!</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>Rs.{totalPrice ? totalPrice : 0} {/* Add subtotal calculation here */}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
        <Link
  to="/checkout"
  className="inline-block bg-lime-600 hover:bg-lime-700 text-white text-sm font-medium px-5 py-2 rounded-md shadow-sm transition"
>
  Proceed to Checkout
</Link>

        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/categories">
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Continue Shopping <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
