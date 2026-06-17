<?php 
require_once 'config/session.php'; 
if (!isLoggedIn() || ($_SESSION['role'] ?? '') !== 'student') { header('Location: index.php'); exit; } $sessionUser = getCurrentUser(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="csrf-token" content="<?= htmlspecialchars($_SESSION['csrf_token'] ?? '', ENT_QUOTES, 'UTF-8') ?>"/>
  <script>window.CURRENT_USER = <?= json_encode($sessionUser, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?: 'null' ?>;</script>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Student Dashboard — BashaBari</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="style.css"/>
<link rel="stylesheet" href="student-dashboard.css"/>
<link rel="stylesheet" href="browse.css"/>
<link rel="stylesheet" href="modal.css"/>
</head>
<body class="dashboard-body">

<!-- AUTH GUARD OVERLAY -->
<div id="authGuard" class="auth-guard" style="display:none;">
  <div class="auth-guard-content">
    <div class="auth-guard-logo">BashaBari</div>
    <h2>Access Restricted</h2>
    <p>Please sign in to access your student dashboard.</p>
    <button class="btn-guard-signin" onclick="window.location.href='index.php'">Go to Home & Sign In</button>
  </div>
</div>

<!-- DASHBOARD LAYOUT -->
<div class="dashboard-layout" id="dashboardLayout">

  <!-- LEFT SIDEBAR -->
  <aside class="dash-sidebar" id="dashSidebar">
    <div class="dash-sidebar-top">
      <!-- Logo -->
      <a href="index.php" class="dash-logo">
        <span class="dash-logo-icon"></span>
        <span class="dash-logo-text">BashaBari</span>
      </a>
      <div class="dash-role-label">Student Dashboard</div>

      <!-- Nav Items -->
      <nav class="dash-nav">
        <button class="dash-nav-item active" data-section="overview">
          <span class="material-symbols-outlined">dashboard</span>
          <span>Overview</span>
        </button>
        <button class="dash-nav-item" data-section="my-listings">
          <span class="material-symbols-outlined">home_work</span>
          <span>My Listings</span>
          <span class="dash-nav-badge" id="listingsBadge">2</span>
        </button>
        <button class="dash-nav-item" data-section="favorites">
          <span class="material-symbols-outlined">favorite</span>
          <span>Favorites</span>
          <span class="dash-nav-badge" id="favBadge">3</span>
        </button>
        <button class="dash-nav-item" data-section="connections">
          <span class="material-symbols-outlined">people</span>
          <span>Connections</span>
          <span class="dash-nav-badge" id="connBadge">2</span>
        </button>
        <button class="dash-nav-item" data-section="messages">
          <span class="material-symbols-outlined">chat</span>
          <span>Messages</span>
          <span class="dash-nav-badge msg-badge" id="msgBadge">1</span>
        </button>
        <button class="dash-nav-item" data-section="roommate-profile">
          <span class="material-symbols-outlined">person_search</span>
          <span>Roommate Profile</span>
        </button>
        <button class="dash-nav-item" data-section="activity-log">
          <span class="material-symbols-outlined">history</span>
          <span>User Activity Log</span>
        </button>
        <button class="dash-nav-item" data-section="notifications">
          <span class="material-symbols-outlined">notifications</span>
          <span>Notifications</span>
          <span class="dash-nav-badge notif-badge" id="notifBadge">3</span>
        </button>
        <button class="dash-nav-item" data-section="settings">
          <span class="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </button>
      </nav>
    </div>

    <!-- Sidebar Bottom -->
    <div class="dash-sidebar-bottom">
      <div class="dash-user-info">
        <div class="dash-user-avatar" id="sidebarAvatar">RA</div>
        <div class="dash-user-details">
          <div class="dash-user-name" id="sidebarName">Rahim Ahmed</div>
          <div class="dash-user-email" id="sidebarEmail">student@northsouth.edu</div>
          <div class="dash-user-univ" id="sidebarUniv">North South University</div>
        </div>
      </div>
      <button class="btn-report-admin" id="reportAdminBtn">
        <span class="material-symbols-outlined">flag</span>
        Report to Admin
      </button>
      <button class="btn-signout" id="dashSignOutBtn">
        <span class="material-symbols-outlined">logout</span>
        Sign Out
      </button>
    </div>
  </aside>

  <!-- MOBILE SIDEBAR TOGGLE -->
  <button class="dash-mobile-toggle" id="dashMobileToggle">
    <span class="material-symbols-outlined">menu</span>
  </button>
  <div class="dash-sidebar-overlay" id="dashSidebarOverlay"></div>

  <!-- MAIN CONTENT -->
  <main class="dash-main" id="dashMain">

    <!-- OVERVIEW SECTION -->
    <section class="dash-section active" id="section-overview">
      <div class="dash-section-header">
        <div>
          <h1 class="dash-welcome" id="welcomeHeading">Welcome back, Rahim!</h1>
          <p class="dash-welcome-sub">Here's what's happening with your BashaBari account.</p>
        </div>
        <div class="dash-header-actions">
          <div class="roommate-profile-toggle-wrap">
            <span class="toggle-label">Roommate Profile</span>
            <label class="toggle-switch">
              <input type="checkbox" id="roommateProfileToggle"/>
              <span class="toggle-slider"></span>
            </label>
            <span class="toggle-status" id="toggleStatus">OFF</span>
          </div>
          <button class="btn-create-listing" id="createListingBtn">
            <span class="material-symbols-outlined">add_home</span>
            Create New Listing
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon stat-icon-primary">
            <span class="material-symbols-outlined">home_work</span>
          </div>
          <div class="stat-info">
            <div class="stat-number" id="statListings">2</div>
            <div class="stat-label">My Listings</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-secondary">
            <span class="material-symbols-outlined">favorite</span>
          </div>
          <div class="stat-info">
            <div class="stat-number" id="statFavorites">3</div>
            <div class="stat-label">Favorites</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-tertiary">
            <span class="material-symbols-outlined">people</span>
          </div>
          <div class="stat-info">
            <div class="stat-number" id="statConnections">2</div>
            <div class="stat-label">Connections</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-warning">
            <span class="material-symbols-outlined">star</span>
          </div>
          <div class="stat-info">
            <div class="stat-number" id="statReviews">1</div>
            <div class="stat-label">Reviews Given</div>
          </div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="overview-grid">
        <!-- My Favorites Horizontal Scroll -->
        <div class="overview-card">
          <div class="overview-card-header">
            <h3>My Favorites</h3>
            <button class="btn-see-all" data-section="favorites">See All</button>
          </div>
          <div class="fav-scroll-track" id="favScrollTrack">
           
          </div>
        </div>

        <!-- My Comments -->
        <div class="overview-card">
          <div class="overview-card-header">
            <h3>My Comments</h3>
            <button class="btn-see-all" data-section="activity-log">See All</button>
          </div>
          <div class="comments-list" id="overviewCommentsList">
            
          </div>
        </div>
      </div>

      <!-- Connection Requests -->
      <div class="overview-card" style="margin-top:24px;">
        <div class="overview-card-header">
          <h3>Connection Requests</h3>
          <span class="req-count" id="reqCount">0 pending</span>
        </div>
        <div class="connection-requests-list" id="connectionRequestsList">
       
        </div>
      </div>
    </section>

    <!--  MY LISTINGS SECTION -->
    <section class="dash-section" id="section-my-listings">
      <div class="dash-section-header">
        <div>
          <h1 class="dash-section-title">My Listings</h1>
          <p class="dash-section-sub">Manage your property listings</p>
        </div>
        <button class="btn-create-listing" id="createListingBtn2">
          <span class="material-symbols-outlined">add_home</span>
          Create New Listing
        </button>
      </div>
      <div class="my-listings-grid" id="myListingsGrid">
        
      </div>
    </section>

    <!--  FAVORITES SECTION  -->
    <section class="dash-section" id="section-favorites">
      <div class="dash-section-header">
        <div>
          <h1 class="dash-section-title">My Favorites</h1>
          <p class="dash-section-sub">Listings you've saved for later</p>
        </div>
      </div>
      <div class="listings-grid-dash" id="favoritesGrid">
      </div>
    </section>

    <!--  CONNECTIONS SECTION  -->
    <section class="dash-section" id="section-connections">
      <div class="dash-section-header">
        <div>
          <h1 class="dash-section-title">My Connections</h1>
          <p class="dash-section-sub">Students you're connected with</p>
        </div>
        <div class="roommate-profile-toggle-wrap">
          <span class="toggle-label">Roommate Profile</span>
          <label class="toggle-switch">
            <input type="checkbox" id="roommateProfileToggle2"/>
            <span class="toggle-slider"></span>
          </label>
          <span class="toggle-status" id="toggleStatus2">OFF</span>
        </div>
      </div>
      <div class="connections-grid" id="connectionsGrid">
      </div>
    </section>

    <!--  MESSAGES SECTION  -->
    <section class="dash-section" id="section-messages">
      <div class="messages-layout">
        <div class="conv-panel" id="convPanel">
          <div class="conv-panel-header">
            <h3>Messages</h3>
            <div class="conv-filter-tabs">
              <button class="conv-filter active" data-filter="all">All</button>
              <button class="conv-filter" data-filter="listings">Listings</button>
              <button class="conv-filter" data-filter="connections">Connections</button>
            </div>
          </div>
          <div class="conv-list" id="convList">
          </div>
        </div>
        <!-- Chat Thread -->
        <div class="chat-panel" id="chatPanel">
          <div class="chat-empty" id="chatEmpty">
            <span class="material-symbols-outlined">chat_bubble_outline</span>
            <p>Select a conversation to start messaging</p>
          </div>
          <div class="chat-thread" id="chatThread" style="display:none;">
            <div class="chat-header" id="chatHeader">
            </div>
            <div class="chat-messages" id="chatMessages">
            </div>
            <div class="chat-input-area">
              <label class="chat-img-btn" for="chatImgInput">
                <span class="material-symbols-outlined">image</span>
                <input type="file" id="chatImgInput" accept="image/*" style="display:none;"/>
              </label>
              <input type="text" class="chat-input" id="chatInput" placeholder="Type a message..."/>
              <button class="chat-send-btn" id="chatSendBtn">
                <span class="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--  ROOMMATE PROFILE SECTION  -->
    <section class="dash-section" id="section-roommate-profile">
      <div class="dash-section-header">
        <div>
          <h1 class="dash-section-title">Roommate Profile</h1>
          <p class="dash-section-sub">Fill in your profile to appear in Find Roommates</p>
        </div>
      </div>
      <div class="roommate-profile-form-wrap" style="width:100%;max-width:none;">
        <form id="roommateProfileForm" class="roommate-form">
          <div class="form-row-2">
            <div class="dash-form-group">
              <label class="dash-form-label">Budget Range (৳)</label>
              <input type="text" class="dash-form-input" id="rp_budget" placeholder="e.g. ৳3,000–5,000"/>
            </div>
            <div class="dash-form-group">
              <label class="dash-form-label">Select District</label>
              <select class="dash-form-select" id="rp_district">
                <option value="">Choose district</option>
                <option>Dhaka</option><option>Chittagong</option><option>Sylhet</option>
                <option>Rajshahi</option><option>Khulna</option><option>Barishal</option>
                <option>Rangpur</option><option>Mymensingh</option>
              </select>
            </div>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">Preferred Areas</label>
            <div class="areas-checkbox-group" id="rp_areas">
              <label class="area-check"><input type="checkbox" value="Mirpur"/> Mirpur</label>
              <label class="area-check"><input type="checkbox" value="Uttara"/> Uttara</label>
              <label class="area-check"><input type="checkbox" value="Badda"/> Badda</label>
              <label class="area-check"><input type="checkbox" value="Dhanmondi"/> Dhanmondi</label>
              <label class="area-check"><input type="checkbox" value="Mohammadpur"/> Mohammadpur</label>
              <label class="area-check"><input type="checkbox" value="Gulshan"/> Gulshan</label>
              <label class="area-check"><input type="checkbox" value="Banani"/> Banani</label>
              <label class="area-check"><input type="checkbox" value="Bashundhara"/> Bashundhara</label>
            </div>
          </div>
          <div class="form-row-2">
            <div class="dash-form-group">
              <label class="dash-form-label">Move-in Month</label>
              <select class="dash-form-select" id="rp_month">
                <option value="">Month</option>
                <option value="1">January</option><option value="2">February</option><option value="3">March</option>
                <option value="4">April</option><option value="5">May</option><option value="6">June</option>
                <option value="7">July</option><option value="8">August</option><option value="9">September</option>
                <option value="10">October</option><option value="11">November</option><option value="12">December</option>
              </select>
            </div>
            <div class="dash-form-group">
              <label class="dash-form-label">Move-in Year</label>
              <select class="dash-form-select" id="rp_year">
                <option value="">Year</option>
                <option>2025</option><option>2026</option><option>2027</option>
              </select>
            </div>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">About Yourself</label>
            <textarea class="dash-form-textarea" id="rp_description" rows="4" placeholder="Tell potential roommates about yourself, your habits, preferences..."></textarea>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">Lifestyle Tags</label>
            <div class="lifestyle-tags-grid">
              <label class="lifestyle-tag-check"><input type="checkbox" value="Clean"/>  Clean</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Friendly"/>  Friendly</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Non-Smoker"/>  Non-Smoker</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Smoker"/>  Smoker</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Night Owl"/>  Night Owl</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Early Bird"/>  Early Bird</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Studious"/>  Studious</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Social"/>  Social</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Pet Friendly"/>  Pet Friendly</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Gamer"/>  Gamer</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Introvert"/>  Introvert</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Extrovert"/>  Extrovert</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Flexible"/>  Flexible</label>
              <label class="lifestyle-tag-check"><input type="checkbox" value="Peace Lover"/>  Peace Lover</label>
            </div>
          </div>
          <button type="submit" class="btn-publish-profile">
            <span class="material-symbols-outlined">publish</span>
            Publish Profile
          </button>
        </form>
      </div>
    </section>

    <!--  USER ACTIVITY LOG SECTION  -->
    <section class="dash-section" id="section-activity-log">
      <div class="dash-section-header">
        <div>
          <h1 class="dash-section-title">User Activity Log</h1>
          <p class="dash-section-sub">Your comments and reviews on BashaBari</p>
        </div>
      </div>
      <div class="activity-stats">
        <div class="activity-stat-card">
          <span class="material-symbols-outlined">comment</span>
          <div>
            <div class="activity-stat-num" id="totalComments">2</div>
            <div class="activity-stat-label">Total Comments</div>
          </div>
        </div>
        <div class="activity-stat-card">
          <span class="material-symbols-outlined">rate_review</span>
          <div>
            <div class="activity-stat-num" id="totalReviews">1</div>
            <div class="activity-stat-label">Landlord Reviews Given</div>
          </div>
        </div>
      </div>
      <div class="activity-tabs">
        <button class="activity-tab active" data-tab="comments">Comments</button>
        <button class="activity-tab" data-tab="reviews">Landlord Reviews</button>
      </div>
      <div class="activity-content" id="activityCommentsContent">
      </div>
      <div class="activity-content" id="activityReviewsContent" style="display:none;">
      </div>
    </section>

    <!--  NOTIFICATIONS SECTION  -->
    <section class="dash-section" id="section-notifications">
      <div class="dash-section-header">
        <div>
          <h1 class="dash-section-title">Notifications</h1>
          <p class="dash-section-sub">Stay updated with your activity</p>
        </div>
        <button class="btn-mark-all-read" id="markAllReadBtn">Mark All as Read</button>
      </div>
      <div class="notif-filter-tabs">
        <button class="notif-filter active" data-filter="all">All</button>
        <button class="notif-filter" data-filter="admin">Admin</button>
        <button class="notif-filter" data-filter="comments">Comments</button>
        <button class="notif-filter" data-filter="connections">Connections</button>
      </div>
      <div class="notifications-list" id="notificationsList">
      </div>
    </section>

    <!--  SETTINGS SECTION  -->
    <section class="dash-section" id="section-settings">
      <div class="dash-section-header">
        <div>
          <h1 class="dash-section-title">Account Settings</h1>
          <p class="dash-section-sub">Manage your profile and account details</p>
        </div>
      </div>
      <div class="settings-grid">
        <!-- Profile Settings -->
        <div class="settings-card">
          <h3 class="settings-card-title">
            <span class="material-symbols-outlined">person</span>
            Profile Information
          </h3>
          <div class="profile-pic-upload">
            <div class="profile-pic-preview" id="profilePicPreview">
              <span class="profile-pic-initials" id="profilePicInitials">RA</span>
              <img id="profilePicImg" style="display:none;"/>
            </div>
            <div class="profile-pic-actions">
              <label class="btn-upload-pic" for="profilePicInput">
                <span class="material-symbols-outlined">photo_camera</span>
                Upload Photo
              </label>
              <input type="file" id="profilePicInput" accept="image/*" style="display:none;"/>
              <p class="upload-hint">JPG, PNG up to 5MB</p>
            </div>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">Full Name</label>
            <input type="text" class="dash-form-input" id="settings_name" placeholder="Your full name"/>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">Email Address</label>
            <input type="email" class="dash-form-input" id="settings_email" placeholder="you@university.edu"/>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">Phone Number</label>
            <input type="tel" class="dash-form-input" id="settings_phone" placeholder="+8801XXXXXXXXX"/>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">University</label>
            <select class="dash-form-select" id="settings_university">
              <option>North South University (NSU)</option>
              <option>BRAC University</option>
              <option>American International University-Bangladesh (AIUB)</option>
              <option>University of Dhaka (DU)</option>
              <option>Bangladesh University of Engineering & Technology (BUET)</option>
              <option>Daffodil International University (DIU)</option>
              <option>United International University (UIU)</option>
              <option>East West University (EWU)</option>
            </select>
          </div>
          <button class="btn-settings-update" id="updateProfileBtn">
            <span class="material-symbols-outlined">save</span>
            Update Profile
          </button>
        </div>

        <!-- Change Password -->
        <div class="settings-card">
          <h3 class="settings-card-title">
            <span class="material-symbols-outlined">lock</span>
            Change Password
          </h3>
          <div class="dash-form-group">
            <label class="dash-form-label">Current Password</label>
            <input type="password" class="dash-form-input" id="settings_current_pwd" placeholder="Enter current password"/>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">New Password</label>
            <input type="password" class="dash-form-input" id="settings_new_pwd" placeholder="Enter new password"/>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">Confirm New Password</label>
            <input type="password" class="dash-form-input" id="settings_confirm_pwd" placeholder="Re-enter new password"/>
          </div>
          <button class="btn-settings-update" id="changePasswordBtn">
            <span class="material-symbols-outlined">key</span>
            Change Password
          </button>
        </div>
      </div>
    </section>

  </main>
</div>


<!-- CREATE LISTING MODAL (3 Steps) -->

<div class="modal-overlay" id="createListingModal">
  <div class="modal-container" style="max-width:680px;">
    <div class="modal-header-band">
      <div class="modal-logo-row">
        <div class="modal-logo">Create <span>Listing</span></div>
        <button class="modal-close-btn" id="closeCreateListing">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <!-- Step Indicator -->
      <div class="step-indicator">
        <div class="step-item active" id="step-ind-1">
          <div class="step-circle">1</div>
          <span>Details</span>
        </div>
        <div class="step-line"></div>
        <div class="step-item" id="step-ind-2">
          <div class="step-circle">2</div>
          <span>Images</span>
        </div>
        <div class="step-line"></div>
        <div class="step-item" id="step-ind-3">
          <div class="step-circle">3</div>
          <span>Preview</span>
        </div>
      </div>
      <div class="step-progress-bar">
        <div class="step-progress-fill" id="stepProgressFill" style="width:33%"></div>
      </div>
    </div>
    <div class="modal-body" id="createListingBody">

      <!-- STEP 1: Details -->
      <div class="listing-step" id="listingStep1">
        <div class="dash-form-group">
          <label class="dash-form-label">Listing Title *</label>
          <input type="text" class="dash-form-input" id="cl_title" placeholder="e.g. Cozy Single Room Near NSU"/>
          <div class="step-field-error" id="cl_title_err"></div>
        </div>
        <div class="form-row-2">
          <div class="dash-form-group">
            <label class="dash-form-label">District *</label>
            <select class="dash-form-select" id="cl_district">
              <option value="">Select District</option>
              <option>Dhaka</option><option>Chittagong</option><option>Sylhet</option>
              <option>Rajshahi</option><option>Khulna</option>
            </select>
            <div class="step-field-error" id="cl_district_err"></div>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">Area *</label>
            <select class="dash-form-select" id="cl_area">
              <option value="">Select Area</option>
            </select>
            <div class="step-field-error" id="cl_area_err"></div>
          </div>
        </div>
        <div class="form-row-2">
          <div class="dash-form-group">
            <label class="dash-form-label">Monthly Rent (৳) *</label>
            <input type="number" class="dash-form-input" id="cl_rent" placeholder="e.g. 8500"/>
            <div class="step-field-error" id="cl_rent_err"></div>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">Property Type *</label>
            <select class="dash-form-select" id="cl_type">
              <option value="">Select Type</option>
              <option>Flat</option><option>Sublet</option><option>Single Room</option>
              <option>Shared Flat</option><option>Mess</option><option>Bachelor Flat</option>
            </select>
            <div class="step-field-error" id="cl_type_err"></div>
          </div>
        </div>
        <div class="dash-form-group">
          <label class="dash-form-label">Near University *</label>
          <select class="dash-form-select" id="cl_university">
            <option value="">Select University</option>
            <option>North South University (NSU)</option>
            <option>BRAC University</option>
            <option>AIUB</option>
            <option>University of Dhaka</option>
            <option>BUET</option>
            <option>Daffodil International University</option>
            <option>UIU</option>
            <option>East West University</option>
          </select>
          <div class="step-field-error" id="cl_university_err"></div>
        </div>
        <div class="dash-form-group">
          <label class="dash-form-label">Available From *</label>
          <input type="date" class="dash-form-input" id="cl_available_from"/>
          <div class="step-field-error" id="cl_available_from_err"></div>
        </div>
        <div class="form-row-2">
          <div class="dash-form-group">
            <label class="dash-form-label">Distance (km) *</label>
            <input type="number" class="dash-form-input" id="cl_distance" placeholder="e.g. 0.5" step="0.1"/>
          </div>
          <div class="dash-form-group">
            <label class="dash-form-label">Transit Mode</label>
            <select class="dash-form-select" id="cl_transit">
              <option>Walking</option><option>Bus</option><option>Cycle</option>
              <option>Bike</option><option>Car</option><option>Metro</option>
            </select>
          </div>
        </div>
        <div class="dash-form-group">
          <label class="dash-form-label">Description</label>
          <textarea class="dash-form-textarea" id="cl_description" rows="3" placeholder="Describe the property..."></textarea>
        </div>
        <div class="dash-form-group">
          <label class="dash-form-label">Amenities</label>
          <div class="amenities-checkboxes">
            <label><input type="checkbox" value="WiFi"/> WiFi</label>
            <label><input type="checkbox" value="AC"/> AC</label>
            <label><input type="checkbox" value="Parking"/> Parking</label>
            <label><input type="checkbox" value="Gas"/> Gas</label>
            <label><input type="checkbox" value="Security"/> Security</label>
            <label><input type="checkbox" value="Attached Bathroom"/> Attached Bathroom</label>
            <label><input type="checkbox" value="Generator"/> Generator</label>
            <label><input type="checkbox" value="Rooftop"/> Rooftop</label>
            <label><input type="checkbox" value="Balcony"/> Balcony</label>
            <label><input type="checkbox" value="Laundry"/> Laundry</label>
          </div>
        </div>
        <div class="step-btns">
          <div></div>
          <button type="button" class="btn-step-next" id="step1Next">Next Step →</button>
        </div>
      </div>

      <!-- STEP 2: Images -->
      <div class="listing-step" id="listingStep2" style="display:none;">
        <h3 class="step-subtitle">Upload Property Images</h3>
        <p class="step-hint">Upload up to 6 photos of your property</p>
        <div class="image-upload-grid" id="imageUploadGrid">
        </div>
        <div class="step-btns">
          <button type="button" class="btn-step-back" id="step2Back">← Back</button>
          <button type="button" class="btn-step-next" id="step2Next">Last Step →</button>
        </div>
      </div>

      <!-- STEP 3: Preview -->
      <div class="listing-step" id="listingStep3" style="display:none;">
        <h3 class="step-subtitle">Preview Your Listing</h3>
        <p class="step-hint">This is how your listing will appear to other students</p>
        <div class="listing-preview-wrap" id="listingPreviewWrap">
        </div>
        <div class="step-btns">
          <button type="button" class="btn-step-back" id="step3Back">← Back</button>
          <button type="button" class="btn-post-listing" id="postListingBtn">
            <span class="material-symbols-outlined">publish</span>
            Post Listing
          </button>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- EDIT LISTING MODAL -->
<div class="modal-overlay" id="editListingModal">
  <div class="modal-container" style="max-width:620px;">
    <div class="modal-header-band">
      <div class="modal-logo-row">
        <div class="modal-logo">Edit <span>Listing</span></div>
        <button class="modal-close-btn" id="closeEditListing">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <p class="modal-subtitle">Update your listing details</p>
    </div>
    <div class="modal-body">
      <div class="dash-form-group">
        <label class="dash-form-label">Title</label>
        <input type="text" class="dash-form-input" id="edit_title"/>
      </div>
      <div class="form-row-2">
        <div class="dash-form-group">
          <label class="dash-form-label">Monthly Rent (৳)</label>
          <input type="number" class="dash-form-input" id="edit_rent"/>
        </div>
        <div class="dash-form-group">
          <label class="dash-form-label">Property Type</label>
          <select class="dash-form-select" id="edit_type">
            <option>Flat</option><option>Sublet</option><option>Single Room</option>
            <option>Shared Flat</option><option>Mess</option><option>Bachelor Flat</option>
          </select>
        </div>
      </div>
      <div class="dash-form-group">
        <label class="dash-form-label">Available From</label>
        <input type="date" class="dash-form-input" id="edit_available_from"/>
      </div>
      <div class="dash-form-group">
        <label class="dash-form-label">Description</label>
        <textarea class="dash-form-textarea" id="edit_description" rows="3"></textarea>
      </div>
      <div class="dash-form-group">
        <label class="dash-form-label">Listing Image</label>
        <div id="editImagePreviewWrap" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <img id="editImagePreview" src="" alt="Listing image" style="width:110px;height:80px;object-fit:cover;border-radius:12px;border:1px solid #e0e3e5;display:none;"/>
          <label class="btn-upload-pic" for="editImageInput" style="cursor:pointer;">
            <span class="material-symbols-outlined">photo_camera</span> Change Image
          </label>
          <button type="button" class="btn-delete-listing" id="editImageRemoveBtn" style="width:auto;padding:10px 14px;">Remove</button>
          <input type="file" id="editImageInput" accept="image/*" style="display:none;"/>
        </div>
      </div>
      <input type="hidden" id="edit_listing_id"/>
      <button class="btn-post-listing" id="updateListingBtn" style="width:100%;margin-top:8px;">
        <span class="material-symbols-outlined">save</span> Update Listing
      </button>
    </div>
  </div>
</div>

<!-- DELETE CONFIRMATION MODAL -->
<div class="modal-overlay" id="deleteConfirmModal">
  <div class="modal-container" style="max-width:420px;">
    <div class="modal-body" style="text-align:center;padding:48px 36px;">
      <div class="delete-confirm-icon">
        <span class="material-symbols-outlined">delete_forever</span>
      </div>
      <h3 class="delete-confirm-title">Delete Listing?</h3>
      <p class="delete-confirm-text">This action cannot be undone. Your listing will be permanently removed.</p>
      <input type="hidden" id="delete_listing_id"/>
      <div class="delete-confirm-btns">
        <button class="btn-delete-no" id="deleteNo">No, Keep It</button>
        <button class="btn-delete-yes" id="deleteYes">Yes, Continue</button>
      </div>
    </div>
  </div>
</div>

<!-- REPORT MODAL -->
<div class="modal-overlay" id="reportModal">
  <div class="modal-container" style="max-width:500px;">
    <div class="modal-header-band">
      <div class="modal-logo-row">
        <div class="modal-logo">Report <span>Issue</span></div>
        <button class="modal-close-btn" id="closeReportModal">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <p class="modal-subtitle">Help us keep BashaBari safe and trustworthy</p>
    </div>
    <div class="modal-body">
      <div class="dash-form-group">
        <label class="dash-form-label">Title</label>
        <input type="text" class="dash-form-input" id="report_title" placeholder="Brief title of the issue"/>
      </div>
      <div class="dash-form-group">
        <label class="dash-form-label">Category</label>
        <select class="dash-form-select" id="report_category">
          <option value="">Select Category</option>
          <option>House Listings</option>
          <option>Roommate Profile</option>
          <option>Technical Issue</option>
          <option>Comments</option>
          <option>User</option>
        </select>
      </div>
      <div class="dash-form-group">
        <label class="dash-form-label">Upload Image (Optional)</label>
        <label class="report-img-upload" for="report_img_input">
          <span class="material-symbols-outlined">upload_file</span>
          <span id="reportImgLabel">Click to upload image</span>
          <input type="file" id="report_img_input" accept="image/*" style="display:none;"/>
        </label>
      </div>
      <div class="dash-form-group">
        <label class="dash-form-label">Description</label>
        <textarea class="dash-form-textarea" id="report_description" rows="4" placeholder="Describe the issue in detail..."></textarea>
      </div>
      <button class="btn-report-submit" id="submitReportBtn">
        <span class="material-symbols-outlined">flag</span>
        Submit Report
      </button>
    </div>
  </div>
</div>

<!-- ROOMMATE PROFILE VIEW MODAL -->
<div class="modal-overlay" id="roommateViewModal">
  <div class="modal-container" style="max-width:520px;">
    <div class="modal-header-band">
      <div class="modal-logo-row">
        <div class="modal-logo">Roommate <span>Profile</span></div>
        <button class="modal-close-btn" id="closeRoommateView">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
    <div class="modal-body" id="roommateViewBody">
    </div>
  </div>
</div>

<script src="modal.js"></script>
<script src="student-dashboard.js"></script>
<script src="messages.js"></script>
</body>
</html>