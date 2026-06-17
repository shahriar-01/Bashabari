'use strict';

/* Shorthand helpers */
const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initScrollReveal();
  initProgressBars();
  initHeroCounters();
  initImpactCounters();
  initStarRating();
  initFeedbackSection();
  initFeedbackForm();
  initCtaSignUpBtn();
  initHIWHover();
  initTeamHover();
  patchNavSignInBtn();
});

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function patchNavSignInBtn() {
  const navCta  = $('navCta');
  const menuBtn = $('menuBtn');

  
  if (navCta) {
    navCta.addEventListener('click', e => {
      if (e.target.closest('#navSignInBtn') || e.target.closest('.btn-signin')) {
        e.preventDefault();
        openSignInSafely();
      }
    });
  }

  /* Mobile hamburger */
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const drawer  = $('mobileDrawer');
      const overlay = $('mobileDrawerOverlay');
      if (drawer)  drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.classList.add('modal-open');
    });
  }
}

/* Safe wrapper */
function openSignInSafely() {
  if (window.BashaBari && typeof window.BashaBari.openSignIn === 'function') {
    window.BashaBari.openSignIn();
  }
}

function isLoggedIn() {
  if (window.BashaBari && typeof window.BashaBari.isLoggedIn === 'function') {
    return window.BashaBari.isLoggedIn();
  }
  try {
    return !!JSON.parse(localStorage.getItem('bashabari_user'));
  } catch { return false; }
}

function getCurrentUser() {
  if (window.BashaBari && typeof window.BashaBari.getCurrentUser === 'function') {
    return window.BashaBari.getCurrentUser();
  }
  try {
    return JSON.parse(localStorage.getItem('bashabari_user'));
  } catch { return null; }
}

function showToastSafely(msg, type = 'success') {
  if (window.BashaBari && typeof window.BashaBari.showToast === 'function') {
    window.BashaBari.showToast(msg, type);
  }
}

/* INTERSECTION OBSERVER */
function initScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });

  $$('.reveal-on-scroll').forEach(el => io.observe(el));
}

/* PROGRESS BARS */
function initProgressBars() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar    = entry.target;
        const target = bar.getAttribute('data-target-width');
        setTimeout(() => { bar.style.width = target; }, 250);
        io.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  $$('[data-target-width]').forEach(bar => io.observe(bar));
}

