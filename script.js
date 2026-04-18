/* ===========================
   SIT PERMATA PAPUA - script.js
=========================== */

'use strict';

/* ── CUSTOM CURSOR ── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', e => {
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

document.addEventListener('mouseover', e => {
  if (e.target.matches('a, button, [role="button"], input, select, textarea, label, .galeri-item, .prog-card, .val-card')) {
    ring.classList.add('hovered');
  }
});
document.addEventListener('mouseout', () => ring.classList.remove('hovered'));

/* ── SPA NAVIGATION ── */
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');

function showPage(id) {
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'portal') initPortal();
}

navLinks.forEach(l => l.addEventListener('click', () => showPage(l.dataset.page)));
showPage('home');

/* ── TICKER PAUSE ON HOVER ── */
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}

/* ─────────────────────────────────────
   HALAMAN DAFTAR - MULTI-STEP FORM
───────────────────────────────────────*/

let currentStep = 1;
const totalSteps = 4;
let formData = {};
let uploadedFiles = [];

function goToStep(n) {
  if (n < 1 || n > totalSteps) return;

  // Validate before going forward
  if (n > currentStep && !validateStep(currentStep)) return;

  currentStep = n;

  // Update bubbles
  document.querySelectorAll('.step-bubble').forEach((b, i) => {
    const stepN = i + 1;
    b.classList.toggle('active', stepN === n);
    b.classList.toggle('done', stepN < n);
  });

  // Update lines
  document.querySelectorAll('.step-line').forEach((l, i) => {
    l.classList.toggle('done', i + 1 < n);
  });

  // Show correct form step
  document.querySelectorAll('.form-step').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === n);
  });

  if (n === 4) buildReview();
}

function validateStep(step) {
  const required = document.querySelectorAll(`#form-step-${step} [required]`);
  let valid = true;
  required.forEach(el => {
    el.classList.remove('error');
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    }
  });
  if (!valid) showToast('⚠️ Mohon lengkapi semua field yang wajib diisi', 'error');
  return valid;
}

function buildReview() {
  const getVal = id => {
    const el = document.getElementById(id);
    return el ? el.value : '-';
  };
  const getRadio = name => {
    const el = document.querySelector(`[name="${name}"]:checked`);
    return el ? el.value : '-';
  };

  document.getElementById('review-content').innerHTML = `
    <div class="review-card">
      <div class="review-section-title">📋 Data Siswa</div>
      <div class="review-row"><span class="review-key">Nama Lengkap</span><span class="review-val">${getVal('nama_lengkap')}</span></div>
      <div class="review-row"><span class="review-key">Tempat, Tgl Lahir</span><span class="review-val">${getVal('tempat_lahir')}, ${getVal('tgl_lahir')}</span></div>
      <div class="review-row"><span class="review-key">Jenis Kelamin</span><span class="review-val">${getRadio('jenis_kelamin')}</span></div>
      <div class="review-row"><span class="review-key">Agama</span><span class="review-val">${getVal('agama')}</span></div>
      <div class="review-row"><span class="review-key">Jenjang Pendaftaran</span><span class="review-val">${getRadio('jenjang')}</span></div>
      <div class="review-row"><span class="review-key">Asal Sekolah</span><span class="review-val">${getVal('asal_sekolah') || '-'}</span></div>
    </div>
    <div class="review-card">
      <div class="review-section-title">👪 Data Orang Tua / Wali</div>
      <div class="review-row"><span class="review-key">Nama Ayah</span><span class="review-val">${getVal('nama_ayah')}</span></div>
      <div class="review-row"><span class="review-key">Nama Ibu</span><span class="review-val">${getVal('nama_ibu')}</span></div>
      <div class="review-row"><span class="review-key">No. Telepon</span><span class="review-val">${getVal('no_telp')}</span></div>
      <div class="review-row"><span class="review-key">Email</span><span class="review-val">${getVal('email_ortu')}</span></div>
      <div class="review-row"><span class="review-key">Pekerjaan Ayah</span><span class="review-val">${getVal('pekerjaan_ayah') || '-'}</span></div>
      <div class="review-row"><span class="review-key">Alamat</span><span class="review-val">${getVal('alamat')}</span></div>
    </div>
    <div class="review-card">
      <div class="review-section-title">📎 Dokumen</div>
      <div class="review-row"><span class="review-key">File Diunggah</span><span class="review-val">${uploadedFiles.length > 0 ? uploadedFiles.join(', ') : 'Belum ada'}</span></div>
    </div>
  `;
}

