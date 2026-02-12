import React, { useState } from 'react';
import {
    User,
    Bell,
    FileText,
    MessageSquare,
    Heart,
    ChevronRight,
    Camera,
    LogOut,
    ShieldAlert,
    X,
    Lock
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<'profile' | 'activity' | 'settings'>('profile');
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    // Mock User Data
    const [userData, setUserData] = useState({
        name: '홍길동',
        email: 'gildong@example.com',
        phone: '010-1234-5678',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        notifications: {
            reservation: true,
            comment: true,
            email: false,
            sms: true
        }
    });

    const [pwData, setPwData] = useState({ current: '', next: '', confirm: '' });

    const sections = [
        { id: 'profile', name: '프로필 설정', icon: <User size={20} /> },
        { id: 'activity', name: '내 활동 내역', icon: <FileText size={20} /> },
        { id: 'settings', name: '알림 및 보안', icon: <Bell size={20} /> }
    ];

    const toggleNotification = (key: keyof typeof userData.notifications) => {
        setUserData({
            ...userData,
            notifications: {
                ...userData.notifications,
                [key]: !userData.notifications[key]
            }
        });
    };

    return (
        <div className="mypage-container">
            <style>{`
                .mypage-container { max-width: 1000px; margin: 0 auto; padding-bottom: 5rem; display: grid; grid-template-columns: 280px 1fr; gap: 3rem; margin-top: 3rem; }
                
                /* Sidebar */
                .mypage-sidebar { display: flex; flexDirection: column; gap: 0.5rem; }
                .nav-item { display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; border-radius: 16px; font-weight: 850; color: var(--text-muted); cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
                .nav-item:hover { background: var(--surface-alt); color: var(--text); }
                .nav-item.active { background: white; border-color: var(--primary); color: var(--primary); box-shadow: 0 10px 20px rgba(99, 102, 241, 0.05); }

                /* Main Content */
                .mypage-content { background: white; border: 1px solid var(--border); border-radius: 32px; padding: 3rem; }
                .section-title { font-size: 1.5rem; font-weight: 950; margin-bottom: 2.5rem; display: flex; align-items: center; gap: 0.75rem; }

                /* Profile UI */
                .profile-header { display: flex; align-items: center; gap: 2rem; margin-bottom: 3rem; padding-bottom: 3rem; border-bottom: 1px solid var(--border); }
                .avatar-wrap { position: relative; }
                .avatar-img { width: 100px; height: 100px; border-radius: 35px; object-fit: cover; }
                .camera-btn { position: absolute; bottom: -5px; right: -5px; background: var(--primary); color: white; width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 3px solid white; cursor: pointer; }

                /* Form Layout */
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
                .form-group { margin-bottom: 1.5rem; }
                .form-label { display: block; font-weight: 850; margin-bottom: 0.75rem; font-size: 0.9rem; color: var(--text-muted); }
                .form-input { width: 100%; padding: 1rem 1.25rem; border-radius: 14px; border: 1.5px solid var(--border); background: var(--surface-alt); font-weight: 700; transition: border-color 0.2s; }
                .form-input:focus { border-color: var(--primary); outline: none; background: white; }

                /* Action Plates */
                .activity-grid { display: grid; gap: 1rem; }
                .activity-plate { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 2rem; background: var(--surface-alt); border-radius: 20px; transition: all 0.2s; cursor: pointer; text-decoration: none; color: inherit; }
                .activity-plate:hover { background: white; transform: translateX(10px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                .plate-icon-wrap { width: 50px; height: 50px; border-radius: 14px; background: white; display: flex; align-items: center; justify-content: center; color: var(--primary); }

                /* Notification Toggles */
                .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 0; border-bottom: 1px solid var(--border); }
                .toggle-row:last-child { border-bottom: none; }
                .toggle-info h4 { font-weight: 900; margin-bottom: 0.25rem; }
                .toggle-info p { font-size: 0.85rem; color: var(--text-muted); font-weight: 700; }
                
                .switch { width: 50px; height: 26px; background: #e5e7eb; border-radius: 50px; position: relative; cursor: pointer; transition: background 0.3s; }
                .switch.on { background: var(--primary); }
                .switch::after { content: ''; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; background: white; border-radius: 50%; transition: left 0.3s; }
                .switch.on::after { left: 27px; }

                /* Danger Zone */
                .danger-zone { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border); }
                .danger-btn { color: #f87171; font-weight: 850; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; }
                .danger-btn:hover { text-decoration: underline; }

                /* Modal */
                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
                .modal-box { background: white; border-radius: 32px; width: 100%; max-width: 500px; padding: 2.5rem; position: relative; }

                @media (max-width: 900px) {
                    .mypage-container { grid-template-columns: 1fr; margin-top: 1rem; }
                    .mypage-sidebar { flex-direction: row; overflow-x: auto; padding-bottom: 1rem; }
                    .nav-item { padding: 0.75rem 1.25rem; white-space: nowrap; }
                    .mypage-content { padding: 1.5rem; }
                    .form-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <aside className="mypage-sidebar">
                <div style={{ padding: '0 1rem 1.5rem 1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 950 }}>마이페이지</h2>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.9rem' }}>계정 정보를 관리하세요.</p>
                </div>
                {sections.map(s => (
                    <div
                        key={s.id}
                        className={`nav-item ${activeSection === s.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(s.id as any)}
                    >
                        {s.icon} {s.name}
                    </div>
                ))}
                <div className="nav-item" style={{ marginTop: '2rem', color: '#f87171' }}>
                    <LogOut size={20} /> 로그아웃
                </div>
            </aside>

            <main className="mypage-content">
                {activeSection === 'profile' && (
                    <div className="fade-in">
                        <h2 className="section-title"><User size={24} /> 개인 정보 수정</h2>

                        <div className="profile-header">
                            <div className="avatar-wrap">
                                <img src={userData.profileImage} alt="" className="avatar-img" />
                                <div className="camera-btn"><Camera size={16} /></div>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.35rem', fontWeight: 950 }}>{userData.name}님 반가워요!</h3>
                                <p style={{ color: 'var(--text-muted)', fontWeight: 700 }}>가입일: 2026.01.15</p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">이름</label>
                                <input type="text" className="form-input" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">이메일</label>
                                <input type="email" className="form-input" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">전화번호</label>
                                <input type="tel" className="form-input" value={userData.phone} onChange={e => setUserData({ ...userData, phone: e.target.value })} />
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ padding: '1rem 2rem' }}>저장하기</button>

                        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                            <h3 style={{ marginBottom: '2rem', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Lock size={20} /> 비밀번호 변경</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">현재 비밀번호</label>
                                    <input type="password" placeholder="••••••••" className="form-input" value={pwData.current} onChange={e => setPwData({ ...pwData, current: e.target.value })} />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 1' }}></div>
                                <div className="form-group">
                                    <label className="form-label">새 비밀번호</label>
                                    <input type="password" placeholder="신규 비밀번호" className="form-input" value={pwData.next} onChange={e => setPwData({ ...pwData, next: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">비밀번호 확인</label>
                                    <input type="password" placeholder="비밀번호 재입력" className="form-input" value={pwData.confirm} onChange={e => setPwData({ ...pwData, confirm: e.target.value })} />
                                </div>
                            </div>
                            <button className="btn btn-secondary" style={{ padding: '0.85rem 1.5rem' }} disabled={!pwData.next}>비밀번호 변경</button>
                        </div>
                    </div>
                )}

                {activeSection === 'activity' && (
                    <div className="fade-in">
                        <h2 className="section-title"><FileText size={24} /> 내 활동 내역</h2>

                        <div className="activity-grid">
                            <a href="#" className="activity-plate">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div className="plate-icon-wrap"><FileText size={24} /></div>
                                    <div>
                                        <h4 style={{ fontWeight: 950, fontSize: '1.1rem' }}>내가 쓴 글</h4>
                                        <p style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.85rem' }}>지금까지 작성한 게시글 12개</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-muted" />
                            </a>
                            <a href="#" className="activity-plate">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div className="plate-icon-wrap"><MessageSquare size={24} /></div>
                                    <div>
                                        <h4 style={{ fontWeight: 950, fontSize: '1.1rem' }}>내가 쓴 댓글</h4>
                                        <p style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.85rem' }}>지금까지 작성한 댓글 45개</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-muted" />
                            </a>
                            <a href="#" className="activity-plate">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div className="plate-icon-wrap" style={{ color: '#ec4899' }}><Heart size={24} /></div>
                                    <div>
                                        <h4 style={{ fontWeight: 950, fontSize: '1.1rem' }}>좋아요 누른 CCA</h4>
                                        <p style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.85rem' }}>팬으로 등록한 CCA 5명</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-muted" />
                            </a>
                        </div>
                    </div>
                )}

                {activeSection === 'settings' && (
                    <div className="fade-in">
                        <h2 className="section-title"><Bell size={24} /> 알림 및 보안 설정</h2>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="toggle-row">
                                <div className="toggle-info">
                                    <h4>예약 알림</h4>
                                    <p>예약 신청, 대기, 확정 등 예약 상태 변경 시 알림을 받습니다.</p>
                                </div>
                                <div className={`switch ${userData.notifications.reservation ? 'on' : ''}`} onClick={() => toggleNotification('reservation')}></div>
                            </div>
                            <div className="toggle-row">
                                <div className="toggle-info">
                                    <h4>커뮤니티 댓글 알림</h4>
                                    <p>내 글에 새로운 댓글이나 답글이 달릴 때 알림을 받습니다.</p>
                                </div>
                                <div className={`switch ${userData.notifications.comment ? 'on' : ''}`} onClick={() => toggleNotification('comment')}></div>
                            </div>
                            <div className="toggle-row">
                                <div className="toggle-info">
                                    <h4>이메일 알림 수신</h4>
                                    <p>주요 소식 및 혜택 정보를 이메일로 받아봅니다.</p>
                                </div>
                                <div className={`switch ${userData.notifications.email ? 'on' : ''}`} onClick={() => toggleNotification('email')}></div>
                            </div>
                            <div className="toggle-row">
                                <div className="toggle-info">
                                    <h4>SMS 알림 수신</h4>
                                    <p>중요 알림을 휴대폰 문자 메시지로 받아봅니다.</p>
                                </div>
                                <div className={`switch ${userData.notifications.sms ? 'on' : ''}`} onClick={() => toggleNotification('sms')}></div>
                            </div>
                        </div>

                        <div className="danger-zone">
                            <button className="danger-btn" onClick={() => setShowDeleteAccountModal(true)}>
                                <ShieldAlert size={18} /> 서비스 탈퇴하기
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Delete Account Modal */}
            {showDeleteAccountModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteAccountModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', cursor: 'pointer' }} onClick={() => setShowDeleteAccountModal(false)}><X size={24} /></div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '1rem', color: '#ef4444' }}>정말로 탈퇴하시겠습니까?</h2>
                        <p style={{ fontWeight: 700, color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                            탈퇴 시 모든 예약 내역, 활동 기록, 보유 포인트가 즉시 파기되며 복구할 수 없습니다.
                        </p>

                        <div className="form-group">
                            <label className="form-label">탈퇴 사유</label>
                            <textarea
                                className="form-input"
                                style={{ height: '100px', resize: 'none' }}
                                placeholder="탈퇴 사유를 적어주시면 서비스 개선에 큰 도움이 됩니다."
                            ></textarea>
                        </div>

                        <div style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: '16px', marginBottom: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: 18, height: 18 }} />
                                <span style={{ fontSize: '0.9rem', fontWeight: 850, color: '#b91c1c' }}>안내 사항을 모두 확인하였으며, 이에 동의합니다.</span>
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowDeleteAccountModal(false)}>취소</button>
                            <button className="btn btn-primary" style={{ flex: 1, backgroundColor: '#ef4444' }} onClick={() => { alert('그동안 서비스를 이용해주셔서 감사합니다.'); navigate('/'); }}>탈퇴 신청</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPage;
