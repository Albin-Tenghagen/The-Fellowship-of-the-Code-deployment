console.log("Issue upkeep router running....");
import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { usersSafetyInfo, userSafetyBody } from "types/types";

const authIssueUpkeepRouter = express.Router();

authIssueUpkeepRouter.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the adminIssueUpkeep Endpoint " });
});
// * potential additional endpoints
// //GET for seeing the current issues or potenial issues based on the monitoring of the water

// //POST the current status of the potential issues

//POST Creating status or warnings for the public eye to see
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

      const swedenTime = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Europe/Stockholm",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());

      // Format it like "YYYY-MM-DD HH:mm:ss"
      const [datePart, timePart] = swedenTime.split(", ");
      const formatedDate = `${datePart} ${timePart}`;

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
authIssueUpkeepRouter.put(
  "/publicWarning/:id",
  async (req: usersSafetyInfo, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/userSafety.json");
    const { timestamp, location, description, proactiveActions } = req.body;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const issues: userSafetyBody[] = JSON.parse(jsonData);

      const index = issues.findIndex((issue) => issue.id === id);
      if (index == -1) {
        res.status(404).json({ message: "issue not found " });
        return;
      }

      issues[index].location = location;
      issues[index].description = description;
      issues[index].proactiveActions = proactiveActions;

      await writeFile(filePath, JSON.stringify(issues, null, 2), "utf-8");
      res.status(200).json({ message: "issue updated!", issues: issues });
      return;
    } catch (error) {
      console.error("server error", error);
      res
        .status(500)
        .json({ message: "There was a major internet breakdown, sorry..." });
      return;
    }
  }
);
//DELETE for deleting irrelevant issues
authIssueUpkeepRouter.delete(
  "/publicWarning/:id",
  async (req: usersSafetyInfo, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/userSafety.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const issues: userSafetyBody[] = JSON.parse(jsonData);

      const index = issues.findIndex((issue) => issue.id === id);
      if (index === -1) {
        res.status(404).json({ message: "Issue not found..." });
        return;
      }
      if (!issues) {
        res.status(404).json({
          message:
            "The server could not find the issues, please try again later",
        });
        return;
      }
      const lessIssues = issues.splice(index, 1);
      console.log(lessIssues);
      await writeFile(filePath, JSON.stringify(issues, null, 2), "utf-8");
      res
        .status(200)
        .json({ message: "Issue deleted!", lessIssues: lessIssues });
      return;
    } catch (error) {
      console.error("server error", error);
      res
        .status(500)
        .json({ message: "There was a major internet breakdown, sorry..." });
      return;
    }
  }
);

export default authIssueUpkeepRouter;
