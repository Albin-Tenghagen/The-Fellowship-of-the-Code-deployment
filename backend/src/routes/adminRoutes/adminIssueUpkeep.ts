console.log("Issue upkeep router running....");
import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { usersSafetyInfo, userSafetyBody } from "types/types";

const authIssueUpkeepRouter = express.Router();

authIssueUpkeepRouter.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the adminIssueUpkeep Endpoint " });
});

//GET for seeing the current issues or potenial issues based on the monitoring of the water

//POST the current status of the potential issues

//POST Creating status or warnings for the public eye to see
//TODO The timestamp is off with 2 hours. it is in the wrong timezone
authIssueUpkeepRouter.post(
  "/publicWarning",
  async (req: usersSafetyInfo, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/userSafety.json");

    const newSafetyBody = {
      location: req.body.location,
      description: req.body.description,
      proactiveActions: {
        basementProtection: req.body.proactiveActions?.basementProtection,
        trenchDigging: req.body.proactiveActions?.trenchDigging,
        electricHazards: req.body.proactiveActions?.electricHazards,
      },
    };

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const issues = JSON.parse(jsonData);
      const date = new Date().toISOString();
      const formatedDate = date.replace("T", " ").replace("Z", " ");
      const publicIssue: userSafetyBody = {
        id: issues.length + 1001,
        timestamp: formatedDate,
        ...newSafetyBody,
      };

      issues.push(publicIssue);

      await writeFile(filePath, JSON.stringify(issues, null, 2));

      res.status(201).json({ message: "New safety issue added successfully" });
    } catch (error) {
      console.error("Error reading or writing the file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//PUT Modifying current issue

//DELETE for deleting irrelevant issues

export default authIssueUpkeepRouter;
