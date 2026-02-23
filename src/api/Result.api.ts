import apiClient from './Client';
import type { Pagination } from './Exam.api';

// ── Matches what GET /results/my-results and GET /results/:resultId return ────
export interface ResultSummary {
  _id:              string;
  mockTest:         { _id: string; name: string; slug: string; difficulty?: string };
  finalScore:       number;   // backend field name
  score?:           number;   // alias — some endpoints use this
  totalMarks:       number;
  percentage:       number;
  correct:          number;
  incorrect:        number;
  unattempted:      number;
  accuracy:         number;
  timeTaken:        number;
  rank?:            number;
  percentile?:      number;
  totalParticipants?: number;
  attemptNumber:    number;
  isFirstAttempt:   boolean;
  createdAt:        string;
}

export interface SubjectPerf {
  subject:        string;
  correct:        number;
  incorrect:      number;
  unattempted:    number;
  totalQuestions: number;
  score:          number;
  accuracy:       number;
  timeSpent:      number;
  topics:         Array<{ topic: string; total: number; correct: number }>;
}

// ── Matches what GET /results/:resultId/analytics returns ─────────────────────
export interface ResultAnalytics {
  overview: {
    score:            number;
    totalMarks:       number;
    percentage:       number;
    rank?:            number;
    percentile?:      number;
    totalParticipants?: number;
    correct:          number;
    incorrect:        number;
    unattempted:      number;
    accuracy:         number;
    timeTaken:        number;
    avgTimePerQuestion?: number;
  };
  comparison: {
    averageScore: number;
    topScore:     number;
    top10Cutoff:  number;
    aboveAverage: number;
    gapToTop10:   number;
  };
  subjectPerformance:   SubjectPerf[];
  difficultyPerformance: {
    easy:   { total: number; attempted: number; correct: number };
    medium: { total: number; attempted: number; correct: number };
    hard:   { total: number; attempted: number; correct: number };
  };
  strengthsWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
  questionAnalysis: Array<{
    questionNumber: number;
    subject:        string;
    topic:          string;
    difficulty:     string;
    userAnswer:     number | null;
    correctAnswer:  number;
    isCorrect:      boolean;
    timeSpent:      number;
  }>;
  progress: Array<{
    attemptNumber: number;
    score:         number;
    percentage:    number;
    accuracy:      number;
    timeTaken:     number;
    date:          string;
  }>;
  // Populated from parent result
  mockTest?: { name: string; totalMarks: number; totalQuestions: number; duration: number };
}

export interface ResultListParams {
  page?:  number;
  limit?: number;
}

export const resultApi = {
  // GET /results/my-results  (NOT /results — that 404s)
  getAll: (params?: ResultListParams) =>
    apiClient.get<{ success: true; data: ResultSummary[]; pagination: Pagination }>(
      '/results/my-results', { params }
    ),

  getById: (id: string) =>
    apiClient.get<{ success: true; data: ResultSummary }>(`/results/${id}`),

  getAnalytics: (id: string) =>
    apiClient.get<{ success: true; data: ResultAnalytics }>(`/results/${id}/analytics`),

  downloadScorecard: (id: string) =>
    apiClient.get(`/results/${id}/scorecard`, { responseType: 'blob' }),
};