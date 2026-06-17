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
  <title>Find Roommates - BashaBari</title>
  <link rel="stylesheet" href="style.css"/>
  <link rel="stylesheet" href="modal.css"/>
  <link rel="stylesheet" href="browse.css"/>
  <link rel="stylesheet" href="roommates.css"/>
  <link rel="stylesheet" href="landlord.css"/>
  <link rel="stylesheet" href="about.css"/>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
</head>
<body>

<!-- NAVBAR -->
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
      <a href="find-roommates.php" class="nav-link active">Find Roommate</a>
      <a href="landlord-reviews.php" class="nav-link">Landlord Reviews</a>
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

<!-- PAGE HERO-->
<section class="rm-hero">
  <div class="rm-hero-bg"></div>
  <!-- Floating cards -->
  <div class="rm-hero-float rm-hero-float-left">
    <div class="rm-float-card">
      <div class="rm-float-avatar" style="background:linear-gradient(135deg,#60a5fa,#3b82f6);">RH</div>
      <div class="rm-float-info">
        <p class="rm-float-name">Rahat H.</p>
        <p class="rm-float-detail">CSE @ BRACU • Night Owl</p>
      </div>
      
    </div>
    <div class="rm-float-card" style="margin-top:12px;opacity:0.75;transform:scale(0.96);">
      <div class="rm-float-avatar" style="background:linear-gradient(135deg,#fb923c,#f97316);">SA</div>
      <div class="rm-float-info">
        <p class="rm-float-name">Sifat A.</p>
        <p class="rm-float-detail">BBA @ NSU • Early Bird</p>
      </div>
      
    </div>
  </div>

  <div class="rm-hero-float rm-hero-float-right">
    <div class="rm-float-stats-card">
      <div class="rm-float-stat">
        <span class="rm-float-stat-num">10+</span>
        <span class="rm-float-stat-label">Active Profiles</span>
      </div>
      <div class="rm-float-stat-divider"></div>
      <div class="rm-float-stat">
        <span class="rm-float-stat-num">92%</span>
        <span class="rm-float-stat-label">Match Rate</span>
      </div>
    </div>
  </div>

  <div class="rm-hero-content">
    <div class="rm-hero-badge">
      <span class="material-symbols-outlined" style="font-size:15px;font-variation-settings:'FILL' 1;color:#77dc7a;">group</span>
      Smart Roommate Matching
    </div>
    <h1 class="rm-hero-title">Find Your Perfect <span class="rm-hero-accent">Roommate</span></h1>
    <p class="rm-hero-sub">Connect with verified students based on lifestyle, budget, university & personality - not just proximity.</p>

    <!-- Hero Search -->
    <div class="rm-hero-search">
      <span class="material-symbols-outlined" style="font-size:20px;color:#75777e;flex-shrink:0;">search</span>
      <input type="text" id="heroRmSearch" class="rm-search-input" placeholder="Search by name, university, lifestyle tag…"/>
      <button class="rm-search-btn" id="heroRmSearchBtn">
        <span class="material-symbols-outlined" style="font-size:18px;">search</span>
        Find Roommates
      </button>
    </div>

    <!-- Quick Filter Pills -->
    <div class="rm-hero-pills">
      <button class="rm-pill" data-lifestyle="Clean"> Clean</button>
      <button class="rm-pill" data-lifestyle="Night Owl"> Night Owl</button>
      <button class="rm-pill" data-lifestyle="Studious"> Studious</button>
      <button class="rm-pill" data-lifestyle="Non-Smoker">Non-Smoker</button>
      <button class="rm-pill" data-lifestyle="Friendly"> Friendly</button>
      <button class="rm-pill" data-lifestyle="Peace Lover"> Peace Lover</button>
    </div>
  </div>
</section>

