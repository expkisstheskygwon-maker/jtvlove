import React, { useState } from 'react';
import {
    BarChart3,
    TrendingUp,
    Users,
    Calendar,
    DollarSign,
    PieChart,
    Download,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    UserCheck,
    UserMinus,
    MessageSquare,
    AlertCircle,
    Clock,
    ExternalLink,
    Map,
    ShoppingBag,
    CreditCard,
    Search,
    FileText
} from 'lucide-react';

type StatsTab = 'dashboard' | 'reservations' | 'members' | 'revenue' | 'community' | 'export';

const Statistics: React.FC = () => {
    const [activeTab, setActiveTab] = useState<StatsTab>('dashboard');
    const [dateRange, setDateRange] = useState('30days');

    // Simple Badge Component
    const Badge = ({ children, color }: { children: React.ReactNode, color: string }) => (
        <span style={{
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 700,
            background: `rgba(${color}, 0.1)`,
            color: `rgb(${color})`
        }}>{children}</span>
    );

    return (
        <div className="stats-view">
            <style>{`
        .stats-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .view-header { display: flex; justify-content: space-between; align-items: flex-end; }
        
        .tab-container { display: flex; gap: 2rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; }
        .tab { padding: 0.75rem 0.5rem; cursor: pointer; color: var(--text-muted); font-weight: 500; font-size: 0.9375rem; position: relative; transition: all 0.2s; }
        .tab.active { color: var(--primary); font-weight: 700; }
        .tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: var(--primary); }

        .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .input-box { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 0.5rem 0.75rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text); }
        .input-box select { background: transparent; border: none; color: inherit; outline: none; cursor: pointer; }

        .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .sum-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .sum-label { font-size: 0.875rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; }
        .sum-value { font-size: 1.75rem; font-weight: 800; color: var(--text); }
        .sum-trend { font-size: 0.75rem; display: flex; align-items: center; gap: 0.25rem; }
        .sum-trend.up { color: #10b981; }
        .sum-trend.down { color: #ef4444; }

        .chart-row { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .chart-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; }
        .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .chart-title { font-size: 1rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; }

        .data-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        .data-table th { padding: 1rem; text-align: left; color: var(--text-muted); border-bottom: 1px solid var(--border); font-weight: 600; }
        .data-table td { padding: 1rem; border-bottom: 1px solid var(--border); }
        
        .progress-bar { height: 8px; background: var(--surface-alt); border-radius: 4px; overflow: hidden; margin-top: 0.5rem; }
        .progress-fill { height: 100%; background: var(--primary); border-radius: 4px; }

        .export-section { display: flex; flex-direction: column; gap: 2rem; max-width: 600px; margin: 0 auto; padding: 2rem; background: var(--surface-alt); border-radius: 24px; border: 1px dashed var(--border); text-align: center; }
        .check-group { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; text-align: left; margin: 1rem 0; }
        .check-item { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; cursor: pointer; }
      `}</style>

            <div className="view-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>통계 및 성과 분석</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>플랫폼의 주요 지표와 리포트를 실시간으로 분석합니다.</p>
                </div>
                <div className="toolbar">
                    <div className="input-box">
                        <Filter size={16} className="text-muted" />
                        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                            <option value="7days">최근 7일</option>
                            <option value="30days">최근 30일 (기본)</option>
                            <option value="90days">최근 90일</option>
                            <option value="custom">직접 선택</option>
                        </select>
                    </div>
                    <button className="btn btn-secondary" onClick={() => setActiveTab('export')}><Download size={18} /> 리포트 생성</button>
                </div>
            </div>

            <div className="tab-container">
                <div className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>종합 대시보드</div>
                <div className={`tab ${activeTab === 'reservations' ? 'active' : ''}`} onClick={() => setActiveTab('reservations')}>예약 통계</div>
                <div className={`tab ${activeTab === 'members' ? 'active' : ''}`} onClick={() => setActiveTab('members')}>회원 분석</div>
                <div className={`tab ${activeTab === 'revenue' ? 'active' : ''}`} onClick={() => setActiveTab('revenue')}>매출/정산 통계</div>
                <div className={`tab ${activeTab === 'community' ? 'active' : ''}`} onClick={() => setActiveTab('community')}>활동 분석</div>
            </div>

            {activeTab === 'dashboard' && (
                <>
                    <div className="summary-grid">
                        <div className="sum-card">
                            <span className="sum-label"><Calendar size={16} /> 총 예약</span>
                            <div className="sum-value">1,412건</div>
                            <span className="sum-trend up"><ArrowUpRight size={14} /> 12.5%</span>
                        </div>
                        <div className="sum-card">
                            <span className="sum-label"><Users size={16} /> 신규 회원</span>
                            <div className="sum-value">328명</div>
                            <span className="sum-trend up"><ArrowUpRight size={14} /> 8.2%</span>
                        </div>
                        <div className="sum-card">
                            <span className="sum-label"><DollarSign size={16} /> 누적 매출</span>
                            <div className="sum-value">₩ 84.5M</div>
                            <span className="sum-trend up"><ArrowUpRight size={14} /> 5.4%</span>
                        </div>
                        <div className="sum-card">
                            <span className="sum-label"><AlertCircle size={16} /> 평균 노쇼율</span>
                            <div className="sum-value">2.4%</div>
                            <span className="sum-trend down"><ArrowDownRight size={14} /> 0.8%</span>
                        </div>
                    </div>

                    <div className="chart-row">
                        <div className="chart-card">
                            <div className="chart-header">
                                <h3 className="chart-title"><TrendingUp size={18} className="text-primary" /> 예약 및 매출 추이</h3>
                                <Badge color="79, 70, 229">Line Chart</Badge>
                            </div>
                            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '5px', padding: '0 10px' }}>
                                {[40, 55, 30, 85, 95, 120, 110, 140, 130, 160].map((h, i) => (
                                    <div key={i} style={{ flex: 1, background: 'linear-gradient(to top, var(--primary), var(--secondary))', height: `${h * 1.5}px`, opacity: 0.8, borderRadius: '4px 4px 0 0' }} />
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', padding: '0 10px' }}>
                                {['01', '05', '10', '15', '20', '25', '30'].map(d => (
                                    <span key={d} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{d}일</span>
                                ))}
                            </div>
                        </div>

                        <div className="chart-card">
                            <div className="chart-header">
                                <h3 className="chart-title"><PieChart size={18} className="text-secondary" /> 예약 상태 비율</h3>
                            </div>
                            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '25px solid var(--primary)', borderRightColor: 'var(--secondary)', borderBottomColor: '#f59e0b', borderLeftColor: '#ef4444' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '2px' }} /> 완료 65%</div>
                                <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '8px', height: '8px', background: 'var(--secondary)', borderRadius: '2px' }} /> 확정 20%</div>
                                <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '2px' }} /> 대기 10%</div>
                                <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '2px' }} /> 취소 5%</div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'reservations' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="chart-card">
                        <h3 className="chart-title" style={{ marginBottom: '1.5rem' }}><BarChart3 size={18} className="text-primary" /> 업체별 예약 점유율 (TOP 5)</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {[
                                { name: '골든 JTV', count: 420, percent: 85 },
                                { name: '바 마닐라', count: 310, percent: 65 },
                                { name: '클락 힐즈', count: 280, percent: 55 },
                                { name: '세부 스타', count: 150, percent: 35 },
                                { name: '로얄 바', count: 90, percent: 20 },
                            ].map(p => (
                                <div key={p.name}>
                                    <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 600 }}>{p.name} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({p.count}건)</span></span>
                                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{p.percent}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${p.percent}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chart-row">
                        <div className="chart-card">
                            <h3 className="chart-title" style={{ marginBottom: '1.5rem' }}><Clock size={18} className="text-primary" /> 시간대별 예약 분포</h3>
                            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                                {[5, 10, 2, 8, 45, 90, 120, 140, 110, 70, 30, 15].map((val, i) => (
                                    <div key={i} style={{ flex: 1, position: 'relative' }}>
                                        <div style={{ width: '100%', height: `${val}px`, background: val > 100 ? 'var(--primary)' : 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                                        <span style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{14 + i}시</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="chart-card">
                            <h3 className="chart-title" style={{ marginBottom: '1.5rem' }}>🔥 요일별 평균 예약</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', height: '200px', alignItems: 'flex-end', gap: '8px' }}>
                                {[45, 52, 60, 58, 110, 185, 140].map((h, i) => (
                                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '100%', background: i >= 4 ? 'var(--secondary)' : 'rgba(255,255,255,0.05)', height: `${h}px`, borderRadius: '6px' }} />
                                        <span style={{ fontSize: '0.75rem' }}>{['월', '화', '수', '목', '금', '토', '일'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'members' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="summary-grid">
                        <div className="sum-card">
                            <span className="sum-label"><UserCheck size={16} /> 활동 회원 (30일 이내)</span>
                            <div className="sum-value">1,124명</div>
                            <Badge color="16, 185, 129">보통</Badge>
                        </div>
                        <div className="sum-card">
                            <span className="sum-label"><Clock size={16} /> 휴면 회원 (90일 이상)</span>
                            <div className="sum-value">245명</div>
                            <Badge color="244, 63, 94">관리필요</Badge>
                        </div>
                        <div className="sum-card">
                            <span className="sum-label"><UserMinus size={16} /> 신규 탈퇴 회원</span>
                            <div className="sum-value">12명</div>
                            <span className="sum-trend down"><ArrowDownRight size={14} /> 5%</span>
                        </div>
                        <div className="sum-card">
                            <span className="sum-label"><Map size={16} /> 유입 경로 (Direct)</span>
                            <div className="sum-value">42%</div>
                            <Badge color="59, 130, 246">최고비율</Badge>
                        </div>
                    </div>

                    <div className="chart-card">
                        <h3 className="chart-title" style={{ marginBottom: '1.5rem' }}><Search size={18} className="text-secondary" /> 검색 엔진 / 유입 출처 분석</h3>
                        <div className="chart-row">
                            <div style={{ height: '240px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', height: '100%' }}>
                                    {[10, 25, 42, 15, 8].map((v, i) => (
                                        <div key={i} style={{ flex: v, background: `rgba(79, 70, 229, ${0.2 + (i * 0.2)})`, borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
                                            {v}%
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.8rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '8px', height: '8px', background: 'rgba(79, 70, 229, 0.2)' }} /> 네이버</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '8px', height: '8px', background: 'rgba(79, 70, 229, 0.4)' }} /> 구글</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '8px', height: '8px', background: 'rgba(79, 70, 229, 0.6)' }} /> 직접유입</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '8px', height: '8px', background: 'rgba(79, 70, 229, 0.8)' }} /> SNS</div>
                                </div>
                            </div>
                            <div className="chart-card" style={{ padding: '1rem', background: 'var(--surface-alt)' }}>
                                <h4 style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>회원 유형별 분포</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>일반 사용자</span><div style={{ fontSize: '1rem', fontWeight: 700 }}>4,821명</div></div>
                                    <div><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>등록 업체</span><div style={{ fontSize: '1rem', fontWeight: 700 }}>124개</div></div>
                                    <div><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>등록 CCA</span><div style={{ fontSize: '1rem', fontWeight: 700 }}>452명</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'revenue' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="summary-grid">
                        <div className="sum-card" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                            <span className="sum-label"><DollarSign size={16} /> 순수익 (플랫폼 수수료)</span>
                            <div className="sum-value">₩ 12,450,000</div>
                            <span className="sum-trend up"><ArrowUpRight size={14} /> 15.2%</span>
                        </div>
                        <div className="sum-card">
                            <span className="sum-label"><ShoppingBag size={16} /> 총 결제액</span>
                            <div className="sum-value">₩ 84,200,000</div>
                        </div>
                        <div className="sum-card">
                            <span className="sum-label"><UserMinus size={16} /> 환불 완료액</span>
                            <div className="sum-value">₩ 1,200,000</div>
                            <span className="sum-trend down"><ArrowDownRight size={14} /> 2.1%</span>
                        </div>
                        <div className="sum-card">
                            <span className="sum-label"><CreditCard size={16} /> 미지급 정산액</span>
                            <div className="sum-value">₩ 5,420,000</div>
                        </div>
                    </div>

                    <div className="chart-card">
                        <h3 className="chart-title" style={{ marginBottom: '1.5rem' }}><TrendingUp size={18} className="text-primary" /> 결제 수단별 점유율</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                            {[
                                { name: '신용/체크카드', val: 55, color: 'var(--primary)' },
                                { name: '계좌이체/무통장', val: 25, color: '#10b981' },
                                { name: '간편결제 (Toss/Kakao)', val: 15, color: '#3b82f6' },
                                { name: '가상자산', val: 5, color: '#f59e0b' },
                            ].map(p => (
                                <div key={p.name} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: p.color }}>{p.val}%</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{p.name}</div>
                                    <div className="progress-bar" style={{ height: '4px' }}>
                                        <div className="progress-fill" style={{ width: `${p.val}%`, background: p.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'community' && (
                <div className="chart-row">
                    <div className="chart-card">
                        <h3 className="chart-title" style={{ marginBottom: '1.5rem' }}><MessageSquare size={18} className="text-primary" /> 게시판별 활동 분석</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>게시판명</th>
                                    <th>새 글</th>
                                    <th>댓글 수</th>
                                    <th>조회수 합계</th>
                                    <th>활동지수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: '자유게시판', posts: 420, comments: 2450, views: '12.4k', index: 95 },
                                    { name: '업체후기', posts: 150, comments: 850, views: '45.2k', index: 88 },
                                    { name: 'CCA소식', posts: 85, comments: 420, views: '8.5k', index: 72 },
                                    { name: '이벤트', posts: 12, comments: 55, views: '2.4k', index: 45 },
                                ].map(b => (
                                    <tr key={b.name}>
                                        <td style={{ fontWeight: 600 }}>{b.name}</td>
                                        <td>{b.posts}</td>
                                        <td>{b.comments}</td>
                                        <td>{b.views}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ flex: 1, height: '4px', background: 'var(--surface-alt)', borderRadius: '2px' }}>
                                                    <div style={{ height: '100%', width: `${b.index}%`, background: 'var(--primary)' }} />
                                                </div>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{b.index}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="chart-card">
                        <h3 className="chart-title" style={{ marginBottom: '1.5rem' }}><ExternalLink size={18} className="text-secondary" /> 인기 정보 (TOP 5)</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} style={{ padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: i <= 3 ? 'var(--primary)' : 'var(--text-muted)', width: '24px' }}>{i}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>마닐라 여행 시 주의사항 안내...</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>조회수 4.2k • 댓글 124</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'export' && (
                <div className="export-section">
                    <div style={{ width: '64px', height: '64px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                        <Download size={32} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>데이터 리포트 생성 및 전송</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>선택한 기간과 항목에 대한 상세 분석 리포트를 다운로드합니다.</p>
                    </div>

                    <div style={{ textAlign: 'left', marginTop: '1.5rem' }}>
                        <label className="sum-label" style={{ marginBottom: '1rem' }}>추출할 데이터 항목 선택</label>
                        <div className="check-group">
                            {['예약 통계 (CSV)', '회원 분석 리포트', '매출 및 정산 내역', '커뮤니티 활동 지표', '시스템 로그', '광고 성과 (PDF)'].map(item => (
                                <div key={item} className="check-item">
                                    <input type="checkbox" defaultChecked />
                                    <span style={{ fontSize: '0.85rem' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                        <button className="btn btn-secondary" style={{ padding: '1rem' }}>
                            <FileText size={18} /> Excel (XLSX) 추출
                        </button>
                        <button className="btn btn-primary" style={{ padding: '1rem' }}>
                            <PieChart size={18} /> 성과 분석 PDF 생성
                        </button>
                    </div>
                    <p className="form-hint">리포트 생성에는 데이터 양에 따라 약 10~30초가 소요될 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};

export default Statistics;
