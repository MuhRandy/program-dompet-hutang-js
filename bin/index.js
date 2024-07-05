#! /usr/bin/env node

import fs from "fs";
import {
  bukaDompet,
  cekDompet,
  cekHutang,
  __dirname,
  tambahHutang,
  hapusHutang,
} from "./utils.js";
import yargs from "yargs";

const argv = yargs(process.argv.slice(2))
  .usage("Usage: $0 <command> [options]")
  .command("$0 <command> [options]")
  .command("cek-dompet", "Cek uang yang ada di dompet")
  .command(
    "cek-hutang [nama]",
    "Cek hutang. Jika [nama] diisi maka cek hutang atas [nama]",
    {
      nama: {
        alias: "n",
        describe: "Nama",
      },
    }
  )
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
    "tambah-hutang [nama] [banyak_hutang] [keterangan]",
    "Tambahkan data hutang",
    {
      nama: {
        alias: "n",
        describe: "Nama",
        required: true,
      },
      nominal: {
        alias: "j",
        describe: "Nominal",
        required: true,
        type: "number",
      },
      keterangan: {
        alias: "k",
        describe: "Keterangan",
        required: true,
        array: true,
      },
    }
  )
  .command("hapus-hutang [nama]", "Hapus data hutang", {
    nama: {
      alias: "n",
      describe: "Nama",
      required: true,
    },
  })
  .example("$0 cek-hutang -n Budi", "Cek detail hutang atas nama Budi")
  .parse();

const command = argv._[0];
const nama = argv.nama;
const masuk = argv.masuk;
const keluar = argv.keluar;
const nominal = argv.nominal;
const keterangan = argv.keterangan;

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

  case "buka-dompet":
    bukaDompet(dompet, json, masuk, keluar);
    break;

  case "tambah-hutang":
    tambahHutang(nama, nominal, keterangan, json);
    break;
  case "hapus-hutang":
    hapusHutang(nama, json);
    break;

  default:
    break;
}
