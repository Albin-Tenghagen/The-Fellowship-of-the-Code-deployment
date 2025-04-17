console.log("Historical monitoring router running....");
import express from "express";

const authHistoricalMonitoringRouter = express.Router();

authHistoricalMonitoringRouter.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the adminHistoricalMonitoring Endpoint." });
});

//GET to acces historical data

export default authHistoricalMonitoringRouter;
