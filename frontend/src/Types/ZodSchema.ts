import z from "zod";

// Zod schema for registration
export const registerUserSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z
    .email()
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email cannot exceed 100 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Z])/, "Password must contain at least 1 uppercase letter")
    .regex(
      /^(?=.*[!@#$%^&*])/,
      "Password must contain at least 1 special character",
    )
    .regex(/^(?=.*\d)/, "Password must contain at least 1 number"),
});

// Zod schema for login
export const loginUserSchema = z.object({
  email: z
    .email()
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email cannot exceed 100 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Z])/, "Password must contain at least 1 uppercase letter")
    .regex(
      /^(?=.*[!@#$%^&*])/,
      "Password must contain at least 1 special character",
    )
    .regex(/^(?=.*\d)/, "Password must contain at least 1 number"),
});

// Update profile schema with confirm password
export const updateUserZodSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .optional(),
    email: z
      .string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters")
      .max(100, "Email cannot exceed 100 characters")
      .optional(),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Password must be at least 8 characters",
      })
      .refine((val) => !val || /[A-Z]/.test(val), {
        message: "Password must contain at least 1 uppercase letter",
      })
      .refine((val) => !val || /[!@#$%^&*]/.test(val), {
        message: "Password must contain at least 1 special character",
      })
      .refine((val) => !val || /\d/.test(val), {
        message: "Password must contain at least 1 number",
      }),

    confirmPassword: z.string().optional(),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
        "Phone number must be valid E.164 format",
      ),
    address: z
      .string()
      .max(200, "Address cannot exceed 200 characters")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.password) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );
