const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const tasksRoutes = require("./routes/Tasks");
const cors = require("cors");
const path = require("path");

// Loading environment variables from .env file
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 4000;
const frontendUrl = process.env.frontendUrl;
const _dirname = path.resolve();

// Connecting to database
database.connect();
app.use(
  cors({
    origin: frontendUrl, // Specify the frontend origin here
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Middlewares

app.use(express.json()); // For JSON payloads

app.use("/api/v1/", tasksRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`APP IS RUNNING AT PORT ${PORT}`);
});
