import { baseApi } from './baseApi';

export interface RecommendedJob {
  jobId: string;
  matchPercentage: number;
  reason: string;
}

export interface RecommendedSkill {
  name: string;
  importance: 'High' | 'Medium' | 'Low';
  reason: string;
}

export interface RecommendationData {
  recommendedJobs: RecommendedJob[];
  recommendedSkills: RecommendedSkill[];
}

export interface RecommendationResponse {
  success: boolean;
  message: string;
  data: RecommendationData;
}

export const recommendationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendations: builder.query<RecommendationResponse, void>({
      query: () => ({
        url: '/recommendations',
        method: 'GET',
      }),
      providesTags: ['Recommendation'],
    }),
  }),
});

export const { useGetRecommendationsQuery } = recommendationApi;
