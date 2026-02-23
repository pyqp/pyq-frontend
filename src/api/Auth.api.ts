import apiClient from './Client';

// ── Shared types ──────────────────────────────────────────────────────────────
export interface User {
  _id:             string;
  name:            string;
  email:           string;
  phone?:          string;
  role:            'user' | 'admin' | 'partner';
  avatar?:         string;
  isEmailVerified: boolean;
  isActive:        boolean;
  referralCode:    string;
  credits: {
    total:       number;
    batches:     CreditBatch[];
    lastUpdated: string;
  };
  loyaltyPoints: {
    total:             number;
    level:             string;
    levelName:         string;
    pointsToNextLevel: number;
  };
  referralStats: {
    totalReferred: number;
    creditsEarned: number;
  };
  stats: {
    totalTestsTaken: number;
    totalTimeSpent:  number;
    averageScore:    number;
    bestScore:       number;
  };
  preferences: {
    targetExams:        string[];
    language:           string;
    emailNotifications: boolean;
    smsNotifications:   boolean;
  };
  createdAt: string;
}

export interface CreditBatch {
  batchId:          string;
  packageName:      string;
  creditsReceived:  number;
  creditsUsed:      number;
  creditsRemaining: number;
  purchaseDate:     string;
  expiryDate:       string;
  status:           'active' | 'expired' | 'depleted';
}

export interface AuthResponse {
  user:         User;
  accessToken:  string;
  refreshToken: string;
}

export interface RegisterPayload {
  name:          string;
  email:         string;
  password:      string;
  phone?:        string;
  referralCode?: string;
}

export interface LoginPayload {
  email:    string;
  password: string;
}

// ── API calls ─────────────────────────────────────────────────────────────────
export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post<{ success: true; data: AuthResponse }>('/auth/register', payload),

  login: (payload: LoginPayload) =>
    apiClient.post<{ success: true; data: AuthResponse }>('/auth/login', payload),

  logout: () =>
    apiClient.post('/auth/logout'),

  getMe: () =>
    apiClient.get<{ success: true; data: User }>('/auth/me'),

  refreshToken: (token?: string) =>
    apiClient.post<{ success: true; data: { accessToken: string } }>(
      '/auth/refresh-token',
      token ? { refreshToken: token } : {}
    ),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post(`/auth/reset-password/${token}`, { password }),

  verifyEmail: (token: string) =>
    apiClient.post('/auth/verify-email', { token }),

  resendVerification: () =>
    apiClient.post('/auth/resend-verification'),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.put('/auth/change-password', { currentPassword, newPassword }),
};