export class Transaction {
  constructor(type, nominal, keterangan) {
    this.nominal = nominal;
    this.keterangan = keterangan;
    this.tanggal = new Date();
    this.type = type;
  }
}

export class Cashflow {
  constructor(transaksi, totalPemasukan, totalPengeluaran, total) {
    this.transaksi = transaksi;
    this.totalPemasukan = totalPemasukan;
    this.totalPengeluaran = totalPengeluaran;
    this.total = total;
  }
  hitungTotalPemasukan = function () {
    let totalPemasukan = 0;
    const pemasukan = this.transaksi.filter(
      (transaksi) => transaksi.type === "Pemasukan"
    );

    pemasukan.forEach((transaksi) => (totalPemasukan += transaksi.nominal));
    this.totalPemasukan = totalPemasukan;
  };
  hitungTotalPengeluaran = function () {
    let totalPengeluaran = 0;
    const pengeluaran = this.transaksi.filter(
      (transaksi) => transaksi.type === "Pengeluaran"
    );

    pengeluaran.forEach((transaksi) => (totalPengeluaran += transaksi.nominal));
    this.totalPengeluaran = totalPengeluaran;
  };
  hitungTotal = function () {
    this.total = this.totalPemasukan - this.totalPengeluaran;
  };
}
