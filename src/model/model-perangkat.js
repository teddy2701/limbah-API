const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skemaPerangkat = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },

    kodeKoneksi: {
      type: String,
      required: true,
    },

    lokasi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("perangkat", skemaPerangkat);
