-- Hortulus web – database schema (MariaDB 10.4+ / MySQL 8+).
-- {P} is replaced by the table prefix (DB_PREFIX, default "hortulus_") by install.php.
-- Everything lives here: accounts, gardens, garden documents, photos, generated
-- PDFs, icons and backgrounds, the weather cache and the audit log.

CREATE TABLE IF NOT EXISTS {P}settings (
  name VARCHAR(64) NOT NULL PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS {P}sessions (
  id CHAR(64) NOT NULL PRIMARY KEY,
  data MEDIUMBLOB NOT NULL,
  expires_at INT UNSIGNED NOT NULL,
  KEY ix_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS {P}users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL,
  name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  status ENUM('pending','active','disabled') NOT NULL DEFAULT 'pending',
  lang CHAR(2) NOT NULL DEFAULT 'nl',
  email_verified_at DATETIME NULL,
  activated_at DATETIME NULL,
  activated_by INT UNSIGNED NULL,
  last_login_at DATETIME NULL,
  failed_logins INT UNSIGNED NOT NULL DEFAULT 0,
  locked_until DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_email (email),
  KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- One-time tokens (e-mail verification, password reset, admin activation).
-- Only a SHA-256 hash of each token is stored.
CREATE TABLE IF NOT EXISTS {P}tokens (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  purpose ENUM('verify','reset','activate') NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_token (token_hash),
  KEY idx_user (user_id, purpose),
  CONSTRAINT {P}fk_tokens_user FOREIGN KEY (user_id) REFERENCES {P}users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Rate limiting (login, registration, password reset): hashed keys only.
CREATE TABLE IF NOT EXISTS {P}attempts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  key_hash CHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_key (key_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

CREATE TABLE IF NOT EXISTS {P}gardens (
  id CHAR(32) NOT NULL PRIMARY KEY,
  owner_id INT UNSIGNED NOT NULL,
  title VARCHAR(100) NOT NULL,
  preset VARCHAR(32) NOT NULL DEFAULT 'nl_be',
  latitude DECIMAL(8,5) NOT NULL DEFAULT 50.85000,
  longitude DECIMAL(8,5) NOT NULL DEFAULT 4.35000,
  time_zone VARCHAR(64) NOT NULL DEFAULT 'Europe/Brussels',
  share_mode VARCHAR(8) NOT NULL DEFAULT 'off',
  share_token CHAR(32) NULL,
  share_sections VARCHAR(255) NULL,
  share_admin TINYINT(1) NOT NULL DEFAULT 0,
  share_icon VARCHAR(16) NULL,
  share_note VARCHAR(280) NULL,
  shared_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY ux_share_token (share_token),
  KEY ix_share_mode (share_mode, updated_at),
  KEY idx_owner (owner_id),
  CONSTRAINT {P}fk_gardens_owner FOREIGN KEY (owner_id) REFERENCES {P}users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Shared gardens: other users as editor or viewer.
CREATE TABLE IF NOT EXISTS {P}garden_members (
  garden_id CHAR(32) NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  role ENUM('editor','viewer') NOT NULL DEFAULT 'viewer',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (garden_id, user_id),
  CONSTRAINT {P}fk_members_garden FOREIGN KEY (garden_id) REFERENCES {P}gardens (id) ON DELETE CASCADE,
  CONSTRAINT {P}fk_members_user FOREIGN KEY (user_id) REFERENCES {P}users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- The garden itself: the same JSON document Hortulus keeps in Home Assistant
-- (plan, crops, tasks, journal, harvests ...), its system log (undo) and archive.
CREATE TABLE IF NOT EXISTS {P}documents (
  garden_id CHAR(32) NOT NULL,
  doc_key VARCHAR(16) NOT NULL,
  content LONGTEXT NOT NULL,
  revision INT UNSIGNED NOT NULL DEFAULT 1,
  updated_by INT UNSIGNED NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (garden_id, doc_key),
  CONSTRAINT {P}fk_documents_garden FOREIGN KEY (garden_id) REFERENCES {P}gardens (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Earlier versions of the garden document (compressed), for recovery by the admin.
CREATE TABLE IF NOT EXISTS {P}document_versions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  garden_id CHAR(32) NOT NULL,
  content LONGBLOB NOT NULL,
  bytes INT UNSIGNED NOT NULL,
  created_by INT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_garden (garden_id, created_at),
  CONSTRAINT {P}fk_versions_garden FOREIGN KEY (garden_id) REFERENCES {P}gardens (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Journal photos: re-encoded JPEG (max 1600 px, EXIF removed) and a thumbnail.
CREATE TABLE IF NOT EXISTS {P}photos (
  id CHAR(32) NOT NULL PRIMARY KEY,
  garden_id CHAR(32) NOT NULL,
  user_id INT UNSIGNED NULL,
  mime VARCHAR(32) NOT NULL DEFAULT 'image/jpeg',
  width SMALLINT UNSIGNED NOT NULL,
  height SMALLINT UNSIGNED NOT NULL,
  bytes INT UNSIGNED NOT NULL,
  data LONGBLOB NOT NULL,
  thumb MEDIUMBLOB NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_garden (garden_id),
  CONSTRAINT {P}fk_photos_garden FOREIGN KEY (garden_id) REFERENCES {P}gardens (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Generated files (season books, plans, handbooks as PDF).
CREATE TABLE IF NOT EXISTS {P}files (
  id CHAR(32) NOT NULL PRIMARY KEY,
  garden_id CHAR(32) NOT NULL,
  user_id INT UNSIGNED NULL,
  kind VARCHAR(16) NOT NULL DEFAULT 'pdf',
  filename VARCHAR(190) NOT NULL,
  mime VARCHAR(64) NOT NULL DEFAULT 'application/pdf',
  bytes INT UNSIGNED NOT NULL,
  data LONGBLOB NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_garden (garden_id, created_at),
  CONSTRAINT {P}fk_files_garden FOREIGN KEY (garden_id) REFERENCES {P}gardens (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Site artwork: logo, icons, backgrounds (served by media.php).
CREATE TABLE IF NOT EXISTS {P}assets (
  name VARCHAR(100) NOT NULL PRIMARY KEY,
  mime VARCHAR(64) NOT NULL,
  data MEDIUMBLOB NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Open-Meteo answers, shared by gardens close to each other (30 minutes).
CREATE TABLE IF NOT EXISTS {P}weather_cache (
  cache_key CHAR(64) NOT NULL PRIMARY KEY,
  payload MEDIUMTEXT NOT NULL,
  fetched_at DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional link to a Home Assistant (sensors, weather, to-do lists); the token is encrypted.
CREATE TABLE IF NOT EXISTS {P}ha_links (
  garden_id CHAR(32) NOT NULL PRIMARY KEY,
  base_url VARCHAR(255) NOT NULL,
  token_enc TEXT NOT NULL,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT {P}fk_ha_garden FOREIGN KEY (garden_id) REFERENCES {P}gardens (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS {P}audit (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  action VARCHAR(48) NOT NULL,
  detail VARCHAR(255) NOT NULL DEFAULT '',
  ip VARCHAR(45) NOT NULL DEFAULT '',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_created (created_at),
  KEY idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS {P}mail_log (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  to_addr VARCHAR(190) NOT NULL,
  subject VARCHAR(190) NOT NULL,
  ok TINYINT(1) NOT NULL,
  error VARCHAR(500) NULL,
  detail MEDIUMTEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS {P}log (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME NOT NULL,
  level VARCHAR(8) NOT NULL,
  channel VARCHAR(16) NOT NULL,
  message VARCHAR(500) NOT NULL,
  detail MEDIUMTEXT NULL,
  user_id BIGINT UNSIGNED NULL,
  ip VARCHAR(45) NULL,
  req VARCHAR(16) NULL,
  KEY ix_created (created_at),
  KEY ix_channel (channel, level),
  KEY ix_req (req)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