/* COUNTER ANIMATION */
function animateCount(el, target, duration = 1600) {
  if (!el) return;
  const startTime = performance.now();
  const update = now => {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(update);
}

/* Hero counters */
function initHeroCounters() {
  const heroStats = document.querySelector('.about-hero-stats');
  if (!heroStats) return;

  let fired = false;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !fired) {
        fired = true;
        $$('.hero-counter').forEach(el => {
          const target = parseInt(el.getAttribute('data-count'), 10) || 0;
          animateCount(el, target, 1400);
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.35 });
  io.observe(heroStats);
}

/* Impact section counters */
function initImpactCounters() {
  const grid = document.querySelector('.impact-stats-grid');
  if (!grid) return;

  let fired = false;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !fired) {
        fired = true;
        $$('.impact-counter').forEach(el => {
          const target = parseInt(el.getAttribute('data-count'), 10) || 0;
          animateCount(el, target, 1800);
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.25 });
  io.observe(grid);
}

/* STAR RATING UI */
function initStarRating() {
  const container  = $('fbStarRating');
  const numDisplay = $('fbStarNum');
  if (!container) return;

  let currentRating = 0;
  const stars = container.querySelectorAll('.star-btn');

  function renderStars(active, isHover = false) {
    stars.forEach((s, i) => {
      const lit = i < active;
      s.classList.toggle(isHover ? 'hovered' : 'filled', lit);
      s.classList.remove(isHover ? 'filled'  : 'hovered');
      if (!lit) { s.classList.remove('filled'); s.classList.remove('hovered'); }
    });
  }

  stars.forEach(star => {
    const val = parseInt(star.getAttribute('data-value'), 10);

    star.addEventListener('mouseenter', () => renderStars(val, true));
    star.addEventListener('mouseleave', () => renderStars(currentRating, false));
    star.addEventListener('click', () => {
      currentRating = val;
      container.setAttribute('data-rating', currentRating);
      renderStars(currentRating, false);
      if (numDisplay) numDisplay.textContent = `${currentRating} / 5`;
      clearFbError('fbRatingErr');
    });
  });
}

function initFeedbackSection() {
  renderFeedbackState();

  /* Re-render when auth changes */
  window.addEventListener('storage', e => {
    if (e.key === 'bashabari_user') renderFeedbackState();
  });

  let lastAuthState = isLoggedIn();
  setInterval(() => {
    const current = isLoggedIn();
    if (current !== lastAuthState) {
      lastAuthState = current;
      renderFeedbackState();
    }
  }, 800);
}

function renderFeedbackState() {
  const loginPrompt = $('feedbackLoginPrompt');
  const form        = $('feedbackAdminForm');
  const successEl   = $('feedbackSuccess');
  const title       = document.querySelector('.feedback-admin-card-title');
  const sub         = document.querySelector('.feedback-admin-card-sub');
  if (!loginPrompt || !form) return;

  if (isLoggedIn()) {
    loginPrompt.style.display = 'none';
  
    if (successEl && successEl.style.display === 'flex') return;
    form.style.display = 'flex';
    if (title) title.style.display = 'block';
    if (sub)   sub.style.display   = 'block';
    buildUserPreview();
  } else {
    loginPrompt.style.display = 'flex';
    form.style.display        = 'none';
    if (successEl) successEl.style.display = 'none';
    if (title) title.style.display = 'block';
    if (sub)   sub.style.display   = 'block';
  }
}

/* logged-in user chip at top of form */
function buildUserPreview() {
  const preview = $('feedbackUserPreview');
  if (!preview) return;
  const user = getCurrentUser();
  if (!user) { preview.style.display = 'none'; return; }

  const initials = getInitials(user.name || '');
  preview.style.display = 'flex';
  preview.innerHTML = `
    <div class="fup-avatar">${initials}</div>
    <div>
      <p class="fup-name">${escapeHTML(user.name || 'Student')}</p>
      <p class="fup-email">${escapeHTML(user.email || '')}</p>
    </div>`;
}

/* "Sign In to Continue" button inside feedback card */
document.addEventListener('click', e => {
  if (e.target.closest('#feedbackSignInBtn')) {
    openSignInSafely();
  }
});

/* FEEDBACK FORM — submit & validation */
function initFeedbackForm() {
  const form = $('feedbackAdminForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateFeedbackForm()) return;
    submitFeedback();
  });

  /* "Send Another" button */
  const againBtn = $('feedbackAgainBtn');
  if (againBtn) {
    againBtn.addEventListener('click', resetFeedbackForm);
  }
}

function validateFeedbackForm() {
  let valid = true;

  const topic  = ($('fbTopic')?.value   || '').trim();
  const rating = parseInt($('fbStarRating')?.getAttribute('data-rating') || '0', 10);
  const desc   = ($('fbDesc')?.value    || '').trim();

  clearFbError('fbTopicErr');
  clearFbError('fbRatingErr');
  clearFbError('fbDescErr');

  if (!topic) {
    setFbError('fbTopicErr', 'Please enter a topic for your feedback.');
    valid = false;
  } else if (topic.length < 3) {
    setFbError('fbTopicErr', 'Topic must be at least 3 characters.');
    valid = false;
  }

  if (rating < 1) {
    setFbError('fbRatingErr', 'Please select a star rating.');
    valid = false;
  }

  if (!desc) {
    setFbError('fbDescErr', 'Please write a description.');
    valid = false;
  } else if (desc.length < 10) {
    setFbError('fbDescErr', 'Description must be at least 10 characters.');
    valid = false;
  }

  return valid;
}

