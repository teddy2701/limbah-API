const skemaPerangkat = require("../model/model-perangkat");

exports.createPerangkat = (req, res, next) => {
  const nama = req.body.nama;
  const kodeKoneksi = req.body.kodeKoneksi;
  const lokasi = req.body.lokasi;

  const SimpanDataPerangkat = new skemaPerangkat({
    nama: nama,
    kodeKoneksi: kodeKoneksi,
    lokasi: lokasi,
  });

  SimpanDataPerangkat.save()
    .then((result) => {
      res.status(201).json({
        pesan: "data berhasil ditambahkan",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllPerangkat = (req, res, next) => {
  skemaPerangkat
    .find()
    .then((result) => {
      res.status(200).json({
        pesan: "data berhasil di panggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPerangkatCari = (req, res, next) => {
  const cariData = req.params.cari;

  skemaPerangkat
    .find({ nama: { $regex: cariData, $options: "i" } })
    .then((result) => {
      if (result.length === 0) {
        const error = new Error("Perangkat tidak ditemukan");
        error.statusCode = 400;
        throw error;
      }
      res.status(200).json({
        message: "Data Perangkat berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      res.status(200).json({
        message: "Data tidak ditemukan",
        data: err,
      });
    });
};

exports.deletePerangkat = (req, res, next) => {
  const Id = req.params.id;

  skemaPerangkat
    .findById(Id)
    .then((post) => {
      if (!post) {
        const err = new Error("Perangkat tidak di temukan");
        err.errorStasus = 400;
        throw err;
      }

      return skemaPerangkat.findByIdAndRemove(Id);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus Perangkat Berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updatePerangkat = (req, res, next) => {
  const Id = req.params.id;
  const kode = req.body.kodeKoneksi;
  const nama = req.body.nama;
  const lokasi = req.body.lokasi;

  skemaPerangkat
    .findById(Id)
    .then((ubah) => {
      if (!ubah) {
        const err = new Error("Perangkat tidak di temukan");
        err.errorStasus = 400;
        throw err;
      }

      ubah.kodeKoneksi = kode;
      ubah.nama = nama;
      ubah.lokasi = lokasi;

      return ubah.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update success",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
