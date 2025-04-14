console.log("adminAuth router running....");
import express from "express";

// Import nested modules
import authMonitoringtRouter from "./adminMonitoring";
import authInfrastructureRouter from "./adminInfrastructure";

import authIssueUpkeepRouter from "./adminIssueUpkeep";

const adminAuthRouter = express.Router(); // Define adminAuthRouter first!

// Nested modules (without "/user" prefix since it's handled in server.ts)
adminAuthRouter.use("/authenticated/monitoring", authMonitoringtRouter);
adminAuthRouter.use(
  "/authenticated/infrastructureIssues",
  authInfrastructureRouter
);
adminAuthRouter.use("/authenticated/issueUpkeep", authIssueUpkeepRouter);

adminAuthRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the adminAuth Endpoint." });
});

export default adminAuthRouter;
