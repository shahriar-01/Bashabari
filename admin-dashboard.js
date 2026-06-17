'use strict';

// SIMULATED DATA 
const ADMIN_DATA = {
  users: [
    { id: 1, name: 'Rahim Ahmed',    email: 'student@northsouth.edu', university: 'North South University', studentId: 'NSU-2021-0142', phone: '01812345678', gender: 'Male',   joined: '15 Jan 2025', status: 'active',  verified: true },
    { id: 2, name: 'Fatima Khanam',  email: 'fatima@bracu.ac.bd',      university: 'BRAC University',        studentId: 'BRACU-22-0356', phone: '01912345679', gender: 'Female', joined: '20 Feb 2025', status: 'active',  verified: false },
    { id: 3, name: 'Rakib Hasan',    email: 'rakib@aiub.edu',          university: 'AIUB',                   studentId: 'AIUB-2023-091', phone: '01712345680', gender: 'Male',   joined: '05 Mar 2025', status: 'banned',  verified: false },
    { id: 4, name: 'Nadia Islam',    email: 'nadia@du.ac.bd',          university: 'University of Dhaka',    studentId: 'DU-2020-1234',  phone: '01612345681', gender: 'Female', joined: '12 Mar 2025', status: 'active',  verified: true },
    { id: 5, name: 'Tanvir Ahmed',   email: 'tanvir@uiu.ac.bd',        university: 'UIU',                    studentId: 'UIU-2022-0789', phone: '01512345682', gender: 'Male',   joined: '18 Apr 2025', status: 'active',  verified: false },
    { id: 6, name: 'Sadia Rahman',   email: 'sadia@ewu.edu.bd',        university: 'EWU',                    studentId: 'EWU-2023-0456', phone: '01412345683', gender: 'Female', joined: '02 May 2025', status: 'active',  verified: true },
    { id: 7, name: 'Arif Hossain',   email: 'arif@sust.edu',           university: 'SUST',                   studentId: 'SUST-2021-321', phone: '01312345684', gender: 'Male',   joined: '10 May 2025', status: 'active',  verified: false },
    { id: 8, name: 'Mitu Akter',     email: 'mitu@diu.edu.bd',         university: 'DIU',                    studentId: 'DIU-2022-0654', phone: '01212345685', gender: 'Female', joined: '15 Jun 2025', status: 'banned',  verified: false },
  ],
  listings: [
    { id: 1, title: 'Cozy Single Room Near NSU',       district: 'Dhaka', area: 'Bashundhara', type: 'Single Room',  price: 8500,  status: 'published', verified: true,  postedBy: 'Rahim Ahmed',   date: '01 Jan 2026', university: 'NSU',   image: 'assets/card 1.6.jpg' },
    { id: 2, title: 'Spacious Flat - BRACU Area',       district: 'Dhaka', area: 'Merul Badda', type: 'Flat',         price: 15000, status: 'pending',   verified: false, postedBy: 'Fatima Khanam', date: '03 Feb 2026', university: 'BRAC',  image: 'assets/card 1.2.jpg' },
    { id: 3, title: 'Shared Flat Near UIU - Badda',     district: 'Dhaka', area: 'Badda',       type: 'Shared Flat',  price: 6500,  status: 'pending',   verified: false, postedBy: 'Tanvir Ahmed',  date: '04 Aug 2026', university: 'UIU',   image: 'assets/card 1.9.jpg' },
    { id: 4, title: 'Bachelor Mess - Dhanmondi',        district: 'Dhaka', area: 'Dhanmondi',   type: 'Mess',         price: 4500,  status: 'rejected',  verified: false, postedBy: 'Arif Hossain',  date: '05 Sept 2026', university: 'SUST',  image: 'assets/card 1.5.jpg' },
    { id: 5, title: 'Sublet Near EWU Campus',           district: 'Dhaka', area: 'Rampura', type: 'Sublet',       price: 5000,  status: 'pending',   verified: false, postedBy: 'Sadia Rahman',  date: '07 March 2026', university: 'EWU',   image: 'assets/card 1.4.jpg' },
    { id: 6, title: 'Family Apartment - Uttara',        district: 'Dhaka', area: 'Uttara',      type: 'Flat',         price: 22000, status: 'published', verified: true,  postedBy: 'Nadia Islam',   date: '08 April 2026', university: 'DU',    image: 'assets/card 1.8.jpg' },
  ],
  reviews: [
    { id: 1, landlord: 'Mr. Zaman Kabir',    property: 'Bashundhara C-34, Dhaka',        district: 'Dhaka',     stars: 5, recommended: true,  text: 'Excellent landlord! Very responsive and maintains the property well. Never had any issues in 2 years.',     reviewer: 'Rahim Ahmed',   date: '01 May 2025', status: 'approved' },
    { id: 2, landlord: 'Mrs. Salma Begum',   property: 'Mohakhali Enclave, Block B',     district: 'Dhaka',     stars: 4, recommended: true,  text: 'Good landlord, maintains safety standards. Slightly slow on maintenance requests but overall positive.',       reviewer: 'Nadia Islam',   date: '10 May 2025', status: 'approved' },
    { id: 3, landlord: 'Engr. Arif Hasan',  property: 'Dhanmondi Student Loft, Rd 27',  district: 'Dhaka',     stars: 4, recommended: true,  text: 'Professional and fair. The property is clean and well-managed. Would recommend to other students.',             reviewer: 'Sadia Rahman',  date: '15 May 2025', status: 'pending' },
    { id: 4, landlord: 'Mr. Karim Uddin',   property: 'Mirpur DOHS, House 12',          district: 'Dhaka',     stars: 2, recommended: false, text: 'Very difficult to deal with. Raised rent without notice and ignored maintenance requests for months.',           reviewer: 'Rakib Hasan',   date: '20 May 2025', status: 'pending' },
    { id: 5, landlord: 'Mrs. Ruma Khatun',  property: 'Agrabad Residential, Chittagong', district: 'Chittagong',stars: 5, recommended: true,  text: 'Best landlord experience ever! She treats tenants like family and resolves issues within 24 hours.',            reviewer: 'Fatima Khanam', date: '25 May 2025', status: 'approved' },
  ],
  feedback: [
    { id: 1, topic: 'Great Platform!',         rating: 5, desc: 'BashaBari is exactly what students needed. The landlord reviews feature saved me from a terrible landlord. Highly recommend!',           user: 'Rahim Ahmed',   date: '20 May 2025', featured: true },
    { id: 2, topic: 'Suggestion: Map View',     rating: 4, desc: 'Would love to have a map view to see listings geographically. The filter system is excellent though. Great work team!',                  user: 'Nadia Islam',   date: '22 May 2025', featured: false },
    { id: 3, topic: 'Roommate Feature Works!',  rating: 5, desc: 'Found my perfect roommate through BashaBari. The lifestyle tag matching is spot on. We have been living together for 3 months now!',   user: 'Fatima Khanam', date: '28 May 2025', featured: false },
    { id: 4, topic: 'Minor UI Issues',          rating: 3, desc: 'Some buttons on mobile are hard to click. Overall great platform but needs some mobile optimization improvements.',                      user: 'Tanvir Ahmed',  date: '01 Jun 2025', featured: false },
  ],
  reports: [
    { id: 1, title: 'Fake Listing Reported',      category: 'listings',        desc: 'The listing at Mirpur 10 shows photos from a different location. The actual flat is much worse.',                       reportedBy: 'Rahim Ahmed',   date: '01 Jun 2025', status: 'new'       },
    { id: 2, title: 'Inappropriate Profile',      category: 'roommate',        desc: 'This user has uploaded an inappropriate profile picture and their description contains offensive content.',              reportedBy: 'Nadia Islam',   date: '02 Jun 2025', status: 'in_review' },
    { id: 3, title: 'Payment Scam Attempt',       category: 'user',            desc: 'This user is asking for advance payment outside the platform and threatening tenants if they refuse.',                  reportedBy: 'Fatima Khanam', date: '03 Jun 2025', status: 'new'       },
    { id: 4, title: 'Search Not Working',         category: 'technical_issue', desc: 'The search filter for "Utilities Included" is not working properly on mobile devices (Chrome browser).',               reportedBy: 'Tanvir Ahmed',  date: '04 Jun 2025', status: 'resolved'  },
    { id: 5, title: 'Spam Comments on Listing',   category: 'comment',         desc: 'Multiple spam comments from the same account promoting external websites on multiple listings.',                        reportedBy: 'Sadia Rahman',  date: '05 Jun 2025', status: 'in_review' },
  ],
  activity: [
    { id: 1,  type: 'listing',    desc: 'New listing posted: <strong>"Cozy Single Room Near NSU"</strong>',                user: 'Rahim Ahmed',   time: '2 min ago'  },
    { id: 2,  type: 'user',       desc: 'New student registered: <strong>Mitu Akter</strong>',                             user: 'System',        time: '15 min ago' },
    { id: 3,  type: 'report',     desc: 'New report submitted: <strong>"Fake Listing Reported"</strong>',                  user: 'Rahim Ahmed',   time: '30 min ago' },
    { id: 4,  type: 'review',     desc: 'New landlord review for <strong>Mr. Zaman Kabir</strong>',                        user: 'Rahim Ahmed',   time: '45 min ago' },
    { id: 5,  type: 'connect',    desc: 'Connection request accepted between Fatima & Nadia',                              user: 'Fatima Khanam', time: '1h ago'     },
    { id: 6,  type: 'comment',    desc: 'New comment on listing <strong>"Spacious Flat - BRACU Area"</strong>',            user: 'Sadia Rahman',  time: '2h ago'     },
    { id: 7,  type: 'listing',    desc: 'Listing <strong>"Bachelor Mess - Dhanmondi"</strong> was rejected',               user: 'Admin',         time: '3h ago'     },
    { id: 8,  type: 'user',       desc: 'User <strong>Rakib Hasan</strong> was banned for policy violation',               user: 'Admin',         time: '5h ago'     },
    { id: 9,  type: 'review',     desc: 'Landlord review approved for <strong>Mrs. Ruma Khatun</strong>',                  user: 'Admin',         time: '6h ago'     },
    { id: 10, type: 'report',     desc: 'Report <strong>"Search Not Working"</strong> marked as resolved',                 user: 'Admin',         time: '8h ago'     },
    { id: 11, type: 'listing',    desc: 'New listing posted: <strong>"Sublet Near EWU Campus"</strong>',                   user: 'Sadia Rahman',  time: '10h ago'    },
    { id: 12, type: 'connect',    desc: 'New connection request: Arif → Tanvir',                                           user: 'Arif Hossain',  time: '12h ago'    },
    { id: 13, type: 'user',       desc: 'New student registered: <strong>Arif Hossain</strong>',                           user: 'System',        time: '14h ago'    },
    { id: 14, type: 'comment',    desc: 'Comment deleted on listing <strong>"Shared Flat Near UIU"</strong>',              user: 'Admin',         time: '16h ago'    },
    { id: 15, type: 'listing',    desc: 'Listing approved: <strong>"Family Apartment - Uttara"</strong>',                  user: 'Admin',         time: '20h ago'    },
  ],
};

