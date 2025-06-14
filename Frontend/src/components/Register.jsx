import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
    const [message, setMessage] = useState("");
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password);
            alert("User registration successful!");
            navigate("/login");
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-lime-200 to-green-300 px-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fade-in'>
                <h2 className='text-2xl font-bold text-center text-lime-700 mb-6'>Create Your Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    <div>
                        <label className='block text-gray-700 text-sm font-semibold mb-1' htmlFor="email">Email</label>
                        <div className='flex items-center border rounded px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-lime-400'>
                            <FaEnvelope className='text-gray-400 mr-2' />
                            <input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className='w-full outline-none text-gray-700'
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className='block text-gray-700 text-sm font-semibold mb-1' htmlFor="password">Password</label>
                        <div className='flex items-center border rounded px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-lime-400'>
                            <FaLock className='text-gray-400 mr-2' />
                            <input
                                {...register("password", { required: "Password is required" })}
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className='w-full outline-none text-gray-700'
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {message && <p className='text-red-600 text-sm text-center'>{message}</p>}

                    <div className='flex justify-center'>
                        <button type="submit" className='bg-lime-500 hover:bg-lime-600 transition duration-200 text-white font-semibold py-2 px-8 rounded-lg shadow-md'>
                            Register
                        </button>
                    </div>
                </form>

                <p className='text-sm text-center mt-6 text-gray-700'>
                    Already have an account?{" "}
                    <Link to="/login" className='text-lime-600 hover:underline font-medium'>
                        Login here
                    </Link>
                </p>

                
            </div>
        </div>
    );
};

export default Register;
