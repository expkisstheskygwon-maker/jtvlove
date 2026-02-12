import React, { useState } from 'react';
import {
    Search,
    Filter,
    Calendar,
    Download,
    Eye,
    XCircle,
    BarChart3,
    PieChart,
    User,
    Store,
    MessageSquare,
    History,
    Bell,
    TrendingDown,
    TrendingUp,
    ArrowUpDown,
    AlertCircle
} from 'lucide-react';

// Types
interface Reservation {
    id: string;
    userName: string;
    ccaName: string;
    partnerName: string;
    reservationTime: string;
    status: 'pending' | 'confirmed' | 'canceled' | 'noshow' | 'completed';
    createdAt: string;
    message?: string;
}

interface StatCardProps {
    label: string;
    value: string;
    trend?: { value: string; isUp: boolean };
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon }) => (
    <div className="stat-card">
        <div className="stat-content">
            <span className="stat-label">{label}</span>
            <h3 className="stat-value">{value}</h3>
            {trend && (
                <span className={`stat-trend ${trend.isUp ? 'up' : 'down'}`}>
                    {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {trend.value} 대비
                </span>
            )}
        </div>
        <div className="stat-icon">{icon}</div>
    </div>
);

const Reservations: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'stats' | 'monitor'>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('전체');
    const [showDetail, setShowDetail] = useState<string | null>(null);
    const [sortField, setSortField] = useState<keyof Reservation>('reservationTime');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Mock Data
    const reservations: Reservation[] = [
        { id: 'RES-8291', userName: '김유저', ccaName: '민지', partnerName: '바 마닐라', reservationTime: '2026-02-12 21:00', status: 'pending', createdAt: '2026-02-12 10:15', message: '창가 자리로 부탁드려요.' },
        { id: 'RES-8290', userName: '박유저', ccaName: '수지', partnerName: '골든 JTV', reservationTime: '2026-02-12 20:30', status: 'confirmed', createdAt: '2026-02-11 18:20', message: '동행 2명 있습니다.' },
        { id: 'RES-8285', userName: '최유저', ccaName: '유나', partnerName: '클락 힐즈', reservationTime: '2026-02-11 22:00', status: 'completed', createdAt: '2026-02-10 14:00' },
        { id: 'RES-8280', userName: '이유저', ccaName: '하니', partnerName: '세부 스타', reservationTime: '2026-02-11 19:00', status: 'noshow', createdAt: '2026-02-11 09:30' },
        { id: 'RES-8275', userName: '정유저', ccaName: '해린', partnerName: '마닐라 바', reservationTime: '2026-02-10 20:00', status: 'canceled', createdAt: '2026-02-09 11:45' },
    ];

    const handleSort = (field: keyof Reservation) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
    };

    const filteredReservations = reservations.filter(res => {
        const matchesSearch = res.userName.includes(searchTerm) || res.ccaName.includes(searchTerm) || res.partnerName.includes(searchTerm) || res.id.includes(searchTerm);
        const matchesStatus = selectedStatus === '전체' || res.status === selectedStatus;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        const aVal = a[sortField] || '';
        const bVal = b[sortField] || '';
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className="reservations-view">
            <style>{`
        .reservations-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .view-header { display: flex; justify-content: space-between; align-items: flex-end; }
        
        .tab-container { display: flex; gap: 2rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; }
        .tab { padding: 0.75rem 0.5rem; cursor: pointer; color: var(--text-muted); font-weight: 500; font-size: 0.9375rem; position: relative; transition: all 0.2s; }
        .tab.active { color: var(--primary); font-weight: 700; }
        .tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: var(--primary); }
        
        .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .input-box { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0.625rem 1rem; color: var(--text); outline: none; display: flex; align-items: center; gap: 0.5rem; }
        .input-box input, .input-box select { background: transparent; border: none; color: inherit; outline: none; width: 100%; }

        .table-container { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        th { background: rgba(255, 255, 255, 0.02); padding: 1rem; text-align: left; color: var(--text-muted); font-weight: 600; border-bottom: 1px solid var(--border); }
        th.sortable { cursor: pointer; }
        th.sortable:hover { background: rgba(255, 255, 255, 0.05); color: var(--text); }
        td { padding: 1rem; border-bottom: 1px solid var(--border); }
        
        .status-badge { padding: 0.25rem 0.625rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem; }
        .status-pending { background: rgba(245, 158, 11, 0.1); color: #fbbf24; }
        .status-confirmed { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
        .status-canceled { background: rgba(239, 68, 68, 0.1); color: #f87171; }
        .status-noshow { background: rgba(156, 163, 175, 0.1); color: #9ca3af; text-decoration: line-through; }
        .status-completed { background: rgba(16, 185, 129, 0.1); color: #34d399; }

        .action-btn { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-muted); transition: 0.2s; }
        .action-btn:hover { background: var(--surface-alt); color: var(--text); }

        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
        .stat-card { background: var(--surface); border: 1px solid var(--border); padding: 1.5rem; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; }
        .stat-label { font-size: 0.875rem; color: var(--text-muted); display: block; margin-bottom: 0.5rem; }
        .stat-value { font-size: 1.5rem; font-weight: 700; }
        .stat-trend { font-size: 0.75rem; display: flex; align-items: center; gap: 0.25rem; margin-top: 0.5rem; }
        .stat-trend.up { color: #10b981; }
        .stat-trend.down { color: #ef4444; }
        .stat-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(79, 70, 229, 0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; }

        .monitor-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .monitor-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; }
        .monitor-card h3 { font-size: 1rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
        .monitor-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--surface-alt); border-radius: 12px; margin-bottom: 0.75rem; border: 1px solid var(--border); transition: 0.2s; }
        .monitor-item:hover { transform: translateX(5px); border-color: var(--primary); }

        .side-drawer { position: fixed; top: 0; right: 0; width: 600px; height: 100vh; background: var(--surface); border-left: 1px solid var(--border); z-index: 100; box-shadow: -10px 0 30px rgba(0,0,0,0.5); padding: 0; transform: translateX(100%); transition: transform 0.3s ease; overflow-y: auto; display: flex; flex-direction: column; }
        .side-drawer.open { transform: translateX(0); }
        .drawer-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.5); z-index: 99; display: none; }
        .drawer-overlay.open { display: block; }

        .drawer-header { padding: 2rem; border-bottom: 1px solid var(--border); }
        .drawer-content { padding: 2rem; display: flex; flex-direction: column; gap: 2rem; }
        
        .history-timeline { border-left: 2px solid var(--border); padding-left: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .timeline-item { position: relative; }
        .timeline-item::before { content: ''; position: absolute; left: -21px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: var(--border); border: 2px solid var(--surface); }
        .timeline-item.active::before { background: var(--primary); }
      `}</style>

            <div className="view-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>예약 통합 관리</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>플랫폼 내 전체 예약 흐름과 통계를 실시간으로 모니터링합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary"><Download size={18} /> 보고서 생성</button>
                    <button className="btn btn-primary"><Calendar size={18} /> 전체 예약 캘린더</button>
                </div>
            </div>

            <div className="tab-container">
                <div className={`tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
                    예약 목록
                </div>
                <div className={`tab ${activeTab === 'monitor' ? 'active' : ''}`} onClick={() => setActiveTab('monitor')}>
                    위험/대기 모니터링 <span className="badge badge-error" style={{ marginLeft: '4px' }}>4</span>
                </div>
                <div className={`tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
                    예약 통계
                </div>
            </div>

            {activeTab === 'list' && (
                <>
                    <div className="toolbar">
                        <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
                            <div className="input-box" style={{ width: '300px' }}>
                                <Search size={18} className="text-muted" />
                                <input
                                    type="text"
                                    placeholder="예약ID, 유저, CCA, 업체 검색..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <Filter size={18} className="text-muted" />
                                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                    <option value="전체">모든 상태</option>
                                    <option value="pending">대기</option>
                                    <option value="confirmed">확정</option>
                                    <option value="completed">완료</option>
                                    <option value="canceled">취소</option>
                                    <option value="noshow">노쇼</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <Calendar size={18} className="text-muted" />
                                <span>2026-02-12 ~ 2026-02-13</span>
                            </div>
                        </div>
                        <button className="btn btn-secondary" title="필터 초기화">초기화</button>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>예약ID</th>
                                    <th>유저명</th>
                                    <th>CCA명</th>
                                    <th>업체명</th>
                                    <th className="sortable" onClick={() => handleSort('reservationTime')}>
                                        예약일시 <ArrowUpDown size={12} />
                                    </th>
                                    <th>상태</th>
                                    <th className="sortable" onClick={() => handleSort('createdAt')}>
                                        등록일 <ArrowUpDown size={12} />
                                    </th>
                                    <th style={{ width: '80px' }}>액션</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReservations.map((res) => (
                                    <tr key={res.id}>
                                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{res.id}</td>
                                        <td>{res.userName}</td>
                                        <td>{res.ccaName}</td>
                                        <td>{res.partnerName}</td>
                                        <td>{res.reservationTime}</td>
                                        <td>
                                            <span className={`status-badge status-${res.status}`}>
                                                {res.status === 'pending' ? '대기' :
                                                    res.status === 'confirmed' ? '확정' :
                                                        res.status === 'completed' ? '완료' :
                                                            res.status === 'canceled' ? '취소' : '노쇼'}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{res.createdAt}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                <div className="action-btn" onClick={() => setShowDetail(res.id)}><Eye size={16} /></div>
                                                <div className="action-btn"><XCircle size={16} /></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {activeTab === 'stats' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="stats-grid">
                        <StatCard label="오늘 총 예약" value="142건" trend={{ value: '12%', isUp: true }} icon={<Calendar size={24} />} />
                        <StatCard label="취소/노쇼율" value="4.2%" trend={{ value: '0.8%', isUp: false }} icon={<TrendingDown size={24} />} />
                        <StatCard label="인기 업체" value="골든 JTV" icon={<Store size={24} />} />
                        <StatCard label="최고 인기 CCA" value="민지 (ACE)" icon={<User size={24} />} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
                        <div className="monitor-card">
                            <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0 }}><BarChart3 size={18} className="text-primary" /> 예약량 추이 (최근 7일)</h3>
                                <select className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                                    <option>일간</option>
                                    <option>주간</option>
                                </select>
                            </div>
                            <div style={{ height: '250px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', padding: '1.5rem' }}>
                                {[45, 60, 42, 85, 90, 110, 142].map((h, i) => (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '100%', background: 'linear-gradient(to top, var(--primary), var(--secondary))', height: `${h}px`, borderRadius: '6px 6px 0 0', opacity: i === 6 ? 1 : 0.6 }} />
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>02.{6 + i}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="monitor-card">
                            <h3><PieChart size={18} className="text-secondary" /> 상태별 비율</h3>
                            <div style={{ height: '250px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '180px', height: '180px', borderRadius: '50%', border: '20px solid var(--primary)', borderRightColor: 'var(--secondary)', borderBottomColor: '#f59e0b', borderLeftColor: '#ef4444' }} />
                                <div style={{ position: 'absolute', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>88%</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>확정/완료율</div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}><span style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '3px' }} /> 확정</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}><span style={{ width: '12px', height: '12px', background: 'var(--secondary)', borderRadius: '3px' }} /> 대기</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}><span style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '3px' }} /> 취소</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}><span style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '3px' }} /> 노쇼</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'monitor' && (
                <div className="monitor-grid">
                    <div className="monitor-card">
                        <h3><XCircle size={18} className="text-error" /> 취소/변경 요청 대기 <span className="badge badge-error">2</span></h3>
                        <div className="monitor-item">
                            <div>
                                <div style={{ fontWeight: 600 }}>RES-8295 (김유저)</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>변경 사유: 개인 사정으로 30분 연기 요청</div>
                            </div>
                            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>승인</button>
                        </div>
                        <div className="monitor-item">
                            <div>
                                <div style={{ fontWeight: 600 }}>RES-8292 (박유저)</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>취소 요청: 급한 일정 변경</div>
                            </div>
                            <button className="btn btn-error" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>취소 승인</button>
                        </div>
                    </div>

                    <div className="monitor-card">
                        <h3><AlertCircle size={18} className="text-warning" /> 노쇼 처리 필요 <span className="badge badge-warning">2</span></h3>
                        <div className="monitor-item">
                            <div>
                                <div style={{ fontWeight: 600 }}>RES-8270 (이유저)</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>예약 일시: 2026-02-12 17:00 (1시간 경과)</div>
                            </div>
                            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>노쇼 처리</button>
                        </div>
                        <div className="monitor-item">
                            <div>
                                <div style={{ fontWeight: 600 }}>RES-8265 (정유저)</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>중복 예약 감지: 다른 업체와 동일 시간대</div>
                            </div>
                            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>확인</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Drawer */}
            <div className={`drawer-overlay ${showDetail ? 'open' : ''}`} onClick={() => setShowDetail(null)} />
            <div className={`side-drawer ${showDetail ? 'open' : ''}`}>
                {showDetail && (
                    <>
                        <div className="drawer-header">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>예약 상세 정보</h2>
                                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{showDetail}</span>
                                </div>
                                <button className="btn btn-secondary" onClick={() => setShowDetail(null)}>닫기</button>
                            </div>
                        </div>

                        <div className="drawer-content">
                            <section className="monitor-card" style={{ borderStyle: 'dashed' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <h3><Bell size={18} className="text-primary" /> 실시간 제어</h3>
                                    <span className="status-badge status-pending">현재: 승인 대기</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    <button className="btn btn-primary" style={{ justifyContent: 'center' }}>예약 확정</button>
                                    <button className="btn btn-secondary" style={{ justifyContent: 'center' }}>시간 변경</button>
                                    <button className="btn btn-error" style={{ justifyContent: 'center' }}>강제 취소</button>
                                    <button className="btn btn-secondary" style={{ justifyContent: 'center' }}>노쇼 처리</button>
                                </div>
                                <div style={{ marginTop: '1rem' }}>
                                    <textarea
                                        placeholder="조치 사유를 입력하세요 (자동 문자 발송 시 포함)"
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.75rem', color: 'white', fontSize: '0.85rem', resize: 'none', height: '80px' }}
                                    />
                                </div>
                            </section>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                <div className="monitor-card">
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>예약 유저</label>
                                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>K</div>
                                        김유저 (VIP)
                                    </div>
                                </div>
                                <div className="monitor-card">
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>담당 CCA / 업체</label>
                                    <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>민지 / 바 마닐라</div>
                                </div>
                            </div>

                            <div className="monitor-card">
                                <h3 style={{ fontSize: '0.9rem' }}><MessageSquare size={16} /> 유저 메시지</h3>
                                <p style={{ background: 'var(--surface-alt)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    "창가 자리로 부탁드려요. 8시 반쯤 도착할 것 같습니다."
                                </p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}><History size={16} /> 상태 변경 및 알림 이력</h3>
                                <div className="history-timeline">
                                    <div className="timeline-item active">
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>예약 신청 완료</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2026-02-12 10:15:32</div>
                                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--primary)' }}>[알림] 유저/업체 알림 톡 발송 완료</div>
                                    </div>
                                    <div className="timeline-item">
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>대기 상태 유지 중</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>업체 미확인 상태</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Reservations;
