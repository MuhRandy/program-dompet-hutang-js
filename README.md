# Introduction

Program ini saya buat dengan bahasa javascript dan node js dengan tujuan belajar dan untuk memudahkan saya mendata uang yang ada di dompet dan hutang.

---

# Pra-syarat

Pertama-tama untuk menggunakan program ini kamu dapat install dengan `npm i -g` pada root folder ini. Kemudian buat file `data.json` pada folder bin lalu tuliskan ini didalamnya.

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
  "hutang": []
}
```

# Perintah

Berikut adalah perintah-perintah untuk menggunakan program ini pada terminal.

## Tambah dan Hapus Data

### Dompet

```
mywallet buka-dompet -m [jenis_uang-jumlah_uang] -k [jenis_uang-jumlah_uang]
```

`-m` dapat diganti dengan format `--masuk` untuk uang masuk dan `k` dengan `--keluar` untuk uang keluar.

`jenis_uang` dapat diganti dengan format `k` atau `K` di akhirnya seperti 100k atau 20K.

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
mywallet <opsi> -n [nama] -j [hutang] -k [keterangan]
```

`<opsi>` dapat diganti berdasarkan pengguna ingin melakukan apa

```
tambah-hutang => menambahkan data
hapus-hutang => menghapus data berdasarkan nama
```

`[hutang]` diisi dengan jumlah atau nominal hutang (angka)

#### Contoh

Perintah di bawah ini akan menambahkan data hutang atas nama `Fulan` dengan nominal `2000` dan keterangan `Kopi Susu`

```
mywallet tambah-hutang -n Fulan -j 2000 -k Kopi Susu
```

Perintah di bawah ini akan menghapus data hutang atas nama `Fulan`

```
mywallet hapus-hutang Fulan
```

## Lihat Data

```
mywallet <cek-data> [nama]
```

`<cek-data>` dapat di ganti dengan

```
cek-dompet => melihat data dompet
cek-hutang => melihat data hutang
```

Isi `[nama]` jika kamu ingin melihat detail dari hutang atas nama tersebut saat `cek-hutang`

### Contoh

Perintah di bawah ini akan cek detail data hutang atas nama Fulan

```
mywallet cek-hutang -n Fulan
```

## Help

Untuk dapat lebih mengetahui apa saja _command_ yang tersedia maka kamu dapat cek dengan `--help` pada _command_ tersebut.

```
mywallet --help
mywallet cek-dompet --help
mywallet cek-hutang --help
mywallet buka-dompet --help
mywallet tambah-hutang --help
mywallet hapus-hutang --help
```
