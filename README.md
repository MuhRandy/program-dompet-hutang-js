# Introduction

Program ini saya buat dengan javascript dan node js dengan tujuan belajar dan untuk memudahkan saya mendata uang yang ada di dompet dan hutang.

---

## How to Start

Pertama-tama untuk menggunakan program ini kamu dapat install dengan `npm i -g` pada root folder ini.

# Perintah

Berikut adalah perintah-perintah untuk menggunakan program ini pada terminal.

## Tambah dan Hapus Data

### Dompet

```
finnote buka-dompet <-m|--masuk> [<jenis-uang>-<jumlah-uang>] <-k|--keluar> [<jenis-uang>-<jumlah-uang>]
```

`jenis-uang` dapat diganti dengan format `k` atau `K` di akhirnya seperti 100k atau 20K.

#### Contoh

Perintah di bawah ini akan menambahkan uang dengan jenis `dua_puluh_ribu` dan `lima_puluh_ribu` masing-masing 1 pada `data.json`, dan mengurangi uang dengan jenis `seratus_ribu` sebanyak 2.

```
finnote buka-dompet -m 20K-1 50k-1 --keluar 100k-2
```

Jika ingin mengunakan salah satu saja maka perlu juga menuliskan yang lainnya meski tidak ada, misal:

```
finnote buka-dompet --masuk 20k-2 5k-1 10k-3 -k
```

### Hutang

```
finnote <opsi> <nama> <nominal> <keterangan..>
```

`<opsi>` dapat diganti berdasarkan pengguna ingin melakukan apa

```
tambah-hutang => menambahkan data hutang
hapus-hutang => menghapus data hutang berdasarkan nama
```

#### Contoh

Perintah di bawah ini akan menambahkan data hutang atas nama `Fulan` dengan nominal `2000` dan keterangan `Kopi Susu`

```
finnote tambah-hutang Fulan 2000 Kopi Susu
```

Perintah di bawah ini akan menghapus data hutang atas nama `Fulan`

```
finnote hapus-hutang Fulan
```

### Cashflow

```
finnote <opsi> <nominal> <keterangan>
```

`<opsi>` dapat diganti berdasarkan pengguna ingin melakukan apa

```
catat-pemasukan => menambahkan data pemasukan
catat-pengeluaran => menambahkan data pengeluaran
```

#### Contoh

Perintah di bawah ini akan menambahkan data pemasukan dengan nominal 7000 dan keterangan jualan pulsa.

```
finnote catat-pemasukan 7000 Jualan pulsa
```

Perintah di bawah ini akan menambahkan data pengeluaran dengan nominal 5000 dan keterangan beli cilok

```
finnote catat-pengeluaran 5000 Beli cilok
```

## Lihat Data

```
finnote <cek-data> [<nama>]
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
finnote cek-hutang Fulan
```

## Help

Untuk dapat lebih mengetahui apa saja _command_ yang tersedia maka kamu dapat cek dengan `--help` pada _command_ tersebut.

```
finnote --help
finnote cek-dompet --help
finnote cek-hutang --help
finnote cek-cashflow --help
finnote buka-dompet --help
finnote tambah-hutang --help
finnote hapus-hutang --help
finnote catat-pemasukan --help
finnote catat-pengeluaran --help
```
