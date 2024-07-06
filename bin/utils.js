import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import boxen from "boxen";
import table from "text-table";
import { format } from "date-fns";
import { cashflow, cashflowData, updateData } from "./data.js";
import { Transaction } from "./model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const formatTanggal = (tanggal) => format(tanggal, "eeee, dd LLL yyy - kk:mm");

function cekDompet(dompet) {
  const dompetData = [
    ["100K", dompet.seratus_ribu],
    ["50K", dompet.lima_puluh_ribu],
    ["20K", dompet.dua_puluh_ribu],
    ["10K", dompet.sepuluh_ribu],
    ["5K", dompet.lima_ribu],
    ["2K", dompet.dua_ribu],
    ["1K", dompet.seribu],
    ["500", dompet.lima_ratus],
  ];

  const t = table(dompetData, { align: ["l", "r"] });

  console.log(
    boxen(t, {
      textAlignment: "center",
      title: `Dompet :${dompet.total}`,
      titleAlignment: "center",
      padding: 1,
    })
  );
}

function cekHutang(hutang, detail) {
  if (!detail) {
    let totalHutang = 0;
    const hutangTable = [
      ["Nama", "Hutang"],
      ["", ""],
    ];

    hutang.map((data) => {
      totalHutang += data.totalHutang;
      hutangTable.push([data.nama, data.totalHutang]);
    });

    const t = table(hutangTable, { align: ["l", "l"] });

    console.log(
      boxen(t, {
        padding: 1,
        title: `Hutang :${totalHutang}`,
        titleAlignment: "center",
      })
    );
  } else {
    const data = hutang.filter((data) => data.nama === detail);
    const hutangTable = [
      ["Nominal", "Keterangan", "Tanggal"],
      ["", "", ""],
    ];
    let totalHutang;

    data.map((item) => {
      if (item.nama === detail) {
        totalHutang = item.totalHutang;

        item.rincian.map((rinci) => {
          hutangTable.push([
            rinci.jumlah,
            rinci.keterangan,
            formatTanggal(rinci.tanggal),
          ]);
        });
      }
    });

    const t = table(hutangTable, { align: ["l", "l", "l"] });
    console.log(
      boxen(t, {
        padding: 1,
        title: `Hutang :${totalHutang}`,
        titleAlignment: "center",
      })
    );
  }
}

function bukaDompet(dompet, json, masuk, keluar) {
  const newDompet = {
    seratus_ribu: dompet.seratus_ribu,
    lima_puluh_ribu: dompet.lima_puluh_ribu,
    dua_puluh_ribu: dompet.dua_puluh_ribu,
    sepuluh_ribu: dompet.sepuluh_ribu,
    lima_ribu: dompet.lima_ribu,
    dua_ribu: dompet.dua_ribu,
    seribu: dompet.seribu,
    lima_ratus: dompet.lima_ratus,
    hitungTotal() {
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
    },
    masukkanUang(jenisUang, jumlahJenisUang) {
      switch (jenisUang) {
        case "100K":
        case "100k":
          return (this.seratus_ribu += jumlahJenisUang);
        case "50K":
        case "50k":
          return (this.lima_puluh_ribu += jumlahJenisUang);
        case "20K":
        case "20k":
          return (this.dua_puluh_ribu += jumlahJenisUang);
        case "10K":
        case "10k":
          return (this.sepuluh_ribu += jumlahJenisUang);
        case "5K":
        case "5k":
          return (this.lima_ribu += jumlahJenisUang);
        case "2K":
        case "2k":
          return (this.dua_ribu += jumlahJenisUang);
        case "1K":
        case "1k":
          return (this.seribu += jumlahJenisUang);
        case "500":
          return (this.lima_ratus += jumlahJenisUang);

        default:
          return;
      }
    },
    keluarkanUang(jenisUang, jumlahJenisUang) {
      switch (jenisUang) {
        case "100K":
        case "100k":
          return (this.seratus_ribu -= jumlahJenisUang);
        case "50K":
        case "50k":
          return (this.lima_puluh_ribu -= jumlahJenisUang);
        case "20K":
        case "20k":
          return (this.dua_puluh_ribu -= jumlahJenisUang);
        case "10K":
        case "10k":
          return (this.sepuluh_ribu -= jumlahJenisUang);
        case "5K":
        case "5k":
          return (this.lima_ribu -= jumlahJenisUang);
        case "2K":
        case "2k":
          return (this.dua_ribu -= jumlahJenisUang);
        case "1K":
        case "1k":
          return (this.seribu -= jumlahJenisUang);
        case "500":
          return (this.lima_ratus -= jumlahJenisUang);

        default:
          return;
      }
    },
  };

  const data = json;
  data.dompet = newDompet;

  masuk.forEach((item) => {
    const tempArr = item.split("-");
    const jenisUang = tempArr[0];
    const jumlahJenisUang = parseInt(tempArr[1]);

    console.log(
      `Uang masuk dengan jenis ${jenisUang} sebanyak ${jumlahJenisUang}`
    );
    newDompet.masukkanUang(jenisUang, jumlahJenisUang);
    newDompet.total = newDompet.hitungTotal();
  });

  keluar.forEach((item) => {
    const tempArr = item.split("-");
    const jenisUang = tempArr[0];
    const jumlahJenisUang = parseInt(tempArr[1]);

    console.log(
      `Uang keluar dengan jenis ${jenisUang} sebanyak ${jumlahJenisUang}`
    );
    newDompet.keluarkanUang(jenisUang, jumlahJenisUang);
    newDompet.total = newDompet.hitungTotal();
  });

  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(data));

  cekDompet(data.dompet);
}

