#! /usr/bin/env node

import { cashflowData, dompetData, hutangData, todosData } from "./data.js";
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
        describe: "Masukkan uang",
        array: true,
        required: true,
      },
      keluar: {
        alias: "k",
        describe: "Keluarkan uang",
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
  .command("cek-todo", "Lihat To Do")
  .command("tambah-todo <namaToDo..>", "Menambah To Do")
  .command("toggle-todo <nomor>", "Toggle To Do berdasarkan <nomor>")
  .command("reset-todo", "Hapus semua To Do")
  .demandCommand()
  .strict()
  .parse();

const command = argv._[0];
const nama = argv.nama;
const namaToDo = argv.namaToDo?.join(" ");
const masuk = argv.masuk;
const keluar = argv.keluar;
const nominal = argv.nominal;
const keterangan = argv.keterangan?.join(" ");
const number = argv.nomor;

switch (command) {
  case "cek-dompet":
    dompetData.cekData();
    break;

  case "cek-hutang":
    hutangData.cekData(nama);
    break;

  case "cek-cashflow":
    console.log(`Cashflow :${cashflowData.hitungTotal()}`);
    cashflowData.cekData("Pemasukan");
    cashflowData.cekData("Pengeluaran");
    break;

  case "cek-todo":
    todosData.lookToDo();
    break;

  case "buka-dompet":
    dompetData.bukaDompet(masuk, keluar);
    break;

  case "tambah-hutang":
    hutangData.tambah(nama, nominal, keterangan);
    break;

  case "hapus-hutang":
    hutangData.hapus(nama);
    break;

  case "catat-pemasukan":
    cashflowData.tambahPemasukan(nominal, keterangan);
    break;

  case "catat-pengeluaran":
    cashflowData.tambahPengeluaran(nominal, keterangan);
    break;

  case "tambah-todo":
    todosData.addTodo(namaToDo);
    break;

  case "toggle-todo":
    todosData.toggleTodo(number);
    break;

  case "reset-todo":
    todosData.resetTodos();
    break;

  default:
    break;
}
