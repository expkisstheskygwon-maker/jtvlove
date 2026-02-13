-- Users
INSERT INTO users (email, password_hash, name, role) VALUES 
('admin@jtvlove.com', 'hash', 'Super Admin', 'super_admin'),
('partner1@jtvlove.com', 'hash', 'Partner Admin 1', 'partner_admin'),
('user1@jtvlove.com', 'hash', 'JohnDoe', 'user'),
('user2@jtvlove.com', 'hash', 'TravelerK', 'user');

-- Partners
INSERT INTO partners (
    name, location, address, rating, review_count, image_url, 
    intro, description, hours, showup_times, phone, sns_kakao, sns_telegram
) VALUES 
(
    '블루 JTV (Blue JTV)', '마닐라 말라테', 'Malate, Manila, Philippines (KTV District)', 4.9, 128, 
    'https://images.unsplash.com/photo-1571948482861-ee29d915993b', 
    '최고급 시설과 검증된 서비스로 모십니다.', 
    '블루 JTV는 마닐라 말라테 지역에서 가장 현대적이고 세련된 시설을 자랑하는 정통 JTV입니다. 50여 명의 엄격하게 교육된 CCA들이 최고의 서비스를 제공하며, 프라이빗한 VIP룸과 최신 음향 시스템을 갖추고 있습니다.',
    '19:00 - 04:00 (연중무휴)', '20:00 / 22:00 / 00:00', '+63 912 345 6789', 'bluejtv_manila', '@bluejtv_official'
),
(
    '레드 엔터테인먼트', '파사이 에드사', 'Pasay, Manila', 4.8, 95, 
    'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2', 
    '즐거움이 끊이지 않는 화려한 스테이지.',
    '최적의 음향 시스템과 라이브 무대가 준비되어 있습니다.',
    '20:00 - 05:00', '21:00 / 23:00', '+63 999 888 7777', 'red_ent', '@red_ent'
);

-- Partner Menus
INSERT INTO partner_menus (partner_id, name, price, category, description) VALUES
(1, 'House Beer (San Miguel)', 'P 150', 'Drink', 'Ice cold local beer'),
(1, 'Whiskey Set (Black Label)', 'P 4,500', 'Set', 'Includes chaser and ice'),
(1, 'Fruit Platter (Large)', 'P 800', 'Food', 'Seasonal fresh fruits');

-- Partner Gallery
INSERT INTO partner_images (partner_id, url, type, is_main) VALUES
(1, 'https://images.unsplash.com/photo-1571948482861-ee29d915993b', 'photo', 1),
(1, 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2', 'photo', 0),
(1, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'photo', 0);

-- CCAs
INSERT INTO ccas (partner_id, name, age, height, likes, image_url, status, intro) VALUES 
(1, '미나', 23, 165, 1240, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', 'online', '안녕하세요. 미나입니다.'),
(1, '사랑', 21, 162, 980, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 'offline', '즐거운 시간 약속드려요.'),
(1, '유리', 24, 168, 2100, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', 'online', '노래 잘하는 유리입니다.'),
(2, '지니', 22, 164, 850, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', 'online', '댄싱퀸 지니!');

-- Posts
INSERT INTO posts (title, content, author_id, author_name, views, board_type) VALUES 
('마닐라 말라테 근처 깨끗한 JTV 추천 좀 해주세요!', '처음 가보는데 추천 부탁드려요.', 3, 'JohnDoe', 342, 'free'),
('블루 JTV 어제 다녀왔는데 미나님 텐션 미쳤네요 ㅋㅋ', '진짜 재밌게 놀다 왔습니다.', 4, 'TravelerK', 890, 'review');

-- Reviews
INSERT INTO reviews (partner_id, user_id, rating, content, likes) VALUES
(1, 3, 5, '시설이 정말 깨끗하고 CCA분들이 한국말을 꽤 잘해서 즐거운 시간 보냈습니다.', 12),
(1, 4, 4, '사람이 많아서 예약 꼭 하고 가야겠네요. 추천합니다.', 8);
