const fs = require("fs");
const { cekHutang } = require("./data");

const rawData = fs.readFileSync("./data.json");
const dataJSON = JSON.parse(rawData);

const aksi = process.argv[2];
const nama = process.argv[3];
const jumlahHutang = parseInt(process.argv[4]);
const keterangan = process.argv[5];

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

const data = dataJSON;
const hutang = data.hutang;

switch (aksi) {
  case "tambah":
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
    break;

  case "hapus":
    const indexData = hutang.findIndex((data) => data.nama === nama);

    hutang.splice(indexData, 1);
    break;

  default:
    break;
}

fs.writeFileSync("./data.json", JSON.stringify(data));

cekHutang(data.hutang);
