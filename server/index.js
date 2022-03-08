const express = require("express");
const app = express();
const cors = require("cors");
const inventoryRoute = require("./routes/inventory");
const warehouseRoutes = require("./routes/warehouses");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To InStock Server");
  // next();
});

app.use((_req, _res, next) => {
  console.log("Incoming Request");
  next();
});

app.use("/inventory", inventoryRoute);

app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
