import { baseApi } from './baseApi';

export interface SavedJobResponse {
  _id: string;
  user: string;
  job: any; // Populated job object
  createdAt: string;
  updatedAt: string;
}

export const savedJobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSavedJobs: builder.query<{ success: boolean; data: SavedJobResponse[] }, void>({
      query: () => ({
        url: '/saved-jobs',
        method: 'GET',
      }),
      providesTags: ['SavedJob'],
    }),
    saveJob: builder.mutation<{ success: boolean; data: SavedJobResponse }, { jobId: string }>({
      query: (body) => ({
        url: '/saved-jobs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SavedJob'],
    }),
    removeSavedJob: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/saved-jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SavedJob'],
    }),
  }),
});

export const { 
  useGetSavedJobsQuery, 
  useSaveJobMutation, 
  useRemoveSavedJobMutation 
} = savedJobsApi;
