import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Cashflow, Dompet, Hutang } from "./model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rawData = fs.readFileSync(__dirname + "/data.json");
const json = JSON.parse(rawData);

const { transaksi, dompet, hutang } = json;

export const dompetData = new Dompet(
  dompet.seratus_ribu,
  dompet.lima_puluh_ribu,
  dompet.dua_puluh_ribu,
  dompet.sepuluh_ribu,
  dompet.lima_ribu,
  dompet.dua_ribu,
  dompet.seribu,
  dompet.lima_ratus
);

export const hutangData = new Hutang(hutang);

export const cashflowData = new Cashflow(transaksi);

export function updateData() {
  // upadate hutang on json data
  json.hutang = hutangData.hutang;

  // upadate dompet on json data
  json.dompet = dompetData;

  // update cashflow on json data
  json.transaksi = cashflowData.transaksi;

  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(json));
}
