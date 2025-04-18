console.log("Infrastructure router running....");
import express, { Request, Response, Router } from "express";
import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { infrastructureRequest } from "types/types";

const authInfrastructureRouter = express.Router();

//GET get the current infrastructure issues or warnings

authInfrastructureRouter.get(
  "/",
  async (_req: Request, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/infrastructure.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const infrastructureData = JSON.parse(jsonData);

      if (!infrastructureData) {
        res.status(404).json({
          message:
            "The server could not find the infrastructure data please try again later",
        });
        return;
      }

      res.status(200).json({
        message: "This is the infrastructure data",
        infrastructureData: infrastructureData,
      });
      return;
    } catch (error) {
      console.error("Server error");
      res.status(500).json({ message: "SERVER Infrastructure ERROR" });
      return;
    }
  }
);

//POST for alerting for issues in infrastructure as in översvämmade gator or smth also for userss to enjoy

authInfrastructureRouter.post(
  "/postInfrastructure",
  async (req: infrastructureRequest, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/infrastructure.json");

    const { timestamp, problem } = req.body;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const infrastructureData = JSON.parse(jsonData);

      if (!timestamp || !problem) {
        res.status(400).json({
          message: "All values are required",
        });
        return;
      }

      const newInfrastructureData = {
        id: infrastructureData.length + 1001,
        timestamp,
        problem,
      };
      console.log(newInfrastructureData);
      infrastructureData.push(newInfrastructureData);

      fs.writeFileSync(
        filePath,
        JSON.stringify(infrastructureData, null, 2),
        "utf-8"
      );
      res.status(201).json({
        message: "New infrastructure data added.",
      });
      return;
    } catch (error) {
      console.log("Server error");
      res.status(500).json({
        message: "SeThere was a major internet breakdown, sorry...",
      });
    }
  }
);

export default authInfrastructureRouter;
