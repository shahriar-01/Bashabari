(function () {
  'use strict';
  const CARDS_PER_PAGE = 9;

  const DISTRICTS_AREAS = {
    Dhaka:       ['Mirpur','Uttara','Badda','Dhanmondi','Mohammadpur','Gulshan','Banani','Bashundhara','Nikunjo','Khilkhet','Shyamoli','Farmgate','Nilkhet'],
    Chittagong:  ['Agrabad','Nasirabad','Halishahar','Panchlaish','GEC Circle','Khulshi'],
    Sylhet:      ['Zindabazar','Ambarkhana','Subidbazar','Tilagarh','Shahjalal Upashahar'],
    Rajshahi:    ['Shaheb Bazar','Uposhahar','Kazla','Motihar'],
    Khulna:      ['Boyra','Sonadanga','Khalishpur','Daulatpur'],
    Gazipur:     ['Tongi','Joydebpur','Bhawal'],
    Narayanganj: ['Siddhirganj','Fatullah','Sonargaon'],
  };

  const UNIVERSITIES = [
    'North South University (NSU)',
    'BRAC University',
    'AIUB',
    'University of Dhaka (DU)',
    'BUET',
    'IUT',
    'Daffodil International University (DIU)',
    'ULAB',
    'United International University (UIU)',
    'East West University (EWU)',
    'UAP',
    'SUST',
    'CUET',
    'MIST',
    'Jahangirnagar University (JU)',
    'IUB',
  ];

  const LIFESTYLE_TAGS = [
    { key:'Clean',       emoji:'' },
    { key:'Friendly',    emoji:'' },
    { key:'Non-Smoker',  emoji:'' },
    { key:'Smoker',      emoji:'' },
    { key:'Early Bird',  emoji:'' },
    { key:'Night Owl',   emoji:'' },
    { key:'Studious',    emoji:'' },
    { key:'Social',      emoji:'' },
    { key:'Pet Friendly',emoji:'' },
    { key:'Gamer',       emoji:'' },
    { key:'Introvert',   emoji:'' },
    { key:'Extrovert',   emoji:'' },
    { key:'Flexible',    emoji:'' },
    { key:'Peace Lover', emoji:'' },
  ];

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

  // SAMPLE DATA
  const SAMPLE_ROOMMATES = [
    {
      id: 1, name: 'Rahat Hossain', initials: 'RH', gender: 'Male',
      university: 'BRAC University', department: 'CSE',
      budgetMin: 5000, budgetMax: 8000,
      district: 'Dhaka', preferredAreas: ['Badda','Bashundhara'],
      moveIn: 'July 2025', lifestyle: ['Clean','Non-Smoker','Night Owl','Studious'],
      description: 'Final year CSE student at BRAC University. Looking for a quiet, clean roommate who respects study hours. I usually stay up late coding. Prefer Badda or Bashundhara area near campus.',
      matchScore: 98, colorIndex: 0, verified: true, postedAgo: '2h ago',
    },
    {
      id: 2, name: 'Sifat Ahmed', initials: 'SA', gender: 'Male',
      university: 'North South University (NSU)', department: 'BBA',
      budgetMin: 4000, budgetMax: 6000,
      district: 'Dhaka', preferredAreas: ['Bashundhara','Nikunjo'],
      moveIn: 'August 2025', lifestyle: ['Early Bird','Friendly','Social','Clean'],
      description: 'BBA student at NSU. Early riser, love keeping things tidy. Enjoy weekend hangouts but respect quiet study hours on weekdays. Looking for a like-minded roommate near NSU.',
      matchScore: 85, colorIndex: 1, verified: true, postedAgo: '5h ago',
    },
    {
      id: 3, name: 'Nusrat Jahan', initials: 'NJ', gender: 'Female',
      university: 'University of Dhaka (DU)', department: 'English Literature',
      budgetMin: 4500, budgetMax: 7000,
      district: 'Dhaka', preferredAreas: ['Dhanmondi','Shyamoli'],
      moveIn: 'June 2025', lifestyle: ['Clean','Non-Smoker','Introvert','Peace Lover','Studious'],
      description: 'English Lit student at DU. Introverted, love books and quiet evenings. Non-smoker, no parties please. Prefer female-only arrangements near Dhanmondi.',
      matchScore: 91, colorIndex: 4, verified: true, postedAgo: '1d ago',
    },
    {
      id: 4, name: 'Tanvir Khan', initials: 'TK', gender: 'Male',
      university: 'BUET', department: 'EEE',
      budgetMin: 3500, budgetMax: 5500,
      district: 'Dhaka', preferredAreas: ['Eskaton','Farmgate'],
      moveIn: 'September 2025', lifestyle: ['Studious','Non-Smoker','Clean','Flexible'],
      description: 'EEE student at BUET. Spend most time studying or in lab. Looking for a responsible and clean roommate near BUET campus. Flexible with timing.',
      matchScore: 88, colorIndex: 2, verified: false, postedAgo: '3d ago',
    },
    {
      id: 5, name: 'Ria Mondal', initials: 'RM', gender: 'Female',
      university: 'East West University (EWU)', department: 'Pharmacy',
      budgetMin: 5000, budgetMax: 9000,
      district: 'Dhaka', preferredAreas: ['Badda','Rayer Bazar'],
      moveIn: 'July 2025', lifestyle: ['Clean','Friendly','Non-Smoker','Pet Friendly','Early Bird'],
      description: 'Pharmacy student at EWU. I have a small cat so looking for a pet-friendly arrangement. Very clean and organized. Morning person, usually in bed by 10pm.',
      matchScore: 79, colorIndex: 4, verified: true, postedAgo: '6h ago',
    },
    {
      id: 6, name: 'Ariful Islam', initials: 'AI', gender: 'Male',
      university: 'AIUB', department: 'CS',
      budgetMin: 6000, budgetMax: 10000,
      district: 'Dhaka', preferredAreas: ['Uttara','Nikunjo'],
      moveIn: 'August 2025', lifestyle: ['Gamer','Night Owl','Friendly','Social','Non-Smoker'],
      description: 'CS student and part-time game developer. Night owl who loves gaming. Looking for a chill roommate who doesn\'t mind some keyboard noise at night. Uttara preferred.',
      matchScore: 73, colorIndex: 0, verified: false, postedAgo: '12h ago',
    },
    {
      id: 7, name: 'Sumaiya Akter', initials: 'SA', gender: 'Female',
      university: 'MIST', department: 'Architecture',
      budgetMin: 7000, budgetMax: 12000,
      district: 'Dhaka', preferredAreas: ['Mirpur','Mohammadpur'],
      moveIn: 'October 2025', lifestyle: ['Creative','Clean','Non-Smoker','Studious','Flexible'],
      description: 'Architecture student at MIST. Creative, organized, and respectful. Looking for a mature female roommate. Often work late on design projects but keep my space very clean.',
      matchScore: 86, colorIndex: 3, verified: true, postedAgo: '2d ago',
    },
    {
      id: 8, name: 'Mahfuz Alam', initials: 'MA', gender: 'Male',
      university: 'North South University (NSU)', department: 'ECE',
      budgetMin: 4000, budgetMax: 7000,
      district: 'Dhaka', preferredAreas: ['Bashundhara','Badda','Khilkhet'],
      moveIn: 'July 2025', lifestyle: ['Clean','Extrovert','Friendly','Social','Non-Smoker'],
      description: 'ECE student at NSU. Very social and outgoing. Love cooking BD food and hosting study sessions. Looking for a friendly roommate near NSU campus.',
      matchScore: 82, colorIndex: 6, verified: true, postedAgo: '4h ago',
    },
    {
      id: 9, name: 'Fariha Chowdhury', initials: 'FC', gender: 'Female',
      university: 'IUB', department: 'Media Studies',
      budgetMin: 5500, budgetMax: 8500,
      district: 'Dhaka', preferredAreas: ['Gulshan','Banani','Baridhara'],
      moveIn: 'August 2025', lifestyle: ['Social','Extrovert','Clean','Non-Smoker','Friendly'],
      description: 'Media Studies at IUB. Outgoing and creative. Often out for shoots or events but keep the home clean. Looking for a cheerful, non-smoking roommate in the Gulshan area.',
      matchScore: 77, colorIndex: 4, verified: false, postedAgo: '8h ago',
    },
    {
      id: 10, name: 'Imran Hossain', initials: 'IH', gender: 'Male',
      university: 'SUST', department: 'Civil Engineering',
      budgetMin: 3000, budgetMax: 5000,
      district: 'Sylhet', preferredAreas: ['Tilagarh','Shahjalal Upashahar'],
      moveIn: 'September 2025', lifestyle: ['Studious','Clean','Peace Lover','Non-Smoker','Early Bird'],
      description: 'Civil Engineering at SUST. Quiet and focused student. Looking for a similarly studious roommate near SUST campus in Sylhet. Early sleeper and early riser.',
      matchScore: 90, colorIndex: 2, verified: true, postedAgo: '3d ago',
    },
    {
      id: 11, name: 'Disha Rahman', initials: 'DR', gender: 'Female',
      university: 'United International University (UIU)', department: 'CSE',
      budgetMin: 4500, budgetMax: 7500,
      district: 'Dhaka', preferredAreas: ['Badda','Nikunjo','Khilkhet'],
      moveIn: 'June 2025', lifestyle: ['Studious','Clean','Non-Smoker','Introvert','Flexible'],
      description: 'CSE student at UIU. Focused and hardworking. Prefer a calm, clean environment. Will share cooking duties. Looking for a female roommate near UIU or Badda.',
      matchScore: 93, colorIndex: 7, verified: true, postedAgo: '1h ago',
    },
    {
      id: 12, name: 'Sabbir Chowdhury', initials: 'SC', gender: 'Male',
      university: 'Daffodil International University (DIU)', department: 'MBA',
      budgetMin: 8000, budgetMax: 14000,
      district: 'Dhaka', preferredAreas: ['Mirpur','Mohammadpur'],
      moveIn: 'October 2025', lifestyle: ['Flexible','Friendly','Clean','Non-Smoker','Social'],
      description: 'MBA student at DIU and working part-time. Financially responsible, clean, and friendly. Prefer a structured and peaceful home environment. Open to both Mirpur and Mohammadpur areas.',
      matchScore: 75, colorIndex: 1, verified: true, postedAgo: '6d ago',
    },
  ];

  // STATE
  let state = {
    allRoommates:      [],
    filteredRoommates: [],
    displayedCount:    CARDS_PER_PAGE,
    filters: {
      search:     '',
      universities: [],
      gender:     '',
      budgetMin:  0,
      budgetMax:  999999,
      district:   '',
      areas:      [],
      lifestyle:  [],
    },
    heroPills:   [],  
    sort:        'match',
    viewMode:    'grid',
    connectSent: [],
    connectedUsers: [],
    currentDetailId: null,
  };

  // INIT
  document.addEventListener('DOMContentLoaded', () => {
    buildSidebarFilters();
    buildLifestyleChips('rmLifestyleGrid', 'rm-lifestyle-chip rm-ls-filter');
    buildLifestyleChips('lpLifestyleGrid', 'rm-lifestyle-chip lp-ls-chip');
    bindSidebarEvents();
    bindToolbarEvents();
    bindHeroPills();
    bindModalEvents();
    showSkeletons();
    loadBackendRoommates();
    initScrollReveal();
  });

  function loadBackendRoommates() {
    fetch('api/roommates/get-roommates.php?limit=50')
      .then(r => r.json())
      .then(data => {
        if (!data.success || !Array.isArray(data.profiles)) throw new Error(data.error || 'No profiles');
        const monthNames = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
        state.allRoommates = data.profiles.map((p, i) => ({
          id: p.user_id,
          profileId: p.id,
          name: p.name || p.full_name || 'Student',
          initials: getInitials(p.name || p.full_name || 'Student'),
          gender: (p.gender || 'other').charAt(0).toUpperCase() + (p.gender || 'other').slice(1),
          university: p.university || '',
          universityShort: p.university_short || '',
          department: p.university_short || 'Student',
          budgetMin: Number(p.budget_min || 0),
          budgetMax: Number(p.budget_max || 0),
          district: p.district || '',
          preferredAreas: p.preferred_areas || [],
          moveIn: `${monthNames[p.move_in_month || 0] || ''} ${p.move_in_year || ''}`.trim(),
          lifestyle: p.tags || [],
          description: p.description || '',
          matchScore: 80 + (i % 19),
          colorIndex: i % AVATAR_COLORS.length,
          verified: true,
          postedAgo: 'recently',
        }));
        state.filteredRoommates = [...state.allRoommates];
        buildSidebarFilters();
        return loadConnectionStates().finally(() => applyFiltersAndRender());
      })
      .catch(() => { state.allRoommates = []; state.filteredRoommates = []; applyFiltersAndRender(); });
  }


  function loadConnectionStates() {
    if (!window.BashaBari?.isLoggedIn()) { state.connectSent = []; state.connectedUsers = []; return Promise.resolve(); }
    const reqs = fetch('api/connections/get-requests.php').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.success) {
        state.connectSent = (d.outgoing || []).map(r => Number(r.other_user?.id || r.receiver_id)).filter(Boolean);
        localStorage.setItem('bb_rm_connects', JSON.stringify(state.connectSent));
      }
    }).catch(() => null);
    const conns = fetch('api/connections/get-connections.php').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.success) state.connectedUsers = (d.connections || []).map(c => Number(c.other_user?.id)).filter(Boolean);
    }).catch(() => null);
    return Promise.all([reqs, conns]);
  }

  // BUILD SIDEBAR 
  function buildSidebarFilters() {
    // University checkboxes
    const uniList = document.getElementById('rmUniversityList');
    if (uniList) {
      uniList.innerHTML = UNIVERSITIES.map(u => {
        const count = state.allRoommates.filter(r => u === r.university || u === r.universityShort || u.includes(r.university) || r.university.includes(u) || (r.universityShort && u.includes(r.universityShort))).length;
        return `
        <label class="filter-checkbox-item">
          <input type="checkbox" value="${escH(u)}" class="filter-checkbox rm-uni-cb"/>
          <span class="filter-checkbox-label">${escH(u)}</span>
          <span class="filter-checkbox-count">${count}</span>
        </label>`;
      }).join('');
    }

    // Filter section collapse
    document.querySelectorAll('.filter-section-header').forEach(header => {
      if (header.dataset.boundCollapse) return;
        header.dataset.boundCollapse = '1';
        header.addEventListener('click', () => {
        const body = document.getElementById(header.dataset.target);
        if (!body) return;
        header.classList.toggle('collapsed');
        body.classList.toggle('collapsed');
      });
    });
  }

  function buildLifestyleChips(containerId, chipClass) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = LIFESTYLE_TAGS.map(t => `
      <label class="${chipClass}" data-key="${t.key}">
        <input type="checkbox" value="${t.key}" class="rm-ls-input"/>
        ${t.emoji} ${t.key}
      </label>`).join('');

    container.querySelectorAll('input').forEach(cb => {
      cb.addEventListener('change', () => cb.closest('label')?.classList.toggle('active', cb.checked));
    });
  }

  // BIND SIDEBAR 
  function bindSidebarEvents() {
    // Search (hero + sidebar sync)
    const heroInput    = document.getElementById('heroRmSearch');
    const sideInput    = document.getElementById('rmSidebarSearch');
    const clearBtn     = document.getElementById('clearRmSearch');

    function syncSearch(val) {
      state.filters.search = val.trim();
      if (heroInput)  heroInput.value  = val;
      if (sideInput)  sideInput.value  = val;
      if (clearBtn)   clearBtn.style.display = val ? 'flex' : 'none';
      applyFiltersAndRender();
    }

    heroInput?.addEventListener('input',  e => syncSearch(e.target.value));
    sideInput?.addEventListener('input',  e => syncSearch(e.target.value));
    clearBtn?.addEventListener('click',   () => syncSearch(''));
    document.getElementById('heroRmSearchBtn')?.addEventListener('click', () => syncSearch(heroInput?.value || ''));

    // University
    document.getElementById('rmUniversityList')?.addEventListener('change', () => {
      state.filters.universities = getChecked('.rm-uni-cb');
      applyFiltersAndRender();
    });

    // Gender buttons
    document.getElementById('rmGenderBtns')?.addEventListener('click', e => {
      const btn = e.target.closest('.rm-gender-btn');
      if (!btn) return;
      document.querySelectorAll('.rm-gender-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filters.gender = btn.dataset.gender;
      applyFiltersAndRender();
    });

    // Budget buttons
    document.getElementById('rmBudgetOptions')?.addEventListener('click', e => {
      const btn = e.target.closest('.rm-budget-btn');
      if (!btn) return;
      document.querySelectorAll('.rm-budget-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filters.budgetMin = parseInt(btn.dataset.min);
      state.filters.budgetMax = parseInt(btn.dataset.max);
      applyFiltersAndRender();
    });

    // District
    document.getElementById('rmDistrictSelect')?.addEventListener('change', e => {
      state.filters.district = e.target.value;
      state.filters.areas    = [];
      buildAreaCheckboxes(e.target.value);
      applyFiltersAndRender();
    });

    // Area checkboxes (dynamic)
    document.getElementById('rmAreaList')?.addEventListener('change', () => {
      state.filters.areas = getChecked('.rm-area-cb');
      applyFiltersAndRender();
    });

    // Lifestyle (sidebar)
    document.getElementById('rmLifestyleGrid')?.addEventListener('change', () => {
      state.filters.lifestyle = getChecked('#rmLifestyleGrid .rm-ls-input');
      applyFiltersAndRender();
    });

    // Reset
    ['resetAllRmFilters','resetRmBottom','rmEmptyResetBtn'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', resetAllFilters);
    });

    // Sidebar toggle
    document.getElementById('rmSidebarToggle')?.addEventListener('click', toggleSidebar);

    // Mobile sidebar
    document.getElementById('rmMobileFilterBtn')?.addEventListener('click', openMobileSidebar);
    document.getElementById('rmSidebarMobileClose')?.addEventListener('click', closeMobileSidebar);
    document.getElementById('sidebarOverlay')?.addEventListener('click', closeMobileSidebar);
  }

  function buildAreaCheckboxes(district) {
    const list  = document.getElementById('rmAreaList');
    if (!list) return;
    const areas = DISTRICTS_AREAS[district] || [];
    if (!areas.length) {
      list.innerHTML = '<div class="filter-placeholder-text">No areas for selected district</div>';
      return;
    }
    list.innerHTML = areas.map(a => `
      <label class="filter-checkbox-item">
        <input type="checkbox" value="${escH(a)}" class="filter-checkbox rm-area-cb"/>
        <span class="filter-checkbox-label">${escH(a)}</span>
      </label>`).join('');
  }

  function getChecked(selector) {
    return Array.from(document.querySelectorAll(`${selector}:checked`)).map(el => el.value);
  }

  // HERO PILLS
  function bindHeroPills() {
    document.querySelectorAll('.rm-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('active');
        const tag = pill.dataset.lifestyle;
        if (pill.classList.contains('active')) {
          if (!state.heroPills.includes(tag)) state.heroPills.push(tag);
        } else {
          state.heroPills = state.heroPills.filter(t => t !== tag);
        }
        // Sync lifestyle filter
        state.filters.lifestyle = [...state.heroPills];
        // Sync sidebar chips
        document.querySelectorAll('#rmLifestyleGrid .rm-ls-input').forEach(cb => {
          const active = state.filters.lifestyle.includes(cb.value);
          cb.checked = active;
          cb.closest('label')?.classList.toggle('active', active);
        });
        applyFiltersAndRender();
      });
    });
  }

  // FILTER LOGIC
  function applyFiltersAndRender() {
    const f = state.filters;
    let results = [...state.allRoommates];

    // Search
    if (f.search) {
      const q = f.search.toLowerCase();
      results = results.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.university.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        r.lifestyle.some(l => l.toLowerCase().includes(q)) ||
        r.description.toLowerCase().includes(q)
      );
    }

    // Universities
    if (f.universities.length) {
      results = results.filter(r => f.universities.some(u => u === r.university || u === r.universityShort || u.includes(r.university) || r.university.includes(u) || (r.universityShort && u.includes(r.universityShort))));
    }

    // Gender
    if (f.gender) results = results.filter(r => r.gender === f.gender);

    // Budget
    results = results.filter(r =>
      r.budgetMax >= f.budgetMin && r.budgetMin <= f.budgetMax
    );

    // District
    if (f.district) results = results.filter(r => r.district === f.district);

    // Areas
    if (f.areas.length) {
      results = results.filter(r =>
        f.areas.some(a => r.preferredAreas.includes(a))
      );
    }

    // Lifestyle 
    if (f.lifestyle.length) {
      results = results.filter(r =>
        f.lifestyle.every(tag => r.lifestyle.includes(tag))
      );
    }

    // Sort
    switch (state.sort) {
      case 'newest':      results.sort((a,b) => b.id - a.id); break;
      case 'budget_asc':  results.sort((a,b) => a.budgetMin - b.budgetMin); break;
      case 'budget_desc': results.sort((a,b) => b.budgetMin - a.budgetMin); break;
      case 'name':        results.sort((a,b) => a.name.localeCompare(b.name)); break;
    }

    state.filteredRoommates = results;
    state.displayedCount    = CARDS_PER_PAGE;

    updateResultsCount(results.length);
    updateActiveFilterTags();
    updateFilterBadge();
    renderCards();
  }

  //  RENDER
  function showSkeletons() {
    const grid = document.getElementById('rmCardsGrid');
    if (!grid) return;
    grid.innerHTML = Array(6).fill(0).map(() => `
      <div class="rm-skeleton">
        <div class="rm-skel-header"></div>
        <div class="rm-skel-body">
          <div class="rm-skel-line"></div>
          <div class="rm-skel-line short"></div>
          <div class="rm-skel-line shorter"></div>
        </div>
      </div>`).join('');
  }

  function renderCards() {
    const grid     = document.getElementById('rmCardsGrid');
    const empty    = document.getElementById('rmEmptyState');
    const loadMore = document.getElementById('rmLoadMoreWrap');
    if (!grid) return;

    const isLoggedIn = window.BashaBari?.isLoggedIn();
    const toShow     = state.filteredRoommates.slice(0, state.displayedCount);

    if (!toShow.length) {
      grid.innerHTML = '';
      if (empty)    empty.style.display    = 'flex';
      if (loadMore) loadMore.style.display = 'none';
      return;
    }

    if (empty) empty.style.display = 'none';

    grid.innerHTML = toShow.map((r, i) => buildCard(r, i, isLoggedIn)).join('');

    // Stagger animation
    grid.querySelectorAll('.rm-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 55}ms`;
    });

    if (loadMore) {
      loadMore.style.display = state.filteredRoommates.length > state.displayedCount ? 'flex' : 'none';
    }

    bindCardEvents();
  }

  function buildCard(r, i, isLoggedIn) {
    const color    = AVATAR_COLORS[r.colorIndex % AVATAR_COLORS.length];
    const isSent   = state.connectSent.includes(Number(r.id));
    const isConnected = state.connectedUsers.includes(Number(r.id));
    const genderCls = r.gender.toLowerCase();

    // Tags to show (max 4)
    const shownTags = r.lifestyle.slice(0, 4);
    const extraTags = r.lifestyle.length - shownTags.length;

    const lifestyleTagsHTML = isLoggedIn
      ? shownTags.map(t => {
          const tag = LIFESTYLE_TAGS.find(x => x.key === t);
          return `<span class="rm-tag rm-tag-default">${tag ? tag.emoji : ''}${escH(t)}</span>`;
        }).join('') + (extraTags > 0 ? `<span class="rm-tag rm-tag-default">+${extraTags}</span>` : '')
      : shownTags.map(() => `<span class="rm-tag rm-tag-default rm-tag-blurred">████</span>`).join('');

    const budgetHTML = isLoggedIn
      ? `<div class="rm-budget-pill">
           <span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:'FILL' 1;">payments</span>
           ৳${r.budgetMin.toLocaleString()} – ৳${r.budgetMax.toLocaleString()}/mo
         </div>`
      : `<div class="rm-budget-pill" style="filter:blur(5px);user-select:none;">৳X,XXX – ৳X,XXX/mo</div>`;

    const infoRows = isLoggedIn
      ? `<div class="rm-info-row">
           <span class="material-symbols-outlined">location_on</span>
           <span>${escH(r.district)} – ${escH(r.preferredAreas[0])}${r.preferredAreas.length > 1 ? ', +' + (r.preferredAreas.length - 1) : ''}</span>
         </div>
         <div class="rm-info-row">
           <span class="material-symbols-outlined">calendar_month</span>
           <span>Move-in: ${escH(r.moveIn)}</span>
         </div>`
      : `<div class="rm-info-row blurred">
           <span class="material-symbols-outlined">location_on</span>
           <span>Sign in to view location</span>
         </div>
         <div class="rm-info-row blurred">
           <span class="material-symbols-outlined">calendar_month</span>
           <span>Sign in to view move-in</span>
         </div>`;

    const descHTML = isLoggedIn
      ? `<p class="rm-card-desc">${escH(r.description)}</p>`
      : `<p class="rm-card-desc blurred">Sign in to read full profile description and contact details.</p>`;

    const connectBtn = isLoggedIn
      ? isSent
        ? `<button class="rm-btn-connect sent" data-id="${r.id}" disabled>
             <span class="material-symbols-outlined" style="font-size:16px;">check_circle</span>
             Request Sent
           </button>`
        : `<button class="rm-btn-connect rm-connect-btn" data-id="${r.id}">
             <span class="material-symbols-outlined" style="font-size:16px;">person_add</span>
             Connect
           </button>`
      : `<button class="rm-btn-connect rm-connect-login" data-id="${r.id}">
           <span class="material-symbols-outlined" style="font-size:16px;">lock</span>
           Sign In to Connect
         </button>`;

    return `
    <div class="rm-card" data-id="${r.id}" tabindex="0" role="button" aria-label="View ${escH(r.name)}'s profile">
      <!-- Header -->
      <div class="rm-card-header">
        
        <div class="rm-card-gender-badge ${genderCls}">${escH(r.gender)}</div>
        <div class="rm-card-avatar" style="background:${color};">${escH(r.initials)}</div>
        <div class="rm-card-name">${escH(r.name)}</div>
        <div class="rm-card-univ">${escH(r.department)} @ ${escH(r.university.split('(')[0].trim())}</div>
      </div>

      <!-- Body -->
      <div class="rm-card-body">
        

<div class="rm-top-row">
  ${budgetHTML}
  <div class="rm-movein">
    <span class="material-symbols-outlined">calendar_month</span>
    <span>${escH(r.moveIn)}</span>
  </div>
</div>

<!-- Keep location below -->
<div class="rm-info-row">
  <span class="material-symbols-outlined">location_on</span>
  <span>${escH(r.district)} – ${escH(r.preferredAreas[0])}${r.preferredAreas.length > 1 ? ', +' + (r.preferredAreas.length - 1) : ''}</span>
</div>
        


        ${descHTML}
        <div class="rm-lifestyle-tags">${lifestyleTagsHTML}</div>
        <div class="rm-card-actions" onclick="event.stopPropagation()">
          ${connectBtn}
          <button class="rm-btn-view rm-view-btn" data-id="${r.id}" title="View full profile">
            <span class="material-symbols-outlined">open_in_new</span>
          </button>
          <button class="rm-btn-report rm-report-btn" data-id="${r.id}" title="Report">
            <span class="material-symbols-outlined">flag</span>
          </button>
        </div>
      </div>
    </div>`;
  }

  //  CARD EVENTS 
  function bindCardEvents() {
    const grid = document.getElementById('rmCardsGrid');
    if (!grid) return;

    // Card click → open detail 
    grid.querySelectorAll('.rm-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.rm-card-actions')) return;
        openDetailModal(parseInt(card.dataset.id));
      });
      card.addEventListener('keydown', e => { if (e.key === 'Enter') card.click(); });
    });

    // View Detail button
    grid.querySelectorAll('.rm-view-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (!window.BashaBari?.isLoggedIn()) {
          window.BashaBari?.openSignIn();
          return;
        }
        openDetailModal(parseInt(btn.dataset.id));
      });
    });

    // Connect button
    grid.querySelectorAll('.rm-connect-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        handleConnect(parseInt(btn.dataset.id), btn);
      });
    });

    // Connect (login prompt)
    grid.querySelectorAll('.rm-connect-login').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        window.BashaBari?.openSignIn();
      });
    });

    // Report button
    grid.querySelectorAll('.rm-report-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (!window.BashaBari?.isLoggedIn()) { window.BashaBari?.openSignIn(); return; }
        state.currentDetailId = parseInt(btn.dataset.id);
        openOverlay('rmReportModal');
      });
    });
  }

  function handleConnect(id, btnEl) {
    if (!window.BashaBari?.isLoggedIn()) { window.BashaBari?.openSignIn(); return; }
    if (btnEl) {
      btnEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px;">hourglass_empty</span> Sending…`;
      btnEl.disabled  = true;
    }
    const fd = new FormData();
    fd.append('receiver_id', id);
    fd.append('source', 'roommate');
    fetch('api/connections/send-request.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' },
      body: fd
    })
      .then(r => r.json().then(data => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || !data.success) throw new Error(data.error || 'Could not send request.');
        const roommate = state.allRoommates.find(r => Number(r.id) === Number(id));
        if (data.status === 'canceled') {
          state.connectSent = state.connectSent.filter(x => Number(x) !== Number(id));
          localStorage.setItem('bb_rm_connects', JSON.stringify(state.connectSent));
          if (btnEl) { btnEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px;">person_add</span> Connect`; btnEl.classList.remove('sent'); btnEl.disabled = false; }
          window.BashaBari?.showToast(`Connection request canceled for ${roommate?.name?.split(' ')[0] || 'user'}.`, 'info');
          return;
        }
        if (data.status === 'accepted') {
          if (!state.connectedUsers.includes(Number(id))) state.connectedUsers.push(Number(id));
          if (btnEl) { btnEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px;">handshake</span> Connected`; btnEl.classList.add('sent'); btnEl.disabled = true; }
          return;
        }
        if (!state.connectSent.includes(Number(id))) state.connectSent.push(Number(id));
        localStorage.setItem('bb_rm_connects', JSON.stringify(state.connectSent));
        if (btnEl) {
          btnEl.innerHTML  = `<span class="material-symbols-outlined" style="font-size:16px;">check_circle</span> Request Sent`;
          btnEl.classList.add('sent');
          btnEl.disabled   = false;
        }
        window.BashaBari?.showToast(`Connection request sent to ${roommate?.name?.split(' ')[0] || 'user'}! 🤝`, 'success');
      })
      .catch(err => {
        if (btnEl) { btnEl.innerHTML = 'Connect'; btnEl.disabled = false; }
        window.BashaBari?.showToast(err.message || 'Could not send request.', 'error');
      });
  }

  // DETAIL MODAL
  function openDetailModal(id) {
    if (!window.BashaBari?.isLoggedIn()) {
      window.BashaBari?.openSignIn();
      return;
    }
    const r = state.allRoommates.find(x => x.id === id);
    if (!r) return;
    state.currentDetailId = id;
    populateDetail(r);
    openOverlay('rmDetailModal');
  }

  function populateDetail(r) {
    const body  = document.getElementById('rmDetailBody');
    if (!body) return;

    const color  = AVATAR_COLORS[r.colorIndex % AVATAR_COLORS.length];
    const isSent = state.connectSent.includes(Number(r.id));
    const isConnected = state.connectedUsers.includes(Number(r.id));

    const tagsHTML = r.lifestyle.map(t => {
      const tag = LIFESTYLE_TAGS.find(x => x.key === t);
      return `<span class="rm-detail-tag">${tag ? tag.emoji : ''}${escH(t)}</span>`;
    }).join('');

    const areasHTML = r.preferredAreas.map(a =>
      `<span class="rm-detail-tag">${escH(a)}</span>`
    ).join('');

    const connectBtnHTML = isSent
      ? `<button class="rm-detail-btn-connect sent" disabled>
           <span class="material-symbols-outlined" style="font-size:18px;">check_circle</span>
           Request Already Sent
         </button>`
      : `<button class="rm-detail-btn-connect" id="rmDetailConnectBtn" data-id="${r.id}">
           <span class="material-symbols-outlined" style="font-size:18px;">person_add</span>
           Send Connection Request
         </button>`;

    body.innerHTML = `
      <!-- Header -->
      <div class="rm-detail-header">
        <div class="rm-detail-avatar" style="background:${color};">${escH(r.initials)}</div>
        <div class="rm-detail-header-info">
          <div class="rm-detail-name">${escH(r.name)}</div>
          <div class="rm-detail-univ">${escH(r.department)} @ ${escH(r.university)}</div>
          <div class="rm-detail-badges">
            <span class="rm-detail-badge rm-detail-badge-gender">${escH(r.gender)}</span>
            
            ${r.verified ? '<span class="rm-detail-badge" style="background:rgba(147,249,147,0.2);color:#93f993;border:1px solid rgba(147,249,147,0.3);">✓ Verified</span>' : ''}
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="rm-detail-content">

        <!-- Budget & Move-in -->
        <div class="rm-detail-section">
          <div class="rm-detail-section-title">
            <span class="material-symbols-outlined">payments</span>
            Budget & Timing
          </div>
          <div class="rm-detail-info-row">
            <span class="rm-detail-info-label">Budget</span>
            <span class="rm-detail-info-value">৳${r.budgetMin.toLocaleString()} – ৳${r.budgetMax.toLocaleString()}</span>
          </div>
          <div class="rm-detail-info-row">
            <span class="rm-detail-info-label">Move-in</span>
            <span class="rm-detail-info-value">${escH(r.moveIn)}</span>
          </div>
          <div class="rm-detail-info-row">
            <span class="rm-detail-info-label">Posted</span>
            <span class="rm-detail-info-value">${escH(r.postedAgo)}</span>
          </div>
        </div>

        <!-- Location -->
        <div class="rm-detail-section">
          <div class="rm-detail-section-title">
            <span class="material-symbols-outlined">location_on</span>
            Location Preference
          </div>
          <div class="rm-detail-info-row">
            <span class="rm-detail-info-label">District</span>
            <span class="rm-detail-info-value">${escH(r.district)}</span>
          </div>
          <div style="margin-top:8px;">
            <div class="rm-detail-info-label" style="margin-bottom:8px;font-size:11px;">Preferred Areas</div>
            <div class="rm-detail-tags-wrap">${areasHTML}</div>
          </div>
        </div>


        <!-- About -->
        <div class="rm-detail-section full-width">
          <div class="rm-detail-section-title">
            <span class="material-symbols-outlined">person</span>
            About ${escH(r.name.split(' ')[0])}
          </div>
          <p class="rm-detail-desc">${escH(r.description)}</p>
        </div>

        <!-- Lifestyle Tags -->
        <div class="rm-detail-section full-width">
          <div class="rm-detail-section-title">
            <span class="material-symbols-outlined">label</span>
            Lifestyle & Personality
          </div>
          <div class="rm-detail-tags-wrap">${tagsHTML}</div>
        </div>


      </div>

      <!-- Actions -->
      <div class="rm-detail-actions">
        ${connectBtnHTML}
        <button class="rm-detail-btn-report" id="rmDetailReportBtn" data-id="${r.id}">
          <span class="material-symbols-outlined" style="font-size:16px;">flag</span>
          Report
        </button>
      </div>`;

    // Bind connect from detail
    body.querySelector('#rmDetailConnectBtn')?.addEventListener('click', function() {
      handleConnect(r.id, this);
    });

    // Bind report from detail
    body.querySelector('#rmDetailReportBtn')?.addEventListener('click', () => {
      closeOverlay('rmDetailModal');
      setTimeout(() => openOverlay('rmReportModal'), 300);
    });
  }

  // TOOLBAR 
  function bindToolbarEvents() {
    document.getElementById('rmSortSelect')?.addEventListener('change', e => {
      state.sort = e.target.value;
      applyFiltersAndRender();
    });

    document.getElementById('rmGridViewBtn')?.addEventListener('click', () => setView('grid'));
    document.getElementById('rmListViewBtn')?.addEventListener('click', () => setView('list'));

    document.getElementById('rmLoadMoreBtn')?.addEventListener('click', () => {
      state.displayedCount += CARDS_PER_PAGE;
      renderCards();
    });

    document.getElementById('rmListProfileBtn')?.addEventListener('click', () => {
      if (!window.BashaBari?.isLoggedIn()) {
        window.BashaBari?.openSignIn();
        return;
      }
      openOverlay('rmListProfileModal');
    });
  }

  function setView(mode) {
    state.viewMode = mode;
    const grid    = document.getElementById('rmCardsGrid');
    const gridBtn = document.getElementById('rmGridViewBtn');
    const listBtn = document.getElementById('rmListViewBtn');
    grid?.classList.toggle('list-view', mode === 'list');
    gridBtn?.classList.toggle('active', mode === 'grid');
    listBtn?.classList.toggle('active', mode === 'list');
  }

  // MODAL EVENTS 
  function bindModalEvents() {
    // Detail modal close
    document.getElementById('rmDetailClose')?.addEventListener('click', () => closeOverlay('rmDetailModal'));
    document.getElementById('rmDetailModal')?.addEventListener('click', e => {
      if (e.target.id === 'rmDetailModal') closeOverlay('rmDetailModal');
    });

    // List Profile modal
    document.getElementById('rmListProfileClose')?.addEventListener('click', () => closeOverlay('rmListProfileModal'));
    document.getElementById('rmListProfileModal')?.addEventListener('click', e => {
      if (e.target.id === 'rmListProfileModal') closeOverlay('rmListProfileModal');
    });

    // List Profile form
    document.getElementById('rmListProfileForm')?.addEventListener('submit', handleListProfile);

    // Report modal
    document.getElementById('rmReportClose')?.addEventListener('click', () => closeOverlay('rmReportModal'));
    document.getElementById('rmReportModal')?.addEventListener('click', e => {
      if (e.target.id === 'rmReportModal') closeOverlay('rmReportModal');
    });

    document.getElementById('rmReportForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('rm_report_title')?.value.trim();
      const cat   = document.getElementById('rm_report_category')?.value;
      const desc  = document.getElementById('rm_report_desc')?.value.trim();
      let valid   = true;

      if (!title) { showFieldErr('rm_report_title',    'Please enter a title'); valid = false; }
      if (!cat)   { showFieldErr('rm_report_category', 'Please select a category'); valid = false; }
      if (!desc)  { showFieldErr('rm_report_desc',     'Please describe the issue'); valid = false; }
      if (!valid) return;

      const btn = e.target.querySelector('.modal-submit-btn');
      if (btn) { btn.classList.add('loading'); btn.disabled = true; }

      setTimeout(() => {
        if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
        closeOverlay('rmReportModal');
        e.target.reset();
        window.BashaBari?.showToast('Report submitted. Thank you!', 'success');
      }, 1000);
    });

    // Live clear errors
    ['rm_report_title','rm_report_category','rm_report_desc'].forEach(id => {
      document.getElementById(id)?.addEventListener('input',  () => clearFieldErr(id));
      document.getElementById(id)?.addEventListener('change', () => clearFieldErr(id));
    });

    ['lp_budget_min','lp_budget_max','lp_district','lp_move_month','lp_move_year','lp_description'].forEach(id => {
      document.getElementById(id)?.addEventListener('input',  () => clearFieldErr(id));
      document.getElementById(id)?.addEventListener('change', () => clearFieldErr(id));
    });
  }

  function handleListProfile(e) {
    e.preventDefault();
    if (!window.BashaBari?.isLoggedIn()) { window.BashaBari?.openSignIn(); return; }

    const budgetMin = parseInt(document.getElementById('lp_budget_min')?.value) || 0;
    const budgetMax = parseInt(document.getElementById('lp_budget_max')?.value) || 0;
    const district  = document.getElementById('lp_district')?.value;
    const month     = document.getElementById('lp_move_month')?.value;
    const year      = document.getElementById('lp_move_year')?.value;
    const desc      = document.getElementById('lp_description')?.value.trim();
    const lifestyle = getChecked('.lp-ls-chip .rm-ls-input');

    let valid = true;
    if (!budgetMin || budgetMin < 1000) { showFieldErr('lp_budget_min', 'Enter a valid minimum budget'); valid = false; }
    if (!budgetMax || budgetMax <= budgetMin) { showFieldErr('lp_budget_max', 'Max budget must be greater than min'); valid = false; }
    if (!district)  { showFieldErr('lp_district',    'Please select a district'); valid = false; }
    if (!month)     { showFieldErr('lp_move_month',  'Please select move-in month'); valid = false; }
    if (!year)      { showFieldErr('lp_move_year',   'Please select move-in year'); valid = false; }
    if (!desc)      { showFieldErr('lp_description', 'Please write something about yourself'); valid = false; }
    if (!valid) return;

    const btn = document.getElementById('lpSubmitBtn');
    if (btn) { btn.classList.add('loading'); btn.disabled = true; }
    const fd = new FormData();
    fd.append('budget_min', budgetMin); fd.append('budget_max', budgetMax);
    fd.append('district', district); fd.append('move_in_month', month); fd.append('move_in_year', year);
    fd.append('description', desc); fd.append('publish', '1'); lifestyle.forEach(t => fd.append('tags[]', t));

    fetch('api/roommates/save-profile.php', { method:'POST', headers:{ 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || !data.success) throw new Error(data.error || 'Could not save profile.');
      })
      .then(() => {
        if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
        closeOverlay('rmListProfileModal');
        e.target.reset();
        document.querySelectorAll('.lp-ls-chip').forEach(c => c.classList.remove('active'));
        loadBackendRoommates();
        window.BashaBari?.showToast('Your roommate profile is now live! 🏠', 'success');
      })
      .catch(err => {
        if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
        window.BashaBari?.showToast(err.message || 'Could not save profile.', 'error');
      });
  }

  // RESET
  function resetAllFilters() {
    state.filters   = { search:'', universities:[], gender:'', budgetMin:0, budgetMax:999999, district:'', areas:[], lifestyle:[] };
    state.heroPills = [];

    document.getElementById('heroRmSearch').value    = '';
    document.getElementById('rmSidebarSearch').value = '';
    document.getElementById('clearRmSearch').style.display = 'none';
    document.getElementById('rmDistrictSelect').value = '';

    document.querySelectorAll('.rm-uni-cb, .rm-area-cb, .rm-ls-input').forEach(cb => cb.checked = false);
    document.querySelectorAll('.rm-lifestyle-chip, .lp-ls-chip').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.rm-gender-btn').forEach(b => b.classList.toggle('active', b.dataset.gender === ''));
    document.querySelectorAll('.rm-budget-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
    document.querySelectorAll('.rm-pill').forEach(p => p.classList.remove('active'));

    const areaList = document.getElementById('rmAreaList');
    if (areaList) areaList.innerHTML = '<div class="filter-placeholder-text">Select a district first</div>';

    applyFiltersAndRender();
    window.BashaBari?.showToast('All filters cleared', 'info');
  }

  // UI HELPERS 
  function updateResultsCount(count) {
    const el    = document.getElementById('rmResultsCount');
    const label = document.getElementById('rmResultsQueryLabel');
    if (el)    el.textContent    = count;
    if (label) label.textContent = state.filters.search ? `for "${state.filters.search}"` : '';
  }

  function updateActiveFilterTags() {
    const wrap  = document.getElementById('activeRmFiltersWrap');
    const tags  = document.getElementById('activeRmFilterTags');
    if (!wrap || !tags) return;

    const f      = state.filters;
    const items  = [];

    if (f.search)          items.push({ label:`"${f.search}"`, clear:() => { f.search=''; document.getElementById('heroRmSearch').value=''; document.getElementById('rmSidebarSearch').value=''; applyFiltersAndRender(); }});
    if (f.gender)          items.push({ label: f.gender, clear:() => { f.gender=''; document.querySelectorAll('.rm-gender-btn').forEach(b => b.classList.toggle('active', b.dataset.gender==='')); applyFiltersAndRender(); }});
    if (f.district)        items.push({ label: f.district, clear:() => { f.district=''; document.getElementById('rmDistrictSelect').value=''; applyFiltersAndRender(); }});
    if (f.lifestyle.length) items.push({ label:`${f.lifestyle.length} lifestyle tag${f.lifestyle.length>1?'s':''}`, clear:() => { f.lifestyle=[]; state.heroPills=[]; document.querySelectorAll('.rm-ls-input,.rm-ls-chip input').forEach(c => c.checked=false); document.querySelectorAll('.rm-lifestyle-chip,.rm-pill').forEach(c => c.classList.remove('active')); applyFiltersAndRender(); }});
    if (f.budgetMin > 0 || f.budgetMax < 999999) items.push({ label:`৳${f.budgetMin.toLocaleString()}–৳${f.budgetMax.toLocaleString()}`, clear:() => { f.budgetMin=0; f.budgetMax=999999; document.querySelectorAll('.rm-budget-btn').forEach((b,i) => b.classList.toggle('active',i===0)); applyFiltersAndRender(); }});

    if (items.length) {
      wrap.style.display = 'block';
      tags.innerHTML     = items.map((item, i) => `
        <div class="active-filter-tag" data-idx="${i}">
          ${escH(item.label.length > 22 ? item.label.slice(0,22)+'…' : item.label)}
          <span class="material-symbols-outlined">close</span>
        </div>`).join('');
      tags.querySelectorAll('.active-filter-tag').forEach((el, i) => {
        el.addEventListener('click', () => items[i].clear());
      });
    } else {
      wrap.style.display = 'none';
      tags.innerHTML     = '';
    }
  }

  function updateFilterBadge() {
    const badge = document.getElementById('rmFilterCountBadge');
    if (!badge) return;
    const f     = state.filters;
    let count   = 0;
    if (f.search)            count++;
    if (f.gender)            count++;
    if (f.district)          count++;
    if (f.universities.length) count += f.universities.length;
    if (f.areas.length)      count += f.areas.length;
    if (f.lifestyle.length)  count += f.lifestyle.length;
    if (f.budgetMin > 0 || f.budgetMax < 999999) count++;

    badge.textContent   = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  // SIDEBAR CONTROLS 
  function toggleSidebar() {
    const sidebar = document.getElementById('rmSidebar');
    const icon    = document.getElementById('rmSidebarToggleIcon');
    if (!sidebar) return;
    const col = sidebar.classList.toggle('collapsed');
    if (icon) icon.textContent = col ? 'chevron_right' : 'chevron_left';
  }

  function openMobileSidebar() {
    document.getElementById('rmSidebar')?.classList.add('mobile-open');
    document.getElementById('sidebarOverlay')?.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeMobileSidebar() {
    document.getElementById('rmSidebar')?.classList.remove('mobile-open');
    document.getElementById('sidebarOverlay')?.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  //  SCROLL REVEAL
  function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.style.animationPlayState = 'running'; });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  }

  // OVERLAY HELPERS
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

  //  FIELD ERROR HELPERS 
  function showFieldErr(id, msg) {
    const el  = document.getElementById(id);
    const err = document.getElementById(id + '_err');
    el?.classList.add('has-error');
    if (err) {
      err.classList.add('visible');
      const span = err.querySelector('span:last-child');
      if (span) span.textContent = msg;
    }
  }

  function clearFieldErr(id) {
    document.getElementById(id)?.classList.remove('has-error');
    document.getElementById(id + '_err')?.classList.remove('visible');
  }

  // UTILS 
  function getInitials(name) {
    return (name || '').trim().split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  }

  function escH(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

})();