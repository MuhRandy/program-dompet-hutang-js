import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Dompet } from "./model/dompet.js";
import { Hutang } from "./model/hutang.js";
import { Cashflow } from "./model/cashflow.js";
import { ToDos } from "./model/todos.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = `${__dirname}/data.json`;

const isDataExist = fs.existsSync(dataPath);

let json = {};

export let dompetData;
export let hutangData;
export let cashflowData;
export let todosData;

if (isDataExist) {
  const rawData = fs.readFileSync(__dirname + "/data.json");
  json = JSON.parse(rawData);

  const { transaksi, dompet, hutang, todos } = json;

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

  todosData = new ToDos(todos);
} else {
  dompetData = new Dompet(0, 0, 0, 0, 0, 0, 0, 0);
  hutangData = new Hutang([]);
  cashflowData = new Cashflow([]);
  todosData = new ToDos([]);
}

export function updateData(name) {
  switch (name) {
    case "dompet":
      // upadate dompet on json data
      json.dompet = dompetData;
      break;

    case "hutang":
      // upadate hutang on json data
      json.hutang = hutangData.hutang;
      break;

    case "cashflow":
      // update cashflow on json data
      json.transaksi = cashflowData.transaksi;
      break;

    case "todos":
      // update todos on json data
      json.todos = todosData.todos;
      break;

    default:
      break;
  }

  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(json));
}
