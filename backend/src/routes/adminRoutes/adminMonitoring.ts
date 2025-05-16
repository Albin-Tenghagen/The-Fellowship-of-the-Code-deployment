console.log(" Monitoring router running....");
import express, { Request, Response, Router } from "express";
import { readFile } from "fs/promises";
import path from "path";

import { StationRequest } from "types/types.ts";
import { MonitoringEntry } from "types/types.ts";

const authMonitoringRouter = express.Router();

//GET to monitor currnet data (last two weeks)
authMonitoringRouter.get(
  "/",
  async (_req: StationRequest, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/monitoring.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const recentData: MonitoringEntry[] = JSON.parse(jsonData);

      if (!recentData) {
        res.status(404).json({
          message:
            "The server could not find recent data, please try again later",
        });
        return;
      }

      const twoWeeksAgo: number = Date.now() - 14 * 24 * 60 * 60 * 1000;

      let filteredData: MonitoringEntry[] = recentData.filter((entry) => {
        const entryTime = new Date(entry.timestamp).getTime();
        return entryTime >= twoWeeksAgo;
      });

      filteredData.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      res.status(200).json({
        message: "This is the recent data from the last 2 weeks",
        data: filteredData,
      });
      return;
    } catch (error) {
      console.error("Server error", error);
      res.status(500).json({ message: "SERVER monitoring ERROR" });
    }
  }
);

//GET to acces historical data (all the existing)
authMonitoringRouter.get(
  "/historicalMonitoring",
  async (_req: Request, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/monitoring.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const monitoredData = JSON.parse(jsonData);

      if (!monitoredData) {
        res.status(404).json({
          message:
            "The server could not find the monitored data, please try again later",
        });
      }

      res.status(200).json({
        message: "This is the monitored Data",
        monitoredData: monitoredData,
      });
      return;
    } catch (error) {
      console.error("Server error");
      res.status(500).json({ message: "SERVER Monitoring ERROR" });
      return;
    }
  }
);

export default authMonitoringRouter;