// ICONS MAP
const ACTIVITY_ICONS = {
  listing: { icon: 'apartment',  cls: 'listing' },
  user:    { icon: 'person',     cls: 'user'    },
  comment: { icon: 'comment',    cls: 'comment' },
  report:  { icon: 'flag',       cls: 'report'  },
  review:  { icon: 'star',       cls: 'review'  },
  connect: { icon: 'handshake',  cls: 'connect' },
};

// STATE 
let currentUser = null;
let activityVisible = 10;
let pendingConfirmCallback = null;
let listingsState = JSON.parse(JSON.stringify(ADMIN_DATA.listings));
let usersState    = JSON.parse(JSON.stringify(ADMIN_DATA.users));
let reviewsState  = JSON.parse(JSON.stringify(ADMIN_DATA.reviews));
let feedbackState = JSON.parse(JSON.stringify(ADMIN_DATA.feedback));
let reportsState  = JSON.parse(JSON.stringify(ADMIN_DATA.reports));
let landlordReviewOptions = null;

// INIT 
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  clearDemoAdminData();
  initSidebar();
  initCurrentDate();
  initCharts();
  renderStats();
  renderOverviewActivity();
  renderUsers();
  renderListings();
  renderReviews();
  renderFeedback();
  renderReports();
  renderFullActivity('all');
  initFilters();
  initModals();
  initSettings();
  initMobileSidebar();
  initGlobalSearch();
  updateBadges();
  loadBackendAdminData();
});

function loadBackendAdminData() {
  const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
  fetch('api/admin/get-stats.php').then(r=>r.json()).then(d=>{
    if (!d.success) return;
    const vals = [d.stats.total_users, d.stats.pending_listings, d.stats.new_reports, d.stats.published_listings, d.stats.total_reviews];
    document.querySelectorAll('.stat-value[data-count]').forEach((el,i)=>{ if(vals[i] !== undefined){ el.setAttribute('data-count', vals[i]); el.textContent = vals[i]; } });
    updateChartsFromBackend(d.charts || {});
    const allStatValues = document.querySelectorAll('.stat-value');
    if (allStatValues[5]) allStatValues[5].innerHTML = `${Number(d.stats.avg_rating || 0).toFixed(1)}<span style="font-size:16px;color:#94a3b8;">/5</span>`;
  }).catch(()=>null);
  fetch('api/users/get-all-users.php').then(r=>r.json()).then(d=>{ if(!d.success)return; usersState=(d.users||[]).filter(u=>u.role!=='admin').map(u=>({ id:u.id,name:u.name,email:u.email,university:u.university||'',studentId:u.student_id||'',phone:u.phone||'',gender:capitalize(u.gender||''),joined:(u.created_at||'').slice(0,10),status:Number(u.is_banned)?'banned':'active',verified:!!Number(u.is_verified), listingCount:Number(u.listing_count||0), commentCount:Number(u.comment_count||0), reviewCount:Number(u.review_count||0), favoriteCount:Number(u.favorite_count||0), connectionCount:Number(u.connection_count||0) })); renderUsers(); }).catch(()=>null);
  fetch('api/listings/get-listings.php?admin=true&limit=100').then(r=>r.json()).then(d=>{ if(!d.success)return; listingsState=d.listings.map(l=>({ id:l.id,title:l.title,district:l.district||'',area:l.area||'',type:l.property_type_label||l.property_type,price:Number(l.rent_price||0),status:l.status,verified:!!Number(l.is_verified),postedBy:l.owner_name||'',date:(l.created_at||'').slice(0,10),university:l.university_short||l.university||'',image:l.image_path })); renderListings(); updateBadges(); }).catch(()=>null);
  fetch('api/landlord-reviews/get-reviews.php?admin=true&limit=100').then(r=>r.json()).then(d=>{ if(!d.success)return; reviewsState=d.reviews.map(x=>({ id:x.id,landlord:x.landlord_name,property:x.property_address,district:x.district||'',stars:x.star_rating,recommended:!!Number(x.is_recommended),text:x.review_text||'',reviewer:x.reviewer_name||'',date:(x.created_at||'').slice(0,10),status:Number(x.is_approved)?'approved':'pending' })); renderReviews(); }).catch(()=>null);
  fetch('api/feedback/get-feedback.php').then(r=>r.json()).then(d=>{ if(!d.success)return; feedbackState=d.feedback.map(f=>({ id:f.id,topic:f.topic,rating:f.star_rating||0,desc:f.description||'',user:f.user_name||'Guest',date:(f.created_at||'').slice(0,10),featured:!!Number(f.is_featured) })); renderFeedback(); }).catch(()=>null);
  fetch('api/reports/get-reports.php').then(r=>r.json()).then(d=>{ if(!d.success)return; reportsState=d.reports.map(r=>({ id:r.id,title:r.title,category:r.category,desc:r.description||'',reportedBy:r.reported_by||'Unknown',date:(r.created_at||'').slice(0,10),status:r.status })); renderReports(); updateBadges(); }).catch(()=>null);
  refreshAdminActivity();
}


function refreshAdminActivity() {
  fetch('api/admin/get-activity-log.php?limit=50').then(r=>r.json()).then(d=>{
    if(!d.success)return;
    ADMIN_DATA.activity=d.activities.map(a=>({
      id:a.id,
      type:(a.action_type||'').includes('report')?'report':(a.action_type||'').includes('user')?'user':(a.action_type||'').includes('comment')?'comment':(a.action_type||'').includes('review')?'review':(a.action_type||'').includes('connect')?'connect':'listing',
      desc:escapeHTML(a.description||''),
      user:a.user_name||'System',
      time:(a.created_at||'').slice(0,16)
    }));
    renderOverviewActivity();
    renderFullActivity(document.querySelector('#activityFilterTabs .activity-tab.active')?.dataset.filter || 'all');
  }).catch(()=>null);
}

