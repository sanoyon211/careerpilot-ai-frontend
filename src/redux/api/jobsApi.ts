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
    getEmployerJobs: builder.query<JobsResponse, void>({
      query: () => ({
        url: '/jobs/employer',
        method: 'GET',
      }),
      providesTags: ['Job'],
    }),
    getJobById: builder.query<{ success: boolean; data: Job }, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'GET',
      }),
      providesTags: ['Job'],
    }),
    createJob: builder.mutation<{ success: boolean; message: string; data: Job }, Partial<Job>>({
      query: (body) => ({
        url: '/jobs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Job'],
    }),
  }),
});

export const { useGetJobsQuery, useGetEmployerJobsQuery, useGetJobByIdQuery, useCreateJobMutation } = jobsApi;
