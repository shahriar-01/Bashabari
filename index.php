<?php 
require_once 'config/session.php'; 
$sessionUser = getCurrentUser(); 
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="csrf-token" content="<?= htmlspecialchars($_SESSION['csrf_token'] ?? '', ENT_QUOTES, 'UTF-8') ?>"/>
  <script>window.CURRENT_USER = <?= json_encode($sessionUser, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?: 'null' ?>;</script>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>BashaBari - Academic Sanctuary</title>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
  <link rel="stylesheet" href="modal.css"/>
  <link rel="stylesheet" href="browse.css">
  <link rel="stylesheet" href="roommates.css">
  <link rel="stylesheet" href="landlord.css">
  <link rel="stylesheet" href="about.css">
</head>
<body>

<!-- TopNavBar -->
<div class="navbar">
  <div class="navbar-inner">
    <a href="index.php">
    <div class="logo-bb">
   <img src="assets/Trans-Bashabari logo.png">
    <div class="logo">BashaBari</div>
    </div>
    </a>
    <div class="nav-links">
      <a href="index.php" class="nav-link active">Home</a>
      <a href="browse-listings.php" class="nav-link">Browse Listings</a>
      <a href="find-roommates.php" class="nav-link">Find Roommate</a>
      <a href="landlord-reviews.php" class="nav-link">Landlord Reviews</a>
      <a href="about.php" class="nav-link">About</a>
    </div>
    <div class="nav-cta">
      <button class="btn-signin">Sign In</button>
    </div>
    <button class="menu-btn">
      <span class="material-symbols-outlined">menu</span>
    </button>
  </div>
</div>

<!-- Main Content -->
<main>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-bg">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRLpyEXO9vTn9d34at9uMvH-BY0H5Rig5KKg16SW1veoUz-4Xyzhcz7FRtwJp41DHXJRc32Dr4GuEjwuBp-iRUzOE8tojZFIIEMYs537nzufVYn-NQyQoRwCEn_yrN3B2Ko1BNZaVMFvgJA_MXafKoPCKsmTNAgjRH0xcY1321qrrnqjC6pxCSmCjyM5rovKOMwMmP-8192253Tjjoy2WBxyrpFIuzlRXhdDkHICWSQdC517VDq94AkCAckBTQ-yE_iZtb57ZBFbY" alt="Dark stylized city map background" class="hero-bg-img"/>
      <div class="hero-overlay"></div>
    </div>

    <!-- Floating Card Left -->
    <div class="float-card float-card-left animate-float-slow">
      <div class="float-card-inner">
        <div class="float-card-img-wrap">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDimvjys-B1ym2YDFB665n-Q_cY4bQVbVhlZm1YqiGMWT-iRMCRAuSHOiB7TFsaS2e1q__CNIWlWWjLJ8tnskGoPQpdZ3rO283l6a6lMGwPjh2uzbVhejXit2cxB2NbDeVffip1-Tw7hOCnpWIRCzmY9rlfaD8cD4h5j0zO_pb_h1f6-Sgbfvlz1MLYwu_SPTP2CM6RF8B0dxZIAAQ8N2a5V21x_FA2Tl4gQSY31aF9cBz8jcRsK82TZkVybIOv6ycDbhkXhu6s9FU" alt="Property"/>
          <div class="badge-verified">Verified</div>
        </div>
        <h4 class="float-card-title">Single Room Near NSU</h4>
        <p class="float-card-location">
          <span class="material-symbols-outlined" style="font-size:14px;">location_on</span> Bashundhara
        </p>
        <div class="float-card-footer">
          <span class="float-card-price">৳8,500/mo</span>
          <div class="float-card-rating">
            <span class="material-symbols-outlined star-fill" style="font-size:14px;font-variation-settings:'FILL' 1;">star</span> 4.9
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Card Right -->
    <div class="float-card float-card-right animate-float-delayed">
      <div class="float-card-inner float-card-right-inner">
        <div class="float-avatar-row">
          <div class="float-avatar">FA</div>
          <div>
            <p class="float-name">Farhan A.</p>
            <p class="float-univ">CSE @ BRAC University</p>
          </div>
        </div>
        <div class="float-message-box">
          <p class="float-message-text">Looking for a roommate who respects quiet hours after 10 PM.</p>
          <div class="float-message-footer">
            <span class="float-match">96% Match</span>
            <button class="btn-connect animate-pulse-soft">Connect</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Central Content -->
    <div class="hero-content">
      <div class="hero-badge">
        <span class="material-symbols-outlined" style="font-size:16px;font-variation-settings:'FILL' 1;color:#77dc7a;">verified_user</span>
        Trusted by Students
      </div>
      <h1 class="hero-title">
        Find Your Perfect House<br/>
        <span class="hero-title-gradient">Near Your Campus</span>
      </h1>
      <p class="hero-subtitle">
        Verified listings, honest landlord reviews, and compatible roommates<br/>
        - all in one trusted platform designed for students.
      </p>
      <div class="search-bar">
        <div class="search-input-wrap">
          <span class="material-symbols-outlined search-icon">search</span>
          <input class="search-input" id="homeHeroSearchInput" placeholder="Search by University, Area, or Property Type..." type="text"/>
        </div>
        <a href="browse-listings.php" class="btn-search" id="homeHeroSearchBtn">Search</a>
      </div>
      <div class="hero-tags">
        <a href="browse-listings.php?district=Dhaka&area=Mirpur" class="hero-tag" data-area="Mirpur">Mirpur</a>
        <a href="browse-listings.php?district=Dhaka&area=Uttara" class="hero-tag" data-area="Uttara">Uttara</a>
        <a href="browse-listings.php?district=Dhaka&area=Gulshan" class="hero-tag" data-area="Gulshan">Gulshan</a>
        <a href="browse-listings.php?district=Dhaka&area=Khilgaon" class="hero-tag" data-area="Khilgaon">Khilgaon</a>
        <a href="browse-listings.php?search=Bashabo" class="hero-tag" data-area="Bashabo">Bashabo</a>
        <a href="browse-listings.php?search=Nikunjo" class="hero-tag" data-area="Nikunjo">Nikunjo</a>
      </div>
    </div>
  </section>

  <!-- University Tags Slider -->
  <section class="uni-slider-section">
    <div class="uni-slider-heading">
      <h3 class="uni-slider-label">The Institutions we cover so far</h3>
    </div>
    <div class="uni-slider-track">
      <div class="uni-slider-inner animate-scroll">
        <span class="uni-tag">🎓 BUET</span>
        <span class="uni-tag">🎓 University of Dhaka</span>
        <span class="uni-tag">🎓 BRAC University</span>
        <span class="uni-tag">🎓 North South University</span>
        <span class="uni-tag">🎓 Jahangirnagar University</span>
        <span class="uni-tag">🎓 DIU</span>
        <span class="uni-tag">🎓 EWU</span>
        <span class="uni-tag">🎓 IUB</span>
        <span class="uni-tag">🎓 MIST</span>
        <span class="uni-tag">🎓 AIUB</span>
        <span class="uni-tag">🎓 UIU</span>
        <span class="uni-tag">🎓 Jagannath University</span>
        <!-- loop  -->
        <span class="uni-tag">🎓 BUET</span>
        <span class="uni-tag">🎓 University of Dhaka</span>
        <span class="uni-tag">🎓 BRAC University</span>
        <span class="uni-tag">🎓 North South University</span>
      </div>
    </div>
  </section>

  <!-- Why Choose BashaBari -->
  <section class="why-section">
    <div class="why-inner">
      <div class="why-header">
        <h2 class="why-title">Why Choose BashaBari ?</h2>
        <p class="why-subtitle">We've built BashaBari to solve the specific challenges students face when moving for education.</p>
      </div>
      <div class="why-grid">
        <!-- Card 1 -->
        <div class="why-card reveal-on-scroll">
          <div class="why-card-overlay"></div>
          <div class="why-card-content">
            <div class="why-icon why-icon-primary">
              <span class="material-symbols-outlined" style="font-size:30px;">verified</span>
            </div>
            <h3 class="why-card-title">Verified Listings</h3>
            <p class="why-card-text">Every listing is verified by previous student tenants for safety. This makes platform more reliable.</p>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="why-card reveal-on-scroll" style="animation-delay:150ms">
          <div class="why-card-overlay why-card-overlay-2"></div>
          <div class="why-card-content">
            <div class="why-icon why-icon-secondary">
              <span class="material-symbols-outlined" style="font-size:30px;">group</span>
            </div>
            <h3 class="why-card-title">Roommate Matching</h3>
            <p class="why-card-text">Find compatible roommates based on preferences, verified and lifestyle. And makes easy to find.</p>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="why-card reveal-on-scroll" style="animation-delay:300ms">
          <div class="why-card-overlay why-card-overlay-3"></div>
          <div class="why-card-content">
            <div class="why-icon why-icon-tertiary">
              <span class="material-symbols-outlined" style="font-size:30px;">school</span>
            </div>
            <h3 class="why-card-title">Student-Centric</h3>
            <p class="why-card-text">Filters tailored for students: walkability to campus, study-friendly environments, and affordable pricing models.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Listings -->
  <section class="listings-section">
    <div class="listings-inner">
      <div class="listings-header">
        <div>
          <h2 class="listings-title">Featured Listings</h2>
          <p class="listings-subtitle">Hand-picked residences in prime university zones.</p>
        </div>
        <button class="btn-view-all">
          View All Listings <span class="material-symbols-outlined" style="font-size:20px;">arrow_forward</span>
        </button>
      </div>
      <div class="listings-grid">

        <!-- Card 1 -->
        <div class="listing-card">
          <div class="listing-img-wrap">
            <img src="assets/card-index-1.jpg" alt="Modern Student Apartment" class="listing-img"/>
            <div class="listing-badge listing-badge-tertiary">Verified</div>
            <button class="listing-fav listing-fav-filled">
              <span class="material-symbols-outlined" style="font-size:22px;font-variation-settings:'FILL' 1;color:#ba1a1a;">favorite</span>
            </button>
            <div class="listing-avail">Available from: July</div>
            <div class="listing-price-tag"><p class="listing-price">৳9,500/mo</p></div>
          </div>
          <p class="listing-posted"> • Posted 2h ago</p>
          <div class="listing-body">
            <div class="listing-info">
              <h3 class="listing-name">Single Room Near NSU</h3>
              <p class="listing-location">
                <span class="material-symbols-outlined" style="font-size:18px;">location_on</span>
                Bashundhara R/A, Block D
              </p>
              <p class="listing-distance">0.5 km walking distance from NSU</p>
            </div>
            <div class="listing-tags">
              <span class="listing-tag">WIFI</span>
              <span class="listing-tag">BALCONY</span>
              <span class="listing-tag">ATTACHED BATH</span>
            </div>
            <div class="listing-actions">
              <button class="btn-details">View Details</button>
              <button class="btn-message">
                <span class="material-symbols-outlined" style="font-size:18px;">chat_bubble</span> Message
              </button>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="listing-card">
          <div class="listing-img-wrap">
            <img src="assets/card 1.2.jpg" alt="Quiet Study Environment" class="listing-img"/>
            <div class="listing-badge listing-badge-tertiary">Verified</div>
            <button class="listing-fav">
              <span class="material-symbols-outlined" style="font-size:22px;">favorite</span>
            </button>
            <div class="listing-avail">Available from: August</div>
            <div class="listing-price-tag"><p class="listing-price">৳15,000/mo</p></div>
          </div>
          <p class="listing-posted"> • Posted 5h ago</p>
          <div class="listing-body">
            <div class="listing-info">
              <h3 class="listing-name">Full Furnished Flat - Near Brac</h3>
              <p class="listing-location">
                <span class="material-symbols-outlined" style="font-size:18px;">location_on</span>
                Merul Badda
              </p>
              <p class="listing-distance">0.5 km distance from BRACU</p>
            </div>
            <div class="listing-tags">
              <span class="listing-tag">SECURITY</span>
              <span class="listing-tag">PARKING</span>
              <span class="listing-tag">LIFT</span>
            </div>
            <div class="listing-actions">
              <button class="btn-details">View Details</button>
              <button class="btn-message">
                <span class="material-symbols-outlined" style="font-size:18px;">chat_bubble</span> Message
              </button>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="listing-card">
          <div class="listing-img-wrap">
            <img src="assets/card 1.6.jpg" alt="Modern Studio" class="listing-img"/>
            <div class="listing-badge listing-badge-tertiary">Verified</div>
            <button class="listing-fav">
              <span class="material-symbols-outlined" style="font-size:22px;">favorite</span>
            </button>
            <div class="listing-avail">Available from: September</div>
            <div class="listing-price-tag"><p class="listing-price">৳6,500/mo</p></div>
          </div>
          <p class="listing-posted"> • Posted 1d ago</p>
          <div class="listing-body">
            <div class="listing-info">
              <h3 class="listing-name">Shared Flat - Near UIU</h3>
              <p class="listing-location">
                <span class="material-symbols-outlined" style="font-size:18px;">location_on</span>
                Notun Bazar
              </p>
              <p class="listing-distance">0.3 km distance from UIU</p>
            </div>
            <div class="listing-tags">
              <span class="listing-tag">WIFI</span>
              <span class="listing-tag">SECURITY</span>
              <span class="listing-tag">PARKING</span>
            </div>
            <div class="listing-actions">
              <button class="btn-details">View Details</button>
              <button class="btn-message">
                <span class="material-symbols-outlined" style="font-size:18px;">chat_bubble</span> Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Find Roommates Section -->
  <section class="roommate-section">
    <div class="roommate-inner">
      <div class="roommate-text">
        <h2 class="roommate-title">Looking For Roommate?<br/><span class="roommate-title-accent">Find Your Perfect Roommate.</span></h2>
        <p class="roommate-subtitle">The roommate matching features connects you with students based on lifestyle habits, university, and budget preferences.</p>
        <div class="roommate-btns">
          <button class="btn-roommate-primary animate-pulse-soft">Start Roommate Matching</button>
          <button class="btn-roommate-secondary">List Yourself As Roommate</button>
        </div>
        <div class="roommate-social-proof">
          <div class="avatar-stack">
            <div class="avatar-circle av1"></div>
            <div class="avatar-circle av2"></div>
            <div class="avatar-circle av3"></div>
            <div class="avatar-circle av4">+5k</div>
          </div>
          <p class="roommate-proof-text">Join thousands finding homes together.</p>
        </div>
      </div>
      <div class="roommate-cards-wrap">
        <div class="roommate-cards-glass">
          <div class="roommate-card reveal-on-scroll" style="animation-delay:100ms;">
            <div class="rm-avatar rm-av-blue">RH</div>
            <div class="rm-info">
              <p class="rm-name">Rahat Hossain</p>
              <p class="rm-univ">CSE, BRACU • Quiet</p>
            </div>
            <div class="rm-match">
              <p class="rm-match-pct rm-match-high">98% Match</p>
            </div>
          </div>
          <div class="roommate-card reveal-on-scroll" style="animation-delay:300ms;">
            <div class="rm-avatar rm-av-orange">SA</div>
            <div class="rm-info">
              <p class="rm-name">Sifat Ahmed</p>
              <p class="rm-univ">BBA, NSU • Night Owl</p>
            </div>
            <div class="rm-match">
              <p class="rm-match-pct rm-match-low">85% Match</p>
            </div>
          </div>
        </div>
        <div class="roommate-glow-1"></div>
        <div class="roommate-glow-2"></div>
      </div>
    </div>
  </section>

  <!-- Landlord Reviews -->
  <section class="reviews-section">
    <div class="reviews-inner">
      <div class="reviews-header">
        <div class="reviews-header-left">
          <h2 class="reviews-title">Landlords Reviews</h2>
          <p class="reviews-subtitle">Don't just take our word for it. Read honest ratings from students who lived there before you.</p>
        </div>
        <a href="landlord-reviews.php" class="reviews-view-all">View All Reviews <span class="material-symbols-outlined">arrow_forward</span></a>
      </div>
      <div class="reviews-grid">

        <!-- Review Card 1 -->
        <div class="review-card">
          <div class="review-card-top">
            <div>
              <h4 class="review-landlord">Mr. Zaman Kabir</h4>
              <p class="review-property">Property: Bashundhara C-34</p>
            </div>
            <div class="review-rating">
              <span class="material-symbols-outlined star-fill" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span> 4.9
            </div>
          </div>
          <div class="review-bars">
            <div class="bar-row">
              <div class="bar-label-row"><span>Safety</span><span>95%</span></div>
              <div class="bar-track"><div class="bar-fill bar-fill-sec" data-target-width="95%" style="width:0%"></div></div>
            </div>
            <div class="bar-row">
              <div class="bar-label-row"><span>Responsiveness</span><span>90%</span></div>
              <div class="bar-track"><div class="bar-fill bar-fill-sec" data-target-width="90%" style="width:0%"></div></div>
            </div>
            <div class="bar-row">
              <div class="bar-label-row"><span>Maintenance</span><span>98%</span></div>
              <div class="bar-track"><div class="bar-fill bar-fill-ter" data-target-width="98%" style="width:0%"></div></div>
            </div>
          </div>
        </div>

        <!-- Review Card 2 -->
        <div class="review-card">
          <div class="review-card-top">
            <div>
              <h4 class="review-landlord">Mrs. Salma Begum</h4>
              <p class="review-property">Property: Mohakhali Enclave</p>
            </div>
            <div class="review-rating">
              <span class="material-symbols-outlined star-fill" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span> 4.7
            </div>
          </div>
          <div class="review-bars">
            <div class="bar-row">
              <div class="bar-label-row"><span>Safety</span><span>92%</span></div>
              <div class="bar-track"><div class="bar-fill bar-fill-sec" data-target-width="92%" style="width:0%"></div></div>
            </div>
            <div class="bar-row">
              <div class="bar-label-row"><span>Responsiveness</span><span>96%</span></div>
              <div class="bar-track"><div class="bar-fill bar-fill-sec" data-target-width="96%" style="width:0%"></div></div>
            </div>
            <div class="bar-row">
              <div class="bar-label-row"><span>Maintenance</span><span>88%</span></div>
              <div class="bar-track"><div class="bar-fill bar-fill-ter" data-target-width="88%" style="width:0%"></div></div>
            </div>
          </div>
        </div>

        <!-- Review Card 3 -->
        <div class="review-card">
          <div class="review-card-top">
            <div>
              <h4 class="review-landlord">Engr. Arif Hasan</h4>
              <p class="review-property">Property: Dhanmondi Student Loft</p>
            </div>
            <div class="review-rating">
              <span class="material-symbols-outlined star-fill" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span> 4.5
            </div>
          </div>
          <div class="review-bars">
            <div class="bar-row">
              <div class="bar-label-row"><span>Safety</span><span>85%</span></div>
              <div class="bar-track"><div class="bar-fill bar-fill-sec" data-target-width="85%" style="width:0%"></div></div>
            </div>
            <div class="bar-row">
              <div class="bar-label-row"><span>Responsiveness</span><span>88%</span></div>
              <div class="bar-track"><div class="bar-fill bar-fill-sec" data-target-width="88%" style="width:0%"></div></div>
            </div>
            <div class="bar-row">
              <div class="bar-label-row"><span>Maintenance</span><span>92%</span></div>
              <div class="bar-track"><div class="bar-fill bar-fill-ter" data-target-width="92%" style="width:0%"></div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Student Feedback Slider -->
  <section class="feedback-section">
    <div class="feedback-heading">
      <h2 class="feedback-title">Recent Feedbacks</h2>
    </div>
    <div class="feedback-track-wrap">
      <div class="feedback-track animate-scroll-slow">
       
        <div class="feedback-card">
          <p class="feedback-text">"BashaBari made finding an apartment near campus completely stress-free. The verification badge gave my parents peace of mind."</p>
          <div class="feedback-user">
            <div class="feedback-avatar fav-primary">SA</div>
            <div class="feedback-user-info">
              <div class="feedback-user-row">
                <p class="feedback-name">Sadia A.</p>
                <div class="feedback-stars">
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                </div>
              </div>
              <p class="feedback-univ">BRAC University Student</p>
            </div>
          </div>
        </div>
        <div class="feedback-card">
          <p class="feedback-text">"Found my best friend through the Roommate Matching tool! We share a flat in Bashundhara now and it's perfect."</p>
          <div class="feedback-user">
            <div class="feedback-avatar fav-secondary">TK</div>
            <div class="feedback-user-info">
              <div class="feedback-user-row">
                <p class="feedback-name">Tanvir K.</p>
                <div class="feedback-stars">
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                </div>
              </div>
              <p class="feedback-univ">NSU Student</p>
            </div>
          </div>
        </div>
        <div class="feedback-card">
          <p class="feedback-text">"The landlord reviews are 100% accurate. Avoided a problematic landlord thanks to the community ratings."</p>
          <div class="feedback-user">
            <div class="feedback-avatar fav-tertiary">RM</div>
            <div class="feedback-user-info">
              <div class="feedback-user-row">
                <p class="feedback-name">Ria M.</p>
                <div class="feedback-stars">
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                </div>
              </div>
              <p class="feedback-univ">Dhaka University Student</p>
            </div>
          </div>
        </div>
        <!-- Duplicate -->
        <div class="feedback-card">
          <p class="feedback-text">"BashaBari made finding an apartment near campus completely stress-free. The verification badge gave my parents peace of mind."</p>
          <div class="feedback-user">
            <div class="feedback-avatar fav-primary">SA</div>
            <div class="feedback-user-info">
              <div class="feedback-user-row">
                <p class="feedback-name">Sadia A.</p>
                <div class="feedback-stars">
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                </div>
              </div>
              <p class="feedback-univ">BRAC University Student</p>
            </div>
          </div>
        </div>
        <div class="feedback-card">
          <p class="feedback-text">"Found my best friend through the Roommate Matching tool! We share a flat in Bashundhara now and it's perfect."</p>
          <div class="feedback-user">
            <div class="feedback-avatar fav-secondary">TK</div>
            <div class="feedback-user-info">
              <div class="feedback-user-row">
                <p class="feedback-name">Tanvir K.</p>
                <div class="feedback-stars">
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                </div>
              </div>
              <p class="feedback-univ">NSU Student</p>
            </div>
          </div>
        </div>
        <div class="feedback-card">
          <p class="feedback-text">"The landlord reviews are 100% accurate. Avoided a problematic landlord thanks to the community ratings."</p>
          <div class="feedback-user">
            <div class="feedback-avatar fav-tertiary">RM</div>
            <div class="feedback-user-info">
              <div class="feedback-user-row">
                <p class="feedback-name">Ria M.</p>
                <div class="feedback-stars">
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                  <span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:'FILL' 1;">star</span>
                </div>
              </div>
              <p class="feedback-univ">Dhaka University Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="cta-section">
    <div class="cta-inner">
      <h2 class="cta-title">Ready to find your next home?</h2>
      <p class="cta-subtitle">Whether you're looking for a quiet study spot or a social flat with roommates, your sanctuary is just a search away.</p>
      <div class="cta-btns">
        <button class="btn-cta-primary hover-glow">Search Listings</button>
        <button class="btn-cta-secondary hover-glow">List Your Flat</button>
      </div>
    </div>
  </section>

</main>

<!-- Footer -->
<div class="footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">BashaBari</div>
        <p class="footer-brand-text">Redefining student housing with transparency, safety, and community in mind. Your academic journey starts with a safe home.</p>
        <div class="footer-socials">
          <a href="#" class="footer-social-btn"><span class="material-symbols-outlined" style="font-size:18px;">public</span></a>
          <a href="#" class="footer-social-btn"><span class="material-symbols-outlined" style="font-size:18px;">share</span></a>
        </div>
      </div>
      <div class="footer-col">
        <h5 class="footer-col-title">Platform</h5>
        <ul class="footer-links">
          <li><a href="browse-listings.php">Browse Listings</a></li>
          <li><a href="find-roommates.php">Find Roommate</a></li>
          <li><a href="landlord-reviews.php">Landlord Reviews</a></li>
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
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-target-width');
          bar.style.width = targetWidth;
          observer.unobserve(bar);
        }
      });
    }, observerOptions);
    document.querySelectorAll('[data-target-width]').forEach(bar => observer.observe(bar));
  });
