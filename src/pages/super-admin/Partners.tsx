import React, { useState } from 'react';
import {
    Store,
    Users,
    Search,
    Filter,
    MoreVertical,
    AlertTriangle,
    Download,
    Plus,
    Eye,
    Trash2,
    Slash,
    MessageSquare,
    ClipboardList
} from 'lucide-react';

// Types
interface Partner {
    id: string;
    name: string;
    owner: string;
    phone: string;
    region: string;
    createdAt: string;
    status: 'active' | 'suspended' | 'pending' | 'rejected';
    ccaCount: number;
    totalReservations: number;
}

const Partners: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'approval'>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('전체');
    const [showDetail, setShowDetail] = useState<string | null>(null);

    // Mock Data
    const partners: Partner[] = [
        { id: '1', name: '골든 JTV', owner: '김주인', phone: '010-1234-5678', region: '마닐라', createdAt: '2026-01-15', status: 'active', ccaCount: 15, totalReservations: 1240 },
        { id: '2', name: '바 마닐라', owner: '이사장', phone: '010-2345-6789', region: '마닐라', createdAt: '2026-01-20', status: 'active', ccaCount: 8, totalReservations: 850 },
        { id: '3', name: '클락 힐즈', owner: '박사장', phone: '010-3456-7890', region: '클락', createdAt: '2026-02-01', status: 'suspended', ccaCount: 12, totalReservations: 420 },
        { id: '4', name: '세부 스타', owner: '최사장', phone: '010-4567-8901', region: '세부', createdAt: '2026-02-05', status: 'pending', ccaCount: 0, totalReservations: 0 },
    ];

    const approvals = partners.filter(p => p.status === 'pending');
    const filteredPartners = partners.filter(p => {
        const matchesSearch = p.name.includes(searchTerm) || p.owner.includes(searchTerm);
        const matchesRegion = selectedRegion === '전체' || p.region === selectedRegion;
        return activeTab === 'list' ? (p.status !== 'pending' && matchesSearch && matchesRegion) : (p.status === 'pending');
    });

    return (
        <div className="partners-view">
            <style>{`
        .partners-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .view-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .tab-container { display: flex; gap: 2rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; }
        .tab { padding: 0.75rem 0.5rem; cursor: pointer; color: var(--text-muted); font-weight: 500; font-size: 0.9375rem; position: relative; transition: all 0.2s; }
        .tab.active { color: var(--primary); font-weight: 700; }
        .tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: var(--primary); }
        
        .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .search-group { display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 300px; }
        .input-box { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0.625rem 1rem; color: var(--text); outline: none; width: 100%; display: flex; align-items: center; gap: 0.5rem; }
        .input-box input { background: transparent; border: none; color: inherit; outline: none; width: 100%; }
        
        .table-container { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        th { background: rgba(255, 255, 255, 0.02); padding: 1rem; text-align: left; color: var(--text-muted); font-weight: 600; border-bottom: 1px solid var(--border); }
        td { padding: 1rem; border-bottom: 1px solid var(--border); }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(255, 255, 255, 0.01); }

        .status-badge { display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.25rem 0.625rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .status-active { background: rgba(16, 185, 129, 0.1); color: #34d399; }
        .status-suspended { background: rgba(239, 68, 68, 0.1); color: #f87171; }
        .status-pending { background: rgba(245, 158, 11, 0.1); color: #fbbf24; }

        .action-btn { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-muted); transition: 0.2s; }
        .action-btn:hover { background: var(--surface-alt); color: var(--text); }
        
        .pagination { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; color: var(--text-muted); font-size: 0.8125rem; }
        
        .side-drawer { position: fixed; top: 0; right: 0; width: 500px; height: 100vh; background: var(--surface); border-left: 1px solid var(--border); z-index: 100; box-shadow: -10px 0 30px rgba(0,0,0,0.5); padding: 2rem; transform: translateX(100%); transition: transform 0.3s ease; overflow-y: auto; }
        .side-drawer.open { transform: translateX(0); }
        .drawer-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.5); z-index: 99; display: none; }
        .drawer-overlay.open { display: block; }
      `}</style>

            <div className="view-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>업체 관리</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>전체 입점 업체의 목록과 승인 대기 건을 관리합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary"><Download size={18} /> 엑셀 다운로드</button>
                    <button className="btn btn-primary"><Plus size={18} /> 새 업체 등록</button>
                </div>
            </div>

            <div className="tab-container">
                <div className={`tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
                    업체 목록 <span className="badge badge-info" style={{ marginLeft: '4px' }}>{partners.length - approvals.length}</span>
                </div>
                <div className={`tab ${activeTab === 'approval' ? 'active' : ''}`} onClick={() => setActiveTab('approval')}>
                    승인 대기 <span className="badge badge-warning" style={{ marginLeft: '4px' }}>{approvals.length}</span>
                </div>
            </div>

            <div className="toolbar">
                <div className="search-group">
                    <div className="input-box" style={{ maxWidth: '300px' }}>
                        <Search size={18} className="text-muted" />
                        <input
                            type="text"
                            placeholder="업체명, 대표자 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="input-box" style={{ maxWidth: '150px' }}>
                        <Filter size={18} className="text-muted" />
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'inherit', outline: 'none', width: '100%', cursor: 'pointer' }}
                        >
                            <option>전체</option>
                            <option>마닐라</option>
                            <option>클락</option>
                            <option>세부</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }} title="필터 초기화">
                        <Slash size={18} />
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '40px' }}><input type="checkbox" /></th>
                            <th>업체명</th>
                            <th>대표자</th>
                            <th>지역</th>
                            <th>CCA</th>
                            <th>누적 예약</th>
                            <th>상태</th>
                            <th>등록일</th>
                            <th style={{ width: '80px' }}>액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPartners.length > 0 ? filteredPartners.map((item) => (
                            <tr key={item.id}>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.phone}</div>
                                </td>
                                <td>{item.owner}</td>
                                <td>{item.region}</td>
                                <td>{item.ccaCount}명</td>
                                <td>{item.totalReservations.toLocaleString()}건</td>
                                <td>
                                    <span className={`status-badge status-${item.status}`}>
                                        {item.status === 'active' ? '정상' : item.status === 'suspended' ? '정지' : '대기'}
                                    </span>
                                </td>
                                <td>{item.createdAt}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        <div className="action-btn" onClick={() => setShowDetail(item.id)}><Eye size={16} /></div>
                                        <div className="action-btn"><MoreVertical size={16} /></div>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={9} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                    검색 결과가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="pagination">
                    <div>전체 {filteredPartners.length}건 중 1-10 표시</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }}>이전</button>
                        <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem' }}>1</button>
                        <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }}>다음</button>
                    </div>
                </div>
            </div>

            {/* Detail Overlay & Drawer */}
            <div className={`drawer-overlay ${showDetail ? 'open' : ''}`} onClick={() => setShowDetail(null)} />
            <div className={`side-drawer ${showDetail ? 'open' : ''}`}>
                {showDetail && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Store className="text-primary" /> 업체 상세 정보
                            </h2>
                            <button className="btn btn-secondary" onClick={() => setShowDetail(null)}>닫기</button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 800 }}>
                                {partners.find(p => p.id === showDetail)?.name[0]}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem' }}>{partners.find(p => p.id === showDetail)?.name}</h3>
                                <span className={`status-badge status-${partners.find(p => p.id === showDetail)?.status}`}>
                                    {partners.find(p => p.id === showDetail)?.status === 'active' ? '정상 운영 중' : '정지됨'}
                                </span>
                            </div>
                        </div>

                        <section>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>기본 정보</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>대표자명</label>
                                    <div style={{ fontWeight: 500 }}>{partners.find(p => p.id === showDetail)?.owner}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>연락처</label>
                                    <div style={{ fontWeight: 500 }}>{partners.find(p => p.id === showDetail)?.phone}</div>
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>사업장 주소</label>
                                    <div style={{ fontWeight: 500 }}>필리핀 {partners.find(p => p.id === showDetail)?.region} 인근 메인 스트리트 123-45</div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>통계 요약</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                    <Users size={20} style={{ margin: '0 auto 0.5rem', color: 'var(--secondary)' }} />
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{partners.find(p => p.id === showDetail)?.ccaCount}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>소속 CCA</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                    <ClipboardList size={20} style={{ margin: '0 auto 0.5rem', color: 'var(--success)' }} />
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{partners.find(p => p.id === showDetail)?.totalReservations}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>총 예약</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                    <AlertTriangle size={20} style={{ margin: '0 auto 0.5rem', color: 'var(--error)' }} />
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>2.4%</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>노쇼율</div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>관리 액션</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1 }}><Slash size={16} /> 운영 정지</button>
                                <button className="btn btn-secondary" style={{ flex: 1 }}><MessageSquare size={16} /> 메시지 발송</button>
                                <button className="btn btn-error" style={{ flex: 'none', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}><Trash2 size={16} /></button>
                            </div>
                        </section>

                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>정보 수정하기</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Partners;
