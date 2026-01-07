import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";
import { prisma } from "./app/config/db";
import { seedAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connected");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedAdmin();
})();

// DRY shutdown function
const shutdown = async (signal: string, reason?: any) => {
  console.log(`${signal} received`, reason || "");
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      console.log("Server closed gracefully");
      process.exit(1);
    });
  } else {
    await prisma.$disconnect();
    process.exit(1);
  }
};

// Error & shutdown handlers
process.on("unhandledRejection", (reason) =>
  shutdown("unhandledRejection", reason),
);
process.on("uncaughtException", (error) =>
  shutdown("uncaughtException", error),
);
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
