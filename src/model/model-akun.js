const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skemaAkun = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    hakAkses: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    node: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("akun", skemaAkun);
