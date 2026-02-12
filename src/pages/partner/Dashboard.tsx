import React from 'react';
import {
    Users,
    Calendar,
    TrendingUp,
    DollarSign,
    ChevronRight,
    Plus,
    Bell,
    Clock,
    Settings,
    MoreVertical,
    Navigation,
    ArrowRight,
    XCircle
} from 'lucide-react';

const PartnerDashboard: React.FC = () => {
    // Mock data for the partner (Golden JTV as example)
    const partnerInfo = {
        name: '골든 JTV',
        id: 'PTN-001'
    };

    const stats = [
        { label: '활동 중 CCA', value: '12', subValue: '총 15명', icon: <Users size={20} />, color: '#6366f1' },
        { label: '오늘 예약', value: '8', subValue: '이번달 142건', icon: <Calendar size={20} />, color: '#f59e0b' },
        { label: '확정율', value: '92%', subValue: '취소/노쇼 8%', icon: <TrendingUp size={20} />, color: '#10b981' },
        { label: '예상 정산액', value: '₩ 4.2M', subValue: '전월 ₩ 3.8M', icon: <DollarSign size={20} />, color: '#ec4899' },
    ];

    const todayReservations = [
        { id: 1, time: '20:00', cca: '미나', customer: '김철수', status: '확정', statusColor: '#10b981' },
        { id: 2, time: '21:30', cca: '지수', customer: '이영희', status: '대기', statusColor: '#f59e0b' },
        { id: 3, time: '22:00', cca: '제니', customer: '박지민', status: '확정', statusColor: '#10b981' },
        { id: 4, time: '23:00', cca: '사나', customer: '최도윤', status: '요청', statusColor: '#6366f1' },
    ];

    const ccaStatus = [
        { name: '미나', grade: 'S', today: 3, status: '활동중' },
        { name: '지수', grade: 'A', today: 2, status: '활동중' },
        { name: '제니', grade: 'S', today: 4, status: '휴무' },
        { name: '사나', grade: 'B', today: 1, status: '활동중' },
    ];

    return (
        <div className="partner-dashboard">
            <style>{`
        .partner-dashboard {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 2rem;
        }

        .mobile-header {
          display: none;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .welcome-section {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .stat-card {
          background: rgba(31, 41, 55, 0.5);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.25rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.25rem;
        }

        .content-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
        }

        .card-container {
          background: rgba(17, 24, 39, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
        }

        .card-header {
          padding: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .list-item {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.2s;
        }

        .list-item:hover { background: rgba(255, 255, 255, 0.02); }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .action-btn {
          background: rgba(31, 41, 55, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }

        .action-btn:active { transform: scale(0.95); background: rgba(99, 102, 241, 0.1); }

        .notification-item {
          border-left: 3px solid #6366f1;
        }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .content-row { grid-template-columns: 1fr; }
          .welcome-section { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .mobile-header { display: flex; }
        }
      `}</style>

            {/* Mobile Top Header */}
            <div className="mobile-header">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{partnerInfo.name}</h2>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '50%' }}>
                        <Bell size={20} />
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '50%' }}>
                        <Settings size={20} />
                    </div>
                </div>
            </div>

            <div className="welcome-section">
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>안녕하세요, 관리자님! 👋</h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>오늘의 {partnerInfo.name} 현황을 확인하세요.</p>
                </div>
                <button className="btn btn-primary" style={{ borderRadius: '12px', padding: '0.75rem 1rem' }}>
                    <Plus size={18} /> 새 예약 등록
                </button>
            </div>

            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-icon" style={{ background: `${s.color}20`, color: s.color }}>
                            {s.icon}
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{s.label}</span>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.value}</div>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>{s.subValue}</span>
                    </div>
                ))}
            </div>

            {/* Quick Actions for Mobile */}
            <div className="quick-actions">
                <div className="action-btn">
                    <Calendar size={22} color="#6366f1" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>예약 관리</span>
                </div>
                <div className="action-btn">
                    <Users size={22} color="#10b981" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>CCA 관리</span>
                </div>
                <div className="action-btn">
                    <Settings size={22} color="#f59e0b" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>설정</span>
                </div>
            </div>

            <div className="content-row">
                {/* Today's Reservations */}
                <div className="card-container">
                    <div className="card-header">
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={18} className="text-primary" /> 오늘의 예약
                        </h3>
                        <button className="btn-text" style={{ fontSize: '0.85rem' }}>전체보기 <ChevronRight size={14} /></button>
                    </div>
                    <div className="list-content">
                        {todayReservations.map((res) => (
                            <div key={res.id} className="list-item">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-muted)' }}>{res.time}</div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{res.customer}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>매칭: {res.cca}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        background: `${res.statusColor}20`,
                                        color: res.statusColor
                                    }}>{res.status}</span>
                                    <MoreVertical size={16} className="text-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CCA Status & Notifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Notifications Card */}
                    <div className="card-container">
                        <div className="card-header">
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Bell size={18} className="text-secondary" /> 주요 알림
                            </h3>
                        </div>
                        <div className="list-content">
                            <div className="list-item notification-item">
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <Navigation size={16} className="text-primary" style={{ marginTop: '0.2rem' }} />
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>CCA 이동 신청 - 리나</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>블루 JTV에서 이동 희망</div>
                                    </div>
                                </div>
                                <ArrowRight size={14} className="text-muted" />
                            </div>
                            <div className="list-item notification-item" style={{ borderLeftColor: '#ef4444' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <XCircle size={16} className="text-error" style={{ marginTop: '0.2rem' }} />
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>예약 취소 요청 - 김태희</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>개인 사정으로 인한 취소 요청</div>
                                    </div>
                                </div>
                                <ArrowRight size={14} className="text-muted" />
                            </div>
                        </div>
                    </div>

                    {/* CCA Team Card */}
                    <div className="card-container">
                        <div className="card-header">
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>소속 CCA 현황</h3>
                            <button className="btn-text" style={{ fontSize: '0.85rem' }}>관리 <ChevronRight size={14} /></button>
                        </div>
                        <div className="list-content">
                            {ccaStatus.map((cca, i) => (
                                <div key={i} className="list-item">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '32px', height: '32px',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center',
                                            fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)'
                                        }}>{cca.grade}</div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{cca.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: cca.status === '활동중' ? '#10b981' : '#9ca3af' }}>{cca.status}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{cca.today}건</div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>오늘 예약</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerDashboard;
