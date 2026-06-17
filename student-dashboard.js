
(function () {
  'use strict';

  const districtAreas = {
    Dhaka: ['Mirpur', 'Uttara', 'Badda', 'Dhanmondi', 'Mohammadpur', 'Gulshan', 'Banani', 'Bashundhara', 'Rayer Bazar', 'Shyamoli', 'Kalabagan', 'Farmgate', 'Tejgaon'],
    Chittagong: ['Agrabad', 'Nasirabad', 'Halishahar', 'Panchlaish', 'Khulshi', 'GEC Circle'],
    Sylhet: ['Zindabazar', 'Ambarkhana', 'Subhanighat', 'Shahjalal Upashahar'],
    Rajshahi: ['Boalia', 'Motihar', 'Shaheb Bazar', 'Sapura'],
    Khulna: ['Sonadanga', 'Boyra', 'Khan Jahan Ali', 'Khalishpur'],
    Barishal: ['Sadar', 'Nalchity', 'Wazirpur'],
    Rangpur: ['Modern More', 'Dhap', 'Jahaz Company More'],
    Mymensingh: ['Ganginarpar', 'Maskanda', 'Chorpara']
  };

  // STATE 
  let state = {
    currentUser: null,
    listings: [],
    favorites: [],
    connections: [],
    connectionRequests: [],
    comments: [],
    landlordReviews: [],
    notifications: [],
    conversations: [],
    roommateProfileToggle: false,
    roommateProfile: null,
    currentEditListingId: null,
    currentDeleteListingId: null,
    activeConvId: null,
    uploadedImages: [],
    createListingStep: 1,
    createListingData: {},
    settings: {},
    connectionTab: 'connected',
    editImageFile: null,
    editImageRemove: false
  };

  // INIT 
  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    checkAuth();
    if (state.currentUser) {
      initDashboard();
    }
  });

  // AUTH CHECK 
  function checkAuth() {
    const sessionUser = window.CURRENT_USER || null;
    const stored = localStorage.getItem('bashabari_user');
    try {
      state.currentUser = sessionUser || (stored ? JSON.parse(stored) : null);
    } catch (e) { state.currentUser = sessionUser; }
    if (state.currentUser) {
      if (state.currentUser.full_name && !state.currentUser.name) state.currentUser.name = state.currentUser.full_name;
      localStorage.setItem('bashabari_user', JSON.stringify(state.currentUser));
      if (state.currentUser.role === 'admin') { window.location.href = 'admin-dashboard.php'; return; }
      document.getElementById('dashboardLayout').style.display = 'flex';
    } else {
      showAuthGuard();
    }
  }

  function showAuthGuard() {
    document.getElementById('authGuard').style.display = 'flex';
    document.getElementById('dashboardLayout').style.display = 'none';
  }

  // LOAD PERSISTED STATE 
  function loadState() {
    state.listings = [];
    state.favorites = [];
    state.connections = [];
    state.connectionRequests = [];
    state.comments = [];
    state.landlordReviews = [];
    state.notifications = [];
    state.conversations = [];
  }

  function saveState() {
    const toSave = {
      listings: state.listings,
      favorites: state.favorites,
      connections: state.connections,
      connectionRequests: state.connectionRequests,
      comments: state.comments,
      landlordReviews: state.landlordReviews,
      notifications: state.notifications,
      conversations: state.conversations,
      roommateProfileToggle: state.roommateProfileToggle,
      roommateProfile: state.roommateProfile,
      settings: state.settings
    };
    localStorage.setItem('bb_dashboard_state', JSON.stringify(toSave));
  }

  function csrfToken() { return document.querySelector('meta[name="csrf-token"]')?.content || ''; }

  function apiJSON(url, options = {}) {
    return fetch(url, options).then(r => r.json().then(data => {
      if (!r.ok || data.success === false) { const err = new Error(data.error || 'Request failed'); err.status = r.status; throw err; }
      return data;
    }));
  }

  function mapListing(l) {
    return {
      id: String(l.id),
      title: l.title,
      district: l.district || '',
      area: l.area || '',
      district_id: l.district_id || null,
      area_id: l.area_id || null,
      university_id: l.university_id || null,
      university: l.university || '',
      rent: Number(l.rent_price || l.price || 0),
      type: l.property_type_label || l.property_type || '',
      property_type: l.property_type || '',
      distance: l.distance_value || '',
      transit: l.distance_unit || '',
      availableFrom: l.available_from || '',
      description: l.description || '',
      amenities: l.amenities || [],
      images: l.images || [l.image_path || 'uploads/listings/placeholder.jpg'],
      status: l.status || 'pending',
      phoneHidden: !!Number(l.phone_hidden),
      verified: !!Number(l.is_verified),
      postedDate: l.created_at || ''
    };
  }

  function mapFavorite(l) {
    return { id: String(l.id), title: l.title, district: l.district || '', area: l.area || '', university: l.university || '', rent: Number(l.rent_price || l.price || 0), image: l.image_path || (l.images && l.images[0]) || 'uploads/listings/placeholder.jpg', distance: `${l.distance_value || ''} ${l.distance_unit || ''}`.trim() };
  }

  function renderDashboardData() {
    updateStats();
    renderOverview();
    renderMyListings();
    renderFavorites();
    renderConnections();
    renderConnectionRequests();
    renderNotifications();
    renderActivityLog();
    renderRoommateProfile();
  }

  function loadBackendStudentData() {
    const uid = state.currentUser?.id || window.CURRENT_USER?.id;
    state.comments = [];
    const jobs = [];

    jobs.push(apiJSON('api/listings/get-my-listings.php').then(d => {
      state.listings = (d.listings || []).map(mapListing);
      return Promise.all(state.listings.map(l => apiJSON(`api/comments/get-comments.php?listing_id=${encodeURIComponent(l.id)}`).then(c => {
        (c.comments || []).forEach(cm => { if (String(cm.user_id) === String(uid)) state.comments.push({ id:String(cm.id), listingTitle:l.title, text:cm.comment_text || cm.text, date:cm.created_at }); });
      }).catch(()=>null)));
    }).catch(()=>null));

    jobs.push(apiJSON('api/favorites/get-favorites.php').then(d => { state.favorites = (d.listings || d.favorites || []).map(mapFavorite); }).catch(()=>null));
    jobs.push(apiJSON('api/connections/get-connections.php').then(d => { state.connections = (d.connections || []).map(c => ({ id:String(c.connection_id || c.id), name:c.other_user?.name || c.name, university:c.other_user?.university || c.university || '', profile_picture:c.other_user?.profile_picture || c.profile_picture || '' })); }).catch(()=>null));
    jobs.push(apiJSON('api/connections/get-requests.php').then(d => { state.connectionRequests = (d.requests || []).map(r => ({ id:String(r.request_id || r.id), sender_id:r.sender_id, receiver_id:r.receiver_id, direction:r.direction || 'incoming', name:r.other_user?.name || r.sender?.name || r.name, university:r.other_user?.university || r.sender?.university || r.university || '', status:'pending', other_user:r.other_user || r.sender || {}, tags:r.other_user?.tags || [], preferred_areas:r.other_user?.preferred_areas || [] })); }).catch(()=>null));
    jobs.push(apiJSON('api/notifications/get-notifications.php').then(d => { state.notifications = (d.notifications || []).map(n => ({ id:String(n.id), type:n.type === 'connection' ? 'connections' : (n.type === 'comment' ? 'comments' : n.type), message:n.message, date:n.created_at, read:!!Number(n.is_read) })); }).catch(()=>null));
    jobs.push(apiJSON('api/messages/get-conversations.php').then(d => { state.conversations = (d.conversations || []).map(c => ({ id:String(c.connection_id), name:c.other_user?.name || 'Student', type:c.source === 'listing' ? 'listing' : 'connection', lastMsg:c.last_message?.message_text || (c.last_message?.image_path ? '📷 Image' : ''), lastTime:c.last_message?.created_at || c.created_at, unread:Number(c.unread_count) > 0, unread_count:Number(c.unread_count || 0) })); }).catch(()=>null));
    jobs.push(apiJSON('api/roommates/get-my-profile.php').then(d => {
      const p = d.profile;
      if (p) { state.roommateProfile = { budget: `৳${p.budget_min || ''}–${p.budget_max || ''}`, budget_min:p.budget_min, budget_max:p.budget_max, district:p.district || '', areas:p.preferred_areas || [], month:String(p.move_in_month || ''), year:String(p.move_in_year || ''), description:p.description || '', tags:p.tags || [] }; state.roommateProfileToggle = !!Number(p.is_published); syncToggleStates(); }
    }).catch(()=>null));
    if (uid) jobs.push(apiJSON(`api/landlord-reviews/get-reviews.php?user_id=${encodeURIComponent(uid)}&limit=50`).then(d => { state.landlordReviews = (d.reviews || []).map(r => ({ id:String(r.id), landlordName:r.landlord_name, address:r.property_address, rating:Number(r.star_rating), text:r.review_text || '', date:r.created_at })); }).catch(()=>null));

    Promise.all(jobs).then(renderDashboardData);
  }

 
  function initDashboard() {
    updateSidebarUserInfo();
    updateStats();
    bindNavigation();
    bindSidebarActions();
    bindCreateListingModal();
    bindEditDeleteModal();
    bindReportModal();
    bindSettingsSection();
    bindRoommateProfileForm();
    bindActivityTabs();
    bindNotificationFilters();
    bindConnectionsSection();
    bindMobileSidebar();
    bindRoommateViewModalClose();
    bindToggleSyncs();
    renderAllSections();
    ensureStudentListingDetailModal();
    loadBackendStudentData();
    const qs = new URLSearchParams(window.location.search);
    if (qs.get('section')) setTimeout(() => navigateTo(qs.get('section')), 150);
    if (qs.get('open_create_listing') === '1') setTimeout(() => { navigateTo('my-listings'); openCreateListingModal(); }, 350);
  }

  // UPDATE SIDEBAR USER INFO 
  function updateSidebarUserInfo() {
    const u = state.currentUser;
    if (!u) return;
    const initials = getInitials(u.name || 'User');
    setTextSafe('sidebarName', u.name || 'Student');
    setTextSafe('sidebarEmail', u.email || '');
    setTextSafe('sidebarUniv', u.university || '');
    setTextSafe('sidebarAvatar', initials);
    setTextSafe('welcomeHeading', `Welcome back, ${(u.name || 'Student').split(' ')[0]}!`);
    setTextSafe('profilePicInitials', initials);

    // Pre-fill settings
    const nameEl = document.getElementById('settings_name');
    const phoneEl = document.getElementById('settings_phone');
    const emailEl = document.getElementById('settings_email');
    if (nameEl) nameEl.value = u.name || u.full_name || '';
    if (emailEl) emailEl.value = u.email || '';
    if (phoneEl) phoneEl.value = u.phone || '';
  }

  // NAVIGATION 
  function bindNavigation() {
    document.querySelectorAll('.dash-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        navigateTo(section);

        
        closeMobileSidebar();
      });
    });

    // Btn See All links
    document.querySelectorAll('.btn-see-all').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo(btn.dataset.section);
      });
    });

    // Message btn from connections
    document.addEventListener('click', e => {
      if (e.target.closest('.btn-msg-conn')) {
        const connId = e.target.closest('.btn-msg-conn').dataset.connId;
        navigateTo('messages');
        setTimeout(() => window.BashaBariMessages?.openConversation(connId), 300);
      }
    });
  }

  function navigateTo(sectionName) {
    // Deactivate all nav items
    document.querySelectorAll('.dash-nav-item').forEach(b => b.classList.remove('active'));
    // Activate matching nav item
    const navItem = document.querySelector(`.dash-nav-item[data-section="${sectionName}"]`);
    if (navItem) navItem.classList.add('active');

    // Hide all sections
    document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
    // Show target section
    const section = document.getElementById(`section-${sectionName}`);
    if (section) section.classList.add('active');

    // Render section content
    renderSection(sectionName);
  }

  function renderSection(name) {
    switch (name) {
      case 'overview': renderOverview(); break;
      case 'my-listings': renderMyListings(); break;
      case 'favorites': renderFavorites(); break;
      case 'connections': renderConnections(); break;
      case 'messages': renderMessages(); break;
      case 'roommate-profile': renderRoommateProfile(); break;
      case 'activity-log': loadBackendStudentData(); renderActivityLog(); break;
      case 'notifications': renderNotifications(); break;
      case 'settings': renderSettings(); break;
    }
  }

  function renderAllSections() {
    renderOverview();
  }

  // RENDER OVERVIEW 
  function renderOverview() {
    updateStats();
    renderFavoritesScroll();
    renderOverviewComments();
    renderConnectionRequests();
   
    syncToggleStates();
  }

  function updateStats() {
    const published = state.listings.filter(l => l.status === 'published').length;
    const total = state.listings.length;
    setTextSafe('statListings', total);
    setTextSafe('statFavorites', state.favorites.length);
    setTextSafe('statConnections', state.connections.length);
    setTextSafe('statReviews', state.landlordReviews.length);

    // Update badges
    setTextSafe('listingsBadge', total);
    setTextSafe('favBadge', state.favorites.length);
    setTextSafe('connBadge', state.connections.length);

    const unreadNotifs = state.notifications.filter(n => !n.read).length;
    setTextSafe('notifBadge', unreadNotifs || '');

    const unreadMsgs = state.conversations.filter(c => c.unread).length;
    setTextSafe('msgBadge', unreadMsgs || '');
  }

  function renderFavoritesScroll() {
    const track = document.getElementById('favScrollTrack');
    if (!track) return;

    if (!state.favorites.length) {
      track.innerHTML = `<div class="empty-state" style="padding:20px;"><span class="material-symbols-outlined">favorite_border</span><p>No favorites yet</p></div>`;
      return;
    }

    track.innerHTML = state.favorites.map(fav => `
      <div class="fav-scroll-card" onclick="navigateToSection('favorites')">
        <img src="${fav.image}" alt="${escHtml(fav.title)}" class="fav-scroll-img" onerror="this.src='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'"/>
        <div class="fav-scroll-info">
          <div class="fav-scroll-title">${escHtml(fav.title)}</div>
          <div class="fav-scroll-price">৳${fav.rent.toLocaleString()}/mo</div>
        </div>
      </div>
    `).join('');
  }

  function renderOverviewComments() {
    const list = document.getElementById('overviewCommentsList');
    if (!list) return;

    if (!state.comments.length) {
      list.innerHTML = `<div style="color:#94a3b8;font-size:13px;text-align:center;padding:20px;">No comments yet</div>`;
      return;
    }

    list.innerHTML = state.comments.slice(0, 4).map(c => `
      <div class="comment-item-card" data-comment-id="${c.id}">
        <div class="comment-item-listing">${escHtml(c.listingTitle)}</div>
        <div class="comment-item-text">${escHtml(c.text)}</div>
        <div class="comment-item-time">${formatRelativeTime(c.date)}</div>
      </div>
    `).join('');
  }

  function renderConnectionRequests() {
    const list = document.getElementById('connectionRequestsList');
    const countEl = document.getElementById('reqCount');
    if (!list) return;

    const pending = state.connectionRequests.filter(r => r.status === 'pending' && r.direction !== 'outgoing');
    if (countEl) countEl.textContent = `${pending.length} pending`;

    if (!pending.length) {
      list.innerHTML = `<div style="color:#94a3b8;font-size:13px;text-align:center;padding:20px;">No pending requests</div>`;
      return;
    }

    list.innerHTML = pending.map(req => `
      <div class="conn-req-card" data-req-id="${req.id}">
        <div class="conn-req-left">
          <div class="conn-req-avatar" onclick="viewRoommateProfile('${req.id}')">${getInitials(req.name)}</div>
          <div>
            <div class="conn-req-name">${escHtml(req.name)}</div>
            <div class="conn-req-univ">${escHtml(req.university)}</div>
          </div>
        </div>
        <div class="conn-req-btns">
          <button class="btn-accept" onclick="acceptConnection('${req.id}')">Accept</button>
          <button class="btn-decline" onclick="declineConnection('${req.id}')">Decline</button>
        </div>
      </div>
    `).join('');
  }

  // RENDER MY LISTINGS 
  function renderMyListings() {
    const grid = document.getElementById('myListingsGrid');
    if (!grid) return;

    if (!state.listings.length) {
      grid.innerHTML = `<div class="empty-state"><span class="material-symbols-outlined">home_work</span><h4>No listings yet</h4><p>Create your first listing to get started</p></div>`;
      return;
    }

    grid.innerHTML = state.listings.map(listing => buildListingCard(listing)).join('');
    grid.querySelectorAll('.my-listing-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.my-listing-actions') || e.target.closest('.toggle-switch') || e.target.closest('button')) return;
        openStudentListingDetail(card.dataset.listingId, true);
      });
    });
  }

  function buildListingCard(listing) {
    const imgSrc = listing.images && listing.images.length ? listing.images[0] : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600';

    return `
      <div class="my-listing-card" id="listing-card-${listing.id}" data-listing-id="${listing.id}" style="cursor:pointer;">
        <div class="my-listing-img-wrap">
          <img src="${imgSrc}" alt="${escHtml(listing.title)}" class="my-listing-img" onerror="this.src='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600'"/>
          <div class="status-badge ${listing.status}">${listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}</div>
          <div class="my-listing-price">৳${Number(listing.rent).toLocaleString()}/mo</div>
        </div>
        <div class="my-listing-body">
          <div class="my-listing-title">${escHtml(listing.title)}</div>
          <div class="my-listing-location">
            <span class="material-symbols-outlined">location_on</span>
            ${escHtml(listing.area)}, ${escHtml(listing.district)}
          </div>
          <div class="phone-visibility-wrap">
            <div class="phone-visibility-label">
              <strong>Phone Number Visibility</strong>
              ${listing.phoneHidden ? 'Hidden from all users' : 'Visible to logged-in users'}
            </div>
            <label class="toggle-switch" style="width:36px;height:20px;">
              <input type="checkbox" ${!listing.phoneHidden ? 'checked' : ''} onchange="togglePhoneVisibility('${listing.id}', this.checked)"/>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="my-listing-actions">
            <button class="btn-edit-listing" onclick="openEditListing('${listing.id}')">
              <span class="material-symbols-outlined">edit</span> Edit
            </button>
            <button class="btn-delete-listing" onclick="openDeleteConfirm('${listing.id}')">
              <span class="material-symbols-outlined">delete</span> Delete
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // RENDER FAVORITES 
  function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    if (!grid) return;

    if (!state.favorites.length) {
      grid.innerHTML = `<div class="empty-state"><span class="material-symbols-outlined">favorite_border</span><h4>No favorites saved</h4><p>Browse listings and click ❤️ to save them here</p></div>`;
      return;
    }

    grid.innerHTML = state.favorites.map(fav => `
      <div class="my-listing-card" style="cursor:pointer;" onclick="openStudentListingDetail('${fav.id}', false)">
        <div class="my-listing-img-wrap">
          <img src="${fav.image}" alt="${escHtml(fav.title)}" class="my-listing-img" onerror="this.src='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600'"/>
          <div class="my-listing-price">৳${Number(fav.rent).toLocaleString()}/mo</div>
        </div>
        <div class="my-listing-body">
          <div class="my-listing-title">${escHtml(fav.title)}</div>
          <div class="my-listing-location">
            <span class="material-symbols-outlined">location_on</span>
            ${escHtml(fav.area)}, ${escHtml(fav.district)}
          </div>
          <div class="my-listing-location" style="color:#0c6780;font-weight:600;margin-top:4px;">
            <span class="material-symbols-outlined">directions_walk</span>
            ${fav.distance} from ${escHtml(fav.university)}
          </div>
          <div style="margin-top:12px;">
            <button class="btn-delete-listing" style="width:100%;" onclick="event.stopPropagation();removeFavorite('${fav.id}')">
              <span class="material-symbols-outlined">heart_broken</span> Remove from Favorites
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // RENDER CONNECTIONS 
  function renderConnections() {
    const grid = document.getElementById('connectionsGrid');
    if (!grid) return;

    let tab = state.connectionTab || 'connected';
    if (tab === 'requests') tab = 'incoming'; // backward compatibility from older two-tab state
    const incomingRequests = state.connectionRequests.filter(r => r.direction !== 'outgoing');
    const outgoingRequests = state.connectionRequests.filter(r => r.direction === 'outgoing');

    grid.innerHTML = `
      <div style="grid-column:1/-1;display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;">
        <button class="activity-tab ${tab === 'connected' ? 'active' : ''}" id="connTabConnected" type="button">Connected (${state.connections.length})</button>
        <button class="activity-tab ${tab === 'incoming' ? 'active' : ''}" id="connTabIncoming" type="button">Connection Requests (${incomingRequests.length})</button>
        <button class="activity-tab ${tab === 'outgoing' ? 'active' : ''}" id="connTabOutgoing" type="button">Send Request (${outgoingRequests.length})</button>
      </div>
      <div id="connectionsCardsWrap" style="grid-column:1/-1;display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;"></div>`;

    document.getElementById('connTabConnected')?.addEventListener('click', () => { state.connectionTab = 'connected'; renderConnections(); });
    document.getElementById('connTabIncoming')?.addEventListener('click', () => { state.connectionTab = 'incoming'; renderConnections(); });
    document.getElementById('connTabOutgoing')?.addEventListener('click', () => { state.connectionTab = 'outgoing'; renderConnections(); });

    const wrap = document.getElementById('connectionsCardsWrap');
    if (!wrap) return;

    if (tab === 'connected') {
      if (!state.connections.length) {
        wrap.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><span class="material-symbols-outlined">people_outline</span><h4>No connections yet</h4><p>Find roommates and connect with other students</p></div>`;
        return;
      }
      wrap.innerHTML = state.connections.map(conn => `
        <div class="connection-card" data-conn-id="${conn.id}" style="min-height:230px;">
          <div class="conn-card-avatar">${getInitials(conn.name)}</div>
          <div class="conn-card-name">${escHtml(conn.name)}</div>
          <div class="conn-card-univ">${escHtml(conn.university)}</div>
          <div class="conn-card-btns">
            <button class="btn-msg-conn" data-conn-id="${conn.id}"><span class="material-symbols-outlined">chat</span> Message</button>
            <button class="btn-disconnect" onclick="disconnectUser('${conn.id}')">Disconnect</button>
          </div>
        </div>`).join('');
      return;
    }

    const requests = tab === 'incoming' ? incomingRequests : outgoingRequests;
    if (!requests.length) {
      wrap.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><span class="material-symbols-outlined">person_add_disabled</span><h4>${tab === 'incoming' ? 'No received requests' : 'No sent requests'}</h4></div>`;
      return;
    }

    wrap.innerHTML = requests.map(req => `
      <div class="connection-card" data-req-id="${req.id}" style="min-height:250px;" onclick="viewRoommateProfile('${req.id}')">
        <div class="conn-card-avatar">${getInitials(req.name)}</div>
        <div class="conn-card-name">${escHtml(req.name)}</div>
        <div class="conn-card-univ">${escHtml(req.university)}</div>
        <div style="font-size:11px;font-weight:800;color:#0c6780;margin:6px 0;">
          ${tab === 'incoming' ? 'Request received' : 'Request sent by you'}
        </div>
        <div class="conn-card-btns" style="align-items:stretch;" onclick="event.stopPropagation()">
          <button class="btn-disconnect" style="flex:1;white-space:nowrap;" onclick="cancelOrDeclineRequest('${req.id}')">
            ${tab === 'incoming' ? 'Decline Request' : 'Remove Request'}
          </button>
          <button class="btn-msg-conn" style="flex:1;white-space:nowrap;" type="button" onclick="viewRoommateProfile('${req.id}')">
            <span class="material-symbols-outlined">visibility</span> View Details
          </button>
        </div>
      </div>`).join('');
  }

  // RENDER MESSAGES
  function renderMessages() {
    if (window.BashaBariMessages?.loadConversations) window.BashaBariMessages.loadConversations();
    else renderConversationList();
  }

  function renderConversationList(filter = 'all') {
    const list = document.getElementById('convList');
    if (!list) return;

    let convs = state.conversations;
    if (filter === 'listings') convs = convs.filter(c => c.type === 'listing');
    if (filter === 'connections') convs = convs.filter(c => c.type === 'connection');

    if (!convs.length) {
      list.innerHTML = `<div class="empty-state" style="padding:30px;"><span class="material-symbols-outlined">chat_bubble_outline</span><p>No conversations</p></div>`;
      return;
    }

    list.innerHTML = convs.map(conv => `
      <div class="conv-item ${state.activeConvId === conv.id ? 'active' : ''}" onclick="openConversation('${conv.id}')">
        <div class="conv-avatar">
          ${getInitials(conv.name)}
          ${conv.unread ? '<div class="conv-unread-dot"></div>' : ''}
        </div>
        <div class="conv-info">
          <div class="conv-name">${escHtml(conv.name)}</div>
          <div class="conv-last-msg">${escHtml(conv.lastMsg || '')}</div>
        </div>
        <div class="conv-time">${formatRelativeTime(conv.lastTime)}</div>
      </div>
    `).join('');
  }

  function openConversation(convId) {
    const conv = state.conversations.find(c => c.id === convId);
    if (!conv) return;

    state.activeConvId = convId;
    conv.unread = false;

    // Mark as active in list
    document.querySelectorAll('.conv-item').forEach(el => el.classList.remove('active'));
    const convEl = document.querySelector(`.conv-item[onclick*="${convId}"]`);
    if (convEl) convEl.classList.add('active');

    // Show chat thread
    document.getElementById('chatEmpty').style.display = 'none';
    document.getElementById('chatThread').style.display = 'flex';

    // Render header
    document.getElementById('chatHeader').innerHTML = `
      <div class="chat-header-avatar">${getInitials(conv.name)}</div>
      <div>
        <div class="chat-header-name">${escHtml(conv.name)}</div>
        <div class="chat-header-status">● Online</div>
      </div>
    `;

    renderChatMessages(conv);
    updateStats();
  }

  function renderChatMessages(conv) {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    const msgs = conv.messages || [];

    if (!msgs.length) {
      container.innerHTML = `<div style="text-align:center;color:#94a3b8;font-size:13px;padding:20px;">Start a conversation!</div>`;
      return;
    }

    container.innerHTML = msgs.map(msg => `
      <div class="chat-msg ${msg.from === 'me' ? 'sent' : 'received'}">
        ${msg.image ? `<img src="${msg.image}" class="chat-msg-img" alt="Image"/>` : ''}
        ${msg.text ? `<div class="chat-bubble">${escHtml(msg.text)}</div>` : ''}
        <div class="chat-meta">
          <span class="chat-time">${formatTime(msg.time)}</span>
          ${msg.from === 'me' ? `<span class="chat-tick ${msg.seen ? 'seen' : ''}">
            ${msg.seen ? '✓✓' : '✓'}
          </span>` : ''}
        </div>
      </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
  }

  function bindMessagesSection() {
  }

  function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input ? input.value.trim() : '';
    if (!text || !state.activeConvId) return;

    const conv = state.conversations.find(c => c.id === state.activeConvId);
    if (!conv) return;

    const msg = {
      id: Date.now().toString(),
      from: 'me',
      text: text,
      time: new Date().toISOString(),
      seen: false
    };

    if (!conv.messages) conv.messages = [];
    conv.messages.push(msg);
    conv.lastMsg = text;
    conv.lastTime = msg.time;

    input.value = '';
    renderChatMessages(conv);
    saveState();

    
    setTimeout(() => {
      msg.seen = true;
      renderChatMessages(conv);
      saveState();
    }, 3000);

   
    setTimeout(() => {
      simulateReply(conv);
    }, 5000 + Math.random() * 3000);
  }

  function sendImageMessage(imgSrc) {
    if (!state.activeConvId) return;
    const conv = state.conversations.find(c => c.id === state.activeConvId);
    if (!conv) return;

    const msg = {
      id: Date.now().toString(),
      from: 'me',
      image: imgSrc,
      time: new Date().toISOString(),
      seen: false
    };

    if (!conv.messages) conv.messages = [];
    conv.messages.push(msg);
    conv.lastMsg = '📷 Image';
    conv.lastTime = msg.time;

    renderChatMessages(conv);
    saveState();
  }

  function simulateReply(conv) {
    const replies = [
      'That sounds great, thanks for the info!',
      'I will check it out and get back to you.',
      'Sure, let me know when you are free.',
      'Sounds good! When can we meet?',
      'Thanks! I will visit the place tomorrow.'
    ];
    const msg = {
      id: Date.now().toString(),
      from: 'them',
      text: replies[Math.floor(Math.random() * replies.length)],
      time: new Date().toISOString(),
      seen: true
    };
    if (!conv.messages) conv.messages = [];
    conv.messages.push(msg);
    conv.lastMsg = msg.text;
    conv.lastTime = msg.time;

    if (state.activeConvId === conv.id) {
      renderChatMessages(conv);
    }
    saveState();
  }

  function buildRoommateAreaCheckboxes(selectedAreas = []) {
    const wrap = document.getElementById('rp_areas');
    if (!wrap) return;
    const district = document.getElementById('rp_district')?.value || 'Dhaka';
    const areas = districtAreas[district] || [];
    if (!areas.length) { wrap.innerHTML = '<div style="font-size:13px;color:#94a3b8;">Select a supported district to see areas</div>'; return; }
    wrap.innerHTML = areas.map(a => `<label class="area-check"><input type="checkbox" value="${escHtml(a)}" ${selectedAreas.includes(a) ? 'checked' : ''}/> ${escHtml(a)}</label>`).join('');
  }

  // RENDER ROOMMATE PROFILE
  function renderRoommateProfile() {
    if (!state.roommateProfile) return;
    const rp = state.roommateProfile;
    const budgetEl = document.getElementById('rp_budget');
    const districtEl = document.getElementById('rp_district');
    const monthEl = document.getElementById('rp_month');
    const yearEl = document.getElementById('rp_year');
    const descEl = document.getElementById('rp_description');

    if (budgetEl) budgetEl.value = rp.budget || '';
    if (districtEl) districtEl.value = rp.district || '';
    buildRoommateAreaCheckboxes(rp.areas || []);
    if (monthEl) monthEl.value = rp.month || '';
    if (yearEl) yearEl.value = rp.year || '';
    if (descEl) descEl.value = rp.description || '';

    // Check lifestyle tags
    if (rp.tags) {
      document.querySelectorAll('.lifestyle-tag-check input').forEach(cb => {
        cb.checked = rp.tags.includes(cb.value);
      });
    }
    // Check preferred areas
    if (rp.areas) {
      document.querySelectorAll('.area-check input').forEach(cb => {
        cb.checked = rp.areas.includes(cb.value);
      });
    }
  }

  function bindRoommateProfileForm() {
    const form = document.getElementById('roommateProfileForm');
    if (!form) return;
    document.getElementById('rp_district')?.addEventListener('change', () => buildRoommateAreaCheckboxes([]));
    buildRoommateAreaCheckboxes(state.roommateProfile?.areas || []);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const budget = document.getElementById('rp_budget').value.trim();
      const district = document.getElementById('rp_district').value;
      const month = document.getElementById('rp_month').value;
      const year = document.getElementById('rp_year').value;
      const description = document.getElementById('rp_description').value.trim();
      const tags = []; document.querySelectorAll('.lifestyle-tag-check input:checked').forEach(cb => tags.push(cb.value));
      const areas = []; document.querySelectorAll('.area-check input:checked').forEach(cb => areas.push(cb.value));
      if (!budget || !district || !month || !year) { showToast('Please fill in all required fields', 'error'); return; }
      const nums = budget.match(/\d+/g) || [];
      const fd = new FormData();
      fd.append('budget_min', nums[0] || '0'); fd.append('budget_max', nums[1] || nums[0] || '0');
      fd.append('district', district); fd.append('move_in_month', month); fd.append('move_in_year', year); fd.append('description', description); fd.append('publish', '1');
      tags.forEach(t => fd.append('tags[]', t)); areas.forEach(a => fd.append('areas[]', a));
      fetch('api/roommates/save-profile.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
        .then(r => r.json().then(data => ({ ok:r.ok, data })))
        .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not save profile.');
          state.roommateProfile = { budget, district, areas, month, year, description, tags, published:true };
          state.roommateProfileToggle = true;
          showToast('Roommate profile saved! ✅', 'success');
        })
        .then(() => { syncToggleStates(); loadBackendStudentData(); })
        .catch(err => showToast(err.message || 'Could not save profile.', 'error'));
    });
  }

  // RENDER ACTIVITY LOG 
  function renderActivityLog() {
    setTextSafe('totalComments', state.comments.length);
    setTextSafe('totalReviews', state.landlordReviews.length);
    renderActivityComments();
    renderActivityReviews();
  }

  function renderActivityComments() {
    const container = document.getElementById('activityCommentsContent');
    if (!container) return;

    if (!state.comments.length) {
      container.innerHTML = `<div class="empty-state"><span class="material-symbols-outlined">comment</span><h4>No comments yet</h4><p>Comment on listings to see them here</p></div>`;
      return;
    }

    container.innerHTML = state.comments.map(c => `
      <div class="activity-card" data-comment-id="${c.id}">
        <div class="activity-card-header">
          <div class="activity-card-listing">${escHtml(c.listingTitle)}</div>
          <div class="activity-card-time">${formatRelativeTime(c.date)}</div>
        </div>
        <div class="activity-card-text">"${escHtml(c.text)}"</div>
        <div class="activity-card-btns">
          <button class="btn-activity-edit" onclick="editComment('${c.id}')">
            <span class="material-symbols-outlined" style="font-size:14px;">edit</span> Edit
          </button>
          <button class="btn-activity-delete" onclick="deleteComment('${c.id}')">
            <span class="material-symbols-outlined" style="font-size:14px;">delete</span> Delete
          </button>
        </div>
      </div>
    `).join('');
  }

  function renderActivityReviews() {
    const container = document.getElementById('activityReviewsContent');
    if (!container) return;

    if (!state.landlordReviews.length) {
      container.innerHTML = `<div class="empty-state"><span class="material-symbols-outlined">rate_review</span><h4>No reviews given yet</h4><p>Review landlords on the Landlord Reviews page</p></div>`;
      return;
    }

    container.innerHTML = state.landlordReviews.map(r => `
      <div class="activity-card" data-review-id="${r.id}">
        <div class="activity-card-header">
          <div class="activity-card-listing">${escHtml(r.landlordName)} — ${escHtml(r.address)}</div>
          <div class="activity-card-time">${formatRelativeTime(r.date)}</div>
        </div>
        <div class="review-stars-display">
          ${renderStars(r.rating)}
        </div>
        <div class="activity-card-text">"${escHtml(r.text)}"</div>
        <div class="activity-card-btns">
          <button class="btn-activity-edit" onclick="window.location.href='landlord-reviews.php'">
            <span class="material-symbols-outlined" style="font-size:14px;">edit</span> Edit on Page
          </button>
          <button class="btn-activity-delete" onclick="deleteReview('${r.id}')">
            <span class="material-symbols-outlined" style="font-size:14px;">delete</span> Delete
          </button>
        </div>
      </div>
    `).join('');
  }

  function bindActivityTabs() {
    document.querySelectorAll('.activity-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.activity-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const which = tab.dataset.tab;
        document.getElementById('activityCommentsContent').style.display = which === 'comments' ? 'flex' : 'none';
        document.getElementById('activityReviewsContent').style.display = which === 'reviews' ? 'flex' : 'none';
      });
    });
  }

  // RENDER NOTIFICATIONS 
  function renderNotifications(filter = 'all') {
    const list = document.getElementById('notificationsList');
    if (!list) return;

    let notifs = state.notifications;
    if (filter !== 'all') notifs = notifs.filter(n => n.type === filter);

    if (!notifs.length) {
      list.innerHTML = `<div class="empty-state"><span class="material-symbols-outlined">notifications_none</span><h4>No notifications</h4></div>`;
      return;
    }

    list.innerHTML = notifs.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}" onclick="markNotifRead('${n.id}')">
        <div class="notif-icon notif-icon-${n.type}">
          <span class="material-symbols-outlined">${getNotifIcon(n.type)}</span>
        </div>
        <div class="notif-content">
          <div class="notif-message">${escHtml(n.message)}</div>
          <div class="notif-time">${formatRelativeTime(n.date)}</div>
        </div>
        ${!n.read ? '<div class="notif-unread-badge"></div>' : ''}
      </div>
    `).join('');
  }

  function bindNotificationFilters() {
    document.querySelectorAll('.notif-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.notif-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderNotifications(btn.dataset.filter);
      });
    });

    const markAllBtn = document.getElementById('markAllReadBtn');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        fetch('api/notifications/mark-all-read.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() } })
          .catch(()=>null).finally(() => {
            state.notifications.forEach(n => n.read = true);
            updateStats();
            renderNotifications();
            showToast('All notifications marked as read', 'success');
          });
      });
    }
  }

  //  RENDER SETTINGS 
  function renderSettings() {
  }

  function bindSettingsSection() {
    const updateProfileBtn = document.getElementById('updateProfileBtn');
    if (updateProfileBtn) {
      updateProfileBtn.addEventListener('click', () => {
        const name = document.getElementById('settings_name').value.trim();
        const email = document.getElementById('settings_email').value.trim();
        const phone = document.getElementById('settings_phone').value.trim();
        const university = document.getElementById('settings_university').value;
        if (!name) { showToast('Please enter your name', 'error'); return; }
        const fd = new FormData(); fd.append('full_name', name); fd.append('email', email); fd.append('phone', phone); fd.append('university', university);
        fetch('api/users/update-profile.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
          .then(r => r.json().then(data => ({ ok:r.ok, data })))
          .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not update profile.'); state.currentUser = data.user; if (state.currentUser.full_name && !state.currentUser.name) state.currentUser.name = state.currentUser.full_name; localStorage.setItem('bashabari_user', JSON.stringify(state.currentUser)); updateSidebarUserInfo(); showToast('Profile updated successfully!', 'success'); })
          .catch(err => showToast(err.message || 'Could not update profile.', 'error'));
      });
    }

    const changePwdBtn = document.getElementById('changePasswordBtn');
    if (changePwdBtn) {
      changePwdBtn.addEventListener('click', () => {
        const current = document.getElementById('settings_current_pwd').value;
        const newPwd = document.getElementById('settings_new_pwd').value;
        const confirmPwd = document.getElementById('settings_confirm_pwd').value;
        if (!current || !newPwd || !confirmPwd) { showToast('Please fill in all password fields', 'error'); return; }
        if (newPwd.length < 6) { showToast('New password must be at least 6 characters', 'error'); return; }
        if (newPwd !== confirmPwd) { showToast('Passwords do not match', 'error'); return; }
        const fd = new FormData(); fd.append('current_password', current); fd.append('new_password', newPwd); fd.append('confirm_new_password', confirmPwd);
        fetch('api/users/change-password.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
          .then(r => r.json().then(data => ({ ok:r.ok, data })))
          .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not change password.'); document.getElementById('settings_current_pwd').value = ''; document.getElementById('settings_new_pwd').value = ''; document.getElementById('settings_confirm_pwd').value = ''; showToast('Password changed successfully!', 'success'); })
          .catch(err => showToast(err.message || 'Could not change password.', 'error'));
      });
    }

    const picInput = document.getElementById('profilePicInput');
    if (picInput) {
      picInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const fd = new FormData(); fd.append('avatar', file);
        fetch('api/users/upload-avatar.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
          .then(r => r.json().then(data => ({ ok:r.ok, data })))
          .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not upload photo.');
            const preview = document.getElementById('profilePicPreview'); const initials = document.getElementById('profilePicInitials'); const img = document.getElementById('profilePicImg');
            if (img && preview) { img.src = data.profile_picture; img.style.display = 'block'; if (initials) initials.style.display = 'none'; }
            const sidebarAvatar = document.getElementById('sidebarAvatar'); if (sidebarAvatar) { sidebarAvatar.style.backgroundImage = `url('${data.profile_picture}')`; sidebarAvatar.style.backgroundSize = 'cover'; sidebarAvatar.textContent = ''; }
            showToast('Profile photo updated!', 'success');
          })
          .catch(err => showToast(err.message || 'Could not upload photo.', 'error'));
      });
    }
  }

  //  CREATE LISTING MODAL 
  function bindCreateListingModal() {
    const openBtns = ['createListingBtn', 'createListingBtn2'];
    openBtns.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', openCreateListingModal);
    });

    const closeBtn = document.getElementById('closeCreateListing');
    if (closeBtn) closeBtn.addEventListener('click', closeCreateListingModal);

    const modal = document.getElementById('createListingModal');
    if (modal) modal.addEventListener('click', e => {
      if (e.target === modal) closeCreateListingModal();
    });

    // District → Area dynamic
    const districtSelect = document.getElementById('cl_district');
    if (districtSelect) {
      districtSelect.addEventListener('change', () => {
        populateAreas('cl_district', 'cl_area');
      });
    }

    // Step buttons
    bindStepButtons();

    // Init image upload grid
    initImageUploadGrid();
  }

  function openCreateListingModal() {
    state.createListingStep = 1;
    state.uploadedImages = [];
    state.createListingData = {};
    resetCreateListingForm();
    showStep(1);
    openModalById('createListingModal');
  }

  function closeCreateListingModal() {
    closeModalById('createListingModal');
    resetCreateListingForm();
  }

  function resetCreateListingForm() {
    const form = document.getElementById('listingStep1');
    if (form) {
      form.querySelectorAll('input, textarea, select').forEach(el => {
        if (el.tagName === 'INPUT' && el.type === 'checkbox') el.checked = false;
        else el.value = '';
      });
    }
    state.uploadedImages = [];
    initImageUploadGrid();
  }

  function bindStepButtons() {
    const step1Next = document.getElementById('step1Next');
    if (step1Next) step1Next.addEventListener('click', () => validateStep1AndProceed());

    const step2Back = document.getElementById('step2Back');
    if (step2Back) step2Back.addEventListener('click', () => showStep(1));

    const step2Next = document.getElementById('step2Next');
    if (step2Next) step2Next.addEventListener('click', () => showStep(3));

    const step3Back = document.getElementById('step3Back');
    if (step3Back) step3Back.addEventListener('click', () => showStep(2));

    const postBtn = document.getElementById('postListingBtn');
    if (postBtn) postBtn.addEventListener('click', postListing);
  }

  function validateStep1AndProceed() {
    let valid = true;
    const fields = {
      cl_title: 'Title is required',
      cl_district: 'Please select a district',
      cl_area: 'Please select an area',
      cl_rent: 'Monthly rent is required',
      cl_type: 'Please select property type',
      cl_university: 'Please select a university',
      cl_available_from: 'Please select available date'
    };

    Object.entries(fields).forEach(([id, msg]) => {
      const el = document.getElementById(id);
      const errEl = document.getElementById(`${id}_err`);
      if (!el || !el.value.trim()) {
        if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
        valid = false;
      } else {
        if (errEl) errEl.classList.remove('show');
      }
    });

    if (valid) {
      // Save step 1 data
      state.createListingData = {
        title: document.getElementById('cl_title').value.trim(),
        district: document.getElementById('cl_district').value,
        area: document.getElementById('cl_area').value,
        rent: document.getElementById('cl_rent').value,
        type: document.getElementById('cl_type').value,
        university: document.getElementById('cl_university').value,
        availableFrom: document.getElementById('cl_available_from').value,
        distance: document.getElementById('cl_distance').value,
        transit: document.getElementById('cl_transit').value,
        description: document.getElementById('cl_description').value.trim(),
        amenities: []
      };
      document.querySelectorAll('#listingStep1 .amenities-checkboxes input:checked').forEach(cb => {
        state.createListingData.amenities.push(cb.value);
      });
      showStep(2);
    }
  }

  function showStep(step) {
    state.createListingStep = step;
    document.querySelectorAll('.listing-step').forEach((el, i) => {
      el.style.display = (i + 1 === step) ? 'block' : 'none';
    });

    // Update step indicators
    for (let i = 1; i <= 3; i++) {
      const ind = document.getElementById(`step-ind-${i}`);
      if (ind) {
        ind.classList.remove('active', 'completed');
        if (i < step) ind.classList.add('completed');
        if (i === step) ind.classList.add('active');
      }
    }

    // Update progress bar
    const fill = document.getElementById('stepProgressFill');
    if (fill) fill.style.width = `${(step / 3) * 100}%`;

    // If step 3, build preview
    if (step === 3) buildListingPreview();
  }

  function buildListingPreview() {
    const preview = document.getElementById('listingPreviewWrap');
    if (!preview) return;

    const d = state.createListingData;
    const imgSrc = state.uploadedImages[0] || '';
    const imgHTML = imgSrc
      ? `<img src="${imgSrc}" style="width:100%;height:200px;object-fit:cover;" alt="Preview"/>`
      : `<div class="listing-preview-img">No image uploaded</div>`;

    preview.innerHTML = `
      ${imgHTML}
      <div class="listing-preview-body">
        <div class="preview-price">৳${Number(d.rent).toLocaleString()}/mo</div>
        <div class="preview-title">${escHtml(d.title)}</div>
        <div class="preview-location">
          <span class="material-symbols-outlined" style="font-size:16px;color:#0c6780;">location_on</span>
          ${escHtml(d.area)}, ${escHtml(d.district)}
        </div>
        <div class="preview-distance">${d.distance || '?'} km ${d.transit?.toLowerCase() || ''} distance from ${escHtml(d.university)}</div>
        <div class="preview-distance"><strong>Available from:</strong> ${escHtml(d.availableFrom || 'Not set')}</div>
        <div style="font-size:13px;color:#475569;margin-bottom:12px;">${escHtml(d.description)}</div>
        <div class="preview-amenities">
          ${d.amenities.map(a => `<span class="preview-amenity-tag">${escHtml(a)}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function postListing() {
    const d = state.createListingData;
    const fd = new FormData();
    fd.append('title', d.title); fd.append('district', d.district); fd.append('area', d.area); fd.append('university', d.university);
    fd.append('rent_price', d.rent); fd.append('property_type', d.type); fd.append('available_from', d.availableFrom || ''); fd.append('distance_value', d.distance || ''); fd.append('distance_unit', d.transit || 'walking'); fd.append('description', d.description || '');
    (d.amenities || []).forEach(a => fd.append('amenities[]', a));
    fetch('api/listings/create-listing.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not create listing.'); closeCreateListingModal(); showToast('Listing submitted for review! It will appear once admin approves.', 'success'); loadBackendStudentData(); navigateTo('my-listings'); })
      .catch(err => showToast(err.message || 'Could not create listing.', 'error'));
  }

  function initImageUploadGrid() {
    const grid = document.getElementById('imageUploadGrid');
    if (!grid) return;
    grid.innerHTML = '';
    state.uploadedImages = [];

    for (let i = 0; i < 6; i++) {
      const box = document.createElement('div');
      box.className = 'img-upload-box';
      box.dataset.index = i;
      box.innerHTML = `
        <span class="material-symbols-outlined">add_photo_alternate</span>
        <span class="upload-text">Add Photo</span>
        <input type="file" accept="image/*" style="display:none;" class="img-file-input"/>
      `;

      box.addEventListener('click', () => {
        box.querySelector('.img-file-input').click();
      });

      box.querySelector('.img-file-input').addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          const idx = parseInt(box.dataset.index);
          state.uploadedImages[idx] = ev.target.result;
          box.classList.add('has-image');
          box.innerHTML = `
            <img src="${ev.target.result}" alt="Upload ${idx + 1}"/>
            <button class="img-remove-btn" onclick="removeUploadedImage(${idx}, event)">×</button>
          `;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
      });

      grid.appendChild(box);
      state.uploadedImages.push('');
    }
  }

  //  EDIT LISTING MODAL 
  function bindEditDeleteModal() {
    const closeEdit = document.getElementById('closeEditListing');
    if (closeEdit) closeEdit.addEventListener('click', () => closeModalById('editListingModal'));

    document.getElementById('editListingModal').addEventListener('click', e => {
      if (e.target.id === 'editListingModal') closeModalById('editListingModal');
    });

    const updateBtn = document.getElementById('updateListingBtn');
    if (updateBtn) updateBtn.addEventListener('click', updateListing);

    const editImageInput = document.getElementById('editImageInput');
    if (editImageInput) editImageInput.addEventListener('change', e => {
      const file = e.target.files[0]; if (!file) return; state.editImageFile = file; state.editImageRemove = false;
      const imgPrev = document.getElementById('editImagePreview'); if (imgPrev) { imgPrev.src = URL.createObjectURL(file); imgPrev.style.display = 'block'; }
    });
    const editImageRemoveBtn = document.getElementById('editImageRemoveBtn');
    if (editImageRemoveBtn) editImageRemoveBtn.addEventListener('click', () => {
      state.editImageRemove = true; state.editImageFile = null; const imgPrev = document.getElementById('editImagePreview'); if (imgPrev) { imgPrev.src = ''; imgPrev.style.display = 'none'; }
      const input = document.getElementById('editImageInput'); if (input) input.value = '';
    });

    // Delete confirm
    const deleteNo = document.getElementById('deleteNo');
    const deleteYes = document.getElementById('deleteYes');
    if (deleteNo) deleteNo.addEventListener('click', () => closeModalById('deleteConfirmModal'));
    if (deleteYes) deleteYes.addEventListener('click', confirmDeleteListing);

    document.getElementById('deleteConfirmModal').addEventListener('click', e => {
      if (e.target.id === 'deleteConfirmModal') closeModalById('deleteConfirmModal');
    });
  }

  window.openEditListing = function(listingId) {
    const listing = state.listings.find(l => String(l.id) === String(listingId));
    if (!listing) return;
    state.currentEditListingId = listingId;

    document.getElementById('edit_listing_id').value = listingId;
    document.getElementById('edit_title').value = listing.title || '';
    document.getElementById('edit_rent').value = listing.rent || '';
    document.getElementById('edit_type').value = listing.type || '';
    const editAvail = document.getElementById('edit_available_from'); if (editAvail) editAvail.value = listing.availableFrom || '';
    document.getElementById('edit_description').value = listing.description || '';
    state.editImageFile = null; state.editImageRemove = false;
    const imgPrev = document.getElementById('editImagePreview');
    if (imgPrev && listing.images && listing.images[0]) { imgPrev.src = listing.images[0]; imgPrev.style.display = 'block'; } else if (imgPrev) { imgPrev.src = ''; imgPrev.style.display = 'none'; }

    openModalById('editListingModal');
  };

  function updateListing() {
    const id = state.currentEditListingId;
    const listing = state.listings.find(l => String(l.id) === String(id));
    if (!listing) return;
    const fd = new FormData();
    fd.append('listing_id', id);
    fd.append('title', document.getElementById('edit_title').value.trim());
    fd.append('rent_price', document.getElementById('edit_rent').value);
    fd.append('property_type', document.getElementById('edit_type').value);
    fd.append('available_from', document.getElementById('edit_available_from')?.value || '');
    fd.append('description', document.getElementById('edit_description').value.trim());
    fetch('api/listings/update-listing.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => {
        if(!ok||!data.success) throw new Error(data.error || 'Could not update listing.');
        if (state.editImageFile || state.editImageRemove) {
          const imgFd = new FormData(); imgFd.append('listing_id', id);
          if (state.editImageRemove) imgFd.append('remove_existing', '1');
          if (state.editImageFile) imgFd.append('image', state.editImageFile);
          return fetch('api/listings/replace-images.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: imgFd })
            .then(r => r.json().then(data => ({ ok:r.ok, data })))
            .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not update image.'); });
        }
      })
      .then(() => { closeModalById('editListingModal'); showToast('Listing updated successfully!', 'success'); loadBackendStudentData(); })
      .catch(err => showToast(err.message || 'Could not update listing.', 'error'));
  }

  window.openDeleteConfirm = function(listingId) {
    state.currentDeleteListingId = listingId;
    document.getElementById('delete_listing_id').value = listingId;
    openModalById('deleteConfirmModal');
  };

  function confirmDeleteListing() {
    const id = state.currentDeleteListingId;
    const fd = new FormData(); fd.append('listing_id', id);
    fetch('api/listings/delete-listing.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not delete listing.'); state.listings = state.listings.filter(l => String(l.id) !== String(id)); updateStats(); closeModalById('deleteConfirmModal'); renderMyListings(); showToast('Listing deleted successfully', 'info'); })
      .catch(err => showToast(err.message || 'Could not delete listing.', 'error'));
  }

  //  REPORT MODAL 
  function bindReportModal() {
    const reportAdminBtn = document.getElementById('reportAdminBtn');
    if (reportAdminBtn) reportAdminBtn.addEventListener('click', () => openModalById('reportModal'));

    const closeBtn = document.getElementById('closeReportModal');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModalById('reportModal'));

    document.getElementById('reportModal').addEventListener('click', e => {
      if (e.target.id === 'reportModal') closeModalById('reportModal');
    });

    const imgInput = document.getElementById('report_img_input');
    if (imgInput) {
      imgInput.addEventListener('change', e => {
        const label = document.getElementById('reportImgLabel');
        if (label && e.target.files[0]) {
          label.textContent = e.target.files[0].name;
        }
      });
    }

    const submitBtn = document.getElementById('submitReportBtn');
    if (submitBtn) submitBtn.addEventListener('click', submitReport);
  }

  function submitReport() {
    const title = document.getElementById('report_title').value.trim();
    const category = document.getElementById('report_category').value;
    const description = document.getElementById('report_description').value.trim();
    if (!title || !category || !description) { showToast('Please fill in all required fields', 'error'); return; }
    const map = { 'House Listings':'listings', 'Roommate Profile':'roommate', 'Technical Issue':'technical_issue', 'Comments':'comment', 'User':'user' };
    const fd = new FormData();
    fd.append('title', title); fd.append('category', map[category] || category); fd.append('description', description);
    const file = document.getElementById('report_img_input')?.files?.[0];
    if (file) fd.append('image', file);
    fetch('api/reports/submit-report.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not submit report.');
        closeModalById('reportModal');
        document.getElementById('report_title').value = '';
        document.getElementById('report_category').value = '';
        document.getElementById('report_description').value = '';
        document.getElementById('reportImgLabel').textContent = 'Click to upload image';
        showToast('Report submitted to admin. We will review it shortly.', 'success');
      })
      .catch(err => showToast(err.message || 'Could not submit report.', 'error'));
  }

  //  ROOMMATE PROFILE TOGGLE 
  function bindToggleSyncs() {
    const toggle1 = document.getElementById('roommateProfileToggle');
    const toggle2 = document.getElementById('roommateProfileToggle2');

    if (toggle1) toggle1.addEventListener('change', () => handleRoommateToggle(toggle1.checked));
    if (toggle2) toggle2.addEventListener('change', () => handleRoommateToggle(toggle2.checked));
  }

  function handleRoommateToggle(checked) {
    if (checked && !state.roommateProfile) {
      syncToggleStates(false);
      showToast('Please complete your Roommate Profile first', 'info');
      navigateTo('roommate-profile');
      return;
    }
    fetch('api/roommates/toggle-profile.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() } })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || !data.success) throw new Error(data.error || 'Could not update profile visibility.');
        state.roommateProfileToggle = !!Number(data.is_published);
        syncToggleStates();
        showToast(state.roommateProfileToggle ? 'Roommate profile is now visible to others' : 'Roommate profile hidden', 'info');
      })
      .catch(err => { syncToggleStates(state.roommateProfileToggle); showToast(err.message || 'Could not update profile visibility.', 'error'); });
  }

  function syncToggleStates(override) {
    const val = override !== undefined ? override : state.roommateProfileToggle;
    const toggle1 = document.getElementById('roommateProfileToggle');
    const toggle2 = document.getElementById('roommateProfileToggle2');
    const status1 = document.getElementById('toggleStatus');
    const status2 = document.getElementById('toggleStatus2');

    if (toggle1) toggle1.checked = val;
    if (toggle2) toggle2.checked = val;
    if (status1) status1.textContent = val ? 'ON' : 'OFF';
    if (status2) status2.textContent = val ? 'ON' : 'OFF';
  }

  //  CONNECTIONS 
  function bindConnectionsSection() {}

  function bindRoommateViewModalClose() {
    const modal = document.getElementById('roommateViewModal');
    const closeBtn = document.getElementById('closeRoommateView');
    if (closeBtn && !closeBtn.dataset.boundClose) {
      closeBtn.dataset.boundClose = '1';
      closeBtn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        closeModalById('roommateViewModal');
      });
    }
    if (modal && !modal.dataset.boundOutsideClose) {
      modal.dataset.boundOutsideClose = '1';
      modal.addEventListener('mousedown', e => {
        if (e.target === modal) closeModalById('roommateViewModal');
      });
      modal.addEventListener('click', e => {
        if (e.target === modal) closeModalById('roommateViewModal');
      });
    }
  }

  window.cancelOrDeclineRequest = function(reqId) {
    const req = state.connectionRequests.find(r => String(r.id) === String(reqId));
    if (!req) return;
    const fd = new FormData();
    const url = req.direction === 'incoming' ? 'api/connections/respond-request.php' : 'api/connections/disconnect.php';
    if (req.direction === 'incoming') { fd.append('request_id', reqId); fd.append('action', 'decline'); }
    else { fd.append('connection_id', reqId); }
    fetch(url, { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not update request.'); showToast('Connection request removed', 'info'); loadBackendStudentData(); })
      .catch(err => showToast(err.message || 'Could not update request.', 'error'));
  };

  window.acceptConnection = function(reqId) {
    const fd = new FormData(); fd.append('request_id', reqId); fd.append('action', 'accept');
    fetch('api/connections/respond-request.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not accept request.'); showToast('Connection request accepted!', 'success'); loadBackendStudentData(); })
      .catch(err => showToast(err.message || 'Could not accept request.', 'error'));
  };

  window.declineConnection = function(reqId) {
    const fd = new FormData(); fd.append('request_id', reqId); fd.append('action', 'decline');
    fetch('api/connections/respond-request.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not decline request.'); showToast('Connection request declined', 'info'); loadBackendStudentData(); })
      .catch(err => showToast(err.message || 'Could not decline request.', 'error'));
  };

  window.disconnectUser = function(connId) {
    const fd = new FormData(); fd.append('connection_id', connId);
    fetch('api/connections/disconnect.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not disconnect.'); showToast('User disconnected. Messaging has been disabled.', 'info'); loadBackendStudentData(); })
      .catch(err => showToast(err.message || 'Could not disconnect.', 'error'));
  };

  window.removeFavorite = function(favId) {
    const fd = new FormData(); fd.append('listing_id', favId);
    fetch('api/favorites/toggle-favorite.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not remove favorite.'); state.favorites = state.favorites.filter(f => String(f.id) !== String(favId)); updateStats(); renderFavorites(); renderFavoritesScroll(); showToast('Removed from favorites', 'info'); })
      .catch(err => showToast(err.message || 'Could not remove favorite.', 'error'));
  };

  window.togglePhoneVisibility = function(listingId, visible) {
    const fd = new FormData(); fd.append('listing_id', listingId);
    fetch('api/listings/toggle-phone.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd })
      .then(r => r.json().then(data => ({ ok:r.ok, data })))
      .then(({ ok, data }) => { if(!ok||!data.success) throw new Error(data.error || 'Could not update phone visibility.'); const listing = state.listings.find(l => String(l.id) === String(listingId)); if (listing) listing.phoneHidden = !!Number(data.phone_hidden); showToast(`Phone number is now ${!Number(data.phone_hidden) ? 'visible' : 'hidden'}`, 'info'); renderMyListings(); })
      .catch(err => { showToast(err.message || 'Could not update phone visibility.', 'error'); renderMyListings(); });
  };

  //  NOTIFICATIONS 
  window.markNotifRead = function(notifId) {
    const fd = new FormData(); fd.append('notification_id', notifId);
    fetch('api/notifications/mark-read.php', { method:'POST', headers:{ 'X-CSRF-Token': csrfToken() }, body: fd }).catch(()=>null).finally(() => {
      const notif = state.notifications.find(n => String(n.id) === String(notifId));
      if (notif) notif.read = true;
      updateStats();
      renderNotifications(document.querySelector('.notif-filter.active')?.dataset.filter || 'all');
    });
  };

  //  COMMENT ACTIONS 
  window.editComment = function(commentId) {
    const comment = state.comments.find(c => c.id === commentId);
    if (!comment) return;
    const newText = prompt('Edit your comment:', comment.text);
    if (newText !== null && newText.trim()) {
      comment.text = newText.trim();
      comment.date = new Date().toISOString();
      saveState();
      renderActivityComments();
      renderOverviewComments();
      showToast('Comment updated!', 'success');
    }
  };

  window.deleteComment = function(commentId) {
    state.comments = state.comments.filter(c => c.id !== commentId);
    saveState();
    updateStats();
    renderActivityComments();
    renderOverviewComments();
    showToast('Comment deleted', 'info');
  };

  window.deleteReview = function(reviewId) {
    state.landlordReviews = state.landlordReviews.filter(r => r.id !== reviewId);
    saveState();
    updateStats();
    renderActivityReviews();
    showToast('Review deleted', 'info');
  };

  //  ROOMMATE PROFILE VIEW MODAL 
  window.viewRoommateProfile = function(reqId) {
    const req = state.connectionRequests.find(r => String(r.id) === String(reqId));
    if (!req) return;
    const u = req.other_user || {};
    const body = document.getElementById('roommateViewBody');
    if (body) {
      const tags = u.tags || req.tags || [];
      const areas = u.preferred_areas || req.preferred_areas || [];
      body.innerHTML = `
        <div class="rm-view-header">
          <div class="rm-view-avatar">${getInitials(u.name || req.name)}</div>
          <div>
            <div class="rm-view-name">${escHtml(u.name || req.name)}</div>
            <div class="rm-view-univ">${escHtml(u.university || req.university || '')}</div>
            <div style="font-size:12px;font-weight:800;color:#0c6780;margin-top:4px;">${req.direction === 'outgoing' ? 'Request sent by you' : 'Request received'}</div>
          </div>
        </div>
        <div class="rm-view-details">
          <div class="rm-view-detail"><span class="material-symbols-outlined">payments</span><div><div class="rm-view-detail-label">Budget</div><div class="rm-view-detail-value">৳${u.budget_min || '-'} – ৳${u.budget_max || '-'}</div></div></div>
          <div class="rm-view-detail"><span class="material-symbols-outlined">location_on</span><div><div class="rm-view-detail-label">Preferred Location</div><div class="rm-view-detail-value">${escHtml(u.district || '')}${areas.length ? ' — ' + escHtml(areas.join(', ')) : ''}</div></div></div>
          <div class="rm-view-detail"><span class="material-symbols-outlined">calendar_month</span><div><div class="rm-view-detail-label">Move-in</div><div class="rm-view-detail-value">${escHtml(String(u.move_in_month || ''))}/${escHtml(String(u.move_in_year || ''))}</div></div></div>
        </div>
        <div style="margin:14px 0;"><div class="rm-view-detail-label">About</div><p style="color:#475569;line-height:1.6;">${escHtml(u.description || 'No description provided.')}</p></div>
        <div><div class="rm-view-detail-label" style="margin-bottom:8px;">Lifestyle Tags</div><div class="rm-view-tags">${tags.map(t => `<span class="rm-view-tag">${escHtml(t)}</span>`).join('') || '<span class="rm-view-tag">No tags</span>'}</div></div>
      `;
    }
    openModalById('roommateViewModal');
  };

  //  MOBILE SIDEBAR 
  function bindMobileSidebar() {
    const toggleBtn = document.getElementById('dashMobileToggle');
    const overlay = document.getElementById('dashSidebarOverlay');
    const sidebar = document.getElementById('dashSidebar');

    if (toggleBtn) toggleBtn.addEventListener('click', openMobileSidebar);
    if (overlay) overlay.addEventListener('click', closeMobileSidebar);
  }

  function openMobileSidebar() {
    document.getElementById('dashSidebar').classList.add('open');
    document.getElementById('dashSidebarOverlay').classList.add('show');
  }

  function closeMobileSidebar() {
    document.getElementById('dashSidebar').classList.remove('open');
    document.getElementById('dashSidebarOverlay').classList.remove('show');
  }

  //  SIDEBAR ACTIONS 
  function bindSidebarActions() {
    // Sign out
    const signOutBtn = document.getElementById('dashSignOutBtn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', () => {
        fetch('api/auth/logout.php', { method:'POST', headers:{ 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' } }).catch(()=>null).finally(() => {
          localStorage.removeItem('bashabari_user');
          showToast('Signed out successfully. See you soon!', 'info');
          setTimeout(() => { window.location.href = 'index.php'; }, 800);
        });
      });
    }

    
    document.querySelectorAll('.conv-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.conv-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderConversationList(btn.dataset.filter);
      });
    });

   
    bindMessagesSection();
  }

  //  POPULATE AREAS 
  function populateAreas(districtId, areaId) {
    const district = document.getElementById(districtId)?.value;
    const areaSelect = document.getElementById(areaId);
    if (!areaSelect) return;
    const areas = districtAreas[district] || [];
    areaSelect.innerHTML = `<option value="">Select Area</option>` + areas.map(a => `<option value="${a}">${a}</option>`).join('');
  }

  //  MODAL HELPERS 
  function ensureStudentListingDetailModal() {
    if (document.getElementById('studentListingDetailModal')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal-overlay" id="studentListingDetailModal">
        <div class="modal-container listing-detail-modal-container" style="max-width:980px;max-height:92vh;overflow:auto;">
          <div class="ldm-header">
            <button class="modal-close-btn ldm-close" id="studentListingDetailClose"><span class="material-symbols-outlined">close</span></button>
          </div>
          <div class="modal-body" id="studentListingDetailBody"></div>
        </div>
      </div>`);
    document.getElementById('studentListingDetailClose')?.addEventListener('click', () => closeModalById('studentListingDetailModal'));
    document.getElementById('studentListingDetailModal')?.addEventListener('click', e => { if (e.target.id === 'studentListingDetailModal') closeModalById('studentListingDetailModal'); });
  }

  window.openStudentListingDetail = function(listingId, manageMode = false) {
    ensureStudentListingDetailModal();
    apiJSON(`api/listings/get-listing-detail.php?id=${encodeURIComponent(listingId)}`)
      .then(d => {
        const l = d.listing;
        const isOwner = String(l.user_id) === String(state.currentUser?.id);
        const body = document.getElementById('studentListingDetailBody');
        if (!body) return;
        const img = (l.images && l.images[0]) || 'uploads/listings/placeholder.jpg';
        body.innerHTML = `
          <img src="${img}" alt="${escHtml(l.title)}" style="width:100%;max-height:320px;object-fit:cover;border-radius:18px;margin-bottom:18px;"/>
          <div class="ldm-title-row" style="align-items:flex-start;gap:16px;">
            <div style="flex:1;">
              <div class="ldm-badges"><span class="ldm-badge ldm-badge-type">${escHtml(l.property_type_label || l.property_type || '')}</span><span class="ldm-badge ldm-badge-status-published">${escHtml(l.status || '')}</span>${Number(l.is_verified) ? '<span class="ldm-badge ldm-badge-verified">✓ Verified</span>' : ''}</div>
              <h2 class="ldm-title">${escHtml(l.title)}</h2>
              <p class="ldm-description" style="margin-top:8px;">${escHtml(l.description || '')}</p>
            </div>
            <div class="ldm-price-wrap"><div class="ldm-price">৳${Number(l.rent_price || 0).toLocaleString()}</div><div class="ldm-price-label">per month</div></div>
          </div>
          <div class="ldm-meta-row" style="margin-top:18px;">
            <div class="ldm-meta-item"><span class="material-symbols-outlined">location_on</span>${escHtml(l.area || '')}, ${escHtml(l.district || '')}</div>
            <div class="ldm-meta-item"><span class="material-symbols-outlined">school</span>${escHtml(l.university || '')}</div>
            <div class="ldm-meta-item"><span class="material-symbols-outlined">directions_walk</span>${escHtml(String(l.distance_value || ''))} ${escHtml(l.distance_unit || '')}</div>
            <div class="ldm-meta-item"><span class="material-symbols-outlined">calendar_month</span>${escHtml(l.available_from || '')}</div>
          </div>
          <div class="ldm-amenities" style="margin-top:16px;">${(l.amenities || []).map(a => `<div class="ldm-amenity-chip"><span class="material-symbols-outlined">check_circle</span>${escHtml(a)}</div>`).join('')}</div>
          <div style="display:grid;grid-template-columns:minmax(240px,320px) 1fr;gap:20px;margin-top:22px;align-items:start;">
            <div class="ldm-poster-card">
              <h4 class="ldm-poster-title"><span class="material-symbols-outlined" style="font-size:16px;">person</span> Posted By</h4>
              <div class="ldm-poster-info"><div class="ldm-poster-avatar" style="border-radius:50%;width:44px;height:44px;min-width:44px;overflow:hidden;">${getInitials(l.poster?.name || 'User')}</div><div><div class="ldm-poster-name">${escHtml(l.poster?.name || 'Listing Owner')}</div><div class="ldm-poster-uni">${escHtml(l.university || '')}</div></div></div>
              ${l.poster?.phone ? `<div class="ldm-phone-row"><span class="material-symbols-outlined" style="font-size:18px;color:#0c6780;">call</span><span class="ldm-phone">${escHtml(l.poster.phone)}</span></div>` : `<div class="ldm-phone-locked"><span class="material-symbols-outlined" style="font-size:16px;">lock</span> Phone hidden or sign-in required</div>`}
            </div>
            <div class="ldm-section" style="margin-top:0;">
              <h4 class="ldm-section-title"><span class="material-symbols-outlined" style="font-size:18px;">chat</span> Comments <span class="comment-count-badge">${(l.comments || []).length}</span></h4>
              <div class="ldm-comments-list">${(l.comments || []).length ? (l.comments || []).map(c => `<div class="comment-item"><div class="comment-avatar">${getInitials(c.user_name || 'U')}</div><div class="comment-content"><div class="comment-header"><span class="comment-name">${escHtml(c.user_name || '')}</span><span class="comment-time">${formatRelativeTime(c.created_at)}</span></div><p class="comment-text">${escHtml(c.comment_text || c.text || '')}</p></div></div>`).join('') : '<p style="font-size:13px;color:#75777e;font-style:italic;">No comments yet.</p>'}</div>
            </div>
          </div>
          ${isOwner ? `<div class="phone-visibility-wrap" style="margin-top:20px;"><div class="phone-visibility-label"><strong>Phone Number Visibility</strong>${Number(l.phone_hidden) ? 'Hidden from users' : 'Visible to logged-in users'}</div><label class="toggle-switch" style="width:36px;height:20px;"><input type="checkbox" ${Number(l.phone_hidden) ? '' : 'checked'} onchange="togglePhoneVisibility('${l.id}', this.checked); setTimeout(()=>openStudentListingDetail('${l.id}', true), 500);"/><span class="toggle-slider"></span></label></div>` : ''}
          ${isOwner && manageMode ? `<div class="my-listing-actions" style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;"><button class="btn-edit-listing" onclick="closeModalById('studentListingDetailModal');openEditListing('${l.id}')"><span class="material-symbols-outlined">edit</span> Edit</button><button class="btn-delete-listing" onclick="closeModalById('studentListingDetailModal');openDeleteConfirm('${l.id}')"><span class="material-symbols-outlined">delete</span> Delete</button></div>` : ''}
        `;
        openModalById('studentListingDetailModal');
      })
      .catch(err => showToast(err.message || 'Could not load listing detail.', 'error'));
  };

  function openModalById(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  function closeModalById(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      ['createListingModal', 'editListingModal', 'deleteConfirmModal', 'reportModal', 'roommateViewModal', 'studentListingDetailModal'].forEach(id => closeModalById(id));
    }
  });

  //  TOAST 
  function showToast(msg, type = 'success') {
    if (window.BashaBari && window.BashaBari.showToast) {
      window.BashaBari.showToast(msg, type);
      return;
    }
    // Fallback toast
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: 'check_circle', error: 'error', info: 'info' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="material-symbols-outlined">${icons[type] || 'info'}</span><span>${escHtml(msg)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 350);
    }, 3500);
  }

  //  UTILITY FUNCTIONS 
  function getInitials(name) {
    if (!name) return '??';
    return name.trim().split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  }

  function escHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }

  function setTextSafe(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function formatRelativeTime(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function formatTime(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="material-symbols-outlined ${i <= rating ? 'star-filled' : 'star-empty'}" style="font-size:18px;font-variation-settings:'FILL' ${i <= rating ? 1 : 0};">star</span>`;
    }
    return html;
  }

  function getNotifIcon(type) {
    const icons = { admin: 'admin_panel_settings', comment: 'comment', comments: 'comment', connections: 'person_add', connection: 'person_add' };
    return icons[type] || 'notifications';
  }

  
  window.navigateToSection = navigateTo;
  window.closeModalById = closeModalById;
  window.removeUploadedImage = function(idx, e) {
    e.stopPropagation();
    state.uploadedImages[idx] = '';
    initImageUploadGrid();
    
    state.uploadedImages.forEach((img, i) => {
      if (img) {
        const boxes = document.querySelectorAll('.img-upload-box');
        if (boxes[i]) {
          boxes[i].classList.add('has-image');
          boxes[i].innerHTML = `
            <img src="${img}" alt="Upload"/>
            <button class="img-remove-btn" onclick="removeUploadedImage(${i}, event)">×</button>
          `;
        }
      }
    });
  };

  //  DEMO DATA 
  function getDemoListings() {
    return [
      {
        id: 'listing_demo_1',
        title: 'Single Room Near NSU',
        district: 'Dhaka',
        area: 'Bashundhara',
        rent: 8500,
        type: 'Single Room',
        university: 'North South University (NSU)',
        distance: '0.5',
        transit: 'Walking',
        description: 'Cozy single room with attached bathroom. Quiet environment, great for studying.',
        amenities: ['WiFi', 'Attached Bathroom', 'Security'],
        images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600'],
        status: 'published',
        phoneHidden: false,
        postedDate: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'listing_demo_2',
        title: 'Shared Flat Near BRACU',
        district: 'Dhaka',
        area: 'Badda',
        rent: 6500,
        type: 'Shared Flat',
        university: 'BRAC University',
        distance: '0.3',
        transit: 'Walking',
        description: 'Modern shared flat with 2 bedrooms, perfect for students.',
        amenities: ['WiFi', 'Gas', 'Generator'],
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600'],
        status: 'pending',
        phoneHidden: true,
        postedDate: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  }

  function getDemoFavorites() {
    return [
      {
        id: 'fav_1',
        title: 'Full Furnished Flat Merul Badda',
        district: 'Dhaka',
        area: 'Merul Badda',
        rent: 15000,
        university: 'BRAC University',
        distance: '0.5 km',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'
      },
      {
        id: 'fav_2',
        title: 'Sublet Near UIU',
        district: 'Dhaka',
        area: 'Notun Bazar',
        rent: 6500,
        university: 'UIU',
        distance: '0.3 km',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'
      },
      {
        id: 'fav_3',
        title: 'Bachelor Flat Mirpur',
        district: 'Dhaka',
        area: 'Mirpur',
        rent: 9000,
        university: 'DIU',
        distance: '1 km',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'
      }
    ];
  }

  function getDemoConnections() {
    return [
      { id: 'conn_1', name: 'Farhan Ahmed', university: 'BRAC University' },
      { id: 'conn_2', name: 'Nadia Islam', university: 'North South University' }
    ];
  }

  function getDemoConnectionRequests() {
    return [
      {
        id: 'req_1',
        name: 'Sifat Hossain',
        university: 'AIUB',
        gender: 'Male',
        budget: '৳4,000–6,000',
        location: 'Mirpur, Dhaka',
        tags: ['Night Owl', 'Clean', 'Studious'],
        status: 'pending'
      },
      {
        id: 'req_2',
        name: 'Riya Akter',
        university: 'UIU',
        gender: 'Female',
        budget: '৳5,000–8,000',
        location: 'Badda, Dhaka',
        tags: ['Early Bird', 'Friendly', 'Non-Smoker'],
        status: 'pending'
      }
    ];
  }

  function getDemoComments() {
    return [
      {
        id: 'comment_1',
        listingTitle: 'Single Room Near NSU',
        listingId: 'listing_demo_1',
        text: 'Great place! The owner is very responsive and the area is safe.',
        date: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 'comment_2',
        listingTitle: 'Shared Flat Mirpur Section 11',
        listingId: 'listing_ext_1',
        text: 'Very clean and well-maintained. Close to bus stop.',
        date: new Date(Date.now() - 86400000 * 7).toISOString()
      }
    ];
  }

  function getDemoLandlordReviews() {
    return [
      {
        id: 'review_1',
        landlordName: 'Mr. Zaman Kabir',
        address: 'Bashundhara C-34',
        rating: 5,
        text: 'Excellent landlord. Very responsive and maintains the property well.',
        date: new Date(Date.now() - 86400000 * 10).toISOString()
      }
    ];
  }

  function getDemoNotifications() {
    return [
      {
        id: 'notif_1',
        type: 'admin',
        message: 'Your listing "Single Room Near NSU" has been approved and published.',
        date: new Date(Date.now() - 3600000).toISOString(),
        read: false
      },
      {
        id: 'notif_2',
        type: 'comments',
        message: 'Someone commented on your listing "Single Room Near NSU": "Is the room still available?"',
        date: new Date(Date.now() - 7200000).toISOString(),
        read: false
      },
      {
        id: 'notif_3',
        type: 'connections',
        message: 'Sifat Hossain sent you a connection request.',
        date: new Date(Date.now() - 86400000).toISOString(),
        read: false
      },
      {
        id: 'notif_4',
        type: 'admin',
        message: 'Welcome to BashaBari! Complete your profile to get started.',
        date: new Date(Date.now() - 86400000 * 3).toISOString(),
        read: true
      }
    ];
  }

  function getDemoConversations() {
    return [
      {
        id: 'conv_conn_1',
        name: 'Farhan Ahmed',
        type: 'connection',
        unread: true,
        messages: [
          { id: 'm1', from: 'them', text: 'Hey! I saw your listing near NSU. Is it still available?', time: new Date(Date.now() - 3600000).toISOString(), seen: true },
          { id: 'm2', from: 'me', text: 'Yes it is! Would you like to visit?', time: new Date(Date.now() - 3000000).toISOString(), seen: true },
          { id: 'm3', from: 'them', text: 'That would be great! When are you free?', time: new Date(Date.now() - 1800000).toISOString(), seen: false }
        ],
        lastMsg: 'That would be great! When are you free?',
        lastTime: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'conv_conn_2',
        name: 'Nadia Islam',
        type: 'connection',
        unread: false,
        messages: [
          { id: 'm4', from: 'me', text: 'Hi Nadia! Are you still looking for a roommate?', time: new Date(Date.now() - 86400000).toISOString(), seen: true },
          { id: 'm5', from: 'them', text: 'Yes! Tell me more about the area.', time: new Date(Date.now() - 82000000).toISOString(), seen: true }
        ],
        lastMsg: 'Yes! Tell me more about the area.',
        lastTime: new Date(Date.now() - 82000000).toISOString()
      }
    ];
  }

})();