function submitForm() {
  // Simulate submission
  const noReg = 'SIT-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 9000) + 1000);
  document.getElementById('no-regis-display').textContent = noReg;
  document.querySelector('.form-step.active').classList.remove('active');
  document.getElementById('success-screen').style.display = 'block';

  // Update steps to all done
  document.querySelectorAll('.step-bubble').forEach(b => { b.classList.remove('active'); b.classList.add('done'); });
  document.querySelectorAll('.step-line').forEach(l => l.classList.add('done'));

  showToast('🎉 Pendaftaran berhasil dikirim!', 'success');
}

/* FILE UPLOAD */
function initUploadZone() {
  const zone = document.getElementById('upload-zone');
  if (!zone) return;

  zone.addEventListener('click', () => document.getElementById('file-input').click());

  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag');
    handleFiles(e.dataTransfer.files);
  });

  document.getElementById('file-input').addEventListener('change', e => handleFiles(e.target.files));
}

function handleFiles(files) {
  Array.from(files).forEach(f => {
    if (!uploadedFiles.includes(f.name)) {
      uploadedFiles.push(f.name);
      renderUploadedFiles();
      showToast(`📎 ${f.name} berhasil diunggah`, 'success');
    }
  });
}

function renderUploadedFiles() {
  const list = document.getElementById('uploaded-list');
  list.innerHTML = uploadedFiles.map(name => `
    <div class="uploaded-item">
      <span class="uploaded-name">📎 ${name}</span>
      <button class="uploaded-rm" onclick="removeFile('${name}')" title="Hapus">✕</button>
    </div>
  `).join('');
}

function removeFile(name) {
  uploadedFiles = uploadedFiles.filter(f => f !== name);
  renderUploadedFiles();
}

/* ─────────────────────────────────────
   HALAMAN GALERI
───────────────────────────────────────*/

const galeriData = [
  { id: 1, cat: 'Prestasi', emoji: '🏆', title: 'Olimpiade Matematika - Juara 1 Provinsi Papua', date: 'April 2025', desc: 'Siswa kelas 8 berhasil meraih medali emas dalam Olimpiade Matematika tingkat Provinsi Papua yang diikuti 200+ peserta.', height: 200 },
  { id: 2, cat: 'Kegiatan Islami', emoji: '🕌', title: 'Pesantren Ramadan 1446 H', date: 'Maret 2025', desc: 'Program pesantren kilat selama 10 hari yang diikuti seluruh siswa SD dan SMP dengan berbagai kegiatan ibadah dan kajian.', height: 150 },
  { id: 3, cat: 'Seni Budaya', emoji: '🎭', title: 'Festival Tari Papua - Pentas Seni Tahunan', date: 'Maret 2025', desc: 'Penampilan seni tari khas Papua oleh siswa dalam rangka melestarikan budaya lokal.', height: 180 },
  { id: 4, cat: 'Akademik', emoji: '🔬', title: 'Praktikum IPA - Lab Sains Terpadu', date: 'Februari 2025', desc: 'Kegiatan praktikum menggunakan peralatan laboratorium modern yang baru diresmikan.', height: 140 },
  { id: 5, cat: 'Olahraga', emoji: '⚽', title: 'Turnamen Futsal Antar Kelas 2025', date: 'Februari 2025', desc: 'Kompetisi futsal seru antar kelas yang membangun semangat sportivitas dan kerjasama tim.', height: 160 },
  { id: 6, cat: 'Prestasi', emoji: '📖', title: 'Wisuda Tahfizh - 15 Siswa Hafiz Qur\'an', date: 'Januari 2025', desc: 'Perayaan kelulusan program tahfizh Al-Qur\'an untuk 15 siswa yang berhasil menghafal 30 juz.', height: 200 },
  { id: 7, cat: 'Akademik', emoji: '💻', title: 'Workshop Robotika & Coding', date: 'Januari 2025', desc: 'Pelatihan pemrograman dan robotika bekerja sama dengan komunitas tech Timika untuk siswa SMP.', height: 140 },
  { id: 8, cat: 'Kegiatan Islami', emoji: '🌙', title: 'Peringatan Isra Mi\'raj 1446 H', date: 'Desember 2024', desc: 'Peringatan Isra Mi\'raj yang meriah dengan ceramah, lomba, dan penampilan seni Islami.', height: 170 },
  { id: 9, cat: 'Olahraga', emoji: '🏸', title: 'Porseni Pelajar Kabupaten Mimika', date: 'November 2024', desc: 'Tim sekolah berhasil membawa pulang 5 medali emas dari berbagai cabang olahraga.', height: 150 },
  { id: 10, cat: 'Seni Budaya', emoji: '🎨', title: 'Pameran Karya Seni Siswa 2024', date: 'Oktober 2024', desc: 'Pameran lukisan dan kerajinan tangan bernuansa Papua yang memukau seluruh warga sekolah dan tamu undangan.', height: 190 },
  { id: 11, cat: 'Akademik', emoji: '📚', title: 'Peluncuran Perpustakaan Digital', date: 'Oktober 2024', desc: 'Perpustakaan digital resmi dibuka dengan koleksi 2.000+ buku digital yang bisa diakses seluruh siswa.', height: 140 },
  { id: 12, cat: 'Prestasi', emoji: '🌍', title: 'Lomba Debat Bahasa Inggris - Juara 2', date: 'September 2024', desc: 'Tim debat SIT Permata Papua berhasil meraih juara 2 dalam lomba debat Bahasa Inggris tingkat SMP se-Papua.', height: 160 },
];

