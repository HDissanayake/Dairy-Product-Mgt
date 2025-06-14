import React from "react";
import { Link } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import { getImgUrl } from "../../utils/getImgURL";

const Categories = () => {
  const { data: products = [] } = useFetchAllProductsQuery();

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      {/* Header with Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h2 className="text-4xl font-bold text-center md:text-left bg-gradient-to-r from-white via-lime-600 to-green-800 text-transparent bg-clip-text drop-shadow-xl">
          Our Dairy Products
        </h2>
        <Link to="/categories">
          <button className="bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300">
            View All Products
          </button>
        </Link>
      </div>

      {/* All Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-5"
            >
              <div className="h-48 flex items-center justify-center overflow-hidden rounded-lg mb-4 bg-gray-100">
                <img
                  src={getImgUrl(product.coverImage)}
                  alt={product.name}
                  onError={(e) => (e.target.src = getImgUrl("default.png"))}
                  className="object-contain max-h-full max-w-full"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500 mb-2 capitalize">
                Category: {product.category}
              </p>

              <p className="text-lime-700 font-bold text-md">
                Rs. {product.newPrice.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-3 py-20">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
