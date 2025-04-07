import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//module
import userRouter from "./routes/userRoutes/user.js";
import adminRouter from "./routes/adminRoutes/admin.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middlewere for routing
app.use("/user", userRouter);
app.use("/admin", adminRouter);

// Local server adress
const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the internet, have a look around" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//?Default :
//* localhost:5000/

//? User route :
//* http://localhost:5000/user/
//---------------------------------------------------
// User routes :
//*http://localhost:5000/user/tips
//*http://localhost:5000/user/risks
//*http://localhost:5000/user/notifications
//*http://localhost:5000/user/safety
//---------------------------------------------------
//? Admin route :
//* localhost:5000/admin/
//* localhost:5000/admin/adminAuth/
//---------------------------------------------------
// Monitoring routes :
//*http://localhost:5000/admin/adminAuth/authenticated/monitoring/
//*http://localhost:5000/admin/adminAuth/authenticated/monitoring/historicalMonitoring
//---------------------------------------------------
//Other routes :
//*http://localhost:5000/admin/adminAuth/authenticated/issueUpkeep
//*http://localhost:5000/admin/adminAuth/authenticated/infrastructureIssues
