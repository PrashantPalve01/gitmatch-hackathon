import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import githubRoutes from "./routes/github.routes.js";
import comparisonRoutes from "./routes/comparison.routes.js";
import standardProfileRoutes from "./routes/standardProfile.routes.js";

// Connect to database
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/github", githubRoutes);
app.use("/api/comparisons", comparisonRoutes);
app.use("/api/standards", standardProfileRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GitHub Recruiter API" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
