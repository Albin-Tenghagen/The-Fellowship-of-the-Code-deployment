console.log("tips router running....");
import express, { Request, Response, Router } from "express";
import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";

import { userTipObject, TipBody } from "../../types/types.ts";

const userTipsRouter: Router = express.Router();

interface TipRequest extends Request<{ id: string }, any, TipBody> {}

/**
 * @swagger
 * /user/tips:
 *   get:
 *     tags:
 *       - tips
 *     summary: Fetches all tips submitted
 *     description: Returns an array of tips submitted by the users
 *     responses:
 *       200:
 *         description: Here are the currently available tips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The tip's unique ID
 *                   timestamp:
 *                     type: string
 *                     description: The time and date when the tip was registered
 *                   location:
 *                     type: string
 *                     description: Where the tip originates from
 *                   description:
 *                     type: string
 *                     description: Description of the current alert/tip
 */
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

/**
 * @swagger
 * /user/tips/postTip:
 *   post:
 *     tags:
 *       - tips
 *     summary: Creates a tip
 *     description: Creates a tip and adds it to the tips array
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The tip's unique ID
 *               timestamp:
 *                 type: string
 *                 description: The time and date when the tip was registered
 *               location:
 *                 type: string
 *                 description: Where the tip originates from
 *               description:
 *                 type: string
 *                 description: Description of the current alert/tip
 *     responses:
 *       201:
 *         description: Tip created!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                 tip:
 *                   type: object
 *                   description: The created tip
 *                   properties:
 *                     id:
 *                       type: integer
 *                     timestamp:
 *                       type: string
 *                     location:
 *                       type: string
 *                     description:
 *                       type: string
 */
userTipsRouter.post(
  "/postTip",
  async (req: TipRequest, res: Response): Promise<void> => {
    const filePath = path.resolve("Database/tips.json");

    const { timestamp, location, description, user } = req.body;

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const tips = JSON.parse(jsonData);

      if (!timestamp || !location || !description || !user) {
        res.status(400).json({ Error: "All values are required" });
        return;
      }

      const newTip = {
        id: tips.length + 1001,
        timestamp,
        location,
        description,
        user,
      };
      console.log(newTip);
      tips.push(newTip);

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
/**
 * @swagger
 * /user/tips/putTip/{id}:
 *   put:
 *     tags:
 *       - tips
 *     summary: Edits a tip
 *     description: Updates an existing tip by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tip to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timestamp:
 *                 type: string
 *                 description: The time and date when the tip was registered
 *               location:
 *                 type: string
 *                 description: Where the tip originates from
 *               description:
 *                 type: string
 *                 description: Description of the current alert/tip
 *               user:
 *                 type: string
 *                 description: The user who submitted the tip
 *     responses:
 *       200:
 *         description: Tip updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 tips:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       timestamp:
 *                         type: string
 *                       location:
 *                         type: string
 *                       description:
 *                         type: string
 *                       user:
 *                         type: string
 */
userTipsRouter.put(
  "/putTip/:id",
  async (req: TipRequest, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const filePath = path.resolve("Database/tips.json");

    const { timestamp, location, description, user } = req.body;

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

      tips[index].timestamp = timestamp;
      tips[index].location = location;
      tips[index].description = description;
      tips[index].user = user;

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
