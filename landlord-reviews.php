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
  <title>Landlord Reviews - BashaBari</title>
  <link rel="stylesheet" href="style.css"/>
  <link rel="stylesheet" href="modal.css"/>
  <link rel="stylesheet" href="browse.css"/>
  <link rel="stylesheet" href="landlord.css"/>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
</head>
<body>

<!-- -- NAVBAR -- -->
<nav class="navbar">
  <div class="navbar-inner">
  <a href="index.php">
    <div class="logo-bb">
   <img src="assets/Trans-Bashabari logo.png">
    <div class="logo">BashaBari</div>
    </div>
    </a>   
    
    <div class="nav-links">
      <a href="index.php" class="nav-link">Home</a>
      <a href="browse-listings.php" class="nav-link">Browse Listings</a>
      <a href="find-roommates.php" class="nav-link">Find Roommate</a>
      <a href="landlord-reviews.php" class="nav-link active">Landlord Reviews</a>
      <a href="about.php" class="nav-link">About</a>
    </div>
    <div class="nav-cta">
      <button class="btn-signin" id="navSignInBtn">Sign In</button>
    </div>
    <button class="menu-btn" id="mobileMenuBtn" aria-label="Open menu">
      <span class="material-symbols-outlined">menu</span>
    </button>
  </div>
</nav>

<!-- HERO -->
<section class="lr-hero">
  <div class="lr-hero-bg"></div>

  <!-- Floating trust cards -->
  <div class="lr-hero-float lr-float-left">
    <div class="lr-trust-card">
      <div class="lr-trust-stars">
        <span class="material-symbols-outlined lr-star-fill">star</span>
        <span class="material-symbols-outlined lr-star-fill">star</span>
        <span class="material-symbols-outlined lr-star-fill">star</span>
        <span class="material-symbols-outlined lr-star-fill">star</span>
        <span class="material-symbols-outlined lr-star-fill">star</span>
      </div>
      <p class="lr-trust-quote">"Very cooperative landlord. Never missed a maintenance call."</p>
      <div class="lr-trust-author">
        <div class="lr-trust-avatar" style="background:linear-gradient(135deg,#60a5fa,#3b82f6);">RA</div>
        <div>
          <p class="lr-trust-name">Rahim A.</p>
          <p class="lr-trust-univ">NSU Student</p>
        </div>
      </div>
    </div>
  </div>

  <div class="lr-hero-float lr-float-right">
    <div class="lr-stats-card">
      <div class="lr-stat-item">
        <span class="lr-stat-num" id="heroStatReviews">15+</span>
        <span class="lr-stat-label">Reviews</span>
      </div>
      <div class="lr-stat-div"></div>
      <div class="lr-stat-item">
        <span class="lr-stat-num">4.6</span>
        <span class="lr-stat-label">Avg Rating</span>
      </div>
      <div class="lr-stat-div"></div>
      <div class="lr-stat-item">
        <span class="lr-stat-num">10+</span>
        <span class="lr-stat-label">Landlords</span>
      </div>
    </div>
  </div>

  <div class="lr-hero-content">
    <div class="lr-hero-badge">
      <span class="material-symbols-outlined" style="font-size:15px;font-variation-settings:'FILL' 1;color:#77dc7a;">verified_user</span>
      Student-Verified Reviews
    </div>
    <h1 class="lr-hero-title">Honest <span class="lr-hero-accent">Landlord Reviews</span><br/>by Real Students</h1>
    <p class="lr-hero-sub">Read authentic reviews from students who lived there. Know your landlord before you sign the lease.</p>

    <!-- Hero Search Bar -->
    <div class="lr-hero-search">
      <span class="material-symbols-outlined lr-search-icon">search</span>
      <input type="text" id="lrHeroSearch" class="lr-search-input" placeholder="Search by landlord name, property address, area…"/>
      <button class="lr-search-btn" id="lrHeroSearchBtn">
        <span class="material-symbols-outlined" style="font-size:18px;">search</span>
        Search
      </button>
    </div>

    <!-- Filter Row -->
    <div class="lr-filter-row">
      <select class="lr-filter-select" id="lrDistrictFilter">
        <option value="">All Districts</option>
        <option>Dhaka</option><option>Chittagong</option><option>Sylhet</option>
        <option>Rajshahi</option><option>Khulna</option><option>Gazipur</option>
        <option>Narayanganj</option><option>Barishal</option>
      </select>
      <select class="lr-filter-select" id="lrAreaFilter">
        <option value="">All Areas</option>
      </select>
      <div class="lr-star-filter" id="lrStarFilter">
        <span class="lr-star-filter-label">Rating:</span>
        <button class="lr-star-btn active" data-stars="0">All</button>
        <button class="lr-star-btn" data-stars="5">
          <span class="material-symbols-outlined lr-star-fill" style="font-size:14px;">star</span>5
        </button>
        <button class="lr-star-btn" data-stars="4">
          <span class="material-symbols-outlined lr-star-fill" style="font-size:14px;">star</span>4+
        </button>
        <button class="lr-star-btn" data-stars="3">
          <span class="material-symbols-outlined lr-star-fill" style="font-size:14px;">star</span>3+
        </button>
      </div>
    </div>
  </div>
