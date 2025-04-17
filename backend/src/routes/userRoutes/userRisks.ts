console.log("userRisks router running....");
import express from "express";

const userRisksRouter = express.Router();

// Define routes
userRisksRouter.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to the userRisks Endpoint." });
});

//GET for fetching general data for risk assessments and floodwarnings and water levels.

export default userRisksRouter;
