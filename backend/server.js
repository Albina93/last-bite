require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const claimRoutes = require("./routes/claimRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ---Routes-------
app.use("/api/users", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/claims", claimRoutes);

// test
app.get("/", (req, res) => {
  res.json({ message: "Last bite API is running" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
