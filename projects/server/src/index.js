// require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const dotenv = require("dotenv").config({ override: true });
const db = require("../models");
const bodyParser = require('body-parser');
const validator = require("../middleware/validator")

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
      process.env.WHITELISTED_DOMAIN.split(","),
    ],
  })
);

app.use(express.json());
app.use(cors());
app.use(express.static('public/images'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
const { userRouter, TestingMulterRouter, addressRouter, warehouseRouter, nearestWarehouseRouter } = require("../routers");

app.use(validator)
app.use("/api/user", userRouter);
app.use("/api/upload", TestingMulterRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/warehouses", warehouseRouter);
app.use("/api/nearest-warehouse", nearestWarehouseRouter);

// app.get("/api", (req, res) => {
//   res.send(`Hello, this is my API`);
// });

// app.get("/api/greetings", (req, res, next) => {
//   res.status(200).json({
//     message: "Hello, Student !",
//   });
// });

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({ alert: true });
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
