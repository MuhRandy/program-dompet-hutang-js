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

const option = process.argv[2];
const nama = process.argv[3];

const rawData = fs.readFileSync(__dirname + "/data.json");
const json = JSON.parse(rawData);

const { dompet, hutang } = json;

switch (option) {
  case "cek-dompet":
    cekDompet(dompet);
    break;

  case "cek-hutang":
    const detail = process.argv[3];
    cekHutang(hutang, detail);
    break;

  case "buka-dompet":
    const input = process.argv.slice(3);
    bukaDompet(dompet, json, input);
    break;

  case "tambah-hutang":
    const jumlahHutang = parseInt(process.argv[4]);
    const keterangan = process.argv[5];

    tambahHutang(nama, jumlahHutang, keterangan, json);
    break;
  case "hapus-hutang":
    hapusHutang(nama, json);
    break;

  default:
    break;
}
