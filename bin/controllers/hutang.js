import boxen from "boxen";
import table from "text-table";
import { updateData } from "../data.js";
import { formatTanggal } from "../utils.js";
import { NewHutang, RincianHutang } from "../model/hutang.js";

export function cekData(nama) {
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
}

export function tambah(nama, jumlahHutang, keterangan) {
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
}

export function hapus(nama) {
  const indexData = this.hutang.findIndex((data) => data.nama === nama);

  this.hutang.splice(indexData, 1);

  updateData();

  this.cekData();
}