function submitFeedback() {
  const topic   = ($('fbTopic')?.value  || '').trim();
  const rating  = parseInt($('fbStarRating')?.getAttribute('data-rating') || '0', 10);
  const desc    = ($('fbDesc')?.value   || '').trim();
  const submitBtn = $('fbSubmitBtn');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

  const fd = new FormData();
  fd.append('topic', topic);
  fd.append('star_rating', rating);
  fd.append('description', desc);

  fetch('api/feedback/submit-feedback.php', {
    method: 'POST',
    headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '' },
    body: fd
  })
    .then(r => r.json().then(data => ({ ok: r.ok, data })))
    .then(({ ok, data }) => {
      if (!ok || !data.success) throw new Error(data.error || 'Could not submit feedback.');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Feedback'; }
      showFeedbackSuccess();
      showToastSafely('Message sent to admin! Thank you. 🙏', 'success');
    })
    .catch(err => {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Feedback'; }
      if ((err.message || '').toLowerCase().includes('authentication')) openSignInSafely();
      showToastSafely(err.message || 'Could not submit feedback.', 'error');
    });
}

function showFeedbackSuccess() {
  const form      = $('feedbackAdminForm');
  const successEl = $('feedbackSuccess');
  const title     = document.querySelector('.feedback-admin-card-title');
  const sub       = document.querySelector('.feedback-admin-card-sub');

  if (form)      form.style.display      = 'none';
  if (successEl) successEl.style.display = 'flex';
  if (title)     title.style.display     = 'none';
  if (sub)       sub.style.display       = 'none';
}

function resetFeedbackForm() {
  const form      = $('feedbackAdminForm');
  const successEl = $('feedbackSuccess');
  const title     = document.querySelector('.feedback-admin-card-title');
  const sub       = document.querySelector('.feedback-admin-card-sub');

  if (form)      { form.reset(); form.style.display = 'flex'; }
  if (successEl) successEl.style.display = 'none';
  if (title)     title.style.display     = 'block';
  if (sub)       sub.style.display       = 'block';

  /* Reset star rating */
  const starContainer = $('fbStarRating');
  const numDisplay    = $('fbStarNum');
  if (starContainer) {
    starContainer.setAttribute('data-rating', '0');
    starContainer.querySelectorAll('.star-btn')
      .forEach(s => s.classList.remove('filled', 'hovered'));
  }
  if (numDisplay) numDisplay.textContent = '0 / 5';

  clearFbError('fbTopicErr');
  clearFbError('fbRatingErr');
  clearFbError('fbDescErr');

  buildUserPreview();
}

/* Feedback error helpers */
function setFbError(id, msg) {
  const el = $(id);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function clearFbError(id) {
  const el = $(id);
  if (el) { el.textContent = ''; el.style.display = 'none'; }
}

/* CTA SECTION — "Create Free Account" button */
function initCtaSignUpBtn() {
  const btn = $('aboutCtaSignUpBtn');
  if (!btn) return;


  function updateCtaBtn() {
    btn.style.display = isLoggedIn() ? 'none' : 'inline-flex';
  }
  updateCtaBtn();
  setInterval(updateCtaBtn, 800);

  btn.addEventListener('click', () => {
    if (window.BashaBari && typeof window.BashaBari.openRegister === 'function') {
      window.BashaBari.openRegister();
    } else {
      openSignInSafely();
    }
  });
}

/* HOW IT WORKS */
function initHIWHover() {
  $$('.hiw-step-card').forEach(card => {
    const icon = card.querySelector('.hiw-step-icon');
    if (!icon) return;
    card.addEventListener('mouseenter', () => {
      icon.style.animation = 'floatIcon 2s ease-in-out infinite';
    });
    card.addEventListener('mouseleave', () => {
      icon.style.animation = '';
    });
  });
}

/* TEAM - avatar hover */
function initTeamHover() {
  $$('.team-card').forEach(card => {
    const avatar = card.querySelector('.team-avatar');
    if (!avatar) return;
    card.addEventListener('mouseenter', () => {
      avatar.style.animation = 'floatIcon 2s ease-in-out infinite';
    });
    card.addEventListener('mouseleave', () => {
      avatar.style.animation = '';
    });
  });
}

/* UTILITY HELPERS */
function getInitials(name) {
  if (!name) return '??';
  return name.trim().split(' ')
    .filter(Boolean).slice(0, 2)
    .map(w => w[0].toUpperCase()).join('');
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}