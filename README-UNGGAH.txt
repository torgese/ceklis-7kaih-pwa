CEKLIS 7KAIH — FILE PWA GITHUB PAGES (TAHAP UJI)

1. Ekstrak ZIP ini. Unggah FILE-FILE DI DALAMNYA ke ROOT repository `ceklis-7kaih-pwa`, BUKAN folder induk.
2. Di GitHub, edit file firebase-config.js: salin konfigurasi firebaseConfig dari Firebase Console (hanya nilai apiKey, authDomain, projectId, messagingSenderId, appId).
3. Edit config.js: isi GAS_WEBAPP_URL dengan URL Web App DEPLOYMENT UJI yang memiliki route aktivasi V2.2.0, dan VAPID_PUBLIC_KEY dengan Web Push public key dari Firebase.
4. GitHub Pages URL: https://torgese.github.io/ceklis-7kaih-pwa/
5. Halaman PWA dapat terbuka lebih awal, tetapi aktivasi notifikasi TIDAK bisa digunakan sampai GAS UJI, Firebase dan registrasi terpasang & diuji.
6. Jangan unggah GAS sumber sekolah, spreadsheet, PIN siswa, service account/private key, token OAuth, .clasprc.json ke GitHub.
7. Pastikan script.google.com GAS uji masih menggunakan data ANONIM, bukan database produksi.
8. Catatan: paket V2.2.0 sebelumnya masih memiliki beberapa batasan dan belum layak dipasang di produksi; periksa PANDUAN_INSTALASI.md di paket lengkap untuk detailnya.
9. Mengunggah ZIP mentah ke root repo tidak akan otomatis mengekstrak file; gunakan Add file > Upload files dan pilih berkas hasil ekstraksi.
