# BashaBari — Off-Campus Student Housing Platform

**BashaBari** (বাসাবাড়ি) is a Bangladesh-focused student housing platform where off-campus listings are verified by previous student tenants. It helps students find affordable homes near their university, discover compatible roommates, and read honest reviews of landlords — all in one place.

> Built for Bangladeshi students. Trusted by student communities across 16+ universities.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Modules](#pages--modules)
- [Database Schema](#database-schema)
- [Security](#security)
- [Getting Started](#getting-started)
- [Demo Credentials](#demo-credentials)
- [API Reference](#api-reference)
- [Design System](#design-system)
- [Contributing](#contributing)

---

## Overview

BashaBari solves a real problem for university students in Bangladesh: finding safe, affordable, and conveniently located off-campus housing. The platform connects students with verified listings, enables roommate matching based on lifestyle preferences, and holds landlords accountable through a community-driven review system.

The project is split into two build phases:

| Phase | Scope | Status |
|-------|-------|--------|
| **Phase 1** | Frontend (HTML + CSS + JS) + MySQL schema | Complete |
| **Phase 2** | Backend integration (PHP + MySQL), real auth, real-time messaging | Complete |

---

## Features

### For Students

- **Browse & Filter Listings** — Search by district, area, university, property type, rent range (৳1,000–৳30,000), amenities, and campus distance
- **Listing Detail View** — Full image gallery, all property details, amenities, comments, and poster contact number (gated behind login)
- **Favorites** — Save listings to revisit later from your dashboard
- **Roommate Matching** — Create a profile with lifestyle tags (Night Owl, Clean, Pet Friendly, etc.) and connect with compatible students
- **Real-time Messaging** — Chat with connections directly in the platform (PHP polling, no simulated messages)
- **Post Your Own Listing** — 3-step form with image upload, preview, and submission for admin approval
- **Landlord Reviews** — Write and read verified reviews with star ratings and recommendation badges
- **Notifications** — Get notified for connection requests, comments, admin replies, and more
- **Student Dashboard** — Full management of listings, connections, messages, roommate profile, and settings

### For Admins

- **Overview Stats** — Total users, pending listings, active listings, reports, overall platform rating
- **Charts** — Bar (listings per district), Line (new users per month), Pie (listing type breakdown)
- **User Management** — View, ban/unban, give verified badges, edit, delete users
- **Listing Moderation** — Approve, reject, give verified badge, edit, delete any listing
- **Review Moderation** — Approve, feature, edit, delete landlord reviews
- **Feedback Management** — View and feature student feedback from the About page
- **Reports Queue** — Manage reports with status tracking (New → In Review → Resolved) and reply-to-notify
- **Platform Settings** — Update site name, tagline, support email, social links, maintenance mode

### Platform-wide

- Secure authentication (PHP sessions + bcrypt passwords)
- CSRF protection on all POST requests
- Fully mobile-responsive with hamburger navigation
- Glassmorphism UI with smooth animations and scroll-triggered effects
- All prices displayed in ৳ (Bangladeshi Taka)
- Dates in `DD Month YYYY` or relative format ("2 days ago")

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Backend** | PHP 7.4+ (no frameworks, plain PHP) |
| **Database** | MySQL 5.7+ (InnoDB, utf8mb4) |
| **Database Access** | PDO with prepared statements |
| **Fonts** | Google Fonts — Manrope (headlines), Inter (body) |
| **Icons** | Font Awesome 6 (CDN) |
| **Server** | XAMPP / WAMP / any Apache + PHP + MySQL stack |

---

## Project Structure

```
bashabari/
│
├── PHP Pages (converted from HTML)
│   ├── index.php                    # Landing / Home page
│   ├── browse-listings.php          # Property listings with filters
│   ├── find-roommates.php           # Roommate matching page
│   ├── landlord-reviews.php         # Landlord review board
│   ├── about.php                    # About + feedback form
│   ├── student-dashboard.php        # Student control panel
│   └── admin-dashboard.php          # Admin control panel
│
├── CSS Files (unchanged from Phase 1)
│   ├── style.css                    # Global / index styles
│   ├── browse.css                   # Browse listings styles
│   ├── roommates.css                # Find roommates styles
│   ├── landlord.css                 # Landlord review styles
│   ├── about.css                    # About page styles
│   ├── modal.css                    # Login / register modal styles
│   ├── student-dashboard.css        # Student dashboard styles
│   └── admin-dashboard.css          # Admin dashboard styles
│
├── JavaScript Files
│   ├── browse.js                    # Listings filter + AJAX calls
│   ├── roommates.js                 # Roommate filter + AJAX calls
│   ├── landlord.js                  # Review filter + AJAX calls
│   ├── about.js                     # Feedback submission
│   ├── modal.js                     # Auth modal (login/register via real API)
│   ├── messages.js                  # Real-time messaging (PHP polling, bug-fixed)
│   ├── student-dashboard.js         # Student dashboard interactions + AJAX
│   └── admin-dashboard.js           # Admin dashboard interactions + AJAX
│
├── Config
│   ├── config/db.php                # PDO database connection (getDB())
│   ├── config/session.php           # Session helpers (isLoggedIn, requireLogin, etc.)
│   └── config/auth.php              # Shared helpers (jsonResponse, logActivity, sendNotification)
│
├── API Endpoints
│   └── api/
│       ├── auth/                    # login, register, logout, check-session
│       ├── listings/                # CRUD + approve/reject/verify, image upload, toggle phone
│       ├── favorites/               # toggle-favorite, get-favorites
│       ├── comments/                # get, add, edit, delete
│       ├── roommates/               # get profiles, save profile, toggle publish
│       ├── connections/             # send/respond request, get connections, disconnect
│       ├── messages/                # get conversations, get messages (polling), send, mark-seen
│       ├── landlord-reviews/        # get, submit, edit, delete, admin approve/delete
│       ├── feedback/                # submit, get (admin), toggle featured, delete
│       ├── reports/                 # submit, get (admin), update status, reply, delete
│       ├── notifications/           # get, mark-read, mark-all-read
│       ├── users/                   # admin user management, student profile/password/avatar
│       ├── admin/                   # stats, activity log, settings
│       ├── districts/               # get all districts, get areas by district
│       └── universities/            # get all universities
│
├── Uploads (user-generated files)
│   ├── uploads/listings/            # Property listing images
│   ├── uploads/avatars/             # User profile pictures
│   ├── uploads/chat/                # Chat image attachments
│   ├── uploads/reports/             # Report attachments
│   └── uploads/.htaccess            # Blocks PHP execution in uploads folder
│
└── Database
    └── database/bashabari-database.sql   # Full schema + seed data
```

---

## Pages & Modules

### Home Page (`index.php`)

The landing page serves as the main entry point.

- **Hero section** — Full-viewport with aerial city background, central search bar, and two floating glassmorphism preview cards (listing preview + landlord review snippet) with gentle float animations
- **University scroll tags** — Two rows of university name pills scrolling in opposite directions (CSS marquee)
- **Why Choose BashaBari** — 6-feature grid (Verified Listings, Rent Filters, Campus Proximity, Roommate Matching, Landlord Reviews, Student Community)
- **Featured Listings** — 3–4 cards pulled from the database
- **Roommate Matching CTA** — Split layout with benefits list and visual mockup
- **Landlord Review Highlights** — 2–3 review cards with animated progress bars
- **Student Feedback Scroll** — Infinite horizontal scroll of student testimonials
- **CTA Banner** — Full-width gradient section with "Search Listings" and "List Your Flat" buttons

---

### Browse Listings (`browse-listings.php`)

Side-by-side layout with a collapsible filter sidebar and responsive listing card grid.

**Filters (all real-time, no page reload):**
- Keyword search (title, location)
- District dropdown (all 64 Bangladesh districts)
- Area/Location checkboxes (dynamically updates per district)
- University checkboxes (16 universities)
- Property type (Flat, Sublet, Single Room, Shared Flat, Mess, Bachelor Flat)
- Distance from campus (< 0.5km to 5km+)
- Rent range dual-handle slider (৳1,000 – ৳30,000)
- Amenities (WiFi, AC, Gas, Parking, Balcony, Generator, Female Only, and more)
- Reset Filters button

**Listing Cards include:**
Property image, price badge, title, district & area tags, campus distance, available from date, amenity tags (max 4 + overflow), posted time, favorites toggle, report button, and Verified badge.

**Listing Detail Modal:**
Swipeable image gallery, full property details, comments section, contact number (shown only to logged-in users if not hidden by poster), message and report buttons.

---

### Find Roommates (`find-roommates.php`)

Discover students looking for flatmates, filtered by compatibility.

**Filters:**
- Search by name, university, keyword
- University (multi-select), Gender, Budget range (৳2,000–৳15,000+), District, Preferred Areas, Lifestyle Tags

**Roommate Cards:** Avatar, name, university, gender badge. Budget, preferred location, move-in date, lifestyle tags, and description are hidden unless logged in.

**Connect Flow:** Requires the sender to have an active published Roommate Profile. Button changes to "Request Sent" after click and cannot be clicked again.

---

### Landlord Reviews (`landlord-reviews.php`)

A community-driven landlord accountability board.

- **Write a Review (left column)** — Landlord name, property address, interactive star rating, Yes/No recommendation toggle, review text. Only available to logged-in users.
- **Review Cards (right column)** — Landlord name, address, recommendation badge, star rating, student review snippets
- **Detail Modal** — All reviews under that landlord, overall calculated rating, reviewer names and dates
- **Filters:** Search by landlord name/address, filter by district, area, star rating

---

### About (`about.php`)

Platform story and community feedback channel.

- Mission and story sections
- How It Works — 4-step visual (Search → Filter → Connect → Move In)
- **Feedback Form** — Topic, star rating, description; only for logged-in users. Submitted to the admin dashboard.

---

### Student Dashboard (`student-dashboard.php`)

Single-page dashboard with sidebar navigation. Sections switch without page reload.

| Section | Description |
|---------|-------------|
| **Overview** | Welcome message, quick stats (listings, favorites, connections, unread messages), "Create New Listing" button, Roommate Profile visibility toggle |
| **My Listings** | Grid of own listings with Edit, Delete, and phone number visibility toggle. Status badges (Pending / Published / Rejected) |
| **Favorites** | Saved listings with quick navigation to listing detail |
| **Connections** | Accepted connections list with Message and Disconnect buttons |
| **Messages** | Left panel: conversation list. Right panel: real-time chat thread via PHP polling. Supports text and image messages. Single tick = sent, double tick = seen. |
| **Roommate Profile** | Form to set budget, preferred district/areas, move-in date, description, and lifestyle tags |
| **User Activity Log** | Stats and list of all comments and landlord reviews the user has submitted, with edit/delete |
| **Notifications** | Filterable notification list (All / Admin / Comments / Connections). Mark as read. |
| **Settings** | Edit name, phone, university; upload profile picture; change password |

**Create Listing — 3-step modal:**
1. Property details (title, type, district, area, university, rent, distance, description, amenities)
2. Image upload (up to 5–6 images with instant preview)
3. Preview (how the card will appear) → Post Listing (submitted as Pending for admin approval)

---

### Admin Dashboard (`admin-dashboard.php`)

Full platform management panel. Requires admin role.

| Section | Description |
|---------|-------------|
| **Overview** | 6 stat cards, 3 charts (bar/line/pie), recent activity feed |
| **User Management** | Searchable/filterable table with View Details, Ban/Unban, Verified Badge, Edit, Delete per user |
| **All Listings** | Approve, Reject, Verify, Edit, Delete with status badges and pending highlights |
| **Landlord Reviews** | Approve, Feature, Edit, Delete reviews; grouped by landlord |
| **Feedback Messages** | Student feedback from About page; toggle Featured (appears on homepage), Delete |
| **Reports from Users** | Filter by category/status; Mark Resolved, Reply (triggers notification), Delete |
| **Recent Activity** | Full chronological activity log with type filters |
| **Settings** | Site name, tagline, support email, social links, maintenance mode toggle, admin password change |

---

## Database Schema

The database uses 21 tables with full foreign key constraints, indexes, and InnoDB engine.

| Table | Purpose |
|-------|---------|
| `users` | Student and admin accounts |
| `universities` | 16 Bangladeshi universities |
| `districts` | All 64 Bangladesh districts |
| `areas` | Localities within districts |
| `listings` | Property listings |
| `listing_images` | Images per listing |
| `listing_amenities` | Amenities per listing |
| `favorites` | User-saved listings |
| `comments` | Comments on listings |
| `roommate_profiles` | Student roommate profiles |
| `roommate_preferred_areas` | Preferred areas per roommate profile |
| `roommate_tags` | Lifestyle tags per roommate profile |
| `connection_requests` | Roommate connection requests |
| `messages` | Chat messages between connected users |
| `landlord_reviews` | Landlord review entries |
| `landlord_profiles` | Aggregated landlord records |
| `feedback_messages` | About page feedback |
| `reports` | User reports |
| `notifications` | In-app notifications |
| `admin_settings` | Platform configuration |
| `activity_log` | All user and admin actions |

### Seed Data Included

- Admin user + 1 sample student (Rahim Ahmed, NSU)
- 16 universities (NSU, BRAC, AIUB, DU, BUET, IUT, DIU, ULAB, UIU, EWU, UAP, SUST, CUET, KUET, RUET, North Bengal University)
- All 64 Bangladesh districts
- Areas for major districts (Dhaka: 20 areas, Chittagong: 10, Sylhet: 7, Rajshahi: 5, Khulna: 5, Gazipur: 5)
- 5 sample listings (mix of pending, published, rejected statuses)
- 3 sample landlord reviews (2 approved, 1 pending)
- 2 sample feedback messages (1 featured)
- 2 sample notifications for the student user
- Default admin_settings row

---

## Security

| Concern | Implementation |
|---------|---------------|
| **Password Storage** | `password_hash()` with `PASSWORD_BCRYPT`; verified with `password_verify()`. Plain text never stored or logged. |
| **SQL Injection** | All queries use PDO prepared statements with bound parameters. No raw user input in SQL. |
| **XSS Prevention** | All PHP output wrapped in `htmlspecialchars()`. JSON responses safe via `json_encode()`. JS uses `textContent` over `innerHTML` where possible. |
| **CSRF Protection** | CSRF token generated per session, embedded as a meta tag in every PHP page, and sent in all AJAX POST headers. |
| **File Upload Security** | MIME type verified with `finfo_file()` (not just extension). Files renamed to random unique names via `uniqid()`. Max upload size: 5MB. |
| **Upload Folder** | `uploads/.htaccess` disables PHP execution (`php_flag engine off`) to prevent code injection via uploaded files. |
| **Session Management** | PHP sessions handle auth state. `requireLogin()` and `requireAdmin()` guards on all protected endpoints. |
| **Banned Users** | Banned accounts cannot log in. Checked on every login attempt. |

---

## Getting Started

### Requirements

- [XAMPP](https://www.apachefriends.org/) (or WAMP, or any Apache + PHP + MySQL stack)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- A modern web browser (Chrome, Firefox, Edge)

### Setup Steps

**1. Place project files in your web server root:**
```
# For XAMPP on Windows:
C:/xampp/htdocs/bashabari/

# For XAMPP on macOS:
/Applications/XAMPP/htdocs/bashabari/
```

**2. Start Apache and MySQL** in the XAMPP Control Panel.

**3. Create the database:**
- Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
- Click **New**, name it `bashabari`
- Set character set: `utf8mb4`, collation: `utf8mb4_unicode_ci`
- Click **Create**

**4. Import the database schema:**
- Click on the `bashabari` database in the left panel
- Go to the **Import** tab
- Click **Browse**, select `database/bashabari-database.sql`
- Click **Go**

**5. Configure the database connection:**

Open `config/db.php` and update if needed:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'bashabari');
define('DB_USER', 'root');
define('DB_PASS', '');       // Empty string for default XAMPP setup
```

**6. Create the uploads folders** (if they don't exist):
```
bashabari/uploads/listings/
bashabari/uploads/avatars/
bashabari/uploads/chat/
bashabari/uploads/reports/
```
Make sure these folders have **write permissions** for your web server.

**7. Open the project in your browser:**
```
http://localhost/bashabari/index.php
```

---

## Demo Credentials

These accounts are pre-seeded in the database for testing:

| Role | Email | Password | Redirects To |
|------|-------|----------|-------------|
| Admin | `admin@bashabari.com` | `Admin@1234` | `admin-dashboard.php` |
| Student | `student@northsouth.edu` | `User@1234` | `student-dashboard.php` |

> These credentials are also displayed in the Sign In modal for easy access during demos.

---

## API Reference

All API endpoints live under `api/` and return JSON. All POST endpoints are CSRF-protected.

### Authentication (`api/auth/`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `login.php` | POST | Authenticate user; returns role + session data |
| `register.php` | POST | Create new student account |
| `logout.php` | POST | Destroy session |
| `check-session.php` | GET | Returns current session user info |

### Listings (`api/listings/`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `get-listings.php` | GET | Fetch published listings with optional filters |
| `get-listing-detail.php` | GET | Single listing with images and amenities |
| `create-listing.php` | POST | Create listing (submitted as Pending) |
| `update-listing.php` | POST | Edit own listing |
| `delete-listing.php` | POST | Soft-delete own listing |
| `upload-image.php` | POST | Upload listing image |
| `toggle-phone.php` | POST | Show/hide contact number on listing |
| `get-my-listings.php` | GET | Current user's own listings |
| `approve-listing.php` | POST | *(Admin)* Approve a pending listing |
| `reject-listing.php` | POST | *(Admin)* Reject a listing |
| `give-verified-badge.php` | POST | *(Admin)* Mark listing as verified |

### Other Key Endpoints

| Category | Key Endpoints |
|----------|--------------|
| **Favorites** | `toggle-favorite.php`, `get-favorites.php` |
| **Comments** | `get-comments.php`, `add-comment.php`, `edit-comment.php`, `delete-comment.php` |
| **Roommates** | `get-roommates.php`, `save-profile.php`, `toggle-profile.php` |
| **Connections** | `send-request.php`, `respond-request.php`, `get-connections.php`, `disconnect.php` |
| **Messages** | `get-conversations.php`, `get-messages.php` *(polling)*, `send-message.php`, `mark-seen.php` |
| **Landlord Reviews** | `get-reviews.php`, `submit-review.php`, `admin-approve-review.php` |
| **Notifications** | `get-notifications.php`, `mark-read.php`, `mark-all-read.php` |
| **Users (Admin)** | `get-all-users.php`, `ban-user.php`, `give-badge.php`, `delete-user.php` |
| **Admin** | `get-stats.php`, `get-activity-log.php`, `get-settings.php`, `save-settings.php` |
| **Lookup** | `districts/get-districts.php`, `districts/get-areas.php`, `universities/get-universities.php` |

---

## Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#0A192F` | Navbar, footer, dark backgrounds |
| Secondary | `#87CEEB` | Accents, tags, gradients |
| Tertiary | `#98FF98` | Verified badges, success states |
| Neutral | `#F8FAFC` | Page backgrounds |
| Warning | `#F59E0B` | Pending states |
| Error | `#EF4444` | Rejection badges, report buttons |
| Success | `#10B981` | Approved, recommended badges |

### Typography

- **Headlines & Display:** Manrope (Google Fonts)
- **Body & Labels:** Inter (Google Fonts)

### UI Patterns

- Glassmorphism cards with backdrop blur and tinted box shadows
- Gradient text and buttons (Primary → Secondary, Secondary → Tertiary)
- Rounded corners: `16px–24px` for cards, `999px` for pills and tags
- All interactive elements have hover + active states
- Card hover: `translateY(-4px)` + shadow increase
- Scroll-triggered fade-in via Intersection Observer API
- CSS keyframe float animation on hero preview cards
- CSS marquee for university tags and feedback scroll
- Z-index layers: Navbar (100) → Modal overlay (200) → Modal (300) → Toast (400)
- 8px spacing grid throughout
- Loading skeleton animation on cards

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure all PHP code uses PDO prepared statements, follows the existing file structure, and does not modify any CSS files.

---

## License

This project is intended for educational and portfolio purposes. All Bangladeshi university names, district names, and geographic references used within the platform are factual and used solely for localization purposes.

---

<p align="center"><strong>বাসাবাড়ি — আপনার ক্যাম্পাসের কাছেই নিখুঁত বাড়ি খুঁজুন</strong></p>
<p align="center"><em>Find Your Perfect Home Near Campus</em></p>
