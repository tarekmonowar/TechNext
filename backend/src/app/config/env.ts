import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DATABASE_URL: string;
  NODE_ENV: "development" | "production";
  FRONTEND_URL: string;
  EXPRESS_SESSION_SECRET: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  BCRYPT_SALT_ROUND: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DATABASE_URL",
    "NODE_ENV",
    "FRONTEND_URL",
    "EXPRESS_SESSION_SECRET",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "BCRYPT_SALT_ROUND",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
  };
};
export const envVars = loadEnvVariables();
