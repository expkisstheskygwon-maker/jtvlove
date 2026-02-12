import React, { useState } from 'react';
import {
    Search,
    MoreVertical,
    Calendar,
    Download,
    Eye,
    MessageSquare,
    Award,
    History,
    Ban,
    Clock,
    ExternalLink,
    ShieldAlert,
    BarChart3,
    FileText,
    MessageCircle,
    ArrowUpDown,
    RefreshCcw,
    CheckCircle2
} from 'lucide-react';

// Types
interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    joinDate: string;
    lastLogin: string;
    grade: 'VIP' | 'EXCELLENT' | 'NORMAL' | 'CAUTION';
    status: 'active' | 'suspended' | 'withdrawn';
    totalReservations: number;
    totalSpent: number;
}

const UserManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'activity'>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('전체');
    const [selectedStatus, setSelectedStatus] = useState('전체');
    const [showDetail, setShowDetail] = useState<string | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [sortField, setSortField] = useState<keyof User>('joinDate');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Mock Data
    const users: User[] = [
        { id: 'u1', name: '홍길동', email: 'hong@example.com', phone: '010-1111-2222', joinDate: '2025-10-01', lastLogin: '2026-02-12 10:30', grade: 'VIP', status: 'active', totalReservations: 42, totalSpent: 1250000 },
        { id: 'u2', name: '이순신', email: 'lee@example.com', phone: '010-3333-4444', joinDate: '2025-11-15', lastLogin: '2026-02-11 15:45', grade: 'EXCELLENT', status: 'active', totalReservations: 25, totalSpent: 850000 },
        { id: 'u3', name: '강감찬', email: 'kang@example.com', phone: '010-5555-6666', joinDate: '2025-12-20', lastLogin: '2026-01-30 09:12', grade: 'NORMAL', status: 'suspended', totalReservations: 12, totalSpent: 320000 },
        { id: 'u4', name: '유관순', email: 'yu@example.com', phone: '010-7777-8888', joinDate: '2026-01-05', lastLogin: '2026-02-12 17:20', grade: 'CAUTION', status: 'active', totalReservations: 5, totalSpent: 120000 },
        { id: 'u5', name: '김철수', email: 'kim@example.com', phone: '010-9999-0000', joinDate: '2026-02-01', lastLogin: '2026-02-01 11:00', grade: 'NORMAL', status: 'active', totalReservations: 1, totalSpent: 45000 },
    ];

    const handleSort = (field: keyof User) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.includes(searchTerm) || user.email.includes(searchTerm) || user.phone.includes(searchTerm) || user.id.includes(searchTerm);
        const matchesGrade = selectedGrade === '전체' || user.grade === selectedGrade;
        const matchesStatus = selectedStatus === '전체' || user.status === selectedStatus;
        return matchesSearch && matchesGrade && matchesStatus;
    }).sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const toggleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(u => u.id));
        }
    };

    const toggleSelectOne = (id: string) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="users-view">
            <style>{`
        .users-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .view-header { display: flex; justify-content: space-between; align-items: flex-end; }
        
        .tab-container { display: flex; gap: 2rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; }
        .tab { padding: 0.75rem 0.5rem; cursor: pointer; color: var(--text-muted); font-weight: 500; font-size: 0.9375rem; position: relative; transition: all 0.2s; }
        .tab.active { color: var(--primary); font-weight: 700; }
        .tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: var(--primary); }
        
        .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .filter-group { display: flex; align-items: center; gap: 0.75rem; flex: 1; }
        .input-box { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0.625rem 1rem; color: var(--text); outline: none; display: flex; align-items: center; gap: 0.5rem; }
        .input-box input, .input-box select { background: transparent; border: none; color: inherit; outline: none; width: 100%; }

        .bulk-actions { padding: 1rem 1.5rem; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; animation: slideDown 0.3s ease; }
        @keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .table-container { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        th { background: rgba(255, 255, 255, 0.02); padding: 1rem; text-align: left; color: var(--text-muted); font-weight: 600; border-bottom: 1px solid var(--border); }
        th.sortable { cursor: pointer; transition: 0.2s; }
        th.sortable:hover { color: var(--primary); background: rgba(255, 255, 255, 0.05); }
        td { padding: 1rem; border-bottom: 1px solid var(--border); }
        
        .grade-badge { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; }
        .grade-VIP { background: rgba(168, 85, 247, 0.1); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.2); }
        .grade-EXCELLENT { background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); }
        .grade-NORMAL { background: rgba(148, 163, 184, 0.1); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.2); }
        .grade-CAUTION { background: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); }

        .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }
        .status-active { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
        .status-suspended { background: #ef4444; }
        .status-withdrawn { background: #64748b; }

        .action-btn { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-muted); transition: 0.2s; }
        .action-btn:hover { background: var(--surface-alt); color: var(--text); }
        
        .side-drawer { position: fixed; top: 0; right: 0; width: 650px; height: 100vh; background: var(--surface); border-left: 1px solid var(--border); z-index: 100; box-shadow: -10px 0 30px rgba(0,0,0,0.5); padding: 0; transform: translateX(100%); transition: transform 0.3s ease; overflow-y: auto; display: flex; flex-direction: column; }
        .side-drawer.open { transform: translateX(0); }
        .drawer-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.5); z-index: 99; display: none; }
        .drawer-overlay.open { display: block; }

        .drawer-header { padding: 2.5rem 2rem; background: linear-gradient(to bottom, rgba(79, 70, 229, 0.1), transparent); position: relative; }
        .drawer-content { padding: 0 2rem 2rem; display: flex; flex-direction: column; gap: 2.5rem; }
        
        .info-card { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 1.5rem; border-radius: 16px; }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .info-item label { display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.35rem; }
        .info-item span { font-weight: 500; font-size: 0.9375rem; }

        .stat-badge { background: var(--surface-alt); padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid var(--border); }
        .stat-badge .label { font-size: 0.7rem; color: var(--text-muted); display: block; }
        .stat-badge .value { font-size: 1.125rem; font-weight: 700; color: var(--text); }

        .history-item { border-left: 2px solid var(--border); padding-left: 1.5rem; position: relative; padding-bottom: 1.5rem; }
        .history-item::before { content: ''; position: absolute; left: -5px; top: 0; width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
        .history-item.active::before { background: var(--primary); box-shadow: 0 0 8px var(--primary); }
      `}</style>

            <div className="view-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>일반유저 관리</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>플랫폼 가입자들의 활동 이력과 등급, 제재 상태를 관리합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary"><Download size={18} /> 전체 데이터 추출</button>
                    <button className="btn btn-primary" onClick={() => alert('휴면 계정 124건이 정리되었습니다.')}><Clock size={18} /> 휴면 계정 정리</button>
                </div>
            </div>

            <div className="tab-container">
                <div className={`tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
                    유저 목록 <span className="badge badge-info" style={{ marginLeft: '4px' }}>{users.length}</span>
                </div>
                <div className={`tab ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
                    활동 분석 <span className="badge badge-warning" style={{ marginLeft: '4px' }}>NEW</span>
                </div>
            </div>

            {activeTab === 'list' ? (
                <>
                    <div className="toolbar">
                        <div className="filter-group">
                            <div className="input-box" style={{ width: '280px' }}>
                                <Search size={18} className="text-muted" />
                                <input
                                    type="text"
                                    placeholder="이름, 이메일, 연락처, ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <Award size={18} className="text-muted" />
                                <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                                    <option value="전체">등급: 전체</option>
                                    <option value="VIP">VIP</option>
                                    <option value="EXCELLENT">우수</option>
                                    <option value="NORMAL">일반</option>
                                    <option value="CAUTION">주의</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <ShieldAlert size={18} className="text-muted" />
                                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                    <option value="전체">상태: 전체</option>
                                    <option value="active">정상</option>
                                    <option value="suspended">정지</option>
                                    <option value="withdrawn">탈퇴</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <Calendar size={18} className="text-muted" />
                                <select style={{ minWidth: '120px' }}>
                                    <option>가입일 전체</option>
                                    <option>최근 7일</option>
                                    <option>최근 30일</option>
                                    <option>1년 이내</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {selectedUsers.length > 0 && (
                        <div className="bulk-actions">
                            <div style={{ fontWeight: 600 }}>{selectedUsers.length}명의 유저 선택됨</div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'transparent' }}>
                                    <Award size={16} /> 등급 상향
                                </button>
                                <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'transparent' }}>
                                    <MessageSquare size={16} /> 일괄 메시지
                                </button>
                                <button className="btn btn-error" style={{ background: '#ef4444', color: 'white' }}>
                                    <Ban size={16} /> 일괄 영구 정지
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}><input type="checkbox" checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} onChange={toggleSelectAll} /></th>
                                    <th>이름 / ID</th>
                                    <th>이메일</th>
                                    <th className="sortable" onClick={() => handleSort('grade')}>등급 <ArrowUpDown size={12} /></th>
                                    <th>상태</th>
                                    <th className="sortable" onClick={() => handleSort('totalReservations')}>누적 예약 <ArrowUpDown size={12} /></th>
                                    <th className="sortable" onClick={() => handleSort('joinDate')}>가입일 <ArrowUpDown size={12} /></th>
                                    <th style={{ width: '100px' }}>액션</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                    <tr key={user.id} style={{ background: selectedUsers.includes(user.id) ? 'rgba(79, 70, 229, 0.05)' : 'transparent' }}>
                                        <td><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => toggleSelectOne(user.id)} /></td>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{user.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user.id}</div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td><span className={`grade-badge grade-${user.grade}`}>{user.grade === 'EXCELLENT' ? '우수' : user.grade}</span></td>
                                        <td>
                                            <span className={`status-dot status-${user.status}`} />
                                            {user.status === 'active' ? '정상' : user.status === 'suspended' ? '정지' : '탈퇴'}
                                        </td>
                                        <td>{user.totalReservations}건</td>
                                        <td>{user.joinDate}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                <div className="action-btn" onClick={() => setShowDetail(user.id)}><Eye size={16} /></div>
                                                <div className="action-btn"><Award size={16} /></div>
                                                <div className="action-btn"><Ban size={16} style={{ color: 'var(--error)' }} /></div>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>검색 결과가 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div className="info-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <BarChart3 className="text-primary" />
                            <h3 style={{ fontSize: '1rem' }}>등급 분포</h3>
                        </div>
                        {/* Chart Placeholder */}
                        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem' }}>
                            {[60, 45, 120, 20].map((h, i) => (
                                <div key={i} style={{ flex: 1, background: 'var(--primary)', height: `${h}px`, borderRadius: '4px 4px 0 0', opacity: 0.7 + (i * 0.1) }} />
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <span>VIP (15%)</span><span>우수 (25%)</span><span>일반 (50%)</span><span>주의 (10%)</span>
                        </div>
                    </div>
                    <div className="info-card">
                        <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>통합 키워드 활동 검색</h3>
                        <div className="input-box" style={{ marginBottom: '1rem' }}>
                            <Search size={18} className="text-muted" />
                            <input type="text" placeholder="게시글, 댓글 제목 및 내용 검색..." />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '8px', fontSize: '0.85rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: 600 }}>홍길동</span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>2026-02-12</span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>"여기 **마닐라** 업체 추천하시나요? 시설이 어떤지 궁금합니다..."</p>
                            </div>
                            <div style={{ padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '8px', fontSize: '0.85rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: 600 }}>이순신</span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>2026-02-11</span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>"댓글: 저도 지난주에 다녀왔는데 **마닐라** 센터가 제일 좋았어요."</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* User Detail Drawer */}
            <div className={`drawer-overlay ${showDetail ? 'open' : ''}`} onClick={() => setShowDetail(null)} />
            <div className={`side-drawer ${showDetail ? 'open' : ''}`}>
                {showDetail && (
                    <>
                        <div className="drawer-header">
                            <button
                                className="btn btn-secondary"
                                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', borderRadius: '50%', width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
                                onClick={() => setShowDetail(null)}
                            >
                                ×
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 800 }}>
                                    {users.find(u => u.id === showDetail)?.name[0]}
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                                        <h2 style={{ fontSize: '1.5rem' }}>{users.find(u => u.id === showDetail)?.name}</h2>
                                        <span className={`grade-badge grade-${users.find(u => u.id === showDetail)?.grade}`}>
                                            {users.find(u => u.id === showDetail)?.grade === 'EXCELLENT' ? '우수' : users.find(u => u.id === showDetail)?.grade}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{users.find(u => u.id === showDetail)?.email} • {users.find(u => u.id === showDetail)?.id}</p>
                                </div>
                            </div>
                        </div>

                        <div className="drawer-content">
                            {/* Quick Stats */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                <div className="stat-badge">
                                    <span className="label">누적 예약</span>
                                    <span className="value">{users.find(u => u.id === showDetail)?.totalReservations}건</span>
                                </div>
                                <div className="stat-badge">
                                    <span className="label">누적 결제</span>
                                    <span className="value">₱{(users.find(u => u.id === showDetail)?.totalSpent || 0).toLocaleString()}</span>
                                </div>
                                <div className="stat-badge">
                                    <span className="label">노쇼 이력</span>
                                    <span className="value" style={{ color: 'var(--error)' }}>2건</span>
                                </div>
                            </div>

                            {/* Information Tabs */}
                            <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                                {['상세정보', '활동내역', '제재관리'].map(t => (
                                    <button key={t} className={`tab ${t === '상세정보' ? 'active' : ''}`} style={{ border: 'none', background: 'none' }}>{t}</button>
                                ))}
                            </div>

                            {/* Detail Info Section */}
                            <section className="info-card">
                                <h4 style={{ fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <BarChart3 size={18} className="text-primary" /> 기본 및 활동 통계
                                </h4>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>대표자 연락처</label>
                                        <span>{users.find(u => u.id === showDetail)?.phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>가입 일시</label>
                                        <span>{users.find(u => u.id === showDetail)?.joinDate}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>최근 접속</label>
                                        <span>{users.find(u => u.id === showDetail)?.lastLogin}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>선호 업체 / CCA</label>
                                        <span>골든 JTV / 김지은</span>
                                    </div>
                                </div>
                            </section>

                            {/* Content Links */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                <button className="btn btn-secondary" style={{ padding: '1rem', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <FileText size={20} className="text-primary" />
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>게시글</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>총 15개 작성</div>
                                        </div>
                                    </div>
                                    <ExternalLink size={16} />
                                </button>
                                <button className="btn btn-secondary" style={{ padding: '1rem', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <MessageCircle size={20} className="text-primary" />
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>댓글</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>총 142개 작성</div>
                                        </div>
                                    </div>
                                    <ExternalLink size={16} />
                                </button>
                            </div>

                            {/* Sanction Control Section */}
                            <section className="info-card" style={{ border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.02)' }}>
                                <h4 style={{ fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--error)' }}>
                                    <ShieldAlert size={18} /> 유저 등급 및 제재 관리
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>등급 변경</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {['VIP', '우수', '일반', '주의'].map(g => (
                                                <button key={g} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }}>{g}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                                        <button className="btn btn-secondary" style={{ justifyContent: 'center', gap: '0.5rem' }}><FileText size={16} /> 게시글 제한</button>
                                        <button className="btn btn-secondary" style={{ justifyContent: 'center', gap: '0.5rem' }}><MessageCircle size={16} /> 댓글 제한</button>
                                        <button className="btn btn-secondary" style={{ justifyContent: 'center', gap: '0.5rem' }}><Calendar size={16} /> 예약 제한</button>
                                        <button className="btn btn-error" style={{ justifyContent: 'center', gap: '0.5rem' }}><Ban size={16} /> 계정 정지</button>
                                    </div>
                                </div>
                            </section>

                            {/* History Timeline */}
                            <section>
                                <h4 style={{ fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <History size={18} /> 제재 및 주요 활동 이력
                                </h4>
                                <div className="history-list">
                                    <div className="history-item active">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>게시글 작성 금지 (7일)</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>진행 중</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>사유: 도배성 게시물 작성 반복 시정 권고 무시</p>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>2026-02-10 ~ 2026-02-17</div>
                                    </div>
                                    <div className="history-item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>예약 취소 (패널티 발생)</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2026-01-15</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>직전 취소로 인한 서비스 이용 주의 등급 부여</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ flex: 4, justifyContent: 'center' }} onClick={() => alert('설정이 저장되었습니다.')}>
                                <CheckCircle2 size={18} style={{ marginRight: '8px' }} /> 상태 변경 저장
                            </button>
                            <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} title="초기화"><RefreshCcw size={18} /></button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
