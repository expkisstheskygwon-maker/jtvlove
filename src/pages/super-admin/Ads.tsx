import React, { useState } from 'react';
import {
    Briefcase,
    BarChart3,
    Plus,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    TrendingUp,
    MousePointer2,
    Download
} from 'lucide-react';

// Types
interface Advertiser {
    id: string;
    name: string;
    manager: string;
    contact: string;
    contractStart: string;
    contractEnd: string;
    status: 'active' | 'expired' | 'pending';
    activeAds: number;
}

interface Ad {
    id: string;
    title: string;
    advertiserName: string;
    placement: string;
    period: string;
    status: 'active' | 'inactive' | 'expired';
}

interface Placement {
    id: string;
    name: string;
    priority: number;
    maxSlots: number;
    activeCount: number;
}

const AdManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'advertisers' | 'contracts' | 'ads' | 'placements' | 'stats'>('advertisers');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const advertisers: Advertiser[] = [
        { id: 'ADV-01', name: '젠틀맨 JTV', manager: '홍길동', contact: '010-1234-5678', contractStart: '2026-01-01', contractEnd: '2026-12-31', status: 'active', activeAds: 3 },
        { id: 'ADV-02', name: '마닐라 투어', manager: '김철수', contact: '010-8765-4321', contractStart: '2025-06-01', contractEnd: '2026-05-31', status: 'active', activeAds: 1 },
        { id: 'ADV-03', name: '필 스테이', manager: '박영희', contact: '010-5555-5555', contractStart: '2025-01-01', contractEnd: '2025-12-31', status: 'expired', activeAds: 0 },
    ];

    const ads: Ad[] = [
        { id: 'AD-101', title: '메인 상단 와이드 배너', advertiserName: '젠틀맨 JTV', placement: '메인 상단', period: '2026.01.01 ~ 2026.12.31', status: 'active' },
        { id: 'AD-102', title: '사이드바 세로형 광고', advertiserName: '마닐라 투어', placement: '사이드바', period: '2025.06.01 ~ 2026.05.31', status: 'active' },
        { id: 'AD-103', title: '게시판 하단 띠 배너', advertiserName: '젠틀맨 JTV', placement: '게시판 하단', period: '2026.02.01 ~ 2026.08.31', status: 'inactive' },
    ];

    const placements: Placement[] = [
        { id: 'LOC-01', name: '메인 상단 헤더', priority: 1, maxSlots: 5, activeCount: 3 },
        { id: 'LOC-02', name: '메인 중앙 배너 섹션', priority: 2, maxSlots: 3, activeCount: 2 },
        { id: 'LOC-03', name: '업체 리스트 사이드바', priority: 3, maxSlots: 10, activeCount: 5 },
        { id: 'LOC-04', name: '게시글 상세 하단', priority: 4, maxSlots: 2, activeCount: 1 },
    ];

    return (
        <div className="ads-view">
            <style>{`
        .ads-view { display: flex; flex-direction: column; gap: 1.5rem; }
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
        td { padding: 1rem; border-bottom: 1px solid var(--border); }
        
        .status-pill { padding: 0.25rem 0.625rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .status-active { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-expired { background: rgba(239, 68, 68, 0.1); color: #f87171; }
        .status-pending { background: rgba(245, 158, 11, 0.1); color: #fbbf24; }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .stat-card { background: var(--surface); border: 1px solid var(--border); padding: 1.5rem; border-radius: 16px; }
        .stat-value { font-size: 1.5rem; font-weight: 700; margin: 0.5rem 0; }
        .stat-label { font-size: 0.875rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; }

        .action-icon { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-muted); transition: 0.2s; }
        .action-icon:hover { background: var(--surface-alt); color: var(--text); }
        
        .placement-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; }
        .priority-badge { width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }
      `}</style>

            <div className="view-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>광고 & 광고주 관리</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>광고주 계약부터 배너 게재 위치, 실시간 성과 지표를 관리합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary"><Download size={18} /> 보고서 다운로드</button>
                    <button className="btn btn-primary"><Plus size={18} /> 광고주 등록</button>
                </div>
            </div>

            <div className="tab-container">
                <div className={`tab ${activeTab === 'advertisers' ? 'active' : ''}`} onClick={() => setActiveTab('advertisers')}>광고주 관리</div>
                <div className={`tab ${activeTab === 'contracts' ? 'active' : ''}`} onClick={() => setActiveTab('contracts')}>계약 관리</div>
                <div className={`tab ${activeTab === 'ads' ? 'active' : ''}`} onClick={() => setActiveTab('ads')}>광고 소재 관리</div>
                <div className={`tab ${activeTab === 'placements' ? 'active' : ''}`} onClick={() => setActiveTab('placements')}>게재 위치 관리</div>
                <div className={`tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>광고 성과 통계</div>
            </div>

            <div className="toolbar">
                <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
                    <div className="input-box" style={{ width: '300px' }}>
                        <Search size={18} className="text-muted" />
                        <input
                            type="text"
                            placeholder="광고주, 광고명, 담당자 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <Filter size={18} className="text-muted" />
                        <select>
                            <option>모든 상태</option>
                            <option>진행 중</option>
                            <option>만료됨</option>
                            <option>대기 중</option>
                        </select>
                    </div>
                </div>
            </div>

            {activeTab === 'advertisers' && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>광고주명</th>
                                <th>담당자</th>
                                <th>연락처</th>
                                <th>계약 기간</th>
                                <th>상태</th>
                                <th>활성 광고</th>
                                <th style={{ width: '100px' }}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {advertisers.map(adv => (
                                <tr key={adv.id}>
                                    <td style={{ fontWeight: 600 }}>{adv.name}</td>
                                    <td>{adv.manager}</td>
                                    <td>{adv.contact}</td>
                                    <td style={{ fontSize: '0.8rem' }}>{adv.contractStart} ~ {adv.contractEnd}</td>
                                    <td>
                                        <span className={`status-pill status-${adv.status}`}>
                                            {adv.status === 'active' ? '진행중' : adv.status === 'expired' ? '종료' : '대기'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{adv.activeAds}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            <div className="action-icon" title="상세보기"><Eye size={16} /></div>
                                            <div className="action-icon" title="정보수정"><Edit size={16} /></div>
                                            <div className="action-icon" title="삭제"><Trash2 size={16} /></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'ads' && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>광고명</th>
                                <th>광고주</th>
                                <th>게재 위치</th>
                                <th>게재 기간</th>
                                <th>상태</th>
                                <th style={{ width: '120px' }}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ads.map(ad => (
                                <tr key={ad.id}>
                                    <td style={{ fontWeight: 600 }}>{ad.title}</td>
                                    <td>{ad.advertiserName}</td>
                                    <td><span className="badge badge-secondary">{ad.placement}</span></td>
                                    <td style={{ fontSize: '0.8rem' }}>{ad.period}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ad.status === 'active' ? '#10b981' : ad.status === 'inactive' ? '#f59e0b' : '#ef4444' }} />
                                            <span>{ad.status === 'active' ? '노출 중' : ad.status === 'inactive' ? '중단됨' : '만료'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>{ad.status === 'active' ? '비활성화' : '활성화'}</button>
                                            <div className="action-icon"><Edit size={16} /></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'placements' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    {placements.map(loc => (
                        <div key={loc.id} className="placement-card">
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div className="priority-badge">{loc.priority}</div>
                                <div>
                                    <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{loc.name}</h4>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        최대 {loc.maxSlots}개 슬롯 / 현재 {loc.activeCount}개 사용 중
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '100px', height: '8px', background: 'var(--surface-alt)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${(loc.activeCount / loc.maxSlots) * 100}%`, height: '100%', background: 'var(--primary)' }} />
                                </div>
                                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>설정</button>
                            </div>
                        </div>
                    ))}
                    <div className="placement-card" style={{ borderStyle: 'dashed', justifyContent: 'center', cursor: 'pointer', opacity: 0.6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={18} /> <span>새로운 게재 위치 추가</span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'stats' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-label"><Eye size={16} /> 전체 노출 수</span>
                            <div className="stat-value">1,248,392</div>
                            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>+12.4% 전월 대비</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label"><MousePointer2 size={16} /> 전체 클릭 수</span>
                            <div className="stat-value">42,391</div>
                            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>+8.2% 전월 대비</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label"><TrendingUp size={16} /> 평균 CTR</span>
                            <div className="stat-value">3.39%</div>
                            <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>-0.2% 전월 대비</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label"><Briefcase size={16} /> 광고주 광고 수익</span>
                            <div className="stat-value">₩ 24,500,000</div>
                            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>+5.5% 전월 대비</span>
                        </div>
                    </div>

                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1rem' }}><BarChart3 size={18} className="text-primary" /> 일별 노출/클릭 성과 추이</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}><span style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '2px' }} /> 노출</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}><span style={{ width: '8px', height: '8px', background: 'var(--secondary)', borderRadius: '2px' }} /> 클릭</span>
                            </div>
                        </div>
                        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '0 1rem' }}>
                            {[60, 80, 45, 90, 100, 70, 85, 95, 110, 120, 105, 130].map((h, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <div style={{ height: `${h}px`, background: 'var(--primary)', opacity: 0.6, borderRadius: '2px 2px 0 0' }} />
                                    <div style={{ height: `${h / 4}px`, background: 'var(--secondary)', opacity: 0.8, borderRadius: '0 0 2px 2px' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdManagement;
