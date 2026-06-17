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
  <title>Browse Listings - BashaBari</title>
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
      <a href="browse-listings.php" class="nav-link active">Browse Listings</a>
      <a href="find-roommates.php" class="nav-link">Find Roommate</a>
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

<!--  PAGE HERO BANNER -->
<section class="browse-hero">
  <div class="browse-hero-bg"></div>
  <div class="browse-hero-content">
    <div class="browse-hero-badge">
      <span class="material-symbols-outlined" style="font-size:15px;font-variation-settings:'FILL' 1;">apartment</span>
      Student Housing Platform
    </div>
    <h1 class="browse-hero-title">Browse <span class="browse-hero-accent">Verified Listings</span></h1>
    <p class="browse-hero-sub">Discover safe, affordable homes near your campus — all verified by student tenants.</p>

    <!-- Hero Search Bar -->
    <div class="browse-hero-search">
      <span class="material-symbols-outlined bhs-icon">search</span>
      <input type="text" id="heroSearchInput" class="bhs-input" placeholder="Search by title, location, university, keyword…"/>
      <button class="bhs-btn" id="heroSearchBtn">
        <span class="material-symbols-outlined" style="font-size:18px;">search</span>
        Search
      </button>
    </div>

    <!-- Quick Stats -->
    <div class="browse-hero-stats">
      <div class="bh-stat"><span class="bh-stat-num" id="statTotal">24</span><span class="bh-stat-label">Listings</span></div>
      <div class="bh-stat-divider"></div>
      <div class="bh-stat"><span class="bh-stat-num">10+</span><span class="bh-stat-label">Verified</span></div>
      <div class="bh-stat-divider"></div>
      <div class="bh-stat"><span class="bh-stat-num">32+</span><span class="bh-stat-label">Universities</span></div>
      <div class="bh-stat-divider"></div>
      <div class="bh-stat"><span class="bh-stat-num">৳4,500</span><span class="bh-stat-label">Avg. Rent</span></div>
    </div>
  </div>
</section>

