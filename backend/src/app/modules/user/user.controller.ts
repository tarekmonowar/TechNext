import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import AppError from "../../error/AppError";

//*---------------------------------------------Create User----------------------------
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  },
);

//*---------------------------------------------Login User----------------------------

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError(400, "Email and password are required"));
    }

    const user = await UserServices.loginUser(email, password, res);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Log In Successfully",
      data: user,
    });
  },
);

//*---------------------------------------------Logout User----------------------------

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Out",
      data: null,
    });
  },
);

export const UserControllers = {
  createUser,
  credentialsLogin,
  logout,
};
