import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Lock,
    Bell,
    Send,
    Upload,
    AlertTriangle,
    LogOut,
    MessageCircle,
    X
} from 'lucide-react';

const PartnerAccount: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'inquiry' | 'withdrawal'>('profile');
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

    // Form States
    const [adminInfo, setAdminInfo] = useState({
        name: '김관리',
        email: 'admin@bluejtv.com',
        phone: '010-1234-5678'
    });

    const [notifications, setNotifications] = useState({
        reservation: true,
        cancellation: true,
        email: false,
        sms: true
    });

    return (
        <div className="account-view">
            <style>{`
        .account-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .account-layout { display: grid; grid-template-columns: 280px 1fr; gap: 2rem; }
        
        .side-nav { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1rem; height: fit-content; }
        .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 12px; cursor: pointer; color: var(--text-muted); font-weight: 600; transition: all 0.2s; border: none; background: transparent; width: 100%; text-align: left; }
        .nav-item:hover { background: var(--surface-alt); color: var(--text); }
        .nav-item.active { background: var(--primary); color: white; }
        
        .content-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; }
        .section-title { font-size: 1.25rem; fontWeight: 800; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
        
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem; font-weight: 600; }
        .input-wrapper { position: relative; }
        .input-wrapper i { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .form-input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 12px; color: var(--text); transition: border-color 0.2s; }
        .form-input:focus { border-color: var(--primary); outline: none; }

        .switch-row { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--surface-alt); border-radius: 16px; margin-bottom: 0.75rem; border: 1px solid var(--border); }
        .switch { width: 44px; height: 24px; background: #374151; border-radius: 12px; position: relative; cursor: pointer; transition: background 0.2s; }
        .switch.on { background: var(--primary); }
        .switch-handle { width: 18px; height: 18px; background: white; border-radius: 50%; position: absolute; top: 3px; left: 3px; transition: transform 0.2s; }
        .switch.on .switch-handle { transform: translateX(20px); }

        .withdrawal-notice { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; }
        .withdrawal-notice li { font-size: 0.9rem; color: #f87171; margin-bottom: 0.5rem; list-style: inside; }

        @media (max-width: 992px) {
          .account-layout { grid-template-columns: 1fr; }
          .side-nav { display: flex; overflow-x: auto; padding: 0.5rem; gap: 0.5rem; border-radius: 12px; }
          .nav-item { padding: 0.75rem 1rem; white-space: nowrap; }
        }
      `}</style>

            <div className="page-header">
                <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>계정 및 서비스 설정</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>개인 정보 수정, 기능 설정 및 서비스 문의를 관리합니다.</p>
            </div>

            <div className="account-layout">
                <div className="side-nav">
                    <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <User size={20} /> 관리자 정보 수정
                    </button>
                    <button className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
                        <Bell size={20} /> 알림 설정
                    </button>
                    <button className={`nav-item ${activeTab === 'inquiry' ? 'active' : ''}`} onClick={() => setActiveTab('inquiry')}>
                        <MessageCircle size={20} /> 서비스 문의
                    </button>
                    <button className={`nav-item ${activeTab === 'withdrawal' ? 'active' : ''}`} onClick={() => setActiveTab('withdrawal')}>
                        <LogOut size={20} /> 탈퇴 신청
                    </button>
                </div>

                <div className="content-area">
                    {activeTab === 'profile' && (
                        <div className="content-card">
                            <h2 className="section-title"><User size={24} className="text-primary" /> 관리자 기본 정보</h2>
                            <div className="form-group">
                                <label>이름</label>
                                <div className="input-wrapper">
                                    <User size={18} />
                                    <input type="text" className="form-input" value={adminInfo.name} onChange={e => setAdminInfo({ ...adminInfo, name: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>이메일 계정</label>
                                <div className="input-wrapper">
                                    <Mail size={18} />
                                    <input type="email" className="form-input" value={adminInfo.email} onChange={e => setAdminInfo({ ...adminInfo, email: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>연락처</label>
                                <div className="input-wrapper">
                                    <Phone size={18} />
                                    <input type="text" className="form-input" value={adminInfo.phone} onChange={e => setAdminInfo({ ...adminInfo, phone: e.target.value })} />
                                </div>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />
                            <h2 className="section-title"><Lock size={24} className="text-primary" /> 비밀번호 변경</h2>
                            <div className="form-group">
                                <label>현재 비밀번호</label>
                                <div className="input-wrapper">
                                    <Lock size={18} />
                                    <input type="password" placeholder="••••••••" className="form-input" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>새 비밀번호</label>
                                <div className="input-wrapper">
                                    <Lock size={18} />
                                    <input type="password" placeholder="새 비밀번호 입력" className="form-input" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>정보 저장</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="content-card">
                            <h2 className="section-title"><Bell size={24} className="text-primary" /> 알림 수신 설정</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>중요한 업데이트와 예약 현황을 놓치지 않도록 설정하세요.</p>

                            <div className="switch-row">
                                <div>
                                    <div style={{ fontWeight: 700 }}>실시간 예약 알림</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>새로운 예약 신청 시 인앱 알림을 발송합니다.</div>
                                </div>
                                <div className={`switch ${notifications.reservation ? 'on' : ''}`} onClick={() => setNotifications({ ...notifications, reservation: !notifications.reservation })}>
                                    <div className="switch-handle"></div>
                                </div>
                            </div>

                            <div className="switch-row">
                                <div>
                                    <div style={{ fontWeight: 700 }}>예약 취소 알림</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>고객이 예약을 취소할 경우 즉시 알립니다.</div>
                                </div>
                                <div className={`switch ${notifications.cancellation ? 'on' : ''}`} onClick={() => setNotifications({ ...notifications, cancellation: !notifications.cancellation })}>
                                    <div className="switch-handle"></div>
                                </div>
                            </div>

                            <div className="switch-row">
                                <div>
                                    <div style={{ fontWeight: 700 }}>이메일 알림</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>일간 예약 리포트를 등록된 이메일로 발송합니다.</div>
                                </div>
                                <div className={`switch ${notifications.email ? 'on' : ''}`} onClick={() => setNotifications({ ...notifications, email: !notifications.email })}>
                                    <div className="switch-handle"></div>
                                </div>
                            </div>

                            <div className="switch-row">
                                <div>
                                    <div style={{ fontWeight: 700 }}>SMS 알림 (유료)</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>중요 알림을 휴대폰 문자로 전송합니다.</div>
                                </div>
                                <div className={`switch ${notifications.sms ? 'on' : ''}`} onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}>
                                    <div className="switch-handle"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inquiry' && (
                        <div className="content-card">
                            <h2 className="section-title"><MessageCircle size={24} className="text-primary" /> 서비스 문의 및 건의</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>서비스 이용 중 불편한 점이나 제안 사항이 있다면 슈퍼 관리자에게 전달해주세요.</p>

                            <div className="form-group">
                                <label>문의 제목</label>
                                <input type="text" placeholder="제목을 입력하세요" className="form-input" style={{ paddingLeft: '1rem' }} />
                            </div>
                            <div className="form-group">
                                <label>문의 내용</label>
                                <textarea
                                    placeholder="내용을 상세히 입력해주시면 빠른 답변이 가능합니다."
                                    style={{ width: '100%', minHeight: '160px', padding: '1rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text)', outline: 'none' }}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>파일 첨부 (선택)</label>
                                <div style={{ border: '2px dashed var(--border)', borderRadius: '12px', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
                                    <Upload size={32} className="text-muted" style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>클릭하거나 파일을 드래그하여 업로드하세요.</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}><Send size={18} /> 문의 전송</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'withdrawal' && (
                        <div className="content-card">
                            <h2 className="section-title"><AlertTriangle size={24} className="text-danger" /> 업체 탈퇴 신청</h2>
                            <div className="withdrawal-notice">
                                <h3 style={{ color: '#ef4444', fontWeight: 800, marginBottom: '0.75rem', fontSize: '1rem' }}>탈퇴 전 주의사항</h3>
                                <ul>
                                    <li>등록된 모든 소속 CCA들의 처리가 먼저 완료되어야 합니다.</li>
                                    <li>아직 완료되지 않은 미래 예약 정보가 없어야 합니다.</li>
                                    <li>탈퇴 시 업체의 모든 홍보 자료, 평점, 데이터는 복구할 수 없습니다.</li>
                                    <li>정산되지 않은 금액이 있는 경우 탈퇴가 제한될 수 있습니다.</li>
                                </ul>
                            </div>

                            <div className="form-group">
                                <label>탈퇴 사유 (필수)</label>
                                <select className="form-input" style={{ paddingLeft: '1rem', appearance: 'none' }}>
                                    <option>폐업으로 인한 탈퇴</option>
                                    <option>타 플랫폼 이동</option>
                                    <option>서비스 불만족</option>
                                    <option>정기적 관리 어려움</option>
                                    <option>기타</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>구체적인 사유</label>
                                <textarea
                                    placeholder="더 나은 서비스를 위한 피드백을 남겨주세요."
                                    style={{ width: '100%', minHeight: '100px', padding: '1rem', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text)', outline: 'none' }}
                                ></textarea>
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <button className="btn btn-secondary" style={{ width: '100%', color: '#ef4444', border: '1px solid #ef4444', padding: '1rem' }} onClick={() => setShowWithdrawalModal(true)}>
                                    위 주의사항을 모두 확인하였으며, 탈퇴를 신청합니다.
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {showWithdrawalModal && (
                <div className="modal-overlay" onClick={() => setShowWithdrawalModal(false)}>
                    <div className="modal-container" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ fontWeight: 800 }}>최종 확인</h3>
                            <button className="btn btn-secondary" onClick={() => setShowWithdrawalModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body" style={{ textAlign: 'center' }}>
                            <AlertTriangle size={48} className="text-danger" style={{ marginBottom: '1rem' }} />
                            <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>정말로 탈퇴하시겠습니까?</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>이 작업은 취소할 수 없으며<br />모든 데이터가 영구 삭제됩니다.</p>
                        </div>
                        <div className="popup-footer" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '1.25rem' }}>
                            <button className="btn btn-secondary" onClick={() => setShowWithdrawalModal(false)}>취소</button>
                            <button className="btn btn-primary" style={{ background: '#ef4444' }}>탈퇴 확정</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerAccount;
