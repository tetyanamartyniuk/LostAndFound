import { start } from "node:repl";
import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email({ error: "Email is not valid" }),
  password: z
    .string()
    .min(8, { error: "Password must contain at least 8 characters" })
    .max(25, { error: "Password is too long" }),
  username: z
    .string()
    .min(3, { error: "Username must contain at least 3 characters" })
    .max(55, { error: "Username is too long" })
    .regex(/^[A-Za-z]+$/),
});

export const userLoginSchema = z.object({
  email: z.email({ error: "Email is not valid" }),
  password: z
    .string()
    .min(8, { error: "Password must contain at least 8 characters" })
    .max(25, { error: "Password is too long" }),
});

export const itemSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must contain at least 3 characters" })
    .max(25, { error: "Title is too long" }),
  description: z
    .string()
    .min(10, { error: "Description must contain at least 10 chars" })
    .max(255, { error: "Description is too long" }),
  place: z
    .string()
    .min(3, { error: "Place must contain at least 3 chars" })
    .max(255, { error: "Place is too long" }),
  foundAt: z.coerce
    .date()
    .refine(
      (date) => date <= new Date(),
      "Дата не може бути в майбутньмоу бро",
    ),
  status: z.enum(["lost", "found"], {
    error: "Status must be either 'lost' or 'found'",
  }),
});

export const filtredByDateSchema = z.object({
  startDate: z.coerce
    .date()
    .refine(
      (date) => date <= new Date(),
      "Дата не може бути в майбутньмоу бро",
    ),
  endDate: z.coerce
    .date()
    .refine(
      (date) => date <= new Date(),
      "Дата не може бути в майбутньмоу бро",
    ),
});
