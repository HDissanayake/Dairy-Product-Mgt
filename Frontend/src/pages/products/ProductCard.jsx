import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { getImgUrl } from '../../utils/getImgURL';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const productWithQty = { ...product, quantity: 1 }; // Default quantity 1
    dispatch(addToCart(productWithQty));
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 h-48 flex items-center justify-center">
        <Link to={`/products/${product._id}`}>
          <img
            src={getImgUrl(product?.coverImage)}
            alt={product?.title}
            className="max-h-full max-w-full object-contain rounded-md cursor-pointer hover:scale-105 transition-transform duration-200"
            onError={(e) => (e.target.src = "/images/default.png")}
          />
        </Link>
      </div>

      <div className="text-center">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold hover:text-blue-600 mb-2">
            {product?.title}
            {product.quantityLabel && (
              <span className="text-sm text-gray-500 font-normal"> ({product.quantityLabel})</span>
            )}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3">
          {product?.description?.length > 80
            ? product.description.slice(0, 80) + "..."
            : product?.description}
        </p>

        <div className="flex justify-center items-center gap-2 mb-4">
          {product.oldPrice && (
            <span className="line-through text-gray-400 text-sm">Rs.{product.oldPrice}</span>
          )}
          <span className="text-lg font-bold text-green-600">Rs.{product.newPrice}</span>
        </div>

        {product.trending && (
          <div className="mb-4">
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              Trending
            </span>
          </div>
        )}

        <button
          onClick={() => handleAddToCart(product)}
          className="w-full bg-lime-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center gap-2 transition-all duration-200"
        >
          <FiShoppingCart className="text-lg" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
