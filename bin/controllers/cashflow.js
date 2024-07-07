import boxen from "boxen";
import table from "text-table";
import { updateData } from "../data.js";
import { Transaction } from "../model/cashflow.js";
import { formatTanggal } from "../utils.js";

export function hitungTotalPemasukan() {
  let totalPemasukan = 0;

  const pemasukan = this.transaksi.filter(
    (transaksi) => transaksi.type === "Pemasukan"
  );

  pemasukan.forEach((transaksi) => (totalPemasukan += transaksi.nominal));

  return totalPemasukan;
}

export function hitungTotalPengeluaran() {
  let totalPengeluaran = 0;

  const pengeluaran = this.transaksi.filter(
    (transaksi) => transaksi.type === "Pengeluaran"
  );

  pengeluaran.forEach((transaksi) => (totalPengeluaran += transaksi.nominal));

  return totalPengeluaran;
}

export function hitungTotal() {
  return this.hitungTotalPemasukan() - this.hitungTotalPengeluaran();
}

export function cekData(type) {
  const cashflowTable = [
    ["Nominal", "Keterangan", "Tanggal"],
    ["", "", ""],
  ];

  const dataType = this.transaksi.filter((item) => item.type === type);
  dataType.forEach((item) =>
    cashflowTable.push([
      item.nominal,
      item.keterangan,
      formatTanggal(item.tanggal),
    ])
  );

  const t = table(cashflowTable);

  let total = 0;

  switch (type) {
    case "Pemasukan":
      total = this.hitungTotalPemasukan();
      break;
    case "Pengeluaran":
      total = this.hitungTotalPengeluaran();
      break;

    default:
      break;
  }

  console.log(
    boxen(t, {
      titleAlignment: `center`,
      title: `${type}: ${total}`,
      padding: 1,
    })
  );
}

export function tambahPemasukan(nominal, keterangan) {
  const pemasukan = new Transaction("Pemasukan", nominal, keterangan);

  this.transaksi.push(pemasukan);

  updateData();

  this.cekData("Pemasukan");
}

export function tambahPengeluaran(nominal, keterangan) {
  const pengeluaran = new Transaction("Pengeluaran", nominal, keterangan);

  this.transaksi.push(pengeluaran);

  updateData();

  this.cekData("Pengeluaran");
}
