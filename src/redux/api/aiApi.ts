import { baseApi } from './baseApi';

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (history) => ({
        url: '/chat',
        method: 'POST',
        body: { history },
      }),
    }),
    generateCoverLetter: builder.mutation<{ success: boolean; data: string }, { jobDescription: string; resumeData: any }>({
      query: (body) => ({
        url: '/ai/generate-cover-letter',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSendMessageMutation, useGenerateCoverLetterMutation } = aiApi;