const dotenv = require("dotenv");

const skemaAkun = require("../model/model-akun");
const CryptoJS = require("crypto-js");

dotenv.config();

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password; // Ganti dengan req.body.password

  skemaAkun
    .findOne({ username: username }) // Gunakan findOne() untuk mencari satu dokumen

    .then((result) => {
      if (!result) {
        const error = new Error("Username atau Password Salah");
        error.errorStatus = 200;
        throw error;
      }

      // Lakukan dekripsi password yang disimpan dalam basis data
      const decryptedPassword = CryptoJS.AES.decrypt(
        result.password.toString(),
        process.env.TOKEN_USER
      );
      const decryptedPasswordString = decryptedPassword.toString(
        CryptoJS.enc.Utf8
      );

      if (decryptedPasswordString === password) {
        res.status(200).json({
          message: "Akun ditemukan",
          data: result,
        });
      } else {
        const error = new Error("Username atau Password Salah");
        error.errorStatus = 200;
        throw error;
      }
    })
    .catch((err) => {
      next(err);
    });
};
