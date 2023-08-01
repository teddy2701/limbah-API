const express = require("express");
const router = express.Router();

const dataPerangkat = require("../controller/data-perangkat");

//tambah data
router.post("/register", dataPerangkat.createPerangkat);

router.get("/", dataPerangkat.getAllPerangkat);
router.get("/perangkat/:cari", dataPerangkat.getPerangkatCari);
router.delete("/delete/:id", dataPerangkat.deletePerangkat);
router.put("/update/:id", dataPerangkat.updatePerangkat);

module.exports = router;
