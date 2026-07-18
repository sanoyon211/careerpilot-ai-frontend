import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    socialLogin: builder.mutation({
      query: (userData) => ({
        url: '/auth/social-login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useSocialLoginMutation } = authApi;
