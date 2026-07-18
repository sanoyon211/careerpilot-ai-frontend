import { baseApi } from './baseApi';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
  location?: string;
  headline?: string;
  bio?: string;
  portfolio?: string;
  createdAt: string;
  updatedAt: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<{ success: boolean; data: UserProfile }, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateMyProfile: builder.mutation<{ success: boolean; data: UserProfile }, Partial<UserProfile>>({
      query: (body) => ({
        url: '/users/me',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useGetMyProfileQuery,
  useUpdateMyProfileMutation
} = userApi;
