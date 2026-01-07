export interface ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  userId?: string;
  user?: {
    fullName: string;
    email: string;
  };
}

export interface UrlOverview {
  totalUrls: number;
  totalClicks: number;
  avgClicks: number;
  thisMonthUrls?: number;
  totalUsers?: number;
}

export interface WeeklyClicks {
  date: string;
  clicks: number;
}

export interface WeeklyUsers {
  date: string;
  users: number;
}

export interface UserUrlsResponse {
  urls: ShortUrl[];
  overview: UrlOverview;
}

export interface AdminUrlsResponse {
  urls: ShortUrl[];
  overview: UrlOverview;
  chartData: {
    weeklyClicks: WeeklyClicks[];
    weeklyUsers: WeeklyUsers[];
  };
}
