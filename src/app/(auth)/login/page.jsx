"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Import axios for making requests
import toast from 'react-hot-toast';
import useUser from '@/hooks/useUser';
import { redirect } from "next/navigation";

const page = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://rpg-backend-0yzz.onrender.com/api/v1/login`, data);
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      window.location.href = '/dashboard'; // Redirect to main page
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Login failed. Please check your credentials.'); // Inform user about login failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container flex items-center justify-center h-screen bg-gray-100 dark:bg-black ">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form flex flex-col w-full max-w-md bg-white rounded-md shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Controle Financeiro</h2>
        <div className="form-group mb-4">
          <label htmlFor="email" className="text-gray-700 font-medium block mb-2">Email Address</label>
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/i })} // Validate email format
            type="email"
            id="email"
            name="email"
            className="form-control w-full  py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email?.type === 'required' && <span className="text-red-500 text-sm">Email is required.</span>}
          {errors.email?.type === 'pattern' && <span className="text-red-500 text-sm">Please enter a valid email address.</span>}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password" className="text-gray-700 font-medium block mb-2">Password</label>
          <input
            {...register("password", { required: true, minLength: 8 })} // Validate password length
            type="password"
            id="password"
            name="password"
            className="form-control w-full py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.password?.type === 'required' && <span className="text-red-500 text-sm">Password is required.</span>}
          {errors.password?.type === 'minLength' && <span className="text-red-500 text-sm">Password must be at least 8 characters long.</span>}
        </div>
        <button type="submit" disabled={isLoading} className="login-button w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
        <h4 className="justify-center text-center w-full py-2 font-medium text-lg">ou</h4>
        <a href="/signup" className="login-button text-center w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"  >Cadastre-se</a>
      </form>
      
      <hr />
    </div>
  );
};

export default page