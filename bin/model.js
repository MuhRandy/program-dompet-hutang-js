import boxen from "boxen";
import table from "text-table";
import { updateData } from "./data.js";
import { formatTanggal } from "./utils.js";

// Dompet model
export class Dompet {
  constructor(
    seratus_ribu,
    lima_puluh_ribu,
    dua_puluh_ribu,
    sepuluh_ribu,
    lima_ribu,
    dua_ribu,
    seribu,
    lima_ratus
  ) {
    this.seratus_ribu = seratus_ribu;
    this.lima_puluh_ribu = lima_puluh_ribu;
    this.dua_puluh_ribu = dua_puluh_ribu;
    this.sepuluh_ribu = sepuluh_ribu;
    this.lima_ribu = lima_ribu;
    this.dua_ribu = dua_ribu;
    this.seribu = seribu;
    this.lima_ratus = lima_ratus;
  }

  hitungTotal = function () {
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
  };

  masukkanUang = function (jenisUang, jumlahJenisUang) {
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
  };

  keluarkanUang = function (jenisUang, jumlahJenisUang) {
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
  };

  cekData = function () {
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
  };

  bukaDompet = function (masuk, keluar) {
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

    updateData();

    this.cekData();
  };
}

// Hutang model
class RincianHutang {
  constructor(jumlah, keterangan) {
    this.jumlah = jumlah;
    this.keterangan = keterangan;
  }
  tanggal = new Date();
}

class NewHutang {
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

  cekData = function (nama) {
    if (!nama) {
      let totalHutang = 0;
      const hutangTable = [
        ["Nama", "Hutang"],
        ["", ""],
      ];

      this.hutang.map((data) => {
        totalHutang += data.totalHutang;
        hutangTable.push([data.nama, data.totalHutang]);
      });

      const t = table(hutangTable, { align: ["l", "l"] });

      console.log(
        boxen(t, {
          padding: 1,
          title: `Hutang: ${totalHutang}`,
          titleAlignment: "center",
        })
      );
    } else {
      const data = this.hutang.filter((data) => data.nama === nama);

      if (data.length === 0)
        return console.log("Tidak ada hutang atas nama", nama);

      const hutangTable = [
        ["Nominal", "Keterangan", "Tanggal"],
        ["", "", ""],
      ];
      let totalHutang;

      data.map((item) => {
        if (item.nama === nama) {
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
  };

  tambah = function (nama, jumlahHutang, keterangan) {
    const namaPengutang = this.hutang.filter((data) => data.nama === nama);

    if (namaPengutang.length === 0) {
      this.hutang.push(new NewHutang(nama));
    }

    this.hutang.map((data) => {
      if (data.nama === nama) {
        data.rincian.push(new RincianHutang(jumlahHutang, keterangan));
        data.totalHutang += jumlahHutang;
      }
    });

    updateData();

    this.cekData();
  };

  hapus = function (nama) {
    const indexData = this.hutang.findIndex((data) => data.nama === nama);

    this.hutang.splice(indexData, 1);

    updateData();

    this.cekData();
  };
}

// Cashflow model
class Transaction {
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

  hitungTotalPemasukan = function () {
    let totalPemasukan = 0;

    const pemasukan = this.transaksi.filter(
      (transaksi) => transaksi.type === "Pemasukan"
    );

    pemasukan.forEach((transaksi) => (totalPemasukan += transaksi.nominal));

    return totalPemasukan;
  };

  hitungTotalPengeluaran = function () {
    let totalPengeluaran = 0;

    const pengeluaran = this.transaksi.filter(
      (transaksi) => transaksi.type === "Pengeluaran"
    );

    pengeluaran.forEach((transaksi) => (totalPengeluaran += transaksi.nominal));

    return totalPengeluaran;
  };

  hitungTotal = function () {
    return this.hitungTotalPemasukan() - this.hitungTotalPengeluaran();
  };

  cekData = function (type) {
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
  };

  tambahPemasukan = function (nominal, keterangan) {
    const pemasukan = new Transaction("Pemasukan", nominal, keterangan);

    this.transaksi.push(pemasukan);

    updateData();

    this.cekData("Pemasukan");
  };

  tambahPengeluaran = function (nominal, keterangan) {
    const pengeluaran = new Transaction("Pengeluaran", nominal, keterangan);

    this.transaksi.push(pengeluaran);

    updateData();

    this.cekData("Pengeluaran");
  };
}
