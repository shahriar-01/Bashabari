<?php require_once 'config/session.php'; $sessionUser = getCurrentUser(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="csrf-token" content="<?= htmlspecialchars($_SESSION['csrf_token'] ?? '', ENT_QUOTES, 'UTF-8') ?>"/>
  <script>window.CURRENT_USER = <?= json_encode($sessionUser, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?: 'null' ?>;</script>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>About - BashaBari | Your Academic Sanctuary</title>
  <link rel="stylesheet" href="style.css"/>
  <link rel="stylesheet" href="modal.css"/>
  <link rel="stylesheet" href="about.css"/>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
</head>

<body>
    

<!-- NAVBAR -->
<nav class="navbar" id="mainNavbar">
  <div class="navbar-inner">
    <a href="index.php">
    <div class="logo-bb">
   <img src="assets/Trans-Bashabari logo.png">
    <div class="logo">BashaBari</div>
    </div>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="index.php" class="nav-link">Home</a>
      <a href="browse-listings.php" class="nav-link">Browse Listings</a>
      <a href="find-roommates.php" class="nav-link">Find Roommate</a>
      <a href="landlord-reviews.php" class="nav-link">Landlord Reviews</a>
      <a href="about.php" class="nav-link active">About</a>
    </div>
    <div class="nav-cta" id="navCta">
      
      <button class="btn-signin" id="navSignInBtn">Sign In</button>
    </div>
    <button class="menu-btn" id="menuBtn" aria-label="Open navigation menu">
      <span class="material-symbols-outlined">menu</span>
    </button>
  </div>
</nav>



<main>

  <!-- 1. HERO BANNER -->
  <section class="about-hero">
    <div class="about-hero-bg">
      <div class="about-hero-gradient"></div>
      <div class="about-hero-pattern"></div>
    </div>

    <!-- Floating Cards -->
    <div class="about-float-card about-float-left animate-float-slow">
      <div class="afc-inner">
        <span class="material-symbols-outlined afc-icon" style="color:#9ae1ff;font-variation-settings:'FILL' 1;">verified</span>
        <p class="afc-text">100% Verified</p>
        <p class="afc-sub">Student Approved</p>
      </div>
    </div>
    <div class="about-float-card about-float-right animate-float-delayed">
      <div class="afc-inner">
        <span class="material-symbols-outlined afc-icon" style="color:#93f993;font-variation-settings:'FILL' 1;">school</span>
        <p class="afc-text">32+ Universities</p>
        <p class="afc-sub">Across Bangladesh</p>
      </div>
    </div>

    <!-- Central Content -->
    <div class="about-hero-content">
      <div class="about-hero-badge reveal-fade">
        <span class="material-symbols-outlined" style="font-size:16px;font-variation-settings:'FILL' 1;">favorite</span>
        Built for Students, By Students
      </div>
      <h1 class="about-hero-title reveal-fade" style="animation-delay:0.12s">
        Our Mission to Make<br/>
        <span class="about-hero-title-gradient">Student Housing Simple</span>
      </h1>
      <p class="about-hero-subtitle reveal-fade" style="animation-delay:0.22s">
        BashaBari is build to help the struggles of real students searching for safe, affordable
        housing near their campuses. The platform helps students to find suitable home.
      </p>

      <!-- Stats Strip -->
      <div class="about-hero-stats reveal-fade" style="animation-delay:0.32s">
        <div class="about-stat">
          <div class="about-stat-num-row">
            <span class="about-stat-num hero-counter" data-count="100">0</span>
            <span class="about-stat-num">+</span>
          </div>
          <span class="about-stat-label">Students Helped</span>
        </div>
        <div class="about-stat-divider"></div>
        <div class="about-stat">
          <div class="about-stat-num-row">
            <span class="about-stat-num hero-counter" data-count="13">0</span>
            <span class="about-stat-num">+</span>
          </div>
          <span class="about-stat-label">Verified Listings</span>
        </div>
        <div class="about-stat-divider"></div>
        <div class="about-stat">
          <div class="about-stat-num-row">
            <span class="about-stat-num hero-counter" data-count="32">0</span>
            <span class="about-stat-num">+</span>
          </div>
          <span class="about-stat-label">Universities</span>
        </div>
        <div class="about-stat-divider"></div>
        <div class="about-stat">
          <div class="about-stat-num-row">
            <span class="about-stat-num hero-counter" data-count="7">0</span>
          </div>
          <span class="about-stat-label">Divisions</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. MISSION & STORY -->
  <section class="about-mission-section">
    <div class="about-inner">
      <div class="about-mission-grid">

        <!-- Text Side -->
        <div class="about-mission-text reveal-on-scroll">
          <div class="section-badge">
            <span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:'FILL' 1;">auto_stories</span>
            Our Story
          </div>
          <h2 class="about-section-title">
            We Understand the<br/>
            <span class="text-gradient-sec">Student Struggle</span>
          </h2>
          <p class="about-section-body">
            It started in 2022 when a group of NSU students couldn't find reliable, safe housing
            close to campus. Every Facebook group post led to either scams or overpriced cramped
            rooms. Landlords who didn't respond. Apartments that looked nothing like the photos.
          </p>
          <p class="about-section-body">
            So we built BashaBari — a platform where previous student tenants verify listings,
            write honest landlord reviews, and help each other find compatible roommates.
            Built on <strong>transparency, trust, and community.</strong>
          </p>
          <div class="about-mission-pills">
            <span class="mission-pill"> Safety First</span>
            <span class="mission-pill"> Verified Only</span>
            <span class="mission-pill"> Community Driven</span>
            <span class="mission-pill">Student Focused</span>
          </div>
        </div>

        <!-- Visual Side -->
        <div class="about-mission-visual reveal-on-scroll" style="animation-delay:200ms">
          <div class="mission-glass-card">
            <div class="mission-card-header">
              <div class="mission-card-dot red"></div>
              <div class="mission-card-dot yellow"></div>
              <div class="mission-card-dot green"></div>
              <span class="mission-card-title-bar">BashaBari Mission</span>
            </div>
            <div class="mission-card-body">
              <div class="mission-item">
                <div class="mission-icon-wrap primary-bg">
                  <span class="material-symbols-outlined" style="font-size:20px;font-variation-settings:'FILL' 1;">shield_with_heart</span>
                </div>
                <div>
                  <p class="mission-item-title">Safe Housing for All</p>
                  <p class="mission-item-desc">Every listing verified by real students who lived there.</p>
                </div>
              </div>
              <div class="mission-item">
                <div class="mission-icon-wrap secondary-bg">
                  <span class="material-symbols-outlined" style="font-size:20px;font-variation-settings:'FILL' 1;">reviews</span>
                </div>
                <div>
                  <p class="mission-item-title">Honest Landlord Reviews</p>
                  <p class="mission-item-desc">Know your landlord before you sign anything.</p>
                </div>
              </div>
              <div class="mission-item">
                <div class="mission-icon-wrap tertiary-bg">
                  <span class="material-symbols-outlined" style="font-size:20px;font-variation-settings:'FILL' 1;">group</span>
                </div>
                <div>
                  <p class="mission-item-title">Compatible Roommates</p>
                  <p class="mission-item-desc">Match with students who share your lifestyle.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mission-glow-orb-1"></div>
          <div class="mission-glow-orb-2"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. HOW IT WORKS -->
  <section class="hiw-section">
    <div class="about-inner">
      <div class="about-section-header reveal-on-scroll">
        <div class="section-badge">
          <span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:'FILL' 1;">directions</span>
          Simple Process
        </div>
        <h2 class="about-section-title">How BashaBari Works</h2>
        <p class="about-section-subtitle">From search to move-in, we've got you covered in 4 simple steps.</p>
      </div>

      <div class="hiw-steps">
        <!-- Step 1 -->
        <div class="hiw-step reveal-on-scroll" style="animation-delay:0ms">
          <div class="hiw-step-num">01</div>
          <div class="hiw-step-card">
            <div class="hiw-step-icon hiw-icon-primary">
              <span class="material-symbols-outlined" style="font-size:32px;font-variation-settings:'FILL' 1;">search</span>
            </div>
            <h3 class="hiw-step-title">Search</h3>
            <p class="hiw-step-desc">Search by university, district, area, or price range. Smart filtering gets you results instantly — no more endless scrolling.</p>
            <div class="hiw-step-tag">Instant Results</div>
          </div>
          <div class="hiw-connector">
            <span class="material-symbols-outlined hiw-arrow">arrow_forward</span>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="hiw-step reveal-on-scroll" style="animation-delay:150ms">
          <div class="hiw-step-num">02</div>
          <div class="hiw-step-card">
            <div class="hiw-step-icon hiw-icon-secondary">
              <span class="material-symbols-outlined" style="font-size:32px;font-variation-settings:'FILL' 1;">tune</span>
            </div>
            <h3 class="hiw-step-title">Filter</h3>
            <p class="hiw-step-desc">Narrow by property type, rent budget, campus distance, and lifestyle preferences for roommate matching. 15+ powerful filters.</p>
            <div class="hiw-step-tag">15+ Filters</div>
          </div>
          <div class="hiw-connector">
            <span class="material-symbols-outlined hiw-arrow">arrow_forward</span>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="hiw-step reveal-on-scroll" style="animation-delay:300ms">
          <div class="hiw-step-num">03</div>
          <div class="hiw-step-card">
            <div class="hiw-step-icon hiw-icon-tertiary">
              <span class="material-symbols-outlined" style="font-size:32px;font-variation-settings:'FILL' 1;">connect_without_contact</span>
            </div>
            <h3 class="hiw-step-title">Connect</h3>
            <p class="hiw-step-desc">Message landlords directly, connect with roommates, and read verified reviews from students who lived there before you.</p>
            <div class="hiw-step-tag">Secure Messaging</div>
          </div>
          <div class="hiw-connector">
            <span class="material-symbols-outlined hiw-arrow">arrow_forward</span>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="hiw-step reveal-on-scroll" style="animation-delay:450ms">
          <div class="hiw-step-num">04</div>
          <div class="hiw-step-card hiw-step-card-last">
            <div class="hiw-step-icon hiw-icon-success">
              <span class="material-symbols-outlined" style="font-size:32px;font-variation-settings:'FILL' 1;">home_work</span>
            </div>
            <h3 class="hiw-step-title">Move In</h3>
            <p class="hiw-step-desc">Settle into your verified, student-approved home near campus. After moving in, share your experience and pay it forward.</p>
            <div class="hiw-step-tag">Happy Living</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. CORE VALUES -->
  <section class="values-section">
    <div class="about-inner">
      <div class="about-section-header reveal-on-scroll">
        <div class="section-badge section-badge-dark">
          <span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:'FILL' 1;">diamond</span>
          What We Stand For
        </div>
        <h2 class="about-section-title" style="color:#fff;">Our Core Values</h2>
        <p class="about-section-subtitle" style="color:rgba(185,199,228,0.85);">The principles that guide every feature we build and every decision we make.</p>
      </div>

      <div class="values-grid">
        <div class="value-card reveal-on-scroll" style="animation-delay:0ms">
          <div class="value-icon-wrap">
            <span class="material-symbols-outlined" style="font-size:28px;font-variation-settings:'FILL' 1;">visibility</span>
          </div>
          <h3 class="value-title">Transparency</h3>
          <p class="value-desc">No hidden fees, no fake listings. Every piece of information is honest, verified, and student-approved.</p>
        </div>
        <div class="value-card reveal-on-scroll" style="animation-delay:100ms">
          <div class="value-icon-wrap value-icon-sec">
            <span class="material-symbols-outlined" style="font-size:28px;font-variation-settings:'FILL' 1;">security</span>
          </div>
          <h3 class="value-title">Safety</h3>
          <p class="value-desc">Student safety is non-negotiable. We verify listings, review landlords, and protect your personal information.</p>
        </div>
        <div class="value-card reveal-on-scroll" style="animation-delay:200ms">
          <div class="value-icon-wrap value-icon-ter">
            <span class="material-symbols-outlined" style="font-size:28px;font-variation-settings:'FILL' 1;">diversity_3</span>
          </div>
          <h3 class="value-title">Community</h3>
          <p class="value-desc">We're stronger together. Our platform thrives on students helping students through reviews, connections, and shared experiences.</p>
        </div>
        <div class="value-card reveal-on-scroll" style="animation-delay:300ms">
          <div class="value-icon-wrap value-icon-warn">
            <span class="material-symbols-outlined" style="font-size:28px;font-variation-settings:'FILL' 1;">bolt</span>
          </div>
          <h3 class="value-title">Efficiency</h3>
          <p class="value-desc">Finding housing shouldn't take weeks. Our smart filters and matching system gets you to the right place fast.</p>
        </div>
        <div class="value-card reveal-on-scroll" style="animation-delay:400ms">
          <div class="value-icon-wrap value-icon-success">
            <span class="material-symbols-outlined" style="font-size:28px;font-variation-settings:'FILL' 1;">payments</span>
          </div>
          <h3 class="value-title">Affordability</h3>
          <p class="value-desc">We understand student budgets. BashaBari is completely free for students — no premium walls, no hidden charges.</p>
        </div>
        <div class="value-card reveal-on-scroll" style="animation-delay:500ms">
          <div class="value-icon-wrap value-icon-purple">
            <span class="material-symbols-outlined" style="font-size:28px;font-variation-settings:'FILL' 1;">verified_user</span>
          </div>
          <h3 class="value-title">Trust</h3>
          <p class="value-desc">Every interaction on BashaBari is backed by real student identities, university verification, and community accountability.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. TEAM -->
  <section class="team-section">
    <div class="about-inner">
      <div class="about-section-header reveal-on-scroll">
        <div class="section-badge">
          <span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:'FILL' 1;">people</span>
          The People Behind BashaBari
        </div>
        <h2 class="about-section-title">Meet Our Team</h2>
        <p class="about-section-subtitle">A passionate group of students who lived the problem and decided to solve it.</p>
      </div>

      <div class="team-grid">
        <div class="team-card reveal-on-scroll" style="animation-delay:0ms">
          <div class="team-avatar-wrap">
            <div class="team-avatar" style="background:linear-gradient(135deg,#0a192f,#0c6780);">SH</div>
            <div class="team-badge">Contributor</div>
          </div>
          <h3 class="team-name">Shahriar Hossain</h3>
          <p class="team-role">Student</p>
          <p class="team-univ">CSE | UIU | 233</p>
          <p class="team-bio">Building BashaBari has been an exciting journey into creating a student-centric solution that simplifies stressful search for safe and affordable housing near campuses.</p>
          <div class="team-socials">
            <a href="#" class="team-social-link" aria-label="Website">
              <span class="material-symbols-outlined" style="font-size:18px;">public</span>
            </a>
            <a href="#" class="team-social-link" aria-label="Share">
              <span class="material-symbols-outlined" style="font-size:18px;">share</span>
            </a>
          </div>
        </div>

        <div class="team-card reveal-on-scroll" style="animation-delay:100ms">
          <div class="team-avatar-wrap">
            <div class="team-avatar" style="background:linear-gradient(135deg,#0c6780,#77dc7a);">IH</div>
            <div class="team-badge team-badge-secondary">Contributor</div>
          </div>
          <h3 class="team-name">Ifaz Hossain</h3>
          <p class="team-role">Student</p>
          <p class="team-univ">CSE | UIU | 233</p>
          <p class="team-bio">Turning the messy hunt for student housing into something that actually makes sense by helping students quickly find a place near their university without getting lost in endless searching.</p>
          <div class="team-socials">
            <a href="#" class="team-social-link" aria-label="Website">
              <span class="material-symbols-outlined" style="font-size:18px;">public</span>
            </a>
            <a href="#" class="team-social-link" aria-label="Share">
              <span class="material-symbols-outlined" style="font-size:18px;">share</span>
            </a>
          </div>
        </div>

       <div class="team-card reveal-on-scroll" style="animation-delay:300ms">
          <div class="team-avatar-wrap">
            <div class="team-avatar" style="background:linear-gradient(135deg,#005316,#0c6780);">NK</div>
            <div class="team-badge team-badge-green">Contributor</div>
          </div>
          <h3 class="team-name">Nawshina Kader</h3>
          <p class="team-role">Student</p>
          <p class="team-univ">CSE | UIU | 233</p>
          <p class="team-bio">Managing the growing student community and keeping a close eye on every listing, making sure each one actually helps students find a place they can rely on.</p>
          <div class="team-socials">
            <a href="#" class="team-social-link" aria-label="Website">
              <span class="material-symbols-outlined" style="font-size:18px;">public</span>
            </a>
            <a href="#" class="team-social-link" aria-label="Share">
              <span class="material-symbols-outlined" style="font-size:18px;">share</span>
            </a>
          </div>
        </div>

        <div class="team-card reveal-on-scroll" style="animation-delay:200ms">
          <div class="team-avatar-wrap">
            <div class="team-avatar" style="background:linear-gradient(135deg,#1e3a5f,#0c6780);">YT</div>
            <div class="team-badge team-badge-tertiary">Contributor</div>
          </div>
          <h3 class="team-name">Md. Yousuf Talukder</h3>
          <p class="team-role">Student</p>
          <p class="team-univ">CSE | UIU | 193</p>
          <p class="team-bio">Working with some great teammates, and helping to minimize the struggles of the students.</p>
          <div class="team-socials">
            <a href="#" class="team-social-link" aria-label="Website">
              <span class="material-symbols-outlined" style="font-size:18px;">public</span>
            </a>
            <a href="#" class="team-social-link" aria-label="Share">
              <span class="material-symbols-outlined" style="font-size:18px;">share</span>
            </a>
          </div>
        </div>


      </div>
    </div>
  </section>

  <!-- 6. IMPACT -->
  <section class="impact-section">
    <div class="about-inner">
      <div class="impact-grid">

        <!-- Text + Bars -->
        <div class="impact-text reveal-on-scroll">
          <div class="section-badge">
            <span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:'FILL' 1;">trending_up</span>
            Our Impact
          </div>
          <h2 class="about-section-title">
            Making a Real<br/>
            <span class="text-gradient-sec">Difference Every Day</span>
          </h2>
          <p class="about-section-body">
            Since launching in 2022, BashaBari has grown into Bangladesh's most trusted student
            housing platform. Here's what we've accomplished together with our community.
          </p>
          <div class="impact-bar-list">
            <div class="impact-bar-item">
              <div class="impact-bar-label-row">
                <span>Student Satisfaction</span><span>96%</span>
              </div>
              <div class="impact-bar-track">
                <div class="impact-bar-fill" data-target-width="96%" style="width:0%"></div>
              </div>
            </div>
            <div class="impact-bar-item">
              <div class="impact-bar-label-row">
                <span>Listing Verification Rate</span><span>100%</span>
              </div>
              <div class="impact-bar-track">
                <div class="impact-bar-fill impact-bar-fill-sec" data-target-width="100%" style="width:0%"></div>
              </div>
            </div>
            <div class="impact-bar-item">
              <div class="impact-bar-label-row">
                <span>Successful Roommate Matches</span><span>89%</span>
              </div>
              <div class="impact-bar-track">
                <div class="impact-bar-fill impact-bar-fill-ter" data-target-width="89%" style="width:0%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stat Cards -->
        <div class="impact-stats-grid reveal-on-scroll" style="animation-delay:200ms">
          <div class="impact-stat-card">
            <span class="material-symbols-outlined impact-stat-icon" style="color:#9ae1ff;font-variation-settings:'FILL' 1;">home</span>
            <span class="impact-stat-num impact-counter" data-count="14">0</span>
            <span class="impact-stat-label">Active Listings</span>
          </div>
          <div class="impact-stat-card">
            <span class="material-symbols-outlined impact-stat-icon" style="color:#93f993;font-variation-settings:'FILL' 1;">group</span>
            <span class="impact-stat-num impact-counter" data-count="100">0</span>
            <span class="impact-stat-label">Students Served</span>
          </div>
          <div class="impact-stat-card">
            <span class="material-symbols-outlined impact-stat-icon" style="color:#f59e0b;font-variation-settings:'FILL' 1;">star</span>
            <span class="impact-stat-num impact-counter" data-count="10">0</span>
            <span class="impact-stat-label">Landlord Reviews</span>
          </div>
          <div class="impact-stat-card">
            <span class="material-symbols-outlined impact-stat-icon" style="color:#fb923c;font-variation-settings:'FILL' 1;">handshake</span>
            <span class="impact-stat-num impact-counter" data-count="62">0</span>
            <span class="impact-stat-label">Roommate Connections</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. FEEDBACK / MESSAGE TO ADMIN -->
  <section class="feedback-admin-section" id="feedbackSection">
    <div class="about-inner">
      <div class="feedback-admin-grid">

        <!-- Info Side -->
        <div class="feedback-admin-info reveal-on-scroll">
          <div class="section-badge">
            <span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:'FILL' 1;">chat</span>
            We're Listening
          </div>
          <h2 class="about-section-title">
            Share Your<br/>
            <span class="text-gradient-sec">Feedback With Us</span>
          </h2>
          <p class="about-section-body">
            Your feedback directly shapes BashaBari. Every suggestion, complaint, and compliment
            is read by our team. Help us make the platform better for every student.
          </p>
          <div class="feedback-contact-list">
            <div class="fci-item">
              <div class="fci-icon-wrap">
                <span class="material-symbols-outlined" style="font-size:20px;font-variation-settings:'FILL' 1;">mail</span>
              </div>
              <div>
                <p class="fci-label">Email Us</p>
                <p class="fci-value">support@bashabari.com</p>
              </div>
            </div>
            <div class="fci-item">
              <div class="fci-icon-wrap fci-icon-sec">
                <span class="material-symbols-outlined" style="font-size:20px;font-variation-settings:'FILL' 1;">location_on</span>
              </div>
              <div>
                <p class="fci-label">Based In</p>
                <p class="fci-value">Dhaka, Bangladesh</p>
              </div>
            </div>
            <div class="fci-item">
              <div class="fci-icon-wrap fci-icon-ter">
                <span class="material-symbols-outlined" style="font-size:20px;font-variation-settings:'FILL' 1;">schedule</span>
              </div>
              <div>
                <p class="fci-label">Response Time</p>
                <p class="fci-value">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback Card -->
        <div class="feedback-admin-form-wrap reveal-on-scroll" style="animation-delay:200ms">
          <div class="feedback-admin-card" id="feedbackCard">
            <h3 class="feedback-admin-card-title">Send a Message to Admin</h3>
            <p class="feedback-admin-card-sub">Your feedback goes directly to our team.</p>

            <!-- NOT LOGGED IN STATE -->
            <div class="feedback-login-prompt" id="feedbackLoginPrompt" style="display:none;">
              <div class="flp-icon-wrap">
                <span class="material-symbols-outlined" style="font-size:48px;font-variation-settings:'FILL' 1;">lock</span>
              </div>
              <p class="flp-title">Login Required</p>
              <p class="flp-sub">You need to be signed in to send feedback to our admin team.</p>
              <button class="btn-flp-signin" id="feedbackSignInBtn">
                <span class="material-symbols-outlined" style="font-size:18px;">login</span>
                Sign In to Continue
              </button>
            </div>

            <!-- LOGGED IN FORM -->
            <form class="feedback-admin-form" id="feedbackAdminForm" novalidate style="display:none;">

              <!-- User Info Preview -->
              <div class="feedback-user-preview" id="feedbackUserPreview"></div>

              <div class="fb-form-group">
                <label class="fb-label">Topic</label>
                <div class="fb-input-wrap">
                  <span class="material-symbols-outlined fb-input-icon">label</span>
                  <input type="text" class="fb-input" id="fbTopic"
                    placeholder="e.g. Feature Request, Bug Report, General Feedback"/>
                </div>
                <span class="fb-error" id="fbTopicErr"></span>
              </div>

              <div class="fb-form-group">
                <label class="fb-label">Rate BashaBari</label>
                <div class="star-rating-wrap">
                  <div class="star-rating-ui" id="fbStarRating" data-rating="0">
                    <span class="star-btn material-symbols-outlined" data-value="1">star</span>
                    <span class="star-btn material-symbols-outlined" data-value="2">star</span>
                    <span class="star-btn material-symbols-outlined" data-value="3">star</span>
                    <span class="star-btn material-symbols-outlined" data-value="4">star</span>
                    <span class="star-btn material-symbols-outlined" data-value="5">star</span>
                  </div>
                  <span class="star-rating-num" id="fbStarNum">0 / 5</span>
                </div>
                <span class="fb-error" id="fbRatingErr"></span>
              </div>

              <div class="fb-form-group">
                <label class="fb-label">Description</label>
                <div class="fb-textarea-wrap">
                  <textarea class="fb-input fb-textarea" id="fbDesc" rows="5"
                    placeholder="Tell us more about your experience, suggestions, or issues..."></textarea>
                </div>
                <span class="fb-error" id="fbDescErr"></span>
              </div>

              <button type="submit" class="fb-submit-btn" id="fbSubmitBtn">
                <span class="material-symbols-outlined" style="font-size:18px;">send</span>
                Send Message to Admin
              </button>
            </form>

            <!-- SUCCESS STATE -->
            <div class="feedback-success" id="feedbackSuccess" style="display:none;">
              <div class="feedback-success-icon">
                <span class="material-symbols-outlined" style="font-size:56px;color:#10b981;font-variation-settings:'FILL' 1;">check_circle</span>
              </div>
              <h3 class="fs-title">Message Sent! 🎉</h3>
              <p class="fs-sub">Thank you for your feedback. Our admin team will review it and get back to you within 24 hours.</p>
              <button class="btn-fs-again" id="feedbackAgainBtn">
                <span class="material-symbols-outlined" style="font-size:16px;">refresh</span>
                Send Another Message
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- 8. FINAL CTA -->
  <section class="about-cta-section">
    <div class="about-cta-pattern"></div>
    <div class="about-cta-inner">
      <div class="about-cta-content reveal-on-scroll">
        <h2 class="about-cta-title">Ready to Find Your<br/>Academic Sanctuary?</h2>
        <p class="about-cta-sub">Join over 200+ students who found their perfect home near campus with BashaBari.</p>
        <div class="about-cta-btns">
          <a href="browse-listings.php" class="btn-about-cta-primary">
            <span class="material-symbols-outlined" style="font-size:20px;">search</span>
            Browse Listings
          </a>
          <a href="find-roommates.php" class="btn-about-cta-secondary">
            <span class="material-symbols-outlined" style="font-size:20px;">group</span>
            Find Roommates
          </a>
          <!-- CTA for guests: sign up -->
          <button class="btn-about-cta-ghost" id="aboutCtaSignUpBtn" style="display:none;">
            <span class="material-symbols-outlined" style="font-size:20px;">person_add</span>
            Create Free Account
          </button>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- FOOTER -->
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">BashaBari</div>
        <p class="footer-brand-text">Redefining student housing with transparency, safety, and community in mind. Your academic journey starts with a safe home.</p>
        <div class="footer-socials">
          <a href="#" class="footer-social-btn" aria-label="Website">
            <span class="material-symbols-outlined" style="font-size:18px;">public</span>
          </a>
          <a href="#" class="footer-social-btn" aria-label="Share">
            <span class="material-symbols-outlined" style="font-size:18px;">share</span>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h5 class="footer-col-title">Platform</h5>
        <ul class="footer-links">
          <li><a href="browse-listings.php">Browse Listings</a></li>
          <li><a href="find-roommates.php">Find Roommate</a></li>
          <li><a href="landlord-reviews.php">Landlord Reviews</a></li>
          <li><a href="#">Safety Guide</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5 class="footer-col-title">Company</h5>
        <ul class="footer-links">
          <li><a href="about.php">About Us</a></li>
          <li><a href="#">Partner with Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Contact Support</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5 class="footer-col-title">Legal</h5>
        <ul class="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© 2026 BashaBari. Your Academic Sanctuary. All rights reserved.</div>
      <div class="footer-bottom-right">
        <span>Designed for Students</span>
        <span>Made in Bangladesh</span>
      </div>
    </div>
  </div>
</footer>

<!-- SCRIPTS -->
<script src="modal.js"></script>
<script src="about.js"></script>

</body>
</html>