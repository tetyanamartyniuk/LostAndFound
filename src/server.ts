import "reflect-metadata";
import "dotenv/config";

import express, {
  type ErrorRequestHandler,
  type NextFunction,
  type Response,
  type Request,
} from "express";
import userRouter from "./routes/userRoutes.js";
import { CustomError } from "./exceptions/CustomError.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import multer from "multer";
import { adminRouter } from "./routes/adminRoutes.js";
import { categoryRouter } from "./routes/adminRoutes.js";

const app = express();

app.use(express.urlencoded({ extended: true })); // Для звичайних HTML-форм
app.use(cookieParser()); //має стояти вище усіх роутів

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/main-page", (req: Request, res: Response) => {
  res.render("main-page");
});

app.use("/user", userRouter);
app.use("/", authRouter);
app.use("/items", itemRouter);
app.use("/admin", adminRouter);
app.use("/category", categoryRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Сторінку не знайдено" });
});

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.set("view engine", "ejs");

const errorHandler: ErrorRequestHandler = (
  //в TypeScript типізувати треба через змінну(, просто app.use не можна
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    console.log(err.message);
    return res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
  if (err instanceof Error) {
    console.error("SYSTEM ERROR:", err.stack);
    console.log("ТИ лох");
    console.log(err);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR 66",
    });
  }
  console.error("UNEXPECTED ERROR TYPE:", err);
  return res.status(500).json({
    message: "Something went completely wrong",
  });
};

app.use(errorHandler);

app.listen(8080, () => {
  console.log("http://localhost:8080");
});