<!-- MAIN LAYOUT -->
<div class="browse-layout" id="browseLayout">

  <!-- SIDEBAR OVERLAY (mobile) -->
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <!--  LEFT SIDEBAR -->
  <aside class="browse-sidebar" id="browseSidebar">

    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="sidebar-title-row">
        <h3 class="sidebar-title">
          <span class="material-symbols-outlined" style="font-size:20px;">tune</span>
          Filters
        </h3>
  
      </div>
      <button class="sidebar-mobile-close" id="sidebarMobileClose">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>

    <!-- Active Filter Tags -->
    <div class="active-filters-wrap" id="activeFiltersWrap" style="display:none;">
      <div class="active-filters-label">Active Filters:</div>
      <div class="active-filter-tags" id="activeFilterTags"></div>
    </div>

    <!-- Search -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="filterSearch">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">search</span>
          Search
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="filterSearch">
        <div class="sidebar-search-wrap">
          <span class="material-symbols-outlined ss-icon">search</span>
          <input type="text" id="sidebarSearch" class="sidebar-search-input" placeholder="Title, location, keyword…"/>
          <button class="ss-clear" id="clearSidebarSearch" style="display:none;">
            <span class="material-symbols-outlined" style="font-size:16px;">close</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Available From -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="filterAvailableFrom">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">calendar_month</span>
          Available From
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="filterAvailableFrom">
        <div class="form-row-2" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <select class="filter-select" id="availableMonthSelect">
            <option value="">Any Month</option>
            <option value="1">January</option><option value="2">February</option><option value="3">March</option>
            <option value="4">April</option><option value="5">May</option><option value="6">June</option>
            <option value="7">July</option><option value="8">August</option><option value="9">September</option>
            <option value="10">October</option><option value="11">November</option><option value="12">December</option>
          </select>
          <select class="filter-select" id="availableYearSelect">
            <option value="">Any Year</option>
            <option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option>
          </select>
        </div>
      </div>
    </div>


    <!-- District -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="filterDistrict">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">location_city</span>
          District
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="filterDistrict">
        <select class="filter-select" id="districtSelect">
          <option value="">All Districts</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Khulna">Khulna</option>
          <option value="Barishal">Barishal</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Gazipur">Gazipur</option>
          <option value="Narayanganj">Narayanganj</option>
        </select>
      </div>
    </div>

    <!-- Area -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="filterArea">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">location_on</span>
          Area / Location
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="filterArea">
        <div class="checkbox-list" id="areaCheckboxList">
          <div class="filter-placeholder-text">Select a district first</div>
        </div>
      </div>
    </div>

    <!-- University -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="filterUniversity">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">school</span>
          Near University
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="filterUniversity">
        <div class="checkbox-list" id="universityCheckboxList">
          
        </div>
      </div>
    </div>

    <!-- Property Type -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="filterPropType">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">home</span>
          Property Type
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="filterPropType">
        <div class="checkbox-list" id="propTypeCheckboxList">
        
        </div>
      </div>
    </div>

    <!-- Distance from Campus -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="filterDistance">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">directions_walk</span>
          Distance from Campus
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="filterDistance">
        <select class="filter-select" id="distanceSelect">
          <option value="">Any Distance</option>
          <option value="0.5">Under 0.5 km</option>
          <option value="1">0.5 – 1 km</option>
          <option value="2">1 – 2 km</option>
          <option value="5">2 – 5 km</option>
          <option value="99">5 km+</option>
        </select>
      </div>
    </div>

    <!-- Rent Range -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="filterRent">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">payments</span>
          Rent Range
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="filterRent">
        <div class="rent-display">
          <span class="rent-val" id="rentMinDisplay">৳1,000</span>
          <span class="rent-sep">–</span>
          <span class="rent-val" id="rentMaxDisplay">৳30,000</span>
        </div>
        <div class="dual-range-wrap" id="dualRangeWrap">
          <div class="dual-range-track">
            <div class="dual-range-fill" id="rangeFill"></div>
          </div>
          <input type="range" class="range-input range-min" id="rentMin" min="1000" max="30000" step="500" value="1000"/>
          <input type="range" class="range-input range-max" id="rentMax" min="1000" max="30000" step="500" value="30000"/>
        </div>
        <div class="rent-presets">
          <button class="rent-preset-btn" data-min="1000" data-max="5000">Under ৳5k</button>
          <button class="rent-preset-btn" data-min="5000" data-max="10000">৳5k–10k</button>
          <button class="rent-preset-btn" data-min="10000" data-max="20000">৳10k–20k</button>
          <button class="rent-preset-btn" data-min="20000" data-max="30000">৳20k+</button>
        </div>
      </div>
    </div>

    <!-- Amenities -->
    <div class="filter-section">
      <div class="filter-section-header" data-target="filterAmenities">
        <span class="filter-section-title">
          <span class="material-symbols-outlined" style="font-size:16px;">checklist</span>
          Amenities
        </span>
        <span class="material-symbols-outlined filter-chevron">expand_less</span>
      </div>
      <div class="filter-section-body" id="filterAmenities">
        <div class="amenity-grid" id="amenityGrid">
          
        </div>
      </div>
    </div>

    <!-- Reset Filters Button -->
    <div class="sidebar-reset-wrap">
      <button class="sidebar-reset-btn" id="resetFiltersBottom">
        <span class="material-symbols-outlined" style="font-size:18px;">refresh</span>
        Reset All Filters
      </button>
    </div>

  </aside>

  <!-- SIDEBAR TOGGLE (hide/show) -->
  <button class="sidebar-toggle-btn" id="sidebarToggleBtn" title="Toggle Sidebar">
    <span class="material-symbols-outlined" id="sidebarToggleIcon">chevron_left</span>
  </button>

  <!-- MAIN CONTENT -->
  <main class="browse-main" id="browseMain">

    <!-- Toolbar -->
    <div class="browse-toolbar">
      <div class="toolbar-left">
        
        <button class="mobile-filter-btn" id="mobileFilterBtn">
          <span class="material-symbols-outlined" style="font-size:18px;">tune</span>
          Filters
          <span class="filter-count-badge" id="filterCountBadge" style="display:none;">0</span>
        </button>
        <div class="results-count">
          Showing <strong id="resultsCount">0</strong> listings
          <span id="resultsQueryLabel" class="results-query-label"></span>
        </div>
      </div>
      <div class="toolbar-right">
        <!-- Sort -->
        <div class="sort-wrap">
          <span class="material-symbols-outlined" style="font-size:18px;color:#75777e;">sort</span>
          <select class="sort-select" id="sortSelect">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="distance">Closest to Campus</option>
          </select>
        </div>
        <!-- View Toggle -->
        <div class="view-toggle">
          <button class="view-btn active" id="gridViewBtn" title="Grid view">
            <span class="material-symbols-outlined" style="font-size:18px;">grid_view</span>
          </button>
          <button class="view-btn" id="listViewBtn" title="List view">
            <span class="material-symbols-outlined" style="font-size:18px;">view_list</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Listing Grid -->
    <div class="listings-grid-browse" id="listingsGrid">
      
    </div>

    <!-- Empty State -->
    <div class="browse-empty-state" id="emptyState" style="display:none;">
      <div class="empty-icon">
        <span class="material-symbols-outlined">search_off</span>
      </div>
      <h3 class="empty-title">No Listings Found</h3>
      <p class="empty-text">Try adjusting your filters or search query. We're adding new listings every day!</p>
      <button class="empty-reset-btn" id="emptyResetBtn">
        <span class="material-symbols-outlined" style="font-size:18px;">refresh</span>
        Clear All Filters
      </button>
    </div>

    <!-- Load More -->
    <div class="load-more-wrap" id="loadMoreWrap" style="display:none;">
      <button class="load-more-btn" id="loadMoreBtn">
        <span class="material-symbols-outlined" style="font-size:18px;">expand_more</span>
        Load More Listings
      </button>
    </div>

  </main>
