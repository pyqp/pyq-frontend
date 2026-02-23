// Central barrel — import from here in components
export { apiClient }        from './Client';
export { authApi }          from './Auth.api';
export { examApi }          from './Exam.api';
export { mockTestApi }      from './Mocktest.api';
export { packageApi }       from './Package.api';
export { paymentApi }       from './Payment.api';
export { resultApi }        from './Result.api';
export { userApi }          from './User.api';

// Re-export commonly-used types
export type { User, CreditBatch, AuthResponse, RegisterPayload, LoginPayload } from './Auth.api';
export type { Exam, ExamListParams, Pagination }                               from './Exam.api';
export type { MockTestSummary, MockTestDetail, Question, StartTestResponse,
              SaveAnswerPayload }                                               from './Mocktest.api';
export type { Package }                                                        from './Package.api';
export type { CreateOrderResponse, VerifyPaymentPayload,
              VerifyPaymentResponse, Payment }                                  from './Payment.api';
export type { ResultSummary, ResultAnalytics, SubjectPerf }                    from './Result.api';
export type { DashboardData, UpdateProfilePayload }                            from './User.api';