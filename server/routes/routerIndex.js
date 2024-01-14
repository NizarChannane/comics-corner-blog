import express from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import contactRouter from "./contactRouter.js"

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/contact", contactRouter);

export default router;