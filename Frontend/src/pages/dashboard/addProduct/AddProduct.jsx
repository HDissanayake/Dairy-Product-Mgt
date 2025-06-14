import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddProductMutation } from '../../../redux/features/products/productsApi';
import Swal from 'sweetalert2';
import { getImgUrl } from '../../../utils/getImgURL';

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const onSubmit = async (data) => {
    try {
      const imageUrl = getImgUrl(data.coverImage).href;

      const newProductData = {
        ...data,
        trending: data.trending === 'true',
        coverImage: imageUrl,
        oldPrice: parseFloat(data.oldPrice),
        newPrice: parseFloat(data.newPrice),
        availableUnits: data.availableUnits.split(',').map(unit => unit.trim()), // convert CSV to array
      };

      await addProduct(newProductData).unwrap();

      Swal.fire({
        title: "Product Added",
        text: "Your product was added successfully!",
        icon: "success",
        confirmButtonText: "OK"
      });

      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed!",
        text: "Failed to add product. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField label="Product Name" name="name" placeholder="Enter product name" register={register} />
        <InputField label="Description" name="description" placeholder="Enter product description" type="textarea" register={register} />

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

        <InputField label="Old Price" name="oldPrice" type="number" placeholder="Enter old price" register={register} />
        <InputField label="New Price" name="newPrice" type="number" placeholder="Enter new price" register={register} />

        <InputField
          label="Cover Image Name"
          name="coverImage"
          placeholder="e.g. cheddar-cheese.png"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
