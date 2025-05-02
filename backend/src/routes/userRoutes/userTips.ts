console.log("tips router running....");
import express, { Request, Response, Router } from "express";
import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";

import { userTipObject, TipBody } from "../../types/types.ts";
import { validateUserTips } from "../../validators/tipsValidation.ts";
import { timestampCreation } from "../../middleware/timestampCreation.ts";


const userTipsRouter: Router = express.Router();

interface TipRequest extends Request<{ id: string }, any, TipBody> {}

userTipsRouter.get(
  "/",
  async (_req: TipRequest, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/tips.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const tips = JSON.parse(jsonData);
      console.log(tips);

      if (!tips) {
        res.status(404).json({
          message: "The server could not find the tips, please try again later",
        });
        return;
      }

      res.status(200).json({
        message: "Here are the currently available tips:",
        tips: tips,
      });
      return;
    } catch (error) {
      console.error("Server error");
      res.status(500).json({ message: "SERVER SERVER ERROR" });
      return;
    }
  }
);

userTipsRouter.post(
  "/postTip",
  async (req: TipRequest, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/tips.json");

    const { location, description, user } = req.body;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const tips = JSON.parse(jsonData);

      if ( !location || !description || !user) {
        res.status(400).json({ Error: "All values are required" });
        return;
      }

      const newTip = {
        id: tips.length + 1001,
        timestamp: timestampCreation(),
        location,
        description,
        user,
      };
      try {
        const validatedTip = await validateUserTips(newTip);
        console.log("validatedTip : ", validatedTip);
        tips.push(validatedTip);
      } catch (error) {
        console.error("Error: ", error);
        res.status(400).json({
          message: "Validation failed",
          details: error,
        });
        return;
      }

      fs.writeFileSync(filePath, JSON.stringify(tips, null, 2), "utf-8");
      res
        .status(201)
        .json({ message: "Tips added", tips: tips, newtip: newTip });
      return;
    } catch (error) {
      console.error("Server error ");
      res
        .status(500)
        .json({ message: "There was a major internet breakdown, sorry..." });
      return;
    }
  }
);

//PUT
userTipsRouter.put(
  "/putTip/:id",
  async (req: TipRequest, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/tips.json");

    const { location, description, } = req.body;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const tips = JSON.parse(jsonData);

      const index = tips.findIndex((tip: TipBody) => tip.id === id);
      if (index === -1) {
        res.status(404).json({ message: "Tip not found..." });
        return;
      }

      if (!tips) {
        res.status(404).json({
          message: "The server could not find the tips, please try again later",
        });
        return;
      }
      tips[index].location = location;
      tips[index].description = description;

      try {
        const validatedTip = await validateUserTips(tips[index]);
        console.log("validatedTip : ", validatedTip);
        tips.push(validatedTip);
      } catch (error) {
        console.error("Error: ", error);
        res.status(400).json({
          message: "Validation failed",
          details: error,
        });
        return;
      }

      fs.writeFileSync(filePath, JSON.stringify(tips, null, 2), "utf-8");

      res.status(200).json({ message: "Tip edited!", tips: tips });
      return;
    } catch (error) {
      console.error("Server error!");
      res
        .status(500)
        .json({ message: "There was a major internet breakdown, sorry..." });
      return;
    }
  }
);

//DELETE
userTipsRouter.delete(
  "/deleteTip/:id",
  async (req: TipRequest, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/tips.json");

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const tips = JSON.parse(jsonData);

      const index = tips.findIndex((tip: TipBody) => tip.id === id);
      if (index === -1) {
        res.status(404).json({ message: "Tip not found..." });
        return;
      }

      if (!tips) {
        res.status(404).json({
          message: "The server could not find the tips, please try again later",
        });
        return;
      }

      const lessTips = tips.splice(index, 1);
      console.log(lessTips);

      fs.writeFileSync(filePath, JSON.stringify(tips, null, 2), "utf-8");
      res.status(200).json({ message: "Tip deleted!", lessTips: lessTips });
      return;
    } catch (error) {
      console.error("Server error ");
      res
        .status(500)
        .json({ message: "There was a major internet breakdown, sorry..." });
      return;
    }
  }
);

export default userTipsRouter;
