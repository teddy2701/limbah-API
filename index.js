const dotenv = require("dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 4000;

const app = express();

const dataAkun = require("./src/routers/data-akun");
const login = require("./src/routers/auth");
const perangkat = require("./src/routers/data-perangkat");
const limbah = require("./src/routers/data-limbah");
const peringatan = require("./src/routers/data-peringatan");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  //izinkan semua website untuk menggunakan API
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/v1/limbah", limbah);
app.use("/v1/peringatan", peringatan);
app.use("/v1/perangkat", perangkat);
app.use("/v1/akun", dataAkun);
app.use("/v1/auth", login);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(400).json({
    message: message,
    data: data,
  });
});
// koneksi

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(port, () => console.log("Server listening on port:", port));
  })
  .catch((err) => console.log(err));
