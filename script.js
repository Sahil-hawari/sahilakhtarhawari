/* ============================================================

  ████████████████████████████████████████████████████████████
  ██                                                        ██
  ██   ✏️  CONFIGURATION — Edit everything in this block   ██
  ██                                                        ██
  ████████████████████████████████████████████████████████████

============================================================ */


/* ============================================================
   SKILLS — Edit names and levels (0.0 = 0%, 1.0 = 100%)
============================================================ */
const SKILLS = [
  { name: "AutoCAD",         level: 0.90 },
  { name: "Revit",           level: 0.85 },
  { name: "SketchUp",        level: 0.80 },
  { name: "Rhino 3D",        level: 0.70 },
  { name: "Adobe Photoshop", level: 0.75 },
  { name: "Concept Design",  level: 0.95 },
];

/* ============================================================
   PROJECTS — Add / remove / edit projects here
   ─────────────────────────────────────────────────────────────
   Each project object:
   {
     title:       "Project Name",
     category:    "Category Name",   ← used for filter tabs
     year:        "2024",
     description: "Full description shown in the popup modal.",
     image:       "URL to your image hosted on GitHub",
     video:       "YouTube embed URL or empty string",
     tags:        ["Tag1", "Tag2"],
   }

   How to get a GitHub image URL:
   1. Upload your image to a GitHub repo
   2. Open the file on GitHub
   3. Click the "Raw" button
   4. Copy the URL from your browser — use that as the image value

   How to get a YouTube embed URL:
   1. Open the YouTube video
   2. Click Share → Embed
   3. Copy only the src URL, e.g.:
      https://www.youtube.com/embed/VIDEO_ID
============================================================ */
const PROJECTS = [
  {
    title:       "Urban Pavilion",
    category:    "Public Space",
    year:        "2024",
    description: "A multi-purpose urban pavilion designed for a central city square, integrating green roofing, flexible event spaces, and passive ventilation systems. The structure responds to its surroundings through a language of interlocking concrete frames softened by climbing plants.",
    image:       "images\\soyeb dai.jpg",   // ← Paste your GitHub raw image URL here
    video:       "",   // ← Paste YouTube embed URL here (or leave empty)
    tags:        ["Concrete", "Sustainable", "Public"],
  },
  {
    title:       "Coastal Residence",
    category:    "Residential",
    year:        "2023",
    description: "A private residence perched along a coastal cliff, designed to dissolve boundaries between interior living and the sea horizon. Floor-to-ceiling glazing, cantilevered terraces, and a monolithic stone plinth define its bold character.",
    image:       "images\\afrin.jpg",
    video:       "",
    tags:        ["Stone", "Glazing", "Landscape"],
  },
  {
    title:       "Cultural Arts Center",
    category:    "Cultural",
    year:        "2023",
    description: "An academic studio project exploring the typology of the arts center. The design folds gallery, performance, and workshop spaces around a central light-filled atrium, creating a campus hub that invites spontaneous encounter and creative exchange.",
    image:       "",
    video:       "",
    tags:        ["Steel", "Atrium", "Cultural"],
  },
  {
    title:       "Student Housing Block",
    category:    "Residential",
    year:        "2022",
    description: "A modular student housing proposal for a university campus expansion, prioritizing community, natural light, and adaptability. Staggered balconies and shared social terraces foster interaction while giving each unit its own identity.",
    image:       "",
    video:       "",
    tags:        ["Modular", "Terracotta", "Campus"],
  },
  {
    title:       "Market Canopy",
    category:    "Public Space",
    year:        "2022",
    description: "A lightweight tensile canopy structure designed for a weekly farmer's market. The organic roof form, inspired by the geometry of leaf venation, provides shelter while allowing filtered light to animate the space beneath.",
    image:       "",
    video:       "",
    tags:        ["Tensile", "Steel", "Ephemeral"],
  },
  {
    title:       "Memorial Garden",
    category:    "Landscape",
    year:        "2021",
    description: "A contemplative memorial landscape for a community park. Water channels, stone pathways, and a single monolithic slab create a sequence of spatial experiences that guide visitors through reflection, remembrance, and renewal.",
    image:       "",
    video:       "",
    tags:        ["Stone", "Water", "Memorial"],
  },
];

