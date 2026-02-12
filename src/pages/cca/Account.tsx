import React, { useState } from 'react';
import {
    Building2,
    Bell,
    LogOut,
    HelpCircle,
    MessageCircle,
    AlertTriangle,
    ChevronRight,
    ShieldCheck,
    XCircle
} from 'lucide-react';

const CCAAccount: React.FC = () => {
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showAffiliationModal, setShowAffiliationModal] = useState(false);

    const [notifications, setNotifications] = useState({
        reservation: true,
        cancellation: true,
        email: false,
        sms: true
    });


    return (
        <div className="cca-account-container">
            <style>{`
        .cca-account-container { max-width: 800px; margin: 0 auto; padding-bottom: 5rem; }
        .account-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; margin-bottom: 1.5rem; }
        .card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
        .card-header h2 { font-size: 1.1rem; font-weight: 800; }
        
        .row-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-light); }
        .row-item:last-child { border-bottom: none; }
        .row-label { display: flex; flex-direction: column; gap: 0.25rem; }
        .label-text { font-size: 0.95rem; font-weight: 700; }
        .sub-text { font-size: 0.8rem; color: var(--text-muted); }
        
        .value-text { font-weight: 600; color: var(--text-muted); }
        
        .toggle-switch { width: 44px; height: 24px; background: var(--border); border-radius: 12px; position: relative; cursor: pointer; transition: background 0.3s; }
        .toggle-switch.active { background: var(--primary); }
        .toggle-circle { width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: transform 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .toggle-switch.active .toggle-circle { transform: translateX(20px); }

        .input-group { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem; }
        .input-group label { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
        
        .danger-zone { border: 1px solid rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.02); }
        
        .modal-body p { line-height: 1.6; color: var(--text-muted); margin-bottom: 1rem; }
      `}</style>

            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900 }}>계정 및 서비스 설정</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>소속 업체 관리 및 개인 보안, 알림 설정을 관리하세요.</p>
            </div>

            {/* Affiliation Management */}
            <section className="account-card">
                <div className="card-header">
                    <Building2 size={20} className="text-primary" />
                    <h2>소속 업체 관리</h2>
                </div>
                <div className="row-item">
                    <div className="row-label">
                        <span className="label-text">현재 소속</span>
                        <span className="sub-text">현재 활동 중인 업체입니다.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className="badge badge-primary">블루 JTV (Blue JTV)</span>
                        <button className="btn btn-secondary btn-sm" onClick={() => setShowAffiliationModal(true)}>이동 신청</button>
                    </div>
                </div>
            </section>

            {/* Personal Info */}
            <section className="account-card">
                <div className="card-header">
                    <ShieldCheck size={20} className="text-primary" />
                    <h2>개인정보 및 보안</h2>
                </div>
                <div className="row-item">
                    <div className="row-label">
                        <span className="label-text">이름 (본명)</span>
                        <span className="sub-text">실명 확인이 완료된 이름입니다.</span>
                    </div>
                    <span className="value-text">김미나</span>
                </div>
                <div className="row-item">
                    <div className="row-label">
                        <span className="label-text">이메일 주소</span>
                        <span className="sub-text">주요 안내 사항이 발송됩니다.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="value-text">mina_love@example.com</span>
                        <ChevronRight size={18} className="text-muted cursor-pointer" />
                    </div>
                </div>
                <div className="row-item">
                    <div className="row-label">
                        <span className="label-text">휴대폰 번호</span>
                        <span className="sub-text">예약 알림톡 발신용 번호입니다.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="value-text">010-1234-5678</span>
                        <ChevronRight size={18} className="text-muted cursor-pointer" />
                    </div>
                </div>
                <div className="row-item">
                    <div className="row-label">
                        <span className="label-text">비밀번호 변경</span>
                        <span className="sub-text">주기적인 변경으로 보안을 유지하세요.</span>
                    </div>
                    <button className="btn btn-secondary btn-sm">변경하기</button>
                </div>
            </section>

            {/* Notifications */}
            <section className="account-card">
                <div className="card-header">
                    <Bell size={20} className="text-primary" />
                    <h2>알림 설정</h2>
                </div>
                <div className="row-item">
                    <div className="row-label">
                        <span className="label-text">신규 예약 알림</span>
                        <span className="sub-text">새로운 예약 신청 시 즉시 알림을 받습니다.</span>
                    </div>
                    <div className={`toggle-switch ${notifications.reservation ? 'active' : ''}`} onClick={() => setNotifications({ ...notifications, reservation: !notifications.reservation })}>
                        <div className="toggle-circle"></div>
                    </div>
                </div>
                <div className="row-item">
                    <div className="row-label">
                        <span className="label-text">예약 취소 알림</span>
                        <span className="sub-text">확정된 예약이 취소될 경우 알림을 받습니다.</span>
                    </div>
                    <div className={`toggle-switch ${notifications.cancellation ? 'active' : ''}`} onClick={() => setNotifications({ ...notifications, cancellation: !notifications.cancellation })}>
                        <div className="toggle-circle"></div>
                    </div>
                </div>
                <div className="row-item">
                    <div className="row-label">
                        <span className="label-text">이메일 마케팅 알림</span>
                        <span className="sub-text">이벤트 및 신규 기능 안내 메일을 받습니다.</span>
                    </div>
                    <div className={`toggle-switch ${notifications.email ? 'active' : ''}`} onClick={() => setNotifications({ ...notifications, email: !notifications.email })}>
                        <div className="toggle-circle"></div>
                    </div>
                </div>
                <div className="row-item">
                    <div className="row-label">
                        <span className="label-text">SMS/알림톡 알림</span>
                        <span className="sub-text">중요 공지사항을 문자로 받습니다.</span>
                    </div>
                    <div className={`toggle-switch ${notifications.sms ? 'active' : ''}`} onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}>
                        <div className="toggle-circle"></div>
                    </div>
                </div>
            </section>

            {/* Support / Inquiries */}
            <section className="account-card">
                <div className="card-header">
                    <HelpCircle size={20} className="text-primary" />
                    <h2>서비스 문의</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ padding: '1.5rem', background: 'var(--surface-alt)', borderRadius: '16px', cursor: 'pointer', border: '1px solid transparent' }} className="hover-border">
                        <Building2 size={24} className="text-primary" style={{ marginBottom: '1rem' }} />
                        <div style={{ fontWeight: 800, marginBottom: '0.25rem' }}>업체 관리자 문의</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>소속 업체 정산 및 근태 관련</div>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'var(--surface-alt)', borderRadius: '16px', cursor: 'pointer', border: '1px solid transparent' }} className="hover-border">
                        <MessageCircle size={24} className="text-success" style={{ marginBottom: '1rem' }} />
                        <div style={{ fontWeight: 800, marginBottom: '0.25rem' }}>시스템 관리자 문의</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>앱 오류 및 기능 개선 제안</div>
                    </div>
                </div>
            </section>

            {/* Withdrawal */}
            <section className="account-card danger-zone">
                <div className="card-header" style={{ borderBottomColor: 'rgba(239, 68, 68, 0.1)' }}>
                    <LogOut size={20} className="text-danger" />
                    <h2 className="text-danger">서비스 탈퇴 신청</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>더 이상 서비스를 이용하지 않으시나요? 탈퇴 신청 시 모든 정보가 삭제됩니다.</p>
                    <button className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none' }} onClick={() => setShowWithdrawModal(true)}>탈퇴 신청</button>
                </div>
            </section>

            {/* Affiliation Modal */}
            {showAffiliationModal && (
                <div className="modal-overlay" onClick={() => setShowAffiliationModal(false)}>
                    <div className="modal-container" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ fontWeight: 900 }}>업체 이동 신청</h3>
                            <button className="btn btn-secondary icon-btn" onClick={() => setShowAffiliationModal(false)}><XCircle size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="field-group">
                                <label>이동 희망 업체 선택</label>
                                <select className="input-box">
                                    <option>그린 JTV (Green JTV)</option>
                                    <option>레드 엔터테인먼트</option>
                                    <option>골드 케어 서비스</option>
                                </select>
                            </div>
                            <div className="field-group">
                                <label>이동 사유 입력</label>
                                <textarea className="input-box" style={{ minHeight: '100px' }} placeholder="관리자에게 전달될 사유를 적어주세요."></textarea>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                <p style={{ fontSize: '0.8rem', color: '#3b82f6', marginBottom: 0, fontWeight: 600 }}>
                                    * 이동 신청 시 현재 소속 업체 관리자 및 목적 업체 관리자에게 승인 요청 알림이 전송됩니다.
                                </p>
                            </div>
                            <button className="btn btn-primary w-full" onClick={() => setShowAffiliationModal(false)}>신청 완료</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Withdrawal Modal */}
            {showWithdrawModal && (
                <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
                    <div className="modal-container" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ fontWeight: 900 }} className="text-danger">정말 탈퇴하시겠습니까?</h3>
                            <button className="btn btn-secondary icon-btn" onClick={() => setShowWithdrawModal(false)}><XCircle size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ display: 'flex', gap: '1rem', background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                <AlertTriangle className="text-danger" size={24} style={{ flexShrink: 0 }} />
                                <div style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600 }}>
                                    탈퇴 시 현재 예약된 모든 일정(확정 5건)을 먼저 취소 처리해야 합니다. 또한 기존의 모든 활동 데이터 및 팔로워 정보가 영구 삭제됩니다.
                                </div>
                            </div>
                            <div className="field-group">
                                <label>탈퇴 사유 (선택)</label>
                                <textarea className="input-box" style={{ minHeight: '100px' }} placeholder="더 나은 서비스를 위해 사유를 남겨주세요."></textarea>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button className="btn btn-secondary" onClick={() => setShowWithdrawModal(false)}>취소</button>
                                <button className="btn btn-danger" onClick={() => setShowWithdrawModal(false)}>최종 탈퇴</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CCAAccount;
