import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { prisma } from "../../config/db";
import { envVars } from "../../config/env";
import AppError from "../../error/AppError";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookies } from "../../utils/setCookies";
import { User } from "../../../../generated/prisma/client";
import { Response } from "express";

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

//All exports
export const UserServices = {
  createUser,
  loginUser,
};
