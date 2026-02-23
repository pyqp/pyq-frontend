import apiClient from './Client';

export interface Exam {
  _id:         string;
  name:        string;
  shortName:   string;
  slug:        string;
  category:    string;
  conductedBy: string;
  logo?:       string;
  description?: string;
  isActive:    boolean;
}

export interface ExamListParams {
  page?:     number;
  limit?:    number;
  category?: string;
  search?:   string;
}

export const examApi = {
  getAll: (params?: ExamListParams) =>
    apiClient.get<{ success: true; data: Exam[]; pagination: Pagination }>('/exams', { params }),

  getPopular: () =>
    apiClient.get<{ success: true; data: Exam[] }>('/exams/popular'),

  getCategories: () =>
    apiClient.get<{ success: true; data: string[] }>('/exams/categories/list'),

  search: (q: string) =>
    apiClient.get<{ success: true; data: Exam[] }>('/exams/search', { params: { q } }),

  getByCategory: (category: string) =>
    apiClient.get<{ success: true; data: Exam[] }>(`/exams/category/${category}`),

  getBySlug: (slug: string) =>
    apiClient.get<{ success: true; data: Exam }>(`/exams/slug/${slug}`),

  getById: (id: string) =>
    apiClient.get<{ success: true; data: Exam }>(`/exams/${id}`),
};

// ── Shared pagination type used across APIs ───────────────────────────────────
export interface Pagination {
  total:       number;
  page:        number;
  limit:       number;
  totalPages:  number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}