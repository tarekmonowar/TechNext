import z from "zod";

//user register ZOD validations
export const createUserZodSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string({
      error: (issue) =>
        issue.code === "invalid_type" ? "Password must be a string" : undefined,
    })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
  phone: z
    .string({
      error: (issue) =>
        issue.code === "invalid_type"
          ? "Phone number must be a string"
          : undefined,
    })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message:
        "Phone number must be a valid international number in E.164 format",
    })
    .optional(),

  address: z
    .string({
      error: (issue) =>
        issue.code === "invalid_type" ? "Address must be a string" : undefined,
    })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
});

// Login schema
export const loginUserZodSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});
