import { baseApi } from './baseApi';

export interface JobSeekerStats {
  appliedJobs: number;
  savedJobs: number;
  profileViews: number;
  aiMatchScore: string;
}

export interface EmployerStats {
  postedJobs: number;
  totalApplicants: number;
  profileViews: number;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobSeekerStats: builder.query<{ success: boolean; data: JobSeekerStats }, void>({
      query: () => ({
        url: '/dashboard/job-seeker-stats',
        method: 'GET',
      }),
      providesTags: ['Application', 'SavedJob'],
    }),
    getEmployerStats: builder.query<{ success: boolean; data: EmployerStats }, void>({
      query: () => ({
        url: '/dashboard/employer-stats',
        method: 'GET',
      }),
      providesTags: ['Job', 'Application'],
    }),
  }),
});

export const { 
  useGetJobSeekerStatsQuery,
  useGetEmployerStatsQuery
} = dashboardApi;
