const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const contactRoute = require("./routes/contactRoute");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas online");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Routes
app.use("/projects", projectRoutes);
app.use("/skills", skillRoutes);
app.use("/", contactRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to test the app`);
});
