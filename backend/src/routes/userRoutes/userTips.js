console.log("tips router running....");
import express from "express";

const userTipsRouter = express.Router();

userTipsRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the userTips Endpoint." });
});

export default userTipsRouter;
