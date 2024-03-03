const express = require("express");
const app = express();
const mongoose = require("mongoose");
const controller = require("./controller.js");
const Product = require("./ProductModel.js");
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());
app.use("/", controller);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
