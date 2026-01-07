import { nanoid } from "nanoid";
import { prisma } from "../config/db";

const SHORT_CODE_LENGTH = 6;
const MAX_RETRIES = 10_000;

export const generateUniqueShortCode = async (): Promise<string> => {
  let code: string;
  let retries = 0;

  try {
    do {
      if (retries >= MAX_RETRIES) {
        throw new Error(
          "Unable to generate a unique short code. Too many collisions.",
        );
      }
      code = nanoid(SHORT_CODE_LENGTH);
      retries++;
    } while (await prisma.shortUrl.findUnique({ where: { shortCode: code } }));

    return code;
  } catch (error) {
    console.error("Error generating unique short code:", error);
    throw new Error("Failed to generate unique short code. Please try again.");
  }
};
