# Introduction

Program ini saya buat dengan bahasa javascript dan node js dengan tujuan belajar dan untuk memudahkan saya mendata uang yang ada di dompet dan hutang.

---

# Pra-syarat

Pertama-tama untuk menggunakan program ini, kamu harus membuat file `data.json` yang berisi

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
node dompet [<opsi>-<jenis_uang>-<banyak_jenis_uang>]
```

`<opsi>` dapat diganti dengan format `m` atau `M` untuk uang masuk dan `k` atau `K` untuk uang keluar.

`<jenis_uang>` dapat diganti dengan format `k` atau `K` di akhirnya seperti 100k atau 20K.

#### Contoh

Perintah di bawah ini akan menambahkan uang dengan jenis `dua_puluh_ribu` dan `lima_puluh_ribu` masing-masing 1 pada `data.json`, dan mengurangi uang dengan jenis `seratus_ribu` sebanyak 2.

```
node dompet m-20K-1 k-100k-2 M-50k-1
```

### Hutang

```
node hutang <opsi> <nama> <hutang> <keterangan>
```

`<opsi>` dapat diganti berdasarkan pengguna ingin melakukan apa

```
tambah => menambahkan data
hapus => menghapus data berdasarkan nama
```

`<hutang>` diisi dengan jumlah atau nominal hutang (angka)

#### Contoh

Perintah di bawah ini akan menambahkan data hutang atas nama `Fulan` dengan nominal `2000` dan keterangan `Kopi Susu`

```
node hutang tambah Fulan 2000 "Kopi Susu"
```

Perintah di bawah ini akan menghapus data hutang atas nama `Fulan`

```
node hutang hapus Fulan
```

## Lihat Data

```
node data <cek-data> <nama>
```

`<cek-data>` dapat di ganti dengan

```
cek-dompet => melihat data dompet
cek-hutang => melihat data hutang
```

Isi `<nama>` jika kamu ingin melihat detail dari hutang atas nama tersebut saat `cek-hutang`

### Contoh

Perintah di bawah ini akan cek detail data hutang atas nama Fulan

```
node data cek-hutang Fulan
```
