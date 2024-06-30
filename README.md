# Introduction

Program ini saya buat dengan bahasa javascript dengan tujuan belajar dan untuk memudahkan saya mendata uang yang ada di dompet dan hutang.

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
node dompet <jenis-uang> <banyak-jenis-uang>
```

`<jenis-uang>` dapat diganti dengan format berikut

```
100K => seratus_ribu
50K => lima_puluh_ribu
20K => dua_puluh_ribu
10K => sepuluh_ribu
5K => lima_ribu
2K => dua_ribu
1K => seribu
500 => lima_ratus
```

#### Contoh

Perintah di bawah ini menambahkan uang dengan jenis `dua_puluh_ribu` pada `data.json`

```
node dompet 20K 2
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
