// Database Statis Pahlawan dengan Fitur Kategori Kelompok
const heroesData = [
    {
        name: "Ir. Soekarno",
        folder: "ir-soekarno",
        era: "1901 – 1970 • Proklamator",
        kategori: ["Proklamator", "Presiden", "Golongan Tua"],
        shortDesc: "Ir. Soekarno adalah Presiden pertama Republik Indonesia dan tokoh utama kemerdekaan Indonesia yang membacakan teks proklamasi pada 17 Agustus 1945.",
        isReady: true
    },
    {
        name: "Mohammad Hatta",
        folder: "mohammad-hatta",
        era: "1902 – 1980 • Wakil Presiden Pertama",
        kategori: ["Proklamator", "Bapak Koperasi", "Golongan Tua"],
        shortDesc: "Dr. Mohammad Hatta adalah negarawan, ekonom ulung, dan proklamator yang dikenal sebagai Bapak Koperasi Indonesia.",
        isReady: true
    },
    {
        name: "R.A. Kartini",
        folder: "ra-kartini",
        era: "1879 – 1904 • Pelopor Emansipasi",
        kategori: ["Emansipasi Wanita", "Pahlawan Nasional"],
        shortDesc: "Tokoh pelopor kebangkitan perempuan Nusantara dan pejuang kesetaraan hak serta emansipasi wanita pribumi di masa kolonial.",
        isReady: true
    },
    {
        name: "Jenderal Sudirman",
        folder: "jenderal-sudirman",
        era: "1916 – 1950 • Panglima Besar TNI",
        kategori: ["Militer", "Gerilya"],
        shortDesc: "Pimpinan militer legendaris Indonesia yang gigih memimpin perang gerilya mempertahankan kemerdekaan meski dalam kondisi sakit parah.",
        isReady: true
    },
    {
        name: "Ki Hadjar Dewantara",
        folder: "ki-hadjar-dewantara",
        era: "1889 – 1959 • Bapak Pendidikan Nasional",
        kategori: ["Tiga Serangkai", "Pendidikan", "Indische Partij"],
        shortDesc: "Aktivis pergerakan kemerdekaan dan pendiri lembaga pendidikan Taman Siswa yang filosofi pendidikannya dipakai hingga kini.",
        isReady: true
    },
    {
        name: "Dr. Ernest Douwes Dekker",
        folder: "douwes-dekker",
        era: "1879 – 1950 • Tokoh Pergerakan",
        kategori: ["Tiga Serangkai", "Indische Partij"],
        shortDesc: "Dikenal juga sebagai Danudirja Setiabudi, ia adalah wartawan, penulis, dan aktivis politik yang menentang penjajahan Belanda.",
        isReady: false
    },
    // --- PAHLAWAN DI BAWAH INI TERSEMBUNYI SAAT LOAD AWAL, MUNCUL SAAT DICARI ---
    {
        name: "Dr. Tjipto Mangoenkoesoemo",
        folder: "tjipto-mangoenkoesoemo",
        era: "1886 – 1943 • Tokoh Pergerakan",
        kategori: ["Tiga Serangkai", "Budi Utomo", "Indische Partij"],
        shortDesc: "Dokter dan tokoh pergerakan kemerdekaan yang dianugerahi Bintang Mahaputra karena perlawanannya yang radikal terhadap Belanda.",
        isReady: false
    },
    {
        name: "Cut Nyak Dien",
        folder: "cut-nyak-dien",
        era: "1848 – 1908 • Pahlawan Wanita Aceh",
        kategori: ["Pahlawan Daerah", "Perang Aceh"],
        shortDesc: "Pahlawan nasional wanita asal Aceh yang sangat ditakuti Belanda karena memimpin perlawanan bersenjata di pedalaman Aceh.",
        isReady: false
    },
    {
        name: "Pangeran Diponegoro",
        folder: "pangeran-diponegoro",
        era: "1785 – 1855 • Pemimpin Perang Jawa",
        kategori: ["Pahlawan Daerah", "Perang Jawa"],
        shortDesc: "Pemimpin Perang Diponegoro (1825–1830) yang merupakan salah satu pertempuran terbesar yang pernah dihadapi Belanda di Nusantara.",
        isReady: false
    }
];

const heroGrid = document.getElementById('heroGrid');
const searchInput = document.getElementById('searchInput');

function displayHeroes(heroes) {
    heroGrid.innerHTML = '';
    
    if (heroes.length === 0) {
        heroGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-style: italic;">Arsip tidak ditemukan. Silakan gunakan kata kunci lain.</p>';
        return;
    }

    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card';

        // Render label kategori (stempel)
        const tagsHTML = hero.kategori.map(tag => `<span class="category-badge">${tag}</span>`).join('');
        
        // Logika Status Halaman
        let linkHTML = hero.isReady 
            ? `<a href="${hero.folder}/index.html" class="read-more-btn">Baca Selengkapnya &rarr;</a>`
            : `<a href="#" class="read-more-btn disabled" onclick="alert('Mohon maaf, halaman biografi ${hero.name} masih dalam pengerjaan tim Reyhanstudio.'); return false;">[ Dalam Pengerjaan ⏳ ]</a>`;

        card.innerHTML = `
            <div>
                <div class="category-tags">${tagsHTML}</div>
                <span class="era">${hero.era}</span>
                <h3>${hero.name}</h3>
                <p>${hero.shortDesc}</p>
            </div>
            ${linkHTML}
        `;
        
        heroGrid.appendChild(card);
    });
}

// Render 6 pahlawan pertama saat awal dimuat
displayHeroes(heroesData.slice(0, 6));

// Logika Pencarian (Mencakup Kategori Kelompok)
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    
    if (keyword === "") {
        displayHeroes(heroesData.slice(0, 6));
    } else {
        const filteredHeroes = heroesData.filter(hero => {
            // Cek apakah keyword ada di dalam array kategori
            const matchKategori = hero.kategori.some(tag => tag.toLowerCase().includes(keyword));
            
            return hero.name.toLowerCase().includes(keyword) || 
                   hero.era.toLowerCase().includes(keyword) ||
                   hero.shortDesc.toLowerCase().includes(keyword) ||
                   matchKategori;
        });
        displayHeroes(filteredHeroes);
    }
});