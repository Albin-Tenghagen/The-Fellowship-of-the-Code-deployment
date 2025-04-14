console.log("user router running....");
import express from "express";
import { Router } from "express";
// Import nested modules
import userTipsRouter from "./userTips";
import userRisksRouter from "./userRisks";
import userNotificationsRouter from "./userNotifications";
import userSafetyRouter from "./userSafety";

const userRouter: Router = express.Router(); // Define userRouter first!
console.log(typeof userRouter);

// Nested modules (without "/user" prefix since it's handled in server.ts)
userRouter.use("/tips", userTipsRouter);
userRouter.use("/risks", userRisksRouter);
userRouter.use("/notifications", userNotificationsRouter);
userRouter.use("/safety", userSafetyRouter);

userRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the user Endpoint." });
});

export default userRouter;
