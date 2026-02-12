import React from 'react';
import {
    Calendar,
    Star,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    Heart,
    Eye,
    Share2,
    Clock,
    MessageSquare
} from 'lucide-react';

const CCAStatistics: React.FC = () => {
    // Mock Data
    const stats = {
        reservations: {
            total: 324,
            thisMonth: 42,
            avgRating: 4.86,
            confirmationRate: 92.5,
            cancellationRate: 5.2,
            noShowRate: 2.3
        },
        popularity: {
            profileViews: { daily: 145, weekly: 890, monthly: 3400 },
            likes: 1240,
            followers: 856,
            shares: 128
        },
        reviews: [
            { id: '1', user: 'James W.', rating: 5, comment: '항상 밝은 에너지로 맞이해주셔서 감사합니다! 대화가 너무 즐거웠어요.', date: '2024-02-11' },
            { id: '2', user: '이민수', rating: 5, comment: '예약 시간 철저하고 매너가 정말 좋으세요. 강력 추천합니다.', date: '2024-02-10' },
            { id: '3', user: 'Robert K.', rating: 4, comment: '노래 실력이 대단하시네요. 즐거운 시간이었습니다.', date: '2024-02-09' },
            { id: '4', user: '김태호', rating: 5, comment: '처음 뵈었는데 편안하게 분위기 이끌어주셔서 감사했어요.', date: '2024-02-08' },
            { id: '5', user: 'Park S.', rating: 5, comment: '최고의 CCA입니다. 다음에 또 예약할게요!', date: '2024-02-07' }
        ],
        ratingDistribution: [
            { stars: 5, count: 280 },
            { stars: 4, count: 32 },
            { stars: 3, count: 8 },
            { stars: 2, count: 3 },
            { stars: 1, count: 1 }
        ],
        monthlyTrend: [45, 52, 38, 65, 48, 42, 58, 62, 55, 78, 85, 92],
        hourlyDistribution: [
            { hour: '18시', count: 12 },
            { hour: '19시', count: 25 },
            { hour: '20시', count: 42 },
            { hour: '21시', count: 58 },
            { hour: '22시', count: 65 },
            { hour: '23시', count: 72 },
            { hour: '00시', count: 48 },
            { hour: '01시', count: 22 }
        ]
    };

    return (
        <div className="cca-stats-container">
            <style>{`
        .cca-stats-container { display: flex; flex-direction: column; gap: 2rem; padding-bottom: 2rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
        
        .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; transition: transform 0.2s, box-shadow 0.2s; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        
        .card-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .icon-blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .icon-purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        .icon-orange { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .icon-pink { background: rgba(236, 72, 153, 0.1); color: #ec4899; }
        
        .stat-value { font-size: 1.75rem; font-weight: 900; margin-bottom: 0.25rem; }
        .stat-label { font-size: 0.85rem; color: var(--text-muted); font-weight: 700; }
        .stat-trend { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 600; margin-top: 0.5rem; }
        .trend-up { color: #10b981; }
        .trend-down { color: #ef4444; }

        .charts-section { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .chart-box { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
        
        /* Custom Line Chart Mock-up */
        .line-chart-container { height: 200px; display: flex; align-items: flex-end; gap: 0.5rem; padding-top: 1rem; }
        .bar-chart-container { height: 200px; display: flex; align-items: flex-end; justify-content: space-between; padding-top: 1rem; }
        
        .bar-item { flex: 1; background: var(--primary); border-radius: 4px 4px 0 0; position: relative; min-width: 20px; transition: height 1s; opacity: 0.8; }
        .bar-item:hover { opacity: 1; filter: brightness(1.2); }
        .bar-label { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 0.65rem; color: var(--text-muted); white-space: nowrap; }

        .rate-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
        .rate-circle { position: relative; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; border: 4px solid var(--border); }
        
        .review-item { display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 0; border-bottom: 1px solid var(--border); }
        .review-item:last-child { border-bottom: none; }
        
        .star-rating { color: #f59e0b; display: flex; gap: 2px; }
        
        .dist-bar-container { flex: 1; height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
        .dist-bar-fill { height: 100%; background: #f59e0b; }

        @media (max-width: 1024px) {
          .charts-section { grid-template-columns: 1fr; }
        }
      `}</style>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 900 }}>나의 활동 통계</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>나의 성과와 인기도를 실시간으로 모니터링하세요.</p>
                </div>
                <div className="badge badge-primary">실시간 데이터</div>
            </div>

            {/* Main Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="card-icon icon-blue"><Calendar size={24} /></div>
                    <div className="stat-label">총 예약 건수</div>
                    <div className="stat-value">{stats.reservations.total.toLocaleString()}건</div>
                    <div className="stat-trend trend-up"><ArrowUpRight size={14} /> 지난달 대비 12%</div>
                </div>
                <div className="stat-card">
                    <div className="card-icon icon-purple"><Star size={24} /></div>
                    <div className="stat-label">평균 평점</div>
                    <div className="stat-value">{stats.reservations.avgRating}</div>
                    <div className="stat-trend trend-up"><ArrowUpRight size={14} /> 0.2p 상승</div>
                </div>
                <div className="stat-card">
                    <div className="card-icon icon-pink"><Heart size={24} /></div>
                    <div className="stat-label">팔로워 수</div>
                    <div className="stat-value">{stats.popularity.followers.toLocaleString()}명</div>
                    <div className="stat-trend trend-up"><ArrowUpRight size={14} /> 신규 24명</div>
                </div>
                <div className="stat-card">
                    <div className="card-icon icon-orange"><Eye size={24} /></div>
                    <div className="stat-label">누적 조회수</div>
                    <div className="stat-value">{stats.popularity.profileViews.monthly.toLocaleString()}회</div>
                    <div className="stat-trend trend-down"><ArrowDownRight size={14} /> 5% 감소</div>
                </div>
            </div>

            <div className="charts-section">
                {/* Reservation Analysis */}
                <div className="chart-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: 800 }}>월별 예약 추이</h3>
                        <TrendingUp size={18} className="text-muted" />
                    </div>
                    <div className="line-chart-container" style={{ position: 'relative' }}>
                        {/* Simple SVG for Line Chart Area */}
                        <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                            <path
                                d="M0,15 L10,12 L20,16 L30,5 L40,14 L50,17 L60,10 L70,8 L80,11 L90,4 L100,2"
                                fill="none"
                                stroke="var(--primary)"
                                strokeWidth="0.5"
                            />
                            <path
                                d="M0,15 L10,12 L20,16 L30,5 L40,14 L50,17 L60,10 L70,8 L80,11 L90,4 L100,2 L100,20 L0,20 Z"
                                fill="url(#grad)"
                                opacity="0.1"
                            />
                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--primary)" />
                                    <stop offset="100%" stopColor="white" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div style={{ position: 'absolute', bottom: '-20px', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
                            {['1월', '3월', '5월', '7월', '9월', '11월'].map(m => (
                                <span key={m} style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{m}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '1rem' }}>예약 건전성 통계</h4>
                        <div className="rate-grid">
                            <div style={{ textAlign: 'center' }}>
                                <div className="rate-circle" style={{ borderColor: '#10b981', color: '#10b981' }}>{stats.reservations.confirmationRate}%</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, marginTop: '0.5rem' }}>확정율</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div className="rate-circle" style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>{stats.reservations.cancellationRate}%</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, marginTop: '0.5rem' }}>취소율</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div className="rate-circle" style={{ borderColor: '#ef4444', color: '#ef4444' }}>{stats.reservations.noShowRate}%</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, marginTop: '0.5rem' }}>노쇼율</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popularity & Feedback */}
                <div className="chart-box" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>예약 집중 시간대</h3>
                        <div className="bar-chart-container">
                            {stats.hourlyDistribution.map(item => (
                                <div key={item.hour} className="bar-item" style={{ height: `${(item.count / 80) * 100}%` }}>
                                    <span className="bar-label">{item.hour}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>인기도 요약</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700 }}>
                                    <Heart size={16} className="text-danger" fill="#ef4444" /> 누적 좋아요
                                </div>
                                <span style={{ fontWeight: 800 }}>{stats.popularity.likes.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700 }}>
                                    <Share2 size={16} className="text-primary" /> 미디어 공유
                                </div>
                                <span style={{ fontWeight: 800 }}>{stats.popularity.shares.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700 }}>
                                    <Clock size={16} className="text-muted" /> 주간 조회수
                                </div>
                                <span style={{ fontWeight: 800 }}>{stats.popularity.profileViews.weekly.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-section">
                {/* Recent Reviews */}
                <div className="chart-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: 800 }}>최근 리뷰 (TOP 5)</h3>
                        <MessageSquare size={18} className="text-muted" />
                    </div>
                    <div className="review-list">
                        {stats.reviews.map(review => (
                            <div key={review.id} className="review-item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{review.user}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{review.date}</span>
                                </div>
                                <div className="star-rating">
                                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill={i < review.rating ? '#f59e0b' : 'none'} style={{ color: i < review.rating ? '#f59e0b' : 'var(--border)' }} />)}
                                </div>
                                <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rating Distribution */}
                <div className="chart-box">
                    <h3 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>평점 분포</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stats.ratingDistribution.map(dist => (
                            <div key={dist.stars} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ minWidth: '30px', fontSize: '0.85rem', fontWeight: 700 }}>{dist.stars}점</span>
                                <div className="dist-bar-container">
                                    <div className="dist-bar-fill" style={{ width: `${(dist.count / 280) * 100}%` }}></div>
                                </div>
                                <span style={{ minWidth: '40px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>{dist.count}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f59e0b' }}>{stats.reservations.avgRating}</div>
                        <div className="star-rating" style={{ justifyContent: 'center', margin: '0.5rem 0' }}>
                            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill={i < 4 ? '#f59e0b' : 'none'} style={{ color: '#f59e0b' }} />)}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>전체 {stats.reservations.total}건의 리뷰 기반</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CCAStatistics;
