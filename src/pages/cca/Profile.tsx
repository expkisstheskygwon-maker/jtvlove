import React, { useState } from 'react';
import {
    Grid,
    Info,
    Calendar,
    Heart,
    MessageCircle,
    Edit2,
    Plus,
    Instagram,
    Twitter,
    ExternalLink,
    ChevronRight,
    X,
    Target,
    Sparkles,
    Coffee,
    Beer,
    Cigarette,
    Users,
    Dog,
    Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CCAProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'gallery' | 'info' | 'reservation'>('gallery');
    const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
    const navigate = useNavigate();

    // Mock Data
    const profile = {
        nickname: '미나 (Mina)',
        intro: '밝은 에너지로 즐거운 시간을 약속드려요! ✨',
        likes: 1248,
        reservations: 452,
        affiliation: '블루 JTV (Blue JTV)',
        stats: {
            age: 23,
            height: 165,
            weight: 48,
            mbti: 'ENFP',
            zodiac: '천칭자리'
        },
        lifestyle: {
            contact: '자주 연락하는 편',
            rest: '집에서 영화보기',
            friends: '좁고 깊은 관계',
            alcohol: '가끔 즐겨요',
            smoking: '비흡연',
            pets: '강아지 키워요'
        }
    };

    const galleryItems = [
        { id: 1, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500', likes: 124, comments: 12, desc: '오늘 날씨 너무 좋아요! ☀️' },
        { id: 2, url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500', likes: 98, comments: 8, desc: '새로운 룩 어때요? 👗' },
        { id: 3, url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500', likes: 156, comments: 15, desc: '힐링 타임... ☕' },
        { id: 4, url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500', likes: 231, comments: 24, desc: '촬영 중 한 컷! 📸' },
        { id: 5, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500', likes: 87, comments: 5, desc: '맛있는 저녁 냠냠 😋' },
        { id: 6, url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500', likes: 112, comments: 10, desc: '굿나잇! ✨' },
    ];

    return (
        <div className="cca-profile-view">
            <style>{`
        .cca-profile-view { max-width: 935px; margin: 0 auto; padding-bottom: 5rem; }
        
        /* Header Section */
        .profile-header { display: flex; gap: 3rem; padding: 2rem 1rem; border-bottom: 1px solid var(--border); }
        .pfp-container { position: relative; flex-shrink: 0; }
        .pfp-circle { width: 150px; height: 150px; border-radius: 50%; border: 3px solid var(--primary); padding: 4px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); cursor: pointer; }
        .pfp-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 4px solid var(--surface); }
        
        .profile-info { flex-grow: 1; display: flex; flex-direction: column; gap: 1.5rem; }
        .info-top { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
        .nickname { font-size: 1.75rem; font-weight: 300; }
        .edit-btn { padding: 0.5rem 1.5rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: background 0.2s; }
        .edit-btn:hover { background: var(--surface-alt); }
        
        .info-stats { display: flex; gap: 2.5rem; }
        .stat-item { display: flex; gap: 0.25rem; font-size: 1rem; }
        .stat-val { font-weight: 700; }
        
        .info-bio { line-height: 1.5; }
        .bio-name { font-weight: 700; margin-bottom: 0.25rem; display: block; }
        .affiliation-label { display: flex; align-items: center; gap: 0.4rem; color: var(--primary); font-size: 0.85rem; font-weight: 700; margin-top: 0.5rem; }

        /* Tabs */
        .profile-tabs { display: flex; justify-content: center; border-top: 1px solid var(--border); gap: 4rem; }
        .tab-item { display: flex; align-items: center; gap: 0.5rem; padding: 1rem 0; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); cursor: pointer; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid transparent; margin-top: -1px; transition: all 0.2s; }
        .tab-item.active { color: var(--text); border-top-color: var(--text); }

        /* Gallery Grid */
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.75rem; padding: 1rem 0; }
        .media-card { position: relative; aspect-ratio: 1; border-radius: 4px; overflow: hidden; cursor: pointer; }
        .media-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .media-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; gap: 1.5rem; color: white; opacity: 0; transition: opacity 0.2s; }
        .media-card:hover .media-overlay { opacity: 1; }
        .media-card:hover img { transform: scale(1.05); }
        .media-stat { display: flex; align-items: center; gap: 0.4rem; font-weight: 700; }

        .add-media-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; border: 2px dashed var(--border); border-radius: 4px; background: var(--surface-alt); color: var(--text-muted); }
        .add-media-card:hover { border-color: var(--primary); color: var(--primary); }

        /* Info Tab Content */
        .info-content { display: flex; flex-direction: column; gap: 3rem; padding: 2rem 0; }
        .info-section { display: flex; flex-direction: column; gap: 1.5rem; }
        .section-header { font-size: 1.1rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem; border-bottom: 2px solid var(--primary); width: fit-content; padding-bottom: 0.25rem; margin-bottom: 0.5rem; }
        
        .basic-info-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.5rem; }
        .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .stat-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: flex; align-items: center; gap: 0.3rem; }
        .stat-value { font-size: 1.1rem; font-weight: 800; color: var(--primary); }

        .lifestyle-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
        .life-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--surface-alt); border-radius: 12px; border: 1px solid var(--border); }
        
        .sns-links { display: flex; gap: 1rem; }
        .sns-btn { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--surface); border: 1px solid var(--border); color: var(--text); transition: all 0.2s; }
        .sns-btn:hover { background: var(--primary); color: white; transform: translateY(-3px); }

        /* Reservation Tab */
        .res-summary { background: var(--primary); color: white; border-radius: 20px; padding: 2rem; display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; position: relative; overflow: hidden; }
        .res-summary::before { content: ''; position: absolute; right: -50px; top: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; }
        
        .res-btn { background: white; color: var(--primary); padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 800; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .res-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }

        /* Lightbox */
        .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .lightbox-content { position: relative; max-width: 1000px; width: 100%; display: flex; background: var(--surface); border-radius: 8px; overflow: hidden; height: 80vh; }
        .lightbox-img { flex: 1.2; background: black; display: flex; align-items: center; justify-content: center; }
        .lightbox-img img { max-width: 100%; max-height: 100%; object-fit: contain; }
        .lightbox-info { flex: 0.8; display: flex; flex-direction: column; border-left: 1px solid var(--border); }
        
        @media (max-width: 768px) {
          .profile-header { flex-direction: column; align-items: center; gap: 2rem; text-align: center; }
          .info-top { justify-content: center; }
          .info-stats { justify-content: center; }
          .profile-tabs { gap: 1.5rem; }
          .gallery-grid { gap: 0.25rem; }
        }
      `}</style>

            {/* Profile Header */}
            <header className="profile-header">
                <div className="pfp-container">
                    <div className="pfp-circle">
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300" alt="Mina" className="pfp-img" />
                    </div>
                </div>
                <div className="profile-info">
                    <div className="info-top">
                        <h1 className="nickname">{profile.nickname}</h1>
                        <button className="edit-btn">프로필 수정</button>
                        <Edit2 size={18} className="text-muted cursor-pointer" />
                    </div>
                    <div className="info-stats">
                        <div className="stat-item"><span className="stat-val">{profile.likes}</span> 좋아요</div>
                        <div className="stat-item"><span className="stat-val">{profile.reservations}</span> 예약</div>
                    </div>
                    <div className="info-bio">
                        <span className="bio-name">Mina (미나) CCA</span>
                        <p>{profile.intro}</p>
                        <div className="affiliation-label">
                            <Sparkles size={14} /> {profile.affiliation} 소속
                        </div>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="profile-tabs">
                <div className={`tab-item ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
                    <Grid size={14} /> 게시물
                </div>
                <div className={`tab-item ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                    <Info size={14} /> 프로필 정보
                </div>
                <div className={`tab-item ${activeTab === 'reservation' ? 'active' : ''}`} onClick={() => setActiveTab('reservation')}>
                    <Calendar size={14} /> 예약 현황
                </div>
            </div>

            {/* Tab Content */}
            <main className="profile-main-content">
                {activeTab === 'gallery' && (
                    <div className="gallery-grid">
                        <div className="media-card add-media-card">
                            <Plus size={32} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>게시물 추가</span>
                        </div>
                        {galleryItems.map(item => (
                            <div key={item.id} className="media-card" onClick={() => setSelectedMedia(item.id)}>
                                <img src={item.url} alt={`Gallery ${item.id}`} />
                                <div className="media-overlay">
                                    <div className="media-stat"><Heart size={20} fill="currentColor" /> {item.likes}</div>
                                    <div className="media-stat"><MessageCircle size={20} fill="currentColor" /> {item.comments}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'info' && (
                    <div className="info-content">
                        <div className="info-section">
                            <h3 className="section-header"><Target size={18} /> 기본 정보</h3>
                            <div className="basic-info-grid">
                                <div className="stat-card">
                                    <span className="stat-label">나이</span>
                                    <span className="stat-value">{profile.stats.age}세</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">신장</span>
                                    <span className="stat-value">{profile.stats.height}cm</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">체중</span>
                                    <span className="stat-value">{profile.stats.weight}kg</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">MBTI</span>
                                    <span className="stat-value">{profile.stats.mbti}</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">별자리</span>
                                    <span className="stat-value">{profile.stats.zodiac}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-section">
                            <h3 className="section-header"><Sparkles size={18} /> 라이프스타일</h3>
                            <div className="lifestyle-list">
                                <div className="life-item">
                                    <span className="stat-label"><MessageCircle size={14} /> 연락 스타일</span>
                                    <span style={{ fontWeight: 600 }}>{profile.lifestyle.contact}</span>
                                </div>
                                <div className="life-item">
                                    <span className="stat-label"><Coffee size={14} /> 휴식 스타일</span>
                                    <span style={{ fontWeight: 600 }}>{profile.lifestyle.rest}</span>
                                </div>
                                <div className="life-item">
                                    <span className="stat-label"><Users size={14} /> 친구 관계</span>
                                    <span style={{ fontWeight: 600 }}>{profile.lifestyle.friends}</span>
                                </div>
                                <div className="life-item">
                                    <span className="stat-label"><Beer size={14} /> 주량</span>
                                    <span style={{ fontWeight: 600 }}>{profile.lifestyle.alcohol}</span>
                                </div>
                                <div className="life-item">
                                    <span className="stat-label"><Cigarette size={14} /> 흡연 여부</span>
                                    <span style={{ fontWeight: 600 }}>{profile.lifestyle.smoking}</span>
                                </div>
                                <div className="life-item">
                                    <span className="stat-label"><Dog size={14} /> 반려동물</span>
                                    <span style={{ fontWeight: 600 }}>{profile.lifestyle.pets}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-section">
                            <h3 className="section-header"><ExternalLink size={18} /> SNS 채널</h3>
                            <div className="sns-links">
                                <button className="sns-btn"><Instagram size={24} /></button>
                                <button className="sns-btn"><Twitter size={24} /></button>
                                <button className="sns-btn"><FacebookIcon size={24} /></button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reservation' && (
                    <div className="reservation-content">
                        <div className="res-summary">
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                                    <Clock size={16} /> 오늘의 예약 현황
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>오늘 총 3건의 예약</h2>
                                <p style={{ opacity: 0.8, marginTop: '0.5rem' }}>가장 가까운 예약: 오후 9:00 (VIP 고객님)</p>
                            </div>
                            <button className="res-btn" onClick={() => navigate('/cca/schedule')}>
                                예약 통합 관리 <ChevronRight size={20} />
                            </button>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            <div className="content-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ fontWeight: 800, marginBottom: '1rem' }}>예약 유지력 통계</h4>
                                <div style={{ height: '10px', background: 'var(--surface-alt)', borderRadius: '5px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                                    <div style={{ width: '92%', height: '100%', background: 'var(--primary)' }}></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span>예정대로 확정</span>
                                    <span style={{ fontWeight: 700 }}>92%</span>
                                </div>
                            </div>
                            <div className="content-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ fontWeight: 800, marginBottom: '1rem' }}>이번 주 활동 점수</h4>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>98</h2>
                                    <span style={{ paddingBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>/ 100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Lightbox Modal */}
            {selectedMedia && (
                <div className="lightbox" onClick={() => setSelectedMedia(null)}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <div className="lightbox-img">
                            <img src={galleryItems.find(i => i.id === selectedMedia)?.url} alt="Expanded" />
                        </div>
                        <div className="lightbox-info">
                            <div className="modal-header" style={{ borderBottom: '1px solid var(--border)', padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--surface-alt)' }}></div>
                                    <span style={{ fontWeight: 700 }}>{profile.nickname}</span>
                                </div>
                                <button className="btn btn-secondary icon-btn" onClick={() => setSelectedMedia(null)}><X size={20} /></button>
                            </div>
                            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                                <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{galleryItems.find(i => i.id === selectedMedia)?.desc}</p>
                                <div style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>1시간 전</div>
                            </div>
                            <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <Heart size={24} className="cursor-pointer" />
                                    <MessageCircle size={24} className="cursor-pointer" />
                                </div>
                                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>좋아요 {galleryItems.find(i => i.id === selectedMedia)?.likes}개</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Simple Facebook Icon Proxy
const FacebookIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

export default CCAProfile;
