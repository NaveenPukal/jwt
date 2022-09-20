const express = require("express");

// const bodyparser = require("body-parser");
const app = express();
const helmet = require("helmet");
// const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(`not connected`, e);
  });

//middleware
app.use(express.json());
app.use(helmet());
// app.use(morgan("comman"));

app.use("/api/user", authRoutes);
app.get("/", (req, res) => {
  res.send("Connected to express");
});

const port = 4000;
app.listen(port, () => {
  console.log(`App is running on port number ${port}`);
});
