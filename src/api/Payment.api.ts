import apiClient from './Client';
import type { Pagination } from './Exam.api';

export interface CreateOrderResponse {
  orderId:      string;
  amount:       number;
  currency:     string;
  razorpayKey:  string;
  package: {
    _id:     string;
    name:    string;
    credits: number;
  };
  discount?: {
    applied:    boolean;
    code:       string;
    amount:     number;
    percentage: number;
  };
}

export interface VerifyPaymentPayload {
  orderId:   string;
  paymentId: string;
  signature: string;
}

export interface VerifyPaymentResponse {
  creditsAdded:     number;
  newCreditBalance: number;
  paymentId:        string;
  transactionId:    string;
}

export interface Payment {
  _id:           string;
  orderId:       string;
  razorpayPaymentId?: string;
  amount:        number;
  currency:      string;
  status:        'created' | 'paid' | 'failed' | 'refunded';
  package:       { _id: string; name: string; credits: number };
  creditsAdded:  number;
  createdAt:     string;
}

export interface PaymentHistoryParams {
  page?:  number;
  limit?: number;
}

export const paymentApi = {
  createOrder: (packageId: string, offerCode?: string) =>
    apiClient.post<{ success: true; data: CreateOrderResponse }>(
      '/payments/create-order', { packageId, offerCode }
    ),

  verifyPayment: (payload: VerifyPaymentPayload) =>
    apiClient.post<{ success: true; data: VerifyPaymentResponse }>(
      '/payments/verify', payload
    ),

  getHistory: (params?: PaymentHistoryParams) =>
    apiClient.get<{ success: true; data: Payment[]; pagination: Pagination }>(
      '/payments/history', { params }
    ),

  getById: (id: string) =>
    apiClient.get<{ success: true; data: Payment }>(`/payments/${id}`),
};