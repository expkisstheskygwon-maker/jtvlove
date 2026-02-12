import React, { useState } from 'react';
import {
    Activity,
    ShieldAlert,
    Server,
    Database,
    Cpu,
    Monitor,
    AlertTriangle,
    Search,
    Filter,
    Download,
    Eye,
    Bell,
    Settings,
    Terminal,
    Clock,
    ExternalLink,
    TrendingUp,
    Mail,
    Smartphone,
    CheckCircle2,
    XCircle
} from 'lucide-react';

type MonitoringTab = 'audit' | 'status' | 'errors' | 'anomalies';

const SystemMonitoring: React.FC = () => {
    const [activeTab, setActiveTab] = useState<MonitoringTab>('audit');
    const [showLogDetail, setShowLogDetail] = useState(false);

    // Mock System Stats
    const systemStats = {
        cpu: 42,
        memory: 68,
        disk: 24,
        dbConnections: 124,
        uptime: '12d 4h 32m'
    };

    // Simple Badge Helper
    const Badge = ({ children, color }: { children: React.ReactNode, color: string }) => (
        <span style={{
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 700,
            background: `rgba(${color}, 0.1)`,
            color: `rgb(${color})`
        }}>{children}</span>
    );

    const ArrowDownRight = ({ size, className }: { size: number, className?: string }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m7 7 10 10" />
            <path d="M17 7v10H7" />
        </svg>
    );

    return (
        <div className="monitoring-view">
            <style>{`
        .monitoring-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .view-header { display: flex; justify-content: space-between; align-items: flex-end; }
        
        .tab-container { display: flex; gap: 2rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; }
        .tab { padding: 0.75rem 0.5rem; cursor: pointer; color: var(--text-muted); font-weight: 500; font-size: 0.9375rem; position: relative; transition: all 0.2s; }
        .tab.active { color: var(--primary); font-weight: 700; }
        .tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: var(--primary); }

        .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .input-box { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 0.5rem 0.75rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text); }
        .input-box select, .input-box input { background: transparent; border: none; color: inherit; outline: none; font-size: 0.875rem; }

        .monitor-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .stat-gauge { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; }
        .gauge-circle { width: 100px; height: 100px; border-radius: 50%; border: 8px solid var(--surface-alt); position: relative; display: flex; align-items: center; justify-content: center; }
        .gauge-fill { position: absolute; top: -8px; left: -8px; width: 100px; height: 100px; border-radius: 50%; border: 8px solid var(--primary); border-bottom-color: transparent; border-right-color: transparent; transform: rotate(45deg); }

        .log-table-container { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
        .log-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        .log-table th { padding: 1rem; text-align: left; background: rgba(255,255,255,0.02); color: var(--text-muted); border-bottom: 1px solid var(--border); font-weight: 600; }
        .log-table td { padding: 1rem; border-bottom: 1px solid var(--border); }
        
        .action-tag { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; }
        .tag-create { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .tag-update { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .tag-delete { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .anomaly-card { background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 16px; padding: 1.25rem; display: flex; gap: 1rem; align-items: flex-start; }
        
        .code-snippet { background: #0f172a; padding: 1rem; border-radius: 8px; font-family: 'Fira Code', monospace; font-size: 0.8rem; color: #94a3b8; overflow-x: auto; }
        .diff-added { color: #10b981; }
        .diff-removed { color: #f43f5e; }

        .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background: var(--surface-alt); border-radius: 12px; border: 1px solid var(--border); margin-bottom: 0.75rem; }
      `}</style>

            <div className="view-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>시스템 감사 및 모니터링</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>관리자 기록 추적, 서버 성능 감시 및 보안 위협을 실시간으로 감지합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary" style={{ background: systemStats.cpu > 80 ? '#ef4444' : 'var(--surface)' }}>
                        <Activity size={18} /> 실시간 스트리밍 {systemStats.cpu > 80 ? 'ON' : 'OFF'}
                    </button>
                    <button className="btn btn-primary"><Download size={18} /> 로그 내보내기</button>
                </div>
            </div>

            <div className="tab-container">
                <div className={`tab ${activeTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveTab('audit')}>감사 로그 (Audit)</div>
                <div className={`tab ${activeTab === 'status' ? 'active' : ''}`} onClick={() => setActiveTab('status')}>시스템 상태 (Status)</div>
                <div className={`tab ${activeTab === 'errors' ? 'active' : ''}`} onClick={() => setActiveTab('errors')}>에러 추적 (Errors)</div>
                <div className={`tab ${activeTab === 'anomalies' ? 'active' : ''}`} onClick={() => setActiveTab('anomalies')}>이상 탐지 & 알림</div>
            </div>

            {activeTab === 'audit' && (
                <>
                    <div className="toolbar">
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <div className="input-box">
                                <Search size={16} className="text-muted" />
                                <input type="text" placeholder="관리자, 대상ID, IP 검색..." />
                            </div>
                            <div className="input-box">
                                <Filter size={16} className="text-muted" />
                                <select>
                                    <option>모든 액션</option>
                                    <option>생성 (CREATE)</option>
                                    <option>수정 (UPDATE)</option>
                                    <option>삭제 (DELETE)</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-box">
                            <Clock size={16} className="text-muted" />
                            <input type="date" /> ~ <input type="date" />
                        </div>
                    </div>

                    <div className="log-table-container">
                        <table className="log-table">
                            <thead>
                                <tr>
                                    <th>시간</th>
                                    <th>관리자</th>
                                    <th>액션</th>
                                    <th>대상</th>
                                    <th>대상 ID</th>
                                    <th>IP 주소</th>
                                    <th style={{ width: '80px' }}>의견</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { time: '2026-02-12 18:15:22', user: 'Admin_A', action: 'UPDATE', type: 'PARTNER', id: 'PTN-8821', ip: '121.45.22.14', detail: true },
                                    { time: '2026-02-12 18:10:05', user: 'Admin_B', action: 'DELETE', type: 'CCA', id: 'CCA-042', ip: '14.3.112.98', detail: false },
                                    { time: '2026-02-12 17:55:41', user: 'Admin_A', action: 'CREATE', type: 'COUPON', id: 'CPN-LUCKY', ip: '121.45.22.14', detail: true },
                                    { time: '2026-02-12 17:42:12', user: 'System', action: 'UPDATE', type: 'USER', id: 'USR-2941', ip: 'internal', detail: true },
                                ].map((log, i) => (
                                    <tr key={i}>
                                        <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.time}</td>
                                        <td style={{ fontWeight: 600 }}>{log.user}</td>
                                        <td>
                                            <span className={`action-tag tag-${log.action.toLowerCase()}`}>{log.action}</span>
                                        </td>
                                        <td><span className="badge badge-secondary">{log.type}</span></td>
                                        <td style={{ fontFamily: 'monospace' }}>{log.id}</td>
                                        <td style={{ fontSize: '0.8rem' }}>{log.ip}</td>
                                        <td>
                                            <button className="btn btn-secondary" style={{ padding: '0.4rem' }} onClick={() => setShowLogDetail(true)}>
                                                <Eye size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showLogDetail && (
                        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                            <div style={{ background: 'var(--surface)', width: '100%', maxWidth: '800px', borderRadius: '24px', border: '1px solid var(--border)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>데이터 변경 상세 비교 (Diff)</h3>
                                    <button className="btn btn-secondary" onClick={() => setShowLogDetail(false)}><XCircle size={18} /></button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>변경 전 (Old)</h4>
                                        <pre className="code-snippet">
                                            {`{
  "name": "마닐라 젠틀맨",
  "status": "active",
  "commission_rate": 10
}`}
                                        </pre>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>변경 후 (New)</h4>
                                        <pre className="code-snippet">
                                            {`{
  "name": "마닐라 젠틀맨 (본점)",`} <span className="diff-added">{`
  "status": "active",
  "commission_rate": 15`}</span> {`
}`}
                                        </pre>
                                    </div>
                                </div>
                                <button className="btn btn-primary" style={{ alignSelf: 'flex-end' }} onClick={() => setShowLogDetail(false)}>확인</button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {activeTab === 'status' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="monitor-grid">
                        <div className="stat-gauge">
                            <span className="sum-label"><Cpu size={18} /> CPU 가동률</span>
                            <div className="gauge-circle">
                                <div className="gauge-fill" style={{ borderColor: systemStats.cpu > 80 ? '#ef4444' : 'var(--primary)', transform: `rotate(${45 + (systemStats.cpu * 1.8)}deg)` }} />
                                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{systemStats.cpu}%</span>
                            </div>
                            <span className="sum-trend up"><TrendingUp size={14} /> Normal</span>
                        </div>
                        <div className="stat-gauge">
                            <span className="sum-label"><Monitor size={18} /> 메모리 점유</span>
                            <div className="gauge-circle">
                                <div className="gauge-fill" style={{ borderColor: '#3b82f6', transform: `rotate(${45 + (systemStats.memory * 1.8)}deg)` }} />
                                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{systemStats.memory}%</span>
                            </div>
                            <span className="form-hint">Max: 16GB / Used: 10.8GB</span>
                        </div>
                        <div className="stat-gauge">
                            <span className="sum-label"><Database size={18} /> DB 커넥션</span>
                            <div className="gauge-circle">
                                <div className="gauge-fill" style={{ borderColor: '#10b981', transform: `rotate(${45 + (45 * 1.8)}deg)` }} />
                                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{systemStats.dbConnections}</span>
                            </div>
                            <span className="sum-trend down"><ArrowDownRight size={14} /> -12%</span>
                        </div>
                        <div className="stat-gauge">
                            <span className="sum-label"><Server size={18} /> 시스템 업타임</span>
                            <div className="gauge-circle">
                                <CheckCircle2 size={40} className="text-secondary" />
                            </div>
                            <span style={{ fontWeight: 700 }}>{systemStats.uptime}</span>
                        </div>
                    </div>

                    <div style={{ background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)', padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Terminal size={20} className="text-primary" /> 실시간 데이터베이스 쿼리 모니터링
                        </h3>
                        <div className="log-table-container">
                            <table className="log-table">
                                <thead>
                                    <tr>
                                        <th>시간</th>
                                        <th>쿼리 유형</th>
                                        <th>테이블</th>
                                        <th>실행 시간</th>
                                        <th>상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>18:22:45</td>
                                        <td style={{ fontFamily: 'monospace', color: 'var(--secondary)' }}>SELECT</td>
                                        <td>reservations</td>
                                        <td>12ms</td>
                                        <td><Badge color="16, 185, 129">SUCCESS</Badge></td>
                                    </tr>
                                    <tr>
                                        <td>18:22:43</td>
                                        <td style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>UPDATE</td>
                                        <td>users</td>
                                        <td>245ms</td>
                                        <td><Badge color="245, 158, 11">SLOW</Badge></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'errors' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="anomaly-card" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444' }}>
                        <AlertTriangle size={24} className="text-error" />
                        <div>
                            <h4 style={{ fontWeight: 800 }}>중대한 시스템 에러 감지 (최근 1시간 내 15건)</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>특정 IP 대역으로부터의 대규모 인증 시도 오류가 감지되었습니다. 로그를 확인하세요.</p>
                        </div>
                    </div>

                    <div className="log-table-container">
                        <table className="log-table">
                            <thead>
                                <tr>
                                    <th>발생 시간</th>
                                    <th>메시지</th>
                                    <th>위치 (Stack)</th>
                                    <th>사용자 ID</th>
                                    <th>액션</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { time: '18:15:22', msg: 'TypeError: Cannot read property "id" of null', loc: 'Reservations.tsx:142', user: 'USR-2941' },
                                    { time: '18:12:05', msg: 'AuthError: Invalid transition state', loc: 'AuthProvider.tsx:22', user: 'Guest' },
                                    { time: '18:05:41', msg: 'DBError: Connection timeout', loc: 'supabase-client:0', user: 'System' },
                                ].map((err, i) => (
                                    <tr key={i}>
                                        <td style={{ color: '#ef4444', fontWeight: 600 }}>{err.time}</td>
                                        <td style={{ fontWeight: 500 }}>{err.msg}</td>
                                        <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{err.loc}</td>
                                        <td>{err.user}</td>
                                        <td>
                                            <button className="btn btn-secondary" style={{ padding: '0.4rem' }}><ExternalLink size={14} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'anomalies' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>이상 활동 감지 로그</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { title: '반복 로그인 실패 감지', detail: 'IP: 211.58.42.12 (5분 내 12회 실패)', status: 'Blocked' },
                                { title: '단시간 대량 가입 의심', detail: '10분 내 동일 유입경로로부터 50명 가입', status: 'Warning' },
                                { title: '예약 폭주 (매크로 의심)', detail: 'User_X 가 1분 내 5건의 예약 생성 시도', status: 'Pending' },
                            ].map((a, i) => (
                                <div key={i} className="anomaly-card">
                                    <ShieldAlert size={24} className="text-primary" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <h4 style={{ fontWeight: 700 }}>{a.title}</h4>
                                            <Badge color={a.status === 'Blocked' ? '239, 68, 68' : '245, 158, 11'}>{a.status}</Badge>
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{a.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>자동 알림 및 임계치 설정</h3>
                        <div className="setting-row">
                            <div>
                                <div style={{ fontWeight: 600 }}>CPU 과부하 알림</div>
                                <div className="form-hint">85% 이상 지속 시 즉시 알림</div>
                            </div>
                            <input type="checkbox" defaultChecked />
                        </div>
                        <div className="setting-row">
                            <div>
                                <div style={{ fontWeight: 600 }}>에러 급증 알림</div>
                                <div className="form-hint">분당 20건 이상 에러 발생 시</div>
                            </div>
                            <input type="checkbox" defaultChecked />
                        </div>

                        <div style={{ marginTop: '1.5rem', background: 'var(--surface-alt)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border)' }}>
                            <label className="form-label">알림 수신 설정</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Mail size={18} className="text-secondary" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>이메일 알림</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>admin@jtvlove.com</div>
                                    </div>
                                    <Settings size={14} style={{ cursor: 'pointer' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Smartphone size={18} className="text-primary" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>SMS/알림톡</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>010-****-5678</div>
                                    </div>
                                    <Settings size={14} style={{ cursor: 'pointer' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Bell size={18} className="text-error" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>브라우저 푸시</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>활성화됨</div>
                                    </div>
                                    <Settings size={14} style={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>변경사항 저장</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemMonitoring;
