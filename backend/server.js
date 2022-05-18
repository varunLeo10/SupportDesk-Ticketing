const express = require("express");
const app = express();
const colors = require("colors");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
connectDB();
app.listen(PORT, () => console.log(`server started on ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.json({ message: "Support Desk API" });
});
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);