function tambahHutang(nama, jumlahHutang, keterangan, json) {
  class RincianHutang {
    constructor(jumlah, keterangan) {
      this.jumlah = jumlah;
      this.keterangan = keterangan;
    }
    tanggal = new Date();
  }

  class Hutang {
    constructor(nama) {
      this.nama = nama;
    }
    totalHutang = 0;
    rincian = [];
  }

  const data = json;
  const hutang = data.hutang;

  const namaPengutang = hutang.filter((data) => data.nama === nama);

  if (namaPengutang.length === 0) {
    hutang.push(new Hutang(nama));
  }

  hutang.map((data) => {
    if (data.nama === nama) {
      data.rincian.push(new RincianHutang(jumlahHutang, keterangan));
      data.totalHutang += jumlahHutang;
    }
  });

  data.hutang = hutang;

  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(data));

  cekHutang(data.hutang);
}

function hapusHutang(nama, json) {
  const data = json;
  const hutang = data.hutang;

  const indexData = hutang.findIndex((data) => data.nama === nama);

  hutang.splice(indexData, 1);

  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(data));

  cekHutang(data.hutang);
}

// Catat Transaksi

export function cekCashflow() {
  const cashflowTable = [
    ["Nominal", "Keterangan", "Tanggal", "Tipe"],
    ["", "", "", ""],
  ];

  cashflow.transaksi.forEach((item) =>
    cashflowTable.push([
      item.nominal,
      item.keterangan,
      formatTanggal(item.tanggal),
      item.type,
    ])
  );

  const t = table(cashflowTable);

  console.log(
    boxen(t, {
      titleAlignment: `center`,
      title: `Total :${cashflow.total}`,
      padding: 1,
    })
  );
}

export function tambahPemasukan(nominal, keterangan) {
  const pemasukan = new Transaction("Pemasukan", nominal, keterangan);

  cashflow.transaksi.push(pemasukan);

  updateData();

  cekCashflow();
}

export function tambahPengeluaran(nominal, keterangan) {
  const pengeluaran = new Transaction("Pengeluaran", nominal, keterangan);

  cashflow.transaksi.push(pengeluaran);

  updateData();

  cekCashflow();
}

export {
  cekDompet,
  cekHutang,
  bukaDompet,
  tambahHutang,
  hapusHutang,
  __dirname,
};