</script>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('homeHeroSearchInput');
    const btn = document.getElementById('homeHeroSearchBtn');
    function goSearch(e) {
      if (e) e.preventDefault();
      const q = (input?.value || '').trim();
      window.location.href = q ? `browse-listings.php?search=${encodeURIComponent(q)}` : 'browse-listings.php';
    }
    btn?.addEventListener('click', goSearch);
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') goSearch(e); });

    document.querySelector('.btn-view-all')?.addEventListener('click', () => {
      window.location.href = 'browse-listings.php';
    });

    document.querySelector('.btn-cta-primary')?.addEventListener('click', () => {
      window.location.href = 'browse-listings.php';
    });

    document.querySelector('.btn-cta-secondary')?.addEventListener('click', () => {
      const user = window.BashaBari?.getCurrentUser?.() || window.CURRENT_USER || null;
      if (!user) {
        window.BashaBari?.openSignIn?.();
        return;
      }
      if (user.role === 'admin') window.location.href = 'admin-dashboard.php';
      else window.location.href = 'student-dashboard.php?section=my-listings&open_create_listing=1';
    });


    const feedbackTrack = document.querySelector('.feedback-track');
    if (feedbackTrack) {
      fetch('api/feedback/get-feedback.php?featured=1')
        .then(r => r.json())
        .then(data => {
          const items = data.feedback || data.messages || [];
          if (!data.success || !items.length) return;
          const repeated = [...items, ...items];
          feedbackTrack.innerHTML = repeated.map((f, i) => {
            const name = f.user_name || 'BashaBari User';
            const initials = getInitials(name);
            const rating = Math.max(1, Math.min(5, Number(f.star_rating || 5)));
            return `
              <div class="feedback-card">
                <p class="feedback-text">"${escapeHTML(f.description || f.topic || '')}"</p>
                <div class="feedback-user">
                  <div class="feedback-avatar ${['fav-primary','fav-secondary','fav-tertiary'][i % 3]}">${escapeHTML(initials)}</div>
                  <div class="feedback-user-info">
                    <div class="feedback-user-row">
                      <p class="feedback-name">${escapeHTML(name)}</p>
                      <div class="feedback-stars">${Array.from({length: rating}).map(() => '<span class="material-symbols-outlined star-yellow" style="font-size:16px;font-variation-settings:\'FILL\' 1;">star</span>').join('')}</div>
                    </div>
                    <p class="feedback-univ">${escapeHTML(f.user_email || 'Student Feedback')}</p>
                  </div>
                </div>
              </div>`;
          }).join('');
        })
        .catch(() => null);
    }

    const grid = document.querySelector('.listings-grid');
    if (grid) {
      fetch('api/listings/get-listings.php?limit=3')
        .then(r => r.json())
        .then(data => {
          if (!data.success || !Array.isArray(data.listings)) return;
          grid.innerHTML = data.listings.map(l => buildHomeListingCard(l)).join('');
          grid.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', () => openHomeListingDetail(btn.dataset.id));
          });
          grid.querySelectorAll('.btn-message').forEach(btn => {
            btn.addEventListener('click', () => {
              const user = window.BashaBari?.getCurrentUser?.() || window.CURRENT_USER || null;
              if (!user) { window.BashaBari?.openSignIn?.(); return; }
              window.location.href = `student-dashboard.php?section=messages&user_id=${encodeURIComponent(btn.dataset.owner || '')}`;
            });
          });
        })
        .catch(() => null);
    }

    function buildHomeListingCard(l) {
      const img = l.image_path || (l.images && l.images[0]) || 'uploads/listings/placeholder.jpg';
      const amenities = (l.amenities || []).slice(0, 3);
      return `
        <div class="listing-card" data-id="${l.id}">
          <div class="listing-img-wrap">
            <img src="${escapeHTML(img)}" alt="${escapeHTML(l.title)}" class="listing-img"/>
            ${Number(l.is_verified) ? '<div class="listing-badge listing-badge-tertiary">Verified</div>' : ''}
            <button class="listing-fav"><span class="material-symbols-outlined" style="font-size:22px;">favorite</span></button>
            <div class="listing-avail">Available from: ${escapeHTML(l.available_from || 'Soon')}</div>
            <div class="listing-price-tag"><p class="listing-price">৳${Number(l.rent_price || 0).toLocaleString()}/mo</p></div>
          </div>
          <p class="listing-posted"> • Posted ${formatHomeAgo(l.created_at, l.id)}</p>
          <div class="listing-body">
            <div class="listing-info">
              <h3 class="listing-name">${escapeHTML(l.title)}</h3>
              <p class="listing-location"><span class="material-symbols-outlined" style="font-size:18px;">location_on</span>${escapeHTML(l.area || '')}, ${escapeHTML(l.district || '')}</p>
              <p class="listing-distance">${escapeHTML(String(l.distance_value || ''))} ${escapeHTML(l.distance_unit || '')} distance from ${escapeHTML(l.university_short || l.university || '')}</p>
            </div>
            <div class="listing-tags">${amenities.map(a => `<span class="listing-tag">${escapeHTML(a).toUpperCase()}</span>`).join('')}</div>
            <div class="listing-actions">
              <button class="btn-details" data-id="${l.id}">View Details</button>
              <button class="btn-message" data-owner="${l.user_id || ''}"><span class="material-symbols-outlined" style="font-size:18px;">chat_bubble</span> Message</button>
            </div>
          </div>
        </div>`;
    }

    function ensureHomeListingModal() {
      if (document.getElementById('homeListingDetailModal')) return;
      document.body.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" id="homeListingDetailModal">
          <div class="modal-container listing-detail-modal-container" style="max-width:980px;max-height:92vh;overflow:auto;">
            <div class="ldm-header"><button class="modal-close-btn ldm-close" id="homeListingDetailClose"><span class="material-symbols-outlined">close</span></button></div>
            <div class="modal-body" id="homeListingDetailBody"></div>
          </div>
        </div>`);
      document.getElementById('homeListingDetailClose')?.addEventListener('click', () => closeHomeListingModal());
      document.getElementById('homeListingDetailModal')?.addEventListener('click', e => { if (e.target.id === 'homeListingDetailModal') closeHomeListingModal(); });
    }

    function openHomeListingDetail(id) {
      ensureHomeListingModal();
      fetch(`api/listings/get-listing-detail.php?id=${encodeURIComponent(id)}`)
        .then(r => r.json())
        .then(data => {
          if (!data.success) throw new Error(data.error || 'Could not load listing.');
          const l = data.listing;
          const img = (l.images && l.images[0]) || 'uploads/listings/placeholder.jpg';
          const body = document.getElementById('homeListingDetailBody');
          body.innerHTML = `
            <img src="${escapeHTML(img)}" alt="${escapeHTML(l.title)}" style="width:100%;max-height:320px;object-fit:cover;border-radius:18px;margin-bottom:18px;"/>
            <div class="ldm-title-row" style="align-items:flex-start;gap:16px;">
              <div style="flex:1;">
                <div class="ldm-badges"><span class="ldm-badge ldm-badge-type">${escapeHTML(l.property_type_label || l.property_type || '')}</span>${Number(l.is_verified) ? '<span class="ldm-badge ldm-badge-verified">✓ Verified</span>' : ''}</div>
                <h2 class="ldm-title">${escapeHTML(l.title)}</h2>
                <p class="ldm-description" style="margin-top:8px;">${escapeHTML(l.description || '')}</p>
              </div>
              <div class="ldm-price-wrap"><div class="ldm-price">৳${Number(l.rent_price || 0).toLocaleString()}</div><div class="ldm-price-label">per month</div></div>
            </div>
            <div class="ldm-meta-row" style="margin-top:18px;">
              <div class="ldm-meta-item"><span class="material-symbols-outlined">location_on</span>${escapeHTML(l.area || '')}, ${escapeHTML(l.district || '')}</div>
              <div class="ldm-meta-item"><span class="material-symbols-outlined">school</span>${escapeHTML(l.university || '')}</div>
              <div class="ldm-meta-item"><span class="material-symbols-outlined">directions_walk</span>${escapeHTML(String(l.distance_value || ''))} ${escapeHTML(l.distance_unit || '')}</div>
              <div class="ldm-meta-item"><span class="material-symbols-outlined">calendar_month</span>${escapeHTML(l.available_from || '')}</div>
            </div>
            <div class="ldm-amenities" style="margin-top:16px;">${(l.amenities || []).map(a => `<div class="ldm-amenity-chip"><span class="material-symbols-outlined">check_circle</span>${escapeHTML(a)}</div>`).join('')}</div>
            <div class="ldm-poster-card" style="margin-top:20px;max-width:340px;"><h4 class="ldm-poster-title"><span class="material-symbols-outlined" style="font-size:16px;">person</span> Posted By</h4><div class="ldm-poster-info"><div class="ldm-poster-avatar" style="border-radius:50%;width:44px;height:44px;min-width:44px;overflow:hidden;">${getInitials(l.poster?.name || 'User')}</div><div><div class="ldm-poster-name">${escapeHTML(l.poster?.name || 'Listing Owner')}</div><div class="ldm-poster-uni">${escapeHTML(l.university || '')}</div></div></div></div>`;
          document.getElementById('homeListingDetailModal')?.classList.add('active');
          document.body.classList.add('modal-open');
        })
        .catch(err => window.BashaBari?.showToast?.(err.message || 'Could not load details', 'error'));
    }

    function closeHomeListingModal() {
      document.getElementById('homeListingDetailModal')?.classList.remove('active');
      document.body.classList.remove('modal-open');
    }

    function escapeHTML(str) { const div = document.createElement('div'); div.textContent = str ?? ''; return div.innerHTML; }
    function getInitials(name) { return String(name || 'U').trim().split(/\s+/).slice(0,2).map(w => w[0]?.toUpperCase() || '').join('') || 'U'; }
    function formatHomeAgo(value, id) {
      const fallback = ['a min ago','12 mins ago','45 mins ago','2h ago','5h ago','1d ago'];
      const d = new Date(String(value || '').replace(' ', 'T'));
      if (Number.isNaN(d.getTime())) return fallback[Math.abs(Number(id) || 0) % fallback.length];
      const rawDiff = Date.now() - d.getTime();
      if (rawDiff < -5 * 60000) return fallback[Math.abs(Number(id) || 0) % fallback.length];
      const min = Math.floor(Math.max(0, rawDiff) / 60000);
      if (min < 1) return 'just now';
      if (min === 1) return 'a min ago';
      if (min < 60) return `${min} mins ago`;
      const hr = Math.floor(min / 60); if (hr < 24) return `${hr}h ago`;
      const day = Math.floor(hr / 24); return day === 1 ? '1d ago' : `${day}d ago`;
    }
  });
</script>
<script src="modal.js"></script>
</body>
</html>