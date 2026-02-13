DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS cca_images;
DROP TABLE IF EXISTS ccas;
DROP TABLE IF EXISTS partner_menus;
DROP TABLE IF EXISTS partner_images;
DROP TABLE IF EXISTS partners;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT CHECK(role IN ('super_admin', 'partner_admin', 'cca', 'user')) DEFAULT 'user',
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Partners Table
CREATE TABLE partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL, -- e.g. "마닐라 말라테"
    address TEXT, -- e.g. "Malate, Manila, Philippines (KTV District)"
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    image_url TEXT, -- Representative image
    intro TEXT, -- Short intro
    description TEXT, -- Long description
    hours TEXT, -- e.g. "19:00 - 04:00"
    showup_times TEXT, -- e.g. "20:00 / 22:00 / 00:00"
    phone TEXT,
    sns_kakao TEXT,
    sns_telegram TEXT,
    owner_id INTEGER REFERENCES users(id),
    is_recommended BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Partner Images (Gallery)
CREATE TABLE partner_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    type TEXT CHECK(type IN ('photo', 'video')) DEFAULT 'photo', -- 'photo' or 'video'
    thumbnail_url TEXT, -- for videos
    is_main BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Partner Menu
CREATE TABLE partner_menus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price TEXT, -- e.g. "P 1,000"
    description TEXT,
    category TEXT, -- e.g. "Beer", "Set", "Food"
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CCAs Table
CREATE TABLE ccas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    age INTEGER,
    height INTEGER,
    likes INTEGER DEFAULT 0,
    image_url TEXT,
    status TEXT CHECK(status IN ('online', 'offline')) DEFAULT 'offline',
    intro TEXT,
    user_id INTEGER REFERENCES users(id), -- If CCA has a login
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CCA Gallery (Optional, distinct from Profile Pic)
CREATE TABLE cca_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cca_id INTEGER REFERENCES ccas(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reservations Table
CREATE TABLE reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reservation_number TEXT UNIQUE, -- e.g. "RES123456"
    user_id INTEGER REFERENCES users(id),
    partner_id INTEGER REFERENCES partners(id),
    cca_id INTEGER REFERENCES ccas(id), -- Optional, if booking a specific CCA
    reservation_date TEXT NOT NULL, -- YYYY-MM-DD
    reservation_time TEXT NOT NULL, -- HH:MM
    message TEXT,
    status TEXT CHECK(status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Community Posts
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id),
    author_name TEXT, -- Cache name in case user is deleted or to avoid joins
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    board_type TEXT DEFAULT 'free', -- 'free', 'notice', 'review'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Comments
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    author_id INTEGER REFERENCES users(id),
    author_name TEXT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reviews (Linked to Partners)
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    content TEXT,
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
