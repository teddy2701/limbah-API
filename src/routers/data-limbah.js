const express = require("express");
const router = express.Router();

const dataLimbah = require("../controller/data-limbah");

router.post("/simpan", dataLimbah.simpanDataLimbah);
router.get(
  "/koneksi/:kodeKoneksi/tgl_mulai/:tglMulai/tgl_akhir/:tglAkhir",
  dataLimbah.ambilDataLimbah
);
// router.delete("/hapus/:id", dataLimbah.hapusDataLimbah);

module.exports = router;
