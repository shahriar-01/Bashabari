(function () {
  'use strict';

  // DEMO CREDENTIALS
  const DEMO_USERS = [
    {
      email: 'admin@bashabari.com',
      password: 'Admin@1234',
      role: 'admin',
      name: 'Admin User',
      university: 'BashaBari HQ',
      studentId: 'ADMIN-001',
      phone: '+8801700000000',
      initials: 'AU',
    },
    {
      email: 'student@northsouth.edu',
      password: 'User@1234',
      role: 'student',
      name: 'Rahim Ahmed',
      university: 'North South University',
      studentId: 'NSU-2021-0142',
      phone: '+8801812345678',
      initials: 'RA',
    },
  ];

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
    'Khulna University of Engineering & Technology (KUET)',
    'Rajshahi University of Engineering & Technology (RUET)',
    'Military Institute of Science and Technology (MIST)',
    'Jahangirnagar University (JU)',
    'Independent University Bangladesh (IUB)',
  ];

  // STATE
  let currentUser = null;
  let activeModal = null;

 
  document.addEventListener('DOMContentLoaded', () => {
    injectHTML();
    loadAuthState();
    bindGlobalEvents();
    initScrollTopButton();
    initMobileDrawer();
    updateNavbarUI();
  });


  function injectHTML() {
    // Toast container
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.id = 'toastContainer';
    document.body.appendChild(toastContainer);

    // Scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = '<span class="material-symbols-outlined">arrow_upward</span>';
    document.body.appendChild(scrollBtn);

    // Mobile drawer overlay + drawer
    document.body.insertAdjacentHTML('beforeend', buildMobileDrawerHTML());

    // Sign In Modal
    document.body.insertAdjacentHTML('beforeend', buildSignInModalHTML());

    // Register Modal
    document.body.insertAdjacentHTML('beforeend', buildRegisterModalHTML());
  }

  // SIGN IN MODAL
  function buildSignInModalHTML() {
    return `
    <div class="modal-overlay" id="signinModal" role="dialog" aria-modal="true" aria-labelledby="signinTitle">
      <div class="modal-container" id="signinModalContainer">

        <!-- Header Band -->
        <div class="modal-header-band">
          <div class="modal-logo-row">
            <div class="modal-logo">Basha<span>Bari</span></div>
            <button class="modal-close-btn" id="signinCloseBtn" aria-label="Close">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <h2 class="modal-title" id="signinTitle">Welcome Back</h2>
          <p class="modal-subtitle">Sign in to access your student housing dashboard</p>
        </div>

        <!-- Form Body -->
        <div class="modal-body" id="signinFormBody">
          <form id="signinForm" novalidate autocomplete="on">

            <!-- Email -->
            <div class="form-group">
              <label class="form-label" for="signin_email">University Email</label>
              <div class="form-input-wrap">
                <span class="form-input-icon">
                  <span class="material-symbols-outlined">mail</span>
                </span>
                <input
                  class="form-input"
                  id="signin_email"
                  type="email"
                  placeholder="you@university.edu"
                  autocomplete="email"
                />
              </div>
              <div class="field-error" id="signin_email_err">
                <span class="material-symbols-outlined">error</span>
                <span></span>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label class="form-label" for="signin_password">Password</label>
              <div class="form-input-wrap">
                <span class="form-input-icon">
                  <span class="material-symbols-outlined">lock</span>
                </span>
                <input
                  class="form-input"
                  id="signin_password"
                  type="password"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  style="padding-right: 48px;"
                />
                <button type="button" class="input-suffix" id="signinTogglePwd" aria-label="Toggle password">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </div>
              <div class="field-error" id="signin_password_err">
                <span class="material-symbols-outlined">error</span>
                <span></span>
              </div>
            </div>

            <!-- Submit -->
            <button type="submit" class="modal-submit-btn" id="signinSubmitBtn">
              <div class="btn-spinner"></div>
              <span class="btn-text">Sign In to BashaBari</span>
            </button>

          </form>

          <!-- Divider -->
          <div class="modal-divider">
            <div class="modal-divider-line"></div>
            <span class="modal-divider-text">Demo Credentials</span>
            <div class="modal-divider-line"></div>
          </div>

          <!-- Demo Credentials -->
          <div class="demo-creds-box">
            <div class="demo-creds-title">
              <span class="material-symbols-outlined">info</span>
              For Demo / Testing Purposes
            </div>

            <div class="demo-cred-row">
              <div class="demo-cred-badge admin">
                <span class="material-symbols-outlined" style="font-size:10px;font-variation-settings:'FILL' 1;">shield_person</span>
                Admin Login
              </div>
              <div class="demo-cred-item">
                <strong>Email</strong>
                admin@bashabari.com
                <button class="demo-fill-btn" onclick="window.BashaBari.fillSignIn('admin@bashabari.com','Admin@1234')">Fill</button>
              </div>
              <div class="demo-cred-item">
                <strong>Password</strong>
                Admin@1234
              </div>
            </div>

            <div class="demo-cred-row">
              <div class="demo-cred-badge user">
                <span class="material-symbols-outlined" style="font-size:10px;font-variation-settings:'FILL' 1;">school</span>
                Student Login
              </div>
              <div class="demo-cred-item">
                <strong>Email</strong>
                student@northsouth.edu
                <button class="demo-fill-btn" onclick="window.BashaBari.fillSignIn('student@northsouth.edu','User@1234')">Fill</button>
              </div>
              <div class="demo-cred-item">
                <strong>Password</strong>
                User@1234
              </div>
            </div>
          </div>

          <!-- Switch to Register -->
          <div class="modal-switch">
            Don't have an account?
            <button class="modal-switch-link" id="goToRegister">Create one free →</button>
          </div>
        </div>

        <!-- Success State -->
        <div class="modal-success-state" id="signinSuccessState">
          <div class="success-icon-wrap">
            <span class="material-symbols-outlined">check_circle</span>
          </div>
          <div class="success-title">You're in! </div>
          <p class="success-text" id="signinSuccessText">Welcome back! Redirecting you to your dashboard...</p>
          <div class="success-redirect-bar">
            <div class="success-redirect-fill"></div>
          </div>
        </div>

      </div>
    </div>`;
  }

  // REGISTER MODAL
  function buildRegisterModalHTML() {
    const uniOptions = UNIVERSITIES.map(
      u => `<option value="${u}">${u}</option>`
    ).join('');

    return `
    <div class="modal-overlay" id="registerModal" role="dialog" aria-modal="true" aria-labelledby="registerTitle">
      <div class="modal-container" id="registerModalContainer">

        <!-- Header Band -->
        <div class="modal-header-band">
          <div class="modal-logo-row">
            <div class="modal-logo">Basha<span>Bari</span></div>
            <button class="modal-close-btn" id="registerCloseBtn" aria-label="Close">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <h2 class="modal-title" id="registerTitle">Create Your Account</h2>
          <p class="modal-subtitle">Join thousands of students finding their perfect home</p>
        </div>

        <!-- Form Body -->
        <div class="modal-body" id="registerFormBody">
          <form id="registerForm" novalidate autocomplete="off">

            <!-- Full Name + Phone -->
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="reg_name">Full Name</label>
                <div class="form-input-wrap">
                  <span class="form-input-icon">
                    <span class="material-symbols-outlined">person</span>
                  </span>
                  <input class="form-input" id="reg_name" type="text" placeholder="Rahim Ahmed" autocomplete="name" />
                </div>
                <div class="field-error" id="reg_name_err">
                  <span class="material-symbols-outlined">error</span><span></span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="reg_phone">Phone Number</label>
                <div class="form-input-wrap">
                  <span class="form-input-icon">
                    <span class="material-symbols-outlined">phone</span>
                  </span>
                  <input class="form-input" id="reg_phone" type="tel" placeholder="+8801XXXXXXXXX" />
                </div>
                <div class="field-error" id="reg_phone_err">
                  <span class="material-symbols-outlined">error</span><span></span>
                </div>
              </div>
            </div>

            <!-- Gender -->
            <div class="form-group">
              <label class="form-label" for="reg_gender">Gender</label>
              <div class="form-input-wrap">
                <span class="form-input-icon">
                  <span class="material-symbols-outlined">wc</span>
                </span>
                <select class="form-select" id="reg_gender">
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="field-error" id="reg_gender_err">
                <span class="material-symbols-outlined">error</span><span></span>
              </div>
            </div>

            <!-- University Email -->
            <div class="form-group">
              <label class="form-label" for="reg_email">University Student Email</label>
              <div class="form-input-wrap">
                <span class="form-input-icon">
                  <span class="material-symbols-outlined">mail</span>
                </span>
                <input class="form-input" id="reg_email" type="email" placeholder="yourname@university.edu" autocomplete="email" />
              </div>
              <div class="field-error" id="reg_email_err">
                <span class="material-symbols-outlined">error</span><span></span>
              </div>
            </div>

            <!-- University Select -->
            <div class="form-group">
              <label class="form-label" for="reg_university">Select University</label>
              <div class="form-input-wrap">
                <span class="form-input-icon">
                  <span class="material-symbols-outlined">school</span>
                </span>
                <select class="form-select" id="reg_university">
                  <option value="">Choose your university</option>
                  ${uniOptions}
                </select>
              </div>
              <div class="field-error" id="reg_university_err">
                <span class="material-symbols-outlined">error</span><span></span>
              </div>
            </div>

            <!-- Student ID -->
            <div class="form-group">
              <label class="form-label" for="reg_student_id">Student ID Card Number</label>
              <div class="form-input-wrap">
                <span class="form-input-icon">
                  <span class="material-symbols-outlined">badge</span>
                </span>
                <input class="form-input" id="reg_student_id" type="text" placeholder="e.g. NSU-2021-0142" />
              </div>
              <div class="field-error" id="reg_student_id_err">
                <span class="material-symbols-outlined">error</span><span></span>
              </div>
            </div>

            <!-- Password + Confirm Password -->
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="reg_password">Password</label>
                <div class="form-input-wrap">
                  <span class="form-input-icon">
                    <span class="material-symbols-outlined">lock</span>
                  </span>
                  <input
                    class="form-input"
                    id="reg_password"
                    type="password"
                    placeholder="Min 8 characters"
                    style="padding-right: 48px;"
                  />
                  <button type="button" class="input-suffix" id="regTogglePwd" aria-label="Toggle password">
                    <span class="material-symbols-outlined">visibility</span>
                  </button>
                </div>
                <div class="field-error" id="reg_password_err">
                  <span class="material-symbols-outlined">error</span><span></span>
                </div>
                <!-- Strength bar -->
                <div class="password-strength-wrap" id="pwdStrengthWrap" style="display:none;">
                  <div class="strength-bars">
                    <div class="strength-bar" id="sb1"></div>
                    <div class="strength-bar" id="sb2"></div>
                    <div class="strength-bar" id="sb3"></div>
                    <div class="strength-bar" id="sb4"></div>
                  </div>
                  <div class="strength-label" id="strengthLabel">Too short</div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="reg_confirm_password">Confirm Password</label>
                <div class="form-input-wrap">
                  <span class="form-input-icon">
                    <span class="material-symbols-outlined">lock_reset</span>
                  </span>
                  <input
                    class="form-input"
                    id="reg_confirm_password"
                    type="password"
                    placeholder="Re-enter password"
                    style="padding-right: 48px;"
                  />
                  <button type="button" class="input-suffix" id="regToggleConfirmPwd" aria-label="Toggle confirm password">
                    <span class="material-symbols-outlined">visibility</span>
                  </button>
                </div>
                <div class="field-error" id="reg_confirm_password_err">
                  <span class="material-symbols-outlined">error</span><span></span>
                </div>
              </div>
            </div>

            <!-- Submit -->
            <button type="submit" class="modal-submit-btn" id="registerSubmitBtn">
              <div class="btn-spinner"></div>
              <span class="btn-text">Create My Account →</span>
            </button>

          </form>

          <!-- Terms -->
          <p class="terms-text">
            By creating an account you agree to our
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            Student accounts require a valid university email.
          </p>

          <!-- Switch to Sign In -->
          <div class="modal-switch">
            Already have an account?
            <button class="modal-switch-link" id="goToSignIn">Sign in here →</button>
          </div>
        </div>

        <!-- Success State -->
        <div class="modal-success-state" id="registerSuccessState">
          <div class="success-icon-wrap">
            <span class="material-symbols-outlined">check_circle</span>
          </div>
          <div class="success-title">Account Created!</div>
          <p class="success-text">Welcome to BashaBari! Taking you to your dashboard...</p>
          <div class="success-redirect-bar">
            <div class="success-redirect-fill"></div>
          </div>
        </div>

      </div>
    </div>`;
  }

  // MOBILE DRAWER
  function buildMobileDrawerHTML() {
    return `
    <div class="mobile-drawer-overlay" id="mobileDrawerOverlay"></div>
    <div class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
      <div class="drawer-header">
        <div class="drawer-logo">BashaBari</div>
        <button class="drawer-close" id="drawerCloseBtn" aria-label="Close menu">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <nav class="drawer-nav">
        <a href="index.php" class="drawer-nav-link active">
          <span class="material-symbols-outlined">home</span> Home
        </a>
        <a href="browse-listings.php" class="drawer-nav-link">
          <span class="material-symbols-outlined">search</span> Browse Listings
        </a>
        <a href="find-roommates.php" class="drawer-nav-link">
          <span class="material-symbols-outlined">group</span> Find Roommate
        </a>
        <a href="landlord-reviews.php" class="drawer-nav-link">
          <span class="material-symbols-outlined">star</span> Landlord Reviews
        </a>
        <a href="about.php" class="drawer-nav-link">
          <span class="material-symbols-outlined">info</span> About
        </a>
      </nav>
      <div class="drawer-footer" id="drawerFooter">
        <button class="drawer-signin-btn" id="drawerSignInBtn">
          <span class="material-symbols-outlined">login</span> Sign In
        </button>
      </div>
    </div>`;
  }

  // AUTH STATE MANAGEMENT
  function loadAuthState() {
    
    if (window.CURRENT_USER) {
      currentUser = normalizeUser(window.CURRENT_USER);
      localStorage.setItem('bashabari_user', JSON.stringify(currentUser));
    } else {
      const stored = localStorage.getItem('bashabari_user');
      if (stored) {
        try { currentUser = normalizeUser(JSON.parse(stored)); }
        catch { currentUser = null; localStorage.removeItem('bashabari_user'); }
      }
    }

    
    fetch('api/auth/check-session.php')
      .then(r => r.json())
      .then(data => {
        if (data.loggedIn && data.user) {
          currentUser = normalizeUser(data.user);
          localStorage.setItem('bashabari_user', JSON.stringify(currentUser));
        } else {
          currentUser = null;
          localStorage.removeItem('bashabari_user');
        }
        updateNavbarUI();
      })
      .catch(() => updateNavbarUI());
  }

  function normalizeUser(user) {
    if (!user) return null;
    const name = user.name || user.full_name || 'User';
    return {
      id: user.id,
      email: user.email || '',
      name,
      full_name: name,
      role: user.role || 'student',
      university: user.university || '',
      university_id: user.university_id || null,
      profile_picture: user.profile_picture || null,
      phone: user.phone || '',
      gender: user.gender || '',
      studentId: user.student_id || user.studentId || '',
      student_id: user.student_id || user.studentId || '',
      initials: getInitials(name),
    };
  }

  function saveAuthState(user) {
    currentUser = user;
    localStorage.setItem('bashabari_user', JSON.stringify(user));
  }

  function clearAuthState() {
    currentUser = null;
    localStorage.removeItem('bashabari_user');
  }

  function getInitials(name) {
    if (!name) return '??';
    return name
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');
  }

  // UPDATE NAVBAR UI
  function updateNavbarUI() {
    const signInBtn = document.querySelector('.btn-signin');
    const navCta    = document.querySelector('.nav-cta');
    if (!navCta) return;

    if (currentUser) {
      
      navCta.innerHTML = buildAvatarHTML(currentUser);
      bindAvatarDropdown();

      
      updateDrawerForLoggedIn();
    } else {
    
      if (!document.querySelector('.btn-signin')) {
        navCta.innerHTML = '<button class="btn-signin" id="navSignInBtn">Sign In</button>';
      }
      bindSignInButton();
      updateDrawerForLoggedOut();
    }
  }

  function buildAvatarHTML(user) {
    const initials = getInitials(user.name);
    const roleLabel = user.role === 'admin' ? 'Admin' : 'Student';
    const roleIcon  = user.role === 'admin' ? 'shield_person' : 'school';
    return `
    <div class="nav-avatar-wrap" id="navAvatarWrap">
      <button class="nav-avatar-btn" id="navAvatarBtn" aria-label="Account menu" aria-expanded="false">
        ${initials}
      </button>
      <div class="avatar-dropdown" id="avatarDropdown" role="menu">
        <div class="dropdown-header">
          <div class="dropdown-name">${escapeHTML(user.name)}</div>
          <div class="dropdown-email">${escapeHTML(user.email)}</div>
          <div class="dropdown-role-badge ${user.role}">
            <span class="material-symbols-outlined" style="font-size:12px;font-variation-settings:'FILL' 1;">${roleIcon}</span>
            ${roleLabel}
          </div>
        </div>
        <div class="dropdown-menu">
          <a href="${user.role === 'admin' ? 'admin-dashboard.php' : 'student-dashboard.php'}" class="dropdown-item" role="menuitem">
            <span class="material-symbols-outlined">dashboard</span>
            My Dashboard
          </a>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item signout" id="dropdownSignOut" role="menuitem">
            <span class="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </div>
    </div>`;
  }

  function bindAvatarDropdown() {
    const avatarBtn = document.getElementById('navAvatarBtn');
    const dropdown  = document.getElementById('avatarDropdown');
    if (!avatarBtn || !dropdown) return;

    avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      dropdown.classList.toggle('open', !isOpen);
      avatarBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!avatarBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        avatarBtn.setAttribute('aria-expanded', 'false');
      }
    });

    const signOutBtn = document.getElementById('dropdownSignOut');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', handleSignOut);
    }
  }

  function handleSignOut() {
    fetch('api/auth/logout.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' }
    }).catch(() => null).finally(() => {
      clearAuthState();
      showToast('You have been signed out. See you soon!', 'info');
      setTimeout(() => { window.location.href = 'index.php'; }, 500);
    });
  }

  function bindSignInButton() {
    const btn = document.getElementById('navSignInBtn') || document.querySelector('.btn-signin');
    if (btn) {
      btn.removeEventListener('click', openSignInModal);
      btn.addEventListener('click', openSignInModal);
    }
  }

  function updateDrawerForLoggedIn() {
    const footer = document.getElementById('drawerFooter');
    if (!footer || !currentUser) return;
    const roleLabel = currentUser.role === 'admin' ? 'Admin' : 'Student';
    footer.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#0a192f,#0c6780);display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Manrope',sans-serif;font-size:14px;font-weight:700;flex-shrink:0;">
          ${getInitials(currentUser.name)}
        </div>
        <div style="overflow:hidden;">
          <div style="font-size:13px;font-weight:700;color:#0a192f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHTML(currentUser.name)}</div>
          <div style="font-size:11px;color:#75777e;">${roleLabel}</div>
        </div>
      </div>
      <button class="drawer-signin-btn" id="drawerSignOutBtn" style="background:linear-gradient(135deg,#ef4444,#c41a1a);">
        <span class="material-symbols-outlined">logout</span> Sign Out
      </button>`;

    const drawerSignOutBtn = document.getElementById('drawerSignOutBtn');
    if (drawerSignOutBtn) drawerSignOutBtn.addEventListener('click', () => {
      closeMobileDrawer();
      setTimeout(handleSignOut, 300);
    });
  }

  function updateDrawerForLoggedOut() {
    const footer = document.getElementById('drawerFooter');
    if (!footer) return;
    footer.innerHTML = `
      <button class="drawer-signin-btn" id="drawerSignInBtn">
        <span class="material-symbols-outlined">login</span> Sign In
      </button>`;
    const btn = document.getElementById('drawerSignInBtn');
    if (btn) btn.addEventListener('click', () => {
      closeMobileDrawer();
      setTimeout(openSignInModal, 350);
    });
  }

  // MODAL OPEN/CLOSE 
  function openModal(modalId) {
    const overlay = document.getElementById(modalId);
    if (!overlay) return;
    activeModal = modalId;
    overlay.classList.add('active');
    document.body.classList.add('modal-open');

   
    setTimeout(() => {
      const firstInput = overlay.querySelector('input, select');
      if (firstInput) firstInput.focus();
    }, 420);
  }

  function closeModal(modalId) {
    const overlay = document.getElementById(modalId || activeModal);
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    activeModal = null;

   
    setTimeout(() => {
      resetModal(modalId || activeModal);
    }, 400);
  }

  function resetModal(modalId) {
    if (modalId === 'signinModal') {
      const form = document.getElementById('signinForm');
      if (form) form.reset();
      clearAllErrors('signinForm');
      hideSuccessState('signinModal');
      const formBody = document.getElementById('signinFormBody');
      if (formBody) formBody.style.display = '';
    }
    if (modalId === 'registerModal') {
      const form = document.getElementById('registerForm');
      if (form) form.reset();
      clearAllErrors('registerForm');
      hideSuccessState('registerModal');
      const formBody = document.getElementById('registerFormBody');
      if (formBody) formBody.style.display = '';
      hidePwdStrength();
    }
  }

  function openSignInModal() {
    closeModal('registerModal');
    openModal('signinModal');
  }

  function openRegisterModal() {
    closeModal('signinModal');
    openModal('registerModal');
  }

  // BIND GLOBAL EVENTS
  function bindGlobalEvents() {
    // Initial sign-in button
    bindSignInButton();

    // Modal close buttons
    document.addEventListener('click', (e) => {

      if (e.target.closest('#signinCloseBtn'))    closeModal('signinModal');
      if (e.target.closest('#registerCloseBtn'))  closeModal('registerModal');

      
      if (e.target.id === 'signinModal')   closeModal('signinModal');
      if (e.target.id === 'registerModal') closeModal('registerModal');

      
      if (e.target.id === 'goToRegister') openRegisterModal();
      if (e.target.id === 'goToSignIn')   openSignInModal();
    });

    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeModal) closeModal(activeModal);
    });

    // Sign In Form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) signinForm.addEventListener('submit', handleSignIn);

    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', handleRegister);

    // Password toggles
    bindPasswordToggle('signinTogglePwd', 'signin_password');
    bindPasswordToggle('regTogglePwd', 'reg_password');
    bindPasswordToggle('regToggleConfirmPwd', 'reg_confirm_password');

    // Password strength
    const regPwd = document.getElementById('reg_password');
    if (regPwd) regPwd.addEventListener('input', () => updateStrengthBar(regPwd.value));

    // Live validation clearing
    bindLiveClearError('signin_email');
    bindLiveClearError('signin_password');
    bindLiveClearError('reg_name');
    bindLiveClearError('reg_phone');
    bindLiveClearError('reg_gender');
    bindLiveClearError('reg_email');
    bindLiveClearError('reg_university');
    bindLiveClearError('reg_student_id');
    bindLiveClearError('reg_password');
    bindLiveClearError('reg_confirm_password');
  }

  function bindPasswordToggle(btnId, inputId) {
    const btn   = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.querySelector('.material-symbols-outlined').textContent =
        isPassword ? 'visibility_off' : 'visibility';
    });
  }

  function bindLiveClearError(fieldId) {
    const el = document.getElementById(fieldId);
    if (!el) return;
    el.addEventListener('input', () => clearFieldError(fieldId));
    el.addEventListener('change', () => clearFieldError(fieldId));
  }

  // SIGN IN HANDLER
  function handleSignIn(e) {
    e.preventDefault();
    const email    = document.getElementById('signin_email').value.trim();
    const password = document.getElementById('signin_password').value;
    let valid = true;

    if (!email) { showFieldError('signin_email', 'Please enter your email address'); valid = false; }
    else if (!isValidEmail(email)) { showFieldError('signin_email', 'Please enter a valid email address'); valid = false; }
    if (!password) { showFieldError('signin_password', 'Please enter your password'); valid = false; }
    if (!valid) return;

    setButtonLoading('signinSubmitBtn', true);
    const fd = new FormData();
    fd.append('email', email);
    fd.append('password', password);

    fetch('api/auth/login.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' },
      body: fd
    })
      .then(r => r.json().then(data => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || !data.success) throw new Error(data.error || 'Invalid credentials.');
        const user = normalizeUser(data.user || data);
        saveAuthState(user);
        setButtonLoading('signinSubmitBtn', false);
        showSuccessState('signinModal', `Welcome back, ${user.name.split(' ')[0]}! Redirecting...`);
        setTimeout(() => {
          closeModal('signinModal');
          updateNavbarUI();
          showToast(`Welcome back, ${user.name.split(' ')[0]}! 👋`, 'success');
          setTimeout(() => { window.location.href = user.role === 'admin' ? 'admin-dashboard.php' : 'student-dashboard.php'; }, 500);
        }, 900);
      })
      .catch(err => {
        setButtonLoading('signinSubmitBtn', false);
        showFieldError('signin_email', err.message || 'Invalid email or password.');
        showFieldError('signin_password', err.message || 'Invalid email or password.');
        shakeModal('signinModalContainer');
      });
  }

  // REGISTER HANDLER
  function handleRegister(e) {
    e.preventDefault();
    const fields = {
      name:            document.getElementById('reg_name').value.trim(),
      phone:           document.getElementById('reg_phone').value.trim(),
      gender:          document.getElementById('reg_gender').value,
      email:           document.getElementById('reg_email').value.trim(),
      university:      document.getElementById('reg_university').value,
      studentId:       document.getElementById('reg_student_id').value.trim(),
      password:        document.getElementById('reg_password').value,
      confirmPassword: document.getElementById('reg_confirm_password').value,
    };
    let valid = true;
    if (!fields.name || fields.name.length < 3) { showFieldError('reg_name', 'Please enter your full name (min 3 characters)'); valid = false; }
    if (!fields.phone || !isValidPhone(fields.phone)) { showFieldError('reg_phone', 'Enter a valid Bangladeshi phone number'); valid = false; }
    if (!fields.gender) { showFieldError('reg_gender', 'Please select your gender'); valid = false; }
    if (!fields.email) { showFieldError('reg_email', 'Please enter your university email'); valid = false; }
    else if (!isValidEmail(fields.email)) { showFieldError('reg_email', 'Please enter a valid email address'); valid = false; }
    if (!fields.university) { showFieldError('reg_university', 'Please select your university'); valid = false; }
    if (!fields.studentId || fields.studentId.length < 4) { showFieldError('reg_student_id', 'Please enter a valid student ID'); valid = false; }
    if (!fields.password) { showFieldError('reg_password', 'Please enter a password'); valid = false; }
    else if (fields.password.length < 6) { showFieldError('reg_password', 'Password must be at least 6 characters'); valid = false; }
    if (!fields.confirmPassword) { showFieldError('reg_confirm_password', 'Please confirm your password'); valid = false; }
    else if (fields.password !== fields.confirmPassword) { showFieldError('reg_confirm_password', 'Passwords do not match'); valid = false; }
    if (!valid) return;

    setButtonLoading('registerSubmitBtn', true);
    const fd = new FormData();
    fd.append('full_name', fields.name);
    fd.append('phone', fields.phone);
    fd.append('gender', fields.gender.toLowerCase());
    fd.append('email', fields.email);
    fd.append('university', fields.university);
    fd.append('student_id', fields.studentId);
    fd.append('password', fields.password);
    fd.append('confirm_password', fields.confirmPassword);

    fetch('api/auth/register.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' },
      body: fd
    })
      .then(r => r.json().then(data => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || !data.success) throw new Error(data.error || 'Registration failed.');
        const user = normalizeUser(data.user || data);
        saveAuthState(user);
        setButtonLoading('registerSubmitBtn', false);
        showSuccessState('registerModal', 'Your account has been created! Taking you to your dashboard...');
        setTimeout(() => {
          closeModal('registerModal');
          updateNavbarUI();
          showToast(`Account created! Welcome to BashaBari, ${fields.name.split(' ')[0]}! 🏠`, 'success');
          setTimeout(() => { window.location.href = 'student-dashboard.php'; }, 500);
        }, 1000);
      })
      .catch(err => {
        setButtonLoading('registerSubmitBtn', false);
        showFieldError('reg_email', err.message || 'Registration failed.');
        shakeModal('registerModalContainer');
      });
  }

  // SUCCESS / LOADING STATES
  function showSuccessState(modalId, message) {
    const formBodyId = modalId === 'signinModal' ? 'signinFormBody' : 'registerFormBody';
    const successId  = modalId === 'signinModal' ? 'signinSuccessState' : 'registerSuccessState';
    const textId     = modalId === 'signinModal' ? 'signinSuccessText' : null;

    const formBody = document.getElementById(formBodyId);
    const success  = document.getElementById(successId);

    if (formBody) formBody.style.display = 'none';
    if (success)  {
      success.classList.add('visible');
      if (textId && message) {
        const textEl = document.getElementById(textId);
        if (textEl) textEl.textContent = message;
      }
    }
  }

  function hideSuccessState(modalId) {
    const successId = modalId === 'signinModal' ? 'signinSuccessState' : 'registerSuccessState';
    const success   = document.getElementById(successId);
    if (success) success.classList.remove('visible');
  }

  function setButtonLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.classList.toggle('loading', loading);
    btn.disabled = loading;
  }

  // PASSWORD STRENGTH
  function getPasswordStrength(pwd) {
    let score = 0;
    const checks = [
      pwd.length >= 8,
      /[A-Z]/.test(pwd),
      /[0-9]/.test(pwd),
      /[^A-Za-z0-9]/.test(pwd),
    ];
    checks.forEach(c => { if (c) score++; });
    const labels = ['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const classes = ['', 'weak', 'fair', 'good', 'strong'];
    return { score, label: labels[score], cls: classes[score] };
  }

  function updateStrengthBar(pwd) {
    const wrap = document.getElementById('pwdStrengthWrap');
    if (!wrap) return;

    if (!pwd) {
      wrap.style.display = 'none';
      return;
    }

    wrap.style.display = 'block';
    const { score, label, cls } = getPasswordStrength(pwd);
    const bars = ['sb1','sb2','sb3','sb4'];
    bars.forEach((id, i) => {
      const bar = document.getElementById(id);
      if (!bar) return;
      bar.className = 'strength-bar';
      if (i < score) bar.classList.add(cls);
    });

    const labelEl = document.getElementById('strengthLabel');
    if (labelEl) {
      labelEl.textContent = label;
      const colors = { 'Too Weak': '#ef4444', Weak: '#ef4444', Fair: '#f59e0b', Good: '#10b981', Strong: '#0c6780' };
      labelEl.style.color = colors[label] || '#75777e';
    }
  }

  function hidePwdStrength() {
    const wrap = document.getElementById('pwdStrengthWrap');
    if (wrap) wrap.style.display = 'none';
  }

  // FIELD VALIDATION HELPERS
  function showFieldError(fieldId, message) {
    const input  = document.getElementById(fieldId);
    const errDiv = document.getElementById(fieldId + '_err');
    if (input)  input.classList.add('has-error');
    if (errDiv) {
      errDiv.classList.add('visible');
      const span = errDiv.querySelector('span:last-child');
      if (span) span.textContent = message;
    }
  }

  function clearFieldError(fieldId) {
    const input  = document.getElementById(fieldId);
    const errDiv = document.getElementById(fieldId + '_err');
    if (input)  input.classList.remove('has-error');
    if (errDiv) errDiv.classList.remove('visible');
  }

  function clearAllErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
    form.querySelectorAll('.field-error').forEach(el => el.classList.remove('visible'));
  }

  // MODAL SHAKE ANIMATION
  function shakeModal(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.style.animation = 'none';
    container.offsetHeight; 
    container.style.animation = 'shakeModal 0.45s cubic-bezier(0.36,0.07,0.19,0.97)';
    if (!document.getElementById('shakeKeyframe')) {
      const style = document.createElement('style');
      style.id = 'shakeKeyframe';
      style.textContent = `
        @keyframes shakeModal {
          10%, 90% { transform: scale(1) translateX(-4px); }
          20%, 80% { transform: scale(1) translateX(6px); }
          30%, 50%, 70% { transform: scale(1) translateX(-6px); }
          40%, 60% { transform: scale(1) translateX(6px); }
          100% { transform: scale(1) translateX(0); }
        }`;
      document.head.appendChild(style);
    }
    setTimeout(() => { container.style.animation = ''; }, 500);
  }

  // DEMO FILL
  function fillSignIn(email, password) {
    const emailEl = document.getElementById('signin_email');
    const pwdEl   = document.getElementById('signin_password');
    if (emailEl) { emailEl.value = email; clearFieldError('signin_email'); }
    if (pwdEl)   { pwdEl.value = password; clearFieldError('signin_password'); }
  }

  // TOAST NOTIFICATIONS
  function showToast(message, type = 'success', duration = 3500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = { success: 'check_circle', error: 'error', info: 'info' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="material-symbols-outlined">${icons[type] || 'info'}</span>
      <span>${escapeHTML(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  }

  // SCROLL TO TOP
  function initScrollTopButton() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // MOBILE DRAWER 
  function initMobileDrawer() {
    const menuBtn = document.querySelector('.menu-btn');
    const overlay = document.getElementById('mobileDrawerOverlay');
    const drawer  = document.getElementById('mobileDrawer');
    const closeBtn = document.getElementById('drawerCloseBtn');

    if (menuBtn)  menuBtn.addEventListener('click', openMobileDrawer);
    if (overlay)  overlay.addEventListener('click', closeMobileDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);

    // Drawer sign-in
    const drawerSignIn = document.getElementById('drawerSignInBtn');
    if (drawerSignIn) drawerSignIn.addEventListener('click', () => {
      closeMobileDrawer();
      setTimeout(openSignInModal, 350);
    });
  }

  function openMobileDrawer() {
    const overlay = document.getElementById('mobileDrawerOverlay');
    const drawer  = document.getElementById('mobileDrawer');
    if (overlay) overlay.classList.add('open');
    if (drawer)  { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); }
    document.body.classList.add('modal-open');
  }

  function closeMobileDrawer() {
    const overlay = document.getElementById('mobileDrawerOverlay');
    const drawer  = document.getElementById('mobileDrawer');
    if (overlay) overlay.classList.remove('open');
    if (drawer)  { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
    document.body.classList.remove('modal-open');
  }

  // UTILITY HELPERS
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function isValidPhone(phone) {
  
    return /^(\+?880)?0?1[3-9]\d{8}$/.test(phone.replace(/[\s\-]/g, ''));
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  // PUBLIC API
  window.BashaBari = {
    openSignIn:  openSignInModal,
    openRegister: openRegisterModal,
    closeModal,
    showToast,
    fillSignIn,
    getCurrentUser: () => currentUser,
    isLoggedIn: () => !!currentUser,
    signOut: handleSignOut,
  };

})();