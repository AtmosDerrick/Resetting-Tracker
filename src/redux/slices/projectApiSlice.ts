import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProjectCategory {
  id: number;
  category: string;
}

interface Region {
  id: number;
  region: string;
}

interface Project {
  id: number;
  name: string;
  partner: string;
  beneficiary_mmdce: string;
  beneficiary_community: string;
  amount: string;
  amount_currency: string;
  description: string;
  status: string;
  stateDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  category: number;
  beneficiary_region: number;
  project_category: ProjectCategory;
  region: Region;
}

interface AllProjectsResponse {
  success: boolean;
  count: number;
  data: Project[];
}

interface SingleProjectResponse {
  success: boolean;
  data: Project;
}

interface AnalyticsResponse {
  success: boolean;
  data: {
    total: number;
    "Not Started": number;
    Ongoing: number;
    Completed: number;
    Pending: number;
    Delayed: number;
  };
}

export const apiSlice = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://resetting-tracker.onrender.com/api",
  }),
  endpoints: (builder) => ({
    getAllProjects: builder.query<AllProjectsResponse, void>({
      query: () => "/projects",
    }),

    getProject: builder.query<SingleProjectResponse, number | string>({
      query: (id) => `/projects/${id}`,
    }),
    updateProject: builder.mutation<
      SingleProjectResponse,
      { id: number | string; data: Partial<Project> }
    >({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProject: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
    }),
    createProject: builder.mutation<SingleProjectResponse, Partial<Project>>({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
    }),
    getProjectStatusStats: builder.query<AnalyticsResponse, void>({
      query: () => "/projects2/status-stats",
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useCreateProjectMutation,
  useGetProjectStatusStatsQuery,
} = apiSlice;
