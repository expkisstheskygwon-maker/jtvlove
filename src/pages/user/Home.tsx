import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    Star,
    MapPin,
    Heart,
    Eye,
    TrendingUp,
    Sparkles,
    ArrowRight,
    Store,
    MessageCircle
} from 'lucide-react';
import { ApiClient } from '../../utils/api';
import type { Partner, CCA } from '../../types';

const UserHome: React.FC = () => {
    const navigate = useNavigate();
    const [activeBanner, setActiveBanner] = useState(0);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [ccas, setCcas] = useState<CCA[]>([]);
    // Mock posts for now as API is not ready for posts
    const [posts] = useState([
        { id: 1, title: '마닐라 말라테 근처 깨끗한 JTV 추천 좀 해주세요!', author: '필핀여행자', date: '12분 전', views: 342, comments: 12 },
        { id: 2, title: '블루 JTV 어제 다녀왔는데 미나님 텐션 미쳤네요 ㅋㅋ', author: '밤의황제', date: '45분 전', views: 890, comments: 45 },
        { id: 3, title: '필리핀 입국 시 주의사항 정리해봤습니다. (2024년 최신)', author: '정보봇', date: '2시간 전', views: 2450, comments: 156 }
    ]);

    const banners = [
        { id: 1, title: '특별한 밤, 최고의 JTV와 함께', sub: '신규 회원 예약 시 첫 방문 10% 할인 이벤트 중', color: '#6366f1', image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2' },
        { id: 2, title: '검증된 CCA 프로필 실시간 확인', sub: '당신에게 딱 맞는 최고의 파트너를 찾아보세요', color: '#ec4899', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
        { id: 3, title: '2월의 인기 업체 컬렉션', sub: '회원들이 직접 선정한 마닐라 TOP 5 업체 대공개', color: '#f59e0b', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [partnersData, ccasData] = await Promise.all([
                    ApiClient.getPartners(),
                    ApiClient.getTopCCAs()
                ]);
                setPartners(partnersData.slice(0, 5));
                setCcas(ccasData.slice(0, 10));
            } catch (error) {
                console.error("Failed to fetch home data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveBanner(prev => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="user-home-view">
            <style>{`
                .user-home-view { display: flex; flex-direction: column; gap: 4rem; width: 100%; }
                
                /* Banner Section */
                .banner-slider { height: 400px; border-radius: 32px; overflow: hidden; position: relative; background: #0f172a; }
                .banner-item { position: absolute; inset: 0; opacity: 0; transition: opacity 0.8s ease-in-out; display: flex; align-items: center; padding: 0 4rem; }
                .banner-item.active { opacity: 1; }
                .banner-bg { position: absolute; inset: 0; object-fit: cover; opacity: 0.5; }
                .banner-content { position: relative; z-index: 10; max-width: 600px; color: white; }
                .banner-content h2 { font-size: 3rem; font-weight: 900; line-height: 1.2; margin-bottom: 1rem; }
                .banner-content p { font-size: 1.1rem; opacity: 0.9; margin-bottom: 2rem; }
                
                .banner-nav { position: absolute; bottom: 2rem; right: 4rem; display: flex; gap: 0.5rem; }
                .dot { width: 40px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; cursor: pointer; transition: background 0.3s; }
                .dot.active { background: white; }

                /* Section Styles */
                .section-title { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
                .section-title h3 { font-size: 1.75rem; font-weight: 900; display: flex; align-items: center; gap: 0.75rem; }
                .see-all { font-size: 0.95rem; font-weight: 700; color: var(--primary); cursor: pointer; display: flex; align-items: center; gap: 0.25rem; }

                /* Partner Cards */
                .partner-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.25rem; }
                .partner-card { background: white; border-radius: 24px; padding: 0.75rem; border: 1px solid var(--border); transition: all 0.3s; cursor: pointer; }
                .partner-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); border-color: var(--primary); }
                .partner-img { width: 100%; aspect-ratio: 4/3; border-radius: 18px; object-fit: cover; margin-bottom: 1rem; }
                .partner-info h4 { font-weight: 800; font-size: 1rem; margin-bottom: 0.4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .rating-line { display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; }
                .loc-line { display: flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; color: var(--text-muted); }

                /* CCA Grid */
                .cca-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.25rem; }
                .cca-card { position: relative; aspect-ratio: 1; border-radius: 20px; overflow: hidden; cursor: pointer; }
                .cca-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
                .cca-card:hover img { transform: scale(1.1); }
                .cca-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.25rem; color: white; }
                .cca-overlay h4 { font-weight: 800; font-size: 1.1rem; }
                .cca-overlay p { font-size: 0.8rem; opacity: 0.8; }
                .like-count { position: absolute; top: 1rem; right: 1rem; display: flex; align-items: center; gap: 0.25rem; background: rgba(0,0,0,0.5); padding: 0.25rem 0.6rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700; backdrop-filter: blur(4px); }

                /* Community List */
                .post-item { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; background: white; border: 1px solid var(--border); border-radius: 20px; transition: all 0.2s; cursor: pointer; margin-bottom: 1rem; }
                .post-item:hover { border-color: var(--primary); background: rgba(99, 102, 241, 0.02); }
                .post-main { display: flex; flex-direction: column; gap: 0.4rem; }
                .post-title { font-weight: 800; font-size: 1.05rem; }
                .post-meta { display: flex; items: center; gap: 1rem; font-size: 0.85rem; color: var(--text-muted); }

                @media (max-width: 1200px) {
                  .partner-grid, .cca-grid { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 768px) {
                  .banner-slider { height: 300px; padding: 0 2rem; }
                  .banner-content h2 { font-size: 2rem; }
                  .partner-grid, .cca-grid { grid-template-columns: repeat(2, 1fr); }
                }
            `}</style>

            {/* Banner Slider */}
            <section className="banner-slider">
                {banners.map((banner, idx) => (
                    <div key={banner.id} className={`banner-item ${activeBanner === idx ? 'active' : ''}`}>
                        <img src={banner.image} alt="" className="banner-bg" />
                        <div className="banner-content">
                            <h2>{banner.title}</h2>
                            <p>{banner.sub}</p>
                            <button className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 800 }}>지금 예약하기</button>
                        </div>
                    </div>
                ))}
                <div className="banner-nav">
                    {banners.map((_, idx) => (
                        <div key={idx} className={`dot ${activeBanner === idx ? 'active' : ''}`} onClick={() => setActiveBanner(idx)} />
                    ))}
                </div>
            </section>

            {/* Recommended Partners */}
            <section>
                <div className="section-title">
                    <h3><Store className="text-primary" /> 추천 업체 TOP 5</h3>
                    <div className="see-all" onClick={() => navigate('/partners')}>전체 업체 보기 <ChevronRight size={18} /></div>
                </div>
                <div className="partner-grid">
                    {partners.map(p => (
                        <div key={p.id} className="partner-card" onClick={() => navigate(`/partners/${p.id}`)}>
                            <img src={p.image_url || p.image} alt={p.name} className="partner-img" />
                            <div className="partner-info">
                                <h4>{p.name}</h4>
                                <div className="rating-line">
                                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                                    <span>{p.rating}</span>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.75rem' }}>({p.review_count || p.reviews})</span>
                                </div>
                                <div className="loc-line">
                                    <MapPin size={14} />
                                    {p.location}
                                </div>
                                <p style={{ fontSize: '0.8rem', marginTop: '0.75rem', lineHeight: '1.4', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.intro}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recommended CCA */}
            <section>
                <div className="section-title">
                    <h3><Sparkles className="text-primary" /> 인기 CCA TOP 10</h3>
                    <div className="see-all" onClick={() => navigate('/cca-list')}>실시간 CCA 리스트 <ChevronRight size={18} /></div>
                </div>
                <div className="cca-grid">
                    {ccas.map(cca => (
                        <div key={cca.id} className="cca-card" onClick={() => navigate(`/cca/${cca.id}`)}>
                            <img src={cca.image_url || cca.image} alt={cca.name} />
                            <div className="cca-overlay">
                                <div className="like-count"><Heart size={12} fill="white" /> {cca.likes}</div>
                                <h4>{cca.name}</h4>
                                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{cca.partner_name}</div>
                                <p>{cca.age}세 · {cca.height}cm</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Community Activity */}
            <section>
                <div className="section-title">
                    <h3><TrendingUp className="text-primary" /> 커뮤니티 트렌드</h3>
                    <div className="see-all" onClick={() => navigate('/community')}>자유게시판 바로가기 <ChevronRight size={18} /></div>
                </div>
                <div className="community-list">
                    {posts.map(post => (
                        <div key={post.id} className="post-item">
                            <div className="post-main">
                                <span className="post-title">{post.title}</span>
                                <div className="post-meta">
                                    <span>{post.author}</span>
                                    <span>{post.date}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Eye size={16} /> {post.views}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MessageCircle size={16} /> {post.comments}</span>
                                    </div>
                                </div>
                            </div>
                            <ArrowRight size={20} className="text-muted" style={{ marginLeft: '2rem' }} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UserHome;
