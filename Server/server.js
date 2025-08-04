import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS Configuration — Fully Corrected
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://auth-frontend-6x4a.onrender.com"
  ],
  credentials: true,  // Important to allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Allow all necessary methods
  allowedHeaders: ["Content-Type", "Authorization"],     // Allow headers
}));

// ✅ Body & Cookie Parser Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.get("/", (req, res) => res.send("API Working ✅"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ✅ Start Server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
