console.log("Issue upkeep router running....");
import express from "express";

const authIssueUpkeepRouter = express.Router();

authIssueUpkeepRouter.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the adminIssueUpkeep Endpoint " });
});

//GET for seeing the current issues or potenial issues based on the monitoring of the water

//POST the current status of the potential issues

//POST Creating status or warnings for the public eye to see

//PUT Modifying current issue

//DELETE for deleting irrelevant issues

export default authIssueUpkeepRouter;
