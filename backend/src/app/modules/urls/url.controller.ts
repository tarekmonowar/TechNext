import { Request, Response, NextFunction } from "express";
import { UrlServices } from "./url.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";

//*---------------------------------------------Create URl----------------------------

const createShortUrl = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedToken = req.user;
    const url = await UrlServices.createShortUrl(
      verifiedToken as JwtPayload,
      req.body.originalUrl,
    );
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Short URL created successfully",
      data: url,
    });
  },
);

//*---------------------------------------------Delete  URl----------------------------
const deleteShortUrl = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedToken = req.user;
    await UrlServices.deleteShortUrl(
      verifiedToken as JwtPayload,
      req.params.id,
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "URL deleted successfully",
      data: null,
    });
  },
);

//*---------------------------------------------users all URl + stats----------------------------

const getUserUrls = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedToken = req.user;
    const data = await UrlServices.getUserUrls(verifiedToken as JwtPayload);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User URLs fetched successfully",
      data,
    });
  },
);

//*---------------------------------------------Admin all URl + stats----------------------------

const getAllUrls = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await UrlServices.getAllAdminUrls();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All URLs fetched successfully",
      data,
    });
  },
);

export const UrlControllers = {
  createShortUrl,
  deleteShortUrl,
  getUserUrls,
  getAllUrls,
};
