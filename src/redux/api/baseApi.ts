import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { setCredentials, logout } from '../slices/authSlice';

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  if (envUrl.endsWith('/api/v1')) {
    return envUrl;
  }
  return `${envUrl.replace(/\/$/, '')}/api/v1`;
};

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    let token = (getState() as RootState).auth.token;

    // Fallback to cookie if Redux memory state token is not hydrated yet
    if (!token && typeof document !== 'undefined') {
      const match = document.cookie.split('; ').find((row) => row.startsWith('accessToken='));
      if (match) {
        token = match.split('=')[1] || null;
      }
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to get a new token
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as any;
      const user = (api.getState() as RootState).auth.user;

      if (user && data?.data?.accessToken) {
        api.dispatch(setCredentials({ user, accessToken: data.data.accessToken }));
        document.cookie = `accessToken=${data.data.accessToken}; path=/; max-age=604800; SameSite=Lax`;
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Job', 'Application', 'Resume', 'Recommendation', 'SavedJob'],
  endpoints: () => ({}),
});