</div>

<!-- LISTING DETAIL MODAL -->
<div class="modal-overlay" id="listingDetailModal">
  <div class="modal-container listing-detail-modal-container" id="listingDetailContainer">

    <div class="ldm-header">
      <button class="modal-close-btn ldm-close" id="ldmCloseBtn">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>

    <!-- Gallery -->
    <div class="ldm-gallery" id="ldmGallery">
      <div class="ldm-gallery-main">
        <img id="ldmMainImg" src="" alt="Property" class="ldm-main-img"/>
        <button class="gallery-nav gallery-prev" id="galleryPrev">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="gallery-nav gallery-next" id="galleryNext">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
        <div class="gallery-counter" id="galleryCounter">1 / 1</div>
      </div>
      <div class="ldm-gallery-thumbs" id="ldmGalleryThumbs"></div>
    </div>

    <!-- Detail Content -->
    <div class="ldm-content">
      <div class="ldm-content-left">
        
        <div class="ldm-title-row">
          <div>
            <div class="ldm-badges" id="ldmBadges"></div>
            <h2 class="ldm-title" id="ldmTitle"></h2>
          </div>
          <div class="ldm-price-wrap">
            <div class="ldm-price" id="ldmPrice"></div>
            <div class="ldm-price-label">per month</div>
          </div>
        </div>

     
        <div class="ldm-meta-row" id="ldmMetaRow"></div>

        <!-- Tags -->
        <div class="ldm-amenities" id="ldmAmenities"></div>

        <!-- Description -->
        <div class="ldm-section">
          <h4 class="ldm-section-title">
            <span class="material-symbols-outlined" style="font-size:18px;">description</span>
            Description
          </h4>
          <p class="ldm-description" id="ldmDescription"></p>
        </div>

        <!-- Comments -->
        <div class="ldm-section" id="ldmCommentsSection">
          <h4 class="ldm-section-title">
            <span class="material-symbols-outlined" style="font-size:18px;">chat</span>
            Comments
            <span class="comment-count-badge" id="commentCountBadge">0</span>
          </h4>
          <div id="ldmCommentsList" class="ldm-comments-list"></div>
          <div id="ldmCommentForm" style="display:none;">
            <div class="comment-input-wrap">
              <textarea id="commentTextarea" class="comment-textarea" placeholder="Share your experience or ask a question…" rows="3"></textarea>
              <button class="comment-submit-btn" id="commentSubmitBtn">
                <span class="material-symbols-outlined" style="font-size:16px;">send</span>
                Post Comment
              </button>
            </div>
          </div>
          <div id="ldmCommentLoginPrompt" class="comment-login-prompt" style="display:none;">
            <span class="material-symbols-outlined" style="font-size:20px;color:#0c6780;">lock</span>
            <span>Please <button class="inline-link" onclick="window.BashaBari.openSignIn()">sign in</button> to leave a comment.</span>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="ldm-content-right">
        <!-- Poster Card -->
        <div class="ldm-poster-card">
          <h4 class="ldm-poster-title">
            <span class="material-symbols-outlined" style="font-size:16px;">person</span>
            Posted By
          </h4>
          <div class="ldm-poster-info" id="ldmPosterInfo"></div>

          <!-- Phone (logged in only) -->
          <div class="ldm-phone-wrap" id="ldmPhoneWrap" style="display:none;">
            <div class="ldm-phone-row">
              <span class="material-symbols-outlined" style="font-size:18px;color:#0c6780;">call</span>
              <span class="ldm-phone" id="ldmPhone"></span>
            </div>
          </div>
          <div class="ldm-phone-locked" id="ldmPhoneLocked">
            <span class="material-symbols-outlined" style="font-size:16px;">lock</span>
            <span>Sign in to view contact</span>
          </div>

          <!-- Action Buttons -->
          <div class="ldm-actions" id="ldmActions">
            <button class="ldm-btn-message" id="ldmMessageBtn">
              <span class="material-symbols-outlined" style="font-size:18px;">chat_bubble</span>
              Message
            </button>
            <button class="ldm-btn-report" id="ldmReportBtn">
              <span class="material-symbols-outlined" style="font-size:18px;">flag</span>
              Report
            </button>
          </div>
        </div>

        <!-- Quick Info Card -->
        <div class="ldm-quick-info" id="ldmQuickInfo"></div>

        <!-- Availability Card -->
        <div class="ldm-avail-card" id="ldmAvailCard"></div>
      </div>
    </div>
  </div>
