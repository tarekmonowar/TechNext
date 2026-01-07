import { prisma } from "../../config/db";
import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { generateUniqueShortCode } from "../../utils/generateUniqueUrl";

//*--------------------------------------------------------- create new Url------------------------------------------------

const createShortUrl = async (
  decodedToken: JwtPayload,
  originalUrl: string,
) => {
  const userId = decodedToken.userId;
  if (!originalUrl) throw new AppError(400, "Original URL is required");

  //free tier limit
  const userUrlCount = await prisma.shortUrl.count({ where: { userId } });
  if (userUrlCount >= 100)
    throw new AppError(400, "Free tier limit reached. Please upgrade Plan");

  const shortCode = await generateUniqueShortCode();

  const url = await prisma.shortUrl.create({
    data: {
      originalUrl,
      shortCode,
      userId,
    },
  });
  return url;
};

//*--------------------------------------------------------- Delete Url------------------------------------------------

const deleteShortUrl = async (decodedToken: JwtPayload, urlId: string) => {
  const userId = decodedToken.userId;
  const userRole = decodedToken.role;

  const url = await prisma.shortUrl.findUnique({ where: { id: urlId } });

  if (!url) {
    throw new AppError(httpStatus.NOT_FOUND, "URL not found");
  }

  if (userRole === "user" && url.userId !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only delete your own URLs",
    );
  }
  await prisma.shortUrl.delete({ where: { id: urlId } });
};

//*----------------------------------------------------users all URl + stats----------------------------

const getUserUrls = async (decodedToken: JwtPayload) => {
  const userId = decodedToken.userId;
  const urls = await prisma.shortUrl.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);
  const avgClicks = totalUrls > 0 ? totalClicks / totalUrls : 0;
  const thisMonthUrls = urls.filter(
    (url) => new Date(url.createdAt).getMonth() === new Date().getMonth(),
  ).length;

  return {
    urls,
    overview: { totalUrls, totalClicks, avgClicks, thisMonthUrls },
  };
};

//*----------------------------------------------------Admin all URl + stats----------------------------

const getAllAdminUrls = async () => {
  const urls = await prisma.shortUrl.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const totalUrls = urls.length;
  const totalUsers = (await prisma.user.findMany()).length;
  const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);
  const avgClicks = totalUrls > 0 ? totalClicks / totalUrls : 0;

  // Weekly chart: last 7 days clicks
  const today = new Date();
  const weeklyClicks = Array.from({ length: 7 })
    .map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const count = urls
        .filter((u) => u.createdAt.toDateString() === date.toDateString())
        .reduce((sum, u) => sum + u.clicks, 0);
      return { date: date.toISOString().split("T")[0], clicks: count };
    })
    .reverse();

  // Weekly users: new users per day
  const users = await prisma.user.findMany();
  const weeklyUsers = Array.from({ length: 7 })
    .map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const count = users.filter(
        (u) => u.createdAt.toDateString() === date.toDateString(),
      ).length;
      return { date: date.toISOString().split("T")[0], users: count };
    })
    .reverse();

  return {
    urls,
    overview: { totalUrls, totalUsers, totalClicks, avgClicks },
    chartData: { weeklyClicks, weeklyUsers },
  };
};

export const UrlServices = {
  createShortUrl,
  deleteShortUrl,
  getUserUrls,
  getAllAdminUrls,
};