function adminPost(url, data = {}) {
  const fd = new FormData();
  Object.entries(data).forEach(([k, v]) => fd.append(k, v));
  return fetch(url, { method:'POST', headers:{ 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' }, body: fd })
    .then(r => r.json().then(json => { if (!r.ok || json.success === false) throw new Error(json.error || 'Request failed'); setTimeout(refreshAdminActivity, 250); return json; }));
}

function clearDemoAdminData() {
  usersState = []; listingsState = []; reviewsState = []; feedbackState = []; reportsState = []; ADMIN_DATA.activity = [];
  document.querySelectorAll('.stat-value[data-count]').forEach(el => { el.setAttribute('data-count', '0'); el.textContent = '0'; });
}

// AUTH CHECK 
function checkAuth() {
  const stored = localStorage.getItem('bashabari_user');
  try { currentUser = window.CURRENT_USER || (stored ? JSON.parse(stored) : null); }
  catch(e) { currentUser = window.CURRENT_USER || null; }
  if (currentUser && currentUser.full_name && !currentUser.name) currentUser.name = currentUser.full_name;
  if (currentUser) localStorage.setItem('bashabari_user', JSON.stringify(currentUser));

  const guard = document.getElementById('authGuard');
  const layout = document.getElementById('adminLayout');

  if (!currentUser || currentUser.role !== 'admin') {
    if (guard)  guard.style.display = 'flex';
    if (layout) layout.style.display = 'none';
    return;
  }

  if (guard)  guard.style.display = 'none';
  if (layout) layout.style.display = 'flex';

  const nameEl  = document.getElementById('sidebarAdminName');
  const emailEl = document.getElementById('sidebarAdminEmail');
  const avatarEl = document.getElementById('sidebarAvatar');
  if (nameEl)  nameEl.textContent  = currentUser.name  || 'Admin User';
  if (emailEl) emailEl.textContent = currentUser.email || 'admin@bashabari.com';
  if (avatarEl) avatarEl.textContent = getInitials(currentUser.name || 'AU');
}

// SIDEBAR NAVIGATION 
function initSidebar() {
  const navItems = document.querySelectorAll('.sidebar-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.getAttribute('data-section');
      switchSection(section);
    });
  });

  // Sign Out
  const signOutBtn = document.getElementById('adminSignOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      showConfirm('Sign Out', 'Are you sure you want to sign out?', () => {
        fetch('api/auth/logout.php', { method:'POST', headers:{ 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' } }).catch(()=>null).finally(() => {
          localStorage.removeItem('bashabari_user');
          window.location.href = 'index.php';
        });
      });
    });
  }
}

function switchSection(sectionId) {
  // Update nav
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
  });

  // Update sections
  document.querySelectorAll('.admin-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `section-${sectionId}`);
  });

  if (sectionId === 'activity' || sectionId === 'overview') refreshAdminActivity();

  const sidebar = document.getElementById('adminSidebar');
  if (sidebar) sidebar.classList.remove('mobile-open');
}

// MOBILE SIDEBAR
function initMobileSidebar() {
  const toggle  = document.getElementById('sidebarToggle');
  const sidebar  = document.getElementById('adminSidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }
}

// DATE 
function initCurrentDate() {
  const el = document.getElementById('currentDate');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-BD', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
  });
}

function updateChartsFromBackend(charts) {
  if (typeof Chart === 'undefined') return;
  const update = (id, rows) => {
    const canvas = document.getElementById(id);
    const chart = canvas ? Chart.getChart(canvas) : null;
    if (!chart || !Array.isArray(rows)) return;
    chart.data.labels = rows.map(r => r.label || 'Unknown');
    chart.data.datasets[0].data = rows.map(r => Number(r.value || 0));
    chart.update();
  };
  update('districtChart', charts.districts || []);
  update('usersChart', charts.users || []);
  update('typeChart', charts.types || []);
}

// STAT COUNTER ANIMATION 
function renderStats() {
  document.querySelectorAll('.stat-value[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    animateCount(el, target);
  });
}

function animateCount(el, target) {
  let current = 0;
  const duration = 1400;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString('en');
    if (current >= target) {
      el.textContent = target.toLocaleString('en');
      clearInterval(timer);
    }
  }, 16);
}

// CHARTS
function initCharts() {
  // Bar Chart - Listings per District
  const distCtx = document.getElementById('districtChart');
  if (distCtx) {
    new Chart(distCtx, {
      type: 'bar',
      data: {
        labels: ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Mymensingh', 'Barisal', 'Rangpur'],
        datasets: [{
          label: 'Listings',
          data: [210, 65, 42, 38, 30, 22, 18, 15],
          backgroundColor: [
            'rgba(10,25,47,0.8)',
            'rgba(12,103,128,0.8)',
            'rgba(16,185,129,0.8)',
            'rgba(135,206,235,0.8)',
            'rgba(152,255,152,0.8)',
            'rgba(245,158,11,0.8)',
            'rgba(239,68,68,0.7)',
            'rgba(100,116,139,0.7)',
          ],
          borderRadius: 8,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });
  }

  // Line Chart - Users per Month
  const usersCtx = document.getElementById('usersChart');
  if (usersCtx) {
    new Chart(usersCtx, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'New Users',
          data: [45, 72, 110, 98, 145, 188, 210, 165, 230, 195, 278, 310],
          borderColor: '#0c6780',
          backgroundColor: 'rgba(12,103,128,0.08)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#0c6780',
          pointRadius: 4,
          pointHoverRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });
  }

  // Pie Chart - Listing Types
  const typeCtx = document.getElementById('typeChart');
  if (typeCtx) {
    new Chart(typeCtx, {
      type: 'doughnut',
      data: {
        labels: ['Flat','Sublet','Single Room','Shared Flat','Mess','Bachelor Flat'],
        datasets: [{
          data: [90, 55, 75, 60, 40, 22],
          backgroundColor: [
            '#0A192F',
            '#0c6780',
            '#10B981',
            '#87CEEB',
            '#98FF98',
            '#F59E0B',
          ],
          borderWidth: 2,
          borderColor: '#fff',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'Inter', size: 10 },
              padding: 10,
              boxWidth: 12,
            }
          }
        },
        cutout: '60%',
      }
    });
  }
}

// OVERVIEW ACTIVITY 
function renderOverviewActivity() {
  const feed = document.getElementById('overviewActivityFeed');
  if (!feed) return;
  feed.innerHTML = '';
  ADMIN_DATA.activity.slice(0, 8).forEach(item => {
    feed.appendChild(buildActivityItem(item));
  });
}

function buildActivityItem(item) {
  const iconMap = ACTIVITY_ICONS[item.type] || { icon: 'info', cls: 'user' };
  const div = document.createElement('div');
  div.className = 'activity-item';
  div.setAttribute('data-type', item.type);
  div.innerHTML = `
    <div class="activity-icon ${iconMap.cls}">
      <span class="material-symbols-outlined">${iconMap.icon}</span>
    </div>
    <div class="activity-content">
      <p class="activity-desc">${item.desc}</p>
      <span class="activity-time">${item.time}</span>
    </div>
    <span class="activity-user-chip">${escapeHTML(item.user)}</span>
  `;
  return div;
}

