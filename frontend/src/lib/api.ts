import { toast } from "sonner";
import { ApiResponse } from "../Types/apiTypes";
import { AdminUser, User } from "../Types/userTypes";
import {
  AdminUrlsResponse,
  ShortUrl,
  UserUrlsResponse,
} from "../Types/urlTypes";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const data = await res.json();
  if (!res.ok) {
    console.error("API Error:", data);
    toast("API Error", {
      description: data.message || "Something went wrong",
    });
    throw new Error(data.message || "API Error");
  }
  return data;
}

// ------------------- User API -------------------
export const UserAPI = {
  register: async (payload: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<User>> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return handleResponse<User>(res);
  },

  login: async (payload: { email: string; password: string }) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return handleResponse<User>(res);
  },

  logout: async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    return handleResponse<null>(res);
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/profile`, {
      method: "GET",
      credentials: "include",
    });

    return handleResponse<User>(res);
  },

  updateProfile: async (
    payload: Partial<{
      fullName: string;
      email: string;
      password: string;
      phone: string;
      address: string;
    }>,
  ): Promise<ApiResponse<User>> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return handleResponse<User>(res);
  },

  getAllUsers: async (): Promise<ApiResponse<AdminUser[]>> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/allUsers`, {
      method: "GET",
      credentials: "include",
    });
    return handleResponse<AdminUser[]>(res);
  },
};

// ------------------- URl API -------------------

export const UrlAPI = {
  create: async (originalUrl: string): Promise<ApiResponse<ShortUrl>> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ originalUrl }),
    });
    return handleResponse<ShortUrl>(res);
  },

  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/url/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return handleResponse<{ message: string }>(res);
  },

  getUserUrls: async (): Promise<ApiResponse<UserUrlsResponse>> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/url`, {
      method: "GET",
      credentials: "include",
    });
    return handleResponse<UserUrlsResponse>(res);
  },

  getAllUrls: async (): Promise<ApiResponse<AdminUrlsResponse>> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/url/allUrls`, {
      method: "GET",
      credentials: "include",
    });
    return handleResponse<AdminUrlsResponse>(res);
  },
};
