import { Response } from "express";
import { envVars } from "../config/env";

export interface AuthTokens {
  accessToken?: string;
}

export const setAuthCookies = (res: Response, tokenInfo: AuthTokens) => {
  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
};
