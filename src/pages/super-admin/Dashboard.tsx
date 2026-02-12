import React from 'react';
import {
    Users,
    Store,
    Calendar,
    Activity,
    AlertCircle,
    Clock,
    MessageSquare,
    ArrowUpRight,
    ArrowDownRight,
    Shield,
    HardDrive
} from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
    // Mock Data
    const stats = [
        { label: '총 업체 수', value: '128', subValue: '8건 승인 대기', icon: <Store className="text-primary" />, trend: '+12%' },
        { label: '총 CCA 수', value: '456', subValue: '12건 이동 요청', icon: <Users className="text-secondary" />, trend: '+5%' },
        { label: '총 일반유저', value: '3,240', subValue: '신규 142 (7일)', icon: <Users className="text-accent" />, trend: '+18%' },
        { label: '총 예약 건수', value: '12,840', subValue: '오늘 42건', icon: <Calendar className="text-success" />, trend: '+22%' },
        { label: '광고주 / 활성 광고', value: '24 / 48', subValue: '3건 만료 예정', icon: <Shield className="text-warning" />, trend: '0%' },
    ];

    const monitoring = [
        { label: '24시간 신규 가입', content: '업체: 2 / CCA: 5 / 유저: 24', icon: <Activity className="text-primary" /> },
        { label: '1시간 예약 현황', content: '6건 생성됨', icon: <Clock className="text-secondary" /> },
        { label: '현재 접속자', content: '142명 활성', icon: <Users className="text-success" /> },
        { label: '서버 상태', content: '정상 (에러 0)', icon: <HardDrive className="text-primary" /> },
    ];

    return (
        <div className="dashboard-content-view">
            <style>{`
        .dashboard-content-view {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-header-section {
          margin-bottom: 0.5rem;
        }

        .dashboard-header-section h1 {
          font-size: 1.875rem;
          margin-bottom: 0.25rem;
        }

        .dashboard-header-section p {
          color: var(--text-muted);
        }

        .stats-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .stat-card-item {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .stat-card-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-card-trend {
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
        }

        .trend-up { color: var(--success); background: rgba(16, 185, 129, 0.1); }
        .trend-down { color: var(--error); background: rgba(239, 68, 68, 0.1); }

        .stat-card-value {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .stat-card-label {
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .stat-card-subvalue {
          font-size: 0.75rem;
          color: var(--primary);
          font-weight: 600;
        }

        .main-dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 1100px) {
          .main-dashboard-grid { grid-template-columns: 1fr; }
        }

        .monitoring-section {
          padding: 1.5rem;
          height: 100%;
        }

        .monitoring-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .monitoring-title {
          font-size: 1.125rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .monitoring-grid-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .monitor-card-item {
          background: rgba(255, 255, 255, 0.03);
          padding: 1rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .monitor-card-item:hover {
          border-color: var(--border);
          background: rgba(255, 255, 255, 0.05);
        }

        .monitor-card-text {
          flex: 1;
        }

        .monitor-card-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .monitor-card-value {
          font-size: 0.9375rem;
          font-weight: 600;
        }

        .quick-data-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .quick-list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .quick-list-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .quick-item-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .quick-item-title {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .quick-item-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .system-notif-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .system-notif-item {
          display: flex;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .system-notif-item:last-child {
          border-bottom: none;
        }

        .notif-badge-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

            <div className="dashboard-header-section">
                <h1>슈퍼관리자 대시보드</h1>
                <p>시스템의 전반적인 현황을 한눈에 확인할 수 있습니다.</p>
            </div>

            {/* Statistics Widgets */}
            <div className="stats-grid-container">
                {stats.map((stat, i) => (
                    <div key={i} className="card stat-card-item">
                        <div className="stat-card-header">
                            <div className="stat-card-icon">{stat.icon}</div>
                            <div className={`stat-card-trend ${stat.trend.startsWith('+') ? 'trend-up' : 'trend-down'}`}>
                                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <div className="stat-card-label">{stat.label}</div>
                            <div className="stat-card-value">{stat.value}</div>
                            <div className="stat-card-subvalue">{stat.subValue}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="main-dashboard-grid">
                <div className="grid-left-side">
                    <div className="card monitoring-section" style={{ marginBottom: '1.5rem' }}>
                        <div className="monitoring-header">
                            <h2 className="monitoring-title"><Activity size={20} className="text-primary" /> 실시간 모니터링</h2>
                            <span className="badge badge-info">라이브</span>
                        </div>
                        <div className="monitoring-grid-list">
                            {monitoring.map((item, i) => (
                                <div key={i} className="monitor-card-item">
                                    <div className="stat-card-icon" style={{ width: '40px', height: '40px' }}>{item.icon}</div>
                                    <div className="monitor-card-text">
                                        <div className="monitor-card-label">{item.label}</div>
                                        <div className="monitor-card-value">{item.content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="monitoring-header">
                            <h2 className="monitoring-title"><MessageSquare size={20} className="text-primary" /> 빠른 액세스 및 요청</h2>
                            <button className="btn btn-primary" style={{ fontSize: '0.8rem' }}>전체보기</button>
                        </div>
                        <div className="quick-data-list">
                            {[
                                { type: '업체승인', title: '골든 JTV', date: '10분 전', badge: 'badge-warning', status: '대기중' },
                                { type: 'CCA이동', title: '김지은 → 마닐라 센터', date: '25분 전', badge: 'badge-info', status: '요청' },
                                { type: '신고처리', title: '부적절한 게시글 신고', date: '1시간 전', badge: 'badge-error', status: '미처리' },
                                { type: '활동', title: '자유게시판 신규 게시글 12건', date: '최근 1시간', badge: 'badge-success', status: '업데이트' },
                            ].map((item, i) => (
                                <div key={i} className="quick-list-item">
                                    <div className="quick-item-info">
                                        <div className="stat-card-icon" style={{ width: '40px', height: '40px' }}>
                                            {item.type.includes('업체') ? <Store size={18} /> : item.type.includes('CCA') ? <Users size={18} /> : <MessageSquare size={18} />}
                                        </div>
                                        <div>
                                            <div className="quick-item-title">{item.title}</div>
                                            <div className="quick-item-subtitle">{item.type} • {item.date}</div>
                                        </div>
                                    </div>
                                    <span className={`badge ${item.badge}`}>{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid-right-side">
                    <div className="card monitoring-section">
                        <div className="monitoring-header">
                            <h2 className="monitoring-title"><AlertCircle size={20} className="text-error" /> 시스템 알림</h2>
                        </div>
                        <div className="system-notif-list">
                            {[
                                { title: '서버 백업 완료', desc: '데이터베이스 백업 완료', time: '30분 전', type: 'success' },
                                { title: '이상 로그인 감지', desc: '관리자 접근 시도', time: '2시간 전', type: 'error' },
                                { title: 'API 속도 저하', desc: '지연 시간 증가', time: '5시간 전', type: 'warning' },
                                { title: '디스크 공간 확인', desc: '스토리지 80% 사용', time: '오늘 오전', type: 'warning' },
                            ].map((notif, i) => (
                                <div key={i} className="system-notif-item">
                                    <div className={`notif-badge-icon badge-${notif.type}`}>
                                        <Shield size={18} />
                                    </div>
                                    <div>
                                        <div className="quick-item-title" style={{ fontSize: '0.9rem' }}>{notif.title}</div>
                                        <div className="quick-item-subtitle" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{notif.desc}</div>
                                        <div className="quick-item-subtitle" style={{ fontSize: '0.7rem', marginTop: '0.4rem' }}>{notif.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
                            모든 로그 보기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
