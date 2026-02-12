import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    User,
    Menu,
    X,
    Search,
    Calendar,
    Users,
    Store,
    MessageCircle
} from 'lucide-react';

interface UserLayoutProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    userName?: string;
    role?: string;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children, isAuthenticated, userName }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { label: '업체 리스트', path: '/partners', icon: <Store size={18} /> },
        { label: 'CCA 리스트', path: '/cca-list', icon: <Users size={18} /> },
        { label: '커뮤니티', path: '/community', icon: <MessageCircle size={18} /> },
        { label: '내 예약', path: '/my/reservations', icon: <Calendar size={18} /> },
    ];

    return (
        <div className="user-layout">
            <style>{`
        .user-layout { min-height: 100vh; display: flex; flex-direction: column; background: #f8fafc; }
        
        /* Header Styles */
        header { position: sticky; top: 0; z-index: 1000; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-container { max-width: 1200px; margin: 0 auto; height: 72px; display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; }
        
        .logo { font-size: 1.5rem; font-weight: 900; color: var(--primary); text-decoration: none; letter-spacing: -1px; display: flex; align-items: center; gap: 0.5rem; }
        .logo-dot { width: 8px; height: 8px; background: var(--primary); border-radius: 50%; }

        .desktop-nav { display: flex; align-items: center; gap: 2rem; }
        .nav-link { text-decoration: none; color: var(--text); font-weight: 700; font-size: 0.95rem; transition: color 0.2s; display: flex; align-items: center; gap: 0.4rem; }
        .nav-link:hover, .nav-link.active { color: var(--primary); }

        .auth-btns { display: flex; align-items: center; gap: 1rem; }
        
        .profile-trigger { display: flex; align-items: center; gap: 0.75rem; padding: 0.4rem 1rem; border: 1px solid var(--border); border-radius: 50px; background: white; cursor: pointer; transition: all 0.2s; }
        .profile-trigger:hover { border-color: var(--primary); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1); }
        .pfp-small { width: 32px; height: 32px; border-radius: 50%; background: var(--surface-alt); display: flex; align-items: center; justify-content: center; overflow: hidden; }

        /* Mobile Menu */
        .mobile-toggle { display: none; }
        
        main { flex: 1; width: 100%; max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem; }

        @media (max-width: 1024px) {
          .desktop-nav { display: none; }
          .mobile-toggle { display: block; }
        }
      `}</style>

            <header>
                <div className="nav-container">
                    <Link to="/" className="logo">
                        JTVLOVE <div className="logo-dot" />
                    </Link>

                    <nav className="desktop-nav">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="auth-btns">
                        <div className="search-btn icon-btn" style={{ background: 'var(--surface-alt)' }}>
                            <Search size={20} />
                        </div>

                        {isAuthenticated ? (
                            <div className="profile-trigger">
                                <div className="pfp-small">
                                    <User size={18} className="text-muted" />
                                </div>
                                <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{userName}</span>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem' }}>로그인</Link>
                                <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>회원가입</Link>
                            </div>
                        )}

                        <button className="mobile-toggle icon-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>

            <footer style={{ padding: '4rem 1.5rem', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                    <div>
                        <Link to="/" className="logo" style={{ marginBottom: '1.5rem' }}>
                            JTVLOVE <div className="logo-dot" />
                        </Link>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            필리핀 JTV 토탈 예약 플랫폼<br />
                            최고의 서비스와 CC를 만나보세요.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>서비스</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <li>업체 리스트</li>
                            <li>CCA 리스트</li>
                            <li>커뮤니티</li>
                            <li>광고 문의</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>고객지원</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <li>자주 묻는 질문</li>
                            <li>1:1 문의</li>
                            <li>약관 및 정책</li>
                            <li>개인정보 처리방침</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Contact</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            Email: support@jtvlove.com<br />
                            Telegram: @jtvlove_official
                        </p>
                    </div>
                </div>
                <div style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    © 2024 JTVLOVE. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default UserLayout;
