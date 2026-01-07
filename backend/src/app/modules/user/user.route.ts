import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createUserZodSchema,
  loginUserZodSchema,
  updateUserZodSchema,
} from "./user.validations";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

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

//Route api/v1/user/profile
router.get(
  "/profile",
  checkAuth(...Object.values(Role)),
  UserControllers.getProfile,
);

//Route api/v1/user/profile
router.put(
  "/profile",
  checkAuth(...Object.values(Role)),
  validateRequest(updateUserZodSchema),
  UserControllers.updateProfile,
);

//Route api/v1/user/allUsers (admin)
router.get("/allUsers", checkAuth(Role.admin), UserControllers.getAllUsers);

export const UserRoutes = router;
