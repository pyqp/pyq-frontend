import apiClient from './Client';
import type { User } from './Auth.api';
import type { Pagination } from './Exam.api';
import type { ResultSummary } from './Result.api';

export interface UpdateProfilePayload {
  name?:   string;
  phone?:  string;
  avatar?: string;
}

export interface UpdatePreferencesPayload {
  targetExams?:        string[];
  language?:           string;
  emailNotifications?: boolean;
  smsNotifications?:   boolean;
}

export interface DashboardData {
  user:          { name: string; email: string; avatar?: string; role: string };
  credits: {
    total:        number;
    active:       number;
    expiringSoon: number;
    batches:      Array<{
      batchId:     string;
      packageName: string;
      remaining:   number;
      expiryDate:  string;
    }>;
  };
  stats:         User['stats'];
  recentResults: ResultSummary[];
  loyaltyPoints: User['loyaltyPoints'];
  referrals: {
    totalReferred:      number;
    totalPurchased:     number;
    creditsEarned:      number;
    bonusCreditsEarned: number;
  };
}

export interface CreditTransaction {
  _id:           string;
  type:          'credit' | 'debit';
  amount:        number;
  balanceBefore: number;
  balanceAfter:  number;
  source:        string;
  description:   string;
  createdAt:     string;
}

export const userApi = {
  getProfile: () =>
    apiClient.get<{ success: true; data: User }>('/users/profile'),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiClient.put<{ success: true; data: User }>('/users/profile', payload),

  updatePreferences: (payload: UpdatePreferencesPayload) =>
    apiClient.put<{ success: true; data: User['preferences'] }>('/users/preferences', payload),

  getDashboard: () =>
    apiClient.get<{ success: true; data: DashboardData }>('/users/dashboard'),

  getTestHistory: (params?: { page?: number; limit?: number }) =>
    apiClient.get<{ success: true; data: ResultSummary[]; pagination: Pagination }>(
      '/users/test-history', { params }
    ),

  uploadAvatar: (file: File) => {
    const form = new FormData();
    form.append('avatar', file);
    return apiClient.post<{ success: true; data: { avatarUrl: string } }>(
      '/users/avatar', form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  },
};