import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//module
import userRouter from "./routes/userRoutes/user.js";
import adminRouter from "./routes/adminRoutes/admin.js";
dotenv.config();

const app = express();

// Middleware
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use(cors());
app.use(express.json());

// Routing
const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the internet, have a look around" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
