const express = require("express");
const router = express.Router();

const dataPeringatan = require("../controller/data-peringatan");

router.post("/simpan", dataPeringatan.createPeringatan);
router.get(
  "/koneksi/:kodeKoneksi/tgl_mulai/:tglMulai/tgl_akhir/:tglAkhir",
  dataPeringatan.getPeringatan
);

module.exports = router;
