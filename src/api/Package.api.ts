import apiClient from './Client';

export interface Package {
  _id:          string;
  name:         string;
  slug:         string;
  description:  string;
  price:        number;
  originalPrice?: number;
  credits:      number;
  validityDays: number;
  features:     string[];
  isPopular:    boolean;
  isActive:     boolean;
  displayOrder: number;
  discountPercent?: number;
}

export interface PackageComparison {
  packages:  Package[];
  features:  string[];
}

export const packageApi = {
  getAll: () =>
    apiClient.get<{ success: true; data: Package[] }>('/packages'),

  getPopular: () =>
    apiClient.get<{ success: true; data: Package }>('/packages/popular'),

  getCompare: () =>
    apiClient.get<{ success: true; data: PackageComparison }>('/packages/compare'),

  getById: (id: string) =>
    apiClient.get<{ success: true; data: Package }>(`/packages/${id}`),
};