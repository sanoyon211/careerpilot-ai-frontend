"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/schemas/register.schema';
import { useRegisterMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto p-8 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl">
      <h2 className="text-2xl font-extrabold text-center text-[#1E293B] mb-6">Create Your Account</h2>
      {errorMsg && <div className="text-red-500 text-xs font-bold text-center mb-4 p-2 bg-red-50 rounded-xl border border-red-200">{errorMsg}</div>}
      {successMsg && <div className="text-emerald-600 text-xs font-bold text-center mb-4 p-2 bg-emerald-50 rounded-xl border border-emerald-200">{successMsg}</div>}
      
      <div className="space-y-1">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">Full Name</label>
        <Input 
          {...register('name')}
          type="text" 
          placeholder="John Doe"
        />
        {errors.name && <span className="text-red-500 text-xs font-medium">{errors.name.message}</span>}
      </div>

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

      <div className="space-y-1">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">Account Type</label>
        <select 
          {...register('role')}
          className="flex h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-bold text-[#1E293B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <option value="job-seeker">Job Seeker</option>
          <option value="employer">Employer / Recruiter</option>
        </select>
        {errors.role && <span className="text-red-500 text-xs font-medium">{errors.role.message}</span>}
      </div>

      <Button 
        type="submit" 
        isLoading={isLoading}
        className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white mt-4 font-extrabold rounded-lg"
      >
        Create Account
      </Button>
    </form>
  );
}
