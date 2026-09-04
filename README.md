# RPA Insights Hub

Buatkan sebuah website dashboard modern dan profesional dengan nama RPA.

Website ini merupakan Automation Reporting Dashboard yang digunakan untuk memonitor berbagai use case automation/RPA dan membantu mengotomatisasi proses pembuatan serta pengiriman report kepada user melalui email.

Konsep Utama

Saat pertama kali membuka dashboard, tampilkan halaman overview yang berisi beberapa summary cards/kotak statistik.

Setiap card menampilkan informasi seperti:

Total Use Case
Success Rate dalam persentase
Total Issue/Error
Unattended Process
Attended Process
Report yang berhasil dikirim

Contoh:

Total Use Case
25

Success Rate
85%

Total Issue
12

Report Sent
20

Gunakan tampilan card yang modern, clean, informatif, dan mudah dibaca.

Use Case Section

Di bawah summary cards, tampilkan daftar seluruh Use Case.

Contoh:

Use Case A
Use Case B
Use Case C
Use Case D

Setiap use case ditampilkan dalam bentuk card atau tabel modern.

Informasi singkat yang ditampilkan:

Nama Use Case
Persentase keberhasilan
Status
Jumlah Issue
Type Automation

Ketika user mengklik salah satu Use Case, tampilkan halaman atau detail panel yang berisi:

Detail Use Case
Nama Use Case
Success Rate (%)
Total Process
Total Success
Total Failed
Status
Issue/Error

Tampilkan daftar issue yang terjadi.

Setiap issue memiliki informasi:

Nama Issue
Deskripsi Error
Waktu Error
Status Error
Error Type

Untuk sementara terdapat 2 jenis error:

Error A
Error B

Tampilkan error tersebut menggunakan badge atau label yang berbeda agar mudah dibedakan.

Automation Type

Tampilkan jenis automation dari use case:

Attended
Unattended

Gunakan badge modern untuk membedakan kedua tipe tersebut.

Report & Email Automation

Dashboard ini bertujuan untuk mengurangi pekerjaan manual.

Sebelumnya proses dilakukan secara manual:

Mengambil data
Melakukan cleansing data
Membuat report
Menghubungi atau mengirim report kepada user secara manual

Melalui dashboard ini, proses tersebut harus dapat dilakukan secara lebih otomatis.

Sediakan fitur:

Generate Report

Terdapat tombol:

Generate Report

Ketika diklik, sistem dapat menghasilkan report berdasarkan data use case yang dipilih.

User dapat memilih:

Use Case
Periode Report
Jenis Report

Setelah itu report dapat dibuat secara otomatis.

Email Report

Sediakan fitur untuk mengirim report langsung melalui email.

User dapat:

Memilih Use Case
Memilih penerima email
Memilih periode report
Menambahkan subject email
Menambahkan pesan

Terdapat tombol:

Send Report

Dashboard harus memberikan gambaran bahwa proses report dapat dilakukan secara otomatis tanpa perlu menghubungi setiap user secara manual.

Tambahkan juga riwayat pengiriman email, misalnya:

Use Case	Recipient	Date	Status
Use Case A	user@email.com	04 Sep 2026	Sent
Use Case B	user@email.com	03 Sep 2026	Sent

Status:

Sent
Pending
Failed
Sidebar Navigation

Buat sidebar modern seperti referensi gambar pertama.

Menu utama:

DASHBOARD
Overview
REPORT MANAGEMENT
Use Cases
Generate Report
Report History
EMAIL
Email Management
Email History
SETTINGS
General Settings
User Management
Email Configuration

Sidebar harus bisa diminimize/collapse.

Header

Di bagian atas dashboard terdapat:

Judul halaman
Search bar
Notification icon
Profile user
Dark/Light mode toggle
Design Style

Gunakan desain yang terinspirasi dari referensi dashboard modern yang saya berikan.

Gaya desain:

Modern
Professional
Clean
Futuristic
Enterprise dashboard
Minimal tetapi informatif

Gunakan banyak whitespace agar dashboard tidak terlihat terlalu penuh.

Color Palette

Warna utama menggunakan identitas IRPAT.

Dark Mode

Gunakan kombinasi:

Background utama: Hitam / Dark charcoal
Card: Abu-abu gelap
Sidebar: Hitam
Primary accent: Merah
Secondary accent: Abu-abu
Text utama: Putih
Text secondary: Abu-abu muda

Gunakan aksen merah sebagai warna utama untuk:

Button
Active menu
Chart highlight
Important status
Hover state

Jangan menggunakan warna terlalu banyak. Fokus pada kombinasi:

Merah + Hitam + Abu-abu + Putih

Light Mode

Sediakan fitur Light Mode.

Untuk Light Mode:

Background: Putih atau abu-abu sangat muda
Card: Putih
Primary color: Merah IRPAT
Text: Hitam / abu gelap
Border: Abu-abu muda

Perpindahan antara Dark Mode dan Light Mode harus terlihat smooth dan modern.

Dashboard Components

Gunakan berbagai visualisasi data seperti:

Progress Bar
Percentage Indicator
Donut Chart
Bar Chart
Line Chart
Status Badge
Modern Data Table

Contoh grafik:

Automation Performance

Menampilkan:

Success
Failed
Success Rate
Error Distribution

Menampilkan:

Error A
Error B
Automation Type

Menampilkan perbandingan:

Attended
Unattended
User Experience

Dashboard harus mudah digunakan oleh user non-technical.

Prioritas utama:

Informasi mudah dipahami
Data mudah dicari
Use Case mudah diakses
Error mudah dianalisis
Report mudah dibuat
Report mudah dikirim melalui email

Gunakan:

Hover effects
Smooth transitions
Rounded cards
Modern icons
Responsive design

Dashboard harus responsive untuk:

Desktop
Tablet
Mobile
Important Goal

Tujuan utama website RPA adalah:

Mengotomatisasi proses monitoring use case, pembuatan report, dan pengiriman report kepada user melalui email.

Dengan adanya dashboard ini, admin tidak perlu lagi melakukan proses manual seperti mengambil data, melakukan cleansing, membuat report, dan mengirimkan report satu per satu kepada user.

Website harus memberikan kesan sebagai professional enterprise automation monitoring and reporting platform.

dan itu logonya ya

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bot-metrics-center.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b4e4a296-0d7e-4193-a50e-0c0842a3a7ae).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
