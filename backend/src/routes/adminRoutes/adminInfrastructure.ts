console.log("Infrastructure router running....");
import express from "express";

const authInfrastructureRouter = express.Router();

authInfrastructureRouter.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the adminInfrastructure Endpoint " });
});

//GET get the current infrastructure issues or warnings

//POST for alerting for issues in infrastructure as in översvämmade gator or smth also for userss to enjoy

export default authInfrastructureRouter;
