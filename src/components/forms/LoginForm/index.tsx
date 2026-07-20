"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/login.schema';
import { useLoginMutation } from '@/redux/api/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

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
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.data?.message || 'Failed to login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto p-8 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl">
      <h2 className="text-2xl font-extrabold text-center text-[#1E293B] mb-6">Login to CareerPilot</h2>
      {errorMsg && <div className="text-red-500 text-xs font-bold text-center mb-4 p-2 bg-red-50 rounded-xl border border-red-200">{errorMsg}</div>}
      
      <div className="space-y-1">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">Email Address</label>
        <Input 
          {...register('email')}
          type="email" 
          placeholder="Enter your email"
        />
        {errors.email && <span className="text-red-500 text-xs font-medium">{errors.email.message}</span>}
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">Password</label>
        <Input 
          {...register('password')}
          type="password" 
          placeholder="Enter your password"
        />
        {errors.password && <span className="text-red-500 text-xs font-medium">{errors.password.message}</span>}
      </div>

      <Button 
        type="submit" 
        isLoading={isLoading}
        className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white mt-4 font-extrabold rounded-lg"
      >
        Sign In
      </Button>
    </form>
  );
}