/* ──────────────────────────────────────────────────────────────
   END OF CONFIGURATION — Do not edit below unless you're
   comfortable with JavaScript.
────────────────────────────────────────────────────────────── */


/* ── Render year ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Project count ── */
(function animateCount() {
  const el = document.getElementById('projectCount');
  const target = PROJECTS.length;
  let count = 0;
  const step = Math.ceil(target / 30);
  const t = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(t);
  }, 50);
})();

/* ── Render skills ── */
const skillsEl = document.getElementById('skillsContainer');
SKILLS.forEach(s => {
  skillsEl.innerHTML += `
    <div class="skill-row">
      <span class="skill-name">${s.name}</span>
      <div class="skill-bar">
        <div class="skill-fill" style="transform: scaleX(${s.level})"></div>
      </div>
    </div>`;
});

/* ── Collect categories ── */
const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
let activeFilter = 'All';

const tabsEl = document.getElementById('filterTabs');
categories.forEach(cat => {
  const btn = document.createElement('button');
  btn.className = 'filter-btn' + (cat === 'All' ? ' active' : '');
  btn.textContent = cat;
  btn.addEventListener('click', () => {
    activeFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid();
  });
  tabsEl.appendChild(btn);
});

/* ── Render project grid ── */
function renderGrid() {
  const grid = document.getElementById('projectsGrid');
  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  grid.innerHTML = filtered.map((p, i) => `
    <article class="project-card fade-up" style="transition-delay:${i * 0.07}s" onclick="openModal(${PROJECTS.indexOf(p)})">
      <div class="card-media">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title}" loading="lazy" />`
          : `<div class="card-media-placeholder">
               <svg viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
                 <rect x="10" y="40" width="80" height="50" fill="none" stroke="white" stroke-width="2"/>
                 <polygon points="10,40 50,10 90,40" fill="none" stroke="white" stroke-width="2"/>
               </svg>
             </div>`}
        <span class="card-media-tag">${p.category}</span>
        ${p.video ? `<div class="card-media-video-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A1714"><polygon points="5,3 19,12 5,21"/></svg>
        </div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-year">${p.year}</span>
          <div class="card-tags">${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>
        </div>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">${p.description}</p>
        <div class="card-arrow">
          View Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </article>`).join('');

  observeFadeUps();
}

renderGrid();

/* ── Modal ── */
function openModal(index) {
  const p = PROJECTS[index];
  const overlay = document.getElementById('modalOverlay');
  const mediaEl = document.getElementById('modalMedia');

  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalYear').textContent = p.year;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.description;
  document.getElementById('modalTags').innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');

  if (p.video) {
    mediaEl.innerHTML = `<iframe src="${p.video}" allowfullscreen allow="autoplay"></iframe>`;
  } else if (p.image) {
    mediaEl.innerHTML = `<img src="${p.image}" alt="${p.title}" />`;
  } else {
    mediaEl.innerHTML = `<div style="background:linear-gradient(135deg,#2A1F1A,#4A3028);width:100%;height:100%;display:flex;align-items:center;justify-content:center">
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="white" stroke-width="2" opacity="0.2">
        <rect x="10" y="40" width="80" height="50"/><polygon points="10,40 50,10 90,40"/>
      </svg></div>`;
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalBtn();
}

function closeModalBtn() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('modalMedia').innerHTML = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalBtn(); });

/* ── Nav toggle (mobile) ── */
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ── Intersection Observer for fade-up ── */
function observeFadeUps() {
  const els = document.querySelectorAll('.fade-up:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

observeFadeUps();

/* ── Navbar shadow on scroll ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 24px rgba(26,23,20,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
