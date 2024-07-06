#! /usr/bin/env node

import fs from "fs";
import {
  bukaDompet,
  cekDompet,
  cekHutang,
  __dirname,
  tambahHutang,
  hapusHutang,
  tambahPemasukan,
  tambahPengeluaran,
  cekCashflow,
} from "./utils.js";
import yargs from "yargs";

const argv = yargs(process.argv.slice(2))
  .usage("Usage: $0 <command> [options]")
  .command("cek-dompet", "Cek uang yang ada di dompet")
  .command("cek-hutang [<nama>]", "Cek data hutang")
  .command(
    "buka-dompet [masuk] [keluar]",
    "Tambahkan atau kurangkan data pada dompet",
    {
      masuk: {
        alias: "m",
        describe: "Masukkan",
        array: true,
        required: true,
      },
      keluar: {
        alias: "k",
        describe: "Keluarkan",
        array: true,
        required: true,
      },
    }
  )
  .command(
    "tambah-hutang <nama> <nominal> <keterangan..>",
    "Tambahkan data hutang"
  )
  .command("hapus-hutang <nama>", "Hapus data hutang")
  .command("catat-pemasukan <nominal> <keterangan..>", "Tambah data pemasukan")
  .command(
    "catat-pengeluaran <nominal> <keterangan..>",
    "Tambah data pengeluaran"
  )
  .command("cek-cashflow", "Lihat data pemasukan dan pengeluaran")
  .demandCommand()
  .strict()
  .parse();

const command = argv._[0];
const nama = argv.nama;
const masuk = argv.masuk;
const keluar = argv.keluar;
const nominal = argv.nominal;
const keterangan = argv.keterangan?.join(" ");

const rawData = fs.readFileSync(__dirname + "/data.json");
const json = JSON.parse(rawData);

const { dompet, hutang } = json;

switch (command) {
  case "cek-dompet":
    cekDompet(dompet);
    break;

  case "cek-hutang":
    cekHutang(hutang, nama);
    break;

  case "cek-cashflow":
    cekCashflow();
    break;

  case "buka-dompet":
    bukaDompet(dompet, json, masuk, keluar);
    break;

  case "tambah-hutang":
    tambahHutang(nama, nominal, keterangan, json);
    break;

  case "hapus-hutang":
    hapusHutang(nama, json);
    break;

  case "catat-pemasukan":
    tambahPemasukan(nominal, keterangan);
    break;

  case "catat-pengeluaran":
    tambahPengeluaran(nominal, keterangan);
    break;

  default:
    break;
}
