import { baseApi } from './baseApi';

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  data: { reply: string }; // The AI's response text
}

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse, { history: ChatMessage[], mode?: 'coach' | 'mock-interview' }>({
      query: (body) => ({
        url: '/chat',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
