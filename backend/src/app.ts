import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import session from "express-session";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { router } from "./app/routes";
import { envVars } from "./app/config/env";
import { RedirectRoutes } from "./app/modules/redirect/redirect.route";

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(
  session({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

// Setting up routes
app.use("/api/v1", router);

//Public route for URl redirect
app.use("/", RedirectRoutes);

// Home route
app.get("/", (req: Request, res: Response) => {
  res.send("API Working with /api/v1 for TechNext-backEnd");
});

// Catch-all route for undefined routes
app.use(notFound);

// Middleware for error handling
app.use(globalErrorHandler);

export default app;
