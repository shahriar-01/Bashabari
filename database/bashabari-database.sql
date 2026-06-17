DROP DATABASE IF EXISTS bashabari;
CREATE DATABASE bashabari
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE bashabari;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `activity_log`;
DROP TABLE IF EXISTS `admin_settings`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `reports`;
DROP TABLE IF EXISTS `feedback_messages`;
DROP TABLE IF EXISTS `landlord_profiles`;
DROP TABLE IF EXISTS `landlord_reviews`;
DROP TABLE IF EXISTS `messages`;
DROP TABLE IF EXISTS `connection_requests`;
DROP TABLE IF EXISTS `roommate_tags`;
DROP TABLE IF EXISTS `roommate_preferred_areas`;
DROP TABLE IF EXISTS `roommate_profiles`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `favorites`;
DROP TABLE IF EXISTS `listing_amenities`;
DROP TABLE IF EXISTS `listing_images`;
DROP TABLE IF EXISTS `listings`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `areas`;
DROP TABLE IF EXISTS `districts`;
DROP TABLE IF EXISTS `universities`;
SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE universities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  short_name VARCHAR(20) NOT NULL,
  district VARCHAR(100),
  address TEXT,
  UNIQUE KEY uq_universities_short_name (short_name),
  KEY idx_universities_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE districts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  UNIQUE KEY uq_districts_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE areas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  district_id INT NOT NULL,
  UNIQUE KEY uq_area_district (district_id, name),
  KEY idx_areas_district (district_id),
  CONSTRAINT fk_areas_district FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  phone VARCHAR(20),
  gender ENUM('male','female','other'),
  email VARCHAR(200) NOT NULL UNIQUE,
  university_id INT NULL,
  student_id VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) DEFAULT NULL,
  is_verified TINYINT(1) DEFAULT 0,
  is_banned TINYINT(1) DEFAULT 0,
  role ENUM('admin','student') DEFAULT 'student',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_users_email (email),
  KEY idx_users_university (university_id),
  KEY idx_users_role (role),
  CONSTRAINT fk_users_university FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(300) NOT NULL,
  district_id INT NULL,
  area_id INT NULL,
  university_id INT NULL,
  rent_price DECIMAL(10,2) NOT NULL,
  property_type ENUM('flat','sublet','single_room','shared_flat','mess','bachelor_flat'),
  distance_value DECIMAL(5,2),
  distance_unit ENUM('walking','bus','cycle','bike','car','metro'),
  available_from DATE,
  description TEXT,
  phone_hidden TINYINT(1) DEFAULT 0,
  status ENUM('pending','published','rejected','deleted') DEFAULT 'pending',
  is_verified TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_listings_status (status),
  KEY idx_listings_district (district_id),
  KEY idx_listings_area (area_id),
  KEY idx_listings_university (university_id),
  KEY idx_listings_user (user_id),
  CONSTRAINT fk_listings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_listings_district FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE SET NULL,
  CONSTRAINT fk_listings_area FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE SET NULL,
  CONSTRAINT fk_listings_university FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE listing_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  image_path VARCHAR(300) NOT NULL,
  sort_order INT DEFAULT 0,
  KEY idx_listing_images_listing (listing_id),
  CONSTRAINT fk_listing_images_listing FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE listing_amenities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  amenity_name VARCHAR(100) NOT NULL,
  KEY idx_listing_amenities_listing (listing_id),
  CONSTRAINT fk_listing_amenities_listing FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  listing_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_favorite_user_listing (user_id, listing_id),
  KEY idx_favorites_listing (listing_id),
  CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_favorites_listing FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  listing_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_comments_listing (listing_id),
  KEY idx_comments_user (user_id),
  CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_comments_listing FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE roommate_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  budget_min INT,
  budget_max INT,
  district_id INT NULL,
  move_in_month TINYINT,
  move_in_year SMALLINT,
  description TEXT,
  is_published TINYINT(1) DEFAULT 0,
  profile_visible TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_roommate_profiles_district (district_id),
  KEY idx_roommate_profiles_published (is_published, profile_visible),
  CONSTRAINT fk_roommate_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_roommate_profiles_district FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE roommate_preferred_areas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roommate_profile_id INT NOT NULL,
  area_id INT NOT NULL,
  UNIQUE KEY uq_roommate_area (roommate_profile_id, area_id),
  KEY idx_roommate_pref_area (area_id),
  CONSTRAINT fk_roommate_pref_profile FOREIGN KEY (roommate_profile_id) REFERENCES roommate_profiles(id) ON DELETE CASCADE,
  CONSTRAINT fk_roommate_pref_area FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE roommate_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roommate_profile_id INT NOT NULL,
  tag_name VARCHAR(100) NOT NULL,
  KEY idx_roommate_tags_profile (roommate_profile_id),
  KEY idx_roommate_tags_name (tag_name),
  CONSTRAINT fk_roommate_tags_profile FOREIGN KEY (roommate_profile_id) REFERENCES roommate_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE connection_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  status ENUM('pending','accepted','declined') DEFAULT 'pending',
  source ENUM('listing','roommate') DEFAULT 'roommate',
  listing_id INT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_connection_sender_receiver (sender_id, receiver_id),
  KEY idx_connections_sender (sender_id),
  KEY idx_connections_receiver (receiver_id),
  KEY idx_connections_status (status),
  KEY idx_connections_listing (listing_id),
  CONSTRAINT fk_connections_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_connections_receiver FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_connections_listing FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  connection_id INT NOT NULL,
  sender_id INT NOT NULL,
  message_text TEXT DEFAULT NULL,
  image_path VARCHAR(300) DEFAULT NULL,
  is_seen TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_messages_connection_created (connection_id, created_at),
  KEY idx_messages_connection_id (connection_id, id),
  KEY idx_messages_sender (sender_id),
  CONSTRAINT fk_messages_connection FOREIGN KEY (connection_id) REFERENCES connection_requests(id) ON DELETE CASCADE,
  CONSTRAINT fk_messages_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE landlord_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  landlord_name VARCHAR(200) NOT NULL,
  property_address TEXT NOT NULL,
  district_id INT NULL,
  star_rating TINYINT NOT NULL,
  is_recommended TINYINT(1) DEFAULT 0,
  review_text TEXT,
  is_approved TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_landlord_reviews_user (user_id),
  KEY idx_landlord_reviews_district (district_id),
  KEY idx_landlord_reviews_approved (is_approved),
  CONSTRAINT chk_landlord_reviews_star CHECK (star_rating BETWEEN 1 AND 5),
  CONSTRAINT fk_landlord_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_landlord_reviews_district FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE landlord_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  landlord_name VARCHAR(200) NOT NULL,
  district_id INT NULL,
  overall_rating DECIMAL(3,2) DEFAULT 0.00,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_landlord_profile (landlord_name, district_id),
  KEY idx_landlord_profiles_district (district_id),
  CONSTRAINT fk_landlord_profiles_district FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE feedback_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  topic VARCHAR(300) NOT NULL,
  star_rating TINYINT,
  description TEXT,
  is_featured TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_feedback_user (user_id),
  KEY idx_feedback_featured (is_featured),
  CONSTRAINT fk_feedback_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reported_by_user_id INT NULL,
  category ENUM('listings','roommate','technical_issue','comment','user') NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  image_path VARCHAR(300) DEFAULT NULL,
  reference_id INT DEFAULT NULL,
  status ENUM('new','in_review','resolved') DEFAULT 'new',
  admin_reply TEXT DEFAULT NULL,
  replied_at DATETIME DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_reports_user (reported_by_user_id),
  KEY idx_reports_status (status),
  KEY idx_reports_category (category),
  CONSTRAINT fk_reports_user FOREIGN KEY (reported_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('admin','comment','connection','report_reply','system') NOT NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) DEFAULT 0,
  reference_id INT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_notifications_user_read (user_id, is_read),
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admin_settings (
  id INT NOT NULL DEFAULT 1 PRIMARY KEY,
  site_name VARCHAR(200) DEFAULT 'BashaBari',
  tagline VARCHAR(300) DEFAULT 'Find Your Perfect Home Near Campus',
  support_email VARCHAR(200) DEFAULT 'support@bashabari.com',
  social_facebook VARCHAR(300) DEFAULT NULL,
  social_instagram VARCHAR(300) DEFAULT NULL,
  social_twitter VARCHAR(300) DEFAULT NULL,
  maintenance_mode TINYINT(1) DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  action_type VARCHAR(100) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_activity_created (created_at),
  KEY idx_activity_user (user_id),
  KEY idx_activity_type (action_type),
  CONSTRAINT fk_activity_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO universities (name, short_name, district, address) VALUES
  ('North South University', 'NSU', 'Dhaka', 'Bashundhara R/A, Dhaka'),
  ('BRAC University', 'BRAC', 'Dhaka', 'Merul Badda, Dhaka'),
  ('American International University-Bangladesh', 'AIUB', 'Dhaka', 'Kuratoli, Dhaka'),
  ('University of Dhaka', 'DU', 'Dhaka', 'Shahbagh, Dhaka'),
  ('Bangladesh University of Engineering and Technology', 'BUET', 'Dhaka', 'Palashi, Dhaka'),
  ('Islamic University of Technology', 'IUT', 'Gazipur', 'Board Bazar, Gazipur'),
  ('Daffodil International University', 'DIU', 'Dhaka', 'Daffodil Smart City, Ashulia'),
  ('University of Liberal Arts Bangladesh', 'ULAB', 'Dhaka', 'Mohammadpur, Dhaka'),
  ('United International University', 'UIU', 'Dhaka', 'Madani Avenue, Dhaka'),
  ('East West University', 'EWU', 'Dhaka', 'Aftabnagar, Dhaka'),
  ('University of Asia Pacific', 'UAP', 'Dhaka', 'Farmgate, Dhaka'),
  ('Shahjalal University of Science and Technology', 'SUST', 'Sylhet', 'Kumargaon, Sylhet'),
  ('Chittagong University of Engineering and Technology', 'CUET', 'Chittagong', 'Raozan, Chittagong'),
  ('Khulna University of Engineering and Technology', 'KUET', 'Khulna', 'Fulbarigate, Khulna'),
  ('Rajshahi University of Engineering and Technology', 'RUET', 'Rajshahi', 'Kazla, Rajshahi'),
  ('North Bengal University', 'NBU', 'Rajshahi', 'Rajshahi, Bangladesh'),
  ('Military Institute of Science and Technology', 'MIST', 'Dhaka', 'Mirpur Cantonment, Dhaka');

INSERT INTO districts (name) VALUES
  ('Bagerhat'),
  ('Bandarban'),
  ('Barguna'),
  ('Barishal'),
  ('Bhola'),
  ('Bogura'),
  ('Brahmanbaria'),
  ('Chandpur'),
  ('Chapai Nawabganj'),
  ('Chittagong'),
  ('Chuadanga'),
  ('Cox''s Bazar'),
  ('Cumilla'),
  ('Dhaka'),
  ('Dinajpur'),
  ('Faridpur'),
  ('Feni'),
  ('Gaibandha'),
  ('Gazipur'),
  ('Gopalganj'),
  ('Habiganj'),
  ('Jamalpur'),
  ('Jashore'),
  ('Jhalokati'),
  ('Jhenaidah'),
  ('Joypurhat'),
  ('Khagrachhari'),
  ('Khulna'),
  ('Kishoreganj'),
  ('Kurigram'),
  ('Kushtia'),
  ('Lakshmipur'),
  ('Lalmonirhat'),
  ('Madaripur'),
  ('Magura'),
  ('Manikganj'),
  ('Meherpur'),
  ('Moulvibazar'),
  ('Munshiganj'),
  ('Mymensingh'),
  ('Naogaon'),
  ('Narail'),
  ('Narayanganj'),
  ('Narsingdi'),
  ('Natore'),
  ('Netrokona'),
  ('Nilphamari'),
  ('Noakhali'),
  ('Pabna'),
  ('Panchagarh'),
  ('Patuakhali'),
  ('Pirojpur'),
  ('Rajbari'),
  ('Rajshahi'),
  ('Rangamati'),
  ('Rangpur'),
  ('Satkhira'),
  ('Shariatpur'),
  ('Sherpur'),
  ('Sirajganj'),
  ('Sunamganj'),
  ('Sylhet'),
  ('Tangail'),
  ('Thakurgaon');

INSERT INTO areas (name, district_id) VALUES
  ('Mirpur', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Uttara', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Badda', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Dhanmondi', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Mohammadpur', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Gulshan', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Banani', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Rayer Bazar', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Shyamoli', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Kalabagan', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Farmgate', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Tejgaon', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Bashundhara', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Demra', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Motijheel', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Old Dhaka', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Jatrabari', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Khilgaon', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Rampura', (SELECT id FROM districts WHERE name='Dhaka')),
  ('Malibagh', (SELECT id FROM districts WHERE name='Dhaka'));

INSERT INTO areas (name, district_id) VALUES
  ('Agrabad', (SELECT id FROM districts WHERE name='Chittagong')),
  ('Nasirabad', (SELECT id FROM districts WHERE name='Chittagong')),
  ('Halishahar', (SELECT id FROM districts WHERE name='Chittagong')),
  ('Khulshi', (SELECT id FROM districts WHERE name='Chittagong')),
  ('Panchlaish', (SELECT id FROM districts WHERE name='Chittagong')),
  ('Muradpur', (SELECT id FROM districts WHERE name='Chittagong')),
  ('GEC Circle', (SELECT id FROM districts WHERE name='Chittagong')),
  ('Oxygen', (SELECT id FROM districts WHERE name='Chittagong')),
  ('Bayazid', (SELECT id FROM districts WHERE name='Chittagong')),
  ('Pahartali', (SELECT id FROM districts WHERE name='Chittagong'));

INSERT INTO areas (name, district_id) VALUES
  ('Zindabazar', (SELECT id FROM districts WHERE name='Sylhet')),
  ('Ambarkhana', (SELECT id FROM districts WHERE name='Sylhet')),
  ('Shibganj', (SELECT id FROM districts WHERE name='Sylhet')),
  ('Shahi Eidgah', (SELECT id FROM districts WHERE name='Sylhet')),
  ('Tilagarh', (SELECT id FROM districts WHERE name='Sylhet')),
  ('Akhalia', (SELECT id FROM districts WHERE name='Sylhet')),
  ('Shahjalal Uposhohor', (SELECT id FROM districts WHERE name='Sylhet'));

INSERT INTO areas (name, district_id) VALUES
  ('Shaheb Bazar', (SELECT id FROM districts WHERE name='Rajshahi')),
  ('Uposhohor', (SELECT id FROM districts WHERE name='Rajshahi')),
  ('Padma Residential', (SELECT id FROM districts WHERE name='Rajshahi')),
  ('Boalia', (SELECT id FROM districts WHERE name='Rajshahi')),
  ('Rajpara', (SELECT id FROM districts WHERE name='Rajshahi'));

INSERT INTO areas (name, district_id) VALUES
  ('Sonadanga', (SELECT id FROM districts WHERE name='Khulna')),
  ('Boyra', (SELECT id FROM districts WHERE name='Khulna')),
  ('Daulatpur', (SELECT id FROM districts WHERE name='Khulna')),
  ('Khan Jahan Ali', (SELECT id FROM districts WHERE name='Khulna')),
  ('Khalishpur', (SELECT id FROM districts WHERE name='Khulna'));

INSERT INTO areas (name, district_id) VALUES
  ('Tongi', (SELECT id FROM districts WHERE name='Gazipur')),
  ('Joydebpur', (SELECT id FROM districts WHERE name='Gazipur')),
  ('Board Bazar', (SELECT id FROM districts WHERE name='Gazipur')),
  ('Chandana', (SELECT id FROM districts WHERE name='Gazipur')),
  ('Kaliakoir', (SELECT id FROM districts WHERE name='Gazipur'));


INSERT INTO users (id, full_name, phone, gender, email, university_id, student_id, password_hash, is_verified, role) VALUES
  (1, 'Admin User', '01700000000', 'other', 'admin@bashabari.com', NULL, 'ADMIN-001', '$2b$10$7jyTG3NtflXNCXB16/JOReuyzmXEl6ENEyb2yDHLuni3ZW/ep740e', 1, 'admin'),
  (2, 'Rahim Ahmed', '01711000001', 'male', 'student@northsouth.edu', (SELECT id FROM universities WHERE short_name='NSU'), 'NSU-2021-0042', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student'),
  (3, 'Fatima Khanam', '01711000002', 'female', 'fatima@bracu.ac.bd', (SELECT id FROM universities WHERE short_name='BRAC'), 'BRACU-2022-0356', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student'),
  (4, 'Sifat Hossain', '01711000003', 'male', 'sifat@northsouth.edu', (SELECT id FROM universities WHERE short_name='NSU'), 'NSU-2022-0101', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student'),
  (5, 'Nadia Islam', '01711000004', 'female', 'nadia@du.ac.bd', (SELECT id FROM universities WHERE short_name='DU'), 'DU-2020-1234', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 0, 'student');

INSERT INTO listings (id, user_id, title, district_id, area_id, university_id, rent_price, property_type, distance_value, distance_unit, available_from, description, phone_hidden, status, is_verified, created_at) VALUES
  (1, 2, 'Single Room Near NSU', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Bashundhara' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='NSU'), 8500.00, 'single_room', 0.50, 'walking', '2026-07-01', 'A bright single room in a secure student-friendly building near North South University. Includes WiFi, balcony access and attached bath.', 0, 'published', 1, DATE_SUB(NOW(), INTERVAL 2 DAY)),
  (2, 3, 'Full Furnished Flat Near BRACU', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Badda' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='BRAC'), 15000.00, 'flat', 0.80, 'walking', '2026-08-01', 'Fully furnished two-bedroom flat with security, lift, parking and quick campus access.', 0, 'published', 1, DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (3, 2, 'Shared Flat Near UIU', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Badda' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='UIU'), 6500.00, 'shared_flat', 0.30, 'walking', '2026-09-01', 'Affordable shared flat suitable for students looking for a quiet study environment.', 1, 'pending', 0, DATE_SUB(NOW(), INTERVAL 6 HOUR)),
  (4, 4, 'Budget Mess Near NSU', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Bashundhara' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='NSU'), 4500.00, 'mess', 1.00, 'bus', '2026-07-15', 'Mess accommodation with meals included. Needs improved documentation.', 0, 'rejected', 0, DATE_SUB(NOW(), INTERVAL 5 DAY)),
  (5, 5, 'Deleted Demo Listing', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Mirpur' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='MIST'), 7000.00, 'sublet', 1.50, 'bus', '2026-08-10', 'This soft-deleted listing is included to demonstrate deleted status handling.', 0, 'deleted', 0, DATE_SUB(NOW(), INTERVAL 10 DAY));

INSERT INTO listing_images (listing_id, image_path, sort_order) VALUES
  (1, 'uploads/listings/Single room best.jpg', 0),
  (1, 'uploads/listings/full flat pt 1.jpg', 1),
  (2, 'uploads/listings/full furnished flat.jpeg', 0),
  (3, 'uploads/listings/Shared room with attach bathroom.jpeg', 0),
  (4, 'uploads/listings/sample-mess.jpg', 0),
  (5, 'uploads/listings/sample-deleted.jpg', 0);

INSERT INTO listing_amenities (listing_id, amenity_name) VALUES
  (1, 'WiFi'), (1, 'Balcony'), (1, 'Attached Bath'), (1, 'Security'),
  (2, 'WiFi'), (2, 'Security'), (2, 'Parking'), (2, 'Lift'),
  (3, 'WiFi'), (3, 'Security'), (3, 'Generator'),
  (4, 'Mess Food'), (4, 'WiFi'), (4, 'Gas'),
  (5, 'WiFi'), (5, 'Balcony');

INSERT INTO favorites (user_id, listing_id) VALUES (2, 1), (2, 2);

INSERT INTO comments (user_id, listing_id, comment_text, created_at) VALUES
  (3, 1, 'Is the room still available for July?', DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (2, 2, 'This area is very convenient for BRACU students.', DATE_SUB(NOW(), INTERVAL 12 HOUR));

INSERT INTO roommate_profiles (id, user_id, budget_min, budget_max, district_id, move_in_month, move_in_year, description, is_published, profile_visible) VALUES
  (1, 3, 5000, 9000, (SELECT id FROM districts WHERE name='Dhaka'), 8, 2026, 'Clean and friendly BRACU student looking for a respectful roommate near Badda or Bashundhara.', 1, 1),
  (2, 4, 4000, 7000, (SELECT id FROM districts WHERE name='Dhaka'), 7, 2026, 'NSU student, early bird, non-smoker, prefers a calm study-friendly space.', 1, 1),
  (3, 2, 5000, 8000, (SELECT id FROM districts WHERE name='Dhaka'), 7, 2026, 'Looking for clean, responsible housemates near campus.', 1, 1);

INSERT INTO roommate_preferred_areas (roommate_profile_id, area_id) VALUES
  (1, (SELECT id FROM areas WHERE name='Badda' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (1, (SELECT id FROM areas WHERE name='Bashundhara' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (2, (SELECT id FROM areas WHERE name='Bashundhara' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (2, (SELECT id FROM areas WHERE name='Uttara' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (3, (SELECT id FROM areas WHERE name='Bashundhara' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')));

INSERT INTO roommate_tags (roommate_profile_id, tag_name) VALUES
  (1, 'Clean'), (1, 'Friendly'), (1, 'Non-Smoker'),
  (2, 'Early Bird'), (2, 'Studious'), (2, 'Clean'),
  (3, 'Night Owl'), (3, 'Friendly'), (3, 'Flexible');

INSERT INTO connection_requests (id, sender_id, receiver_id, status, source, listing_id, created_at) VALUES
  (1, 2, 3, 'accepted', 'roommate', NULL, DATE_SUB(NOW(), INTERVAL 2 DAY)),
  (2, 4, 2, 'pending', 'roommate', NULL, DATE_SUB(NOW(), INTERVAL 4 HOUR)),
  (3, 2, 5, 'accepted', 'listing', 2, DATE_SUB(NOW(), INTERVAL 1 DAY));

INSERT INTO messages (connection_id, sender_id, message_text, is_seen, created_at) VALUES
  (1, 2, 'Hi Fatima, are you still looking for a roommate?', 1, DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (1, 3, 'Yes, I am. I prefer Badda or Bashundhara.', 1, DATE_SUB(NOW(), INTERVAL 23 HOUR)),
  (1, 2, 'Great, let us discuss budget and move-in date.', 0, DATE_SUB(NOW(), INTERVAL 20 HOUR)),
  (3, 2, 'Hello, I am interested in the BRACU flat listing.', 1, DATE_SUB(NOW(), INTERVAL 16 HOUR)),
  (3, 5, 'Sure, I can share more details.', 0, DATE_SUB(NOW(), INTERVAL 15 HOUR));

INSERT INTO landlord_reviews (user_id, landlord_name, property_address, district_id, star_rating, is_recommended, review_text, is_approved, created_at) VALUES
  (2, 'Mr. Zaman Kabir', 'Bashundhara C-34, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 5, 1, 'Excellent landlord. Very responsive and maintains the property well.', 1, DATE_SUB(NOW(), INTERVAL 8 DAY)),
  (3, 'Mrs. Salma Begum', 'Mohakhali Enclave, Block B, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 4, 1, 'Good landlord with fair policies and safe building management.', 1, DATE_SUB(NOW(), INTERVAL 7 DAY)),
  (2, 'Engr. Arif Hasan', 'Dhanmondi Student Loft, Road 27', (SELECT id FROM districts WHERE name='Dhaka'), 4, 1, 'Professional and fair. Pending admin approval.', 0, DATE_SUB(NOW(), INTERVAL 1 DAY));

INSERT INTO landlord_profiles (landlord_name, district_id, overall_rating) VALUES
  ('Mr. Zaman Kabir', (SELECT id FROM districts WHERE name='Dhaka'), 5.00),
  ('Mrs. Salma Begum', (SELECT id FROM districts WHERE name='Dhaka'), 4.00),
  ('Engr. Arif Hasan', (SELECT id FROM districts WHERE name='Dhaka'), 0.00);

INSERT INTO feedback_messages (user_id, topic, star_rating, description, is_featured, created_at) VALUES
  (2, 'Great Platform!', 5, 'BashaBari is exactly what students needed. The landlord reviews feature is very helpful.', 1, DATE_SUB(NOW(), INTERVAL 3 DAY)),
  (3, 'Suggestion: Map View', 4, 'Would love to have a map view for listings. The filter system is excellent.', 0, DATE_SUB(NOW(), INTERVAL 2 DAY));

INSERT INTO reports (reported_by_user_id, category, title, description, reference_id, status, created_at) VALUES
  (2, 'listings', 'Suspicious listing photo', 'The listing photo seems copied from another website.', 4, 'new', DATE_SUB(NOW(), INTERVAL 5 HOUR)),
  (3, 'technical_issue', 'Filter issue on mobile', 'The district filter occasionally resets on mobile browser.', NULL, 'in_review', DATE_SUB(NOW(), INTERVAL 2 DAY));

INSERT INTO notifications (user_id, type, message, is_read, reference_id, created_at) VALUES
  (2, 'system', 'Welcome to BashaBari! Complete your profile to get better matches.', 0, NULL, DATE_SUB(NOW(), INTERVAL 4 DAY)),
  (2, 'connection', 'Sifat Hossain sent you a connection request.', 0, 2, DATE_SUB(NOW(), INTERVAL 4 HOUR)),
  (2, 'admin', 'Your listing Single Room Near NSU has been approved.', 1, 1, DATE_SUB(NOW(), INTERVAL 1 DAY));

INSERT INTO admin_settings (id, site_name, tagline, support_email, maintenance_mode) VALUES
  (1, 'BashaBari', 'Find Your Perfect Home Near Campus', 'support@bashabari.com', 0);

INSERT INTO activity_log (user_id, action_type, description, created_at) VALUES
  (2, 'register', 'Rahim Ahmed registered a student account', DATE_SUB(NOW(), INTERVAL 10 DAY)),
  (2, 'create_listing', 'Single Room Near NSU submitted', DATE_SUB(NOW(), INTERVAL 2 DAY)),
  (1, 'approve_listing', 'Admin approved listing #1', DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (3, 'connection_request', 'Fatima connected with Rahim', DATE_SUB(NOW(), INTERVAL 2 DAY)),
  (2, 'submit_review', 'Rahim submitted a landlord review', DATE_SUB(NOW(), INTERVAL 8 DAY));


INSERT INTO users (id, full_name, phone, gender, email, university_id, student_id, password_hash, is_verified, role, created_at) VALUES
  (6, 'Tanvir Ahmed', '01711000006', 'male', 'tanvir@uiu.ac.bd', (SELECT id FROM universities WHERE short_name='UIU'), 'UIU-2022-0789', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student', '2025-07-15 10:00:00'),
  (7, 'Sadia Rahman', '01711000007', 'female', 'sadia@ewu.edu.bd', (SELECT id FROM universities WHERE short_name='EWU'), 'EWU-2023-0456', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student', '2025-08-12 11:00:00'),
  (8, 'Arif Hossain', '01711000008', 'male', 'arif@sust.edu', (SELECT id FROM universities WHERE short_name='SUST'), 'SUST-2021-0321', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 0, 'student', '2025-09-09 09:30:00'),
  (9, 'Mitu Akter', '01711000009', 'female', 'mitu@diu.edu.bd', (SELECT id FROM universities WHERE short_name='DIU'), 'DIU-2022-0654', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 0, 'student', '2025-10-18 14:20:00'),
  (10, 'Rahat Hossain', '01711000010', 'male', 'rahat@bracu.ac.bd', (SELECT id FROM universities WHERE short_name='BRAC'), 'BRACU-2021-0101', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student', '2025-11-05 08:15:00'),
  (11, 'Nusrat Jahan', '01711000011', 'female', 'nusrat@du.ac.bd', (SELECT id FROM universities WHERE short_name='DU'), 'DU-2021-0888', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student', '2025-12-03 16:45:00'),
  (12, 'Mahfuz Alam', '01711000012', 'male', 'mahfuz@aiub.edu', (SELECT id FROM universities WHERE short_name='AIUB'), 'AIUB-2023-0091', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 0, 'student', '2026-01-10 12:00:00'),
  (13, 'Fariha Chowdhury', '01711000013', 'female', 'fariha@ulab.edu.bd', (SELECT id FROM universities WHERE short_name='ULAB'), 'ULAB-2022-0404', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student', '2026-02-14 10:40:00'),
  (14, 'Imran Hossain', '01711000014', 'male', 'imran@buet.ac.bd', (SELECT id FROM universities WHERE short_name='BUET'), 'BUET-2020-0303', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student', '2026-03-20 09:10:00'),
  (15, 'Disha Rahman', '01711000015', 'female', 'disha@uap-bd.edu', (SELECT id FROM universities WHERE short_name='UAP'), 'UAP-2024-0077', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 0, 'student', '2026-04-06 13:25:00');

INSERT INTO listings (id, user_id, title, district_id, area_id, university_id, rent_price, property_type, distance_value, distance_unit, available_from, description, phone_hidden, status, is_verified, created_at) VALUES
  (6, 6, 'Shared Flat Beside UIU', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Badda' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='UIU'), 7200.00, 'shared_flat', 0.40, 'walking', '2026-07-10', 'Shared flat with generator backup, secure entrance and a quiet study corner near UIU.', 0, 'published', 1, '2026-01-12 10:00:00'),
  (7, 7, 'Sublet Near EWU Aftabnagar', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Rampura' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='EWU'), 5800.00, 'sublet', 0.90, 'bus', '2026-08-01', 'Affordable sublet room with WiFi and gas near East West University.', 0, 'published', 0, '2026-02-03 12:00:00'),
  (8, 8, 'SUST Area Student Mess', (SELECT id FROM districts WHERE name='Sylhet'), (SELECT id FROM areas WHERE name='Tilagarh' AND district_id=(SELECT id FROM districts WHERE name='Sylhet')), (SELECT id FROM universities WHERE short_name='SUST'), 4200.00, 'mess', 0.70, 'walking', '2026-07-20', 'Budget mess with meals, WiFi and friendly student environment near SUST.', 0, 'published', 1, '2026-02-20 09:30:00'),
  (9, 9, 'DIU Student Bachelor Flat', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Mirpur' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='DIU'), 11000.00, 'bachelor_flat', 1.20, 'bus', '2026-09-01', 'Bachelor flat suitable for 3 DIU students with lift, parking and security.', 0, 'published', 0, '2026-03-08 15:00:00'),
  (10, 10, 'BRACU Quiet Single Room', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Badda' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='BRAC'), 9000.00, 'single_room', 0.60, 'walking', '2026-07-05', 'Quiet single room for a serious student, close to BRAC University.', 1, 'published', 1, '2026-03-18 11:45:00'),
  (11, 11, 'Female Sublet Dhanmondi DU', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Dhanmondi' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='DU'), 7800.00, 'sublet', 1.10, 'bus', '2026-08-15', 'Female-only sublet with attached bath, laundry and safe neighborhood for DU students.', 0, 'published', 1, '2026-04-02 16:00:00'),
  (12, 12, 'AIUB Studio Near Kuratoli', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Bashundhara' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='AIUB'), 12000.00, 'flat', 0.50, 'walking', '2026-09-10', 'Compact studio style flat with AC, rooftop and security near AIUB.', 0, 'pending', 0, '2026-05-01 10:00:00'),
  (13, 13, 'ULAB Mohammadpur Room', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Mohammadpur' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='ULAB'), 6800.00, 'single_room', 0.80, 'cycle', '2026-07-25', 'Single room in Mohammadpur with WiFi and balcony near ULAB.', 0, 'published', 0, '2026-05-06 14:30:00'),
  (14, 14, 'BUET Palashi Mess Seat', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Old Dhaka' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='BUET'), 5000.00, 'mess', 0.40, 'walking', '2026-08-05', 'Mess seat with food and study room near BUET campus.', 0, 'rejected', 0, '2026-05-08 09:20:00'),
  (15, 15, 'UAP Farmgate Shared Room', (SELECT id FROM districts WHERE name='Dhaka'), (SELECT id FROM areas WHERE name='Farmgate' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')), (SELECT id FROM universities WHERE short_name='UAP'), 6200.00, 'shared_flat', 0.30, 'walking', '2026-08-20', 'Shared room in Farmgate with lift and security, ideal for UAP students.', 0, 'published', 1, '2026-05-12 18:00:00');

INSERT INTO listing_images (listing_id, image_path, sort_order) VALUES
  (6, 'uploads/listings/uiu-shared.jpeg', 0), (7, 'uploads/listings/Single room 04.jpeg', 0),
  (8, 'uploads/listings/student mess.jpg', 0), (9, 'uploads/listings/Single room 02.jpg', 0),
  (10, 'uploads/listings/Single room with attach bathroom.jpg', 0), (11, 'uploads/listings/Shared room with attach bathroom.jpeg', 0),
  (12, 'uploads/listings/studio-aiub.png', 0), (13, 'uploads/listings/Single room with attach bath 02.jpeg', 0),
  (14, 'uploads/listings/buet-mess.jpg', 0), (15, 'uploads/listings/full flat pt 3.jpg', 0);

INSERT INTO listing_amenities (listing_id, amenity_name) VALUES
  (6,'WiFi'),(6,'Generator'),(6,'Security'),(7,'WiFi'),(7,'Gas'),(7,'Balcony'),
  (8,'Mess Food'),(8,'WiFi'),(8,'Security'),(9,'Lift'),(9,'Parking'),(9,'Security'),
  (10,'WiFi'),(10,'Attached Bath'),(10,'Security'),(11,'Female Only'),(11,'Laundry'),(11,'Attached Bath'),
  (12,'AC'),(12,'Rooftop'),(12,'Security'),(13,'WiFi'),(13,'Balcony'),(13,'Gas'),
  (14,'Mess Food'),(14,'WiFi'),(14,'Gas'),(15,'Lift'),(15,'Security'),(15,'WiFi');

INSERT INTO favorites (user_id, listing_id) VALUES (2, 6), (2, 10), (3, 11), (6, 1), (7, 8);

INSERT INTO roommate_profiles (id, user_id, budget_min, budget_max, district_id, move_in_month, move_in_year, description, is_published, profile_visible) VALUES
  (4, 6, 5000, 8000, (SELECT id FROM districts WHERE name='Dhaka'), 8, 2026, 'UIU student looking for clean and social roommates near Badda.', 1, 1),
  (5, 7, 4500, 7500, (SELECT id FROM districts WHERE name='Dhaka'), 7, 2026, 'EWU pharmacy student, pet friendly, early riser and organized.', 1, 1),
  (6, 8, 3000, 5500, (SELECT id FROM districts WHERE name='Sylhet'), 9, 2026, 'SUST student searching for a peaceful and budget-friendly shared flat.', 1, 1),
  (7, 9, 6000, 10000, (SELECT id FROM districts WHERE name='Dhaka'), 10, 2026, 'DIU student, gamer, night owl, looking around Mirpur or Mohammadpur.', 1, 1),
  (8, 10, 5500, 8500, (SELECT id FROM districts WHERE name='Dhaka'), 8, 2026, 'BRACU CSE student, quiet and clean, prefers Badda.', 1, 1),
  (9, 11, 5000, 9000, (SELECT id FROM districts WHERE name='Dhaka'), 7, 2026, 'DU student, female roommate preferred, quiet and studious.', 1, 1),
  (10, 12, 7000, 12000, (SELECT id FROM districts WHERE name='Dhaka'), 9, 2026, 'AIUB student looking for a modern shared flat near Bashundhara.', 1, 1),
  (11, 13, 5000, 8500, (SELECT id FROM districts WHERE name='Dhaka'), 8, 2026, 'ULAB student, friendly and flexible, prefers Mohammadpur.', 1, 1);

INSERT INTO roommate_preferred_areas (roommate_profile_id, area_id) VALUES
  (4,(SELECT id FROM areas WHERE name='Badda' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (5,(SELECT id FROM areas WHERE name='Rampura' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (6,(SELECT id FROM areas WHERE name='Tilagarh' AND district_id=(SELECT id FROM districts WHERE name='Sylhet'))),
  (7,(SELECT id FROM areas WHERE name='Mirpur' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (8,(SELECT id FROM areas WHERE name='Badda' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (9,(SELECT id FROM areas WHERE name='Dhanmondi' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (10,(SELECT id FROM areas WHERE name='Bashundhara' AND district_id=(SELECT id FROM districts WHERE name='Dhaka'))),
  (11,(SELECT id FROM areas WHERE name='Mohammadpur' AND district_id=(SELECT id FROM districts WHERE name='Dhaka')));

INSERT INTO roommate_tags (roommate_profile_id, tag_name) VALUES
  (4,'Clean'),(4,'Social'),(4,'Friendly'),(5,'Pet Friendly'),(5,'Early Bird'),(5,'Clean'),
  (6,'Peace Lover'),(6,'Studious'),(6,'Non-Smoker'),(7,'Gamer'),(7,'Night Owl'),(7,'Friendly'),
  (8,'Clean'),(8,'Non-Smoker'),(8,'Studious'),(9,'Introvert'),(9,'Peace Lover'),(9,'Studious'),
  (10,'Flexible'),(10,'Social'),(10,'Night Owl'),(11,'Friendly'),(11,'Flexible'),(11,'Clean');

INSERT INTO landlord_reviews (user_id, landlord_name, property_address, district_id, star_rating, is_recommended, review_text, is_approved, created_at) VALUES
  (6, 'Mr. Karim Uddin', 'Mirpur DOHS, House 12, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 2, 0, 'Maintenance was slow and communication was difficult.', 1, '2026-01-18 10:00:00'),
  (7, 'Mrs. Ruma Khatun', 'Agrabad Residential, Chittagong', (SELECT id FROM districts WHERE name='Chittagong'), 5, 1, 'Very caring landlord and quick to fix issues.', 1, '2026-02-11 12:00:00'),
  (8, 'Mr. Mostafa Kamal', 'Zindabazar, House 5, Sylhet', (SELECT id FROM districts WHERE name='Sylhet'), 4, 1, 'Honest landlord, fair rent and no hidden charges.', 1, '2026-02-25 09:30:00'),
  (9, 'Ms. Rima Chowdhury', 'Uttara Sector 7, House 14, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 5, 1, 'Safe building, professional behavior and good security.', 1, '2026-03-03 16:20:00'),
  (10, 'Mr. Habibur Rahman', 'Agrabad C/A, Plot 9, Chittagong', (SELECT id FROM districts WHERE name='Chittagong'), 4, 1, 'Trustworthy and responsive within the day.', 1, '2026-03-15 10:10:00'),
  (11, 'Mr. Karim Uncle', 'Joydebpur Road, Gazipur', (SELECT id FROM districts WHERE name='Gazipur'), 3, 0, 'Average support, acceptable for budget living.', 1, '2026-04-07 14:00:00'),
  (12, 'Mrs. Shahana Begum', 'Mohammadpur Tajmahal Road, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 4, 1, 'Helpful and fair with student tenants.', 1, '2026-04-19 11:35:00'),
  (13, 'Mr. Anwar Hossain', 'Farmgate Green Road, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 5, 1, 'Excellent landlord, transparent bills and fast maintenance.', 1, '2026-05-02 08:50:00'),
  (14, 'Dr. Selim Ahmed', 'Palashi Staff Quarter Road, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 4, 1, 'Good experience for BUET students and very convenient location.', 0, '2026-05-10 17:00:00');

INSERT INTO landlord_profiles (landlord_name, district_id, overall_rating) VALUES
  ('Mr. Karim Uddin', (SELECT id FROM districts WHERE name='Dhaka'), 2.00),
  ('Mrs. Ruma Khatun', (SELECT id FROM districts WHERE name='Chittagong'), 5.00),
  ('Mr. Mostafa Kamal', (SELECT id FROM districts WHERE name='Sylhet'), 4.00),
  ('Ms. Rima Chowdhury', (SELECT id FROM districts WHERE name='Dhaka'), 5.00),
  ('Mr. Habibur Rahman', (SELECT id FROM districts WHERE name='Chittagong'), 4.00),
  ('Mr. Karim Uncle', (SELECT id FROM districts WHERE name='Gazipur'), 3.00),
  ('Mrs. Shahana Begum', (SELECT id FROM districts WHERE name='Dhaka'), 4.00),
  ('Mr. Anwar Hossain', (SELECT id FROM districts WHERE name='Dhaka'), 5.00),
  ('Dr. Selim Ahmed', (SELECT id FROM districts WHERE name='Dhaka'), 0.00)
ON DUPLICATE KEY UPDATE overall_rating=VALUES(overall_rating);

INSERT INTO reports (reported_by_user_id, category, title, description, reference_id, status, created_at) VALUES
  (6, 'roommate', 'Spam roommate message', 'A roommate profile is repeatedly sending spam requests.', NULL, 'new', '2026-04-20 10:00:00'),
  (7, 'user', 'Suspicious advance request', 'A user asked for advance payment outside the platform.', NULL, 'resolved', '2026-04-21 11:00:00'),
  (8, 'comment', 'Inappropriate comment', 'A comment contains offensive wording.', NULL, 'new', '2026-05-03 13:10:00');

INSERT INTO activity_log (user_id, action_type, description, created_at) VALUES
  (6, 'create_listing', 'Shared Flat Beside UIU submitted', '2026-01-12 10:00:00'),
  (7, 'create_listing', 'Sublet Near EWU Aftabnagar submitted', '2026-02-03 12:00:00'),
  (8, 'submit_review', 'Submitted review for Mr. Mostafa Kamal', '2026-02-25 09:30:00'),
  (9, 'register', 'Mitu Akter registered a student account', '2025-10-18 14:20:00'),
  (10, 'connection_request', 'Rahat sent a roommate connection request', '2026-03-19 10:00:00'),
  (11, 'submit_report', 'Nusrat submitted a report', '2026-04-20 10:00:00');


INSERT INTO users (id, full_name, phone, gender, email, university_id, student_id, password_hash, is_verified, role, created_at) VALUES
  (16, 'Sabbir Chowdhury', '01711000016', 'male', 'sabbir@cuet.ac.bd', (SELECT id FROM universities WHERE short_name='CUET'), 'CUET-2022-0016', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student', '2026-05-20 10:00:00'),
  (17, 'Ria Mondal', '01711000017', 'female', 'ria@kuet.ac.bd', (SELECT id FROM universities WHERE short_name='KUET'), 'KUET-2023-0017', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 0, 'student', '2026-06-01 11:00:00'),
  (18, 'Farhan Alam', '01711000018', 'male', 'farhan@iut-dhaka.edu', (SELECT id FROM universities WHERE short_name='IUT'), 'IUT-2021-0018', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student', '2026-06-08 12:00:00'),
  (19, 'Sumaiya Akter', '01711000019', 'female', 'sumaiya@ruet.ac.bd', (SELECT id FROM universities WHERE short_name='RUET'), 'RUET-2024-0019', '$2b$10$KI8vLl/j9DjBMC1bdYoIh.p8.Vf4C7toiBAlP.zGLwp2qqkgVvBqC', 1, 'student', '2026-06-12 13:00:00');

INSERT INTO listings (id, user_id, title, district_id, area_id, university_id, rent_price, property_type, distance_value, distance_unit, available_from, description, phone_hidden, status, is_verified, created_at) VALUES
  (16, 16, 'CUET Student Flat Agrabad', (SELECT id FROM districts WHERE name='Chittagong'), (SELECT id FROM areas WHERE name='Agrabad' AND district_id=(SELECT id FROM districts WHERE name='Chittagong')), (SELECT id FROM universities WHERE short_name='CUET'), 9500.00, 'flat', 1.30, 'bus', '2026-08-01', 'Clean student flat in Chittagong with security and WiFi for CUET students.', 0, 'published', 1, '2026-05-21 10:30:00'),
  (17, 17, 'KUET Boyra Shared Flat', (SELECT id FROM districts WHERE name='Khulna'), (SELECT id FROM areas WHERE name='Boyra' AND district_id=(SELECT id FROM districts WHERE name='Khulna')), (SELECT id FROM universities WHERE short_name='KUET'), 7000.00, 'shared_flat', 0.90, 'cycle', '2026-08-10', 'Shared flat in Boyra with gas, WiFi and peaceful environment for KUET students.', 0, 'published', 0, '2026-06-01 12:10:00'),
  (18, 18, 'IUT Board Bazar Mess', (SELECT id FROM districts WHERE name='Gazipur'), (SELECT id FROM areas WHERE name='Board Bazar' AND district_id=(SELECT id FROM districts WHERE name='Gazipur')), (SELECT id FROM universities WHERE short_name='IUT'), 4800.00, 'mess', 0.60, 'walking', '2026-07-15', 'Affordable mess near IUT with meals and study-friendly rules.', 0, 'published', 1, '2026-06-08 12:20:00'),
  (19, 19, 'RUET Uposhohor Single Room', (SELECT id FROM districts WHERE name='Rajshahi'), (SELECT id FROM areas WHERE name='Uposhohor' AND district_id=(SELECT id FROM districts WHERE name='Rajshahi')), (SELECT id FROM universities WHERE short_name='RUET'), 5500.00, 'single_room', 1.00, 'bus', '2026-09-01', 'Single room in Rajshahi Uposhohor suitable for RUET students.', 0, 'published', 0, '2026-06-12 13:15:00'),
  (20, 18, 'Gazipur Joydebpur Bachelor Flat', (SELECT id FROM districts WHERE name='Gazipur'), (SELECT id FROM areas WHERE name='Joydebpur' AND district_id=(SELECT id FROM districts WHERE name='Gazipur')), (SELECT id FROM universities WHERE short_name='IUT'), 10500.00, 'bachelor_flat', 1.50, 'bike', '2026-09-15', 'Bachelor flat in Joydebpur for IUT students with parking and generator.', 0, 'pending', 0, '2026-06-14 16:00:00');

INSERT INTO listing_images (listing_id, image_path, sort_order) VALUES
  (16,'uploads/listings/full flat pt 2.jpg',0),(17,'uploads/listings/kuet-shared.jpg',0),(18,'uploads/listings/Shared room double bed best.jpg',0),(19,'uploads/listings/Shared flat.jpg',0),(20,'uploads/listings/gazipur-flat.jpg',0);

INSERT INTO listing_amenities (listing_id, amenity_name) VALUES
  (16,'WiFi'),(16,'Security'),(16,'Lift'),(17,'WiFi'),(17,'Gas'),(17,'Balcony'),
  (18,'Mess Food'),(18,'WiFi'),(18,'Security'),(19,'WiFi'),(19,'Security'),(19,'Gas'),
  (20,'Parking'),(20,'Generator'),(20,'Security');

INSERT INTO roommate_profiles (id, user_id, budget_min, budget_max, district_id, move_in_month, move_in_year, description, is_published, profile_visible) VALUES
  (12, 16, 5000, 8500, (SELECT id FROM districts WHERE name='Chittagong'), 8, 2026, 'CUET student looking for a quiet roommate in Chittagong.', 1, 1),
  (13, 17, 4500, 7500, (SELECT id FROM districts WHERE name='Khulna'), 8, 2026, 'KUET student, clean and friendly, prefers Boyra or Sonadanga.', 1, 1),
  (14, 18, 3500, 6500, (SELECT id FROM districts WHERE name='Gazipur'), 7, 2026, 'IUT student searching for budget-friendly roommate near Board Bazar.', 1, 1),
  (15, 19, 4000, 7000, (SELECT id FROM districts WHERE name='Rajshahi'), 9, 2026, 'RUET student, non-smoker and studious, prefers Uposhohor.', 1, 1);

INSERT INTO roommate_preferred_areas (roommate_profile_id, area_id) VALUES
  (12,(SELECT id FROM areas WHERE name='Agrabad' AND district_id=(SELECT id FROM districts WHERE name='Chittagong'))),
  (13,(SELECT id FROM areas WHERE name='Boyra' AND district_id=(SELECT id FROM districts WHERE name='Khulna'))),
  (14,(SELECT id FROM areas WHERE name='Board Bazar' AND district_id=(SELECT id FROM districts WHERE name='Gazipur'))),
  (15,(SELECT id FROM areas WHERE name='Uposhohor' AND district_id=(SELECT id FROM districts WHERE name='Rajshahi')));

INSERT INTO roommate_tags (roommate_profile_id, tag_name) VALUES
  (12,'Studious'),(12,'Clean'),(12,'Non-Smoker'),(13,'Friendly'),(13,'Clean'),(13,'Flexible'),
  (14,'Peace Lover'),(14,'Early Bird'),(14,'Studious'),(15,'Non-Smoker'),(15,'Studious'),(15,'Peace Lover');


INSERT INTO landlord_reviews (user_id, landlord_name, property_address, district_id, star_rating, is_recommended, review_text, is_approved, created_at) VALUES
  (6, 'Mr. Zaman Kabir', 'Plot 5, Block C, Bashundhara, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 5, 1, 'Same landlord, another Bashundhara property with very good maintenance.', 1, '2026-05-18 10:00:00'),
  (7, 'Mr. Zaman Kabir', 'House 18, Road 6, Bashundhara R/A, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 4, 1, 'Responsive landlord and transparent utility bills at this property.', 1, '2026-05-21 11:00:00'),
  (8, 'Mrs. Salma Begum', 'House 8, Mohakhali, Dhaka', (SELECT id FROM districts WHERE name='Dhaka'), 4, 1, 'Good behavior and fair rent policy in Mohakhali.', 1, '2026-05-23 09:30:00'),
  (9, 'Mr. Habibur Rahman', 'Commerce College Road, Chittagong', (SELECT id FROM districts WHERE name='Chittagong'), 5, 1, 'Another property under the same landlord; maintenance was quick.', 1, '2026-05-24 13:15:00'),
  (10, 'Mr. Mostafa Kamal', 'Ambarkhana Road, Flat 3B, Sylhet', (SELECT id FROM districts WHERE name='Sylhet'), 4, 1, 'Clean flat and fair deposit return process.', 1, '2026-05-25 16:40:00');

INSERT INTO feedback_messages (user_id, topic, star_rating, description, is_featured, created_at) VALUES
  (6, 'Found a great roommate', 5, 'The roommate matching tags helped me find a clean and friendly flatmate near UIU.', 1, '2026-04-12 10:00:00'),
  (7, 'Listings are helpful', 5, 'Verified listings made my house search near EWU much safer and faster.', 1, '2026-04-16 11:30:00'),
  (8, 'Landlord review helped', 4, 'I checked landlord reviews before moving and avoided a bad rental decision.', 1, '2026-04-20 09:15:00'),
  (10, 'Needs map feature', 4, 'Great platform overall. A map view would make it even easier to compare listings.', 0, '2026-05-01 15:40:00'),
  (11, 'Simple and useful', 5, 'I found a safe female sublet using the filters in less than a week.', 1, '2026-05-07 18:20:00'),
  (13, 'Good for students', 4, 'The university and area filters are very useful for students new to Dhaka.', 0, '2026-05-15 14:05:00');
