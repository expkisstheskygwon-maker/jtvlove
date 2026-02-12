import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    XCircle,
    RefreshCcw,
    Star,
    MessageSquare,
    AlertCircle,
    Building2,
    X
} from 'lucide-react';

const MyReservations: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [selectedReservation, setSelectedReservation] = useState<any>(null);
    const [modalType, setModalType] = useState<'details' | 'cancel' | 'reschedule' | 'review' | null>(null);

    // Mock Reservation Data
    const reservations = [
        {
            id: 'RES123456',
            cca: { name: '미나', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
            partner: '블루 JTV (Blue JTV)',
            date: '2026-02-14',
            time: '20:00',
            status: '확정', // 대기, 확정, 취소, 노쇼, 완료
            isUpcoming: true,
            message: '조용한 자리로 부탁드려요.'
        },
        {
            id: 'RES123457',
            cca: { name: '유리', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1' },
            partner: '블루 JTV (Blue JTV)',
            date: '2026-02-16',
            time: '22:00',
            status: '대기',
            isUpcoming: true,
            message: ''
        },
        {
            id: 'RES123450',
            cca: { name: '사랑', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
            partner: '레드 엔터테인먼트',
            date: '2026-02-10',
            time: '21:00',
            status: '완료',
            isUpcoming: false,
            message: '',
            reviewWritten: false
        },
        {
            id: 'RES123449',
            cca: { name: '지니', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
            partner: '골드 케어',
            date: '2026-02-05',
            time: '19:00',
            status: '완료',
            isUpcoming: false,
            message: '',
            reviewWritten: true,
            rating: 5
        }
    ];

    const filteredReservations = reservations.filter(r => r.isUpcoming === (activeTab === 'upcoming'));

    const getStatusColor = (status: string) => {
        switch (status) {
            case '대기': return { bg: '#fff7ed', text: '#f97316' };
            case '확정': return { bg: '#f0f9ff', text: '#0ea5e9' };
            case '완료': return { bg: '#f0fdf4', text: '#22c55e' };
            case '취소': return { bg: '#fef2f2', text: '#ef4444' };
            case '노쇼': return { bg: '#f8fafc', text: '#64748b' };
            default: return { bg: '#f3f4f6', text: '#374151' };
        }
    };

    const openModal = (reservation: any, type: 'details' | 'cancel' | 'reschedule' | 'review') => {
        setSelectedReservation(reservation);
        setModalType(type);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedReservation(null);
    };

    return (
        <div className="my-res-page">
            <style>{`
                .my-res-page { max-width: 900px; margin: 0 auto; padding-bottom: 5rem; }
                .page-title { font-size: 1.75rem; font-weight: 950; margin: 2rem 0; }
                
                .tabs { display: flex; gap: 2rem; border-bottom: 1px solid var(--border); margin-bottom: 2rem; }
                .tab-btn { padding: 1rem 0; background: none; border: none; font-size: 1.1rem; font-weight: 850; color: var(--text-muted); cursor: pointer; position: relative; }
                .tab-btn.active { color: var(--primary); }
                .tab-btn.active::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 3px; background: var(--primary); border-radius: 3px 3px 0 0; }

                .res-card { background: white; border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s; }
                .res-card:hover { border-color: var(--primary); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                
                .res-info { display: flex; gap: 1.5rem; align-items: center; }
                .cca-img-mini { width: 70px; height: 70px; border-radius: 18px; object-fit: cover; }
                
                .res-details h3 { font-size: 1.15rem; font-weight: 900; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem; }
                .res-partner { font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.5rem; }
                .res-time-badge { font-size: 0.8rem; font-weight: 800; color: var(--text); padding: 0.35rem 0.75rem; background: var(--surface-alt); border-radius: 8px; display: inline-flex; align-items: center; gap: 0.4rem; }

                .status-badge { padding: 0.4rem 0.85rem; border-radius: 50px; font-size: 0.8rem; font-weight: 900; }

                .action-btns { display: flex; gap: 0.5rem; }
                
                /* Modal Styles */
                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
                .modal-box { background: white; border-radius: 32px; width: 100%; max-width: 500px; padding: 2.5rem; position: relative; max-height: 90vh; overflow-y: auto; }
                .modal-close { position: absolute; top: 1.5rem; right: 1.5rem; cursor: pointer; color: var(--text-muted); }
                .modal-title { font-size: 1.5rem; font-weight: 950; margin-bottom: 2rem; }

                .form-group { margin-bottom: 1.5rem; }
                .form-label { display: block; font-weight: 800; margin-bottom: 0.5rem; font-size: 0.9rem; }
                .form-input, .form-textarea { width: 100%; padding: 1rem; border: 1px solid var(--border); border-radius: 16px; background: var(--surface-alt); font-weight: 600; }
                .form-textarea { height: 120px; resize: none; }

                .star-picker { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
                .star-item { cursor: pointer; color: #eee; }
                .star-item.active { color: #f59e0b; }

                @media (max-width: 768px) {
                    .res-card { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
                    .action-btns { width: 100%; }
                    .action-btns button { flex: 1; }
                }
            `}</style>

            <h1 className="page-title">내 예약 관리</h1>

            <div className="tabs">
                <button
                    className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    예정된 예약
                </button>
                <button
                    className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                    onClick={() => setActiveTab('past')}
                >
                    지난 예약
                </button>
            </div>

            <div className="res-list">
                {filteredReservations.length > 0 ? filteredReservations.map(res => {
                    const statusTheme = getStatusColor(res.status);
                    return (
                        <div key={res.id} className="res-card">
                            <div className="res-info" onClick={() => openModal(res, 'details')} style={{ cursor: 'pointer' }}>
                                <img src={res.cca.image} alt="" className="cca-img-mini" />
                                <div className="res-details">
                                    <div className="res-partner"><Building2 size={14} /> {res.partner}</div>
                                    <h3>{res.cca.name} <div className="status-badge" style={{ backgroundColor: statusTheme.bg, color: statusTheme.text, marginLeft: '0.5rem' }}>{res.status}</div></h3>
                                    <div className="res-time-badge"><Calendar size={14} /> {res.date} <Clock size={14} /> {res.time}</div>
                                </div>
                            </div>

                            <div className="action-btns">
                                {res.isUpcoming ? (
                                    <>
                                        <button className="btn btn-secondary" style={{ padding: '0.65rem 1rem' }} onClick={() => openModal(res, 'reschedule')}>
                                            <RefreshCcw size={16} /> 변경
                                        </button>
                                        <button className="btn btn-secondary" style={{ padding: '0.65rem 1rem', color: '#ef4444' }} onClick={() => openModal(res, 'cancel')}>
                                            <XCircle size={16} /> 취소
                                        </button>
                                    </>
                                ) : (
                                    res.status === '완료' && (
                                        res.reviewWritten ? (
                                            <button className="btn btn-secondary" style={{ padding: '0.65rem 1rem' }} onClick={() => openModal(res, 'details')}>
                                                <Star size={16} fill="var(--text-muted)" /> 리뷰 보기
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary" style={{ padding: '0.65rem 1rem' }} onClick={() => openModal(res, 'review')}>
                                                <MessageSquare size={16} /> 리뷰 작성
                                            </button>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    );
                }) : (
                    <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                        <AlertCircle size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p style={{ fontWeight: 850 }}>예약 내역이 없습니다.</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            {modalType && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-close" onClick={closeModal}><X size={24} /></div>

                        {modalType === 'details' && (
                            <>
                                <h2 className="modal-title">예약 상세 내역</h2>
                                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', background: 'var(--surface-alt)', padding: '1.5rem', borderRadius: '20px' }}>
                                    <img src={selectedReservation.cca.image} alt="" style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'cover' }} />
                                    <div>
                                        <div style={{ fontWeight: 800, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedReservation.partner}</div>
                                        <div style={{ fontWeight: 950, fontSize: '1.25rem', margin: '0.2rem 0' }}>{selectedReservation.cca.name}</div>
                                        <div className="status-badge" style={{ backgroundColor: getStatusColor(selectedReservation.status).bg, color: getStatusColor(selectedReservation.status).text }}>{selectedReservation.status}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                        <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>예약 번호</span>
                                        <span style={{ fontWeight: 900 }}>{selectedReservation.id}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                        <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>예약 일시</span>
                                        <span style={{ fontWeight: 900 }}>{selectedReservation.date} {selectedReservation.time}</span>
                                    </div>
                                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                        <span style={{ fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>요청 사항</span>
                                        <p style={{ fontWeight: 800, lineHeight: '1.5' }}>{selectedReservation.message || '요청 사항이 없습니다.'}</p>
                                    </div>
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }} onClick={closeModal}>닫기</button>
                            </>
                        )}

                        {modalType === 'cancel' && (
                            <>
                                <h2 className="modal-title">예약 취소 요청</h2>
                                <p style={{ color: 'var(--text-muted)', fontWeight: 700, marginBottom: '1.5rem' }}>예약을 취소하시려는 사유를 입력해주세요. CCA의 승인 후 최종 취소 처리됩니다.</p>
                                <div className="form-group">
                                    <label className="form-label">취소 사유</label>
                                    <textarea className="form-textarea" placeholder="취소 사유를 입력하세요..."></textarea>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-secondary" style={{ flex: 1 }} onClick={closeModal}>닫기</button>
                                    <button className="btn btn-primary" style={{ flex: 1, backgroundColor: '#ef4444' }} onClick={() => { alert('취소 요청이 완료되었습니다.'); closeModal(); }}>취소 요청</button>
                                </div>
                            </>
                        )}

                        {modalType === 'reschedule' && (
                            <>
                                <h2 className="modal-title">예약 시간 변경</h2>
                                <p style={{ color: 'var(--text-muted)', fontWeight: 700, marginBottom: '1.5rem' }}>변경을 원하시는 날짜와 시간, 사유를 입력해주세요.</p>
                                <div className="form-group">
                                    <label className="form-label">희망 날짜</label>
                                    <input type="date" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">희망 시간</label>
                                    <input type="time" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">변경 사유</label>
                                    <textarea className="form-textarea" placeholder="변경 사유를 입력하세요..."></textarea>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-secondary" style={{ flex: 1 }} onClick={closeModal}>닫기</button>
                                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { alert('변경 요청이 완료되었습니다.'); closeModal(); }}>변경 요청</button>
                                </div>
                            </>
                        )}

                        {modalType === 'review' && (
                            <>
                                <h2 className="modal-title">리뷰 작성</h2>
                                <p style={{ color: 'var(--text-muted)', fontWeight: 700, marginBottom: '1.5rem' }}>{selectedReservation.cca.name}님과의 시간은 어떠셨나요? 소중한 후기를 남겨주세요.</p>
                                <div className="star-picker">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`star-item ${s <= 5 ? 'active' : ''}`} fill={s <= 5 ? 'currentColor' : 'none'} size={32} />)}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">리뷰 내용</label>
                                    <textarea className="form-textarea" placeholder="좋았던 점이나 아쉬웠던 점을 적어주세요."></textarea>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-secondary" style={{ flex: 1 }} onClick={closeModal}>닫기</button>
                                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { alert('리뷰가 성공적으로 등록되었습니다.'); closeModal(); }}>리뷰 등록</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReservations;