</section>

<!-- MAIN TWO-COLUMN LAYOUT -->
<div class="lr-layout">

  <!-- LEFT: WRITE A REVIEW  -->
  <aside class="lr-left-col">

    <!-- Write Review Card -->
    <div class="lr-write-card" id="lrWriteCard">
      <div class="lr-write-header">
        <div class="lr-write-icon">
          <span class="material-symbols-outlined" style="font-size:24px;color:#fff;font-variation-settings:'FILL' 1;">rate_review</span>
        </div>
        <div>
          <h3 class="lr-write-title">Write a Review</h3>
          <p class="lr-write-sub">Share your honest experience</p>
        </div>
      </div>

      <!-- Login Prompt (shown when logged out) -->
      <div id="lrLoginPrompt" style="display:none;">
        <div class="lr-login-prompt">
          <span class="material-symbols-outlined" style="font-size:32px;color:#0c6780;font-variation-settings:'FILL' 1;">lock_person</span>
          <p class="lr-login-prompt-text">Sign in to write a landlord review and help fellow students.</p>
          <button class="lr-login-btn" onclick="window.BashaBari.openSignIn()">
            <span class="material-symbols-outlined" style="font-size:17px;">login</span>
            Sign In to Review
          </button>
        </div>
      </div>

      <!-- Review Form (shown when logged in) -->
      <form id="lrReviewForm" novalidate style="display:none;">
        <!-- Landlord Name -->
        <div class="form-group">
          <label class="form-label" for="lr_landlord_name">Landlord Name</label>
          <div class="form-input-wrap">
            <span class="form-input-icon"><span class="material-symbols-outlined">person</span></span>
            <input class="form-input" id="lr_landlord_name" type="text" placeholder="e.g. Mr. Zaman Kabir"
              list="landlordSuggestions"/>
            <datalist id="landlordSuggestions"></datalist>
          </div>
          <div class="field-error" id="lr_landlord_name_err">
            <span class="material-symbols-outlined">error</span><span></span>
          </div>
        </div>

        <!-- Property Address -->
        <div class="form-group">
          <label class="form-label" for="lr_property_address">Property Address</label>
          <div class="form-input-wrap">
            <span class="form-input-icon"><span class="material-symbols-outlined">home</span></span>
            <input class="form-input" id="lr_property_address" type="text" placeholder="e.g. House 12, Road 4, Bashundhara R/A"/>
          </div>
          <div class="field-error" id="lr_property_address_err">
            <span class="material-symbols-outlined">error</span><span></span>
          </div>
        </div>

        <!-- District -->
        <div class="form-group">
          <label class="form-label" for="lr_district">District</label>
          <div class="form-input-wrap">
            <span class="form-input-icon"><span class="material-symbols-outlined">location_city</span></span>
            <select class="form-select" id="lr_district">
              <option value="">Select District</option>
              <option>Dhaka</option><option>Chittagong</option><option>Sylhet</option>
              <option>Rajshahi</option><option>Khulna</option><option>Gazipur</option>
              <option>Narayanganj</option><option>Barishal</option>
            </select>
          </div>
          <div class="field-error" id="lr_district_err">
            <span class="material-symbols-outlined">error</span><span></span>
          </div>
        </div>

        <!-- Star Rating -->
        <div class="form-group">
          <label class="form-label">Overall Star Rating</label>
          <div class="lr-star-input" id="lrStarInput">
            <button type="button" class="lr-star-rate-btn" data-val="1">
              <span class="material-symbols-outlined">star</span>
            </button>
            <button type="button" class="lr-star-rate-btn" data-val="2">
              <span class="material-symbols-outlined">star</span>
            </button>
            <button type="button" class="lr-star-rate-btn" data-val="3">
              <span class="material-symbols-outlined">star</span>
            </button>
            <button type="button" class="lr-star-rate-btn" data-val="4">
              <span class="material-symbols-outlined">star</span>
            </button>
            <button type="button" class="lr-star-rate-btn" data-val="5">
              <span class="material-symbols-outlined">star</span>
            </button>
            <span class="lr-star-val-label" id="lrStarValLabel">Tap to rate</span>
          </div>
          <div class="field-error" id="lr_star_err">
            <span class="material-symbols-outlined">error</span><span></span>
          </div>
        </div>

        <!-- Category Ratings -->
        <div class="form-group">
          <label class="form-label">Category Ratings</label>
          <div class="lr-cat-ratings" id="lrCatRatings">
            <div class="lr-cat-row">
              <span class="lr-cat-label">Safety</span>
              <div class="lr-mini-stars" data-cat="safety">
                <button type="button" class="lr-mini-star" data-val="1"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="2"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="3"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="4"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="5"><span class="material-symbols-outlined">star</span></button>
              </div>
            </div>
            <div class="lr-cat-row">
              <span class="lr-cat-label">Responsiveness</span>
              <div class="lr-mini-stars" data-cat="responsiveness">
                <button type="button" class="lr-mini-star" data-val="1"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="2"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="3"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="4"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="5"><span class="material-symbols-outlined">star</span></button>
              </div>
            </div>
            <div class="lr-cat-row">
              <span class="lr-cat-label">Maintenance</span>
              <div class="lr-mini-stars" data-cat="maintenance">
                <button type="button" class="lr-mini-star" data-val="1"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="2"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="3"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="4"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="5"><span class="material-symbols-outlined">star</span></button>
              </div>
            </div>
            <div class="lr-cat-row">
              <span class="lr-cat-label">Fairness</span>
              <div class="lr-mini-stars" data-cat="fairness">
                <button type="button" class="lr-mini-star" data-val="1"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="2"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="3"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="4"><span class="material-symbols-outlined">star</span></button>
                <button type="button" class="lr-mini-star" data-val="5"><span class="material-symbols-outlined">star</span></button>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommended Toggle -->
        <div class="form-group">
          <label class="form-label">Would You Recommend?</label>
          <div class="lr-recommend-toggle">
            <button type="button" class="lr-rec-btn active" data-val="yes" id="lrRecYes">
              <span class="material-symbols-outlined" style="font-size:18px;font-variation-settings:'FILL' 1;">thumb_up</span>
              Yes
            </button>
            <button type="button" class="lr-rec-btn" data-val="no" id="lrRecNo">
              <span class="material-symbols-outlined" style="font-size:18px;font-variation-settings:'FILL' 1;">thumb_down</span>
              No
            </button>
          </div>
        </div>

        <!-- Review Text -->
        <div class="form-group">
          <label class="form-label" for="lr_review_text">Your Review</label>
          <textarea class="form-input" id="lr_review_text" rows="4"
            placeholder="Describe your experience with this landlord. Be honest and specific…"
            style="padding-left:16px;resize:vertical;min-height:100px;"></textarea>
          <div class="lr-char-count"><span id="lrCharCount">0</span>/500</div>
          <div class="field-error" id="lr_review_text_err">
            <span class="material-symbols-outlined">error</span><span></span>
          </div>
        </div>

        <button type="submit" class="modal-submit-btn" id="lrSubmitBtn"
          style="background:linear-gradient(135deg,#0a192f,#0c6780);">
          <div class="btn-spinner"></div>
          <span class="btn-text">Submit Review →</span>
        </button>
      </form>
    </div>

    <!-- Platform Stats Card -->
    <div class="lr-stats-widget">
      <h4 class="lr-stats-widget-title">
        <span class="material-symbols-outlined" style="font-size:18px;font-variation-settings:'FILL' 1;color:#0c6780;">insights</span>
        Platform Stats
      </h4>
      <div class="lr-stats-rows">
        <div class="lr-stat-row">
          <span class="lr-stat-row-label">Total Reviews</span>
          <span class="lr-stat-row-val" id="statTotalReviews">0</span>
        </div>
        <div class="lr-stat-row">
          <span class="lr-stat-row-label">Landlords Reviewed</span>
          <span class="lr-stat-row-val" id="statTotalLandlords">0</span>
        </div>
        <div class="lr-stat-row">
          <span class="lr-stat-row-label">Avg Overall Rating</span>
          <span class="lr-stat-row-val lr-stat-green" id="statAvgRating">–</span>
        </div>
        <div class="lr-stat-row">
          <span class="lr-stat-row-label">Recommended Rate</span>
          <span class="lr-stat-row-val lr-stat-green" id="statRecRate">–</span>
        </div>
      </div>
    </div>

    <!-- Top Rated Landlord Widget -->
    <div class="lr-top-widget" id="lrTopWidget">
      <h4 class="lr-top-widget-title">
        <span class="material-symbols-outlined" style="font-size:18px;font-variation-settings:'FILL' 1;color:#f59e0b;">emoji_events</span>
        Top Rated This Month
      </h4>
      <div id="lrTopList"></div>
    </div>
  </aside>

  <!-- RIGHT: REVIEW CARDS -->
  <main class="lr-right-col">

    <!-- Sort Toolbar -->
    <div class="lr-toolbar">
      <div class="lr-toolbar-left">
        <span class="lr-results-text">
          Showing <strong id="lrResultsCount">0</strong> landlords
          <span id="lrQueryLabel" class="results-query-label"></span>
        </span>
      </div>
      <div class="lr-toolbar-right">
        <select class="sort-select" id="lrSortSelect">
          <option value="rating_desc">Highest Rated</option>
          <option value="rating_asc">Lowest Rated</option>
          <option value="reviews_desc">Most Reviews</option>
          <option value="newest">Newest First</option>
          <option value="name_asc">Name A–Z</option>
        </select>

      </div>
    </div>

    <!-- Landlord Cards Grid -->
    <div class="lr-cards-grid" id="lrCardsGrid"></div>

    <!-- Empty State -->
    <div class="browse-empty-state" id="lrEmptyState" style="display:none;">
      <div class="empty-icon">
        <span class="material-symbols-outlined">manage_search</span>
      </div>
      <h3 class="empty-title">No Reviews Found</h3>
      <p class="empty-text">Try different search terms or filters. Be the first to review a landlord!</p>
      <button class="empty-reset-btn" id="lrEmptyReset">
        <span class="material-symbols-outlined" style="font-size:18px;">refresh</span>
        Clear Filters
      </button>
    </div>

    <!-- Load More -->
    <div class="load-more-wrap" id="lrLoadMoreWrap" style="display:none;">
      <button class="load-more-btn" id="lrLoadMoreBtn">
        <span class="material-symbols-outlined" style="font-size:18px;">expand_more</span>
        Load More Reviews
      </button>
    </div>
  </main>
</div>

<!--  LANDLORD DETAIL MODAL -->
<div class="modal-overlay" id="lrDetailModal">
  <div class="modal-container lr-detail-container" id="lrDetailContainer">
    <button class="modal-close-btn lr-detail-close" id="lrDetailClose">
      <span class="material-symbols-outlined">close</span>
    </button>
    <div id="lrDetailBody"></div>
  </div>
</div>

<!-- FOOTER -->
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">BashaBari</div>
        <p class="footer-brand-text">Redefining student housing with transparency, safety, and community in mind.</p>
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

<script src="modal.js"></script>
<script src="landlord.js"></script>
</body>
</html>