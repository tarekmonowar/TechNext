import { customAlphabet } from "nanoid";
import { prisma } from "../config/db";

const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const SHORT_CODE_LENGTH = 6;
const MAX_RETRIES = 10_000;

const nanoid = customAlphabet(ALPHABET, SHORT_CODE_LENGTH);

export const generateUniqueShortCode = async (): Promise<string> => {
  let code: string;
  let retries = 0;

  do {
    if (retries >= MAX_RETRIES) {
      throw new Error(
        "Unable to generate a unique short code. Too many collisions.",
      );
    }

    code = nanoid();
    retries++;
  } while (
    await prisma.shortUrl.findUnique({
      where: { shortCode: code },
    })
  );

  return code;
};