// USERS TABLE
function renderUsers(filtered) {
  const data = filtered || usersState;
  const tbody = document.getElementById('usersTableBody');
  const empty = document.getElementById('usersEmpty');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (data.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  data.forEach(user => {
    const initials = getInitials(user.name);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="table-user-cell">
          <div class="table-avatar">${initials}</div>
          <span class="table-name">${escapeHTML(user.name)}</span>
        </div>
      </td>
      <td>${escapeHTML(user.email)}</td>
      <td>${escapeHTML(user.university)}</td>
      <td>${escapeHTML(user.studentId)}</td>
      <td>${escapeHTML(user.phone)}</td>
      <td>${escapeHTML(user.gender)}</td>
      <td>${escapeHTML(user.joined)}</td>
      <td>
        <span class="status-badge badge-${user.status}">${capitalize(user.status)}</span>
        ${user.verified ? '<span class="status-badge badge-verified" style="margin-top:4px;display:inline-flex;">✓ Verified</span>' : ''}
      </td>
      <td>
        <div class="table-actions">
          <button class="tbl-btn tbl-btn-view" onclick="openUserDetail(${user.id})">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          ${user.status === 'banned'
            ? `<button class="tbl-btn tbl-btn-unban" onclick="toggleBanUser(${user.id})"><span class="material-symbols-outlined">check_circle</span></button>`
            : `<button class="tbl-btn tbl-btn-ban"   onclick="toggleBanUser(${user.id})"><span class="material-symbols-outlined">block</span></button>`
          }
          <button class="tbl-btn tbl-btn-verify" title="${user.verified ? 'Remove verification' : 'Verify user'}" onclick="verifyUser(${user.id})"><span class="material-symbols-outlined">${user.verified ? 'verified_user' : 'verified'}</span></button>
          <button class="tbl-btn tbl-btn-delete" onclick="deleteUser(${user.id})">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// USER DETAIL MODAL
function openUserDetail(userId) {
  const user = usersState.find(u => u.id === userId);
  if (!user) return;

  const body = document.getElementById('userDetailBody');
  if (!body) return;

  body.innerHTML = `
    <div class="user-detail-avatar-row">
      <div class="user-detail-avatar">${getInitials(user.name)}</div>
      <div>
        <div style="font-family:'Manrope',sans-serif;font-size:18px;font-weight:700;color:#0A192F;">${escapeHTML(user.name)}</div>
        <div style="font-size:13px;color:#44474d;margin-top:2px;">${escapeHTML(user.email)}</div>
        <span class="status-badge badge-${user.status}" style="margin-top:6px;">${capitalize(user.status)}</span>
        ${user.verified ? '<span class="status-badge badge-verified" style="margin-top:6px;margin-left:6px;">✓ Verified</span>' : ''}
      </div>
    </div>
    <div class="user-detail-grid">
      <div class="user-detail-item"><span class="user-detail-label">University</span><span class="user-detail-value">${escapeHTML(user.university)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Student ID</span><span class="user-detail-value">${escapeHTML(user.studentId)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Phone</span><span class="user-detail-value">${escapeHTML(user.phone)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Gender</span><span class="user-detail-value">${escapeHTML(user.gender)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Joined</span><span class="user-detail-value">${escapeHTML(user.joined)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Role</span><span class="user-detail-value">Student</span></div>
    </div>
    <div style="border-top:1px solid #e0e3e5;padding-top:16px;">
      <p style="font-family:'Manrope',sans-serif;font-size:14px;font-weight:700;color:#0A192F;margin-bottom:12px;">Activity Summary</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        <div style="text-align:center;padding:12px;background:#f0f4f8;border-radius:12px;">
          <p style="font-size:22px;font-weight:800;font-family:'Manrope',sans-serif;color:#0A192F;">${user.listingCount || 0}</p>
          <p style="font-size:11px;color:#44474d;">Listings</p>
        </div>
        <div style="text-align:center;padding:12px;background:#f0f4f8;border-radius:12px;">
          <p style="font-size:22px;font-weight:800;font-family:'Manrope',sans-serif;color:#0A192F;">${user.commentCount || 0}</p>
          <p style="font-size:11px;color:#44474d;">Comments</p>
        </div>
        <div style="text-align:center;padding:12px;background:#f0f4f8;border-radius:12px;">
          <p style="font-size:22px;font-weight:800;font-family:'Manrope',sans-serif;color:#0A192F;">${user.reviewCount || 0}</p>
          <p style="font-size:11px;color:#44474d;">Reviews</p>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;">
      ${user.status === 'banned'
        ? `<button class="tbl-btn tbl-btn-unban" onclick="toggleBanUser(${user.id});closeModal('userDetailModal');" style="padding:10px 16px;font-size:13px;"><span class="material-symbols-outlined">check_circle</span> Unban User</button>`
        : `<button class="tbl-btn tbl-btn-ban"   onclick="toggleBanUser(${user.id});closeModal('userDetailModal');" style="padding:10px 16px;font-size:13px;"><span class="material-symbols-outlined">block</span> Ban User</button>`
      }
      <button class="tbl-btn tbl-btn-verify" onclick="verifyUser(${user.id});closeModal('userDetailModal');" style="padding:10px 16px;font-size:13px;"><span class="material-symbols-outlined">${user.verified ? 'verified_user' : 'verified'}</span> ${user.verified ? 'Unverify' : 'Verify'}</button>
      <button class="tbl-btn tbl-btn-delete" onclick="deleteUser(${user.id});closeModal('userDetailModal');" style="padding:10px 16px;font-size:13px;"><span class="material-symbols-outlined">delete</span> Delete</button>
    </div>
  `;

  openModal('userDetailModal');
}

// USER ACTIONS
function toggleBanUser(userId) {
  const user = usersState.find(u => u.id === userId);
  if (!user) return;
  const action = user.status === 'banned' ? 'unban' : 'ban';
  showConfirm(`${capitalize(action)} User`, `Are you sure you want to ${action} <strong>${escapeHTML(user.name)}</strong>?`, () => {
    adminPost('api/users/ban-user.php', { user_id:userId })
      .then(d => { user.status = Number(d.is_banned) ? 'banned' : 'active'; renderUsers(applyUserFilters()); showToast(`User ${action === 'ban' ? 'banned' : 'unbanned'} successfully.`, action === 'ban' ? 'warning' : 'success'); })
      .catch(err => showToast(err.message, 'error'));
  });
}

function verifyUser(userId) {
  const user = usersState.find(u => u.id === userId);
  if (!user) return;
  adminPost('api/users/give-badge.php', { user_id:userId })
    .then(d => { user.verified = !!Number(d.is_verified); renderUsers(applyUserFilters()); showToast(`${user.name} verification updated.`, 'success'); })
    .catch(err => showToast(err.message, 'error'));
}

function deleteUser(userId) {
  const user = usersState.find(u => u.id === userId);
  if (!user) return;
  showConfirm('Delete User', `Permanently delete <strong>${escapeHTML(user.name)}</strong>? This cannot be undone.`, () => {
    adminPost('api/users/delete-user.php', { user_id:userId })
      .then(() => { usersState = usersState.filter(u => u.id !== userId); renderUsers(applyUserFilters()); showToast('User deleted successfully.', 'error'); })
      .catch(err => showToast(err.message, 'error'));
  });
}

// LISTINGS GRID 
function renderListings(filtered) {
  const data  = filtered || listingsState;
  const grid  = document.getElementById('adminListingsGrid');
  const empty = document.getElementById('listingsEmpty');
  if (!grid) return;

  grid.innerHTML = '';

  if (data.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  data.forEach(listing => {
    const card = document.createElement('div');
    card.className = `admin-listing-card ${listing.status === 'pending' ? 'pending-listing' : ''}`;
    card.innerHTML = `
      <div class="admin-listing-img">
        ${listing.image
          ? `<img src="${listing.image}" alt="${escapeHTML(listing.title)}" loading="lazy"/>`
          : `<div class="admin-listing-img-placeholder"><span class="material-symbols-outlined">apartment</span></div>`
        }
        <div class="admin-listing-status-badge">
          <span class="status-badge badge-${listing.status}">${capitalize(listing.status)}</span>
        </div>
        ${listing.verified ? `<div class="admin-listing-verified-badge"><span class="status-badge badge-verified">✓ Verified</span></div>` : ''}
      </div>
      <div class="admin-listing-body">
        <div class="admin-listing-price">৳${listing.price.toLocaleString('en')}/month</div>
        <div class="admin-listing-title">${escapeHTML(listing.title)}</div>
        <div class="admin-listing-meta">
          <span class="material-symbols-outlined">location_on</span>
          ${escapeHTML(listing.area)}, ${escapeHTML(listing.district)}
        </div>
        <div class="admin-listing-meta">
          <span class="material-symbols-outlined">home</span>
          ${escapeHTML(listing.type)}
        </div>
        <div class="admin-listing-meta">
          <span class="material-symbols-outlined">person</span>
          ${escapeHTML(listing.postedBy)} • ${escapeHTML(listing.date)}
        </div>
        <div class="admin-listing-actions" style="margin-top:12px;">
          <button class="tbl-btn tbl-btn-view" onclick="openListingDetail(${listing.id})">
            <span class="material-symbols-outlined">visibility</span> View
          </button>
          ${listing.status === 'pending'
            ? `<button class="tbl-btn tbl-btn-approve" onclick="approveListing(${listing.id})"><span class="material-symbols-outlined">check_circle</span> Approve</button>
               <button class="tbl-btn tbl-btn-reject" onclick="rejectListing(${listing.id})"><span class="material-symbols-outlined">cancel</span> Reject</button>`
            : ''
          }
          <button class="tbl-btn tbl-btn-verify" onclick="verifyListing(${listing.id})"><span class="material-symbols-outlined">${listing.verified ? 'verified_user' : 'verified'}</span> ${listing.verified ? 'Unverify' : 'Verify'}</button>
          <button class="tbl-btn tbl-btn-delete" onclick="deleteListing(${listing.id})">
            <span class="material-symbols-outlined">delete</span> Delete
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openListingDetail(listingId) {
  const listing = listingsState.find(l => l.id === listingId);
  if (!listing) return;

  const body = document.getElementById('listingDetailBody');
  if (!body) return;

  body.innerHTML = `
    ${listing.image ? `<div style="margin-bottom:18px;"><img src="${listing.image}" alt="${escapeHTML(listing.title)}" style="width:100%;max-height:260px;object-fit:cover;border-radius:16px;border:1px solid #e0e3e5;"/></div>` : ''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
      <div class="user-detail-item"><span class="user-detail-label">Title</span><span class="user-detail-value">${escapeHTML(listing.title)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Status</span><span class="status-badge badge-${listing.status}" style="width:auto;display:inline-flex;white-space:nowrap;">${capitalize(listing.status)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Price</span><span class="user-detail-value">৳${listing.price.toLocaleString('en')}/month</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Type</span><span class="user-detail-value">${escapeHTML(listing.type)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">District</span><span class="user-detail-value">${escapeHTML(listing.district)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Area</span><span class="user-detail-value">${escapeHTML(listing.area)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Near University</span><span class="user-detail-value">${escapeHTML(listing.university)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Posted By</span><span class="user-detail-value">${escapeHTML(listing.postedBy)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Posted On</span><span class="user-detail-value">${escapeHTML(listing.date)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Verified</span><span class="user-detail-value">${listing.verified ? '✓ Yes' : '✗ No'}</span></div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      ${listing.status === 'pending' ? `
        <button class="tbl-btn tbl-btn-approve" onclick="approveListing(${listing.id});closeModal('listingDetailModal');" style="padding:10px 16px;font-size:13px;">
          <span class="material-symbols-outlined">check_circle</span> Approve
        </button>
        <button class="tbl-btn tbl-btn-reject" onclick="rejectListing(${listing.id});closeModal('listingDetailModal');" style="padding:10px 16px;font-size:13px;">
          <span class="material-symbols-outlined">cancel</span> Reject
        </button>` : ''
      }
      <button class="tbl-btn tbl-btn-verify" onclick="verifyListing(${listing.id});closeModal('listingDetailModal');" style="padding:10px 16px;font-size:13px;">
        <span class="material-symbols-outlined">${listing.verified ? 'verified_user' : 'verified'}</span> ${listing.verified ? 'Remove Verified Badge' : 'Give Verified Badge'}
      </button>
      <button class="tbl-btn tbl-btn-delete" onclick="deleteListing(${listing.id});closeModal('listingDetailModal');" style="padding:10px 16px;font-size:13px;">
        <span class="material-symbols-outlined">delete</span> Delete
      </button>
    </div>
  `;

  openModal('listingDetailModal');
}

function approveListing(listingId) {
  adminPost('api/listings/approve-listing.php', { listing_id:listingId })
    .then(() => { const listing = listingsState.find(l => l.id === listingId); if (listing) listing.status='published'; renderListings(applyListingFilters()); updateBadges(); showToast('Listing approved and published!', 'success'); })
    .catch(err => showToast(err.message, 'error'));
}

function rejectListing(listingId) {
  showConfirm('Reject Listing', 'Are you sure you want to reject this listing?', () => {
    adminPost('api/listings/reject-listing.php', { listing_id:listingId })
      .then(() => { const listing = listingsState.find(l => l.id === listingId); if (listing) listing.status='rejected'; renderListings(applyListingFilters()); updateBadges(); showToast('Listing has been rejected.', 'error'); })
      .catch(err => showToast(err.message, 'error'));
  });
}

function verifyListing(listingId) {
  adminPost('api/listings/give-verified-badge.php', { listing_id:listingId })
    .then(d => { const listing = listingsState.find(l => l.id === listingId); if (listing) listing.verified=!!Number(d.is_verified); renderListings(applyListingFilters()); showToast('Verified badge updated for listing!', 'success'); })
    .catch(err => showToast(err.message, 'error'));
}

function deleteListing(listingId) {
  showConfirm('Delete Listing', 'Delete this listing? It will be soft-deleted in the database.', () => {
    adminPost('api/listings/delete-listing.php', { listing_id:listingId })
      .then(() => { listingsState = listingsState.filter(l => l.id !== listingId); renderListings(applyListingFilters()); updateBadges(); showToast('Listing deleted successfully.', 'error'); })
      .catch(err => showToast(err.message, 'error'));
  });
}

// REVIEWS
function renderReviews(filtered) {
  const data  = filtered || reviewsState;
  const grid  = document.getElementById('reviewsAdminGrid');
  const empty = document.getElementById('reviewsEmpty');
  if (!grid) return;
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(360px, 1fr))';

  grid.innerHTML = '';

  if (data.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  data.forEach(review => {
    const stars = buildStars(review.stars);
    const card = document.createElement('div');
    card.className = 'review-admin-card';
    card.innerHTML = `
      <div class="review-admin-header">
        <div>
          <div class="review-admin-landlord">${escapeHTML(review.landlord)}</div>
          <div class="review-admin-property">${escapeHTML(review.property)}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
          <div class="review-admin-stars">${stars}</div>
          <span class="review-recommend-badge ${review.recommended ? 'badge-recommended' : 'badge-not-recommended'}">
            ${review.recommended ? '✓ Recommended' : '✗ Not Recommended'}
          </span>
        </div>
      </div>
      <p class="review-admin-text">${escapeHTML(review.text)}</p>
      <div class="review-admin-meta">
        <span class="review-admin-reviewer">By: ${escapeHTML(review.reviewer)}</span>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="review-admin-date">${escapeHTML(review.date)}</span>
          <span class="status-badge badge-${review.status}">${capitalize(review.status)}</span>
        </div>
      </div>
      <div class="review-admin-actions">
        ${review.status !== 'approved' ? `<button class="tbl-btn tbl-btn-approve" onclick="openReviewDetail(${review.id})"><span class="material-symbols-outlined">rule</span> Review & Approve</button>` : ''}
        <button class="tbl-btn tbl-btn-delete" onclick="deleteReview(${review.id})">
          <span class="material-symbols-outlined">delete</span> Delete
        </button>
      </div>
    `;
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => { if (e.target.closest('button')) return; openReviewDetail(review.id); });
    grid.appendChild(card);
  });
}

function openReviewDetail(id) {
  const review = reviewsState.find(r => r.id === id);
  if (!review) return;
  const body = document.getElementById('reviewDetailBody');
  if (!body) return;
  const isPending = review.status !== 'approved';
  body.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px;">
      <div class="user-detail-item"><span class="user-detail-label">Landlord Name</span><span class="user-detail-value">${escapeHTML(review.landlord)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Status</span><span class="status-badge badge-${review.status}" style="width:auto;display:inline-flex;white-space:nowrap;">${capitalize(review.status)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">District</span><span class="user-detail-value">${escapeHTML(review.district)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Recommended</span><span class="user-detail-value">${review.recommended ? 'Yes' : 'No'}</span></div>
      <div class="user-detail-item" style="grid-column:1/-1;"><span class="user-detail-label">Submitted Address</span><span class="user-detail-value">${escapeHTML(review.property)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Reviewer</span><span class="user-detail-value">${escapeHTML(review.reviewer)}</span></div>
      <div class="user-detail-item"><span class="user-detail-label">Date</span><span class="user-detail-value">${escapeHTML(review.date)}</span></div>
    </div>
    <div style="border-top:1px solid #e0e3e5;padding-top:16px;margin-bottom:16px;">
      <div style="font-family:'Manrope',sans-serif;font-weight:800;color:#0A192F;margin-bottom:8px;">Rating</div>
      <div style="display:flex;gap:4px;align-items:center;">${buildStars(review.stars)} <strong style="margin-left:8px;">${review.stars}/5</strong></div>
    </div>
    <div style="border-top:1px solid #e0e3e5;padding-top:16px;">
      <div style="font-family:'Manrope',sans-serif;font-weight:800;color:#0A192F;margin-bottom:8px;">Review</div>
      <p style="line-height:1.7;color:#475569;">${escapeHTML(review.text)}</p>
    </div>
    ${isPending ? `
      <div id="reviewAssignmentBox" style="border-top:1px solid #e0e3e5;margin-top:18px;padding-top:16px;">
        <div style="font-family:'Manrope',sans-serif;font-weight:800;color:#0A192F;margin-bottom:8px;">Add this review to an existing landlord card</div>
        <p style="font-size:12px;color:#64748b;margin-bottom:12px;line-height:1.6;">Choose a landlord and address that already exists on the Landlord Reviews page/database. Approving will attach this review to that landlord's card and recalculate the rating/statistics.</p>
        <div style="display:grid;grid-template-columns:minmax(220px,1fr) minmax(220px,1fr);gap:12px;align-items:end;">
          <div>
            <label class="user-detail-label" for="reviewLandlordSelect">Existing Landlord</label>
            <select class="settings-input" id="reviewLandlordSelect" style="width:100%;margin-top:6px;">
              <option value="">Loading landlords...</option>
            </select>
          </div>
          <div>
            <label class="user-detail-label" for="reviewAddressSelect">Existing Address</label>
            <select class="settings-input" id="reviewAddressSelect" style="width:100%;margin-top:6px;">
              <option value="">Select landlord first</option>
            </select>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
          <button class="tbl-btn tbl-btn-approve" onclick="approveReview(${review.id}, true);closeModal('reviewDetailModal');">
            <span class="material-symbols-outlined">check</span> Approve & Add to Selected Landlord
          </button>
          <button class="tbl-btn tbl-btn-view" onclick="approveReview(${review.id}, false);closeModal('reviewDetailModal');">
            <span class="material-symbols-outlined">done_all</span> Approve as Submitted
          </button>
        </div>
      </div>` : ''}
    <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;">
      <button class="tbl-btn tbl-btn-delete" onclick="deleteReview(${review.id});closeModal('reviewDetailModal');"><span class="material-symbols-outlined">delete</span> Delete</button>
    </div>
  `;
  openModal('reviewDetailModal');
  if (isPending) loadLandlordAssignmentOptions(review);
}

function loadLandlordAssignmentOptions(review) {
  const landlordSelect = document.getElementById('reviewLandlordSelect');
  const addressSelect = document.getElementById('reviewAddressSelect');
  if (!landlordSelect || !addressSelect) return;

  const populate = (options) => {
    landlordSelect.innerHTML = '<option value="">Select existing landlord</option>';
    addressSelect.innerHTML = '<option value="">Select landlord first</option>';

    options.forEach((item, index) => {
      const opt = document.createElement('option');
      opt.value = String(index);
      opt.textContent = item.landlord_name || 'Unnamed landlord';
      opt.dataset.name = item.landlord_name || '';
      landlordSelect.appendChild(opt);
    });


    landlordSelect.value = '';
    addressSelect.value = '';

    const updateAddresses = () => {
      addressSelect.innerHTML = '<option value="">Select address</option>';
      const selected = options[Number(landlordSelect.value)];
      if (!selected) {
        addressSelect.innerHTML = '<option value="">Select landlord first</option>';
        return;
      }
      (selected.addresses || []).forEach(addrItem => {
        const addr = typeof addrItem === 'string' ? { property_address: addrItem, district_id: selected.district_id || '', district: selected.district || '' } : addrItem;
        const opt = document.createElement('option');
        opt.value = addr.property_address || '';
        opt.textContent = addr.district ? `${addr.property_address} — ${addr.district}` : (addr.property_address || 'Address');
        opt.dataset.districtId = addr.district_id || '';
        opt.dataset.district = addr.district || '';
        addressSelect.appendChild(opt);
      });
      addressSelect.value = '';
    };

    landlordSelect.onchange = updateAddresses;
  };

  if (landlordReviewOptions) {
    populate(landlordReviewOptions);
    return;
  }

  fetch('api/landlord-reviews/get-landlord-options.php')
    .then(r => r.json())
    .then(data => {
      if (!data.success) throw new Error(data.error || 'Could not load landlord options.');
      landlordReviewOptions = data.landlords || [];
      populate(landlordReviewOptions);
    })
    .catch(err => {
      landlordSelect.innerHTML = '<option value="">Could not load existing landlords</option>';
      addressSelect.innerHTML = '<option value="">No address available</option>';
      showToast(err.message || 'Could not load landlord options.', 'error');
    });
}

function approveReview(id, useExistingSelection = false) {
  const payload = { review_id: id };
  if (useExistingSelection) {
    const landlordSelect = document.getElementById('reviewLandlordSelect');
    const addressSelect = document.getElementById('reviewAddressSelect');
    const selectedLandlord = landlordSelect?.selectedOptions?.[0];
    const selectedAddress = addressSelect?.selectedOptions?.[0];
    if (!selectedLandlord || landlordSelect.value === '' || !addressSelect?.value) {
      showToast('Please select an existing landlord and one of their addresses first.', 'error');
      return;
    }
    payload.landlord_name = selectedLandlord.dataset.name || selectedLandlord.textContent || '';
    payload.property_address = addressSelect.value || '';
    payload.district_id = selectedAddress?.dataset?.districtId || '';
  }

  adminPost('api/landlord-reviews/admin-approve-review.php', payload)
    .then((data) => {
      const review = reviewsState.find(r => r.id === id);
      if (review) {
        review.status = 'approved';
        if (data.review) {
          review.landlord = data.review.landlord_name || review.landlord;
          review.property = data.review.property_address || review.property;
          review.district = data.review.district || review.district;
        }
      }
      landlordReviewOptions = null;
      loadBackendAdminData();
      renderReviews(applyReviewFilters());
      showToast('Review approved and synced with landlord review cards!', 'success');
    })
    .catch(err => showToast(err.message, 'error'));
}

function featureReview(id) {
  showToast('Review featuring is not enabled for landlord reviews.', 'info');
}

function deleteReview(id) {
  showConfirm('Delete Review', 'Permanently delete this review?', () => {
    adminPost('api/landlord-reviews/admin-delete-review.php', { review_id:id })
      .then(() => { reviewsState = reviewsState.filter(r => r.id !== id); renderReviews(applyReviewFilters()); showToast('Review deleted.', 'error'); })
      .catch(err => showToast(err.message, 'error'));
  });
}

// FEEDBACK 
function renderFeedback(filtered) {
  const data  = filtered || feedbackState;
  const grid  = document.getElementById('feedbackAdminGrid');
  const empty = document.getElementById('feedbackEmpty');
  if (!grid) return;

  grid.innerHTML = '';

  if (data.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  data.forEach(fb => {
    const stars = buildStars(fb.rating);
    const card = document.createElement('div');
    card.className = `feedback-admin-card ${fb.featured ? 'featured-feedback' : ''}`;
    card.innerHTML = `
      <div class="feedback-admin-header">
        <div class="feedback-admin-topic">${escapeHTML(fb.topic)}</div>
        <div class="feedback-admin-rating">${stars}</div>
      </div>
      <p class="feedback-admin-desc">${escapeHTML(fb.desc)}</p>
      <div class="feedback-admin-meta">
        <span class="feedback-admin-user">By: ${escapeHTML(fb.user)}</span>
        <span class="feedback-admin-date">${escapeHTML(fb.date)}</span>
      </div>
      <div class="feedback-feature-toggle">
        <label class="feature-toggle">
          <input type="checkbox" ${fb.featured ? 'checked' : ''} onchange="toggleFeatureFeedback(${fb.id}, this.checked)"/>
          <span class="feature-slider"></span>
        </label>
        <span>Feature on Homepage</span>
        ${fb.featured ? '<span style="font-size:10px;font-weight:700;color:#F59E0B;">⭐ Featured</span>' : ''}
      </div>
      <div class="feedback-admin-actions">
        <button class="tbl-btn tbl-btn-delete" onclick="deleteFeedback(${fb.id})">
          <span class="material-symbols-outlined">delete</span> Delete
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function toggleFeatureFeedback(id, featured) {
  adminPost('api/feedback/toggle-featured.php', { feedback_id:id })
    .then(d => { const fb = feedbackState.find(f => f.id === id); if (fb) fb.featured = !!Number(d.is_featured); renderFeedback(applyFeedbackFilters()); showToast((fb?.featured) ? 'Feedback featured on homepage!' : 'Feedback unfeatured.', (fb?.featured) ? 'success' : 'info'); })
    .catch(err => showToast(err.message, 'error'));
}

function deleteFeedback(id) {
  showConfirm('Delete Feedback', 'Permanently delete this feedback message?', () => {
    adminPost('api/feedback/delete-feedback.php', { feedback_id:id })
      .then(() => { feedbackState = feedbackState.filter(f => f.id !== id); renderFeedback(applyFeedbackFilters()); showToast('Feedback deleted.', 'error'); })
      .catch(err => showToast(err.message, 'error'));
  });
}

// REPORTS 
function renderReports(filtered) {
  const data  = filtered || reportsState;
  const grid  = document.getElementById('reportsGrid');
  const empty = document.getElementById('reportsEmpty');
  if (!grid) return;

  grid.innerHTML = '';

  if (data.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  data.forEach(report => {
    const card = document.createElement('div');
    card.className = `report-card report-${report.status}`;
    card.innerHTML = `
      <div class="report-card-header">
        <div class="report-card-title">${escapeHTML(report.title)}</div>
        <span class="report-category-badge">${formatCategory(report.category)}</span>
      </div>
      <p class="report-desc">${escapeHTML(report.desc)}</p>
      <div class="report-meta">
        <span class="report-by">By: ${escapeHTML(report.reportedBy)}</span>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="report-date">${escapeHTML(report.date)}</span>
          <span class="status-badge badge-${report.status}">${capitalize(report.status.replace('_', ' '))}</span>
        </div>
      </div>
      <div class="report-actions">
        ${report.status !== 'resolved' ? `<button class="tbl-btn tbl-btn-resolve" onclick="resolveReport(${report.id})"><span class="material-symbols-outlined">check_circle</span> Resolve</button>` : ''}
        <button class="tbl-btn tbl-btn-reply" onclick="openReplyModal(${report.id})">
          <span class="material-symbols-outlined">reply</span> Reply
        </button>
        <button class="tbl-btn tbl-btn-delete" onclick="deleteReport(${report.id})">
          <span class="material-symbols-outlined">delete</span> Delete
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function resolveReport(id) {
  adminPost('api/reports/update-report-status.php', { report_id:id, status:'resolved' })
    .then(() => { const report = reportsState.find(r => r.id === id); if (report) report.status='resolved'; renderReports(applyReportFilters()); updateBadges(); showToast('Report marked as resolved.', 'success'); })
    .catch(err => showToast(err.message, 'error'));
}

function openReplyModal(reportId) {
  const replyBtn = document.getElementById('sendReplyBtn');
  if (replyBtn) {
    replyBtn.onclick = () => {
      const text = document.getElementById('replyText').value.trim();
      if (!text) { showToast('Please write a reply first.', 'error'); return; }
      adminPost('api/reports/reply-report.php', { report_id:reportId, reply:text })
        .then(() => { const report = reportsState.find(r => r.id === reportId); if (report) report.status='resolved'; renderReports(applyReportFilters()); updateBadges(); closeModal('replyModal'); document.getElementById('replyText').value = ''; showToast('Reply sent to user as a notification!', 'success'); })
        .catch(err => showToast(err.message, 'error'));
    };
  }
  openModal('replyModal');
}

function deleteReport(id) {
  showConfirm('Delete Report', 'Permanently delete this report?', () => {
    adminPost('api/reports/delete-report.php', { report_id:id })
      .then(() => { reportsState = reportsState.filter(r => r.id !== id); renderReports(applyReportFilters()); updateBadges(); showToast('Report deleted.', 'error'); })
      .catch(err => showToast(err.message, 'error'));
  });
}

// FULL ACTIVITY FEED 
function renderFullActivity(filter) {
  const feed = document.getElementById('fullActivityFeed');
  if (!feed) return;

  let data = ADMIN_DATA.activity;
  if (filter && filter !== 'all') {
    data = data.filter(item => item.type === filter || 
      (filter === 'comments' && item.type === 'comment') ||
      (filter === 'connections' && item.type === 'connect'));
  }

  const visible = data.slice(0, activityVisible);
  feed.innerHTML = '';

  visible.forEach(item => {
    feed.appendChild(buildActivityItem(item));
  });

  const loadMoreBtn = document.getElementById('loadMoreActivity');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = activityVisible >= data.length ? 'none' : 'flex';
  }
}

function initActivityFilter() {
  document.querySelectorAll('.activity-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.activity-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activityVisible = 10;
      renderFullActivity(tab.getAttribute('data-filter'));
    });
  });

  const loadMore = document.getElementById('loadMoreActivity');
  if (loadMore) {
    loadMore.addEventListener('click', () => {
      activityVisible += 5;
      const activeTab = document.querySelector('.activity-tab.active');
      const filter = activeTab ? activeTab.getAttribute('data-filter') : 'all';
      renderFullActivity(filter);
    });
  }
}

// FILTERS
function initFilters() {
  // Users
  ['userSearch','userUniversityFilter','userGenderFilter','userStatusFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => renderUsers(applyUserFilters()));
  });
  const resetUser = document.getElementById('resetUserFilters');
  if (resetUser) resetUser.addEventListener('click', () => {
    ['userSearch','userUniversityFilter','userGenderFilter','userStatusFilter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    renderUsers();
  });

  // Listings
  ['listingSearch','listingDistrictFilter','listingStatusFilter','listingTypeFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => renderListings(applyListingFilters()));
  });
  const resetListing = document.getElementById('resetListingFilters');
  if (resetListing) resetListing.addEventListener('click', () => {
    ['listingSearch','listingDistrictFilter','listingStatusFilter','listingTypeFilter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    renderListings();
  });

  // Reviews
  ['reviewSearch','reviewDistrictFilter','reviewStarFilter','reviewStatusFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => renderReviews(applyReviewFilters()));
  });
  const resetReview = document.getElementById('resetReviewFilters');
  if (resetReview) resetReview.addEventListener('click', () => {
    ['reviewSearch','reviewDistrictFilter','reviewStarFilter','reviewStatusFilter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    renderReviews();
  });

  // Feedback
  ['feedbackSearch','feedbackStarFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => renderFeedback(applyFeedbackFilters()));
  });
  const resetFeedback = document.getElementById('resetFeedbackFilters');
  if (resetFeedback) resetFeedback.addEventListener('click', () => {
    ['feedbackSearch','feedbackStarFilter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    renderFeedback();
  });

  // Reports
  ['reportSearch','reportCategoryFilter','reportStatusFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => renderReports(applyReportFilters()));
  });
  const resetReport = document.getElementById('resetReportFilters');
  if (resetReport) resetReport.addEventListener('click', () => {
    ['reportSearch','reportCategoryFilter','reportStatusFilter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    renderReports();
  });

  // Activity tabs
  initActivityFilter();
}

// FILTER APPLY FUNCTIONS 
function applyUserFilters() {
  const search    = (document.getElementById('userSearch')?.value || '').toLowerCase();
  const uni       = document.getElementById('userUniversityFilter')?.value || '';
  const gender    = document.getElementById('userGenderFilter')?.value || '';
  const statusF   = document.getElementById('userStatusFilter')?.value || '';

  return usersState.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search) || u.studentId.toLowerCase().includes(search);
    const matchUni    = !uni    || u.university === uni || u.university.includes(uni) || uni.includes(u.university);
    const matchGender = !gender || u.gender === gender;
    const matchStatus = !statusF || u.status === statusF || (statusF === 'verified' && u.verified);
    return matchSearch && matchUni && matchGender && matchStatus;
  });
}

function applyListingFilters() {
  const search    = (document.getElementById('listingSearch')?.value || '').toLowerCase();
  const district  = document.getElementById('listingDistrictFilter')?.value || '';
  const status    = document.getElementById('listingStatusFilter')?.value || '';
  const type      = document.getElementById('listingTypeFilter')?.value || '';

  return listingsState.filter(l => {
    const matchSearch   = !search   || l.title.toLowerCase().includes(search) || l.area.toLowerCase().includes(search);
    const matchDistrict = !district || l.district === district;
    const matchStatus   = !status   || l.status === status;
    const matchType     = !type     || l.type === type;
    return matchSearch && matchDistrict && matchStatus && matchType;
  });
}

function applyReviewFilters() {
  const search   = (document.getElementById('reviewSearch')?.value || '').toLowerCase();
  const district = document.getElementById('reviewDistrictFilter')?.value || '';
  const stars    = document.getElementById('reviewStarFilter')?.value || '';
  const status   = document.getElementById('reviewStatusFilter')?.value || '';

  return reviewsState.filter(r => {
    const matchSearch   = !search   || r.landlord.toLowerCase().includes(search) || r.property.toLowerCase().includes(search);
    const matchDistrict = !district || r.district === district;
    const matchStars    = !stars    || r.stars >= parseInt(stars, 10);
    const matchStatus   = !status   || r.status === status;
    return matchSearch && matchDistrict && matchStars && matchStatus;
  });
}

function applyFeedbackFilters() {
  const search = (document.getElementById('feedbackSearch')?.value || '').toLowerCase();
  const stars  = document.getElementById('feedbackStarFilter')?.value || '';

  return feedbackState.filter(f => {
    const matchSearch = !search || f.topic.toLowerCase().includes(search) || f.desc.toLowerCase().includes(search) || f.user.toLowerCase().includes(search);
    const matchStars  = !stars  || f.rating >= parseInt(stars, 10);
    return matchSearch && matchStars;
  });
}

function applyReportFilters() {
  const search   = (document.getElementById('reportSearch')?.value || '').toLowerCase();
  const category = document.getElementById('reportCategoryFilter')?.value || '';
  const status   = document.getElementById('reportStatusFilter')?.value || '';

  return reportsState.filter(r => {
    const matchSearch   = !search   || r.title.toLowerCase().includes(search) || r.desc.toLowerCase().includes(search);
    const matchCategory = !category || r.category === category;
    const matchStatus   = !status   || r.status === status;
    return matchSearch && matchCategory && matchStatus;
  });
}

// GLOBAL SEARCH 
function initGlobalSearch() {
  const input = document.getElementById('globalSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) return;
    if (q.length > 2) {
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = input.value.toLowerCase().trim();
      if (q) showToast(`Searching for: "${input.value}"`, 'info');
    }
  });
}

// BADGES 
function updateBadges() {
  const pendingCount = listingsState.filter(l => l.status === 'pending').length;
  const reportCount  = reportsState.filter(r => r.status === 'new').length;

  const pendingBadge = document.getElementById('pendingBadge');
  const reportBadge  = document.getElementById('reportBadge');

  if (pendingBadge) pendingBadge.textContent = pendingCount;
  if (reportBadge)  reportBadge.textContent  = reportCount;
}

// MODALS 
function initModals() {
  // Close buttons
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.getAttribute('data-close'));
    });
  });

  // Click outside to close
  document.querySelectorAll('.modal-overlay-admin').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay-admin.open').forEach(m => {
        closeModal(m.id);
      });
    }
  });
}

function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// CONFIRM MODAL
function showConfirm(title, message, onConfirm) {
  const titleEl   = document.getElementById('confirmTitle');
  const messageEl = document.getElementById('confirmMessage');
  const yesBtn    = document.getElementById('confirmYesBtn');

  if (titleEl)   titleEl.textContent   = title;
  if (messageEl) messageEl.innerHTML   = message;

  pendingConfirmCallback = onConfirm;

  if (yesBtn) {
    yesBtn.onclick = () => {
      closeModal('confirmModal');
      if (pendingConfirmCallback) {
        pendingConfirmCallback();
        pendingConfirmCallback = null;
      }
    };
  }

  openModal('confirmModal');
}

// SETTINGS 
function initSettings() {
  fetch('api/admin/get-settings.php').then(r=>r.json()).then(d=>{
    if (!d.success || !d.settings) return; const st=d.settings;
    const set=(id,val)=>{ const el=document.getElementById(id); if(el) { if(el.type==='checkbox') el.checked=!!Number(val); else el.value=val || ''; } };
    set('siteName', st.site_name); set('siteTagline', st.tagline); set('supportEmail', st.support_email);
    set('facebookUrl', st.social_facebook); set('instagramUrl', st.social_instagram); set('twitterUrl', st.social_twitter); set('maintenanceToggle', st.maintenance_mode);
  }).catch(()=>null);

  const savePlatform = document.getElementById('savePlatformSettings');
  if (savePlatform) {
    savePlatform.addEventListener('click', () => {
      adminPost('api/admin/save-settings.php', {
        site_name: document.getElementById('siteName')?.value || 'BashaBari',
        tagline: document.getElementById('siteTagline')?.value || '',
        support_email: document.getElementById('supportEmail')?.value || '',
        social_facebook: document.getElementById('facebookUrl')?.value || '',
        social_instagram: document.getElementById('instagramUrl')?.value || '',
        social_twitter: document.getElementById('twitterUrl')?.value || '',
        maintenance_mode: document.getElementById('maintenanceToggle')?.checked ? '1' : '0'
      }).then(() => showToast('Platform settings saved successfully!', 'success')).catch(err => showToast(err.message, 'error'));
    });
  }

  const changePassword = document.getElementById('changePasswordBtn');
  if (changePassword) {
    changePassword.addEventListener('click', () => {
      const current  = document.getElementById('currentPassword')?.value;
      const newPass  = document.getElementById('newPassword')?.value;
      const confirm  = document.getElementById('confirmNewPassword')?.value;
      if (!current || !newPass || !confirm) { showToast('Please fill in all password fields.', 'error'); return; }
      if (newPass !== confirm) { showToast('New passwords do not match.', 'error'); return; }
      if (newPass.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
      adminPost('api/admin/change-admin-password.php', { current_password:current, new_password:newPass, confirm_new_password:confirm })
        .then(() => { ['currentPassword','newPassword','confirmNewPassword'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; }); showToast('Admin password updated successfully!', 'success'); })
        .catch(err => showToast(err.message, 'error'));
    });
  }

  const maintenanceToggle = document.getElementById('maintenanceToggle');
  if (maintenanceToggle) {
    maintenanceToggle.addEventListener('change', () => {
      const isOn = maintenanceToggle.checked;
      showToast(isOn ? 'Maintenance mode enabled.' : 'Maintenance mode disabled.', isOn ? 'warning' : 'success');
    });
  }
}

// TOAST 
function showToast(message, type = 'success', duration = 3500) {
  const container = document.getElementById('adminToastContainer');
  if (!container) return;

  const icons = { success: 'check_circle', error: 'error', info: 'info', warning: 'warning' };
  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined">${icons[type] || 'info'}</span>
    <span>${escapeHTML(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// HELPERS 
function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

function escapeHTML(str) {
  if (!str && str !== 0) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function buildStars(count) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="material-symbols-outlined" style="font-size:14px;color:${i <= count ? '#F59E0B' : '#e0e3e5'};font-variation-settings:'FILL' 1;">star</span>`;
  }
  return html;
}

function formatCategory(cat) {
  const map = {
    listings: 'House Listing',
    roommate: 'Roommate',
    technical_issue: 'Tech Issue',
    comment: 'Comment',
    user: 'User',
  };
  return map[cat] || capitalize(cat);
}

window.switchSection    = switchSection;
window.openUserDetail   = openUserDetail;
window.openListingDetail = openListingDetail;
window.toggleBanUser    = toggleBanUser;
window.verifyUser       = verifyUser;
window.deleteUser       = deleteUser;
window.approveListing   = approveListing;
window.rejectListing    = rejectListing;
window.verifyListing    = verifyListing;
window.deleteListing    = deleteListing;
window.openReviewDetail = openReviewDetail;
window.approveReview    = approveReview;
window.featureReview    = featureReview;
window.deleteReview     = deleteReview;
window.toggleFeatureFeedback = toggleFeatureFeedback;
window.deleteFeedback   = deleteFeedback;
window.resolveReport    = resolveReport;
window.openReplyModal   = openReplyModal;
window.deleteReport     = deleteReport;
window.openModal        = openModal;
window.closeModal       = closeModal;