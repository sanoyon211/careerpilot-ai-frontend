import { baseApi } from './baseApi';

export interface Application {
  _id: string;
  jobId: string | any;
  applicantId: string | any;
  status: 'Applied' | 'In Review' | 'Reviewed' | 'Shortlisted' | 'Interview' | 'Rejected' | 'Hired';
  resumeUrl: string;
  coverLetter?: string;
  createdAt: string;
}

export interface ApplicationResponse {
  success: boolean;
  message: string;
  data: Application[];
}

export interface SingleApplicationResponse {
  success: boolean;
  message: string;
  data: Application;
}

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyForJob: builder.mutation<SingleApplicationResponse, { jobId: string; resumeUrl: string; coverLetter?: string }>({
      query: (body) => ({
        url: '/applications',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Application', 'Job'],
    }),
    getMyApplications: builder.query<ApplicationResponse, void>({
      query: () => ({
        url: '/applications/my-applications',
        method: 'GET',
      }),
      providesTags: ['Application'],
    }),
    getJobApplications: builder.query<ApplicationResponse, string>({
      query: (jobId) => ({
        url: `/applications/job/${jobId}`,
        method: 'GET',
      }),
      providesTags: ['Application'],
    }),
    updateApplicationStatus: builder.mutation<SingleApplicationResponse, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/applications/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Application'],
    }),
    deleteApplication: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/applications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Application', 'Job'],
    }),
  }),
});

export const {
  useApplyForJobMutation,
  useGetMyApplicationsQuery,
  useGetJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} = applicationApi;
