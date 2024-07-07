import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Dompet } from "./model/dompet.js";
import { Hutang } from "./model/hutang.js";
import { Cashflow } from "./model/cashflow.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = `${__dirname}/data.json`;

const isDataExist = fs.existsSync(dataPath);

let json = {};

export let dompetData;
export let hutangData;
export let cashflowData;

if (isDataExist) {
  const rawData = fs.readFileSync(__dirname + "/data.json");
  json = JSON.parse(rawData);

  const { transaksi, dompet, hutang } = json;

  dompetData = new Dompet(
    dompet.seratus_ribu,
    dompet.lima_puluh_ribu,
    dompet.dua_puluh_ribu,
    dompet.sepuluh_ribu,
    dompet.lima_ribu,
    dompet.dua_ribu,
    dompet.seribu,
    dompet.lima_ratus
  );

  hutangData = new Hutang(hutang);

  cashflowData = new Cashflow(transaksi);
} else {
  dompetData = new Dompet(0, 0, 0, 0, 0, 0, 0, 0);
  hutangData = new Hutang([]);
  cashflowData = new Cashflow([]);
}

export function updateData() {
  // upadate hutang on json data
  json.hutang = hutangData.hutang;

  // upadate dompet on json data
  json.dompet = dompetData;

  // update cashflow on json data
  json.transaksi = cashflowData.transaksi;

  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(json));
}
