console.log("safety router running....");
import express from "express";

const userSafetyRouter = express.Router();

userSafetyRouter.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to the userSafety Endpoint " });
});

//GET to get the safety information available
// userSafetyRouter.get(
//   "/",
//   async (req: Request<{}, any, any>, res: Response): Promise<void> => {
//     try {
//     } catch {}
//   }
// );

export default userSafetyRouter;
