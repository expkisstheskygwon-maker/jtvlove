import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Heart,
    Calendar,
    Info,
    Image as ImageIcon,
    Share2,
    MessageCircle,
    User,
    ShieldCheck,
    Clock,
    Play
} from 'lucide-react';

const CCAProfileView: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'gallery' | 'info'>('gallery');
    const [isFollowing, setIsFollowing] = useState(false);

    // Mock data for public profile
    const cca = {
        id: id,
        name: '미나',
        partner: '블루 JTV (Blue JTV)',
        age: 23,
        height: 165,
        grade: 'S-Class',
        intro: '안녕하세요! 말라테의 해피 바이러스 미나입니다. 즐거운 대화와 완벽한 케어로 잊지 못할 밤을 선물해 드릴게요. ♥',
        followers: 1240,
        reservations: 450,
        mainImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
        gallery: [
            { id: 1, type: 'photo', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', likes: 245, comments: 12 },
            { id: 2, type: 'photo', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', likes: 189, comments: 8 },
            { id: 3, type: 'video', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', likes: 560, comments: 45 },
            { id: 4, type: 'photo', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', likes: 120, comments: 5 },
            { id: 5, type: 'photo', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', likes: 300, comments: 21 },
            { id: 6, type: 'photo', url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df', likes: 156, comments: 14 }
        ],
        basicInfo: {
            languages: '한국어 (유창), 영어, 타갈로그어',
            horoscope: '사자자리',
            mbti: 'ENFP',
            hobby: '골프, 맛집 탐방, 영화 감상'
        }
    };

    return (
        <div className="cca-profile-container">
            <style>{`
                .cca-profile-container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 2.5rem; padding-bottom: 5rem; }
                
                /* Profile Header */
                .profile-header { display: flex; gap: 3rem; background: white; border: 1px solid var(--border); border-radius: 32px; padding: 3rem; align-items: center; }
                .pfp-wrap { position: relative; width: 180px; height: 180px; border-radius: 50%; padding: 6px; background: linear-gradient(45deg, #6366f1, #ec4899); flex-shrink: 0; }
                .pfp-inner { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; border: 4px solid white; }
                .pfp-inner img { width: 100%; height: 100%; object-fit: cover; }
                
                .profile-main-info { flex: 1; }
                .name-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
                .name-row h1 { font-size: 2rem; font-weight: 950; }
                .grade-tag { padding: 0.25rem 0.75rem; background: rgba(99, 102, 241, 0.1); color: var(--primary); border-radius: 8px; font-weight: 800; font-size: 0.8rem; }
                
                .partner-row { color: var(--text-muted); font-weight: 700; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; }
                
                .stats-row { display: flex; gap: 2rem; margin-bottom: 2rem; }
                .stat-item { display: flex; flex-direction: column; }
                .stat-value { font-size: 1.25rem; font-weight: 900; }
                .stat-label { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }

                .action-btns { display: flex; gap: 1rem; }

                /* Mobile Trigger Section */
                .sticky-cta { position: sticky; top: 80px; z-index: 100; display: flex; align-items: center; justify-content: space-between; background: white; border: 1px solid var(--border); padding: 1.25rem 2rem; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }

                /* Tabs Section */
                .tabs-nav { display: flex; border-bottom: 1px solid var(--border); }
                .tab-trigger { padding: 1rem 2rem; border: none; background: transparent; font-weight: 800; color: var(--text-muted); cursor: pointer; position: relative; display: flex; align-items: center; gap: 0.5rem; }
                .tab-trigger.active { color: var(--text); }
                .tab-trigger.active::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 3px; background: var(--text); border-radius: 3px 3px 0 0; }

                .tab-content { padding-top: 2rem; }
                
                /* Gallery Grid */
                .p-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
                .p-gallery-item { position: relative; aspect-ratio: 1; border-radius: 12px; overflow: hidden; cursor: pointer; }
                .p-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
                .p-gallery-item:hover img { transform: scale(1.1); }
                .p-gallery-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s; display: flex; align-items: center; justify-content: center; gap: 1.5rem; color: white; font-weight: 800; }
                .p-gallery-item:hover .p-gallery-overlay { opacity: 1; }

                /* Info List */
                .info-list { display: flex; flex-direction: column; gap: 2rem; }
                .info-section h3 { font-size: 1.1rem; font-weight: 900; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
                .info-grid-simple { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; background: var(--surface-alt); padding: 2rem; border-radius: 24px; }
                .info-field { display: flex; flex-direction: column; gap: 0.25rem; }
                .field-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 700; }
                .field-value { font-weight: 800; }

                @media (max-width: 768px) {
                    .profile-header { flex-direction: column; text-align: center; padding: 2rem; }
                    .stats-row { justify-content: center; }
                    .action-btns { justify-content: center; }
                    .p-gallery-grid { grid-template-columns: repeat(2, 1fr); }
                    .sticky-cta { flex-direction: column; gap: 1rem; text-align: center; }
                }
            `}</style>

            <header className="profile-header">
                <div className="pfp-wrap">
                    <div className="pfp-inner">
                        <img src={cca.mainImage} alt={cca.name} />
                    </div>
                </div>
                <div className="profile-main-info">
                    <div className="name-row">
                        <h1>{cca.name}</h1>
                        <span className="grade-tag">{cca.grade}</span>
                        <ShieldCheck size={20} className="text-success" />
                    </div>
                    <div className="partner-row">
                        {cca.partner}
                    </div>
                    <div className="stats-row">
                        <div className="stat-item">
                            <span className="stat-value">{cca.followers.toLocaleString()}</span>
                            <span className="stat-label">팔로워</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{cca.reservations.toLocaleString()}</span>
                            <span className="stat-label">누적 예약</span>
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem', fontWeight: 600 }}>
                        {cca.intro}
                    </p>
                    <div className="action-btns">
                        <button
                            className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
                            style={{ flex: 1, fontWeight: 800, padding: '0.85rem' }}
                            onClick={() => setIsFollowing(!isFollowing)}
                        >
                            {isFollowing ? '팔로잉' : '팔로우'}
                        </button>
                        <button className="btn btn-secondary icon-btn" style={{ padding: '0.85rem' }}><Share2 size={20} /></button>
                    </div>
                </div>
            </header>

            <div className="sticky-cta">
                <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>지금 이 CCA에게</span>
                    <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>직접 예약을 신청해보세요!</div>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontWeight: 900 }} onClick={() => navigate('/reservations/new')}>
                    <Calendar size={18} /> 예약하기
                </button>
            </div>

            <section className="tabs-container">
                <nav className="tabs-nav">
                    <button className={`tab-trigger ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
                        <ImageIcon size={18} /> 갤러리
                    </button>
                    <button className={`tab-trigger ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                        <Info size={18} /> 상세 정보
                    </button>
                </nav>

                <div className="tab-content">
                    {activeTab === 'gallery' && (
                        <div className="p-gallery-grid">
                            {cca.gallery.map(item => (
                                <div key={item.id} className="p-gallery-item">
                                    <img src={item.type === 'video' ? item.thumbnail : item.url} alt="" />
                                    {item.type === 'video' && <Play fill="white" size={32} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }} />}
                                    <div className="p-gallery-overlay">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Heart size={18} fill="white" /> {item.likes}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MessageCircle size={18} fill="white" /> {item.comments}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'info' && (
                        <div className="info-list">
                            <div className="info-section">
                                <h3><User size={18} className="text-primary" /> 기본 프로필</h3>
                                <div className="info-grid-simple">
                                    <div className="info-field">
                                        <span className="field-label">나이</span>
                                        <span className="field-value">{cca.age}세</span>
                                    </div>
                                    <div className="info-field">
                                        <span className="field-label">신장</span>
                                        <span className="field-value">{cca.height}cm</span>
                                    </div>
                                    <div className="info-field">
                                        <span className="field-label">사용 가능 언어</span>
                                        <span className="field-value">{cca.basicInfo.languages}</span>
                                    </div>
                                    <div className="info-field">
                                        <span className="field-label">MBTI</span>
                                        <span className="field-value">{cca.basicInfo.mbti}</span>
                                    </div>
                                    <div className="info-field">
                                        <span className="field-label">별자리</span>
                                        <span className="field-value">{cca.basicInfo.horoscope}</span>
                                    </div>
                                    <div className="info-field">
                                        <span className="field-label">취미</span>
                                        <span className="field-value">{cca.basicInfo.hobby}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3><Clock size={18} className="text-primary" /> 자기소개</h3>
                                <div style={{ background: 'var(--surface-alt)', padding: '2rem', borderRadius: '24px', lineHeight: '1.8', color: 'var(--text-muted)', fontWeight: 600 }}>
                                    {cca.intro} 팬분들과의 소통을 중요하게 생각합니다. 언제든 편하게 말 걸어주세요!
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CCAProfileView;
