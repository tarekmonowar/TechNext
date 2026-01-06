import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema, loginUserZodSchema } from "./user.validations";
import { UserControllers } from "./user.controller";

const router = Router();

//Route api/v1/user/register
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser,
);

//Route api/v1/user/login
router.post(
  "/login",
  validateRequest(loginUserZodSchema),
  UserControllers.credentialsLogin,
);

//Route api/v1/user/logout
router.post("/logout", UserControllers.logout);

export const UserRoutes = router;
