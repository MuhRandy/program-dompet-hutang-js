import {
  cekData,
  hitungTotal,
  hitungTotalPemasukan,
  hitungTotalPengeluaran,
  tambahPemasukan,
  tambahPengeluaran,
} from "../controllers/cashflow.js";

export class Transaction {
  constructor(type, nominal, keterangan) {
    this.nominal = nominal;
    this.keterangan = keterangan;
    this.type = type;
  }

  tanggal = new Date();
}

export class Cashflow {
  constructor(transaksi) {
    this.transaksi = transaksi;
  }

  hitungTotalPemasukan = hitungTotalPemasukan;

  hitungTotalPengeluaran = hitungTotalPengeluaran;

  hitungTotal = hitungTotal;

  cekData = cekData;

  tambahPemasukan = tambahPemasukan;

  tambahPengeluaran = tambahPengeluaran;
}
