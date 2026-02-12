import React, { type ReactNode } from 'react';
import {
  LayoutDashboard,
  Users,
  Store,
  Calendar,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  ShieldCheck,
  LifeBuoy,
  MessageSquare,
  BarChart3,
  Activity,
  User,
  Image as ImageIcon,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'super_admin' | 'partner_admin' | 'cca' | 'user';
  userName: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role, userName }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavItems = () => {
    switch (role) {
      case 'super_admin':
        return [
          { icon: <LayoutDashboard size={20} />, label: '대시보드', path: '/super-admin/dashboard' },
          { icon: <Store size={20} />, label: '업체 관리', path: '/super-admin/partners' },
          { icon: <BarChart3 size={20} />, label: '통계 및 리포트', path: '/super-admin/stats' },
          { icon: <Users size={20} />, label: 'CCA 관리', path: '/super-admin/cca' },
          { icon: <Users size={20} />, label: '일반유저 관리', path: '/super-admin/users' },
          { icon: <Calendar size={20} />, label: '예약 현황', path: '/super-admin/reservations' },
          { icon: <MessageSquare size={20} />, label: '커뮤니티 관리', path: '/super-admin/community' },
          { icon: <ShieldCheck size={20} />, label: '광고 관리', path: '/super-admin/ads' },
          { icon: <Activity size={20} />, label: '시스템 모니터링', path: '/super-admin/monitoring' },
          { icon: <Settings size={20} />, label: '시스템 설정', path: '/super-admin/settings' },
        ];
      case 'partner_admin':
        return [
          { icon: <LayoutDashboard size={20} />, label: '대시보드', path: '/partner/dashboard' },
          { icon: <Calendar size={20} />, label: '예약 관리', path: '/partner/reservations' },
          { icon: <Users size={20} />, label: 'CCA 관리', path: '/partner/cca' },
          { icon: <BarChart3 size={20} />, label: '통계 분석', path: '/partner/stats' },
          { icon: <Settings size={20} />, label: '업무 설정', path: '/partner/settings' },
          { icon: <User size={20} />, label: '계정 및 지원', path: '/partner/account' },
        ];
      case 'cca':
        return [
          { icon: <LayoutDashboard size={20} />, label: '내 대시보드', path: '/cca/dashboard' },
          { icon: <ImageIcon size={20} />, label: '미디어 갤러리', path: '/cca/gallery' },
          { icon: <BarChart3 size={20} />, label: '활동 통계', path: '/cca/stats' },
          { icon: <Calendar size={20} />, label: '스케줄 관리', path: '/cca/schedule' },
          { icon: <Settings size={20} />, label: '프로필 설정', path: '/cca/settings' },
          { icon: <User size={20} />, label: '계정 및 지원', path: '/cca/account' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  // Bottom Nav items for mobile (limit to 4-5)
  const mobileNavItems = navItems.slice(0, 5);

  return (
    <div className="dashboard-layout">
      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background-color: #030712;
          color: #f9fafb;
          font-family: 'Inter', sans-serif;
        }

        .sidebar {
          width: 260px;
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(12px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 50;
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-box {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          background: linear-gradient(to right, #fff, #9ca3af);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-list {
          flex: 1;
          padding: 0.5rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          color: #9ca3af;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #f9fafb;
        }

        .nav-item.active {
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
          font-weight: 600;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
        }

        .top-nav {
          height: 72px;
          background: rgba(3, 7, 18, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .page-content {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          width: 320px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: #f9fafb;
          font-size: 0.875rem;
          width: 100%;
          outline: none;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-btn {
          position: relative;
          color: #9ca3af;
          cursor: pointer;
          transition: color 0.2s;
        }

        .notification-btn:hover { color: #f9fafb; }

        .notification-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background: #f87171;
          border-radius: 50%;
          border: 2px solid #030712;
        }

        .avatar {
          width: 36px;
          height: 36px;
          background: #374151;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
          color: #f9fafb;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
          padding: 0 1rem;
          justify-content: space-around;
          align-items: center;
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          color: #9ca3af;
          font-size: 0.65rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
        }

        .bottom-nav-item.active {
          color: #818cf8;
        }

        @media (max-width: 1024px) {
          .sidebar { 
            display: none; 
          }
          .main-content { 
            margin-left: 0; 
            padding-bottom: 64px;
          }
          .bottom-nav { 
            display: flex; 
          }
          .top-nav {
            padding: 0 1rem;
          }
          .search-bar {
            display: none;
          }
          .page-content {
            padding: 1rem;
          }
        }
      `}</style>

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-box">
            <ShieldCheck size={20} color="white" />
          </div>
          <span className="logo-text">JTVlove Admin</span>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item">
            <LifeBuoy size={20} />
            <span>고객지원</span>
          </div>
          <div className="nav-item" style={{ marginTop: '0.5rem' }}>
            <LogOut size={20} />
            <span>로그아웃</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Menu className="text-muted" style={{ cursor: 'pointer' }} />
            <div className="search-bar">
              <Search size={18} className="text-muted" />
              <input type="text" placeholder="검색어를 입력하세요..." />
            </div>
            <span className="logo-text" style={{ fontSize: '1rem', display: 'none' }} id="mobile-logo-text">JTVlove</span>
          </div>

          <div className="user-profile">
            <div className="notification-btn">
              <Bell size={22} />
              <div className="notification-dot" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }} className="desktop-only text-sm">
                <div style={{ fontWeight: 600 }}>{userName}</div>
                <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{role === 'super_admin' ? '최고관리자' : '업체관리자'}</div>
              </div>
              <div className="avatar">{userName.charAt(0)}</div>
            </div>
          </div>
        </header>

        <div className="page-content">
          {children}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="bottom-nav">
        {mobileNavItems.map((item) => (
          <div
            key={item.path}
            className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {React.cloneElement(item.icon as React.ReactElement, { size: 24 } as any)}
            <span>{item.label}</span>
          </div>
        ))}
        <div className="bottom-nav-item">
          <LogOut size={24} />
          <span>종료</span>
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;