let currentFilter = 'Semua';

function renderGaleri(filter = 'Semua') {
  const grid = document.getElementById('galeri-grid');
  const filtered = filter === 'Semua' ? galeriData : galeriData.filter(g => g.cat === filter);

  grid.innerHTML = filtered.map(g => `
    <div class="galeri-item" onclick="openLightbox(${g.id})" data-cat="${g.cat}">
      <div class="galeri-thumb">
        <div class="galeri-img-placeholder" style="height:${g.height}px;">
          <div class="galeri-pat"></div>
          <div class="galeri-emoji">${g.emoji}</div>
          <div class="galeri-h-label">${g.date}</div>
        </div>
        <div class="galeri-overlay">
          <div class="galeri-cat-ov">${g.cat}</div>
          <div class="galeri-title-ov">${g.title}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterGaleri(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === cat));
  renderGaleri(cat);
}

function openLightbox(id) {
  const item = galeriData.find(g => g.id === id);
  if (!item) return;

  document.getElementById('lb-emoji').textContent = item.emoji;
  document.getElementById('lb-cat').textContent   = item.cat;
  document.getElementById('lb-title').textContent  = item.title;
  document.getElementById('lb-desc').textContent   = item.desc;
  document.getElementById('lb-meta').textContent   = `📅 ${item.date}`;

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ─────────────────────────────────────
   PORTAL NILAI
───────────────────────────────────────*/

const portalUsers = [
  {
    nis: '2024001', password: 'permata2024',
    nama: 'Agus Satria Adhitama', kelas: 'Kelas 9A SMP', inisial: 'AF',
    ipk: '91.4', rank: '3', absen: '98%', hafalan: '18 Juz',
    mapel: [
      { nama: 'Pendidikan Agama Islam', nilai: 95, predikat: 'A', pred_class: 'pred-a' },
      { nama: 'Bahasa Indonesia',        nilai: 88, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'Matematika',              nilai: 92, predikat: 'A', pred_class: 'pred-a' },
      { nama: 'IPA Terpadu',             nilai: 87, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'IPS Terpadu',             nilai: 84, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'Bahasa Inggris',          nilai: 90, predikat: 'A', pred_class: 'pred-a' },
      { nama: 'PJOK',                    nilai: 88, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'Seni & Budaya Papua',     nilai: 94, predikat: 'A', pred_class: 'pred-a' },
      { nama: 'Prakarya & Teknologi',    nilai: 91, predikat: 'A', pred_class: 'pred-a' },
      { nama: 'Tahfizh Al-Qur\'an',       nilai: 96, predikat: 'A', pred_class: 'pred-a' },
    ],
    hafalan_detail: [
      { nama: 'Al-Fatihah', status: 'done' }, { nama: 'Al-Baqarah', status: 'done' },
      { nama: 'Ali Imran', status: 'done' },  { nama: 'An-Nisa', status: 'done' },
      { nama: 'Al-Maidah', status: 'done' },  { nama: 'Al-An\'am', status: 'done' },
      { nama: 'Al-A\'raf', status: 'done' },  { nama: 'Al-Anfal', status: 'done' },
      { nama: 'At-Taubah', status: 'done' },  { nama: 'Yunus', status: 'done' },
      { nama: 'Hud', status: 'done' },         { nama: 'Yusuf', status: 'done' },
      { nama: 'Ar-Ra\'d', status: 'done' },    { nama: 'Ibrahim', status: 'done' },
      { nama: 'Al-Hijr', status: 'done' },     { nama: 'An-Nahl', status: 'done' },
      { nama: 'Al-Isra', status: 'done' },     { nama: 'Al-Kahfi', status: 'done' },
      { nama: 'Maryam', status: 'prog' },      { nama: 'Ta-Ha', status: 'prog' },
      { nama: 'Al-Anbiya', status: 'none' },   { nama: 'Al-Hajj', status: 'none' },
      { nama: 'Al-Mu\'minun', status: 'none' },{ nama: 'An-Nur', status: 'none' },
    ]
  },
  {
    nis: '2024002', password: 'papua123',
    nama: 'Siti Rahmawati Abubakar', kelas: 'Kelas 7B SMP', inisial: 'SR',
    ipk: '88.6', rank: '7', absen: '96%', hafalan: '10 Juz',
    mapel: [
      { nama: 'Pendidikan Agama Islam', nilai: 92, predikat: 'A', pred_class: 'pred-a' },
      { nama: 'Bahasa Indonesia',        nilai: 85, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'Matematika',              nilai: 88, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'IPA Terpadu',             nilai: 90, predikat: 'A', pred_class: 'pred-a' },
      { nama: 'IPS Terpadu',             nilai: 82, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'Bahasa Inggris',          nilai: 87, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'PJOK',                    nilai: 86, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'Seni & Budaya Papua',     nilai: 93, predikat: 'A', pred_class: 'pred-a' },
      { nama: 'Prakarya & Teknologi',    nilai: 88, predikat: 'B', pred_class: 'pred-b' },
      { nama: 'Tahfizh Al-Qur\'an',       nilai: 91, predikat: 'A', pred_class: 'pred-a' },
    ],
    hafalan_detail: [
      { nama: 'Al-Fatihah', status: 'done' }, { nama: 'Al-Baqarah', status: 'done' },
      { nama: 'Ali Imran', status: 'done' },  { nama: 'An-Nisa', status: 'done' },
      { nama: 'Al-Maidah', status: 'done' },  { nama: 'Al-An\'am', status: 'done' },
      { nama: 'Al-A\'raf', status: 'done' },  { nama: 'Al-Anfal', status: 'done' },
      { nama: 'At-Taubah', status: 'done' },  { nama: 'Yunus', status: 'done' },
      { nama: 'Hud', status: 'prog' },         { nama: 'Yusuf', status: 'prog' },
      { nama: 'Ar-Ra\'d', status: 'none' },    { nama: 'Ibrahim', status: 'none' },
    ]
  }
];

let loggedUser = null;

function initPortal() {
  // Show login if no user
  if (!loggedUser) {
    document.getElementById('portal-login').style.display = 'flex';
    document.getElementById('portal-dash').style.display  = 'none';
  }
}

function portalLogin() {
  const nis   = document.getElementById('login-nis').value.trim();
  const pass  = document.getElementById('login-pass').value.trim();
  const errEl = document.getElementById('login-err');

  const user = portalUsers.find(u => u.nis === nis && u.password === pass);

  if (!user) {
    errEl.style.display = 'block';
    errEl.textContent = '❌ NIS atau password salah. Coba lagi.';
    document.getElementById('login-nis').style.borderColor = 'var(--merah)';
    document.getElementById('login-pass').style.borderColor = 'var(--merah)';
    return;
  }

  loggedUser = user;
  document.getElementById('portal-login').style.display = 'none';
  document.getElementById('portal-dash').style.display  = 'block';
  renderPortalDash(user);
  showToast(`👋 Selamat datang, ${user.nama.split(' ')[0]}!`, 'success');
}

function portalLogout() {
  loggedUser = null;
  document.getElementById('portal-login').style.display = 'flex';
  document.getElementById('portal-dash').style.display  = 'none';
  document.getElementById('login-nis').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-err').style.display = 'none';
  document.getElementById('login-nis').style.borderColor = '';
  document.getElementById('login-pass').style.borderColor = '';
  showToast('👋 Berhasil keluar dari portal', 'info');
}

function renderPortalDash(user) {
  // Header
  document.getElementById('portal-avatar').textContent   = user.inisial;
  document.getElementById('portal-nama').textContent     = user.nama;
  document.getElementById('portal-kelas').textContent    = user.kelas;

  // Summary cards
  document.getElementById('sum-ipk').textContent     = user.ipk;
  document.getElementById('sum-rank').textContent    = '#' + user.rank;
  document.getElementById('sum-absen').textContent   = user.absen;
  document.getElementById('sum-hafalan').textContent = user.hafalan;

  // Render semester 1 by default
  renderRaport(user, 1);
  renderProgressBars(user);
  renderHafalan(user);
}

function renderRaport(user, sem) {
  const rows = user.mapel.map(m => {
    const adj = sem === 2 ? Math.min(100, m.nilai + Math.floor(Math.random() * 4 - 1)) : m.nilai;
    const nbClass = adj >= 90 ? 'nb-a' : adj >= 80 ? 'nb-b' : adj >= 70 ? 'nb-c' : 'nb-d';
    return `
      <tr>
        <td>${m.nama}</td>
        <td><span class="nilai-badge ${nbClass}">${adj}</span></td>
        <td><span class="predikat-text ${m.pred_class}">${m.predikat}</span></td>
        <td style="color:var(--teks-muted);font-size:12px;">Sangat ${adj >= 90 ? 'Baik' : 'Baik'}</td>
      </tr>
    `;
  }).join('');

  document.getElementById('raport-tbody').innerHTML = rows;

  document.querySelectorAll('.sem-tab').forEach(t => t.classList.toggle('active', +t.dataset.sem === sem));
}

function renderProgressBars(user) {
  const cats = [
    { label: 'Keagamaan', pct: 96 },
    { label: 'Sains & Matematika', pct: 90 },
    { label: 'Bahasa', pct: 88 },
    { label: 'Sosial & Budaya', pct: 89 },
    { label: 'Olahraga', pct: 87 },
    { label: 'Teknologi', pct: 91 },
  ];

  document.getElementById('progress-bars').innerHTML = cats.map(c => `
    <div class="pb-row">
      <span class="pb-label">${c.label}</span>
      <div class="pb-track">
        <div class="pb-fill" style="width:${c.pct}%"></div>
      </div>
      <span class="pb-val">${c.pct}</span>
    </div>
  `).join('');
}

function renderHafalan(user) {
  document.getElementById('hafalan-grid').innerHTML = user.hafalan_detail.map(h => `
    <div class="surah-pill sp-${h.status}" title="${h.nama}">
      ${h.nama.length > 8 ? h.nama.substring(0, 7) + '…' : h.nama}
    </div>
  `).join('');
}

/* ── TOAST SYSTEM ── */
function showToast(msg, type = 'success') {
  const wrap = document.querySelector('.toast-wrap');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.prog-card, .val-card, .news-main, .news-card-mini, .sum-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  observer.observe(el);
});

/* ── INIT ON DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  renderGaleri();
  initUploadZone();
});
