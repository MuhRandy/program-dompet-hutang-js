import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Cashflow } from "./model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rawData = fs.readFileSync(__dirname + "/data.json");
const json = JSON.parse(rawData);

export const cashflowData = json.cashflow;

export const cashflow = new Cashflow(
  cashflowData.transaksi,
  cashflowData.totalPemasukan,
  cashflowData.totalPengeluaran,
  cashflowData.total
);

export function updateData() {
  // update cashflow on json data
  json.cashflow = cashflow;

  cashflow.hitungTotalPemasukan();
  cashflow.hitungTotalPengeluaran();
  cashflow.hitungTotal();

  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(json));
}
