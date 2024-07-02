const fs = require("fs");

const option = process.argv[2];
const detail = process.argv[3];

const rawData = fs.readFileSync("./data.json");
const json = JSON.parse(rawData);

const { dompet, hutang } = json;

switch (option) {
  case "cek-dompet":
    cekDompet(dompet);
    break;

  case "cek-hutang":
    cekHutang(hutang, detail);
    break;

  default:
    break;
}

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

module.exports = { cekDompet, cekHutang };
