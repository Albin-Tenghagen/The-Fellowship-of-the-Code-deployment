//TODO This file needs to be converted to TypeScript before useTips starts working.
//TODO Maybe all the files need to be altered for any of it to work

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//module
import userRouter from "./routes/userRoutes/user.ts";
import adminRouter from "./routes/adminRoutes/adminAuth.ts";

dotenv.config();

const app = express();

//-------------------
//Swagger inställning för att att generera en api dokumentation
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Albins Restful API",
      description: "API-dokumentation med swagger",
      version: "1.0.0",
    },
  },
  //stjärna för alla filer i routes.
  apis: ["./dist/routes/adminRoutes/*.js", "./dist/routes/userRoutes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//-----------------------------
// Middleware
app.use(cors());
app.use(express.json());

//TODO logging middleware

// Middleware for routing
app.use("/users", userRouter);
app.use("/admins", adminRouter);
// Local server adress
const PORT = process.env.PORT || 5050;

app.get("/", (_req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the internet, have a look around" });
  return;
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
