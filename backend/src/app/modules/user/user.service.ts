import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { prisma } from "../../config/db";
import { envVars } from "../../config/env";
import AppError from "../../error/AppError";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookies } from "../../utils/setCookies";
import { User } from "../../../../generated/prisma/client";
import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";

//*--------------------------------------------------------- create user------------------------------------------------
const createUser = async (payload: Partial<User>) => {
  const { email, password, fullName, ...rest } = payload;

  if (!email || !password || !fullName) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Missing required fields: fullName, email, or password",
    );
  }

  const isUserExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: email.toLowerCase() }],
    },
  });

  if (isUserExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User Already Exist , Please Login",
    );
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      ...rest,
    },
  });
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

//*--------------------------------------------------------- login user------------------------------------------------
const loginUser = async (email: string, password: string, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const match = await bcryptjs.compare(password, user.password as string);

  if (!match) {
    throw new AppError(401, "Invalid email or password");
  }

  const userTokens = await createUserTokens(user);

  setAuthCookies(res, userTokens);

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

//*--------------------------------------------------------- get own profile------------------------------------------------
const getProfile = async (decodedToken: JwtPayload) => {
  const id = decodedToken.userId;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      createdAt: true,
    },
  });

  if (!user) throw new AppError(404, "User not found");
  return user;
};

//*--------------------------------------------------------- update own profile------------------------------------------------
const updateProfile = async (
  decodedToken: JwtPayload,
  payload: Partial<{
    fullName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }>,
) => {
  const data: any = { ...payload };

  // If updating password, hash it
  if (data.password) {
    data.password = await bcryptjs.hash(
      data.password,
      Number(envVars.BCRYPT_SALT_ROUND),
    );
  }

  const id = decodedToken.userId;

  const updatedUser = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      createdAt: true,
    },
  });

  return updatedUser;
};

//*--------------------------------------------------------- get all users by admin------------------------------------------------

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
      urls: {
        select: {
          clicks: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const usersWithStats = users.map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    totalUrls: user.urls.length,
    totalClicks: user.urls.reduce((sum, url) => sum + url.clicks, 0),
  }));

  return usersWithStats;
};

//All exports
export const UserServices = {
  createUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
};
