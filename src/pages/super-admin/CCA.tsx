import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Star,
    Download,
    Eye,
    Trash2,
    MessageSquare,
    ChevronRight,
    Award,
    DollarSign,
    Coffee,
    RefreshCcw,
    Image as ImageIcon
} from 'lucide-react';

// Types
interface CCA {
    id: string;
    name: string;
    partnerName: string;
    grade: 'ACE' | 'PRO' | 'CUTE';
    status: 'active' | 'on_leave' | 'resigned';
    joinDate: string;
    totalReservations: number;
    rating: number;
}

interface TransferRequest {
    id: string;
    ccaName: string;
    currentPartner: string;
    targetPartner: string;
    requestDate: string;
    reason: string;
}

const CCAManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'transfer'>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPartner, setSelectedPartner] = useState('전체');
    const [selectedGrade, setSelectedGrade] = useState('전체');
    const [showDetail, setShowDetail] = useState<string | null>(null);
    const [selectedCCAs, setSelectedCCAs] = useState<string[]>([]);

    // Mock Data
    const ccas: CCA[] = [
        { id: '1', name: '김지은', partnerName: '골든 JTV', grade: 'ACE', status: 'active', joinDate: '2025-11-20', totalReservations: 450, rating: 4.9 },
        { id: '2', name: '이지수', partnerName: '바 마닐라', grade: 'PRO', status: 'on_leave', joinDate: '2025-12-05', totalReservations: 320, rating: 4.7 },
        { id: '3', name: '박서연', partnerName: '골든 JTV', grade: 'CUTE', status: 'active', joinDate: '2026-01-10', totalReservations: 120, rating: 4.5 },
        { id: '4', name: '최윤아', partnerName: '클락 힐즈', grade: 'ACE', status: 'resigned', joinDate: '2025-10-15', totalReservations: 580, rating: 4.8 },
        { id: '5', name: '정하늘', partnerName: '마닐라 센터', grade: 'PRO', status: 'active', joinDate: '2026-02-01', totalReservations: 45, rating: 4.6 },
    ];

    const transfers: TransferRequest[] = [
        { id: '1', ccaName: '이지수', currentPartner: '바 마닐라', targetPartner: '골든 JTV', requestDate: '2026-02-12', reason: '거주지 이전으로 인한 소속 변경 요청' },
    ];

    const filteredCCAs = ccas.filter(cca => {
        const matchesSearch = cca.name.includes(searchTerm);
        const matchesPartner = selectedPartner === '소속업체: 전체' || selectedPartner === '전체' || cca.partnerName === selectedPartner;
        const matchesGrade = selectedGrade === '등급: 전체' || selectedGrade === '전체' || cca.grade === selectedGrade;
        return matchesSearch && matchesPartner && matchesGrade;
    });

    const toggleSelectAll = () => {
        if (selectedCCAs.length === filteredCCAs.length) {
            setSelectedCCAs([]);
        } else {
            setSelectedCCAs(filteredCCAs.map(cca => cca.id));
        }
    };

    const toggleSelectOne = (id: string) => {
        setSelectedCCAs(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="cca-view">
            <style>{`
        .cca-view { display: flex; flex-direction: column; gap: 1.5rem; }
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
        td { padding: 1rem; border-bottom: 1px solid var(--border); }
        
        .grade-badge { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; }
        .grade-ACE { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }
        .grade-PRO { background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); }
        .grade-CUTE { background: rgba(16, 185, 129, 0.1); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.2); }

        .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }
        .status-active { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
        .status-on_leave { background: #f59e0b; }
        .status-resigned { background: #ef4444; }

        .action-btn { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-muted); transition: 0.2s; }
        .action-btn:hover { background: var(--surface-alt); color: var(--text); }
        
        .side-drawer { position: fixed; top: 0; right: 0; width: 550px; height: 100vh; background: var(--surface); border-left: 1px solid var(--border); z-index: 100; box-shadow: -10px 0 30px rgba(0,0,0,0.5); padding: 0; transform: translateX(100%); transition: transform 0.3s ease; overflow-y: auto; display: flex; flex-direction: column; }
        .side-drawer.open { transform: translateX(0); }
        .drawer-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.5); z-index: 99; display: none; }
        .drawer-overlay.open { display: block; }

        .drawer-header { padding: 2.5rem 2rem; background: linear-gradient(to bottom, rgba(79, 70, 229, 0.1), transparent); position: relative; }
        .drawer-content { padding: 0 2rem 2rem; display: flex; flex-direction: column; gap: 2.5rem; }
        
        .stat-box { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 1.25rem; border-radius: 12px; display: flex; flex-direction: column; gap: 0.5rem; }
        .stat-value { font-size: 1.5rem; font-weight: 700; color: var(--text); }
        .stat-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }

        .media-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .media-item { aspect-ratio: 1; border-radius: 8px; background: rgba(255,255,255,0.05); overflow: hidden; cursor: pointer; border: 1px solid transparent; }
        .media-item:hover { border-color: var(--primary); }
        .media-item img { width: 100%; height: 100%; object-fit: cover; }
      `}</style>

            <div className="view-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>CCA 통합 관리</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>플랫폼 내 모든 CCA의 상세 프로필과 상태를 통합 관리합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary"><Download size={18} /> 데이터 내보내기</button>
                    <button className="btn btn-primary"><MessageSquare size={18} /> 일괄 메시지</button>
                </div>
            </div>

            <div className="tab-container">
                <div className={`tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => { setActiveTab('list'); setSelectedCCAs([]); }}>
                    전체 목록 <span className="badge badge-info" style={{ marginLeft: '4px' }}>{ccas.length}</span>
                </div>
                <div className={`tab ${activeTab === 'transfer' ? 'active' : ''}`} onClick={() => { setActiveTab('transfer'); setSelectedCCAs([]); }}>
                    이동 승인 대기 <span className="badge badge-warning" style={{ marginLeft: '4px' }}>{transfers.length}</span>
                </div>
            </div>

            {activeTab === 'list' ? (
                <>
                    <div className="toolbar">
                        <div className="filter-group">
                            <div className="input-box" style={{ width: '240px' }}>
                                <Search size={18} className="text-muted" />
                                <input
                                    type="text"
                                    placeholder="이름, 연락처 검색..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <Filter size={18} className="text-muted" />
                                <select value={selectedPartner} onChange={(e) => setSelectedPartner(e.target.value)}>
                                    <option>소속업체: 전체</option>
                                    <option>골든 JTV</option>
                                    <option>바 마닐라</option>
                                    <option>클락 힐즈</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <Award size={18} className="text-muted" />
                                <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                                    <option>등급: 전체</option>
                                    <option>ACE</option>
                                    <option>PRO</option>
                                    <option>CUTE</option>
                                </select>
                            </div>
                        </div>
                        <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>
                            <Coffee size={18} /> 일괄 휴무 설정
                        </button>
                    </div>

                    {selectedCCAs.length > 0 && (
                        <div className="bulk-actions">
                            <div style={{ fontWeight: 600 }}>{selectedCCAs.length}명의 CCA 선택됨</div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)' }}>
                                    <Award size={16} /> 등급 상향
                                </button>
                                <button className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)' }}>
                                    <RefreshCcw size={16} /> 일괄 정산
                                </button>
                                <button className="btn btn-error" style={{ color: '#fff', background: '#ef4444' }}>
                                    <Trash2 size={16} /> 일괄 퇴사
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCCAs.length === filteredCCAs.length && filteredCCAs.length > 0}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th>이름</th>
                                    <th>소속 업체</th>
                                    <th>등급</th>
                                    <th>상태</th>
                                    <th>누적 예약</th>
                                    <th>평점</th>
                                    <th>가입일</th>
                                    <th style={{ width: '80px' }}>액션</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCCAs.map((cca) => (
                                    <tr key={cca.id} style={{ background: selectedCCAs.includes(cca.id) ? 'rgba(79, 70, 229, 0.05)' : 'transparent' }}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedCCAs.includes(cca.id)}
                                                onChange={() => toggleSelectOne(cca.id)}
                                            />
                                        </td>
                                        <td><div style={{ fontWeight: 600 }}>{cca.name}</div></td>
                                        <td>{cca.partnerName}</td>
                                        <td><span className={`grade-badge grade-${cca.grade}`}>{cca.grade}</span></td>
                                        <td>
                                            <span className={`status-dot status-${cca.status}`} />
                                            {cca.status === 'active' ? '활동 중' : cca.status === 'on_leave' ? '휴무' : '퇴사'}
                                        </td>
                                        <td>{cca.totalReservations}건</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                                                <Star size={14} fill="#fbbf24" /> {cca.rating}
                                            </div>
                                        </td>
                                        <td>{cca.joinDate}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                <div className="action-btn" onClick={() => setShowDetail(cca.id)}><Eye size={16} /></div>
                                                <div className="action-btn"><MoreVertical size={16} /></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>CCA명</th>
                                <th>현재 소속</th>
                                <th>이동 희망 업체</th>
                                <th>요청 사유</th>
                                <th>요청일</th>
                                <th style={{ width: '150px' }}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transfers.map((req) => (
                                <tr key={req.id}>
                                    <td><div style={{ fontWeight: 600 }}>{req.ccaName}</div></td>
                                    <td>{req.currentPartner}</td>
                                    <td style={{ color: 'var(--primary)', fontWeight: 600 }}>{req.targetPartner}</td>
                                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.reason}</td>
                                    <td>{req.requestDate}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>승인</button>
                                            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>거절</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* CCA Detail Drawer */}
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
                                <div style={{ width: '100px', height: '100px', borderRadius: '24px', background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 800 }}>
                                        {ccas.find(c => c.id === showDetail)?.name[0]}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <h2 style={{ fontSize: '1.75rem' }}>{ccas.find(c => c.id === showDetail)?.name}</h2>
                                        <span className={`grade-badge grade-${ccas.find(c => c.id === showDetail)?.grade}`}>
                                            {ccas.find(c => c.id === showDetail)?.grade}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)' }}>{ccas.find(c => c.id === showDetail)?.partnerName} 소속 • 24세</p>
                                </div>
                            </div>
                        </div>

                        <div className="drawer-content">
                            {/* Stats Summary */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                <div className="stat-box">
                                    <span className="stat-label">총 예약</span>
                                    <span className="stat-value">{ccas.find(c => c.id === showDetail)?.totalReservations}건</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-label">평균 평점</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                                        <Star size={18} fill="#fbbf24" />
                                        <span className="stat-value">{ccas.find(c => c.id === showDetail)?.rating}</span>
                                    </div>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-label">노쇼율</span>
                                    <span className="stat-value" style={{ color: 'var(--error)' }}>1.2%</span>
                                </div>
                            </div>

                            {/* Management Actions */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <button className="btn btn-secondary" style={{ padding: '0.75rem', justifyContent: 'center' }}><Award size={18} /> 등급 변경</button>
                                <button className="btn btn-secondary" style={{ padding: '0.75rem', justifyContent: 'center' }}><DollarSign size={18} /> 포인트 조정</button>
                                <button className="btn btn-secondary" style={{ padding: '0.75rem', justifyContent: 'center' }}><RefreshCcw size={18} /> 복직 처리</button>
                                <button className="btn btn-secondary" style={{ padding: '0.75rem', justifyContent: 'center', color: 'var(--warning)' }}><Coffee size={18} /> 강제 휴무</button>
                                <button className="btn btn-error" style={{ gridColumn: 'span 2', padding: '0.75rem', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>
                                    <Trash2 size={18} /> 강제 퇴사 (미래 예약 자동 취소)
                                </button>
                            </div>

                            {/* Media Gallery Preview */}
                            <section>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h4 style={{ fontWeight: 600 }}>포트폴리오 미디어</h4>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', cursor: 'pointer' }}>전체보기 <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></button>
                                </div>
                                <div className="media-grid">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="media-item">
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                                <ImageIcon size={24} style={{ opacity: 0.3 }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Recent Activity */}
                            <section>
                                <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>최근 활동 기록</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { date: '2026-02-12 14:20', log: '테이블 예약 1건 완료 (손님: 안철수)' },
                                        { date: '2026-02-11 18:00', log: '출근 체크인 성공 (골든 JTV)' },
                                        { date: '2026-02-10 11:30', log: '등급 상향 (PRO → ACE, 시스템 자동)' },
                                    ].map((log, i) => (
                                        <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                                            <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{log.log}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{log.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CCAManagement;