</div>

<!-- REPORT MODAL -->
<div class="modal-overlay" id="reportModal">
  <div class="modal-container" style="max-width:480px;">
    <div class="modal-header-band">
      <div class="modal-logo-row">
        <div class="modal-logo">Basha<span>Bari</span></div>
        <button class="modal-close-btn" id="reportCloseBtn">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <h2 class="modal-title" style="font-size:22px;">Report Listing</h2>
      <p class="modal-subtitle">Help keep BashaBari safe for all students</p>
    </div>
    <div class="modal-body">
      <form id="reportForm" novalidate>
        <div class="form-group">
          <label class="form-label" for="report_title">Report Title</label>
          <div class="form-input-wrap">
            <span class="form-input-icon"><span class="material-symbols-outlined">title</span></span>
            <input class="form-input" id="report_title" type="text" placeholder="Brief description of the issue"/>
          </div>
          <div class="field-error" id="report_title_err">
            <span class="material-symbols-outlined">error</span><span></span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="report_category">Category</label>
          <div class="form-input-wrap">
            <span class="form-input-icon"><span class="material-symbols-outlined">category</span></span>
            <select class="form-select" id="report_category">
              <option value="">Select a category</option>
              <option value="listings">House Listings</option>
              <option value="roommate">Roommate Profile</option>
              <option value="technical_issue">Technical Issue</option>
              <option value="comment">Comments</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="field-error" id="report_category_err">
            <span class="material-symbols-outlined">error</span><span></span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="report_image">Upload Image (Optional)</label>
          <div class="file-upload-area" id="reportFileArea">
            <input type="file" id="report_image" accept="image/*" style="display:none;"/>
            <span class="material-symbols-outlined" style="font-size:28px;color:#0c6780;">cloud_upload</span>
            <p class="file-upload-text">Click to upload or drag & drop</p>
            <p class="file-upload-sub">PNG, JPG up to 5MB</p>
          </div>
          <div class="file-preview-wrap" id="reportFilePreview" style="display:none;">
            <img id="reportFileImg" src="" alt="Preview" class="file-preview-img"/>
            <button type="button" class="file-remove-btn" id="reportFileRemove">
              <span class="material-symbols-outlined" style="font-size:16px;">close</span>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="report_description">Description</label>
          <textarea class="form-input" id="report_description" rows="4" placeholder="Please provide detailed information about the issue…" style="padding-left:16px;resize:vertical;"></textarea>
          <div class="field-error" id="report_description_err">
            <span class="material-symbols-outlined">error</span><span></span>
          </div>
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
</footer>

<script src="modal.js"></script>
<script src="browse.js"></script>
</body>
</html>