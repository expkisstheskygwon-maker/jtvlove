import React, { useState } from 'react';
import {
    Search,
    MoreVertical,
    ArrowRightLeft,
    Settings,
    User,
    Award,
    Trash2,
    CheckCircle2,
    XCircle,
    Clock,
    TrendingUp,
    Shield,
    Heart,
    Eye,
    Edit2,
    AlertCircle,
    X,
    Save
} from 'lucide-react';

type CCAGrade = 'ACE' | 'PRO' | 'CUTE';
type CCAStatus = 'active' | 'absence' | 'dayoff' | 'resigned';

interface CCA {
    id: string;
    name: string;
    age: number;
    grade: CCAGrade;
    status: CCAStatus;
    joinDate: string;
    totalReservations: number;
    rating: number;
    points: number;
    intro: string;
}

interface TransferRequest {
    id: string;
    name: string;
    previousPartner: string;
    requestDate: string;
    reason: string;
}

const PartnerCCAManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'transfer' | 'grades'>('list');
    const [selectedCCA, setSelectedCCA] = useState<CCA | null>(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showManage, setShowManage] = useState(false);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGrade, setFilterGrade] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mock Data
    const ccas: CCA[] = [
        { id: '1', name: '미나', age: 23, grade: 'ACE', status: 'active', joinDate: '2025-10-12', totalReservations: 452, rating: 4.9, points: 1250, intro: '밝은 미소로 응대하는 미나입니다!' },
        { id: '2', name: '지수', age: 21, grade: 'PRO', status: 'dayoff', joinDate: '2025-11-05', totalReservations: 231, rating: 4.7, points: 840, intro: '섬세한 케어를 약속드립니다.' },
        { id: '3', name: '제니', age: 22, grade: 'ACE', status: 'active', joinDate: '2025-08-20', totalReservations: 612, rating: 5.0, points: 2100, intro: '베테랑의 여유를 느껴보세요.' },
        { id: '4', name: '사나', age: 24, grade: 'CUTE', status: 'absence', joinDate: '2026-01-15', totalReservations: 45, rating: 4.5, points: 150, intro: '신입이지만 패기 넘치게!' },
        { id: '5', name: '모모', age: 23, grade: 'PRO', status: 'active', joinDate: '2025-12-01', totalReservations: 189, rating: 4.8, points: 620, intro: '에너지 넘치는 모모입니다.' },
    ];

    const filteredCCAs = ccas.filter(cca => {
        const matchesSearch = cca.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = filterGrade === 'all' || cca.grade === filterGrade;
        const matchesStatus = filterStatus === 'all' || cca.status === filterStatus;
        return matchesSearch && matchesGrade && matchesStatus;
    });

    const transfers: TransferRequest[] = [
        { id: 'T1', name: '쯔위', previousPartner: '블루 JTV', requestDate: '2026-02-10', reason: '거주지 이전으로 인한 소속 변경 신청' },
        { id: 'T2', name: '다현', previousPartner: '킹스타', requestDate: '2026-02-11', reason: '지인 추천으로 인한 이직 희망' },
    ];

    const getStatusBadge = (status: CCAStatus) => {
        switch (status) {
            case 'active': return <span className="badge badge-success">활동 중</span>;
            case 'absence': return <span className="badge badge-warning">부재 중</span>;
            case 'dayoff': return <span className="badge badge-info">휴무</span>;
            case 'resigned': return <span className="badge badge-danger">퇴사</span>;
        }
    };

    const getGradeIcon = (grade: CCAGrade) => {
        switch (grade) {
            case 'ACE': return <Award size={16} color="#fbbf24" />;
            case 'PRO': return <Award size={16} color="#a0aec0" />;
            case 'CUTE': return <Heart size={16} color="#f472b6" />;
        }
    };

    return (
        <div className="cca-view">
            <style>{`
        .cca-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .tab-bar { display: flex; gap: 1rem; border-bottom: 1px solid var(--border); margin-bottom: 0.5rem; }
        .tab-btn { padding: 1rem; cursor: pointer; color: var(--text-muted); font-weight: 600; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); }
        
        .cca-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
        .cca-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.25rem; transition: transform 0.2s; position: relative; }
        .cca-card:hover { transform: translateY(-4px); border-color: var(--primary); }
        
        .card-profile { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; }
        .profile-img { width: 64px; height: 64px; border-radius: 16px; background: var(--surface-alt); border: 1px solid var(--border); overflow: hidden; display: flex; align-items: center; justify-content: center; }
        
        .stat-line { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.5rem; color: var(--text-muted); }
        .stat-val { color: var(--text); font-weight: 700; }

        .action-row { display: flex; gap: 0.5rem; margin-top: 1rem; }
        .btn-flex { flex: 1; }

        /* Modal Overlay */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .modal-container { background: var(--surface); width: 100%; max-width: 600px; border-radius: 24px; border: 1px solid var(--border); overflow: hidden; display: flex; flex-direction: column; max-height: 90vh; }
        .modal-header { padding: 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .modal-body { padding: 1.5rem; overflow-y: auto; flex: 1; }

        .grade-box { padding: 1rem; border-radius: 12px; background: var(--surface-alt); border: 1px solid var(--border); display: flex; gap: 1rem; align-items: center; cursor: pointer; }
        .grade-box.selected { border-color: var(--primary); background: rgba(99, 102, 241, 0.1); }

        @media (max-width: 768px) {
          .modal-overlay { padding: 0.5rem; }
          .cca-grid { grid-template-columns: 1fr; }
        }
      `}</style>

            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>CCA 관리</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>종업원 현황 파악 및 등급, 포인트를 관리합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div className="input-box">
                        <Search size={18} className="text-muted" />
                        <input type="text" placeholder="이름 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <select
                        className="btn btn-secondary"
                        value={filterGrade}
                        onChange={(e) => setFilterGrade(e.target.value)}
                        style={{ appearance: 'none', paddingRight: '2.5rem' }}
                    >
                        <option value="all">모든 등급</option>
                        <option value="ACE">ACE</option>
                        <option value="PRO">PRO</option>
                        <option value="CUTE">CUTE</option>
                    </select>
                    <select
                        className="btn btn-secondary"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ appearance: 'none', paddingRight: '2.5rem' }}
                    >
                        <option value="all">모든 상태</option>
                        <option value="active">활동 중</option>
                        <option value="absence">부재 중</option>
                        <option value="dayoff">휴무</option>
                        <option value="resigned">퇴사</option>
                    </select>
                </div>
            </div>

            <div className="tab-bar">
                <div className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>소속 CCA 목록</div>
                <div className={`tab-btn ${activeTab === 'transfer' ? 'active' : ''}`} onClick={() => setActiveTab('transfer')}>
                    이동 신청 <span style={{ background: '#ef4444', color: 'white', borderRadius: '50%', padding: '0 6px', fontSize: '0.7rem', marginLeft: '4px' }}>2</span>
                </div>
                <div className={`tab-btn ${activeTab === 'grades' ? 'active' : ''}`} onClick={() => setActiveTab('grades')}>등급 설정</div>
            </div>

            {activeTab === 'list' && (
                <div className="cca-grid">
                    {filteredCCAs.map((cca: CCA) => (
                        <div key={cca.id} className="cca-card">
                            <div className="card-profile">
                                <div className="profile-img">
                                    <User size={32} className="text-muted" />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{cca.name}</h3>
                                        {getGradeIcon(cca.grade)}
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{cca.age}세</span>
                                    </div>
                                    <div style={{ marginTop: '0.25rem' }}>{getStatusBadge(cca.status)}</div>
                                </div>
                                <div style={{ marginLeft: 'auto' }}>
                                    <button className="btn btn-secondary" style={{ padding: '0.4rem' }}><MoreVertical size={16} /></button>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '12px' }}>
                                <div className="stat-line"><span>누적 예약</span><span className="stat-val">{cca.totalReservations}건</span></div>
                                <div className="stat-line"><span>평점</span><span className="stat-val" style={{ color: '#fbbf24' }}>★ {cca.rating}</span></div>
                                <div className="stat-line"><span>포인트</span><span className="stat-val" style={{ color: 'var(--primary)' }}>{cca.points.toLocaleString()} P</span></div>
                            </div>

                            <div className="action-row">
                                <button className="btn btn-secondary btn-flex" onClick={() => { setSelectedCCA(cca); setShowProfile(true); }}>
                                    <Eye size={16} /> 프로필
                                </button>
                                <button className="btn btn-primary btn-flex" onClick={() => { setSelectedCCA(cca); setShowManage(true); }}>
                                    <Settings size={16} /> 관리
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'transfer' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {transfers.map(t => (
                        <div key={t.id} className="settings-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ArrowRightLeft size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{t.name} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>| {t.previousPartner} → 우리 업체</span></h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{t.reason}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        <Clock size={12} /> 신청일: {t.requestDate}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-secondary"><XCircle size={18} /> 거절</button>
                                <button className="btn btn-primary"><CheckCircle2 size={18} /> 승인</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'grades' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {['ACE', 'PRO', 'CUTE'].map(g => (
                        <div key={g} className="settings-card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {getGradeIcon(g as CCAGrade)}
                                    </div>
                                    <h3 style={{ fontWeight: 800 }}>{g} 등급</h3>
                                </div>
                                <button className="btn btn-secondary btn-sm"><Edit2 size={14} /></button>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>이 등급을 가진 CCA에게 부여되는 혜택과 설명을 편집합니다.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div className="stat-line"><span>추천 수수료</span><span className="stat-val">{g === 'ACE' ? '15%' : g === 'PRO' ? '10%' : '5%'}</span></div>
                                <div className="stat-line"><span>고객 가구비</span><span className="stat-val">{g === 'ACE' ? '₩ 50,000' : '₩ 30,000'}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Profile Modal */}
            {showProfile && selectedCCA && (
                <div className="modal-overlay" onClick={() => setShowProfile(false)}>
                    <div className="modal-container" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ fontWeight: 800 }}>CCA 프로필 상세</h3>
                            <button className="btn btn-secondary" onClick={() => setShowProfile(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                                <div style={{ width: '120px', height: '160px', borderRadius: '20px', background: 'var(--surface-alt)', border: '1px solid var(--border)' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{selectedCCA.name}</h2>
                                        {getGradeIcon(selectedCCA.grade)}
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{selectedCCA.intro}</p>
                                    <div className="cca-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div style={{ background: 'var(--surface-alt)', padding: '0.75rem', borderRadius: '12px' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>연령/신장</span>
                                            <div style={{ fontWeight: 700 }}>{selectedCCA.age}세 / 165cm</div>
                                        </div>
                                        <div style={{ background: 'var(--surface-alt)', padding: '0.75rem', borderRadius: '12px' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SNS</span>
                                            <div style={{ fontWeight: 700 }}>mina_1012 (Insta)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 style={{ fontWeight: 800, marginBottom: '1rem' }}>미디어 갤러리</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} style={{ aspectRatio: '1', borderRadius: '8px', background: 'var(--surface-alt)', border: '1px solid var(--border)' }}></div>
                                ))}
                            </div>
                        </div>
                        <div className="popup-footer" style={{ padding: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>* 프로필 수정은 CCA 본인 계정에서만 가능합니다.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Modal */}
            {showManage && selectedCCA && (
                <div className="modal-overlay" onClick={() => setShowManage(false)}>
                    <div className="modal-container" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ fontWeight: 800 }}>{selectedCCA.name} 관리</h3>
                            <button className="btn btn-secondary" onClick={() => setShowManage(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            {/* Point Management */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <TrendingUp size={18} className="text-primary" /> 포인트 관리
                                </h4>
                                <div style={{ background: 'var(--surface-alt)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <span>보유 포인트</span>
                                    <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>{selectedCCA.points.toLocaleString()} P</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input type="number" placeholder="점수 입력" className="form-input" style={{ flex: 1 }} />
                                    <button className="btn btn-secondary">차감</button>
                                    <button className="btn btn-primary">지급</button>
                                </div>
                                <input type="text" placeholder="사유를 입력하세요 (예: 우수 근무 포상)" className="form-input" style={{ width: '100%', marginTop: '0.5rem' }} />
                            </div>

                            {/* Grade Management */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Shield size={18} className="text-secondary" /> 등급 변경
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                                    {['ACE', 'PRO', 'CUTE'].map(g => (
                                        <div key={g} className={`grade-box ${selectedCCA.grade === g ? 'selected' : ''}`}>
                                            {getGradeIcon(g as CCAGrade)}
                                            <span style={{ fontWeight: 700 }}>{g}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Personnel Actions */}
                            <div>
                                <h4 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <AlertCircle size={18} className="text-danger" /> 인사 및 근태 관리
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}><Clock size={18} /> 기간제 휴무 등록</button>
                                    <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', color: '#ef4444' }}><Trash2 size={18} /> 강제 퇴사 처리</button>
                                </div>
                            </div>
                        </div>
                        <div className="popup-footer" style={{ padding: '1.25rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setShowManage(false)}>취소</button>
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowManage(false)}><Save size={18} /> 변경사항 저장</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerCCAManagement;
