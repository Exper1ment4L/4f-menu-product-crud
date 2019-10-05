const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const products = require("./src/routes/api/products");

const app = express();

const db = require("./src/config/keys").mongoURI;

app.use(bodyParser.json());

app.use(
  cors({
    allowedHeaders: ["Content-Type"], // headers that React is sending to the API
    exposedHeaders: ["Content-Type"], // headers that you are sending back to React
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "*",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Database connected.."))
  .catch(err => console.log(err));

app.use("/api/products", products);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started on port:" + port);
});
