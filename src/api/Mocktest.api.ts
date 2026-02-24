import apiClient from './Client';
import type { Pagination } from './Exam.api';

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface MockTestSummary {
  _id:             string;
  name:            string;
  slug:            string;
  exam:            { _id: string; name: string; shortName: string };
  description?:    string;
  duration:        number;
  totalQuestions:  number;
  totalMarks:      number;
  difficulty:      'easy' | 'medium' | 'hard';
  isPaid:          boolean;
  creditsRequired: number;
  isFeatured:      boolean;
  isActive:        boolean;
  attemptCount?:   number;
}

export interface MockTestDetail extends MockTestSummary {
  sections: Array<{
    name:           string;
    subjects:       string[];
    questionsCount: number;
    marks:          number;
    duration:       number;
  }>;
  instructions?: string[];
}

export interface Question {
  _id:            string;
  questionText:   string;
  options:        Array<{ text: string; image?: string }>;
  subject:        string;
  topic?:         string;
  difficulty:     'easy' | 'medium' | 'hard';
  marks:          number;
  negativeMarks:  number;
  imageUrl?:      string;
  questionNumber: number;
}

/**
 * Normalised shape — what TestPage/MockTestDetail actually consume.
 *
 * Backend returns:
 *   { attempt: { _id, attemptNumber, startTime, duration, totalQuestions, totalMarks },
 *     questions: [...],
 *     instructions: [...],
 *     isResumed: bool }
 *
 * We flatten it here so consumers can read:
 *   attempt.attemptId, attempt.duration, attempt.questions, attempt.totalMarks
 */
export interface StartTestResponse {
  // Flattened attempt identity
  attemptId:      string;   // ← attempt._id
  attemptNumber:  number;
  startTime:      string;
  // Test metadata
  duration:       number;   // minutes
  totalQuestions: number;
  totalMarks:     number;
  // Questions (no correct answers)
  questions:      Question[];
  instructions?:  string[];
  isResumed:      boolean;
}

export interface SaveAnswerPayload {
  attemptId:       string;
  questionNumber:  number;
  userAnswer?:     number | null;
  timeSpent:       number;
  markedForReview?: boolean;
}

export interface SubmitTestPayload {
  attemptId:  string;
  timeTaken?: number;
}

export interface SubmitTestResult {
  resultId:          string;
  attemptId:         string;
  score:             number;
  totalMarks:        number;
  percentage:        number;
  rank?:             number;
  percentile?:       number;
  totalParticipants?: number;
  correct:           number;
  incorrect:         number;
  unattempted:       number;
}

export interface MockTestListParams {
  page?:       number;
  limit?:      number;
  examId?:     string;
  difficulty?: string;
  isPaid?:     boolean;
}

// ─── Normaliser — flattens the nested backend shape ──────────────────────────
/**
 * Backend: { attempt: { _id, duration, ... }, questions, instructions, isResumed }
 * Output:  { attemptId, duration, questions, ..., isResumed }
 */
function normaliseStartTest(raw: any): StartTestResponse {
  console.log('📦 normaliseStartTest input:', raw);
  
  // Handle both: direct flat shape (future-proof) and nested shape (current)
  if (raw.attemptId) {
    console.log('✅ Already flat format');
    return raw as StartTestResponse;  // already flat
  }

  const a = raw.attempt ?? {};
  const normalized = {
    attemptId:      a._id ?? '',
    attemptNumber:  a.attemptNumber ?? 1,
    startTime:      a.startTime ?? new Date().toISOString(),
    duration:       a.duration ?? raw.duration ?? 0,
    totalQuestions: a.totalQuestions ?? raw.totalQuestions ?? 0,
    totalMarks:     a.totalMarks ?? raw.totalMarks ?? 0,
    questions:      raw.questions ?? [],
    instructions:   raw.instructions ?? [],
    isResumed:      raw.isResumed ?? false,
  };
  
  console.log('📤 normaliseStartTest output:', normalized);
  console.log('📊 Questions count:', normalized.questions.length);
  
  return normalized;
}

// ─── API ─────────────────────────────────────────────────────────────────────
export const mockTestApi = {
  getAll: (params?: MockTestListParams) =>
    apiClient.get<{ success: true; data: MockTestSummary[]; pagination: Pagination }>(
      '/mock-tests', { params }
    ),

  getById: (id: string) =>
    apiClient.get<{ success: true; data: MockTestDetail }>(`/mock-tests/${id}`),

  /**
   * Start or resume a test.
   * The raw response is normalised before returning so callers always
   * get a flat StartTestResponse regardless of backend shape changes.
   */
  startTest: async (id: string): Promise<{ data: { success: true; data: StartTestResponse } }> => {
    const res = await apiClient.post<{ success: true; data: any }>(`/mock-tests/${id}/start`);
    console.log('🔍 RAW BACKEND RESPONSE:', res.data);
    console.log('🔍 res.data.data:', res.data.data);
    
    const normalized = normaliseStartTest(res.data.data);
    
    console.log('🔍 FINAL NORMALIZED:', normalized);
    
    return {
      data: {
        success: true,
        data: normalized,
      },
    };
  },

  saveAnswer: (id: string, payload: SaveAnswerPayload) =>
    apiClient.patch<{ success: true; message: string }>(`/mock-tests/${id}/save-answer`, payload),

  submitTest: (id: string, payload: SubmitTestPayload) =>
    apiClient.post<{ success: true; data: SubmitTestResult }>(`/mock-tests/${id}/submit`, payload),

  getMyAttempts: (id: string) =>
    apiClient.get<{ success: true; data: any[] }>(`/mock-tests/${id}/my-attempts`),

  // Admin
  createMockTest: (payload: any) =>
    apiClient.post<{ success: true; data: MockTestDetail }>('/mock-tests', payload),

  updateMockTest: (id: string, payload: any) =>
    apiClient.put<{ success: true; data: MockTestDetail }>(`/mock-tests/${id}`, payload),

  deleteMockTest: (id: string) =>
    apiClient.delete<{ success: true }>(`/mock-tests/${id}`),
};