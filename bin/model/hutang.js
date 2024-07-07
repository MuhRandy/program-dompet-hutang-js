import { cekData, hapus, tambah } from "../controllers/hutang.js";

export class RincianHutang {
  constructor(jumlah, keterangan) {
    this.jumlah = jumlah;
    this.keterangan = keterangan;
  }
  tanggal = new Date();
}

export class NewHutang {
  constructor(nama) {
    this.nama = nama;
  }
  totalHutang = 0;
  rincian = [];
}

export class Hutang {
  constructor(hutang) {
    this.hutang = hutang;
  }

  cekData = cekData;

  tambah = tambah;

  hapus = hapus;
}
