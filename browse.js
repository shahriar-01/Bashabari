(function () {
  'use strict';

  // DATA 
  const DISTRICTS_AREAS = {
    Dhaka: ['Mirpur','Uttara','Badda','Dhanmondi','Mohammadpur','Gulshan','Banani','Rayer Bazar','Shyamoli','Kalabagan','Bashundhara','Nikunjo','Khilkhet','Baridhara','Eskaton','Panthapath','Farmgate','Tejgaon','Nilkhet'],
    Chittagong: ['Agrabad','Nasirabad','Halishahar','Panchlaish','GEC Circle','Khulshi','Muradpur','OR Nizam Road','Chawkbazar','Bakalia'],
    Sylhet: ['Zindabazar','Ambarkhana','Subidbazar','Tilagarh','Shahjalal Upashahar','Mirer Maidan','Bondor Bazar'],
    Rajshahi: ['Shaheb Bazar','Uposhohor','Kazla','Motihar','Talaimari'],
    Khulna: ['Boyra','Sonadanga','Khalishpur','Daulatpur','Nirala'],
    Barishal: ['Nathullabad','Sadar Road','Rupatali','Chand Miari'],
    Mymensingh: ['Ganginarpar','Churkhai','Maskanda'],
    Gazipur: ['Tongi','Joydebpur','Bhawal','Pubail'],
    Narayanganj: ['Siddhirganj','Fatullah','Sonargaon'],
  };

  const UNIVERSITIES = [
    'North South University (NSU)',
    'BRAC University',
    'American International University-Bangladesh (AIUB)',
    'University of Dhaka (DU)',
    'Bangladesh University of Engineering & Technology (BUET)',
    'Islamic University of Technology (IUT)',
    'Daffodil International University (DIU)',
    'University of Liberal Arts Bangladesh (ULAB)',
    'United International University (UIU)',
    'East West University (EWU)',
    'University of Asia Pacific (UAP)',
    'Shahjalal University of Science and Technology (SUST)',
    'Chittagong University of Engineering & Technology (CUET)',
    'Military Institute of Science and Technology (MIST)',
    'Jahangirnagar University (JU)',
    'Independent University Bangladesh (IUB)',
  ];

  const PROPERTY_TYPES = ['Flat','Sublet','Single Room','Shared Flat','Mess','Bachelor Flat'];

  const AMENITIES_LIST = [
    { key:'WiFi',          icon:'wifi',           label:'WiFi' },
    { key:'AC',            icon:'ac_unit',        label:'AC' },
    { key:'Attached Bath', icon:'shower',         label:'Bathroom' },
    { key:'Parking',       icon:'local_parking',  label:'Parking' },
    { key:'Security',      icon:'security',       label:'Security' },
    { key:'Lift',          icon:'elevator',       label:'Lift' },
    { key:'Gas',           icon:'gas_meter',      label:'Gas' },
    { key:'Generator',     icon:'bolt',           label:'Generator' },
    { key:'Balcony',       icon:'balcony',        label:'Balcony' },
    { key:'Rooftop',       icon:'roofing',        label:'Rooftop' },
    { key:'Laundry',       icon:'local_laundry_service', label:'Laundry' },
    { key:'Mess Food',     icon:'restaurant',     label:'Mess Food' },
    { key:'Female Only',   icon:'female',         label:'Female Only' },
    { key:'Pet Friendly',  icon:'pets',           label:'Pet Friendly' },
  ];

  const SAMPLE_LISTINGS = [
    {
      id: 10, title: 'Flat Available Near BRACU',
      district: 'Dhaka', area: 'Badda', university: 'BRACU',
      price: 15000, type: 'Flat', distance: 0.8, distanceUnit: 'km walking distance',
      availableFrom: 'August 2026',
      amenities: ['WiFi','Security','Parking','Lift','AC'],
      description: 'Fully furnished 2-bedroom flat with all modern amenities. High-speed WiFi, 24/7 security, underground parking. Just 0.8km from BRAC University main campus. Ideal for 2-3 students sharing.',
      images: [
         'assets/card 1.2.jpg'
      ],
      verified: true, rating: 4.7, postedAgo: '5h ago',
      poster: { name: 'Salma Begum', initials: 'SB', university: 'BRAC University', phone: '+8801887654321' },
      phoneHidden: false, status: 'published',
      comments: []
    },
    {
      id: 9, title: 'Shared Flat Near UIU',
      district: 'Dhaka', area: 'Badda', university: 'UIU',
      price: 6500, type: 'Shared Flat', distance: 0.3, distanceUnit: 'km walking distance',
      availableFrom: 'September 2026',
      amenities: ['WiFi','Security','Parking','Generator'],
      description: 'Spacious shared flat suitable for 3 students. Each person gets their own room with shared living space and kitchen. Generator backup for load-shedding. Very close to UIU campus.',
      images: [
       'assets/card 1.3.jpg'
      ],
      verified: true, rating: 4.5, postedAgo: '1d ago',
      poster: { name: 'Arif Hasan', initials: 'AH', university: 'United International University', phone: '+8801611223344' },
      phoneHidden: false, status: 'published',
      comments: [
        { user:'Tanvir K.', initials:'TK', text:'Great place, housemates are friendly. Highly recommend!', time:'2 days ago' },
        { user:'Sadia R.', initials:'SR', text:'I lived here for 6 months. No issues, landlord is very responsive.', time:'5 days ago' },
      ]
    },
    {
      id: 8, title: 'Sublet Room - Female Only',
      district: 'Dhaka', area: 'Dhanmondi', university: 'DU',
      price: 7000, type: 'Sublet', distance: 1.2, distanceUnit: 'km Bus distance',
      availableFrom: 'June 2026',
      amenities: ['WiFi','Female Only','AC','Attached Bath','Laundry'],
      description: 'Safe and comfortable sublet room in a female-only apartment. AC, attached bathroom, washing machine access. Close to Dhaka University. CCTV security throughout the building. Preferred for DU girl students.',
      images: [
         'assets/card 1.6.jpg'
      ],
      verified: true, rating: 4.8, postedAgo: '3h ago',
      poster: { name: 'Nusrat Jahan', initials: 'NJ', university: 'University of Dhaka', phone: '+8801799887766' },
      phoneHidden: true, status: 'published',
      comments: []
    },
    {
      id: 5, title: 'Mess Accommodation - Near BUET',
      district: 'Dhaka', area: 'Eskaton', university: 'BUET',
      price: 4500, type: 'Mess', distance: 0.7, distanceUnit: 'km bus distance',
      availableFrom: 'July 2026',
      amenities: ['Mess Food','WiFi','Security','Generator','Gas'],
      description: 'Traditional student mess with meals included. 3 meals per day (BD food). Common study room available 24/7. Ideal for BUET students. Fully managed by experienced staff.',
      images: [
         'assets/card 1.7.jpg'
      ],
      verified: false, rating: 4.2, postedAgo: '2d ago',
      poster: { name: 'Mostofa Uncle', initials: 'MU', university: 'BUET Area', phone: '+8801555443322' },
      phoneHidden: false, status: 'published',
      comments: []
    },
    {
      id: 6, title: 'Bachelor Flat - Mirpur DOHS',
      district: 'Dhaka', area: 'Mirpur', university: 'MIST',
      price: 5000, type: 'Bachelor Flat', distance: 1.5, distanceUnit: 'km Bus distance',
      availableFrom: 'August 2026',
      amenities: ['Parking','Security','Lift','Balcony','Gas','Generator'],
      description: 'Spacious bachelor flat with 3 bedrooms. Perfect for 3 students. Has a large balcony, generator backup, and lift access. Peaceful, gated community. Preferred for MIST/DIU students.',
      images: [
           'assets/card 1.8.jpg'
      ],
      verified: true, rating: 4.6, postedAgo: '6h ago',
      poster: { name: 'Zakir Talukder', initials: 'ZT', university: 'MIST Area', phone: '+8801966554433' },
      phoneHidden: false, status: 'published',
      comments: []
    },
    {
      id: 7, title: 'Studio Room - Near AIUB',
      district: 'Dhaka', area: 'Bashundhara R/A', university: 'AIUB',
      price: 8000, type: 'Single Room', distance: 0.4, distanceUnit: 'km walking distance',
      availableFrom: 'July 2026',
      amenities: ['WiFi','AC','Attached Bath','Security','Rooftop'],
      description: 'Modern studio-style single room near AIUB. AC, attached bathroom, rooftop access. 5-minute walk to AIUB campus. Fresh renovation with modern fixtures.',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDimvjys-B1ym2YDFB665n-Q_cY4bQVbVhlZm1YqiGMWT-iRMCRAuSHOiB7TFsaS2e1q__CNIWlWWjLJ8tnskGoPQpdZ3rO283l6a6lMGwPjh2uzbVhejXit2cxB2NbDeVffip1-Tw7hOCnpWIRCzmY9rlfaD8cD4h5j0zO_pb_h1f6-Sgbfvlz1MLYwu_SPTP2CM6RF8B0dxZIAAQ8N2a5V21x_FA2Tl4gQSY31aF9cBz8jcRsK82TZkVybIOv6ycDbhkXhu6s9FU',
      ],
      verified: true, rating: 4.7, postedAgo: '12h ago',
      poster: { name: 'Jannatul F.', initials: 'JF', university: 'AIUB', phone: '+8801833221100' },
      phoneHidden: false, status: 'published',
      comments: []
    },
    {
      id: 3, title: 'Affordable Mess Near IUT',
      district: 'Gazipur', area: 'Joydebpur', university: 'Islamic University of Technology (IUT)',
      price: 3500, type: 'Mess', distance: 0.6, distanceUnit: 'km walking',
      availableFrom: 'June 2026',
      amenities: ['Mess Food','Gas','Security','WiFi'],
      description: 'Budget-friendly mess with meals included. Ideal for IUT students. Calm and study-friendly environment. All utilities included in rent.',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBjYPXuxzIyvkFuMOMnmFtjXSPvj7DcLXcwo3-EarM1-hPCNvh-yj20Sw9KclIBIqkvQPVeDlfG3HglGTHBy_Ch37rJ2LlCblgpTigrkW0bdLQMkJw0iZ6n4GkOSDVf90DVkXb8U-8q94aOrlBJhuRH7bRxuLyzWX1rBSAs2cqFD7PZWyAeUFql7sUsRM_L-UVNPbh_huKACXQu2GP2Ud0rt1KRgf0-dj4yBuAf5zCQzF_UDG3PIccZEwcagMIg15umM0m95HsiCLk',
      ],
      verified: false, rating: 4.0, postedAgo: '4d ago',
      poster: { name: 'Habib Ullah', initials: 'HU', university: 'IUT Area', phone: '+8801744332211' },
      phoneHidden: false, status: 'published',
      comments: []
    },
    {
      id: 4, title: 'Luxury Flat - Gulshan 2',
      district: 'Dhaka', area: 'Gulshan', university: 'NSU',
      price: 28000, type: 'Flat', distance: 0.9, distanceUnit: 'km by car',
      availableFrom: 'October 2026',
      amenities: ['WiFi','AC','Parking','Lift','Security','Balcony','Laundry'],
      description: 'Premium furnished flat in Gulshan 2. 3 bedrooms, 2 bathrooms, modern kitchen. Elevator access, underground parking. Perfect for students who want a premium lifestyle.',
      images: [
        'assets/card 2.1.jpg'
      ],
      verified: true, rating: 4.9, postedAgo: '1h ago',
      poster: { name: 'Rezaul K.', initials: 'RK', university: 'NSU Area', phone: '+8801622334455' },
      phoneHidden: false, status: 'published',
      comments: []
    },
    {
      id: 2, title: 'Sublet - Rayer Bazar',
      district: 'Dhaka', area: 'Rayer Bazar', university: 'EWU',
      price: 5500, type: 'Sublet', distance: 1.0, distanceUnit: 'km Bus distance',
      availableFrom: 'August 2026',
      amenities: ['WiFi','Gas','Balcony','Security'],
      description: 'Comfortable sublet room in a quiet residential area. Well-connected to EWU and public transport. Shared kitchen and bathroom. Friendly housemates.',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDimvjys-B1ym2YDFB665n-Q_cY4bQVbVhlZm1YqiGMWT-iRMCRAuSHOiB7TFsaS2e1q__CNIWlWWjLJ8tnskGoPQpdZ3rO283l6a6lMGwPjh2uzbVhejXit2cxB2NbDeVffip1-Tw7hOCnpWIRCzmY9rlfaD8cD4h5j0zO_pb_h1f6-Sgbfvlz1MLYwu_SPTP2CM6RF8B0dxZIAAQ8N2a5V21x_FA2Tl4gQSY31aF9cBz8jcRsK82TZkVybIOv6ycDbhkXhu6s9FU',
      ],
      verified: false, rating: 4.3, postedAgo: '8h ago',
      poster: { name: 'Morshed Ali', initials: 'MA', university: 'East West University', phone: '+8801511223344' },
      phoneHidden: false, status: 'published',
      comments: []
    },
    {
      id: 11, title: 'SUST Area Shared Flat',
      district: 'Sylhet', area: 'Tilagarh', university: 'SUST',
      price: 5000, type: 'Shared Flat', distance: 0.9, distanceUnit: 'km walking distance',
      availableFrom: 'September 2026',
      amenities: ['WiFi','Gas','Generator','Security'],
      description: 'Affordable shared flat near SUST. Clean rooms with good ventilation. Shared kitchen with gas stove. Peaceful area. Perfect for SUST students.',
      images: [
        'assets/card 1.5.jpg'
      ],
      verified: true, rating: 4.4, postedAgo: '3d ago',
      poster: { name: 'Imran Hossain', initials: 'IH', university: 'SUST', phone: '+8801877665544' },
      phoneHidden: false, status: 'published',
      comments: []
    },
    {
      id: 1, title: 'Mess Available - Dhabian Only',
      district: 'Dhaka', area: 'Nilkhet', university: 'DU',
      price: 6000, type: 'Single Room', distance: 0.2, distanceUnit: 'km walking distance',
      availableFrom: 'June 2026',
      amenities: ['WiFi','Gas','Security','Balcony'],
      description: 'Single room right next to Dhaka University. Literally a 2-minute walk to campus. Furnished with study table and bed. Reliable internet connection.',
      images: [
        'assets/card 1.4.jpg'
      ],
      verified: true, rating: 4.6, postedAgo: '5d ago',
      poster: { name: 'Rafiqul Islam', initials: 'RI', university: 'University of Dhaka', phone: '+8801944556677' },
      phoneHidden: false, status: 'published',
      comments: []
    },
      {
      id: 12, title: 'Single Room Near NSU',
      district: 'Dhaka', area: 'Bashundhara', university: 'NSU',
      price: 9500, type: 'Single Room', distance: 0.5, distanceUnit: 'km walking distance',
      availableFrom: 'July 2026',
      amenities: ['WiFi','Attached Bath','Balcony'],
      description: 'A cozy single room with attached bathroom in a secure building. Perfect for NSU students. The room is well-ventilated with natural light. Common kitchen access with gas connection. 10 minutes walking to NSU main gate.',
      images: [
        'assets/card 1.1.jpg'
      ],
      verified: true, rating: 4.9, postedAgo: '2h ago',
      poster: { name: 'Karim Hossain', initials: 'KH', university: 'North South University', phone: '+8801712345678' },
      phoneHidden: false, status: 'published',
      comments: [
        { user:'Rahim A.', initials:'RA', text:'Visited last week, very clean and the landlord is cooperative!', time:'3 days ago' },
      ]
    },
  ];

  // ─── STATE ─────
  const CARDS_PER_PAGE = 9;
  let state = {
    allListings: [],
    filteredListings: [],
    displayedCount: CARDS_PER_PAGE,
    filters: {
      search: '',
      district: '',
      areas: [],
      universities: [],
      types: [],
      distance: '',
      rentMin: 1000,
      rentMax: 30000,
      amenities: [],
      availableMonth: '',
      availableYear: '',
    },
    sort: 'newest',
    viewMode: 'grid',
    currentDetailId: null,
    galleryIndex: 0,
    initialUrlFiltersApplied: false,
    favorites: [],
  };

  // INIT
  document.addEventListener('DOMContentLoaded', () => {
    buildSidebarFilters();
    bindSidebarEvents();
    bindToolbarEvents();
    bindModalEvents();
    showSkeletons();
    loadBackendListings();
    initScrollReveal();
  });


  function inferDistrictForArea(area) {
    if (!area) return '';
    for (const [district, areas] of Object.entries(DISTRICTS_AREAS)) {
      if (areas.some(a => a.toLowerCase() === area.toLowerCase())) return district;
    }
    const fromData = state.allListings.find(l => (l.area || '').toLowerCase() === area.toLowerCase());
    return fromData?.district || '';
  }

  function applyInitialUrlFilters() {
    if (state.initialUrlFiltersApplied) return;
    state.initialUrlFiltersApplied = true;
    const params = new URLSearchParams(window.location.search);
    const search = (params.get('search') || params.get('q') || '').trim();
    const area = (params.get('area') || '').trim();
    const district = (params.get('district') || inferDistrictForArea(area) || '').trim();

    if (search) state.filters.search = search;
    if (district) state.filters.district = district;
    if (area) state.filters.areas = [area];

    const heroSearch = document.getElementById('heroSearchInput');
    const sidebarSearch = document.getElementById('sidebarSearch');
    const clearSearch = document.getElementById('clearSidebarSearch');
    if (heroSearch) heroSearch.value = search;
    if (sidebarSearch) sidebarSearch.value = search;
    if (clearSearch) clearSearch.style.display = search ? 'flex' : 'none';

    const districtSel = document.getElementById('districtSelect');
    if (districtSel && district) districtSel.value = district;
    if (district) {
      buildAreaCheckboxes(district);
      renderUniversityCheckboxes();
    }
    if (area) {
      document.querySelectorAll('.filter-area').forEach(cb => {
        cb.checked = cb.value.toLowerCase() === area.toLowerCase();
      });
    }
  }

  function loadBackendListings() {
    const params = new URLSearchParams({ limit: '50' });
    fetch('api/listings/get-listings.php?' + params.toString())
      .then(r => r.json())
      .then(data => {
        if (!data.success || !Array.isArray(data.listings)) throw new Error(data.error || 'No listings');
        state.allListings = data.listings.map(l => ({
          id: l.id,
          user_id: l.user_id,
          title: l.title,
          district: l.district || '',
          area: l.area || '',
          university: l.university || l.university_short || '',
          universityShort: l.university_short || '',
          price: Number(l.rent_price || l.price || 0),
          type: l.property_type_label || l.property_type || '',
          distance: Number(l.distance_value || 0),
          distanceUnit: `${l.distance_unit || 'walking'} distance`,
          availableFrom: l.available_from || '',
          amenities: l.amenities || [],
          description: l.description || '',
          images: l.images || [l.image_path || 'uploads/listings/placeholder.jpg'],
          verified: !!Number(l.is_verified || l.verified),
          rating: 4.5,
          postedAgo: 'Posted ' + formatPostedAgo(l.created_at || l.updated_at, l.id),
          poster: { name: l.owner_name || 'Listing Owner', initials: getInitials(l.owner_name || 'LO'), phone: '' },
          phoneHidden: !!Number(l.phone_hidden),
          status: l.status || 'published',
          comments: []
        }));
        state.filteredListings = [...state.allListings];
        buildSidebarFilters();
        applyInitialUrlFilters();
        if (window.BashaBari?.isLoggedIn()) {
          fetch('api/favorites/get-favorites.php')
            .then(r => r.ok ? r.json() : null)
            .then(f => { if (f?.success) { state.favorites = (f.listings || []).map(x => x.id); localStorage.setItem('bb_favorites', JSON.stringify(state.favorites)); } })
            .finally(() => applyFiltersAndRender());
        } else {
          state.favorites = [];
          localStorage.removeItem('bb_favorites');
          applyFiltersAndRender();
        }
      })
      .catch(() => { state.allListings = []; state.filteredListings = []; applyFiltersAndRender(); });
  }

  //  BUILD SIDEBAR 
  function buildSidebarFilters() {
    renderUniversityCheckboxes();

    // Property type checkboxes
    const propList = document.getElementById('propTypeCheckboxList');
    if (propList) {
      propList.innerHTML = PROPERTY_TYPES.map(t => checkboxItem(t, t, 'type')).join('');
    }

    // Amenity chips
    const amenityGrid = document.getElementById('amenityGrid');
    if (amenityGrid) {
      amenityGrid.innerHTML = AMENITIES_LIST.map(a => `
        <label class="amenity-chip" data-key="${a.key}">
          <input type="checkbox" value="${a.key}" class="amenity-checkbox"/>
          <span class="material-symbols-outlined amenity-chip-icon" style="font-size:14px;font-variation-settings:'FILL' 1;">${a.icon}</span>
          ${a.label}
        </label>`).join('');
    }

    // Setup filter section collapse
    document.querySelectorAll('.filter-section-header').forEach(header => {
      if (header.dataset.boundCollapse) return;
        header.dataset.boundCollapse = '1';
        header.addEventListener('click', () => {
        const targetId = header.dataset.target;
        const body     = document.getElementById(targetId);
        if (!body) return;
        header.classList.toggle('collapsed');
        body.classList.toggle('collapsed');
      });
    });
  }


  function renderUniversityCheckboxes() {
    const uniList = document.getElementById('universityCheckboxList');
    if (!uniList) return;
    const district = state.filters.district;
    const values = Array.from(new Set(state.allListings
      .filter(l => !district || l.district === district)
      .map(l => l.university || l.universityShort)
      .filter(Boolean)))
      .sort((a, b) => a.localeCompare(b));
    const source = district ? values : (values.length ? values : UNIVERSITIES);
    if (!source.length) { uniList.innerHTML = '<div class="filter-placeholder-text">No universities for this district</div>'; return; }
    uniList.innerHTML = source.map(u => checkboxItem(u, u, 'uni')).join('');
    state.filters.universities = state.filters.universities.filter(u => source.some(v => v === u || v.includes(u) || u.includes(v)));
  }

  function checkboxItem(label, value, group) {
    const count = state.allListings.filter(l => {
      if (group === 'uni') {
        return value === l.university || value === l.universityShort || value.includes(l.university) || l.university.includes(value) || (l.universityShort && value.includes(l.universityShort));
      }
      if (group === 'type') return l.type === value;
      return true;
    }).length;
    return `
    <label class="filter-checkbox-item">
      <input type="checkbox" value="${escH(value)}" class="filter-checkbox filter-${group}"/>
      <span class="filter-checkbox-label">${escH(label)}</span>
      <span class="filter-checkbox-count">${count}</span>
    </label>`;
  }

  // BIND SIDEBAR EVENTS 
  function bindSidebarEvents() {
    // Search inputs (both hero + sidebar)
    const heroSearch    = document.getElementById('heroSearchInput');
    const sidebarSearch = document.getElementById('sidebarSearch');
    const clearSearch   = document.getElementById('clearSidebarSearch');

    function onSearchInput(val) {
      state.filters.search = val.trim();
      if (heroSearch)    heroSearch.value    = val;
      if (sidebarSearch) sidebarSearch.value = val;
      if (clearSearch)   clearSearch.style.display = val ? 'flex' : 'none';
      applyFiltersAndRender();
    }

    if (heroSearch) {
      heroSearch.addEventListener('input', e => onSearchInput(e.target.value));
      document.getElementById('heroSearchBtn')?.addEventListener('click', () => onSearchInput(heroSearch.value));
    }
    if (sidebarSearch) {
      sidebarSearch.addEventListener('input', e => onSearchInput(e.target.value));
    }
    if (clearSearch) {
      clearSearch.addEventListener('click', () => onSearchInput(''));
    }

    // Available From Month/Year
    document.getElementById('availableMonthSelect')?.addEventListener('change', e => {
      state.filters.availableMonth = e.target.value;
      applyFiltersAndRender();
    });
    document.getElementById('availableYearSelect')?.addEventListener('change', e => {
      state.filters.availableYear = e.target.value;
      applyFiltersAndRender();
    });

    // District
    document.getElementById('districtSelect')?.addEventListener('change', e => {
      state.filters.district = e.target.value;
      state.filters.areas    = [];
      state.filters.universities = [];
      buildAreaCheckboxes(e.target.value);
      renderUniversityCheckboxes();
      applyFiltersAndRender();
    });

    // Distance
    document.getElementById('distanceSelect')?.addEventListener('change', e => {
      state.filters.distance = e.target.value;
      applyFiltersAndRender();
    });

    // Rent Range
    initDualRangeSlider();

    // Rent Presets
    document.querySelectorAll('.rent-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.rent-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const min = parseInt(btn.dataset.min);
        const max = parseInt(btn.dataset.max);
        document.getElementById('rentMin').value = min;
        document.getElementById('rentMax').value = max;
        state.filters.rentMin = min;
        state.filters.rentMax = max;
        updateRangeFill();
        updateRentDisplay();
        applyFiltersAndRender();
      });
    });

    // University checkboxes
    document.getElementById('universityCheckboxList')?.addEventListener('change', e => {
      if (!e.target.classList.contains('filter-checkbox')) return;
      state.filters.universities = getCheckedValues('.filter-uni');
      applyFiltersAndRender();
    });

    // Property type checkboxes
    document.getElementById('propTypeCheckboxList')?.addEventListener('change', e => {
      if (!e.target.classList.contains('filter-checkbox')) return;
      state.filters.types = getCheckedValues('.filter-type');
      applyFiltersAndRender();
    });

    // Area checkboxes (dynamic)
    document.getElementById('areaCheckboxList')?.addEventListener('change', () => {
      state.filters.areas = getCheckedValues('.filter-area');
      applyFiltersAndRender();
    });

    // Amenity chips
    document.getElementById('amenityGrid')?.addEventListener('change', () => {
      state.filters.amenities = getCheckedValues('.amenity-checkbox');
      // Update chip visual
      document.querySelectorAll('.amenity-chip').forEach(chip => {
        chip.classList.toggle('active', chip.querySelector('input')?.checked);
      });
      applyFiltersAndRender();
    });

    // Reset buttons
    ['resetAllFilters','resetFiltersBottom','emptyResetBtn'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', resetAllFilters);
    });

    // Sidebar toggle (collapse/expand)
    document.getElementById('sidebarToggleBtn')?.addEventListener('click', toggleSidebar);

    // Mobile sidebar
    document.getElementById('mobileFilterBtn')?.addEventListener('click', openMobileSidebar);
    document.getElementById('sidebarMobileClose')?.addEventListener('click', closeMobileSidebar);
    document.getElementById('sidebarOverlay')?.addEventListener('click', closeMobileSidebar);
  }

  function buildAreaCheckboxes(district) {
    const areaList = document.getElementById('areaCheckboxList');
    if (!areaList) return;
    const areas = DISTRICTS_AREAS[district] || [];
    if (!areas.length) {
      areaList.innerHTML = '<div class="filter-placeholder-text">No areas available</div>';
      return;
    }
    areaList.innerHTML = areas.map(a => `
      <label class="filter-checkbox-item">
        <input type="checkbox" value="${escH(a)}" class="filter-checkbox filter-area"/>
        <span class="filter-checkbox-label">${escH(a)}</span>
      </label>`).join('');
  }

  function getCheckedValues(selector) {
    return Array.from(document.querySelectorAll(`${selector}:checked`)).map(el => el.value);
  }

  // DUAL RANGE SLIDER 
  function initDualRangeSlider() {
    const minInput = document.getElementById('rentMin');
    const maxInput = document.getElementById('rentMax');
    if (!minInput || !maxInput) return;

    function onRangeChange() {
      let minVal = parseInt(minInput.value);
      let maxVal = parseInt(maxInput.value);
      const GAP = 1000;
      if (minVal >= maxVal - GAP) {
        minVal = maxVal - GAP;
        minInput.value = minVal;
      }
      state.filters.rentMin = minVal;
      state.filters.rentMax = maxVal;
      updateRangeFill();
      updateRentDisplay();
      document.querySelectorAll('.rent-preset-btn').forEach(b => b.classList.remove('active'));
      applyFiltersAndRender();
    }

    minInput.addEventListener('input', onRangeChange);
    maxInput.addEventListener('input', onRangeChange);
    updateRangeFill();
    updateRentDisplay();
  }

  function updateRangeFill() {
    const minInput = document.getElementById('rentMin');
    const maxInput = document.getElementById('rentMax');
    const fill     = document.getElementById('rangeFill');
    if (!minInput || !maxInput || !fill) return;
    const min    = 1000, max = 30000;
    const minVal = parseInt(minInput.value);
    const maxVal = parseInt(maxInput.value);
    const leftPct  = ((minVal - min) / (max - min)) * 100;
    const rightPct = 100 - ((maxVal - min) / (max - min)) * 100;
    fill.style.left  = leftPct  + '%';
    fill.style.right = rightPct + '%';
  }

  function updateRentDisplay() {
    const minInput = document.getElementById('rentMin');
    const maxInput = document.getElementById('rentMax');
    const minDisp  = document.getElementById('rentMinDisplay');
    const maxDisp  = document.getElementById('rentMaxDisplay');
    if (minInput && minDisp) minDisp.textContent = '৳' + parseInt(minInput.value).toLocaleString('en-BD');
    if (maxInput && maxDisp) maxDisp.textContent = '৳' + parseInt(maxInput.value).toLocaleString('en-BD');
  }

  // FILTER LOGIC 
  function applyFiltersAndRender() {
    const f = state.filters;
    let results = [...state.allListings];

    // Search
    if (f.search) {
      const q = f.search.toLowerCase();
      results = results.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.area.toLowerCase().includes(q) ||
        l.district.toLowerCase().includes(q) ||
        l.university.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
      );
    }

    // District
    if (f.district) results = results.filter(l => l.district === f.district);

    // Areas
    if (f.areas.length) results = results.filter(l => f.areas.includes(l.area));

    // Universities
    if (f.universities.length) results = results.filter(l => f.universities.some(u => u === l.university || u === l.universityShort || u.includes(l.university) || l.university.includes(u) || (l.universityShort && u.includes(l.universityShort))));

    // Property Types
    if (f.types.length) results = results.filter(l => f.types.includes(l.type));

    // Distance
    if (f.distance) {
      const maxD = parseFloat(f.distance);
      results = results.filter(l => {
        if (f.distance === '99') return l.distance > 5;
        if (f.distance === '0.5') return l.distance <= 0.5;
        if (f.distance === '1') return l.distance > 0.5 && l.distance <= 1;
        if (f.distance === '2') return l.distance > 1 && l.distance <= 2;
        if (f.distance === '5') return l.distance > 2 && l.distance <= 5;
        return true;
      });
    }

    // Rent range
    results = results.filter(l => l.price >= f.rentMin && l.price <= f.rentMax);

    // Available from month/year
    if (f.availableMonth || f.availableYear) {
      results = results.filter(l => {
        if (!l.availableFrom) return false;
        const d = new Date(String(l.availableFrom).replace(' ', 'T'));
        if (Number.isNaN(d.getTime())) return false;
        const monthOk = !f.availableMonth || (d.getMonth() + 1) === parseInt(f.availableMonth, 10);
        const yearOk = !f.availableYear || d.getFullYear() === parseInt(f.availableYear, 10);
        return monthOk && yearOk;
      });
    }

    // Amenities
    if (f.amenities.length) {
      results = results.filter(l =>
        f.amenities.every(a => l.amenities.includes(a))
      );
    }

    // Sort
    switch (state.sort) {
      case 'price_asc':  results.sort((a,b) => a.price - b.price); break;
      case 'price_desc': results.sort((a,b) => b.price - a.price); break;
      case 'distance':   results.sort((a,b) => a.distance - b.distance); break;
      
      case 'oldest':     results.sort((a,b) => a.id - b.id); break;
      default:           results.sort((a,b) => b.id - a.id); break;
    }

    state.filteredListings = results;
    state.displayedCount   = CARDS_PER_PAGE;

    updateResultsCount(results.length);
    updateActiveFilterTags();
    updateFilterCountBadge();
    renderCards();
  }

  //  RENDER CARDS 
  function showSkeletons() {
    const grid = document.getElementById('listingsGrid');
    if (!grid) return;
    grid.innerHTML = Array(6).fill(0).map(() => `
      <div class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-body">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-line shorter"></div>
        </div>
      </div>`).join('');
  }

  function renderCards() {
    const grid       = document.getElementById('listingsGrid');
    const empty      = document.getElementById('emptyState');
    const loadMore   = document.getElementById('loadMoreWrap');
    if (!grid) return;

    const toShow = state.filteredListings.slice(0, state.displayedCount);

    if (!toShow.length) {
      grid.innerHTML = '';
      if (empty)    empty.style.display    = 'flex';
      if (loadMore) loadMore.style.display = 'none';
      updateStatCount(0);
      return;
    }

    if (empty) empty.style.display = 'none';

    grid.innerHTML = toShow.map((l, i) => buildCard(l, i)).join('');

    // Staggered animation
    grid.querySelectorAll('.browse-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 60}ms`;
    });

    // Load more
    if (loadMore) {
      loadMore.style.display = state.filteredListings.length > state.displayedCount ? 'flex' : 'none';
    }

    // Bind card events
    bindCardEvents();
    updateStatCount(state.filteredListings.length);
  }

  function buildCard(l, i) {
    const isFav   = state.favorites.includes(l.id);
    const amenMax = 4;
    const shown   = l.amenities.slice(0, amenMax);
    const extra   = l.amenities.length - amenMax;

    return `
    <div class="browse-card" data-id="${l.id}" tabindex="0" role="button" aria-label="View ${escH(l.title)}">
      <!-- Image -->
      <div class="bc-img-wrap">
        <img src="${l.images[0]}" alt="${escH(l.title)}" class="bc-img" loading="lazy"/>
        ${l.verified ? `<div class="bc-verified-badge"><span class="material-symbols-outlined" style="font-size:11px;font-variation-settings:'FILL' 1;">verified</span> Verified</div>` : ''}
        <div class="bc-prop-type-badge">${escH(l.type)}</div>
        <button class="bc-fav-btn ${isFav ? 'favorited' : ''}" data-id="${l.id}" aria-label="Favorite" onclick="event.stopPropagation()">
          <span class="material-symbols-outlined" style="font-size:19px;${isFav ? "font-variation-settings:'FILL' 1;color:#ef4444;" : ''}">favorite</span>
        </button>
        <div class="bc-price-tag">
          <span class="bc-price">৳${l.price.toLocaleString('en-BD')}</span>
          <span class="bc-price-mo">/mo</span>
        </div>
        <div class="bc-avail-tag">From: ${l.availableFrom}</div>
      </div>

      <!-- Body -->
      <div class="bc-body">
        <div class="bc-top-row">
          <h3 class="bc-title">${escH(l.title)}</h3>
          <span class="bc-posted">${l.postedAgo}</span>
        </div>

      
        

        <div class="bc-location">
          <span class="material-symbols-outlined">location_on</span>
          ${escH(l.area)}, ${escH(l.district)}
        </div>

        <div class="bc-distance">
          <span class="material-symbols-outlined">directions_walk</span>
          ${l.distance} ${l.distanceUnit} from ${escH(l.university.split('(')[0].trim())}
        </div>

        <div class="bc-amenity-tags">
          ${shown.map(a => `<span class="bc-amenity-tag">${escH(a)}</span>`).join('')}
          ${extra > 0 ? `<span class="bc-amenity-more">+${extra} more</span>` : ''}
        </div>

        <div class="bc-card-actions">
          <button class="bc-btn-details" data-id="${l.id}">
            <span class="material-symbols-outlined" style="font-size:15px;">open_in_new</span>
            View Details
          </button>
          <button class="bc-btn-icon bc-msg-btn" data-id="${l.id}" title="Message" onclick="event.stopPropagation()">
            <span class="material-symbols-outlined">chat_bubble</span>
          </button>
          <button class="bc-btn-icon bc-report-btn" data-id="${l.id}" title="Report" onclick="event.stopPropagation()">
            <span class="material-symbols-outlined">flag</span>
          </button>
        </div>
      </div>
    </div>`;
  }

  // BIND CARD EVENTS 
  function bindCardEvents() {
    const grid = document.getElementById('listingsGrid');
    if (!grid) return;

    // Card click → open detail
    grid.querySelectorAll('.browse-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.bc-fav-btn') || e.target.closest('.bc-btn-icon')) return;
        const id = parseInt(card.dataset.id);
        openListingDetail(id);
      });
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter') card.click();
      });
    });

    // View details button
    grid.querySelectorAll('.bc-btn-details').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openListingDetail(parseInt(btn.dataset.id));
      });
    });

    // Favorite toggle
    grid.querySelectorAll('.bc-fav-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (!window.BashaBari?.isLoggedIn()) {
          window.BashaBari?.openSignIn();
          return;
        }
        const id  = parseInt(btn.dataset.id);
        const fd = new FormData();
        fd.append('listing_id', id);
        fetch('api/favorites/toggle-favorite.php', {
          method: 'POST',
          headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' },
          body: fd
        })
          .then(r => r.json().then(data => ({ ok: r.ok, data })))
          .then(({ ok, data }) => {
            if (!ok || !data.success) throw new Error(data.error || 'Could not update favorite.');
            const idx = state.favorites.indexOf(id);
            if (data.favorited && idx === -1) state.favorites.push(id);
            if (!data.favorited && idx !== -1) state.favorites.splice(idx, 1);
            btn.classList.toggle('favorited', !!data.favorited);
            btn.querySelector('.material-symbols-outlined').style.cssText = data.favorited ? "font-size:19px;font-variation-settings:'FILL' 1;color:#ef4444;" : 'font-size:19px;';
            localStorage.setItem('bb_favorites', JSON.stringify(state.favorites));
            window.BashaBari?.showToast(data.favorited ? 'Added to favorites ' : 'Removed from favorites', data.favorited ? 'success' : 'info');
          })
          .catch(err => window.BashaBari?.showToast(err.message || 'Could not update favorite.', 'error'));
      });
    });

    // Message button
    grid.querySelectorAll('.bc-msg-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (!window.BashaBari?.isLoggedIn()) {
          window.BashaBari?.openSignIn();
          return;
        }
        const listing = state.allListings.find(l => l.id === parseInt(btn.dataset.id));
        if (!listing?.user_id) { window.BashaBari?.showToast('Listing owner unavailable.', 'error'); return; }
        window.location.href = `student-dashboard.php?section=messages&user_id=${encodeURIComponent(listing.user_id)}`;
      });
    });

    // Report button
    grid.querySelectorAll('.bc-report-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (!window.BashaBari?.isLoggedIn()) {
          window.BashaBari?.openSignIn();
          return;
        }
        openReportModal(parseInt(btn.dataset.id));
      });
    });
  }

  //  LISTING DETAIL MODAL 
  function openListingDetail(id) {
    state.currentDetailId = id;
    state.galleryIndex    = 0;
    fetch(`api/listings/get-listing-detail.php?id=${encodeURIComponent(id)}`)
      .then(r => r.json().then(data => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || !data.success) throw new Error(data.error || 'Could not load listing.');
        const l = data.listing;
        const mapped = {
          id: l.id, user_id: l.user_id, title: l.title, district: l.district || '', area: l.area || '',
          university: l.university || '', price: Number(l.rent_price || 0), type: l.property_type_label || l.property_type || '',
          distance: Number(l.distance_value || 0), distanceUnit: `${l.distance_unit || 'walking'} distance`,
          availableFrom: l.available_from || '', amenities: l.amenities || [], description: l.description || '',
          images: l.images || ['uploads/listings/placeholder.jpg'], verified: !!Number(l.is_verified), rating: 4.5,
          poster: { id: l.poster?.id, name: l.poster?.name || 'Listing Owner', initials: getInitials(l.poster?.name || 'LO'), university: l.university || '', phone: l.poster?.phone || '' },
          phoneHidden: !!Number(l.phone_hidden), status: l.status, comments: (l.comments || []).map(c => ({ user: c.user_name, initials: getInitials(c.user_name), text: c.comment_text || c.text, time: c.created_at }))
        };
        const idx = state.allListings.findIndex(x => x.id === id);
        if (idx >= 0) state.allListings[idx] = { ...state.allListings[idx], ...mapped };
        else state.allListings.push(mapped);
        populateDetailModal(mapped);
        openOverlay('listingDetailModal');
      })
      .catch(err => window.BashaBari?.showToast(err.message || 'Could not load listing detail.', 'error'));
  }

  function populateDetailModal(l) {
    // Gallery
    const mainImg = document.getElementById('ldmMainImg');
    if (mainImg) mainImg.src = l.images[0];

    const thumbsWrap = document.getElementById('ldmGalleryThumbs');
    if (thumbsWrap) {
      thumbsWrap.innerHTML = l.images.map((src, i) =>
        `<img src="${src}" class="ldm-thumb ${i===0?'active':''}" data-index="${i}" alt="Photo ${i+1}" loading="lazy"/>`
      ).join('');
      thumbsWrap.querySelectorAll('.ldm-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          state.galleryIndex = parseInt(thumb.dataset.index);
          updateGallery(l);
        });
      });
    }

    updateGalleryCounter(l);

    // Badges
    const badgesEl = document.getElementById('ldmBadges');
    if (badgesEl) {
      badgesEl.innerHTML = `
        ${l.verified ? '<span class="ldm-badge ldm-badge-verified">✓ Verified</span>' : ''}
        <span class="ldm-badge ldm-badge-type">${escH(l.type)}</span>
        <span class="ldm-badge ldm-badge-status-published">Published</span>`;
    }

    // Title & Price
    const titleEl = document.getElementById('ldmTitle');
    const priceEl = document.getElementById('ldmPrice');
    if (titleEl) titleEl.textContent = l.title;
    if (priceEl) priceEl.textContent = '৳' + l.price.toLocaleString('en-BD');

    // Meta
    const metaEl = document.getElementById('ldmMetaRow');
    if (metaEl) {
      metaEl.innerHTML = `
        <div class="ldm-meta-item">
          <span class="material-symbols-outlined">location_on</span>
          ${escH(l.area)}, ${escH(l.district)}
        </div>
        <div class="ldm-meta-item">
          <span class="material-symbols-outlined">school</span>
          ${escH(l.university.split('(')[0].trim())}
        </div>
        <div class="ldm-meta-item">
          <span class="material-symbols-outlined">directions_walk</span>
          ${l.distance} ${escH(l.distanceUnit)}
        </div>`;
    }

    // Amenities
    const amenEl = document.getElementById('ldmAmenities');
    if (amenEl) {
      amenEl.innerHTML = l.amenities.map(a => {
        const icon = AMENITIES_LIST.find(x => x.key === a)?.icon || 'check_circle';
        return `<div class="ldm-amenity-chip"><span class="material-symbols-outlined">${icon}</span>${escH(a)}</div>`;
      }).join('');
    }

    // Description
    const descEl = document.getElementById('ldmDescription');
    if (descEl) descEl.textContent = l.description;

    // Comments
    renderComments(l);

    // Poster
    const posterEl = document.getElementById('ldmPosterInfo');
    if (posterEl) {
      posterEl.innerHTML = `
        <div class="ldm-poster-avatar" style="border-radius:50%;width:44px;height:44px;min-width:44px;overflow:hidden;display:flex;align-items:center;justify-content:center;">${l.poster.initials}</div>
        <div>
          <div class="ldm-poster-name">${escH(l.poster.name)}</div>
          <div class="ldm-poster-uni">${escH(l.poster.university)}</div>
        </div>`;
    }

    // Phone
    const phoneWrap   = document.getElementById('ldmPhoneWrap');
    const phoneLocked = document.getElementById('ldmPhoneLocked');
    const phoneEl     = document.getElementById('ldmPhone');
    const isLoggedIn  = window.BashaBari?.isLoggedIn();

    if (isLoggedIn && !l.phoneHidden) {
      if (phoneWrap)   phoneWrap.style.display   = 'block';
      if (phoneLocked) phoneLocked.style.display = 'none';
      if (phoneEl)     phoneEl.textContent       = l.poster.phone;
    } else {
      if (phoneWrap)   phoneWrap.style.display   = 'none';
      if (phoneLocked) phoneLocked.style.display = 'flex';
    }

    // Quick Info
    const quickInfoEl = document.getElementById('ldmQuickInfo');
    if (quickInfoEl) {
      quickInfoEl.innerHTML = `
        <div class="ldm-quick-info-title">Quick Info</div>
        <div class="ldm-quick-info-row"><span class="ldm-qi-label">Property Type</span><span class="ldm-qi-value">${escH(l.type)}</span></div>
        <div class="ldm-quick-info-row"><span class="ldm-qi-label">District</span><span class="ldm-qi-value">${escH(l.district)}</span></div>
        <div class="ldm-quick-info-row"><span class="ldm-qi-label">Area</span><span class="ldm-qi-value">${escH(l.area)}</span></div>
        <div class="ldm-quick-info-row"><span class="ldm-qi-label">Monthly Rent</span><span class="ldm-qi-value">৳${l.price.toLocaleString('en-BD')}</span></div>
        <div class="ldm-quick-info-row"><span class="ldm-qi-label">Distance</span><span class="ldm-qi-value">${l.distance} ${escH(l.distanceUnit)}</span></div>
        <div class="ldm-quick-info-row"><span class="ldm-qi-label">Verified</span><span class="ldm-qi-value">${l.verified ? '✓ Yes' : '✗ No'}</span></div>`;
    }

    // Availability
    const availEl = document.getElementById('ldmAvailCard');
    if (availEl) {
      availEl.innerHTML = `
        <div class="ldm-avail-inner">
          <div class="ldm-avail-icon">
            <span class="material-symbols-outlined">calendar_month</span>
          </div>
          <div>
            <div class="ldm-avail-label">Available From</div>
            <div class="ldm-avail-date">${escH(l.availableFrom)}</div>
          </div>
        </div>`;
    }

    // Message & Report buttons
    document.getElementById('ldmMessageBtn')?.addEventListener('click', () => {
      if (!window.BashaBari?.isLoggedIn()) { window.BashaBari?.openSignIn(); return; }
      if (!l.user_id && !l.poster?.id) { window.BashaBari?.showToast('Listing owner unavailable.', 'error'); return; }
      window.location.href = `student-dashboard.php?section=messages&user_id=${encodeURIComponent(l.user_id || l.poster.id)}`;
    });

    document.getElementById('ldmReportBtn')?.addEventListener('click', () => {
      if (!window.BashaBari?.isLoggedIn()) { window.BashaBari?.openSignIn(); return; }
      closeOverlay('listingDetailModal');
      setTimeout(() => openReportModal(l.id), 300);
    });
  }

  function renderComments(l) {
    const list      = document.getElementById('ldmCommentsList');
    const form      = document.getElementById('ldmCommentForm');
    const prompt    = document.getElementById('ldmCommentLoginPrompt');
    const badge     = document.getElementById('commentCountBadge');
    const isLoggedIn = window.BashaBari?.isLoggedIn();

    const allComments = [...(l.comments || [])];

    if (badge) badge.textContent = allComments.length;

    if (list) {
      list.innerHTML = allComments.length
        ? allComments.map(c => `
          <div class="comment-item">
            <div class="comment-avatar">${escH(c.initials || c.user?.slice(0,2).toUpperCase() || '??')}</div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-name">${escH(c.user)}</span>
                <span class="comment-time">${escH(c.time)}</span>
              </div>
              <p class="comment-text">${escH(c.text)}</p>
            </div>
          </div>`).join('')
        : '<p style="font-size:13px;color:#75777e;font-style:italic;">No comments yet. Be the first!</p>';
    }

    if (isLoggedIn) {
      if (form)   form.style.display   = 'block';
      if (prompt) prompt.style.display = 'none';
    } else {
      if (form)   form.style.display   = 'none';
      if (prompt) prompt.style.display = 'flex';
    }

    // Submit comment
    const submitBtn = document.getElementById('commentSubmitBtn');
    if (submitBtn) {
      submitBtn.onclick = () => submitComment(l.id);
    }
  }

  function submitComment(listingId) {
    const textarea = document.getElementById('commentTextarea');
    const text     = textarea?.value?.trim();
    if (!text) { window.BashaBari?.showToast('Please write something first!', 'error'); return; }
    const fd = new FormData();
    fd.append('listing_id', listingId);
    fd.append('comment_text', text);
    fetch('api/comments/add-comment.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' },
      body: fd
    })
      .then(r => r.json().then(data => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || !data.success) throw new Error(data.error || 'Could not post comment.');
        if (textarea) textarea.value = '';
        const listing = state.allListings.find(l => l.id === listingId);
        if (listing) {
          listing.comments = listing.comments || [];
          listing.comments.push({ user: data.comment.user_name, initials: getInitials(data.comment.user_name), text: data.comment.text, time: 'Just now' });
          renderComments(listing);
        }
        window.BashaBari?.showToast('Comment posted! 💬', 'success');
      })
      .catch(err => window.BashaBari?.showToast(err.message || 'Could not post comment.', 'error'));
  }

  function updateGallery(l) {
    const mainImg = document.getElementById('ldmMainImg');
    if (mainImg) {
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = l.images[state.galleryIndex];
        mainImg.style.opacity = '1';
      }, 180);
    }
    document.querySelectorAll('.ldm-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === state.galleryIndex);
    });
    updateGalleryCounter(l);
  }

  function updateGalleryCounter(l) {
    const counter = document.getElementById('galleryCounter');
    if (counter) counter.textContent = `${state.galleryIndex + 1} / ${l.images.length}`;
  }

  // TOOLBAR EVENTS 
  function bindToolbarEvents() {
    // Sort
    document.getElementById('sortSelect')?.addEventListener('change', e => {
      state.sort = e.target.value;
      applyFiltersAndRender();
    });

    // Grid / List toggle
    document.getElementById('gridViewBtn')?.addEventListener('click', () => setViewMode('grid'));
    document.getElementById('listViewBtn')?.addEventListener('click', () => setViewMode('list'));

    // Load More
    document.getElementById('loadMoreBtn')?.addEventListener('click', () => {
      state.displayedCount += CARDS_PER_PAGE;
      renderCards();
    });
  }

  function setViewMode(mode) {
    state.viewMode = mode;
    const grid    = document.getElementById('listingsGrid');
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    if (grid) {
      grid.classList.toggle('list-view', mode === 'list');
    }
    if (gridBtn) gridBtn.classList.toggle('active', mode === 'grid');
    if (listBtn) listBtn.classList.toggle('active', mode === 'list');
  }

  // MODAL EVENTS 
  function bindModalEvents() {
    // Close detail modal
    document.getElementById('ldmCloseBtn')?.addEventListener('click', () => closeOverlay('listingDetailModal'));
    document.getElementById('listingDetailModal')?.addEventListener('click', e => {
      if (e.target.id === 'listingDetailModal') closeOverlay('listingDetailModal');
    });

    // Gallery navigation
    document.getElementById('galleryPrev')?.addEventListener('click', () => {
      const l = state.allListings.find(x => x.id === state.currentDetailId);
      if (!l) return;
      state.galleryIndex = (state.galleryIndex - 1 + l.images.length) % l.images.length;
      updateGallery(l);
    });

    document.getElementById('galleryNext')?.addEventListener('click', () => {
      const l = state.allListings.find(x => x.id === state.currentDetailId);
      if (!l) return;
      state.galleryIndex = (state.galleryIndex + 1) % l.images.length;
      updateGallery(l);
    });

    // Keyboard gallery nav
    document.addEventListener('keydown', e => {
      if (document.getElementById('listingDetailModal')?.classList.contains('active')) {
        const l = state.allListings.find(x => x.id === state.currentDetailId);
        if (!l) return;
        if (e.key === 'ArrowLeft')  { state.galleryIndex = (state.galleryIndex - 1 + l.images.length) % l.images.length; updateGallery(l); }
        if (e.key === 'ArrowRight') { state.galleryIndex = (state.galleryIndex + 1) % l.images.length; updateGallery(l); }
      }
    });

    // Report modal
    document.getElementById('reportCloseBtn')?.addEventListener('click', () => closeOverlay('reportModal'));
    document.getElementById('reportModal')?.addEventListener('click', e => {
      if (e.target.id === 'reportModal') closeOverlay('reportModal');
    });

    // File upload
    const fileArea   = document.getElementById('reportFileArea');
    const fileInput  = document.getElementById('report_image');
    const preview    = document.getElementById('reportFilePreview');
    const previewImg = document.getElementById('reportFileImg');
    const removeBtn  = document.getElementById('reportFileRemove');

    fileArea?.addEventListener('click', () => fileInput?.click());
    fileArea?.addEventListener('dragover', e => { e.preventDefault(); fileArea.style.borderColor = '#0c6780'; });
    fileArea?.addEventListener('dragleave', () => { fileArea.style.borderColor = ''; });
    fileArea?.addEventListener('drop', e => {
      e.preventDefault();
      fileArea.style.borderColor = '';
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) showFilePreview(file);
    });

    fileInput?.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) showFilePreview(file);
    });

    removeBtn?.addEventListener('click', () => {
      if (preview)    preview.style.display = 'none';
      if (fileArea)   fileArea.style.display = 'block';
      if (fileInput)  fileInput.value = '';
      if (previewImg) previewImg.src = '';
    });

    function showFilePreview(file) {
      const reader = new FileReader();
      reader.onload = e => {
        if (previewImg) previewImg.src = e.target.result;
        if (preview)    preview.style.display = 'block';
        if (fileArea)   fileArea.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }

    // Report form submit
    document.getElementById('reportForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('report_title')?.value.trim();
      const cat   = document.getElementById('report_category')?.value;
      const desc  = document.getElementById('report_description')?.value.trim();
      let valid   = true;

      if (!title) { showFieldErr('report_title', 'Please enter a title'); valid = false; }
      if (!cat)   { showFieldErr('report_category', 'Please select a category'); valid = false; }
      if (!desc)  { showFieldErr('report_description', 'Please describe the issue'); valid = false; }

      if (!valid) return;

      const btn = e.target.querySelector('.modal-submit-btn');
      if (btn) { btn.classList.add('loading'); btn.disabled = true; }

      const fd = new FormData();
      fd.append('title', title);
      fd.append('category', cat);
      fd.append('description', desc);
      if (state.currentDetailId) fd.append('reference_id', state.currentDetailId);
      const file = document.getElementById('report_image')?.files?.[0];
      if (file) fd.append('image', file);
      fetch('api/reports/submit-report.php', {
        method: 'POST',
        headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' },
        body: fd
      })
        .then(r => r.json().then(data => ({ ok: r.ok, data })))
        .then(({ ok, data }) => {
          if (!ok || !data.success) throw new Error(data.error || 'Could not submit report.');
          if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
          closeOverlay('reportModal');
          e.target.reset();
          window.BashaBari?.showToast('Report submitted. We\'ll review it shortly.', 'success');
        })
        .catch(err => {
          if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
          window.BashaBari?.showToast(err.message || 'Could not submit report.', 'error');
        });
    });

    // Live clear field errors
    ['report_title','report_category','report_description'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => clearFieldErr(id));
      document.getElementById(id)?.addEventListener('change', () => clearFieldErr(id));
    });
  }

  function showFieldErr(id, msg) {
    const el  = document.getElementById(id);
    const err = document.getElementById(id + '_err');
    if (el)  el.classList.add('has-error');
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

  // SIDEBAR CONTROLS 
  function toggleSidebar() {
    const sidebar   = document.getElementById('browseSidebar');
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const icon      = document.getElementById('sidebarToggleIcon');
    if (!sidebar) return;
    const collapsed = sidebar.classList.toggle('collapsed');
    if (icon) icon.textContent = collapsed ? 'chevron_right' : 'chevron_left';
  }

  function openMobileSidebar() {
    document.getElementById('browseSidebar')?.classList.add('mobile-open');
    document.getElementById('sidebarOverlay')?.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeMobileSidebar() {
    document.getElementById('browseSidebar')?.classList.remove('mobile-open');
    document.getElementById('sidebarOverlay')?.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  function openReportModal(id) {
    openOverlay('reportModal');
  }

  // RESET FILTERS 
  function resetAllFilters() {
    state.filters = { search:'', district:'', areas:[], universities:[], types:[], distance:'', rentMin:1000, rentMax:30000, amenities:[], availableMonth:'', availableYear:'' };

    // Reset UI
    const heroSearch    = document.getElementById('heroSearchInput');
    const sidebarSearch = document.getElementById('sidebarSearch');
    const clearSearch   = document.getElementById('clearSidebarSearch');
    const districtSel   = document.getElementById('districtSelect');
    const distanceSel   = document.getElementById('distanceSelect');
    const monthSel      = document.getElementById('availableMonthSelect');
    const yearSel       = document.getElementById('availableYearSelect');
    const rentMin       = document.getElementById('rentMin');
    const rentMax       = document.getElementById('rentMax');

    if (heroSearch)    heroSearch.value    = '';
    if (sidebarSearch) sidebarSearch.value = '';
    if (clearSearch)   clearSearch.style.display = 'none';
    if (districtSel)   districtSel.value = '';
    if (distanceSel)   distanceSel.value = '';
    if (monthSel)      monthSel.value = '';
    if (yearSel)       yearSel.value = '';
    if (rentMin)       rentMin.value = 1000;
    if (rentMax)       rentMax.value = 30000;

    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('.amenity-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('.amenity-chip').forEach(chip => chip.classList.remove('active'));
    document.querySelectorAll('.rent-preset-btn').forEach(b => b.classList.remove('active'));

    const areaList = document.getElementById('areaCheckboxList');
    if (areaList) areaList.innerHTML = '<div class="filter-placeholder-text">Select a district first</div>';

    updateRangeFill();
    updateRentDisplay();
    applyFiltersAndRender();
    window.BashaBari?.showToast('All filters cleared', 'info');
  }

  // UI HELPERS 
  function updateResultsCount(count) {
    const countEl = document.getElementById('resultsCount');
    const queryEl = document.getElementById('resultsQueryLabel');
    if (countEl) countEl.textContent = count;
    if (queryEl) {
      const q = state.filters.search;
      queryEl.textContent = q ? `for "${q}"` : '';
    }
  }

  function updateStatCount(count) {
    const statEl = document.getElementById('statTotal');
    if (statEl) statEl.textContent = count;
  }

  function updateActiveFilterTags() {
    const wrap     = document.getElementById('activeFiltersWrap');
    const tagsEl   = document.getElementById('activeFilterTags');
    if (!wrap || !tagsEl) return;

    const tags = [];
    const f    = state.filters;

    if (f.search)          tags.push({ label: `"${f.search}"`, clear: () => { f.search = ''; document.getElementById('sidebarSearch').value = ''; document.getElementById('heroSearchInput').value = ''; applyFiltersAndRender(); } });
    if (f.district)        tags.push({ label: f.district, clear: () => { f.district = ''; document.getElementById('districtSelect').value = ''; buildAreaCheckboxes(''); applyFiltersAndRender(); } });
    if (f.types.length)    tags.push({ label: f.types.join(', '), clear: () => { f.types = []; document.querySelectorAll('.filter-type').forEach(c => c.checked = false); applyFiltersAndRender(); } });
    if (f.amenities.length) tags.push({ label: f.amenities.join(', '), clear: () => { f.amenities = []; document.querySelectorAll('.amenity-checkbox').forEach(c => c.checked = false); document.querySelectorAll('.amenity-chip').forEach(c => c.classList.remove('active')); applyFiltersAndRender(); } });
    if (f.availableMonth || f.availableYear) tags.push({ label: `Available ${f.availableMonth ? document.querySelector(`#availableMonthSelect option[value=\"${f.availableMonth}\"]`)?.textContent || '' : 'Any Month'} ${f.availableYear || ''}`.trim(), clear: () => { f.availableMonth=''; f.availableYear=''; const m=document.getElementById('availableMonthSelect'); const y=document.getElementById('availableYearSelect'); if(m)m.value=''; if(y)y.value=''; applyFiltersAndRender(); } });
    if (f.rentMin > 1000 || f.rentMax < 30000) tags.push({ label: `৳${f.rentMin.toLocaleString()}–৳${f.rentMax.toLocaleString()}`, clear: () => { f.rentMin = 1000; f.rentMax = 30000; document.getElementById('rentMin').value = 1000; document.getElementById('rentMax').value = 30000; updateRangeFill(); updateRentDisplay(); applyFiltersAndRender(); } });

    if (tags.length) {
      wrap.style.display = 'block';
      tagsEl.innerHTML   = tags.map((t, i) => `
        <div class="active-filter-tag" data-tag-index="${i}">
          ${escH(t.label.length > 20 ? t.label.slice(0,20) + '…' : t.label)}
          <span class="material-symbols-outlined">close</span>
        </div>`).join('');
      tagsEl.querySelectorAll('.active-filter-tag').forEach((el, i) => {
        el.addEventListener('click', () => tags[i].clear());
      });
    } else {
      wrap.style.display = 'none';
      tagsEl.innerHTML   = '';
    }
  }

  function updateFilterCountBadge() {
    const badge  = document.getElementById('filterCountBadge');
    if (!badge) return;
    const f      = state.filters;
    let count    = 0;
    if (f.search)          count++;
    if (f.district)        count++;
    if (f.areas.length)    count += f.areas.length;
    if (f.universities.length) count += f.universities.length;
    if (f.types.length)    count += f.types.length;
    if (f.distance)        count++;
    if (f.availableMonth || f.availableYear) count++;
    if (f.amenities.length) count += f.amenities.length;
    if (f.rentMin > 1000 || f.rentMax < 30000) count++;

    if (count > 0) {
      badge.textContent   = count;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }

  // SCROLL REVEAL
  function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  }

  // OVERLAY HELPERS 
  function openOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('active');
    if (!document.querySelector('.modal-overlay.active')) {
      document.body.classList.remove('modal-open');
    }
  }

  //  UTILS 

  function formatPostedAgo(value, id) {
    const fallback = ['a min ago','12 mins ago','45 mins ago','2h ago','5h ago','1d ago','3d ago','1w ago'];
    if (!value) return fallback[Math.abs(Number(id) || 0) % fallback.length];
    const d = new Date(String(value).replace(' ', 'T'));
    if (Number.isNaN(d.getTime())) return fallback[Math.abs(Number(id) || 0) % fallback.length];
    const rawDiff = Date.now() - d.getTime();
    // If seed dates are accidentally in the future on a local machine, use a deterministic varied fallback.
    if (rawDiff < -5 * 60000) return fallback[Math.abs(Number(id) || 0) % fallback.length];
    const diff = Math.max(0, rawDiff);
    const min = Math.floor(diff / 60000);
    if (min < 1) return 'just now';
    if (min === 1) return 'a min ago';
    if (min < 60) return `${min} mins ago`;
    const hr = Math.floor(min / 60);
    if (hr === 1) return '1h ago';
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day === 1) return '1d ago';
    if (day < 30) return `${day}d ago`;
    const month = Math.floor(day / 30);
    if (month === 1) return '1mo ago';
    if (month < 12) return `${month}mo ago`;
    const yr = Math.floor(month / 12);
    return yr === 1 ? '1y ago' : `${yr}y ago`;
  }

  function getInitials(name) {
    return (name || '').trim().split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  }

  function escH(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

})();