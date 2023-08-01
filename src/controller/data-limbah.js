const skemaLimbah = require("../model/model-limbah");
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

exports.simpanDataLimbah = async (req, res, next) => {
  const kodeKoneksi = req.body.kodeKoneksi;
  const NH3N = req.body.NH3N;
  const COD = req.body.COD;
  const PH = req.body.PH;
  const TTS = req.body.TTS;
  const Volume = req.body.Volume;
  const tanggalStr = req.body.tanggal;

  // Ubah format tanggal dari string ke objek Date menggunakan moment.js

  const tanggal = moment(tanggalStr, "DD-MM-YYYY HH:mm:ss");

  const SimpanDataLimbah = new skemaLimbah({
    kodeKoneksi: kodeKoneksi,
    NH3N: NH3N,
    COD: COD,
    PH: PH,
    TTS: TTS,
    Volume: Volume,
    tanggal: tanggal,
  });

  try {
    const result = await SimpanDataLimbah.save();
    res.status(201).json({
      pesan: "data berhasil ditambahkan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.ambilDataLimbah = async (req, res, next) => {
  const id = req.params.kodeKoneksi;
  const tglMulaiStr = req.params.tglMulai;
  const tglAkhirStr = req.params.tglAkhir;
  try {
    // Ubah format string tanggal menjadi objek Date
    const tglMulai = formatDateToISOString(tglMulaiStr);
    const tglAkhir = formatDateToISOString(tglAkhirStr, "", true);
    // Query untuk mencari data berdasarkan id dan rentang tanggal
    const result = await skemaLimbah
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

// exports.hapusDataLimbah = (req, res, next) => {
//   const id = req.params.id;

//   skemaLimbah
//     .findByIdAndRemove(id)
//     .then((result) => {
//       res.status(200).json({
//         pesan: "Data Berhasil di hapus",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       next();
//     });
// };
