import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
    "http://localhost:5173",                          // Local Development
    "https://auth-frontend-6x4a.onrender.com"         // Your deployed frontend
];


// ✅ Connect to MongoDB
connectDB();

// ✅ CORS Middleware — must come BEFORE express.json() and cookieParser()
app.use(cors({
  origin: allowedOrigins,
  credentials: true,   // Important for sending cookies cross-origin
}));

// ✅ Body Parser & Cookie Parser
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.get("/", (req, res) => res.send("API Working ✅"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ✅ Start server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
