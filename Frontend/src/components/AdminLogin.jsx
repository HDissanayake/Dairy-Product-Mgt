import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getBaseUrl from '../utils/baseURL';

const AdminLogin = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      const auth = response.data;

      if (auth.token) {
        localStorage.setItem('token', auth.token);
        setTimeout(() => {
          localStorage.removeItem('token');
          alert('Session expired. Please login again.');
          navigate('/');
        }, 3600 * 1000); // 1 hour
      }

      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      setMessage('Invalid username or password!');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-lime-100 to-lime-200 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-lime-600 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              {...register('username', { required: 'Username is required' })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Error message */}
          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 text-sm p-2 rounded">
              {message}
            </div>
          )}

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default AdminLogin;
