import express, { Request, Response } from "express";
import morgan from "morgan";
import { initDB } from "./database/db";
import { accessLogStream } from "./middleware/logger";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";

const app = express();
app.use(express.json());
app.use(morgan("combined",{stream: accessLogStream}));
initDB();


app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth",authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "get request at 5000",
    path: req.path,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
