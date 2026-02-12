import React, { useState } from 'react';
import {
    Calendar,
    Download,
    TrendingUp,
    Clock,
    UserCheck,
    UserMinus,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const PartnerStatistics: React.FC = () => {
    const [activeRange, setActiveRange] = useState('30days');
    const [activeTab, setActiveTab] = useState<'reservation' | 'cca' | 'customer' | 'sales'>('reservation');

    // Mock Data
    const statsSummary = [
        { label: '총 예약', value: '1,248', trend: '+12.5%', isUp: true, icon: <Calendar className="text-primary" /> },
        { label: '확정율', value: '88.2%', trend: '+2.1%', isUp: true, icon: <UserCheck className="text-success" /> },
        { label: '취소율', value: '7.4%', trend: '-1.5%', isUp: false, icon: <UserMinus className="text-danger" /> },
        { label: '총 매출', value: '₩ 42.5M', trend: '+8.4%', isUp: true, icon: <DollarSign className="text-warning" /> }
    ];

    const ccaRanking = [
        { name: '미나', grade: 'ACE', count: 452, rating: 4.9, cancelRate: '2.1%' },
        { name: '제니', grade: 'ACE', count: 412, rating: 5.0, cancelRate: '1.8%' },
        { name: '지수', grade: 'PRO', count: 231, rating: 4.7, cancelRate: '4.5%' },
        { name: '사나', grade: 'CUTE', count: 189, rating: 4.5, cancelRate: '5.2%' },
        { name: '모모', grade: 'PRO', count: 156, rating: 4.8, cancelRate: '3.1%' },
    ];

    const hourlyDistribution = [
        { hour: '19시', count: 45 },
        { hour: '20시', count: 78 },
        { hour: '21시', count: 124 },
        { hour: '22시', count: 96 },
        { hour: '23시', count: 62 },
        { hour: '00시', count: 34 }
    ];

    const dayOfWeekDistribution = [
        { day: '월', count: 45 },
        { day: '화', count: 52 },
        { day: '수', count: 68 },
        { day: '목', count: 84 },
        { day: '금', count: 142 },
        { day: '토', count: 156 },
        { day: '일', count: 98 }
    ];

    return (
        <div className="stats-view">
            <style>{`
        .stats-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .stats-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.5rem; }
        
        .range-selector { display: flex; background: var(--surface-alt); padding: 0.25rem; border-radius: 12px; border: 1px solid var(--border); }
        .range-btn { padding: 0.5rem 1rem; border-radius: 10px; border: none; background: transparent; color: var(--text-muted); font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .range-btn.active { background: var(--surface); color: var(--text); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }

        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
        .summary-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; position: relative; overflow: hidden; }
        .summary-card::after { content: ''; position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent 70%); }
        
        .card-top { display: flex; justify-content: space-between; align-items: center; }
        .icon-box { width: 44px; height: 44px; border-radius: 14px; background: var(--surface-alt); display: flex; align-items: center; justify-content: center; }
        
        .val-row { display: flex; align-items: flex-end; gap: 0.5rem; }
        .trend-tag { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 6px; }
        .trend-up { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
        .trend-down { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .chart-container { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
        .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        
        .bar-chart { display: flex; align-items: flex-end; gap: 1rem; height: 200px; padding-top: 2rem; position: relative; }
        .bar-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
        .bar-pillar { width: 100%; max-width: 40px; border-radius: 8px 8px 4px 4px; background: linear-gradient(to top, var(--primary), #818cf8); position: relative; transition: all 0.3s; }
        .bar-pillar:hover { filter: brightness(1.2); transform: scaleX(1.1); }
        .bar-pillar::after { content: attr(data-value); position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; font-weight: 700; color: var(--text-muted); opacity: 0; transition: opacity 0.2s; }
        .bar-pillar:hover::after { opacity: 1; }
        
        .tab-nav { display: flex; gap: 0.5rem; margin-bottom: 1rem; overflow-x: auto; padding-bottom: 0.5rem; }
        .nav-item { padding: 0.75rem 1.25rem; border-radius: 12px; background: var(--surface-alt); color: var(--text-muted); font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.2s; border: 1px solid var(--border); }
        .nav-item.active { background: var(--primary); color: white; border-color: var(--primary); }

        .rank-table { width: 100%; border-collapse: collapse; }
        .rank-table th { text-align: left; padding: 1rem; border-bottom: 1px solid var(--border); font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; }
        .rank-table td { padding: 1.25rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.95rem; }

        .progress-circle { width: 120px; height: 120px; border-radius: 50%; background: conic-gradient(var(--primary) 70%, var(--surface-alt) 0); display: flex; align-items: center; justify-content: center; position: relative; }
        .progress-circle::after { content: ''; position: absolute; width: 90px; height: 90px; border-radius: 50%; background: var(--surface); }
        .progress-text { position: relative; z-index: 10; font-weight: 800; font-size: 1.25rem; }

        @media (max-width: 768px) {
          .summary-grid { grid-template-columns: 1fr; }
          .chart-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .bar-pillar { max-width: 20px; }
        }
      `}</style>

            <div className="stats-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>통계 및 인사이트</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>업체의 성과를 분석하고 성장 전략을 수립하세요.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div className="range-selector">
                        <button className={`range-btn ${activeRange === '7days' ? 'active' : ''}`} onClick={() => setActiveRange('7days')}>7일</button>
                        <button className={`range-btn ${activeRange === '30days' ? 'active' : ''}`} onClick={() => setActiveRange('30days')}>30일</button>
                        <button className={`range-btn ${activeRange === 'custom' ? 'active' : ''}`} onClick={() => setActiveRange('custom')}>사용자 정의</button>
                    </div>
                    <button className="btn btn-primary"><Download size={18} /> 엑셀 다운로드</button>
                </div>
            </div>

            <div className="summary-grid">
                {statsSummary.map((stat, i) => (
                    <div key={i} className="summary-card">
                        <div className="card-top">
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</span>
                            <div className="icon-box">{stat.icon}</div>
                        </div>
                        <div className="val-row">
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 900 }}>{stat.value}</h2>
                            <div className={`trend-tag ${stat.isUp ? 'trend-up' : 'trend-down'}`}>
                                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.trend}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav className="tab-nav">
                <div className={`nav-item ${activeTab === 'reservation' ? 'active' : ''}`} onClick={() => setActiveTab('reservation')}>예약 추이/분석</div>
                <div className={`nav-item ${activeTab === 'cca' ? 'active' : ''}`} onClick={() => setActiveTab('cca')}>CCA 퍼포먼스</div>
                <div className={`nav-item ${activeTab === 'customer' ? 'active' : ''}`} onClick={() => setActiveTab('customer')}>고객 생태계</div>
                <div className={`nav-item ${activeTab === 'sales' ? 'active' : ''}`} onClick={() => setActiveTab('sales')}>매출 통계</div>
            </nav>

            {activeTab === 'reservation' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="chart-container">
                        <div className="chart-header">
                            <div>
                                <h3 style={{ fontWeight: 800 }}>시간대별 예약 분포</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>가장 바쁜 시간대를 확인하세요.</p>
                            </div>
                            <div style={{ padding: '0.5rem 1rem', borderRadius: '10px', background: 'var(--surface-alt)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                <Clock size={16} /> <span>피크 타임: 21:00</span>
                            </div>
                        </div>
                        <div className="bar-chart">
                            {hourlyDistribution.map((d, i) => (
                                <div key={i} className="bar-item">
                                    <div className="bar-pillar" data-value={d.count} style={{ height: `${(d.count / 130) * 100}%` }}></div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{d.hour}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chart-container">
                        <div className="chart-header">
                            <div>
                                <h3 style={{ fontWeight: 800 }}>요일별 예약 비중</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>주말과 평일의 수요 격차를 파악합니다.</p>
                            </div>
                        </div>
                        <div className="bar-chart">
                            {dayOfWeekDistribution.map((d, i) => (
                                <div key={i} className="bar-item">
                                    <div className="bar-pillar" data-value={d.count} style={{ height: `${(d.count / 160) * 100}%`, background: d.day === '금' || d.day === '토' ? 'linear-gradient(to top, #ef4444, #f87171)' : 'linear-gradient(to top, var(--primary), #818cf8)' }}></div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{d.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'cca' && (
                <div className="chart-container" style={{ padding: '0' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ fontWeight: 800 }}>CCA별 성과 통합 리포트</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>활동량, 평점, 예약 유지력을 기반으로 한 순위입니다.</p>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="rank-table">
                            <thead>
                                <tr>
                                    <th>순위</th>
                                    <th>CCA 명</th>
                                    <th>등급</th>
                                    <th>총 예약</th>
                                    <th>평점</th>
                                    <th>취소율</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ccaRanking.map((cca, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 800, color: i < 3 ? 'var(--primary)' : 'inherit' }}>{i + 1}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--surface-alt)' }}></div>
                                                <span style={{ fontWeight: 700 }}>{cca.name}</span>
                                            </div>
                                        </td>
                                        <td><span className={`badge ${cca.grade === 'ACE' ? 'badge-primary' : 'badge-secondary'}`}>{cca.grade}</span></td>
                                        <td style={{ fontWeight: 700 }}>{cca.count}건</td>
                                        <td><span style={{ color: '#fbbf24', fontWeight: 700 }}>★ {cca.rating}</span></td>
                                        <td style={{ color: '#ef4444' }}>{cca.cancelRate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'customer' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div className="chart-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                        <h3 style={{ width: '100%', fontWeight: 800 }}>신규 vs 재방문 비율</h3>
                        <div className="progress-circle">
                            <div className="progress-text">72%</div>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--primary)' }}></div>
                                <span style={{ fontSize: '0.85rem' }}>재방문 고객 (72%)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--surface-alt)' }}></div>
                                <span style={{ fontSize: '0.85rem' }}>신규 고객 (28%)</span>
                            </div>
                        </div>
                    </div>

                    <div className="chart-container">
                        <h3 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>고객 등급 분포</h3>
                        {['VIP', 'Excellent', 'Normal', 'Caution'].map((g, i) => (
                            <div key={g} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                                    <span style={{ fontWeight: 600 }}>{g}</span>
                                    <span style={{ color: 'var(--text-muted)' }}>{25 - i * 5}%</span>
                                </div>
                                <div style={{ height: '8px', background: 'var(--surface-alt)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${25 - i * 5}%`, height: '100%', background: i === 0 ? '#fbbf24' : 'var(--primary)', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'sales' && (
                <div className="chart-container">
                    <div className="chart-header">
                        <div>
                            <h3 style={{ fontWeight: 800 }}>매출 성과 분석</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>최근 30일간의 수익 변동 추이입니다.</p>
                        </div>
                        <h2 style={{ fontWeight: 900, color: 'var(--primary)' }}>₩ 42,520,000</h2>
                    </div>
                    <div style={{ height: '150px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '16px', border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={48} className="text-muted" style={{ opacity: 0.3 }} />
                        <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>차트 데이터를 불러오는 중...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerStatistics;
