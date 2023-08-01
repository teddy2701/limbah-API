const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skemaPeringatan = new Schema(
  {
    kodeKoneksi: {
      type: String,
      required: true,
    },
    nama: {
      type: String,
      required: true,
    },
    tanggal: {
      type: Date,
      required: true,
    },
    keterangan: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("peringatan", skemaPeringatan);
