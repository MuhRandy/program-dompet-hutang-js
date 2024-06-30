const fs = require("fs");

const rawData = fs.readFileSync("./data.json");
const dataJSON = JSON.parse(rawData);
const dompetData = dataJSON.dompet;

const jenisUang = process.argv[2];
const jumlahJenisUang = parseInt(process.argv[3]);

const dompet = {
  seratus_ribu: dompetData.seratus_ribu,
  lima_puluh_ribu: dompetData.lima_puluh_ribu,
  dua_puluh_ribu: dompetData.dua_puluh_ribu,
  sepuluh_ribu: dompetData.sepuluh_ribu,
  lima_ribu: dompetData.lima_ribu,
  dua_ribu: dompetData.dua_ribu,
  seribu: dompetData.seribu,
  lima_ratus: dompetData.lima_ratus,
  hitungTotal() {
    return (
      this.seratus_ribu * 100000 +
      this.lima_puluh_ribu * 50000 +
      this.dua_puluh_ribu * 20000 +
      this.sepuluh_ribu * 10000 +
      this.lima_ribu * 5000 +
      this.dua_ribu * 2000 +
      this.seribu * 1000 +
      this.lima_ratus * 500
    );
  },
  tambahUang(jenisUang, jumlahJenisUang) {
    switch (jenisUang) {
      case "100K":
        return (this.seratus_ribu += jumlahJenisUang);
      case "50K":
        return (this.lima_puluh_ribu += jumlahJenisUang);
      case "20K":
        return (this.dua_puluh_ribu += jumlahJenisUang);
      case "10K":
        return (this.sepuluh_ribu += jumlahJenisUang);
      case "5K":
        return (this.lima_ribu += jumlahJenisUang);
      case "2K":
        return (this.dua_ribu += jumlahJenisUang);
      case "1K":
        return (this.seribu += jumlahJenisUang);
      case "500":
        return (this.lima_ratus += jumlahJenisUang);

      default:
        return;
    }
  },
};

const data = dataJSON;
data.dompet = dompet;

dompet.tambahUang(jenisUang, jumlahJenisUang);
dompet.total = dompet.hitungTotal();

fs.writeFileSync("./data.json", JSON.stringify(data));

console.log(dompet);
