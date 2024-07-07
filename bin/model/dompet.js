import {
  bukaDompet,
  cekData,
  hitungTotal,
  keluarkanUang,
  masukkanUang,
} from "../controllers/dompet.js";

export class Dompet {
  constructor(
    seratus_ribu,
    lima_puluh_ribu,
    dua_puluh_ribu,
    sepuluh_ribu,
    lima_ribu,
    dua_ribu,
    seribu,
    lima_ratus
  ) {
    this.seratus_ribu = seratus_ribu;
    this.lima_puluh_ribu = lima_puluh_ribu;
    this.dua_puluh_ribu = dua_puluh_ribu;
    this.sepuluh_ribu = sepuluh_ribu;
    this.lima_ribu = lima_ribu;
    this.dua_ribu = dua_ribu;
    this.seribu = seribu;
    this.lima_ratus = lima_ratus;
  }

  hitungTotal = hitungTotal;

  masukkanUang = masukkanUang;

  keluarkanUang = keluarkanUang;

  cekData = cekData;

  bukaDompet = bukaDompet;
}
