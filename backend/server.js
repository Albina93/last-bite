require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const claimRoutes = require("./routes/claimRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
const PORT = process.env.PORT || 3001;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected:", socket.id);
  });
});
// connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ---Routes-------
app.use("/api/users", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/ai", aiRoutes);

// test
app.get("/", (req, res) => {
  res.json({ message: "Last bite API is running" });
});

// Start the Server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