<!-- MAIN LAYOUT -->
<div class="browse-layout" id="rmLayout">

  <!-- Sidebar Overlay -->
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <!-- LEFT SIDEBAR -->
  <aside class="browse-sidebar" id="rmSidebar">
    <div class="sidebar-header">
      <div class="sidebar-title-row">
        <h3 class="sidebar-title">
          <span class="material-symbols-outlined" style="font-size:20px;">tune</span>
          Filters
        </h3>
       
      </div>
      <button class="sidebar-mobile-close" id="rmSidebarMobileClose">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>

    <!-- Active Filter Tags -->
    <div class="active-filters-wrap" id="activeRmFiltersWrap" style="display:none;">
      <div class="active-filters-label">Active Filters:</div>
      <div class="active-filter-tags" id="activeRmFilterTags"></div>
    </div>

    <!-- Search -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="rmFilterSearch">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">search</span>
          Search
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="rmFilterSearch">
        <div class="sidebar-search-wrap">
          <span class="material-symbols-outlined ss-icon">search</span>
          <input type="text" id="rmSidebarSearch" class="sidebar-search-input" placeholder="Name, university, keyword…"/>
          <button class="ss-clear" id="clearRmSearch" style="display:none;">
            <span class="material-symbols-outlined" style="font-size:16px;">close</span>
          </button>
        </div>
      </div>
    </div>

    <!-- University -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="rmFilterUniversity">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">school</span>
          University
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="rmFilterUniversity">
        <div class="checkbox-list" id="rmUniversityList"></div>
      </div>
    </div>

    <!-- Gender -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="rmFilterGender">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">wc</span>
          Gender
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="rmFilterGender">
        <div class="rm-gender-btns" id="rmGenderBtns">
          <button class="rm-gender-btn active" data-gender="">All</button>
          <button class="rm-gender-btn" data-gender="Male">
            <span class="material-symbols-outlined" style="font-size:16px;">male</span>Male
          </button>
          <button class="rm-gender-btn" data-gender="Female">
            <span class="material-symbols-outlined" style="font-size:16px;">female</span>Female
          </button>
          <button class="rm-gender-btn" data-gender="Other">Other</button>
        </div>
      </div>
    </div>

    <!-- Budget Range -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="rmFilterBudget">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">payments</span>
          Budget Range
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="rmFilterBudget">
        <div class="rm-budget-options" id="rmBudgetOptions">
          <button class="rm-budget-btn active" data-min="0" data-max="999999">Any Budget</button>
          <button class="rm-budget-btn" data-min="2000" data-max="4000">৳2,000 – 4,000</button>
          <button class="rm-budget-btn" data-min="4000" data-max="6000">৳4,000 – 6,000</button>
          <button class="rm-budget-btn" data-min="6000" data-max="8000">৳6,000 – 8,000</button>
          <button class="rm-budget-btn" data-min="8000" data-max="10000">৳8,000 – 10,000</button>
          <button class="rm-budget-btn" data-min="10000" data-max="15000">৳10,000 – 15,000</button>
          <button class="rm-budget-btn" data-min="15000" data-max="999999">৳15,000+</button>
        </div>
      </div>
    </div>

    <!-- District -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="rmFilterDistrict">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">location_city</span>
          District
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="rmFilterDistrict">
        <select class="filter-select" id="rmDistrictSelect">
          <option value="">All Districts</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Khulna">Khulna</option>
          <option value="Gazipur">Gazipur</option>
          <option value="Narayanganj">Narayanganj</option>
        </select>
      </div>
    </div>

    <!-- Preferred Areas -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="rmFilterArea">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">location_on</span>
          Preferred Area
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="rmFilterArea">
        <div class="checkbox-list" id="rmAreaList">
          <div class="filter-placeholder-text">Select a district first</div>
        </div>
      </div>
    </div>

    <!-- Lifestyle Tags -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="rmFilterLifestyle">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">label</span>
          Lifestyle Tags
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="rmFilterLifestyle">
        <div class="rm-lifestyle-grid" id="rmLifestyleGrid"></div>
      </div>
    </div>

    <!-- Reset -->
    <div class="sidebar-reset-wrap">
      <button class="sidebar-reset-btn" id="resetRmBottom">
        <span class="material-symbols-outlined" style="font-size:18px;">refresh</span>
        Reset All Filters
      </button>
    </div>
  </aside>

  <!-- Sidebar Toggle -->
  <button class="sidebar-toggle-btn" id="rmSidebarToggle" title="Toggle Sidebar">
    <span class="material-symbols-outlined" id="rmSidebarToggleIcon">chevron_left</span>
  </button>

  <!-- MAIN CONTENT -->
  <main class="browse-main" id="rmMain">

    <!-- Toolbar -->
    <div class="browse-toolbar">
      <div class="toolbar-left">
        <button class="mobile-filter-btn" id="rmMobileFilterBtn">
          <span class="material-symbols-outlined" style="font-size:18px;">tune</span>
          Filters
          <span class="filter-count-badge" id="rmFilterCountBadge" style="display:none;">0</span>
        </button>
        <div class="results-count">
          Showing <strong id="rmResultsCount">0</strong> roommate profiles
          <span id="rmResultsQueryLabel" class="results-query-label"></span>
        </div>
      </div>
      <div class="toolbar-right">
        <!-- Sort -->
        <div class="sort-wrap">
          <span class="material-symbols-outlined" style="font-size:18px;color:#75777e;">sort</span>
          <select class="sort-select" id="rmSortSelect">
            <option value="match">Best Match</option>
            <option value="newest">Newest First</option>
            <option value="budget_asc">Budget: Low to High</option>
            <option value="budget_desc">Budget: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
        <!-- View Toggle -->
        <div class="view-toggle">
          <button class="view-btn active" id="rmGridViewBtn" title="Grid view">
            <span class="material-symbols-outlined" style="font-size:18px;">grid_view</span>
          </button>
          <button class="view-btn" id="rmListViewBtn" title="List view">
            <span class="material-symbols-outlined" style="font-size:18px;">view_list</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="rm-cards-grid" id="rmCardsGrid"></div>

    <!-- Empty State -->
    <div class="browse-empty-state" id="rmEmptyState" style="display:none;">
      <div class="empty-icon">
        <span class="material-symbols-outlined">person_search</span>
      </div>
      <h3 class="empty-title">No Profiles Found</h3>
      <p class="empty-text">Try adjusting your filters. New students join every day!</p>
      <button class="empty-reset-btn" id="rmEmptyResetBtn">
        <span class="material-symbols-outlined" style="font-size:18px;">refresh</span>
        Clear All Filters
      </button>
    </div>

    <!-- Load More -->
    <div class="load-more-wrap" id="rmLoadMoreWrap" style="display:none;">
      <button class="load-more-btn" id="rmLoadMoreBtn">
        <span class="material-symbols-outlined" style="font-size:18px;">expand_more</span>
        Load More Profiles
      </button>
    </div>
  </main>
