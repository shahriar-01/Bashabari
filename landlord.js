(function () {
  'use strict';

  // CONSTANTS
  const CARDS_PER_PAGE = 8;

  const AVATAR_COLORS = [
    'linear-gradient(135deg,#60a5fa,#3b82f6)',
    'linear-gradient(135deg,#fb923c,#f97316)',
    'linear-gradient(135deg,#34d399,#10b981)',
    'linear-gradient(135deg,#a78bfa,#8b5cf6)',
    'linear-gradient(135deg,#f472b6,#ec4899)',
    'linear-gradient(135deg,#facc15,#f59e0b)',
    'linear-gradient(135deg,#38bdf8,#0c6780)',
    'linear-gradient(135deg,#4ade80,#16a34a)',
  ];

  const DISTRICTS_AREAS = {
    Dhaka:       ['Mirpur','Uttara','Badda','Dhanmondi','Mohammadpur','Gulshan','Banani','Bashundhara','Nikunjo','Khilkhet','Shyamoli','Farmgate','Eskaton','Panthapath'],
    Chittagong:  ['Agrabad','Nasirabad','Halishahar','Panchlaish','GEC Circle','Khulshi'],
    Sylhet:      ['Zindabazar','Ambarkhana','Subidbazar','Tilagarh','Shahjalal Upashahar'],
    Rajshahi:    ['Shaheb Bazar','Uposhahar','Kazla','Motihar'],
    Khulna:      ['Boyra','Sonadanga','Khalishpur','Daulatpur'],
    Gazipur:     ['Tongi','Joydebpur','Bhawal'],
    Narayanganj: ['Siddhirganj','Fatullah','Sonargaon'],
    Barishal:    ['Nathullabad','Sadar Road','Rupatali'],
  };

  const STAR_LABELS = ['','Terrible','Poor','Average','Good','Excellent'];

  // SEED DATA
  let LANDLORDS = [
    {
      id: 1,
      name: 'Mr. Zaman Kabir',
      initials: 'ZK',
      colorIndex: 6,
      properties: ['House 12, Road 4, Bashundhara R/A, Dhaka','Plot 5, Block C, Bashundhara, Dhaka'],
      district: 'Dhaka',
      area: 'Bashundhara',
      recommended: 'yes',
      overallRating: 4.9,
      categories: { safety: 95, responsiveness: 90, maintenance: 98, fairness: 92 },
      reviews: [
        { user:'Rahim Ahmed', initials:'RA', colorIndex:0, stars:5, text:'Exceptional landlord. Always available for maintenance. Bashundhara area is also very student-friendly.', date:'12 Jan 2025', recommended:'yes' },
        { user:'Sadia K.', initials:'SK', colorIndex:4, stars:5, text:'Best landlord I have ever had. Professional, fair, and very responsive. Highly recommend!', date:'3 Feb 2025', recommended:'yes' },
        { user:'Tanvir H.', initials:'TH', colorIndex:2, stars:4, text:'Great experience overall. Minor maintenance delay once but resolved quickly.', date:'18 Feb 2025', recommended:'yes' },
      ],
      postedAt: new Date('2025-01-12'),
    },
    {
      id: 2,
      name: 'Mrs. Salma Begum',
      initials: 'SB',
      colorIndex: 4,
      properties: ['Mohakhali Enclave, Block 3, Dhaka','House 8, Mohakhali, Dhaka'],
      district: 'Dhaka',
      area: 'Mohammadpur',
      recommended: 'yes',
      overallRating: 4.7,
      categories: { safety: 92, responsiveness: 96, maintenance: 88, fairness: 90 },
      reviews: [
        { user:'Nusrat J.', initials:'NJ', colorIndex:4, stars:5, text:'Very kind and understanding landlord. Responds to calls immediately. Felt very safe living there.', date:'5 Mar 2025', recommended:'yes' },
        { user:'Mahfuz A.', initials:'MA', colorIndex:6, stars:4, text:'Good experience. Maintenance could be a bit quicker but overall great value for money.', date:'20 Mar 2025', recommended:'yes' },
      ],
      postedAt: new Date('2025-03-05'),
    },
    {
      id: 3,
      name: 'Engr. Arif Hasan',
      initials: 'AH',
      colorIndex: 2,
      properties: ['Dhanmondi Student Loft, Road 7, Dhanmondi, Dhaka'],
      district: 'Dhaka',
      area: 'Dhanmondi',
      recommended: 'yes',
      overallRating: 4.5,
      categories: { safety: 85, responsiveness: 88, maintenance: 92, fairness: 87 },
      reviews: [
        { user:'Fariha C.', initials:'FC', colorIndex:4, stars:4, text:'Decent landlord. Maintenance is handled well. Could improve communication a bit.', date:'10 Jan 2025', recommended:'yes' },
        { user:'Imran H.', initials:'IH', colorIndex:2, stars:5, text:'Transparent and fair. No hidden charges. Would definitely recommend to other students.', date:'25 Jan 2025', recommended:'yes' },
        { user:'Disha R.', initials:'DR', colorIndex:7, stars:4, text:'Good overall. Responsive and maintains the property well. Dhanmondi area is convenient.', date:'14 Feb 2025', recommended:'yes' },
      ],
      postedAt: new Date('2025-01-10'),
    },
    {
      id: 4,
      name: 'Mr. Jahangir Alam',
      initials: 'JA',
      colorIndex: 1,
      properties: ['Mirpur-10, Section 6, Block D, Dhaka','House 22, Mirpur-12, Dhaka'],
      district: 'Dhaka',
      area: 'Mirpur',
      recommended: 'no',
      overallRating: 2.8,
      categories: { safety: 60, responsiveness: 45, maintenance: 55, fairness: 50 },
      reviews: [
        { user:'Sumaiya A.', initials:'SA', colorIndex:3, stars:2, text:'Very poor maintenance. Reported water leak 3 times, took months to fix. Would not recommend.', date:'8 Feb 2025', recommended:'no' },
        { user:'Sabbir C.', initials:'SC', colorIndex:1, stars:3, text:'Communication is difficult. Rarely picks up calls. Below average experience.', date:'22 Feb 2025', recommended:'no' },
      ],
      postedAt: new Date('2025-02-08'),
    },
    {
      id: 5,
      name: 'Ms. Rima Chowdhury',
      initials: 'RC',
      colorIndex: 4,
      properties: ['Uttara Sector 7, House 14, Dhaka'],
      district: 'Dhaka',
      area: 'Uttara',
      recommended: 'yes',
      overallRating: 4.6,
      categories: { safety: 94, responsiveness: 88, maintenance: 90, fairness: 93 },
      reviews: [
        { user:'Ariful I.', initials:'AI', colorIndex:0, stars:5, text:'Perfect for girl students. Very safe building, CCTV everywhere. Landlord is very professional.', date:'3 Mar 2025', recommended:'yes' },
        { user:'Ria M.', initials:'RM', colorIndex:2, stars:4, text:'Good landlord, fair pricing. Maintenance is quick. Happy with my stay.', date:'17 Mar 2025', recommended:'yes' },
      ],
      postedAt: new Date('2025-03-03'),
    },
    {
      id: 6,
      name: 'Mr. Habibur Rahman',
      initials: 'HR',
      colorIndex: 7,
      properties: ['Agrabad C/A, Plot 9, Chittagong','Commerce College Road, Chittagong'],
      district: 'Chittagong',
      area: 'Agrabad',
      recommended: 'yes',
      overallRating: 4.3,
      categories: { safety: 88, responsiveness: 80, maintenance: 85, fairness: 88 },
      reviews: [
        { user:'Rafiqul I.', initials:'RI', colorIndex:6, stars:4, text:'Trustworthy landlord in Chittagong. Responds within the day. Property is well maintained.', date:'14 Feb 2025', recommended:'yes' },
        { user:'Tanvir K.', initials:'TK', colorIndex:5, stars:4, text:'Great value for money in Agrabad area. No issues with the landlord at all.', date:'1 Mar 2025', recommended:'yes' },
      ],
      postedAt: new Date('2025-02-14'),
    },
    {
      id: 7,
      name: 'Mr. Mostafa Kamal',
      initials: 'MK',
      colorIndex: 0,
      properties: ['Zindabazar, House 5, Sylhet','Ambarkhana Road, Flat 3B, Sylhet'],
      district: 'Sylhet',
      area: 'Zindabazar',
      recommended: 'yes',
      overallRating: 4.4,
      categories: { safety: 87, responsiveness: 85, maintenance: 88, fairness: 86 },
      reviews: [
        { user:'Imran H.', initials:'IH', colorIndex:2, stars:4, text:'Honest and straightforward. No extra charges. SUST students prefer this area and Mr. Mostafa is reliable.', date:'20 Jan 2025', recommended:'yes' },
        { user:'Mahfuz A.', initials:'MA', colorIndex:6, stars:5, text:'Best landlord in Sylhet area. Very clean property and great maintenance.', date:'5 Feb 2025', recommended:'yes' },
      ],
      postedAt: new Date('2025-01-20'),
    },
    {
      id: 8,
      name: 'Mr. Karim Uncle',
      initials: 'KU',
      colorIndex: 3,
      properties: ['Joydebpur Road, Gazipur','Near IUT Campus, Gazipur'],
      district: 'Gazipur',
      area: 'Joydebpur',
      recommended: 'no',
      overallRating: 3.1,
      categories: { safety: 65, responsiveness: 55, maintenance: 60, fairness: 58 },
      reviews: [
        { user:'Rahat H.', initials:'RH', colorIndex:0, stars:3, text:'Below average. Security could be much better. Landlord is sometimes unresponsive.', date:'9 Mar 2025', recommended:'no' },
        { user:'Sifat A.', initials:'SA', colorIndex:1, stars:3, text:'Okay for budget living but don\'t expect much support from the landlord.', date:'23 Mar 2025', recommended:'no' },
      ],
      postedAt: new Date('2025-03-09'),
    },
  ];

  // STATE 
  let state = {
    filtered:      [...LANDLORDS],
    displayed:     CARDS_PER_PAGE,
    filters: {
      search:  '',
      district:'',
      area:    '',
      stars:   0,
    },
    sort:           'rating_desc',
    viewMode:       'grid',
    selectedRating: 0,
    catRatings:     { safety:0, responsiveness:0, maintenance:0, fairness:0 },
    recommended:    'yes',
    currentDetailId: null,
    barsObserved:   new Set(),
  };

  // INIT
  document.addEventListener('DOMContentLoaded', () => {
    LANDLORDS = [];
    state.filtered = [];
    initAuthUI();
    bindHeroFilters();
    bindWriteReviewForm();
    bindToolbar();
    bindDetailModal();
    updatePlatformStats();
    buildTopWidget();
    showSkeletons();
    loadBackendReviews();
    initBarObserver();
  });

  function loadBackendReviews() {
    fetch('api/landlord-reviews/get-reviews.php?limit=100')
      .then(r => r.json())
      .then(data => {
        if (!data.success || !Array.isArray(data.reviews)) throw new Error(data.error || 'No reviews');
        const groups = new Map();
        data.reviews.forEach((rv, idx) => {
          const key = `${(rv.landlord_name || '').toLowerCase()}|${rv.district || ''}`;
          if (!groups.has(key)) {
            const addressText = String(rv.property_address || '');
            const addrParts = addressText.split(',').map(x => x.trim()).filter(Boolean);
            const knownAreas = DISTRICTS_AREAS[rv.district] || [];
            const matchedArea = knownAreas.find(a => addressText.toLowerCase().includes(a.toLowerCase()));
            groups.set(key, {
              id: groups.size + 1,
              name: rv.landlord_name || 'Landlord',
              initials: getInitials(rv.landlord_name || 'L'),
              colorIndex: groups.size % AVATAR_COLORS.length,
              properties: [],
              district: rv.district || '',
              area: matchedArea || (addrParts.length > 1 ? addrParts[addrParts.length - 2] : (addrParts[0] || rv.district || '')),
              recommended: 'yes',
              overallRating: 0,
              categories: { safety: 0, responsiveness: 0, maintenance: 0, fairness: 0 },
              reviews: [],
              postedAt: new Date(rv.created_at || Date.now()),
            });
          }
          const g = groups.get(key);
          if (rv.property_address && !g.properties.includes(rv.property_address)) g.properties.push(rv.property_address);
          g.reviews.push({
            user: rv.reviewer_name || 'Student',
            initials: getInitials(rv.reviewer_name || 'S'),
            colorIndex: idx % AVATAR_COLORS.length,
            stars: Number(rv.star_rating || 0),
            text: rv.review_text || '',
            date: (rv.created_at || '').slice(0, 10),
            recommended: Number(rv.is_recommended) ? 'yes' : 'no'
          });
          if (new Date(rv.created_at) > g.postedAt) g.postedAt = new Date(rv.created_at);
        });
        LANDLORDS = Array.from(groups.values()).map(g => {
          const total = g.reviews.reduce((s, r) => s + r.stars, 0);
          g.overallRating = g.reviews.length ? Number((total / g.reviews.length).toFixed(1)) : 0;
          const rec = g.reviews.filter(r => r.recommended === 'yes').length;
          g.recommended = rec >= g.reviews.length / 2 ? 'yes' : 'no';
          const pct = Math.round(g.overallRating * 20);
          g.categories = { safety: pct, responsiveness: pct, maintenance: pct, fairness: pct };
          if (!g.properties.length) g.properties = ['Address not provided'];
          return g;
        });
        state.filtered = [...LANDLORDS];
        updatePlatformStats();
        buildTopWidget();
        updateDatalist();
        applyAndRender();
      })
      .catch(() => { LANDLORDS = []; state.filtered = []; applyAndRender(); });
  }

  // AUTH-AWARE UI
  function initAuthUI() {
    updateWriteCard();
    
    setInterval(updateWriteCard, 1500);
  }

  function updateWriteCard() {
    const isLoggedIn = window.BashaBari?.isLoggedIn();
    const prompt     = document.getElementById('lrLoginPrompt');
    const form       = document.getElementById('lrReviewForm');
    if (!prompt || !form) return;
    prompt.style.display = isLoggedIn ? 'none'  : 'block';
    form.style.display   = isLoggedIn ? 'block' : 'none';
    updateDatalist();
  }

  function updateDatalist() {
    const dl = document.getElementById('landlordSuggestions');
    if (!dl) return;
    dl.innerHTML = LANDLORDS.map(l =>
      `<option value="${escH(l.name)}">`
    ).join('');
  }

  // HERO FILTERS 
  function bindHeroFilters() {
    // Search
    const searchInput = document.getElementById('lrHeroSearch');
    const searchBtn   = document.getElementById('lrHeroSearchBtn');

    searchInput?.addEventListener('input', e => {
      state.filters.search = e.target.value.trim();
      applyAndRender();
    });
    searchBtn?.addEventListener('click', () => {
      state.filters.search = searchInput?.value.trim() || '';
      applyAndRender();
    });
    searchInput?.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        state.filters.search = e.target.value.trim();
        applyAndRender();
      }
    });

    // District
    const districtSel = document.getElementById('lrDistrictFilter');
    const areaSel     = document.getElementById('lrAreaFilter');

    districtSel?.addEventListener('change', e => {
      state.filters.district = e.target.value;
      state.filters.area     = '';
      buildAreaOptions(e.target.value);
      if (areaSel) areaSel.value = '';
      applyAndRender();
    });

    areaSel?.addEventListener('change', e => {
      state.filters.area = e.target.value;
      applyAndRender();
    });

    // Star filter
    document.getElementById('lrStarFilter')?.addEventListener('click', e => {
      const btn = e.target.closest('.lr-star-btn');
      if (!btn) return;
      document.querySelectorAll('.lr-star-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filters.stars = parseInt(btn.dataset.stars);
      applyAndRender();
    });

    // Empty reset
    document.getElementById('lrEmptyReset')?.addEventListener('click', resetFilters);
  }

  function buildAreaOptions(district) {
    const areaSel = document.getElementById('lrAreaFilter');
    if (!areaSel) return;
    const areas = DISTRICTS_AREAS[district] || [];
    areaSel.innerHTML = '<option value="">All Areas</option>' +
      areas.map(a => `<option value="${escH(a)}">${escH(a)}</option>`).join('');
  }

  // FILTER LOGIC 
  function applyAndRender() {
    const f  = state.filters;
    let data = [...LANDLORDS];

    // Search
    if (f.search) {
      const q = f.search.toLowerCase();
      data = data.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.district.toLowerCase().includes(q) ||
        l.area.toLowerCase().includes(q) ||
        l.properties.some(p => p.toLowerCase().includes(q)) ||
        l.reviews.some(r => (r.text || '').toLowerCase().includes(q) || (r.user || '').toLowerCase().includes(q))
      );
    }

    // District
    if (f.district) data = data.filter(l => l.district === f.district);

    // Area
    if (f.area) data = data.filter(l => l.area === f.area);

    // Stars
    if (f.stars > 0) data = data.filter(l => l.overallRating >= f.stars);

    // Sort
    switch (state.sort) {
      case 'rating_desc':  data.sort((a,b) => b.overallRating - a.overallRating); break;
      case 'rating_asc':   data.sort((a,b) => a.overallRating - b.overallRating); break;
      case 'reviews_desc': data.sort((a,b) => b.reviews.length - a.reviews.length); break;
      case 'newest':       data.sort((a,b) => b.postedAt - a.postedAt); break;
      case 'name_asc':     data.sort((a,b) => a.name.localeCompare(b.name)); break;
    }

    state.filtered  = data;
    state.displayed = CARDS_PER_PAGE;

    updateResultsCount(data.length);
    renderCards();
  }

  // RENDER 
  function showSkeletons() {
    const grid = document.getElementById('lrCardsGrid');
    if (!grid) return;
    grid.innerHTML = Array(4).fill(0).map(() => `
      <div class="lr-skeleton-card">
        <div class="lr-skel-header"></div>
        <div class="lr-skel-body">
          <div class="lr-skel-line"></div>
          <div class="lr-skel-line short"></div>
          <div class="lr-skel-line shorter"></div>
          <div class="lr-skel-line short"></div>
        </div>
      </div>`).join('');
  }

  function renderCards() {
    const grid     = document.getElementById('lrCardsGrid');
    const empty    = document.getElementById('lrEmptyState');
    const loadMore = document.getElementById('lrLoadMoreWrap');
    if (!grid) return;

    const toShow = state.filtered.slice(0, state.displayed);

    if (!toShow.length) {
      grid.innerHTML = '';
      if (empty)    empty.style.display    = 'flex';
      if (loadMore) loadMore.style.display = 'none';
      return;
    }

    if (empty) empty.style.display = 'none';

    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))';
    grid.innerHTML = toShow.map((l, i) => buildCard(l, i)).join('');

    // Stagger animation
    grid.querySelectorAll('.lr-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 70}ms`;
    });

    if (loadMore) {
      loadMore.style.display = state.filtered.length > state.displayed ? 'flex' : 'none';
    }

    bindCardEvents();
    triggerVisibleBars();
  }

  function buildCard(l, i) {
    const color         = AVATAR_COLORS[l.colorIndex % AVATAR_COLORS.length];
    const recClass      = l.recommended === 'yes' ? 'yes' : 'no';
    const recLabel      = l.recommended === 'yes' ? 'Recommended' : 'Not Recommended';
    const recIcon       = l.recommended === 'yes' ? 'thumb_up' : 'thumb_down';
    const starsHTML     = buildStarHTML(l.overallRating, 10);
    const snippets      = l.reviews.slice(0, 2);

    const catEntries = [
      { label:'Safety',         pct: l.categories.safety,         cls:'lr-bar-green' },
      { label:'Responsiveness', pct: l.categories.responsiveness, cls:'lr-bar-blue'  },
      { label:'Maintenance',    pct: l.categories.maintenance,    cls:'lr-bar-amber' },
      { label:'Fairness',       pct: l.categories.fairness,       cls:'lr-bar-purple'},
    ];

    const barsHTML = catEntries.map(c => `
      <div class="lr-bar-row">
        <div class="lr-bar-label-row">
          <span>${c.label}</span>
          <span>${c.pct}%</span>
        </div>
        <div class="lr-bar-track">
          <div class="lr-bar-fill ${c.cls}" data-target-pct="${c.pct}" style="width:0%;"></div>
        </div>
      </div>`).join('');

    const snippetsHTML = snippets.map(r => `
      <div class="lr-snippet">
        <div class="lr-snippet-header">
          <span class="lr-snippet-author">${escH(r.user)}</span>
          <div class="lr-snippet-stars">${buildStarHTML(r.stars, 12)}</div>
        </div>
        <p class="lr-snippet-text">"${escH(r.text)}"</p>
        <p class="lr-snippet-time">${escH(r.date)}</p>
      </div>`).join('');

    return `
    <div class="lr-card" data-id="${l.id}" tabindex="0" role="button" aria-label="View ${escH(l.name)}">
      <div class="lr-card-header">
        <div class="lr-card-top-row">
          <div class="lr-card-avatar" style="background:${color};">${escH(l.initials)}</div>
          <div class="lr-card-name-block">
            <div class="lr-card-name">${escH(l.name)}</div>
            <div class="lr-card-address">${escH(l.properties[0])}</div>
          </div>
          <div class="lr-card-rating-bubble">
            <span class="lr-card-rating-num">${l.overallRating.toFixed(1)}</span>
            <div class="lr-card-rating-stars">${buildStarHTML(l.overallRating, 10)}</div>
            <span class="lr-card-review-count">${l.reviews.length} review${l.reviews.length!==1?'s':''}</span>
          </div>
        </div>
        <div class="lr-rec-badge ${recClass}">
          <span class="material-symbols-outlined" style="font-size:12px;">${recIcon}</span>
          ${recLabel}
        </div>
      </div>

      <div class="lr-card-body">
        <div class="lr-card-bars">${barsHTML}</div>
        <div class="lr-snippets">${snippetsHTML}</div>
        <div class="lr-card-footer" onclick="event.stopPropagation()">
          <button class="lr-btn-details lr-view-detail-btn" data-id="${l.id}">
            <span class="material-symbols-outlined" style="font-size:17px;">open_in_new</span>
            View All Reviews
          </button>
          <button class="lr-btn-icon lr-share-btn" data-id="${l.id}" title="Share">
            <span class="material-symbols-outlined">share</span>
          </button>
          <button class="lr-btn-icon lr-flag-btn" data-id="${l.id}" title="Report">
            <span class="material-symbols-outlined">flag</span>
          </button>
        </div>
      </div>
    </div>`;
  }

  // ── CARD EVENTS ───────────────────────────────────────────────────────────
  function bindCardEvents() {
    const grid = document.getElementById('lrCardsGrid');
    if (!grid) return;

    grid.querySelectorAll('.lr-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.lr-card-footer')) return;
        openDetail(parseInt(card.dataset.id));
      });
      card.addEventListener('keydown', e => { if (e.key === 'Enter') card.click(); });
    });

    grid.querySelectorAll('.lr-view-detail-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openDetail(parseInt(btn.dataset.id));
      });
    });

    grid.querySelectorAll('.lr-share-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        window.BashaBari?.showToast('Link copied to clipboard! 🔗', 'success');
      });
    });

    grid.querySelectorAll('.lr-flag-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (!window.BashaBari?.isLoggedIn()) { window.BashaBari?.openSignIn(); return; }
        window.BashaBari?.showToast('Report submitted. Thank you!', 'info');
      });
    });
  }

  // ── DETAIL MODAL ──────────────────────────────────────────────────────────
  function openDetail(id) {
    const l = LANDLORDS.find(x => x.id === id);
    if (!l) return;
    state.currentDetailId = id;
    populateDetail(l);
    openOverlay('lrDetailModal');
    // Trigger bars after open
    setTimeout(() => triggerDetailBars(), 350);
  }

  function populateDetail(l) {
    const body  = document.getElementById('lrDetailBody');
    if (!body) return;

    const color   = AVATAR_COLORS[l.colorIndex % AVATAR_COLORS.length];
    const recBadge = l.recommended === 'yes'
      ? '<span class="lr-detail-badge lr-detail-badge-rec"> Recommended</span>'
      : '<span class="lr-detail-badge lr-detail-badge-norec"> Not Recommended</span>';

    const propsHTML = l.properties.map(p => `
      <div class="lr-property-item">
        <div class="lr-property-icon">
          <span class="material-symbols-outlined">home</span>
        </div>
        <div>
          <div class="lr-property-addr">${escH(p)}</div>
          <div class="lr-property-area">${escH(l.area)}, ${escH(l.district)}</div>
        </div>
      </div>`).join('');

    const catEntries = [
      { label:'Safety',         pct: l.categories.safety,         cls:'lr-bar-green' },
      { label:'Responsiveness', pct: l.categories.responsiveness, cls:'lr-bar-blue'  },
      { label:'Maintenance',    pct: l.categories.maintenance,    cls:'lr-bar-amber' },
      { label:'Fairness',       pct: l.categories.fairness,       cls:'lr-bar-purple'},
    ];

    const detailBarsHTML = catEntries.map(c => `
      <div class="lr-detail-bar-row">
        <div class="lr-detail-bar-label">
          <span>${c.label}</span>
          <span>${c.pct}%</span>
        </div>
        <div class="lr-detail-bar-track">
          <div class="lr-detail-bar-fill ${c.cls}" data-detail-pct="${c.pct}" style="width:0%;"></div>
        </div>
      </div>`).join('');

    const reviewsHTML = l.reviews.map(r => {
      const rColor = AVATAR_COLORS[r.colorIndex % AVATAR_COLORS.length];
      const recEl  = r.recommended === 'yes'
        ? '<span class="lr-review-item-rec yes">Recommended</span>'
        : '<span class="lr-review-item-rec no">Not Recommended</span>';
      return `
      <div class="lr-review-item">
        <div class="lr-review-item-header">
          <div class="lr-review-item-author">
            <div class="lr-review-avatar" style="background:${rColor};">${escH(r.initials)}</div>
            <div>
              <div class="lr-review-item-name">${escH(r.user)}</div>
              <div class="lr-review-item-date">${escH(r.date)}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="lr-review-item-stars">${buildStarHTML(r.stars, 14)}</div>
            ${recEl}
          </div>
        </div>
        <p class="lr-review-item-text">"${escH(r.text)}"</p>
      </div>`;
    }).join('');

    body.innerHTML = `
      <div class="lr-detail-header">
        <div class="lr-detail-header-inner">
          <div class="lr-detail-avatar-lg" style="background:${color};">${escH(l.initials)}</div>
          <div>
            <div class="lr-detail-name">${escH(l.name)}</div>
            <div class="lr-detail-sub">${escH(l.area)}, ${escH(l.district)} • ${l.reviews.length} review${l.reviews.length!==1?'s':''}</div>
            <div class="lr-detail-badges">
              <span class="lr-detail-badge lr-detail-badge-rating">⭐ ${l.overallRating.toFixed(1)} Overall</span>
              ${recBadge}
            </div>
          </div>
        </div>
      </div>

      <div class="lr-detail-content">
        <!-- Properties -->
        <div class="lr-detail-section">
          <div class="lr-detail-section-title">
            <span class="material-symbols-outlined">home</span>
            Properties Listed
          </div>
          <div class="lr-properties-list">${propsHTML}</div>
        </div>

        <!-- Category Ratings -->
        <div class="lr-detail-section">
          <div class="lr-detail-section-title">
            <span class="material-symbols-outlined">bar_chart</span>
            Category Ratings
          </div>
          <div class="lr-detail-bars">${detailBarsHTML}</div>
        </div>

        <!-- All Reviews -->
        <div class="lr-detail-section">
          <div class="lr-detail-section-title">
            <span class="material-symbols-outlined">rate_review</span>
            All Student Reviews
            <span style="background:rgba(12,103,128,0.1);color:#0c6780;font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;margin-left:4px;">${l.reviews.length}</span>
          </div>
          <div class="lr-all-reviews">${reviewsHTML}</div>
        </div>
      </div>`;
  }

  function triggerDetailBars() {
    document.querySelectorAll('[data-detail-pct]').forEach(bar => {
      bar.style.width = bar.dataset.detailPct + '%';
    });
  }

  // BAR OBSERVER 
  function initBarObserver() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const pct = bar.getAttribute('data-target-pct');
          if (pct) bar.style.width = pct + '%';
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

   
    window._lrBarObserver = observer;
  }

  function triggerVisibleBars() {
    setTimeout(() => {
      document.querySelectorAll('[data-target-pct]').forEach(bar => {
        if (window._lrBarObserver) window._lrBarObserver.observe(bar);
      });
    }, 100);
  }

  // WRITE REVIEW FORM 
  function bindWriteReviewForm() {
    // Star rating input
    initStarInput('lrStarInput', '.lr-star-rate-btn', val => {
      state.selectedRating = val;
      const labels = ['','Terrible 😟','Poor 😕','Average 😐','Good 😊','Excellent 🤩'];
      const el = document.getElementById('lrStarValLabel');
      if (el) el.textContent = labels[val] || '';
    });

    // Category mini stars
    ['safety','responsiveness','maintenance','fairness'].forEach(cat => {
      const wrap = document.querySelector(`.lr-mini-stars[data-cat="${cat}"]`);
      if (!wrap) return;
      initStarInput(null, `.lr-mini-stars[data-cat="${cat}"] .lr-mini-star`, val => {
        state.catRatings[cat] = val;
      }, wrap);
    });

    // Recommend toggle
    document.querySelectorAll('.lr-rec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lr-rec-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.recommended = btn.dataset.val;
      });
    });

    // Char count
    document.getElementById('lr_review_text')?.addEventListener('input', e => {
      const len = e.target.value.length;
      const el  = document.getElementById('lrCharCount');
      if (el) el.textContent = len;
      if (len > 450) el.style.color = '#ef4444';
      else el.style.color = '#75777e';
    });

    // Live clear errors
    ['lr_landlord_name','lr_property_address','lr_district','lr_review_text'].forEach(id => {
      document.getElementById(id)?.addEventListener('input',  () => clearFieldErr(id));
      document.getElementById(id)?.addEventListener('change', () => clearFieldErr(id));
    });

    // Submit
    document.getElementById('lrReviewForm')?.addEventListener('submit', handleReviewSubmit);
  }

  function initStarInput(containerId, selector, onChange, container) {
    const buttons = container
      ? container.querySelectorAll(selector.split(' ').pop())
      : document.querySelectorAll(selector);

    let current = 0;

    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => highlightStars(buttons, parseInt(btn.dataset.val)));
      btn.addEventListener('mouseleave', () => highlightStars(buttons, current));
      btn.addEventListener('click', () => {
        current = parseInt(btn.dataset.val);
        highlightStars(buttons, current);
        onChange(current);
      });
    });
  }

  function highlightStars(buttons, upTo) {
    buttons.forEach(btn => {
      btn.classList.toggle('lit', parseInt(btn.dataset.val) <= upTo);
    });
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    if (!window.BashaBari?.isLoggedIn()) { window.BashaBari?.openSignIn(); return; }

    const name    = document.getElementById('lr_landlord_name')?.value.trim();
    const address = document.getElementById('lr_property_address')?.value.trim();
    const district= document.getElementById('lr_district')?.value;
    const text    = document.getElementById('lr_review_text')?.value.trim();
    let valid     = true;

    if (!name || name.length < 3) { showFieldErr('lr_landlord_name', 'Please enter the landlord\'s full name'); valid = false; }
    if (!address)                  { showFieldErr('lr_property_address', 'Please enter the property address'); valid = false; }
    if (!district)                 { showFieldErr('lr_district', 'Please select the district'); valid = false; }
    if (!state.selectedRating)     { showFieldErr('lr_star_err', 'Please give an overall star rating'); valid = false; }
    if (!text || text.length < 20) { showFieldErr('lr_review_text', 'Review must be at least 20 characters'); valid = false; }
    if (!valid) return;

    const btn = document.getElementById('lrSubmitBtn');
    if (btn) { btn.classList.add('loading'); btn.disabled = true; }
    const fd = new FormData();
    fd.append('landlord_name', name);
    fd.append('property_address', address);
    fd.append('district_id', district);
    fd.append('star_rating', state.selectedRating);
    fd.append('is_recommended', state.recommended === 'yes' ? '1' : '0');
    fd.append('review_text', text);

    fetch('api/landlord-reviews/submit-review.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' },
      body: fd
    })
      .then(r => r.json().then(data => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || !data.success) throw new Error(data.error || 'Could not submit review.');
        if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
        e.target.reset();
        state.selectedRating = 0;
        state.catRatings     = { safety:0, responsiveness:0, maintenance:0, fairness:0 };
        state.recommended    = 'yes';
        document.querySelectorAll('.lr-star-rate-btn,.lr-mini-star').forEach(b => b.classList.remove('lit'));
        document.querySelectorAll('.lr-rec-btn').forEach(b => b.classList.toggle('active', b.dataset.val==='yes'));
        const charCount = document.getElementById('lrCharCount');
        if (charCount) charCount.textContent = '0';
        window.BashaBari?.showToast('Review submitted for admin approval. Thank you!', 'success');
      })
      .catch(err => {
        if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
        window.BashaBari?.showToast(err.message || 'Could not submit review.', 'error');
      });
  }

  // TOOLBAR
  function bindToolbar() {
    document.getElementById('lrSortSelect')?.addEventListener('change', e => {
      state.sort = e.target.value;
      applyAndRender();
    });

    document.getElementById('lrLoadMoreBtn')?.addEventListener('click', () => {
      state.displayed += CARDS_PER_PAGE;
      renderCards();
    });
  }

  function setView(mode) {
    state.viewMode = mode;
    const grid    = document.getElementById('lrCardsGrid');
    const gridBtn = document.getElementById('lrGridViewBtn');
    const listBtn = document.getElementById('lrListViewBtn');
    grid?.classList.toggle('list-view', mode === 'list');
    gridBtn?.classList.toggle('active', mode === 'grid');
    listBtn?.classList.toggle('active', mode === 'list');
  }

  // DETAIL MODAL BIND
  function bindDetailModal() {
    document.getElementById('lrDetailClose')?.addEventListener('click', () => closeOverlay('lrDetailModal'));
    document.getElementById('lrDetailModal')?.addEventListener('click', e => {
      if (e.target.id === 'lrDetailModal') closeOverlay('lrDetailModal');
    });
  }

  // STATS & WIDGETS 
  function updatePlatformStats() {
    const totalReviews = LANDLORDS.reduce((s,l) => s + l.reviews.length, 0);
    const totalLandlords = LANDLORDS.length;
    const avgRating = totalReviews
      ? (LANDLORDS.reduce((s,l) => s + l.overallRating * l.reviews.length, 0) / totalReviews).toFixed(1)
      : '–';
    const recCount  = LANDLORDS.reduce((s,l) => s + l.reviews.filter(r => r.recommended==='yes').length, 0);
    const recRate   = totalReviews ? Math.round((recCount / totalReviews) * 100) + '%' : '–';

    setText('statTotalReviews',   totalReviews);
    setText('statTotalLandlords', totalLandlords);
    setText('statAvgRating',      avgRating + ' ⭐');
    setText('statRecRate',        recRate);
  }

  function buildTopWidget() {
    const sorted  = [...LANDLORDS].sort((a,b) => b.overallRating - a.overallRating).slice(0, 5);
    const list    = document.getElementById('lrTopList');
    if (!list) return;

    list.innerHTML = sorted.map((l, i) => {
      const rankCls = i === 0 ? 'lr-top-rank-1' : i === 1 ? 'lr-top-rank-2' : i === 2 ? 'lr-top-rank-3' : 'lr-top-rank-n';
      return `
      <div class="lr-top-item" data-id="${l.id}">
        <div class="lr-top-rank ${rankCls}">${i+1}</div>
        <div class="lr-top-info">
          <div class="lr-top-name">${escH(l.name)}</div>
          <div class="lr-top-area">${escH(l.area)}, ${escH(l.district)}</div>
        </div>
        <div class="lr-top-rating">
          <span class="material-symbols-outlined">star</span>
          ${l.overallRating.toFixed(1)}
        </div>
      </div>`;
    }).join('');

    list.querySelectorAll('.lr-top-item').forEach(item => {
      item.addEventListener('click', () => openDetail(parseInt(item.dataset.id)));
    });
  }

  // HELPERS
  function resetFilters() {
    state.filters = { search:'', district:'', area:'', stars:0 };
    const searchInput = document.getElementById('lrHeroSearch');
    const distSel     = document.getElementById('lrDistrictFilter');
    const areaSel     = document.getElementById('lrAreaFilter');
    if (searchInput) searchInput.value = '';
    if (distSel)     distSel.value     = '';
    if (areaSel)     areaSel.innerHTML = '<option value="">All Areas</option>';
    document.querySelectorAll('.lr-star-btn').forEach((b,i) => b.classList.toggle('active', i===0));
    applyAndRender();
    window.BashaBari?.showToast('Filters cleared', 'info');
  }

  function updateResultsCount(count) {
    const el    = document.getElementById('lrResultsCount');
    const label = document.getElementById('lrQueryLabel');
    if (el)    el.textContent    = count;
    if (label) label.textContent = state.filters.search ? `for "${state.filters.search}"` : '';
  }

  function buildStarHTML(rating, size) {
    const full  = Math.floor(rating);
    const half  = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return [
      ...Array(full).fill(`<span class="material-symbols-outlined" style="font-size:${size}px;color:#f59e0b;font-variation-settings:'FILL' 1;">star</span>`),
      ...Array(half).fill(`<span class="material-symbols-outlined" style="font-size:${size}px;color:#f59e0b;font-variation-settings:'FILL' 1;">star_half</span>`),
      ...Array(empty).fill(`<span class="material-symbols-outlined" style="font-size:${size}px;color:#e0e3e5;">star</span>`),
    ].join('');
  }

  function openOverlay(id) {
    document.getElementById(id)?.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeOverlay(id) {
    document.getElementById(id)?.classList.remove('active');
    if (!document.querySelector('.modal-overlay.active')) {
      document.body.classList.remove('modal-open');
    }
  }

  function showFieldErr(id, msg) {
    const el  = document.getElementById(id);
    const err = document.getElementById(id + '_err') || document.getElementById(id);
    el?.classList.add('has-error');
    const errEl = document.getElementById(id + '_err');
    if (errEl) {
      errEl.classList.add('visible');
      const span = errEl.querySelector('span:last-child');
      if (span) span.textContent = msg;
    }
  }

  function clearFieldErr(id) {
    document.getElementById(id)?.classList.remove('has-error');
    document.getElementById(id + '_err')?.classList.remove('visible');
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function getInitials(name) {
    return (name||'').trim().split(' ').filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
  }

  function escH(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

})();