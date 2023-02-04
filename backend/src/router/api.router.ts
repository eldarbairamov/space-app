import { Router } from "express";
import { planRouter, authRouter, userRouter, notesRouter, taskRouter } from "../router";

export const apiRouter = Router()

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/notes", notesRouter);
apiRouter.use("/plans", planRouter);
apiRouter.use("/tasks", taskRouter);