</div>

<!-- ROOMMATE DETAIL MODAL -->
<div class="modal-overlay" id="rmDetailModal">
  <div class="modal-container rm-detail-container" id="rmDetailContainer">
   
    <button class="modal-close-btn rm-detail-close" id="rmDetailClose">
      <span class="material-symbols-outlined">close</span>
    </button>

    <div class="rm-detail-body" id="rmDetailBody">
     
    </div>
  </div>
</div>

<!-- LIST PROFILE MODAL -->
<div class="modal-overlay" id="rmListProfileModal">
  <div class="modal-container" style="max-width:540px;">
    <div class="modal-header-band">
      <div class="modal-logo-row">
        <div class="modal-logo">Basha<span>Bari</span></div>
        <button class="modal-close-btn" id="rmListProfileClose">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <h2 class="modal-title" style="font-size:22px;">List Your Profile </h2>
      <p class="modal-subtitle">Let other students find you as a potential roommate</p>
    </div>
    <div class="modal-body">
      <div id="rmListProfileLoginPrompt" style="display:none;">
        <div class="comment-login-prompt" style="margin-bottom:16px;">
          <span class="material-symbols-outlined" style="font-size:22px;color:#0c6780;">lock</span>
          <span>Please <button class="inline-link" onclick="window.BashaBari.openSignIn()">sign in</button> to list your roommate profile.</span>
        </div>
      </div>
      <form id="rmListProfileForm" novalidate>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label" for="lp_budget_min">Budget Min (৳)</label>
            <div class="form-input-wrap">
              <span class="form-input-icon"><span class="material-symbols-outlined">payments</span></span>
              <input class="form-input" id="lp_budget_min" type="number" placeholder="3000" min="1000"/>
            </div>
            <div class="field-error" id="lp_budget_min_err"><span class="material-symbols-outlined">error</span><span></span></div>
          </div>
          <div class="form-group">
            <label class="form-label" for="lp_budget_max">Budget Max (৳)</label>
            <div class="form-input-wrap">
              <span class="form-input-icon"><span class="material-symbols-outlined">payments</span></span>
              <input class="form-input" id="lp_budget_max" type="number" placeholder="6000" min="1000"/>
            </div>
            <div class="field-error" id="lp_budget_max_err"><span class="material-symbols-outlined">error</span><span></span></div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="lp_district">Preferred District</label>
          <div class="form-input-wrap">
            <span class="form-input-icon"><span class="material-symbols-outlined">location_city</span></span>
            <select class="form-select" id="lp_district">
              <option value="">Select District</option>
              <option>Dhaka</option><option>Chittagong</option><option>Sylhet</option>
              <option>Rajshahi</option><option>Khulna</option><option>Gazipur</option>
            </select>
          </div>
          <div class="field-error" id="lp_district_err"><span class="material-symbols-outlined">error</span><span></span></div>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label" for="lp_move_month">Move-in Month</label>
            <div class="form-input-wrap">
              <span class="form-input-icon"><span class="material-symbols-outlined">calendar_month</span></span>
              <select class="form-select" id="lp_move_month">
                <option value="">Month</option>
                <option value="1">January</option><option value="2">February</option><option value="3">March</option>
                <option value="4">April</option><option value="5">May</option><option value="6">June</option>
                <option value="7">July</option><option value="8">August</option><option value="9">September</option>
                <option value="10">October</option><option value="11">November</option><option value="12">December</option>
              </select>
            </div>
            <div class="field-error" id="lp_move_month_err"><span class="material-symbols-outlined">error</span><span></span></div>
          </div>
          <div class="form-group">
            <label class="form-label" for="lp_move_year">Move-in Year</label>
            <div class="form-input-wrap">
              <span class="form-input-icon"><span class="material-symbols-outlined">event</span></span>
              <select class="form-select" id="lp_move_year">
                <option value="">Year</option>
                <option>2025</option><option>2026</option><option>2027</option>
              </select>
            </div>
            <div class="field-error" id="lp_move_year_err"><span class="material-symbols-outlined">error</span><span></span></div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Lifestyle Tags (select all that apply)</label>
          <div class="lp-lifestyle-grid" id="lpLifestyleGrid"></div>
        </div>
        <div class="form-group">
          <label class="form-label" for="lp_description">About Yourself</label>
          <textarea class="form-input" id="lp_description" rows="3" placeholder="Describe your lifestyle, preferences, study habits…" style="padding-left:16px;resize:vertical;"></textarea>
          <div class="field-error" id="lp_description_err"><span class="material-symbols-outlined">error</span><span></span></div>
        </div>
        <button type="submit" class="modal-submit-btn" id="lpSubmitBtn">
          <div class="btn-spinner"></div>
          <span class="btn-text">Publish My Profile →</span>
        </button>
      </form>
    </div>
  </div>
