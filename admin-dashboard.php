<?php require_once 'config/session.php'; if (!isLoggedIn() || ($_SESSION['role'] ?? '') !== 'admin') { header('Location: index.php'); exit; } $sessionUser = getCurrentUser(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="csrf-token" content="<?= htmlspecialchars($_SESSION['csrf_token'] ?? '', ENT_QUOTES, 'UTF-8') ?>"/>
  <script>window.CURRENT_USER = <?= json_encode($sessionUser, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?: 'null' ?>;</script>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Admin Dashboard — BashaBari</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link rel="stylesheet" href="admin-dashboard.css"/>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body class="admin-body">

<!-- Auth Guard Overlay -->
<div id="authGuard" class="auth-guard" style="display:none;">
  <div class="auth-guard-content">
    <div class="auth-guard-icon">
      <span class="material-symbols-outlined">admin_panel_settings</span>
    </div>
    <h2>Admin Access Required</h2>
    <p>You need admin credentials to access this page.</p>
    <button onclick="window.location.href='index.php'" class="auth-guard-btn">Go to Homepage</button>
  </div>
</div>

<!-- Admin Dashboard Layout -->
<div class="admin-layout" id="adminLayout">

  <!-- LEFT SIDEBAR -->
  <aside class="admin-sidebar" id="adminSidebar">
    <div class="sidebar-logo-wrap">
      <a href="index.php" class="sidebar-logo">
        <span class="sidebar-logo-text">BashaBari</span>
      </a>
      <div class="sidebar-role-badge">
        <span class="material-symbols-outlined" style="font-size:12px;font-variation-settings:'FILL' 1;">shield_person</span>
        Admin Dashboard
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <button class="sidebar-nav-item active" data-section="overview">
        <span class="material-symbols-outlined">dashboard</span>
        <span>Overview</span>
        <span class="nav-indicator"></span>
      </button>
      <button class="sidebar-nav-item" data-section="users">
        <span class="material-symbols-outlined">manage_accounts</span>
        <span>User Management</span>
      </button>
      <button class="sidebar-nav-item" data-section="listings">
        <span class="material-symbols-outlined">apartment</span>
        <span>All Listings</span>
        <span class="nav-badge pending-badge" id="pendingBadge">3</span>
      </button>
      <button class="sidebar-nav-item" data-section="reviews">
        <span class="material-symbols-outlined">star_rate</span>
        <span>Landlord Reviews</span>
      </button>
      <button class="sidebar-nav-item" data-section="feedback">
        <span class="material-symbols-outlined">feedback</span>
        <span>Feedback Messages</span>
      </button>
      <button class="sidebar-nav-item" data-section="reports">
        <span class="material-symbols-outlined">flag</span>
        <span>Reports from Users</span>
        <span class="nav-badge report-badge" id="reportBadge">5</span>
      </button>
      <button class="sidebar-nav-item" data-section="activity">
        <span class="material-symbols-outlined">timeline</span>
        <span>Recent Activity</span>
      </button>
      <button class="sidebar-nav-item" data-section="settings">
        <span class="material-symbols-outlined">settings</span>
        <span>Settings</span>
      </button>
    </nav>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer">
      <div class="sidebar-admin-profile">
        <div class="sidebar-avatar" id="sidebarAvatar">AU</div>
        <div class="sidebar-admin-info">
          <p class="sidebar-admin-name" id="sidebarAdminName">Admin User</p>
          <p class="sidebar-admin-email" id="sidebarAdminEmail">admin@bashabari.com</p>
        </div>
      </div>
      <button class="sidebar-signout-btn" id="adminSignOutBtn">
        <span class="material-symbols-outlined">logout</span>
        Sign Out
      </button>
    </div>
  </aside>

  <!-- Sidebar Toggle (Mobile) -->
  <button class="sidebar-mobile-toggle" id="sidebarToggle">
    <span class="material-symbols-outlined">menu</span>
  </button>

  <!-- MAIN CONTENT -->
  <main class="admin-main" id="adminMain">

    <!-- OVERVIEW SECTION  -->
    <section class="admin-section active" id="section-overview">
      <!-- Top Bar -->
      <div class="section-topbar">
        <div class="section-topbar-left">
          <h1 class="section-title">Overview</h1>
          <p class="section-subtitle">Welcome back, Admin! Here's what's happening on BashaBari.</p>
        </div>
        <div class="section-topbar-right">
          <div class="topbar-date">
            <span class="material-symbols-outlined">calendar_today</span>
            <span id="currentDate"></span>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card-icon" style="background:linear-gradient(135deg,#0A192F,#0c6780);">
            <span class="material-symbols-outlined">group</span>
          </div>
          <div class="stat-card-info">
            <p class="stat-label">Total Users</p>
            <h3 class="stat-value" data-count="1284">0</h3>
            <span class="stat-change positive">
              <span class="material-symbols-outlined">trending_up</span> +12% this month
            </span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon" style="background:linear-gradient(135deg,#F59E0B,#d97706);">
            <span class="material-symbols-outlined">pending_actions</span>
          </div>
          <div class="stat-card-info">
            <p class="stat-label">Pending Approvals</p>
            <h3 class="stat-value" data-count="23">0</h3>
            <span class="stat-change warning">
              <span class="material-symbols-outlined">schedule</span> Needs review
            </span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon" style="background:linear-gradient(135deg,#EF4444,#dc2626);">
            <span class="material-symbols-outlined">report</span>
          </div>
          <div class="stat-card-info">
            <p class="stat-label">Reports from Users</p>
            <h3 class="stat-value" data-count="47">0</h3>
            <span class="stat-change negative">
              <span class="material-symbols-outlined">trending_up</span> +5 new today
            </span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon" style="background:linear-gradient(135deg,#10B981,#059669);">
            <span class="material-symbols-outlined">verified</span>
          </div>
          <div class="stat-card-info">
            <p class="stat-label">Active Listings</p>
            <h3 class="stat-value" data-count="342">0</h3>
            <span class="stat-change positive">
              <span class="material-symbols-outlined">trending_up</span> +28 this week
            </span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon" style="background:linear-gradient(135deg,#87CEEB,#0c6780);">
            <span class="material-symbols-outlined">rate_review</span>
          </div>
          <div class="stat-card-info">
            <p class="stat-label">Total Reviews</p>
            <h3 class="stat-value" data-count="891">0</h3>
            <span class="stat-change positive">
              <span class="material-symbols-outlined">trending_up</span> +34 this month
            </span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon" style="background:linear-gradient(135deg,#98FF98,#10b981);">
            <span class="material-symbols-outlined">grade</span>
          </div>
          <div class="stat-card-info">
            <p class="stat-label">Platform Rating</p>
            <h3 class="stat-value">4.7<span style="font-size:16px;color:#94a3b8;">/5</span></h3>
            <span class="stat-change positive">
              <span class="material-symbols-outlined">star</span> Excellent
            </span>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-card-header">
            <h3 class="chart-title">Listings per District</h3>
            <span class="chart-badge">Bar Chart</span>
          </div>
          <div class="chart-wrap">
            <canvas id="districtChart"></canvas>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-card-header">
            <h3 class="chart-title">New Users per Month</h3>
            <span class="chart-badge">Line Chart</span>
          </div>
          <div class="chart-wrap">
            <canvas id="usersChart"></canvas>
          </div>
        </div>
        <div class="chart-card chart-card-pie">
          <div class="chart-card-header">
            <h3 class="chart-title">Listing Types</h3>
            <span class="chart-badge">Pie Chart</span>
          </div>
          <div class="chart-wrap chart-wrap-pie">
            <canvas id="typeChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Activity Feed -->
      <div class="activity-card">
        <div class="activity-card-header">
          <h3 class="chart-title">Recent Activity</h3>
          <button class="view-all-btn" onclick="switchSection('activity')">View All →</button>
        </div>
        <div class="activity-feed" id="overviewActivityFeed"></div>
      </div>
    </section>

    <!-- USER MANAGEMENT SECTION  -->
    <section class="admin-section" id="section-users">
      <div class="section-topbar">
        <div class="section-topbar-left">
          <h1 class="section-title">User Management</h1>
          <p class="section-subtitle">Manage all registered students and their activity.</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <div class="filter-search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search by name, email, student ID…" id="userSearch" class="filter-search-input"/>
        </div>
        <select class="filter-select" id="userUniversityFilter">
          <option value="">All Universities</option>
          <option>North South University</option>
          <option>BRAC University</option>
          <option>AIUB</option>
          <option>University of Dhaka</option>
          <option>BUET</option>
          <option>DIU</option>
          <option>UIU</option>
          <option>EWU</option>
          <option>ULAB</option>
          <option>UAP</option>
          <option>SUST</option>
          <option>CUET</option>
          <option>KUET</option>
          <option>RUET</option>
          <option>IUT</option>
        </select>
        <select class="filter-select" id="userGenderFilter">
          <option value="">All Genders</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <select class="filter-select" id="userStatusFilter">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
          <option value="verified">Verified</option>
        </select>
        <button class="filter-reset-btn" id="resetUserFilters">
          <span class="material-symbols-outlined">refresh</span> Reset
        </button>
      </div>

      <!-- Users Table -->
      <div class="table-wrap">
        <table class="admin-table" id="usersTable">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>University</th>
              <th>Student ID</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="usersTableBody"></tbody>
        </table>
        <div class="table-empty" id="usersEmpty" style="display:none;">
          <span class="material-symbols-outlined">search_off</span>
          <p>No users found matching your filters.</p>
        </div>
      </div>
    </section>

    <!-- ALL LISTINGS SECTION -->
    <section class="admin-section" id="section-listings">
      <div class="section-topbar">
        <div class="section-topbar-left">
          <h1 class="section-title">All Listings</h1>
          <p class="section-subtitle">Review, approve, and manage all property listings.</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <div class="filter-search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search listings…" id="listingSearch" class="filter-search-input"/>
        </div>
        <select class="filter-select" id="listingDistrictFilter">
          <option value="">All Districts</option>
          <option>Dhaka</option>
          <option>Chittagong</option>
          <option>Sylhet</option>
          <option>Rajshahi</option>
          <option>Khulna</option>
          <option>Mymensingh</option>
          <option>Barisal</option>
          <option>Rangpur</option>
        </select>
        <select class="filter-select" id="listingStatusFilter">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="published">Published</option>
          <option value="rejected">Rejected</option>
          <option value="deleted">Deleted</option>
        </select>
        <select class="filter-select" id="listingTypeFilter">
          <option value="">All Types</option>
          <option>Flat</option>
          <option>Sublet</option>
          <option>Single Room</option>
          <option>Shared Flat</option>
          <option>Mess</option>
          <option>Bachelor Flat</option>
        </select>
        <button class="filter-reset-btn" id="resetListingFilters">
          <span class="material-symbols-outlined">refresh</span> Reset
        </button>
      </div>

      <!-- Listings Grid -->
      <div class="admin-listings-grid" id="adminListingsGrid"></div>
      <div class="table-empty" id="listingsEmpty" style="display:none;">
        <span class="material-symbols-outlined">home_work</span>
        <p>No listings found matching your filters.</p>
      </div>
    </section>

    <!-- LANDLORD REVIEWS SECTION  -->
    <section class="admin-section" id="section-reviews">
      <div class="section-topbar">
        <div class="section-topbar-left">
          <h1 class="section-title">Landlord Reviews</h1>
          <p class="section-subtitle">Manage and moderate all landlord reviews submitted by students.</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <div class="filter-search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search by landlord name, address…" id="reviewSearch" class="filter-search-input"/>
        </div>
        <select class="filter-select" id="reviewDistrictFilter">
          <option value="">All Districts</option>
          <option>Dhaka</option>
          <option>Chittagong</option>
          <option>Sylhet</option>
          <option>Rajshahi</option>
        </select>
        <select class="filter-select" id="reviewStarFilter">
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1 Star</option>
        </select>
        <select class="filter-select" id="reviewStatusFilter">
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="featured">Featured</option>
        </select>
        <button class="filter-reset-btn" id="resetReviewFilters">
          <span class="material-symbols-outlined">refresh</span> Reset
        </button>
      </div>

      <div class="reviews-admin-grid" id="reviewsAdminGrid"></div>
      <div class="table-empty" id="reviewsEmpty" style="display:none;">
        <span class="material-symbols-outlined">rate_review</span>
        <p>No reviews found.</p>
      </div>
    </section>

    <!-- FEEDBACK MESSAGES SECTION -->
    <section class="admin-section" id="section-feedback">
      <div class="section-topbar">
        <div class="section-topbar-left">
          <h1 class="section-title">Feedback Messages</h1>
          <p class="section-subtitle">Messages sent by students from the About page.</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <div class="filter-search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search feedback…" id="feedbackSearch" class="filter-search-input"/>
        </div>
        <select class="filter-select" id="feedbackStarFilter">
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>
        <button class="filter-reset-btn" id="resetFeedbackFilters">
          <span class="material-symbols-outlined">refresh</span> Reset
        </button>
      </div>

      <div class="feedback-admin-grid" id="feedbackAdminGrid"></div>
      <div class="table-empty" id="feedbackEmpty" style="display:none;">
        <span class="material-symbols-outlined">feedback</span>
        <p>No feedback messages found.</p>
      </div>
    </section>

    <!-- REPORTS SECTION -->
    <section class="admin-section" id="section-reports">
      <div class="section-topbar">
        <div class="section-topbar-left">
          <h1 class="section-title">Reports from Users</h1>
          <p class="section-subtitle">Review and resolve user-submitted reports.</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <div class="filter-search-wrap">
          <span class="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search reports…" id="reportSearch" class="filter-search-input"/>
        </div>
        <select class="filter-select" id="reportCategoryFilter">
          <option value="">All Categories</option>
          <option value="listings">House Listings</option>
          <option value="roommate">Roommate Profile</option>
          <option value="technical_issue">Technical Issue</option>
          <option value="comment">Comments</option>
          <option value="user">User</option>
        </select>
        <select class="filter-select" id="reportStatusFilter">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="in_review">In Review</option>
          <option value="resolved">Resolved</option>
        </select>
        <button class="filter-reset-btn" id="resetReportFilters">
          <span class="material-symbols-outlined">refresh</span> Reset
        </button>
      </div>

      <div class="reports-grid" id="reportsGrid"></div>
      <div class="table-empty" id="reportsEmpty" style="display:none;">
        <span class="material-symbols-outlined">flag</span>
        <p>No reports found.</p>
      </div>
    </section>

    <!-- RECENT ACTIVITY SECTION -->
    <section class="admin-section" id="section-activity">
      <div class="section-topbar">
        <div class="section-topbar-left">
          <h1 class="section-title">Recent Activity</h1>
          <p class="section-subtitle">Full chronological log of all platform activity.</p>
        </div>
      </div>

      <!-- Activity Filters -->
      <div class="filter-bar">
        <div class="activity-filter-tabs" id="activityFilterTabs">
          <button class="activity-tab active" data-filter="all">All</button>
          <button class="activity-tab" data-filter="listings">Listings</button>
          <button class="activity-tab" data-filter="users">Users</button>
          <button class="activity-tab" data-filter="comments">Comments</button>
          <button class="activity-tab" data-filter="connections">Connections</button>
          <button class="activity-tab" data-filter="reports">Reports</button>
        </div>
      </div>

      <div class="activity-timeline" id="fullActivityFeed"></div>
      <div class="load-more-wrap">
        <button class="load-more-btn" id="loadMoreActivity">
          <span class="material-symbols-outlined">expand_more</span>
          Load More
        </button>
      </div>
    </section>

    <!-- SETTINGS SECTION -->
    <section class="admin-section" id="section-settings">
      <div class="section-topbar">
        <div class="section-topbar-left">
          <h1 class="section-title">Admin Settings</h1>
          <p class="section-subtitle">Manage platform settings and configurations.</p>
        </div>
      </div>

      <div class="settings-grid">
        <!-- Platform Settings -->
        <div class="settings-card">
          <div class="settings-card-header">
            <span class="material-symbols-outlined">tune</span>
            <h3>Platform Settings</h3>
          </div>
          <div class="settings-form">
            <div class="settings-form-group">
              <label class="settings-label">Site Name</label>
              <input type="text" class="settings-input" id="siteName" value="BashaBari" placeholder="Site name"/>
            </div>
            <div class="settings-form-group">
              <label class="settings-label">Platform Tagline</label>
              <input type="text" class="settings-input" id="siteTagline" value="Find Your Perfect Home Near Campus" placeholder="Tagline"/>
            </div>
            <div class="settings-form-group">
              <label class="settings-label">Support Email</label>
              <input type="email" class="settings-input" id="supportEmail" value="support@bashabari.com" placeholder="support@bashabari.com"/>
            </div>
            <div class="settings-form-group">
              <label class="settings-label">Facebook URL</label>
              <input type="url" class="settings-input" id="facebookUrl" value="https://facebook.com/bashabari" placeholder="Facebook URL"/>
            </div>
            <div class="settings-form-group">
              <label class="settings-label">Twitter/X URL</label>
              <input type="url" class="settings-input" id="twitterUrl" value="https://twitter.com/bashabari" placeholder="Twitter URL"/>
            </div>
            <div class="settings-form-group">
              <label class="settings-label maintenance-label">
                <span>Maintenance Mode</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="maintenanceToggle"/>
                  <span class="toggle-slider"></span>
                </label>
              </label>
              <p class="settings-hint">When enabled, the site will show a maintenance page to visitors.</p>
            </div>
            <button class="settings-save-btn" id="savePlatformSettings">
              <span class="material-symbols-outlined">save</span>
              Save Changes
            </button>
          </div>
        </div>

        <!-- Change Password -->
        <div class="settings-card">
          <div class="settings-card-header">
            <span class="material-symbols-outlined">lock_reset</span>
            <h3>Change Admin Password</h3>
          </div>
          <div class="settings-form">
            <div class="settings-form-group">
              <label class="settings-label">Current Password</label>
              <input type="password" class="settings-input" id="currentPassword" placeholder="Enter current password"/>
            </div>
            <div class="settings-form-group">
              <label class="settings-label">New Password</label>
              <input type="password" class="settings-input" id="newPassword" placeholder="Enter new password"/>
            </div>
            <div class="settings-form-group">
              <label class="settings-label">Confirm New Password</label>
              <input type="password" class="settings-input" id="confirmNewPassword" placeholder="Confirm new password"/>
            </div>
            <button class="settings-save-btn" id="changePasswordBtn">
              <span class="material-symbols-outlined">lock</span>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </section>

  </main>
</div>

<!-- MODALS -->

<!-- User Detail Modal -->
<div class="modal-overlay-admin" id="userDetailModal">
  <div class="modal-admin" id="userDetailModalContent">
    <div class="modal-admin-header">
      <h3 class="modal-admin-title">User Details</h3>
      <button class="modal-admin-close" data-close="userDetailModal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-admin-body" id="userDetailBody"></div>
  </div>
</div>

<!-- Listing Detail Modal -->
<div class="modal-overlay-admin" id="listingDetailModal">
  <div class="modal-admin modal-admin-wide" id="listingDetailModalContent">
    <div class="modal-admin-header">
      <h3 class="modal-admin-title">Listing Details</h3>
      <button class="modal-admin-close" data-close="listingDetailModal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-admin-body" id="listingDetailBody"></div>
  </div>
</div>

<!-- Review Detail Modal -->
<div class="modal-overlay-admin" id="reviewDetailModal">
  <div class="modal-admin modal-admin-wide" id="reviewDetailModalContent">
    <div class="modal-admin-header">
      <h3 class="modal-admin-title">Landlord Review Details</h3>
      <button class="modal-admin-close" data-close="reviewDetailModal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-admin-body" id="reviewDetailBody"></div>
  </div>
</div>

<!-- Confirm Action Modal -->
<div class="modal-overlay-admin" id="confirmModal">
  <div class="modal-admin modal-admin-sm">
    <div class="modal-admin-header">
      <h3 class="modal-admin-title" id="confirmTitle">Confirm Action</h3>
      <button class="modal-admin-close" data-close="confirmModal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-admin-body">
      <p class="confirm-message" id="confirmMessage">Are you sure?</p>
      <div class="confirm-btns">
        <button class="confirm-yes-btn" id="confirmYesBtn">Yes, Continue</button>
        <button class="confirm-no-btn" data-close="confirmModal">No, Cancel</button>
      </div>
    </div>
  </div>
</div>

<!-- Reply to Report Modal -->
<div class="modal-overlay-admin" id="replyModal">
  <div class="modal-admin modal-admin-sm">
    <div class="modal-admin-header">
      <h3 class="modal-admin-title">Reply to Report</h3>
      <button class="modal-admin-close" data-close="replyModal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-admin-body">
      <div class="settings-form-group">
        <label class="settings-label">Your Reply</label>
        <textarea class="settings-input settings-textarea" id="replyText" placeholder="Write your response to this report…" rows="4"></textarea>
      </div>
      <div class="confirm-btns">
        <button class="confirm-yes-btn" id="sendReplyBtn">
          <span class="material-symbols-outlined">send</span> Send Reply
        </button>
        <button class="confirm-no-btn" data-close="replyModal">Cancel</button>
      </div>
    </div>
  </div>
</div>

<div class="admin-toast-container" id="adminToastContainer"></div>

<script src="admin-dashboard.js"></script>

</body>
</html>