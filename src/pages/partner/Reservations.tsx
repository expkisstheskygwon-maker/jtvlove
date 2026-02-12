import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    User,
    Clock,
    MoreHorizontal,
    Search,
    AlertCircle,
    CheckCircle2,
    XCircle,
    MessageSquare,
    Crown,
    Star,
    CalendarDays,
    X,
    RefreshCw,
    Ban
} from 'lucide-react';

type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'noshow' | 'completed';
type CustomerType = 'vip' | 'excellent' | 'normal' | 'caution';
type CCAWorkStatus = 'active' | 'absence' | 'dayoff' | 'resigned';

interface Reservation {
    id: string;
    time: string;
    ccaName: string;
    customerName: string;
    customerType: CustomerType;
    message: string;
    status: ReservationStatus;
    ccaWorkStatus: CCAWorkStatus;
    changeRequested?: boolean;
    cancelRequested?: boolean;
}

const PartnerReservations: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showManagePopup, setShowManagePopup] = useState<Reservation | null>(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const allReservations: Reservation[] = [
        { id: '1', time: '19:00', ccaName: '미나', customerName: '김철수', customerType: 'vip', message: '창가 자리로 부탁드려요', status: 'confirmed', ccaWorkStatus: 'active' },
        { id: '2', time: '20:00', ccaName: '지수', customerName: '이영희', customerType: 'excellent', message: '생일 파티입니다', status: 'pending', ccaWorkStatus: 'active', changeRequested: true },
        { id: '3', time: '21:00', ccaName: '제니', customerName: '박지민', customerType: 'normal', message: '조용한 곳 원해요', status: 'confirmed', ccaWorkStatus: 'absence' },
        { id: '4', time: '22:30', ccaName: '사나', customerName: '최도윤', customerType: 'caution', message: '예약 확인 부탁', status: 'confirmed', ccaWorkStatus: 'dayoff', cancelRequested: true },
        { id: '5', time: '23:00', ccaName: '모모', customerName: '정형돈', customerType: 'normal', message: '단골입니다', status: 'confirmed', ccaWorkStatus: 'resigned' },
        { id: '6', time: '20:00', ccaName: '미나', customerName: '유재석', customerType: 'vip', message: '빨리 가야해요', status: 'confirmed', ccaWorkStatus: 'active' },
    ];

    const filteredReservations = allReservations.filter(res => {
        const matchesStatus = filterStatus === 'all' || res.status === filterStatus;
        const matchesSearch = res.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.ccaName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getDayStatusColor = (ccaStatus: CCAWorkStatus) => {
        switch (ccaStatus) {
            case 'absence': return 'rgba(249, 115, 22, 0.2)'; // Orange
            case 'dayoff': return 'rgba(59, 130, 246, 0.2)'; // Blue
            case 'resigned': return 'rgba(239, 68, 68, 0.2)'; // Red
            default: return 'transparent';
        }
    };

    const getCustomerIcon = (type: CustomerType) => {
        switch (type) {
            case 'vip': return <Crown size={14} color="#f59e0b" />;
            case 'excellent': return <Star size={14} color="#6366f1" />;
            case 'caution': return <AlertCircle size={14} color="#ef4444" />;
            default: return <User size={14} color="#9ca3af" />;
        }
    };

    // Simplified Calendar View

    return (
        <div className="reservation-view">
            <style>{`
        .reservation-view { display: flex; flex-direction: column; gap: 1.5rem; height: calc(100vh - 120px); }
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        
        .main-layout { display: grid; grid-template-columns: 1fr 400px; gap: 1.5rem; flex: 1; min-height: 0; }
        
        /* Calendar UI */
        .calendar-container { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; display: flex; flex-direction: column; overflow: hidden; }
        .calendar-header { padding: 1.25rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .calendar-grid { flex: 1; display: grid; grid-template-columns: repeat(7, 1fr); grid-template-rows: auto repeat(6, 1fr); }
        .weekday { padding: 0.75rem; text-align: center; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .day-cell { border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 0.5rem; display: flex; flex-direction: column; gap: 0.25rem; min-height: 80px; position: relative; cursor: pointer; transition: background 0.2s; }
        .day-cell:nth-child(7n) { border-right: none; }
        .day-cell:hover { background: rgba(255,255,255,0.02); }
        .day-cell.active { background: rgba(99, 102, 241, 0.05); }
        .day-cell.past { opacity: 0.5; background: rgba(255,255,255,0.01); }
        .day-num { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); }
        .active .day-num { color: var(--primary); }
        
        .date-info { display: flex; flex-direction: column; gap: 2px; }
        .cca-tag { font-size: 0.65rem; padding: 1px 4px; border-radius: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; border: 1px solid rgba(255,255,255,0.05); }
        .res-count { position: absolute; top: 0.5rem; right: 0.5rem; font-size: 0.7rem; font-weight: 800; color: var(--primary); }

        /* Detail Sidebar */
        .detail-sidebar { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; display: flex; flex-direction: column; overflow: hidden; }
        .sidebar-header { padding: 1.25rem; border-bottom: 1px solid var(--border); }
        .reservation-list { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }
        .reservation-card { 
          background: var(--surface-alt); border: 1px solid var(--border); border-radius: 12px; padding: 1rem; 
          transition: transform 0.2s; cursor: pointer; position: relative;
        }
        .reservation-card:hover { transform: translateX(4px); border-color: var(--primary); }
        .card-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
        .time-badge { background: #1f2937; padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 800; font-size: 0.9rem; font-family: 'Inter', sans-serif; }
        
        /* Manage Popup */
        .popup-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); z-index: 200; display: flex; items-center: center; justify-content: center; padding: 1.5rem; }
        .popup-content { background: var(--surface); width: 100%; maxWidth: 500px; border-radius: 24px; border: 1px solid var(--border); overflow: hidden; display: flex; flex-direction: column; }
        .popup-header { padding: 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .popup-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .popup-footer { padding: 1.25rem; border-top: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

        @media (max-width: 1024px) {
          .main-layout { grid-template-columns: 1fr; }
          .detail-sidebar { display: none; }
          .reservation-view { height: auto; }
        }
      `}</style>

            <div className="page-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>예약 관리</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>일정 확인 및 예약을 확정하거나 관리합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="input-box desktop-only">
                        <Search size={18} className="text-muted" />
                        <input
                            type="text"
                            placeholder="고객명, CCA명 검색..."
                            style={{ width: '180px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="btn btn-secondary"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ appearance: 'none', paddingRight: '2rem' }}
                    >
                        <option value="all">모든 상태</option>
                        <option value="pending">대기 중</option>
                        <option value="confirmed">확정됨</option>
                        <option value="completed">완료됨</option>
                        <option value="cancelled">취소됨</option>
                    </select>
                    <button className="btn btn-primary"><CalendarDays size={18} /> 휴무일 지정</button>
                </div>
            </div>

            <div className="main-layout">
                {/* Calendar Section */}
                <div className="calendar-container">
                    <div className="calendar-header">
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CalendarIcon size={20} className="text-primary" /> 2026년 2월
                        </h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronLeft size={20} /></button>
                            <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronRight size={20} /></button>
                        </div>
                    </div>
                    <div className="calendar-grid">
                        {['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d} className="weekday">{d}</div>)}
                        {/* Mock Calendar Cells - February 2026 starts on Sunday */}
                        {Array.from({ length: 35 }).map((_, i) => {
                            const dayNum = i + 1;
                            const hasReservations = dayNum > 0 && dayNum <= 28;
                            const isSelected = dayNum === 12;

                            return (
                                <div key={i} className={`day-cell ${dayNum > 28 ? 'past' : ''} ${isSelected ? 'active' : ''}`} onClick={() => dayNum <= 28 && setSelectedDate(new Date(2026, 1, dayNum))}>
                                    <span className="day-num">{dayNum > 28 ? dayNum - 28 : dayNum}</span>
                                    {hasReservations && isSelected && (
                                        <>
                                            <span className="res-count">{filteredReservations.length}</span>
                                            <div className="date-info">
                                                {filteredReservations.slice(0, 4).map((r: Reservation, idx: number) => (
                                                    <span key={idx} className="cca-tag" style={{ background: getDayStatusColor(r.ccaWorkStatus) }}>
                                                        {r.ccaName} ({r.time})
                                                    </span>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Detail Sidebar */}
                <div className="detail-sidebar">
                    <div className="sidebar-header">
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                            2월 {selectedDate.getDate()}일 예약 ({filteredReservations.length})
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            결과: {filteredReservations.length}건
                        </p>
                    </div>
                    <div className="reservation-list">
                        {filteredReservations.map((res: Reservation) => (
                            <div key={res.id} className="reservation-card" onClick={() => setShowManagePopup(res)}>
                                {res.changeRequested && <div style={{ position: 'absolute', top: -4, right: 12, background: '#f59e0b', color: 'white', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>시간 변경 요청</div>}
                                {res.cancelRequested && <div style={{ position: 'absolute', top: -4, right: 12, background: '#ef4444', color: 'white', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>취소 요청</div>}

                                <div className="card-header">
                                    <div className="time-badge">{res.time}</div>
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        {getCustomerIcon(res.customerType)}
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{res.customerName}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: '24px', height: '24px', borderRadius: '6px',
                                            background: getDayStatusColor(res.ccaWorkStatus),
                                            border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center'
                                        }}>
                                            <User size={14} className="text-primary" />
                                        </div>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{res.ccaName}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{res.ccaWorkStatus === 'active' ? '활동' : '기타'}</span>
                                    </div>
                                    <button className="btn btn-secondary" style={{ padding: '0.25rem' }}><MoreHorizontal size={16} /></button>
                                </div>
                                <div style={{ marginTop: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '6px' }}>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.25rem' }}>
                                        <MessageSquare size={12} /> {res.message.substring(0, 10)}...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Manage Popup */}
            {showManagePopup && (
                <div className="popup-overlay" onClick={() => setShowManagePopup(null)}>
                    <div className="popup-content" onClick={e => e.stopPropagation()}>
                        <div className="popup-header">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>예약 관리</h3>
                            <button className="btn btn-secondary" onClick={() => setShowManagePopup(null)}><X size={20} /></button>
                        </div>
                        <div className="popup-body">
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--surface-alt)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={40} className="text-primary" />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{showManagePopup.customerName}</span>
                                        {getCustomerIcon(showManagePopup.customerType)}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CalendarIcon size={14} /> 2026-02-12 <Clock size={14} /> {showManagePopup.time}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, marginTop: '0.4rem' }}>매칭 CCA: {showManagePopup.ccaName} ({showManagePopup.ccaWorkStatus})</div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>고객 요청 사항</label>
                                <div style={{ background: 'var(--surface-alt)', padding: '1rem', borderRadius: '12px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                    {showManagePopup.message}
                                </div>
                            </div>

                            {showManagePopup.status === 'pending' ? (
                                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>대기 중인 예약입니다.</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>확정 시 고객에게 자동 안내 메시지가 발송됩니다.</p>
                                </div>
                            ) : (
                                <div className="input-group">
                                    <label>취소 사유 입력 (취소 시 필수)</label>
                                    <textarea className="form-input" rows={3} placeholder="고객에게 전달할 취소 사유를 입력하세요..." style={{ width: '100%', resize: 'none' }}></textarea>
                                </div>
                            )}
                        </div>
                        <div className="popup-footer">
                            {showManagePopup.status === 'pending' ? (
                                <>
                                    <button className="btn btn-secondary" onClick={() => setShowManagePopup(null)}><XCircle size={18} /> 예약 반려</button>
                                    <button className="btn btn-primary" onClick={() => setShowManagePopup(null)}><CheckCircle2 size={18} /> 예약 확정</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-secondary" disabled={!showManagePopup.changeRequested} onClick={() => setShowManagePopup(null)}><RefreshCw size={18} /> 시간 변경 처리</button>
                                    <button className="btn btn-danger" style={{ background: '#ef4444', color: 'white' }} onClick={() => setShowManagePopup(null)}><Ban size={18} /> 예약 취소</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerReservations;
