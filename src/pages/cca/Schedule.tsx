import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    Calendar as CalendarIcon,
    Clock,
    User,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    MessageSquare,
    Coffee,
    Ban,
    Settings2,
    X
} from 'lucide-react';

interface Reservation {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'noshow';
    msg: string;
    customerTraits: string[];
    colorGroup?: string;
}

const CCASchedule: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
    const [showManageModal, setShowManageModal] = useState(false);
    const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
    const [holidays, setHolidays] = useState<string[]>(['2026-02-14', '2026-02-21']); // Mock holidays
    const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

    // Mock Data
    const reservations: Record<string, Reservation[]> = {
        '2026-02-12': [
            { id: '1', name: '박진수', startTime: '20:00', endTime: '21:30', status: 'confirmed', msg: '샴페인 준비 부탁드려요.', customerTraits: ['매너좋음', '단골'], colorGroup: 'group1' },
            { id: '2', name: '이영호', startTime: '22:00', endTime: '23:30', status: 'pending', msg: '친구랑 동행합니다.', customerTraits: ['첫방문'], colorGroup: 'group2' }
        ],
        '2026-02-13': [
            { id: '3', name: '김철수', startTime: '19:00', endTime: '20:30', status: 'confirmed', msg: '조용한 구석 자리 원함', customerTraits: ['매너좋음'], colorGroup: 'group3' },
            { id: '4', name: '박진수', startTime: '21:00', endTime: '22:30', status: 'confirmed', msg: '박진수 고객 연장', customerTraits: ['매너좋음', '단골'], colorGroup: 'group1' },
            { id: '5', name: '정민구', startTime: '23:00', endTime: '01:00', status: 'cancelled', msg: '급한 사정으로 취소', customerTraits: ['신규'], colorGroup: 'group4' }
        ],
        '2026-02-15': [] // No requests
    };

    // Calendar Helpers
    const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const formatDateKey = (day: number) => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return d.toISOString().split('T')[0];
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
    };

    const getDayStatus = (dayKey: string) => {
        if (holidays.includes(dayKey)) return 'holiday';
        const dayRes = reservations[dayKey] || [];
        if (dayRes.length === 0) return 'empty';
        if (dayRes.length >= 8) return 'soldout'; // Assuming 8 is max
        if (dayRes.some(r => r.status === 'cancelled' || r.status === 'noshow')) return 'cancelled';
        return 'active';
    };

    return (
        <div className="cca-schedule-view">
            <style>{`
        .cca-schedule-view { display: flex; flex-direction: column; gap: 1.5rem; height: calc(100vh - 120px); }
        .schedule-layout { display: grid; grid-template-columns: 1fr 400px; gap: 1.5rem; flex: 1; min-height: 0; }
        
        /* Calendar Styles */
        .calendar-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; display: flex; flex-direction: column; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); flex: 1; width: 100%; }
        .calendar-cell { background: var(--surface); padding: 0.5rem; min-height: 100px; cursor: pointer; transition: background 0.2s; position: relative; }
        .calendar-cell:hover { background: var(--surface-alt); }
        .calendar-cell.selected { background: rgba(99, 102, 241, 0.05); outline: 2px solid var(--primary); z-index: 10; }
        
        .cell-day { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center; }
        .cell-day.today { color: var(--primary); }
        
        /* Cell Statuses */
        .cell-status-label { font-size: 0.65rem; padding: 0.2rem 0.4rem; border-radius: 4px; font-weight: 800; text-transform: uppercase; margin-bottom: 0.25rem; width: fit-content; }
        .calendar-cell.holiday { background: #fef2f2; }
        .calendar-cell.soldout { background: #eff6ff; }
        .calendar-cell.empty { background: #f9fafb; }
        .calendar-cell.cancelled-day { background: #fffbeb; }

        .mini-res-list { display: flex; flex-direction: column; gap: 2px; }
        .mini-res-item { font-size: 0.7rem; padding: 2px 4px; border-radius: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mini-res-item.pending { font-weight: 900; color: var(--text); }
        .mini-res-item.confirmed { color: var(--text-muted); }
        .mini-res-item.cancelled { text-decoration: line-through; opacity: 0.5; }

        /* Detail Area */
        .detail-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; display: flex; flex-direction: column; overflow: hidden; }
        .detail-header { padding: 1.5rem; border-bottom: 1px solid var(--border); background: var(--surface-alt); }
        .res-list { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }
        
        .res-card { padding: 1rem; border-radius: 16px; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.75rem; transition: transform 0.2s; }
        .res-card:hover { transform: translateY(-2px); border-color: var(--primary); }
        
        .trait-tag { font-size: 0.65rem; padding: 0.1rem 0.4rem; background: var(--surface-alt); border-radius: 4px; color: var(--text-muted); font-weight: 600; }
        
        /* Modal Styles */
        .manage-modal { max-width: 500px; width: 95%; }
        
        @media (max-width: 1200px) {
          .schedule-layout { grid-template-columns: 1fr; }
          .detail-card { height: 500px; }
        }
      `}</style>

            {/* Header Buttons & Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 900 }}>나의 예약 관리</h1>
                    <div className="input-box" style={{ width: '240px', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem' }}>
                        <Search size={18} className="text-muted" />
                        <input
                            type="text"
                            placeholder="고객명 검색..."
                            style={{ border: 'none', background: 'transparent', outline: 'none', color: 'inherit', width: '100%' }}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-secondary icon-btn">
                        <Filter size={18} />
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary" onClick={() => setHolidays([...holidays, selectedDate.toISOString().split('T')[0]])}>
                        + 휴무일 지정
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.25rem' }}>
                        <button className="btn btn-secondary icon-btn" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
                            <ChevronLeft size={20} />
                        </button>
                        <span style={{ padding: '0 1rem', fontWeight: 800 }}>{currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}</span>
                        <button className="btn btn-secondary icon-btn" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="schedule-layout">
                {/* Calendar Left */}
                <div className="calendar-card">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '1rem' }}>
                        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                            <span key={d} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{d}</span>
                        ))}
                    </div>
                    <div className="calendar-grid">
                        {Array.from({ length: firstDayOfMonth(currentDate) }).map((_, i) => (
                            <div key={`empty-${i}`} className="calendar-cell" style={{ opacity: 0.3, cursor: 'default' }}></div>
                        ))}
                        {Array.from({ length: daysInMonth(currentDate) }).map((_, i) => {
                            const day = i + 1;
                            const dateKey = formatDateKey(day);
                            const dayRes = (reservations[dateKey] || []).filter(r => r.name.includes(searchQuery));
                            const status = getDayStatus(dateKey);

                            return (
                                <div
                                    key={day}
                                    className={`calendar-cell ${status} ${selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() ? 'selected' : ''}`}
                                    onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                                >
                                    <div className={`cell-day ${isToday(day) ? 'today' : ''}`}>
                                        {day}
                                        {status === 'holiday' && <Coffee size={12} className="text-danger" />}
                                    </div>

                                    {status === 'soldout' && <span className="cell-status-label" style={{ background: 'var(--primary)', color: 'white' }}>Sold out</span>}
                                    {status === 'holiday' && <span className="cell-status-label" style={{ background: '#fee2e2', color: '#ef4444' }}>Holiday</span>}
                                    {status === 'empty' && <span className="cell-status-label" style={{ background: '#f3f4f6', color: '#9ca3af' }}>No requests</span>}

                                    <div className="mini-res-list">
                                        {dayRes.slice(0, 3).map(res => (
                                            <div key={res.id} className={`mini-res-item ${res.status}`}>
                                                {res.status === 'confirmed' ? `${res.startTime} ${res.name}` : `!! ${res.name}`}
                                            </div>
                                        ))}
                                        {dayRes.length > 3 && <div className="mini-res-item" style={{ opacity: 0.6 }}>+ {dayRes.length - 3} more</div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Detail Panel Right */}
                <div className="detail-card">
                    <div className="detail-header">
                        <h3 style={{ fontWeight: 900, marginBottom: '0.25rem' }}>{selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>오늘 예약 총 {reservations[formatDateKey(selectedDate.getDate())]?.length || 0}건</p>
                    </div>

                    <div className="res-list">
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <button
                                className={`btn ${statusFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                                onClick={() => setStatusFilter('all')}
                            >전체</button>
                            <button
                                className={`btn ${statusFilter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                                onClick={() => setStatusFilter('pending')}
                            >대기</button>
                            <button
                                className={`btn ${statusFilter === 'confirmed' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                                onClick={() => setStatusFilter('confirmed')}
                            >확정</button>
                        </div>

                        {(reservations[formatDateKey(selectedDate.getDate())] || [])
                            .filter(r => statusFilter === 'all' || r.status === statusFilter)
                            .map(res => (
                                <div key={res.id} className="res-card" style={{ background: res.colorGroup === 'group1' ? 'rgba(99, 102, 241, 0.05)' : 'transparent' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={20} className="text-muted" />
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span style={{ fontWeight: 800 }}>{res.name}</span>
                                                    {res.status === 'confirmed' ? (
                                                        <CheckCircle2 size={14} className="text-success" />
                                                    ) : res.status === 'pending' ? (
                                                        <AlertTriangle size={14} className="text-warning" />
                                                    ) : <XCircle size={14} className="text-danger" />}
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                                                    {res.customerTraits.map(t => <span key={t} className="trait-tag">#{t}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{res.startTime} - {res.endTime}</div>
                                            <button
                                                className="btn btn-secondary"
                                                style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', marginTop: '0.5rem' }}
                                                onClick={() => { setSelectedRes(res); setShowManageModal(true); }}
                                            >
                                                관리
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--surface-alt)', padding: '0.5rem', borderRadius: '8px' }}>
                                        <MessageSquare size={14} />
                                        <span>{res.msg.length > 20 ? res.msg.slice(0, 20) + '...' : res.msg}</span>
                                    </div>
                                </div>
                            ))}

                        {(reservations[formatDateKey(selectedDate.getDate())] || []).length === 0 && (
                            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                                <CalendarIcon size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                                <p>선택한 날짜에 예약이 없습니다.</p>
                            </div>
                        )}

                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />

                        <div className="field-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Ban size={14} /> 특정 시간대 예약 불가 설정</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map(t => (
                                    <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'var(--surface-alt)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                                        <input type="checkbox" checked={blockedTimes.includes(t)} onChange={() => {
                                            if (blockedTimes.includes(t)) setBlockedTimes(blockedTimes.filter(b => b !== t));
                                            else setBlockedTimes([...blockedTimes, t]);
                                        }} />
                                        {t} 이후
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Management Modal */}
            {showManageModal && selectedRes && (
                <div className="modal-overlay" onClick={() => setShowManageModal(false)}>
                    <div className="modal-container manage-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h3 style={{ fontWeight: 900 }}>예약 정밀 관리</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ID: #{selectedRes.id}</p>
                            </div>
                            <button className="btn btn-secondary icon-btn" onClick={() => setShowManageModal(false)}><X size={20} /></button>
                        </div>

                        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', padding: '1.25rem', background: 'var(--surface-alt)', borderRadius: '20px' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={32} className="text-primary" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <h2 style={{ fontSize: '1.25rem', fontWeight: 900 }}>{selectedRes.name}</h2>
                                        {selectedRes.customerTraits.map(t => <span key={t} className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{t}</span>)}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        <Clock size={16} /> {selectedRes.startTime} - {selectedRes.endTime} (90분)
                                    </div>
                                </div>
                            </div>

                            <div className="field-group">
                                <label>고객 요청 메시지</label>
                                <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '12px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    "{selectedRes.msg}"
                                </div>
                            </div>

                            {selectedRes.status === 'confirmed' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div className="field-group">
                                        <label>취소 사유 입력 (필수)</label>
                                        <textarea className="input-box" style={{ minHeight: '80px' }} placeholder="고객에게 전달될 취소 사유를 입력하세요..."></textarea>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <button className="btn btn-secondary" style={{ padding: '1rem', color: '#ef4444' }}>
                                            <XCircle size={18} /> 확정 예약 취소
                                        </button>
                                        <button className="btn btn-primary" style={{ padding: '1rem' }}>
                                            <Settings2 size={18} /> 시간 변경 요청
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <button className="btn btn-primary" style={{ padding: '1rem', background: '#10b981' }}>
                                        <CheckCircle2 size={18} /> 예약 확정
                                    </button>
                                    <button className="btn btn-secondary" style={{ padding: '1rem' }}>
                                        <XCircle size={18} /> 예약 거절
                                    </button>
                                </div>
                            )}

                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>고객의 취소 요청이 있습니까?</span>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>승인</button>
                                        <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>거부</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CCASchedule;
