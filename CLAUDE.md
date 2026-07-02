# library-app-project-wph

Library Web – MVP Guide (Frontend)
Tujuan: Mentee bikin Library Web App yang bisa login, lihat daftar buku, pinjam, review, dan cek
riwayat.
Tech Stack Wajib
• React + TypeScript: framework + type safety
• Tailwind CSS: styling cepat
• shadcn/ui: komponen siap pakai
• Redux Toolkit: simpan token, filter, cart, UI state
• TanStack Query: fetching + caching data
• Optimistic UI: UX cepat (stok langsung berkurang saat pinjam)
• (Opsional) Framer Motion: animasi transisi

Halaman Minimal
Halaman Fitur Utama
Login / Register Form login & register: simpan token
Book List List buku + filter kategori + search.
Book Detail Detail buku + stok + review + tombol pinjam
My Loans Daftar pinjaman user (status BORROWED/RETURNED)
My Profile Data user + statistik pinjaman
(Opsional) Cart Pinjam banyak buku sekaligus
Manajemen State
• Redux Toolkit
o authSlice: token + data user
o uiSlice: filter & search
o (Opsional) cartSlice: daftar buku yang mau dipinjam
• React Query
o useQuery: fetch books, detail, loans
o useMutation: login, pinjam, review
o Aktifkan optimistic update supaya UI cepat

UX / UI Guideline
• Pakai shadcn/ui untuk konsistensi
• Tailwind untuk layout responsive
• Tambahkan loading + error state di semua halaman
• Pakai toast/snackbar untuk feedback sukses/gagal
• Format tanggal dengan baik dan best practice
Flow Utama
1. Login/Register → simpan token
2. Browse Books → filter/search → klik detail
3. Pinjam Buku → stok berkurang (optimistic)
4. Tambah Review → langsung muncul
5. My Loans → cek status & due date
6. My Profile → update profil, lihat statistic
7. Admin All Feature
Definition of Done
• Login & register berjalan
• List buku tampil + bisa filter/search
• Detail buku & review tampil
• Pinjam buku bisa → stok berkurang
• Daftar pinjaman user tampil
• Review bisa ditambah/hapus
• Semua request yang butuh token → dicek
• UI rapi, responsive, ada loading/error state
Tips
• Kerjakan step-by-step → auth → list → detail → loans → profile
• Commit per feature biar progress mudah dicek
• Mulai dari desain sederhana → baru polish UI
• Bisa deploy ke Vercel supaya semua bisa coba