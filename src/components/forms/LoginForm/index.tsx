"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/login.schema';
import { useLoginMutation } from '@/redux/api/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: LoginFormData) => {
    setErrorMsg('');
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials({
        user: response.data.user,
        accessToken: response.data.accessToken
      }));
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.data?.message || 'Failed to login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {errorMsg && <div className="text-red-500 text-sm text-center mb-4">{errorMsg}</div>}
      
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input 
          {...register('email')}
          type="email" 
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input 
          {...register('password')}
          type="password" 
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
        />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
