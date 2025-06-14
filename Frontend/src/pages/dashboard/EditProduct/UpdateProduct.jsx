import React, { useEffect } from 'react';
import InputField from '../addProduct/InputField';
import SelectField from '../addProduct/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../redux/features/products/productsApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: productData, isLoading, isError, refetch } = useFetchProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (productData) {
      setValue('name', productData.name);
      setValue('description', productData.description);
      setValue('category', productData.category);
      setValue('trending', productData.trending ? 'true' : 'false');
      setValue('productType', productData.productType);
      setValue(
        'availableUnits',
        Array.isArray(productData.availableUnits)
          ? productData.availableUnits.join(', ')
          : ''
      );
      setValue('oldPrice', productData.oldPrice);
      setValue('newPrice', productData.newPrice);
      setValue('coverImage', productData.coverImage);
    }
  }, [productData, setValue]);

  const onSubmit = async (data) => {
    const updateProductData = {
      name: data.name,
      description: data.description,
      category: data.category,
      trending: data.trending === 'true',
      productType: data.productType,
      availableUnits: data.availableUnits.split(',').map(unit => unit.trim()),
      oldPrice: parseFloat(data.oldPrice),
      newPrice: parseFloat(data.newPrice),
      coverImage: data.coverImage || productData.coverImage,
    };

    try {
      await axios.put(`${getBaseUrl()}/api/products/edit/${id}`, updateProductData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: 'Product Updated',
        text: 'Your product has been updated successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Okay',
      });
      await refetch();
    } catch (error) {
      console.error('Failed to update product.', error);
      alert('Failed to update product.');
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching product data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Product Name"
          name="name"
          placeholder="Enter product name"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter product description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'milk & beverages', label: 'Milk & Beverages' },
            { value: 'cheese & butter', label: 'Cheese & Butter' },
            { value: 'yogurt & curd', label: 'Yogurt & Curd' },
            { value: 'ghee & cream', label: 'Ghee & Cream' },
            { value: 'ice cream & desserts', label: 'Ice Cream & Desserts' },
          ]}
          register={register}
        />

        <SelectField
          label="Trending"
          name="trending"
          options={[
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ]}
          register={register}
        />

        <SelectField
          label="Product Type"
          name="productType"
          options={[
            { value: '', label: 'Select Type' },
            { value: 'solid', label: 'Solid' },
            { value: 'liquid', label: 'Liquid' },
          ]}
          register={register}
        />

        <InputField
          label="Available Units"
          name="availableUnits"
          placeholder="250ml, 500ml"
          register={register}
        />

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Enter old price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="Enter new price"
          register={register}
        />

        <InputField
          label="Cover Image Name"
          name="coverImage"
          placeholder="e.g. cheddar-cheese.png"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-bold rounded-md"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
