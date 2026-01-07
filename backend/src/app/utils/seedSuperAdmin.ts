import bcryptjs from "bcryptjs";
import { Role } from "../../../generated/prisma/client";
import { prisma } from "../config/db";
import { envVars } from "../config/env";

// Demo credentials
const adminEmail = "admin12@gmail.com";
const adminPassword = "Admin1234@";

const userEmail = "user@gmail.com";
const userPassword = "User1234@";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      console.log("Creating admin user...");

      const hashedAdminPassword = await bcryptjs.hash(
        adminPassword,
        Number(envVars.BCRYPT_SALT_ROUND),
      );

      await prisma.user.create({
        data: {
          fullName: "Super Admin",
          email: adminEmail,
          password: hashedAdminPassword,
          role: Role.admin,
          provider: "credentials",
        },
      });

      console.log("Admin created successfully");
    } else {
      console.log("Admin already exists");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      console.log("Creating demo user...");

      const hashedUserPassword = await bcryptjs.hash(
        userPassword,
        Number(envVars.BCRYPT_SALT_ROUND),
      );

      await prisma.user.create({
        data: {
          fullName: "Demo User",
          email: userEmail,
          password: hashedUserPassword,
          role: Role.user,
          provider: "credentials",
        },
      });

      console.log("Demo user created successfully");
    } else {
      console.log("Demo user already exists");
    }
  } catch (error) {
    console.error("Failed to seed users:", error);
  } finally {
    await prisma.$disconnect();
  }
};
