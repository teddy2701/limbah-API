const skemaPeringatan = require("../model/model-peringatan");
const moment = require("moment");

function formatDateToISOString(dateString, timeString, isEndOfDay = false) {
  let dateTimeString;

  if (timeString) {
    dateTimeString = `${dateString}T${timeString}.000Z`;
  } else {
    dateTimeString = `${dateString}T00:00:00.000Z`;
  }

  const date = new Date(dateTimeString);

  // Pengecekan apakah tanggal yang valid
  if (isNaN(date.getTime())) {
    throw new Error("Tanggal tidak valid");
  }

  if (isEndOfDay) {
    // Atur waktu ke akhir hari dengan pukul 23:59:59.999
    date.setHours(23, 59, 59, 999);
  }

  const formattedDate = date.toISOString();
  return formattedDate;
}

exports.createPeringatan = async (req, res, next) => {
  const kodeKoneksi = req.body.kodeKoneksi;
  const nama = req.body.nama;
  const tanggalStr = req.body.tanggal;
  const keterangan = req.body.keterangan;

  // Ubah format tanggal dari string ke objek Date menggunakan moment.js
  const tanggal = moment(tanggalStr, "DD-MM-YYYY HH:mm:ss");

  const simpanPeringatan = new skemaPeringatan({
    kodeKoneksi: kodeKoneksi,
    nama: nama,
    tanggal: tanggal,
    keterangan: keterangan,
  });

  try {
    const result = await simpanPeringatan.save();
    res.status(200).json({
      pesan: "Peringatan berhasil ditambahkan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPeringatan = async (req, res, next) => {
  const id = req.params.kodeKoneksi;
  const tglMulaiStr = req.params.tglMulai;
  const tglAkhirStr = req.params.tglAkhir;

  try {
    const tglMulai = formatDateToISOString(tglMulaiStr);
    const tglAkhir = formatDateToISOString(tglAkhirStr, "", true);

    // Query untuk mencari data berdasarkan id dan rentang tanggal
    const result = await skemaPeringatan
      .find({
        kodeKoneksi: id,
        tanggal: { $gte: tglMulai, $lte: tglAkhir },
      })
      .sort({ tanggal: 1 });

    res.status(200).json({
      pesan: "Data berhasil di panggil",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
