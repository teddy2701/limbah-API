const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skemaLimbah = new Schema(
  {
    kodeKoneksi: {
      type: String,
      required: true,
    },

    NH3N: {
      type: Number,
      required: true,
    },
    COD: {
      type: Number,
      required: true,
    },
    PH: {
      type: Number,
      required: true,
    },
    TTS: {
      type: Number,
      required: true,
    },

    Volume: {
      type: Number,
      required: true,
    },
    tanggal: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("limbah", skemaLimbah);
