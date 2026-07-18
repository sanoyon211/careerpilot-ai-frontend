import { baseApi } from './baseApi';

export interface Job {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salaryRange?: string;
  employerId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  status: 'Active' | 'Draft' | 'Closed';
  applicantsCount: number;
  isDeleted: boolean;
  createdAt: string;
}

export interface JobsResponse {
  success: boolean;
  message: string;
  data: Job[];
}

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobsResponse, Record<string, any> | void>({
      query: (params) => ({
        url: '/jobs',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['Job'],
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
