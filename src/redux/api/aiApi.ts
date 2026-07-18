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
  }),
  overrideExisting: false,
});

export const { useSendMessageMutation } = aiApi;