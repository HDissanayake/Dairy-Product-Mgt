import React from 'react';
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../redux/features/products/productsApi';
import { Link, useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const navigate = useNavigate();
  const { data: products, refetch } = useFetchAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      alert('Product deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Failed to delete product:', error.message);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <section className="py-10 bg-gray-50 min-h-screen font-sans">
      <div className="w-full xl:w-10/12 px-4 mx-auto mt-10">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">All Products</h3>
           
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 border-b">#</th>
                  <th className="px-6 py-3 border-b">Product Name</th>
                  <th className="px-6 py-3 border-b">Category</th>
                  <th className="px-6 py-3 border-b">Price</th>
                  <th className="px-6 py-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b">{index + 1}</td>
                      <td className="px-6 py-4 border-b">{product.name}</td>
                      <td className="px-6 py-4 border-b capitalize">{product.category}</td>
                      <td className="px-6 py-4 border-b">Rs. {product.newPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 border-b space-x-2">
                        <Link
                          to={`/dashboard/edit-product/${product._id}`}
                          className="text-indigo-600 hover:underline text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-4 rounded-full"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProducts;
