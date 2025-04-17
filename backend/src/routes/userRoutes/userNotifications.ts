console.log("notification router running....");
import express from "express";

const userNotificationsRouter = express.Router();

userNotificationsRouter.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the user notifications Endpoint." });
});

//GET for getting notifications about flood warnings

export default userNotificationsRouter;
