import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import { getImgUrl } from "../../utils/getImgURL";

const categories = [
  "Choose a category",
  "Milk & Beverages",
  "Cheese & Butter",
  "Yogurt & Curd",
  "Ghee & Cream",
  "Ice Cream & Desserts",
];

const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: products = [] } = useFetchAllProductsQuery();

  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "Choose a category";

  const [selectedCategory, setSelectedCategory] = useState(initialSearch);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    setSelectedCategory(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    initializeQuantities(products);
  }, [products]);

  const initializeQuantities = (products) => {
    const qtyObj = {};
    products.forEach((p) => {
      qtyObj[p._id] = 1;
    });
    setQuantities(qtyObj);
  };

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value === "Choose a category") {
      navigate("/categories");
    } else {
      navigate(`/categories?search=${encodeURIComponent(value)}`);
    }
  };

  const filteredProducts =
    selectedCategory === "Choose a category"
      ? products
      : products.filter(
          (p) =>
            p.category?.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  return (
    <div className="py-14 px-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 text-lime-700">
        Browse Dairy Categories
      </h2>

      {/* Category Dropdown */}
      <div className="mb-10 flex justify-center">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition duration-300"
            >
              <Link to={`/products/${product._id}`}>
                <div className="h-48 mb-4 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={getImgUrl(product.coverImage)}
                    alt={product.name}
                    onError={(e) => (e.target.src = getImgUrl("default.png"))}
                    className="object-contain max-h-full max-w-full transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </Link>

              <Link to={`/products/${product._id}`}>
                <h3 className="text-xl font-semibold text-gray-800 hover:text-lime-600 mb-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm mb-3">
                {product.description?.substring(0, 100)}...
              </p>

              <div className="flex justify-between items-center mb-3">
                <div>
                  {product.oldPrice && (
                    <span className="line-through text-sm text-gray-400">
                      Rs. {product.oldPrice}
                    </span>
                  )}
                  <span className="text-lg font-bold text-green-700 ml-2">
                    Rs. {product.newPrice.toFixed(2)}
                  </span>
                </div>
                {product.trending && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Trending
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Qty:
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantities[product._id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product._id, e.target.value)
                  }
                  className="w-16 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-lime-500"
                />
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-2 rounded transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-16 text-lg">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
