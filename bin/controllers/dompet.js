import boxen from "boxen";
import table from "text-table";
import { updateData } from "../data.js";

export function hitungTotal() {
  return (
    this.seratus_ribu * 100000 +
    this.lima_puluh_ribu * 50000 +
    this.dua_puluh_ribu * 20000 +
    this.sepuluh_ribu * 10000 +
    this.lima_ribu * 5000 +
    this.dua_ribu * 2000 +
    this.seribu * 1000 +
    this.lima_ratus * 500
  );
}

export function masukkanUang(jenisUang, jumlahJenisUang) {
  switch (jenisUang) {
    case "100K":
      return (this.seratus_ribu += jumlahJenisUang);
    case "50K":
      return (this.lima_puluh_ribu += jumlahJenisUang);
    case "20K":
      return (this.dua_puluh_ribu += jumlahJenisUang);
    case "10K":
      return (this.sepuluh_ribu += jumlahJenisUang);
    case "5K":
      return (this.lima_ribu += jumlahJenisUang);
    case "2K":
      return (this.dua_ribu += jumlahJenisUang);
    case "1K":
      return (this.seribu += jumlahJenisUang);
    case "500":
      return (this.lima_ratus += jumlahJenisUang);

    default:
      return;
  }
}

export function keluarkanUang(jenisUang, jumlahJenisUang) {
  switch (jenisUang) {
    case "100K":
      return (this.seratus_ribu -= jumlahJenisUang);
    case "50K":
      return (this.lima_puluh_ribu -= jumlahJenisUang);
    case "20K":
      return (this.dua_puluh_ribu -= jumlahJenisUang);
    case "10K":
      return (this.sepuluh_ribu -= jumlahJenisUang);
    case "5K":
      return (this.lima_ribu -= jumlahJenisUang);
    case "2K":
      return (this.dua_ribu -= jumlahJenisUang);
    case "1K":
      return (this.seribu -= jumlahJenisUang);
    case "500":
      return (this.lima_ratus -= jumlahJenisUang);

    default:
      return;
  }
}

export function cekData() {
  const dompetTable = [
    ["100K", this.seratus_ribu],
    ["50K", this.lima_puluh_ribu],
    ["20K", this.dua_puluh_ribu],
    ["10K", this.sepuluh_ribu],
    ["5K", this.lima_ribu],
    ["2K", this.dua_ribu],
    ["1K", this.seribu],
    ["500", this.lima_ratus],
  ];

  const t = table(dompetTable, { align: ["l", "r"] });

  console.log(
    boxen(t, {
      textAlignment: "center",
      title: `Dompet: ${this.hitungTotal()}`,
      titleAlignment: "center",
      padding: 1,
    })
  );
}

export function bukaDompet(masuk, keluar) {
  masuk.forEach((item) => {
    const tempArr = item.split("-");
    const jenisUang = tempArr[0].toUpperCase();
    const jumlahJenisUang = parseInt(tempArr[1]);

    console.log(
      `Uang masuk dengan jenis ${jenisUang} sebanyak ${jumlahJenisUang}`
    );
    this.masukkanUang(jenisUang, jumlahJenisUang);
  });

  keluar.forEach((item) => {
    const tempArr = item.split("-");
    const jenisUang = tempArr[0].toUpperCase();
    const jumlahJenisUang = parseInt(tempArr[1]);

    console.log(
      `Uang keluar dengan jenis ${jenisUang} sebanyak ${jumlahJenisUang}`
    );
    this.keluarkanUang(jenisUang, jumlahJenisUang);
  });

  updateData("dompet");

  this.cekData();
}
