export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profileImage?: string;
  phone?: string;
  address?: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  totalUrls: number;
  totalClicks: number;
}
