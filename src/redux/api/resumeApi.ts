import { baseApi } from './baseApi';

export interface ResumeData {
  _id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  parsedData: {
    technicalSkills: string[];
    softSkills: string[];
    experienceSummary: string;
    atsScore?: number;
    atsFeedback?: string[];
  };
  createdAt: string;
}

export const resumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyResume: builder.query<{ success: boolean; data: ResumeData }, void>({
      query: () => ({
        url: '/resume/me',
        method: 'GET',
      }),
      providesTags: ['Resume'],
    }),
    uploadFile: builder.mutation<{ success: boolean; data: { url: string } }, FormData>({
      query: (body) => ({
        url: '/upload',
        method: 'POST',
        body,
      }),
    }),
    parseResume: builder.mutation<{ success: boolean; data: ResumeData }, { fileUrl: string }>({
      query: (body) => ({
        url: '/resume',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Resume'],
    }),
  }),
});

export const { 
  useGetMyResumeQuery,
  useUploadFileMutation,
  useParseResumeMutation
} = resumeApi;
