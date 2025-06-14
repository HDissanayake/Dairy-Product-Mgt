import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getImgUrl } from '../../utils/getImgURL';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchProductByIdQuery } from '../../redux/features/products/productsApi';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useFetchProductByIdQuery(id);

  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading product!</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const mainImage = selectedImage || getImgUrl(product?.coverImage)?.href;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-md p-8 rounded-lg">
        
        {/* Images Section */}
        <div className="flex flex-col items-center">
          {/* Main Image */}
          <div className="mb-4 w-[300px] h-[300px] flex justify-center items-center overflow-hidden border rounded-md bg-gray-50">
            <img
              src={mainImage}
              alt={product?.title}
              className="object-contain w-full h-full p-2"
              onError={(e) => (e.target.src = getImgUrl('default.png').href)}
            />
          </div>

          
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4 text-green-700">{product?.title}</h1>

            {/* Category */}
            <p className="text-gray-600 mb-2">
              <strong>Category:</strong> {product?.category}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 my-4">
              {product?.oldPrice && (
                <span className="line-through text-gray-400 text-lg">
                  Rs.{product.oldPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-green-600">Rs.{product?.newPrice}</span>
            </div>

            {/* Quantity Label */}
            {product?.quantityLabel && (
              <p className="text-gray-500 mb-4">
                <strong>Quantity:</strong> {product.quantityLabel}
              </p>
            )}

            {/* Description */}
            <p className="text-gray-700 mb-6">{product?.description}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-lime-500 hover:bg-green-600 text-white py-3 px-6 rounded text-lg transition"
          >
            <FiShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
