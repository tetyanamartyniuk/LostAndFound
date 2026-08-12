import z from "zod";

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

export type RegisterFormData = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
  email: z.email({ error: "Email is not valid" }),
  password: z
    .string()
    .min(8, { error: "Password must contain at least 8 characters" })
    .max(25, { error: "Password is too long" }),
});

export type LoginFormData = z.infer<typeof userLoginSchema>;

export const itemSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must contain at least 3 characters" })
    .max(25, { error: "Title is too long" }),
  description: z
    .string()
    .min(10, { error: "Description must contain at least 10 characters" })
    .max(255, { error: "Description is too long" }),
  place: z
    .string()
    .min(3, { error: "Place must contain at least 3 characters" })
    .max(255, { error: "Place is too long" }),
  foundAt: z.coerce
    .date()
    .refine((date) => date <= new Date(), "The date cannot be in the future"),
  status: z.enum(["lost", "found"], {
    error: "Status must be either 'lost' or 'found'",
  }),
  categoryId: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce.number().nullable(),
  ),
});

export const filtredByDateSchema = z
  .object({
    startDate: z.coerce
      .date()
      .refine((date) => date <= new Date(), "The date cannot be in the future"),
    endDate: z.coerce
      .date()
      .refine((date) => date <= new Date(), "The date cannot be in the future"),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "The start date cannot be later than the end date",
    path: ["startDate"],
  });

export const messageSchema = z.object({
  text: z.string().min(1),
});