</div>

<!-- REPORT MODAL -->
<div class="modal-overlay" id="rmReportModal">
  <div class="modal-container" style="max-width:460px;">
    <div class="modal-header-band">
      <div class="modal-logo-row">
        <div class="modal-logo">Basha<span>Bari</span></div>
        <button class="modal-close-btn" id="rmReportClose">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <h2 class="modal-title" style="font-size:21px;">Report Profile</h2>
      <p class="modal-subtitle">Help us keep BashaBari safe</p>
    </div>
    <div class="modal-body">
      <form id="rmReportForm" novalidate>
        <div class="form-group">
          <label class="form-label" for="rm_report_title">Title</label>
          <div class="form-input-wrap">
            <span class="form-input-icon"><span class="material-symbols-outlined">title</span></span>
            <input class="form-input" id="rm_report_title" type="text" placeholder="Brief issue description"/>
          </div>
          <div class="field-error" id="rm_report_title_err"><span class="material-symbols-outlined">error</span><span></span></div>
        </div>
        <div class="form-group">
          <label class="form-label" for="rm_report_category">Category</label>
          <div class="form-input-wrap">
            <span class="form-input-icon"><span class="material-symbols-outlined">category</span></span>
            <select class="form-select" id="rm_report_category">
              <option value="">Select category</option>
              <option value="user">User / Profile</option>
              <option value="roommate">Roommate Profile</option>
              <option value="technical_issue">Technical Issue</option>
              <option value="comment">Comments</option>
            </select>
          </div>
          <div class="field-error" id="rm_report_category_err"><span class="material-symbols-outlined">error</span><span></span></div>
        </div>
        <div class="form-group">
          <label class="form-label" for="rm_report_desc">Description</label>
          <textarea class="form-input" id="rm_report_desc" rows="4" placeholder="Describe the issue in detail…" style="padding-left:16px;resize:vertical;"></textarea>
          <div class="field-error" id="rm_report_desc_err"><span class="material-symbols-outlined">error</span><span></span></div>
        </div>
        <button type="submit" class="modal-submit-btn" style="background:linear-gradient(135deg,#ef4444,#c41a1a);">
          <div class="btn-spinner"></div>
          <span class="btn-text">Submit Report</span>
        </button>
      </form>
    </div>
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
<script src="roommates.js"></script>
</body>
</html>