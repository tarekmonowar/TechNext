import bcryptjs from "bcryptjs";
import { Role } from "../../../generated/prisma/client";
import { prisma } from "../config/db";
import { envVars } from "../config/env";

const adminEmail = "admin12@gmail.com";
const adminPassword = "Admin1234@";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    console.log("🚀 Creating admin user...");

    const hashedPassword = await bcryptjs.hash(
      adminPassword,
      Number(envVars.BCRYPT_SALT_ROUND),
    );

    await prisma.user.create({
      data: {
        fullName: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: Role.admin,
        provider: "credentials",
      },
    });

    console.log(" Admin created successfully");
  } catch (error) {
    console.error("Failed to seed admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};
