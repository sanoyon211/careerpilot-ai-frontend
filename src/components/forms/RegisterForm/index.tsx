"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/schemas/register.schema';
import { useRegisterMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'job-seeker'
    }
  });
  const [registerUser, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await registerUser(data).unwrap();
      setSuccessMsg('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.data?.message || 'Failed to register');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      {errorMsg && <div className="text-red-500 text-sm text-center mb-4">{errorMsg}</div>}
      {successMsg && <div className="text-green-500 text-sm text-center mb-4">{successMsg}</div>}
      
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input 
          {...register('name')}
          type="text" 
          className="w-full p-2 border rounded"
          placeholder="John Doe"
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>

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

      <div>
        <label className="block text-sm font-medium mb-1">I am a...</label>
        <select 
          {...register('role')}
          className="w-full p-2 border rounded"
        >
          <option value="job-seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Creating account...' : 'Register'}
      </button>
    </form>
  );
}
