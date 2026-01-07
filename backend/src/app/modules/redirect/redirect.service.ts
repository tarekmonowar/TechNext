import { prisma } from "../../config/db";
import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";

//*--------------------------------------------------------- Delete Url------------------------------------------------

const redirectToOriginal = async (shortCode: string) => {
  const url = await prisma.shortUrl.findUnique({
    where: { shortCode },
  });
  if (!url) {
    throw new AppError(httpStatus.NOT_FOUND, "URL not found");
  }

  await prisma.shortUrl.update({
    where: { id: url.id },
    data: { clicks: { increment: 1 } },
  });
  return url.originalUrl;
};

export const RedirectServices = {
  redirectToOriginal,
};
