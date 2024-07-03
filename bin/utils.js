import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function cekDompet(dompet) {
  console.log("Jumlah uang didompet", dompet.total);
  console.log("100K", dompet.seratus_ribu);
  console.log("50K", dompet.lima_puluh_ribu);
  console.log("20K", dompet.dua_puluh_ribu);
  console.log("10K", dompet.sepuluh_ribu);
  console.log("5K", dompet.lima_ribu);
  console.log("2K", dompet.dua_ribu);
  console.log("1K", dompet.seribu);
  console.log("500", dompet.lima_ratus);
}

function cekHutang(hutang, detail) {
  if (!detail) {
    let totalHutang = 0;
    hutang.map((data) => {
      totalHutang += data.totalHutang;
      console.log(data.nama, data.totalHutang);
    });

    console.log("Total hutang", totalHutang);
  } else {
    const data = hutang.filter((data) => data.nama === detail);
    data.map((item) => {
      if (item.nama === detail) {
        item.rincian.map((rinci) => {
          console.log(rinci.jumlah, rinci.keterangan, rinci.tanggal);
        });
        console.log("Total Hutang", item.totalHutang);
      }
    });
  }
}

function bukaDompet(dompet, json, input) {
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

  input.forEach((item) => {
    const tempArr = item.split("-");
    const opsi = tempArr[0];
    const jenisUang = tempArr[1];
    const jumlahJenisUang = parseInt(tempArr[2]);

    if (opsi === "m" || opsi === "M") {
      console.log(
        `Uang masuk dengan jenis ${jenisUang} sebanyak ${jumlahJenisUang}`
      );

      newDompet.masukkanUang(jenisUang, jumlahJenisUang);
      newDompet.total = newDompet.hitungTotal();
    } else if (opsi === "k" || opsi === "K") {
      console.log(
        `Uang keluar dengan jenis ${jenisUang} sebanyak ${jumlahJenisUang}`
      );
      newDompet.keluarkanUang(jenisUang, jumlahJenisUang);
      newDompet.total = newDompet.hitungTotal();
    } else {
      console.log("Format yang anda masukkan salah");
    }
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

export {
  cekDompet,
  cekHutang,
  bukaDompet,
  tambahHutang,
  hapusHutang,
  __dirname,
};
