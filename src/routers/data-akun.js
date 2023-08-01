const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const dataAkun = require("../controller/data-akun");

//tambah data
// url + /v1/akun/register
router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 5 })
      .withMessage(" username min 5 karakter "),
  ],
  dataAkun.createAkun
);

router.get("/", dataAkun.getAllAkun);
router.get("/akun/:cari", dataAkun.getAkunCari);
router.delete("/delete/:id", dataAkun.deleteAkun);
router.put("/update/:id", dataAkun.updateAkun);

module.exports = router;
