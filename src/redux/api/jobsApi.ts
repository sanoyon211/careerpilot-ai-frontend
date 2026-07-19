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
  imageUrl?: string;
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

export interface GetJobsQueryParams {
  searchTerm?: string;
  category?: string;
  jobType?: string;
  workMode?: string;
  agenticSearch?: boolean;
}

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<{ success: boolean; data: Job[] }, GetJobsQueryParams | void>({
      query: (params) => {
        let url = '/jobs';
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.searchTerm) queryParams.append('searchTerm', params.searchTerm);
          if (params.category) queryParams.append('category', params.category);
          if (params.jobType) queryParams.append('jobType', params.jobType);
          if (params.workMode) queryParams.append('workMode', params.workMode);
          if (params.agenticSearch) queryParams.append('agenticSearch', 'true');
          const queryString = queryParams.toString();
          if (queryString) {
            url += `?${queryString}`;
          }
        }
        return {
          url,
          method: 'GET',
        };
      },
      providesTags: ['Job'],
    }),
    getEmployerJobs: builder.query<JobsResponse, void>({
      query: () => ({
        url: '/jobs/my-jobs',
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
    updateJob: builder.mutation<{ success: boolean; message: string; data: Job }, { id: string; body: Partial<Job> }>({
      query: ({ id, body }) => ({
        url: `/jobs/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Job'],
    }),
    deleteJob: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Job'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetEmployerJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
