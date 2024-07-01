const fs = require("fs");

const rawData = fs.readFileSync("./data.json");
const dataJSON = JSON.parse(rawData);
const dompetData = dataJSON.dompet;

const input = process.argv.slice(2);

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
  masukkanUang(jenisUang, jumlahJenisUang) {
    switch (jenisUang) {
      case "100K":
      case "100k":
        return (this.seratus_ribu += jumlahJenisUang);
      case "50K":
      case "50k":
        return (this.lima_puluh_ribu += jumlahJenisUang);
      case "20K":
      case "20k":
        return (this.dua_puluh_ribu += jumlahJenisUang);
      case "10K":
      case "10k":
        return (this.sepuluh_ribu += jumlahJenisUang);
      case "5K":
      case "5k":
        return (this.lima_ribu += jumlahJenisUang);
      case "2K":
      case "2k":
        return (this.dua_ribu += jumlahJenisUang);
      case "1K":
      case "1k":
        return (this.seribu += jumlahJenisUang);
      case "500":
        return (this.lima_ratus += jumlahJenisUang);

      default:
        return;
    }
  },
  keluarkanUang(jenisUang, jumlahJenisUang) {
    switch (jenisUang) {
      case "100K":
      case "100k":
        return (this.seratus_ribu -= jumlahJenisUang);
      case "50K":
      case "50k":
        return (this.lima_puluh_ribu -= jumlahJenisUang);
      case "20K":
      case "20k":
        return (this.dua_puluh_ribu -= jumlahJenisUang);
      case "10K":
      case "10k":
        return (this.sepuluh_ribu -= jumlahJenisUang);
      case "5K":
      case "5k":
        return (this.lima_ribu -= jumlahJenisUang);
      case "2K":
      case "2k":
        return (this.dua_ribu -= jumlahJenisUang);
      case "1K":
      case "1k":
        return (this.seribu -= jumlahJenisUang);
      case "500":
        return (this.lima_ratus -= jumlahJenisUang);

      default:
        return;
    }
  },
};

const data = dataJSON;
data.dompet = dompet;

input.forEach((item) => {
  const tempArr = item.split("-");
  const opsi = tempArr[0];
  const jenisUang = tempArr[1];
  const jumlahJenisUang = parseInt(tempArr[2]);

  if (opsi === "m" || opsi === "M") {
    console.log(
      `Uang masuk dengan jenis ${jenisUang} sebanyak ${jumlahJenisUang}`
    );

    dompet.masukkanUang(jenisUang, jumlahJenisUang);
    dompet.total = dompet.hitungTotal();
  } else if (opsi === "k" || opsi === "K") {
    console.log(
      `Uang keluar dengan jenis ${jenisUang} sebanyak ${jumlahJenisUang}`
    );
    dompet.keluarkanUang(jenisUang, jumlahJenisUang);
    dompet.total = dompet.hitungTotal();
  } else {
    console.log("Format yang anda masukkan salah");
  }
});

fs.writeFileSync("./data.json", JSON.stringify(data));
console.log(dompet);
