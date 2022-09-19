const express = require("express");

// const bodyparser = require("body-parser");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },

  () => {
    console.log("DB Connected");
  }
);
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("comman"));

app.use("/api/user", authRoutes);
app.get("/", (req, res) => {
  res.send("Connected to express");
});

const port = 4000;
app.listen(port, () => {
  console.log(`App is running on port number ${port}`);
});
