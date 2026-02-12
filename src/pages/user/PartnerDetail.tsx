import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Star,
    MapPin,
    Clock,
    Phone,
    MessageCircle,
    Instagram,
    Share2,
    Heart,
    User,
    Image as ImageIcon,
    Info,
    CalendarCheck,
    Play
} from 'lucide-react';

const PartnerDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'info' | 'gallery' | 'cca' | 'reviews'>('info');
    const [isLiked, setIsLiked] = useState(false);

    // Mock data for a partner
    const partner = {
        id: id,
        name: '블루 JTV (Blue JTV)',
        rating: 4.9,
        reviewCount: 128,
        address: 'Malate, Manila, Philippines (KTV District)',
        images: [
            'https://images.unsplash.com/photo-1571948482861-ee29d915993b',
            'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2'
        ],
        hours: '19:00 - 04:00 (연중무휴)',
        showup: '20:00 / 22:00 / 00:00',
        phone: '+63 912 345 6789',
        sns: {
            kakao: 'bluejtv_manila',
            telegram: '@bluejtv_official'
        },
        description: '블루 JTV는 마닐라 말라테 지역에서 가장 현대적이고 세련된 시설을 자랑하는 정통 JTV입니다. 50여 명의 엄격하게 교육된 CCA들이 최고의 서비스를 제공하며, 프라이빗한 VIP룸과 최신 음향 시스템을 갖추고 있습니다.',
        menu: [
            { name: 'House Beer (San Miguel)', price: 'P 150' },
            { name: 'Whiskey Set (Black Label)', price: 'P 4,500' },
            { name: 'Fruit Platter (Large)', price: 'P 800' }
        ],
        ccaList: [
            { id: 1, name: '미나', age: 23, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', status: 'online' },
            { id: 2, name: '사랑', age: 21, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', status: 'offline' },
            { id: 3, name: '유리', age: 24, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', status: 'online' },
            { id: 4, name: '지니', age: 22, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', status: 'online' }
        ],
        gallery: [
            { type: 'photo', url: 'https://images.unsplash.com/photo-1571948482861-ee29d915993b' },
            { type: 'video', url: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2', thumbnail: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2' },
            { type: 'photo', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b' },
            { type: 'photo', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' }
        ],
        reviews: [
            { id: 1, user: 'JohnDoe', rating: 5, date: '2024.02.10', content: '시설이 정말 깨끗하고 CCA분들이 한국말을 꽤 잘해서 즐거운 시간 보냈습니다.', likes: 12 },
            { id: 2, user: 'TravelerK', rating: 4, date: '2024.02.05', content: '사람이 많아서 예약 꼭 하고 가야겠네요. 추천합니다.', likes: 8 }
        ]
    };

    const handleBooking = () => {
        // Redirection logic to Reservation Page
        navigate('/reservations/new');
    };

    return (
        <div className="partner-detail-page">
            <style>{`
                .partner-detail-page { display: flex; flex-direction: column; gap: 2rem; max-width: 1000px; margin: 0 auto; }
                
                /* Hero Section */
                .hero-section { position: relative; border-radius: 32px; overflow: hidden; height: 400px; }
                .hero-bg { width: 100%; height: 100%; object-fit: cover; }
                .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 70%); display: flex; flex-direction: column; justify-content: flex-end; padding: 3rem; color: white; }
                .hero-content h1 { font-size: 2.5rem; font-weight: 950; margin-bottom: 0.5rem; }
                .hero-meta { display: flex; align-items: center; gap: 1.5rem; font-weight: 700; }
                
                .actions { position: absolute; top: 2rem; right: 2rem; display: flex; gap: 0.75rem; }
                .circle-btn { width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.2); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.3); color: white; cursor: pointer; transition: all 0.2s; }
                .circle-btn:hover { background: white; color: var(--text); }
                .circle-btn.liked { background: #ef4444; border-color: #ef4444; color: white; }

                /* Sticky Booking Bar */
                .booking-bar { position: sticky; top: 80px; z-index: 900; background: white; border: 1px solid var(--border); border-radius: 20px; padding: 1.25rem 2rem; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }

                /* Tabs */
                .tab-nav { display: flex; background: var(--surface-alt); padding: 0.5rem; border-radius: 16px; margin-top: 1rem; }
                .tab-btn { flex: 1; padding: 0.85rem; border: none; background: transparent; font-weight: 800; font-size: 0.95rem; color: var(--text-muted); cursor: pointer; border-radius: 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
                .tab-btn.active { background: white; color: var(--primary); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

                .content-card { background: white; border: 1px solid var(--border); border-radius: 28px; padding: 2.5rem; margin-top: 1rem; }
                
                /* Info Content */
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
                .info-item { display: flex; gap: 1rem; }
                .info-icon { width: 40px; height: 40px; border-radius: 12px; background: var(--surface-alt); display: flex; align-items: center; justify-content: center; color: var(--primary); flex-shrink: 0; }
                .info-text h4 { font-weight: 800; font-size: 0.9rem; margin-bottom: 0.25rem; color: var(--text-muted); }
                .info-text p { font-weight: 700; color: var(--text); }

                /* CCA Grid */
                .detail-cca-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
                .mini-cca-card { border-radius: 20px; border: 1px solid var(--border); overflow: hidden; cursor: pointer; transition: transform 0.2s; }
                .mini-cca-card:hover { transform: translateY(-5px); }
                .mini-cca-img { width: 100%; aspect-ratio: 1; object-fit: cover; }
                .mini-cca-info { padding: 1rem; display: flex; align-items: center; justify-content: space-between; }
                .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; }
                .status-dot.offline { background: #d1d5db; }

                /* Gallery Grid */
                .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
                .gallery-item { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 4/3; }
                .gallery-item img { width: 100%; height: 100%; object-fit: cover; }
                .play-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; }

                @media (max-width: 768px) {
                  .info-grid { grid-template-columns: 1fr; }
                  .detail-cca-grid { grid-template-columns: repeat(2, 1fr); }
                  .hero-section { height: 300px; }
                  .hero-content h1 { font-size: 1.75rem; }
                  .booking-bar { flex-direction: column; gap: 1rem; text-align: center; }
                }
            `}</style>

            <section className="hero-section">
                <img src={partner.images[0]} alt="" className="hero-bg" />
                <div className="actions">
                    <button className="circle-btn"><Share2 size={20} /></button>
                    <button
                        className={`circle-btn ${isLiked ? 'liked' : ''}`}
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        <Heart size={20} fill={isLiked ? 'white' : 'transparent'} />
                    </button>
                </div>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>{partner.name}</h1>
                        <div className="hero-meta">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Star size={20} fill="#f59e0b" color="#f59e0b" /> {partner.rating} ({partner.reviewCount})
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <MapPin size={20} /> {partner.address}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="booking-bar">
                <div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 700 }}>지금 즉시 온라인 예약 가능</span>
                    <div style={{ fontWeight: 900, fontSize: '1.25rem', marginTop: '0.2rem' }}>원하시는 시간에 바로 쇼업!</div>
                </div>
                <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontWeight: 900, fontSize: '1.05rem' }} onClick={handleBooking}>
                    <CalendarCheck size={20} /> 예약하기
                </button>
            </div>

            <nav className="tab-nav">
                <button className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}><Info size={18} /> 상세 정보</button>
                <button className={`tab-btn ${activeTab === 'cca' ? 'active' : ''}`} onClick={() => setActiveTab('cca')}><User size={18} /> 소속 CCA ({partner.ccaList.length})</button>
                <button className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}><ImageIcon size={18} /> 갤러리</button>
                <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}><MessageCircle size={18} /> 리뷰 ({partner.reviewCount})</button>
            </nav>

            <div className="content-card">
                {activeTab === 'info' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-icon"><Clock size={20} /></div>
                                <div className="info-text">
                                    <h4>영업 시간</h4>
                                    <p>{partner.hours}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon"><Play size={20} /></div>
                                <div className="info-text">
                                    <h4>쇼업 시간</h4>
                                    <p>{partner.showup}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon"><Phone size={20} /></div>
                                <div className="info-text">
                                    <h4>전화번호</h4>
                                    <p>{partner.phone}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon"><Instagram size={20} /></div>
                                <div className="info-text">
                                    <h4>SNS 문의</h4>
                                    <p>카톡: {partner.sns.kakao} / 텔레: {partner.sns.telegram}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontWeight: 950, marginBottom: '1rem' }}>업체 소개</h3>
                            <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.05rem' }}>{partner.description}</p>
                        </div>

                        <div>
                            <h3 style={{ fontWeight: 950, marginBottom: '1.5rem' }}>대표 메뉴</h3>
                            <div style={{ background: 'var(--surface-alt)', borderRadius: '20px', padding: '1.5rem' }}>
                                {partner.menu.map(item => (
                                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                        <span style={{ fontWeight: 800 }}>{item.name}</span>
                                        <span style={{ fontWeight: 950, color: 'var(--primary)' }}>{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'cca' && (
                    <div className="detail-cca-grid">
                        {partner.ccaList.map(cca => (
                            <div key={cca.id} className="mini-cca-card" onClick={() => navigate(`/cca/${cca.id}`)}>
                                <img src={cca.image} alt={cca.name} className="mini-cca-img" />
                                <div className="mini-cca-info">
                                    <span style={{ fontWeight: 800 }}>{cca.name} ({cca.age})</span>
                                    <div className={`status-dot ${cca.status === 'offline' ? 'offline' : ''}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'gallery' && (
                    <div className="gallery-grid">
                        {partner.gallery.map((item, idx) => (
                            <div key={idx} className="gallery-item">
                                <img src={item.type === 'video' ? item.thumbnail : item.url} alt="" />
                                {item.type === 'video' && (
                                    <div className="play-overlay"><Play fill="white" size={32} /></div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {partner.reviews.map(review => (
                            <div key={review.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User size={16} />
                                        </div>
                                        <span style={{ fontWeight: 800 }}>{review.user}</span>
                                        <div style={{ display: 'flex', gap: '0.1rem' }}>
                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < review.rating ? '#f59e0b' : '#eee'} color={i < review.rating ? '#f59e0b' : '#eee'} />)}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{review.date}</span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>{review.content}</p>
                                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>
                                    <Heart size={14} /> {review.likes}명이 좋아합니다
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnerDetail;
