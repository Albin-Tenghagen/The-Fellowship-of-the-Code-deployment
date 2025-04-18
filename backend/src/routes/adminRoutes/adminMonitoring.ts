console.log(" Monitoring router running....");
import express, { Request, Response, Router } from "express";
import { readFile } from "fs/promises";
import path from "path";

import authHistoricalMonitoringRouter from "./adminHistoricalMonitoring.js";
const authMonitoringRouter = express.Router();
authMonitoringRouter.use(
  "/historicalMonitoring",
  authHistoricalMonitoringRouter
);

//GET to monitor currnet data
authMonitoringRouter.get(
  "/",
  async (_req: Request, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/monitoring.json");
    const id = _req.params.id;
    const sortByDate = _req.params.timestamp;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const recentData = JSON.parse(jsonData);

      if (sortByDate) {
        //TODO if to allow timestamp params for the mätnings station
        //TODO sort and filtering madafaka(not proffesional)
      }

      if (id) {
        //TODO if to allow id params of the "mätnings station"
      }

      if (!recentData) {
        res.status(404).json({
          message:
            "The server could not find recent data, please try again later",
        });
        return;
      }

      res.status(200).json({
        message: "This is the recent data",
        recentData: recentData,
      });
      return;
    } catch (error) {
      console.error("Server error");
      res.status(500).json({ message: "SERVER monitoring ERROR" });
    }
  }
);

export default authMonitoringRouter;
