console.log("adminAuth router running....");
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../../Database/db.ts";
const pool = db.pool;
import generateToken from "../../middleware/generate_jwt_token.ts";
import authenticateToken from "../../middleware/jwtAuth.ts";
dotenv.config();

import { readFile } from "fs/promises";
// Import nested modules
import authMonitoringtRouter from "./adminMonitoring.ts";
import authInfrastructureRouter from "./adminInfrastructure.ts";

import authIssueUpkeepRouter from "./adminIssueUpkeep.ts";
import { adminLogin, loginData } from "types/types.ts";
import path from "path";

const adminRouter = express.Router(); // Define adminRouter first!

// Nested modules (without "/user" prefix since it's handled in server.ts)
adminRouter.use("/authenticated/monitoring", authMonitoringtRouter);
adminRouter.use(
  "/authenticated/infrastructureIssues",
  authInfrastructureRouter
);
adminRouter.use("/authenticated/issueUpkeep", authIssueUpkeepRouter);

adminRouter.get("/", (_req, res) => {
  res.status(200).json({
    message:
      "Welcome to the adminAuth Endpoint. Please login to gain acces to the admin portal",
  });
});

adminRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body;
    const saltRounds = 10;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res
        .status(400)
        .json({ error: "Name is required and must be a non-empty string." });
      return;
    }
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400).json({ error: "A valid email address is required." });
      return;
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      res.status(400).json({
        error: "Password is required and must be at least 6 characters long.",
      });
      return;
    }
    if (!role || typeof role !== "string" || role.trim().length === 0) {
      res
        .status(400)
        .json({ error: "Role is required and must be a non-empty string." });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await pool.query(
        `INSERT INTO admins (name, email, password, role) VALUES ($1, $2, $3, $4)`,
        [name.trim(), email.trim(), hashedPassword, role.trim()]
      );

      res.status(201).json({ message: "Användare registrerad." });
    } catch (error: any) {
      console.error("Error registering admin:", error);
      if (error.code === "23505") {
        res
          .status(409)
          .json({ error: "Användare med samma e-postadress finns redan." });
        return;
      } else {
        res
          .status(500)
          .json({ error: "Ett fel uppstod vid registrering av användare." });
        return;
      }
    }
  }
);
//POST for login with email and password?
//TODO Kryptera denna post för att få en funktionell inloggningsfunktion
adminRouter.post(
  "/login",
  async (req: adminLogin, res: Response, next: NextFunction): Promise<void> => {
    const filePath = path.resolve("Database/admin.json");
    const { name, email, password } = req.body;

    if (![name, email, password].every(Boolean)) {
      res.status(400).json({
        message: "All fields (name, email, password) are required.",
      });
      return;
    }

    try {
      const jsonData = await readFile(filePath, "utf-8");
      const loginInfo = JSON.parse(jsonData);

      const specificLogin = loginInfo.find(
        (login: loginData) => login.name === name
      );

      if (
        specificLogin &&
        specificLogin.email === email &&
        specificLogin.password === password
      ) {
        next();
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Server error", error);
      res.status(500).json({ message: "SERVER SERVER ERROR" });
    }
  },
  generateToken,
  (req: adminLogin, res: Response) => {
    // Final response using token created in middleware
    res.status(200).json({
      message: "Login successful, you should receive a session token",
      token: res.locals.token,
    });
  }
);

adminRouter.get(
  "/secret",
  async (req: Request, res: Response): Promise<void> => {
    try {
    } catch (error) {
      res.status(403).json({ error: "JWT-token är ogiltig" });
    }
  }
);

export default adminRouter;
