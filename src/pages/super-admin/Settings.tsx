import React, { useState } from 'react';
import {
    Settings,
    Globe,
    Bell,
    ShieldCheck,
    CreditCard,
    FileText,
    Code2,
    Database,
    Save,
    Plus,
    Trash2,
    Mail,
    MessageSquare,
    Lock,
    UserPlus,
    RefreshCw,
    Download,
    Upload,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';

type SettingsTab = 'basic' | 'notifications' | 'admins' | 'payment' | 'terms' | 'code' | 'backup';

const SystemSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('basic');
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    return (
        <div className="settings-view">
            <style>{`
        .settings-view { display: flex; gap: 2rem; align-items: flex-start; }
        .settings-sidebar { 
          width: 240px; 
          background: var(--surface); 
          border: 1px solid var(--border); 
          border-radius: 16px; 
          padding: 1rem; 
          display: flex; 
          flex-direction: column; 
          gap: 0.5rem;
          position: sticky;
          top: 92px;
        }
        .settings-content { flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; min-height: 600px; }

        .side-tab { 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
          padding: 0.875rem 1rem; 
          border-radius: 12px; 
          color: var(--text-muted); 
          cursor: pointer; 
          transition: all 0.2s;
          font-weight: 500;
          font-size: 0.9375rem;
        }
        .side-tab:hover { background: rgba(255, 255, 255, 0.03); color: var(--text); }
        .side-tab.active { background: rgba(79, 70, 229, 0.1); color: var(--primary); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
        .section-title { font-size: 1.25rem; font-weight: 700; display: flex; align-items: center; gap: 0.75rem; }

        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; font-size: 0.875rem; font-weight: 600; color: var(--text); margin-bottom: 0.5rem; }
        .form-control { 
          width: 100%; 
          background: var(--surface-alt); 
          border: 1px solid var(--border); 
          border-radius: 8px; 
          padding: 0.75rem 1rem; 
          color: var(--text); 
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-control:focus { border-color: var(--primary); }
        .form-hint { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.375rem; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        
        .toggle-box { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 1.25rem; 
          background: var(--surface-alt); 
          border-radius: 12px; 
          border: 1px solid var(--border);
          margin-bottom: 1rem;
        }

        .admin-list { display: flex; flex-direction: column; gap: 1rem; }
        .admin-card { 
          display: flex; 
          justify-content: space-between; 
          padding: 1rem; 
          background: var(--surface-alt); 
          border-radius: 12px; 
          border: 1px solid var(--border);
        }

        .code-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem; }
        .code-group-list { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .code-group-item { padding: 1rem; border-bottom: 1px solid var(--border); cursor: pointer; transition: 0.2s; }
        .code-group-item:hover { background: rgba(255,255,255,0.02); }
        .code-group-item.active { background: rgba(79, 70, 229, 0.05); border-left: 3px solid var(--primary); }

        .badge-role { padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; background: rgba(79, 70, 229, 0.1); color: var(--primary); }
      `}</style>

            <div className="settings-sidebar">
                <div className={`side-tab ${activeTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveTab('basic')}>
                    <Globe size={18} /> 기본 설정
                </div>
                <div className={`side-tab ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
                    <Bell size={18} /> 알림 설정
                </div>
                <div className={`side-tab ${activeTab === 'admins' ? 'active' : ''}`} onClick={() => setActiveTab('admins')}>
                    <ShieldCheck size={18} /> 권한 및 관리자
                </div>
                <div className={`side-tab ${activeTab === 'payment' ? 'active' : ''}`} onClick={() => setActiveTab('payment')}>
                    <CreditCard size={18} /> 결제 정책
                </div>
                <div className={`side-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>
                    <FileText size={18} /> 약관 관리
                </div>
                <div className={`side-tab ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
                    <Code2 size={18} /> 코드 관리
                </div>
                <div className={`side-tab ${activeTab === 'backup' ? 'active' : ''}`} onClick={() => setActiveTab('backup')}>
                    <Database size={18} /> 데이터 백업
                </div>
            </div>

            <div className="settings-content">
                {activeTab === 'basic' && (
                    <>
                        <div className="section-header">
                            <h2 className="section-title"><Globe className="text-primary" /> 사이트 기본 설정</h2>
                            <button className="btn btn-primary"><Save size={18} /> 변경사항 저장</button>
                        </div>

                        <div className="form-group">
                            <label className="form-label">사이트 이름</label>
                            <input type="text" className="form-control" defaultValue="JTVlove - 필리핀 밤문화 통합 가이드" />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">로고 설정</label>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '64px', height: '64px', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FileText size={24} className="text-muted" />
                                    </div>
                                    <button className="btn btn-secondary" style={{ height: '36px' }}>파일 업로드</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">파비콘 설정 (ICO/PNG)</label>
                                <button className="btn btn-secondary" style={{ height: '36px' }}>파일 선택</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">메타 설명 (SEO)</label>
                            <textarea className="form-control" style={{ height: '80px', resize: 'none' }} defaultValue="필리핀 마닐라, 클락, 세부 JTV 및 밤문화 업소 정보와 실시간 CCA 예약 서비스를 제공합니다." />
                        </div>

                        <div className="toggle-box">
                            <div>
                                <div style={{ fontWeight: 600 }}>유지보수 모드</div>
                                <div className="form-hint">활성화 시 관리자 외 사이트 접근이 차단됩니다.</div>
                            </div>
                            <div onClick={() => setMaintenanceMode(!maintenanceMode)} style={{ cursor: 'pointer' }}>
                                {maintenanceMode ? <ToggleRight size={40} className="text-primary" /> : <ToggleLeft size={40} className="text-muted" />}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">기본 언어</label>
                                <select className="form-control">
                                    <option>한국어 (Korean)</option>
                                    <option>영어 (English)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">표준 타임존</label>
                                <select className="form-control">
                                    <option>(GMT+09:00) Asia/Seoul</option>
                                    <option>(GMT+08:00) Asia/Manila</option>
                                </select>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'notifications' && (
                    <>
                        <div className="section-header">
                            <h2 className="section-title"><Bell className="text-primary" /> 알림 서비스 설정</h2>
                            <button className="btn btn-primary"><Save size={18} /> 저장</button>
                        </div>

                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}><Mail size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 이메일 SMTP 설정</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">SMTP 호스트</label>
                                <input type="text" className="form-control" placeholder="smtp.gmail.com" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">SMTP 포트</label>
                                <input type="text" className="form-control" placeholder="587" />
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1rem', margin: '1rem 0' }}><MessageSquare size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> SMS API 설정 (알림톡)</h3>
                        <div className="form-group">
                            <label className="form-label">API Key</label>
                            <input type="password" className="form-control" value="************************" readOnly />
                        </div>

                        <div className="form-group">
                            <label className="form-label">알림 템플릿 관리</label>
                            <div className="admin-list">
                                {['회원가입 환영', '예약 확정 안내', '취소 알림', '문의 답변 알림'].map(t => (
                                    <div key={t} className="admin-card">
                                        <div style={{ fontWeight: 600 }}>{t}</div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>템플릿 수정</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'admins' && (
                    <>
                        <div className="section-header">
                            <h2 className="section-title"><ShieldCheck className="text-primary" /> 관리자 목록 및 권한</h2>
                            <button className="btn btn-primary"><UserPlus size={18} /> 관리자 추가</button>
                        </div>

                        <div className="admin-list">
                            <div className="admin-card" style={{ background: 'rgba(79, 70, 229, 0.03)', borderColor: 'var(--primary)' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontWeight: 700 }}>Admin User (나)</span>
                                        <span className="badge-role">최고관리자</span>
                                    </div>
                                    <div className="form-hint">admin@jtvlove.com • 최근 로그인: 2026-02-12 18:10</div>
                                </div>
                                <div>
                                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><Settings size={16} /></button>
                                </div>
                            </div>
                            <div className="admin-card">
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontWeight: 700 }}>김매니저</span>
                                        <span className="badge-role" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>서브관리자</span>
                                    </div>
                                    <div className="form-hint">manager1@jtvlove.com • 최근 로그인: 2026-02-11 09:30</div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><Lock size={16} /></button>
                                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><Trash2 size={16} className="text-error" /></button>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>서브관리자 상세 권한 설정</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {['업체 관리', 'CCA 관리', '유저 관리', '예약 현황', '커뮤니티 관리', '광고 관리'].map(menu => (
                                    <div key={menu} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--surface-alt)', borderRadius: '8px' }}>
                                        <input type="checkbox" defaultChecked />
                                        <span style={{ fontSize: '0.9rem' }}>{menu} 접근 허용</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'code' && (
                    <>
                        <div className="section-header">
                            <h2 className="section-title"><Code2 className="text-primary" /> 시스템 코드 관리</h2>
                            <button className="btn btn-primary"><Plus size={18} /> 그룹 추가</button>
                        </div>

                        <div className="code-grid">
                            <div className="code-group-list">
                                <div className="code-group-item active">지역 코드 (REGION)</div>
                                <div className="code-group-item">CCA 등급 (GRADE_CCA)</div>
                                <div className="code-group-item">유저 등급 (GRADE_USER)</div>
                                <div className="code-group-item">예약 상태 (RES_STATUS)</div>
                                <div className="code-group-item">신고 사유 (REPORT_REASON)</div>
                            </div>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>코드값</th>
                                            <th>코드명</th>
                                            <th>순서</th>
                                            <th>사용</th>
                                            <th>액션</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>MNL_MAKATI</td>
                                            <td>마닐라 - 마카티</td>
                                            <td>1</td>
                                            <td><ToggleRight size={24} className="text-primary" /></td>
                                            <td><Trash2 size={14} /></td>
                                        </tr>
                                        <tr>
                                            <td>MNL_MALATE</td>
                                            <td>마닐라 - 말라떼</td>
                                            <td>2</td>
                                            <td><ToggleRight size={24} className="text-primary" /></td>
                                            <td><Trash2 size={14} /></td>
                                        </tr>
                                        <tr>
                                            <td>CLK_FRIENDSHIP</td>
                                            <td>클락 - 프렌드쉽</td>
                                            <td>3</td>
                                            <td><ToggleRight size={24} className="text-primary" /></td>
                                            <td><Trash2 size={14} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'backup' && (
                    <>
                        <div className="section-header">
                            <h2 className="section-title"><Database className="text-primary" /> 백업 및 데이터 복구</h2>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-secondary"><RefreshCw size={18} /> 백업 예약 설정</button>
                                <button className="btn btn-primary"><Save size={18} /> 즉시 백업 실행</button>
                            </div>
                        </div>

                        <div className="toggle-box" style={{ background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                            <div>
                                <div style={{ fontWeight: 600 }}>클라우드 자동 백업 (S3)</div>
                                <div className="form-hint">매일 새벽 04:00에 전체 DB 및 미디어 파일을 백업합니다.</div>
                            </div>
                            <ToggleRight size={40} className="text-primary" />
                        </div>

                        <h3 style={{ fontSize: '1rem', margin: '1.5rem 0 1rem' }}>최근 백업 이력</h3>
                        <div className="admin-list">
                            {[
                                { name: 'backup_2026-02-12_0400.sql.gz', size: '42.5 MB', date: '2026-02-12 04:00' },
                                { name: 'backup_2026-02-11_0400.sql.gz', size: '41.8 MB', date: '2026-02-11 04:00' },
                                { name: 'backup_2026-02-10_0400.sql.gz', size: '41.2 MB', date: '2026-02-10 04:00' },
                            ].map(b => (
                                <div key={b.name} className="admin-card">
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{b.name}</div>
                                        <div className="form-hint">{b.size} • {b.date}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn btn-secondary" title="다운로드"><Download size={16} /></button>
                                        <button className="btn btn-secondary" title="복구"><Upload size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px dashed rgba(239, 68, 68, 0.3)', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#ef4444' }}>
                                <AlertOctagon size={20} />
                                <h4 style={{ fontWeight: 700 }}>주의 사항</h4>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                데이터 복구 시 현재 시스템의 데이터가 모두 덮어씌워집니다. <br />
                                복구 전 반드시 현재 상태를 즉시 백업하시기 바랍니다.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// Simple Icon fallback
const AlertOctagon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

export default SystemSettings;
