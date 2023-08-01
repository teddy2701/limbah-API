const dotenv = require("dotenv");

const { validationResult } = require("express-validator");
const skemaAkun = require("../model/model-akun");
const CryptoJS = require("crypto-js");

dotenv.config();

exports.createAkun = (req, res, next) => {
  const errors = validationResult(req);

  // Cek apakah ada error
  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const username = req.body.username;

  // Cari akun dengan username yang sama
  skemaAkun
    .findOne({ username: username })
    .then((existingAkun) => {
      if (existingAkun) {
        const error = new Error("Username sudah terdaftar");
        error.errorStatus = 400;
        throw error;
      }

      const email = req.body.email;
      const hakAkses = req.body.hakAkses;
      const password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.TOKEN_USER
      );
      const node = req.body.node;

      const SimpanDataAkun = new skemaAkun({
        username: username,
        email: email,
        hakAkses: hakAkses,
        password: password,
        node: node,
      });

      return SimpanDataAkun.save();
    })
    .then((result) => {
      res.status(201).json({
        pesan: "Data berhasil ditambahkan",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllAkun = (req, res, next) => {
  skemaAkun
    .find()
    .then((result) => {
      res.status(200).json({
        pesan: "data berhasil di panggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteAkun = (req, res, next) => {
  const Id = req.params.id;

  skemaAkun
    .findById(Id)
    .then((post) => {
      if (!post) {
        const err = new Error("Akun tidak di temukan");
        err.errorStasus = 400;
        throw err;
      }

      return skemaAkun.findByIdAndRemove(Id);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus akun Berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAkunCari = (req, res, next) => {
  const cariData = req.params.cari;

  skemaAkun
    .find({ username: { $regex: cariData, $options: "i" } })
    .then((result) => {
      if (result.length === 0) {
        const error = new Error("Akun tidak ditemukan");
        error.statusCode = 400;
        throw error;
      }
      res.status(200).json({
        message: "Data akun berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateAkun = (req, res, next) => {
  const Id = req.params.id;
  const username = req.body.username;
  const email = req.body.email;
  const hakAkses = req.body.hakAkses;
  const node = req.body.node;
  const password = req.body.password;

  skemaAkun
    .findById(Id)
    .then((ubah) => {
      if (!ubah) {
        const err = new Error("Akun tidak di temukan");
        err.errorStasus = 400;
        throw err;
      }

      ubah.username = username;
      ubah.email = email;
      ubah.hakAkses = hakAkses;
      ubah.node = node;

      // Cek apakah password ada perubahan nilai
      if (password) {
        password = CryptoJS.AES.encrypt(
          password,
          process.env.TOKEN_USER
        ).toString();
        ubah.password = password;
      }

      return ubah.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update success",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
