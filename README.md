# Introduction

Program ini saya buat dengan javascript dan node js dengan tujuan belajar dan untuk memudahkan saya mendata uang yang ada di dompet dan hutang.

---

# Pra-syarat

Pertama-tama untuk menggunakan program ini kamu dapat install dengan `npm i -g` pada root folder ini. Kemudian buat file `data.json` pada folder bin lalu copy json di bawah ini dan paste di dalamnya.

```json
{
  "dompet": {
    "seratus_ribu": 0,
    "lima_puluh_ribu": 0,
    "dua_puluh_ribu": 0,
    "sepuluh_ribu": 0,
    "lima_ribu": 0,
    "dua_ribu": 0,
    "seribu": 0,
    "lima_ratus": 0
  },
  "hutang": [],
  "cashflow": {
    "transaksi": []
  }
}
```

# Perintah

Berikut adalah perintah-perintah untuk menggunakan program ini pada terminal.

## Tambah dan Hapus Data

### Dompet

```
mywallet buka-dompet <-m|--masuk> [<jenis-uang>-<jumlah-uang>] <-k|--keluar> [<jenis-uang>-<jumlah-uang>]
```

`jenis-uang` dapat diganti dengan format `k` atau `K` di akhirnya seperti 100k atau 20K.

#### Contoh

Perintah di bawah ini akan menambahkan uang dengan jenis `dua_puluh_ribu` dan `lima_puluh_ribu` masing-masing 1 pada `data.json`, dan mengurangi uang dengan jenis `seratus_ribu` sebanyak 2.

```
mywallet buka-dompet -m 20K-1 50k-1 --keluar 100k-2
```

Jika ingin mengunakan salah satu saja maka perlu juga menuliskan yang lainnya meski tidak ada, misal:

```
mywallet buka-dompet --masuk 20k-2 5k-1 10k-3 -k
```

### Hutang

```
mywallet <opsi> <nama> <nominal> <keterangan..>
```

`<opsi>` dapat diganti berdasarkan pengguna ingin melakukan apa

```
tambah-hutang => menambahkan data hutang
hapus-hutang => menghapus data hutang berdasarkan nama
```

#### Contoh

Perintah di bawah ini akan menambahkan data hutang atas nama `Fulan` dengan nominal `2000` dan keterangan `Kopi Susu`

```
mywallet tambah-hutang Fulan 2000 Kopi Susu
```

Perintah di bawah ini akan menghapus data hutang atas nama `Fulan`

```
mywallet hapus-hutang Fulan
```

### Cashflow

```
mywallet <opsi> <nominal> <keterangan>
```

`<opsi>` dapat diganti berdasarkan pengguna ingin melakukan apa

```
catat-pemasukan => menambahkan data pemasukan
catat-pengeluaran => menambahkan data pengeluaran
```

#### Contoh

Perintah di bawah ini akan menambahkan data pemasukan dengan nominal 7000 dan keterangan jualan pulsa.

```
mywallet catat-pemasukan 7000 Jualan pulsa
```

Perintah di bawah ini akan menambahkan data pengeluaran dengan nominal 5000 dan keterangan beli cilok

```
mywallet catat-pengeluaran 5000 Beli cilok
```

## Lihat Data

```
mywallet <cek-data> [<nama>]
```

`<cek-data>` dapat di ganti dengan

```
cek-dompet => melihat data dompet
cek-hutang => melihat data hutang
cek-cashflow => melihat data cashflow
```

Isi `<nama>` jika ingin melihat detail dari hutang atas nama tersebut saat `cek-hutang`

### Contoh

Perintah di bawah ini akan cek detail data hutang atas nama Fulan

```
mywallet cek-hutang Fulan
```

## Help

Untuk dapat lebih mengetahui apa saja _command_ yang tersedia maka kamu dapat cek dengan `--help` pada _command_ tersebut.

```
mywallet --help
mywallet cek-dompet --help
mywallet cek-hutang --help
mywallet cek-cashflow --help
mywallet buka-dompet --help
mywallet tambah-hutang --help
mywallet hapus-hutang --help
mywallet catat-pemasukan --help
mywallet catat-pengeluaran --help
```
