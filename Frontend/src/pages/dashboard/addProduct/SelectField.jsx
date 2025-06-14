import React from 'react';

const SelectField = ({ label, name, options, register, defaultValue }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required: true })}
        defaultValue={defaultValue || ''}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.value === ''}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
