import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RedirectServices } from "./redirect.service";

//*---------------------------------------------User redirect to orginal----------------------------

const redirectToOriginal = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { shortCode } = req.params;

    const originalUrl = await RedirectServices.redirectToOriginal(shortCode);
    return res.redirect(302, originalUrl);
  },
);

export const RedirectControllers = {
  redirectToOriginal,
};
