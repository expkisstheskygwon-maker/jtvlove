import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Calendar,
    Clock,
    MessageSquare,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    User,
    AlertCircle,
    ArrowRight
} from 'lucide-react';

const ReservationCreate: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(1); // 1: Select, 2: Confirm, 3: Success

    // Initial CCA data from location state or mock
    const [selectedCCA] = useState<any>(location.state?.cca || {
        id: 1,
        name: '미나',
        partner: '블루 JTV (Blue JTV)',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    });

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [message, setMessage] = useState('');
    const [reservationNum, setReservationNum] = useState('');

    // Mock Business Days/Hours
    const availableTimes = ['19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00'];
    const fullyBookedTimes = ['21:00', '22:00'];
    const unavailableDates = ['2026-02-15', '2026-02-16']; // Mocked unavailable dates

    const handleDateSelect = (date: string) => {
        if (unavailableDates.includes(date)) return;
        setSelectedDate(date);
        setSelectedTime(''); // Reset time when date changes
    };

    const handleReserve = () => {
        // Mock reservation creation
        const rNum = 'RES' + Math.floor(Math.random() * 900000 + 100000);
        setReservationNum(rNum);
        setStep(3);
    };

    if (step === 3) {
        return (
            <div className="success-container">
                <style>{`
                    .success-container { max-width: 500px; margin: 5rem auto; text-align: center; background: white; padding: 4rem 2rem; border-radius: 32px; border: 1px solid var(--border); }
                    .success-icon { width: 80px; height: 80px; background: #ecfdf5; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
                    .res-num-box { background: var(--surface-alt); padding: 1.5rem; border-radius: 16px; margin: 2rem 0; }
                `}</style>
                <div className="success-icon"><CheckCircle2 size={48} /></div>
                <h1 style={{ fontWeight: 950, fontSize: '2rem', marginBottom: '1rem' }}>예약 신청 완료!</h1>
                <p style={{ color: 'var(--text-muted)', fontWeight: 600, lineHeight: '1.6' }}>
                    예약 신청이 CCA에게 전달되었습니다.<br />
                    승인 결과는 알림 및 내 예약 목록에서 확인 가능합니다.
                </p>
                <div className="res-num-box">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>예약 번호</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', marginTop: '0.25rem' }}>{reservationNum}</div>
                </div>
                <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', fontWeight: 900, fontSize: '1.1rem' }}
                    onClick={() => navigate('/my/reservations')}
                >
                    내 예약 목록 이동
                </button>
            </div>
        );
    }

    return (
        <div className="reservation-page">
            <style>{`
                .reservation-page { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; padding-bottom: 5rem; }
                .reserve-card { background: white; border: 1px solid var(--border); border-radius: 28px; padding: 2.5rem; }
                .reserve-section-title { font-size: 1.25rem; font-weight: 950; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; }
                
                /* CCA Info Bar */
                .cca-info-bar { display: flex; align-items: center; justify-content: space-between; background: var(--surface-alt); padding: 1.25rem 2rem; border-radius: 20px; }
                .cca-profile-mini { display: flex; align-items: center; gap: 1rem; }
                .cca-pfp-small { width: 50px; height: 50px; border-radius: 50%; overflow: hidden; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                .cca-pfp-small img { width: 100%; height: 100%; object-fit: cover; }
                
                /* Calendar Grid Mock */
                .calendar-mock { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; background: var(--surface-alt); padding: 1.5rem; border-radius: 20px; }
                .cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 12px; font-weight: 800; cursor: pointer; transition: all 0.2s; position: relative; }
                .cal-day:hover:not(.disabled) { background: white; color: var(--primary); }
                .cal-day.active { background: var(--primary); color: white; }
                .cal-day.disabled { opacity: 0.3; cursor: not-allowed; }
                .cal-day.soldout::after { content: 'FULL'; position: absolute; bottom: 4px; font-size: 0.6rem; color: #ef4444; }

                /* Time Selection Grid */
                .time-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
                .time-btn { padding: 1rem; border: 1px solid var(--border); border-radius: 14px; background: white; font-weight: 800; font-size: 0.95rem; cursor: pointer; transition: all 0.2s; text-align: center; }
                .time-btn:hover:not(.disabled) { border-color: var(--primary); color: var(--primary); background: rgba(99, 102, 241, 0.05); }
                .time-btn.active { background: var(--primary); border-color: var(--primary); color: white; }
                .time-btn.disabled { background: var(--surface-alt); color: var(--text-muted); opacity: 0.5; cursor: not-allowed; text-decoration: line-through; }

                .msg-area { width: 100%; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem; font-family: inherit; font-weight: 600; min-height: 120px; resize: none; }
                .msg-area:focus { outline: none; border-color: var(--primary); background: white; }

                /* Summary Row */
                .conf-row { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border); }
                .conf-label { color: var(--text-muted); font-weight: 700; }
                .conf-value { font-weight: 900; color: var(--text); }

                @media (max-width: 768px) {
                    .time-grid { grid-template-columns: repeat(2, 1fr); }
                    .reserve-card { padding: 1.5rem; }
                }
            `}</style>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 950, margin: '2rem 0 1rem' }}>예약 신청하기</h1>

            {step === 1 ? (
                <>
                    <section className="reserve-card">
                        <h2 className="reserve-section-title"><User size={20} className="text-primary" /> CCA 선택 정보</h2>
                        <div className="cca-info-bar">
                            <div className="cca-profile-mini">
                                <div className="cca-pfp-small">
                                    <img src={selectedCCA.image} alt="" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>{selectedCCA.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>{selectedCCA.partner}</div>
                                </div>
                            </div>
                            <button className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', fontWeight: 800 }} onClick={() => navigate('/cca-list')}>
                                CCA 변경
                            </button>
                        </div>
                    </section>

                    <section className="reserve-card">
                        <h2 className="reserve-section-title"><Calendar size={20} className="text-primary" /> 예약 날짜 선택</h2>
                        <div className="calendar-mock">
                            {/* Simple mock calendar for demonstration */}
                            {['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d} style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800, paddingBottom: '0.5rem' }}>{d}</div>)}
                            {[...Array(14)].map((_, i) => {
                                const dayNum = 12 + i;
                                const dateStr = `2026-02-${dayNum}`;
                                const isUnavailable = unavailableDates.includes(dateStr);
                                return (
                                    <div
                                        key={i}
                                        className={`cal-day ${selectedDate === dateStr ? 'active' : ''} ${isUnavailable ? 'disabled soldout' : ''}`}
                                        onClick={() => handleDateSelect(dateStr)}
                                    >
                                        {dayNum}
                                    </div>
                                );
                            })}
                        </div>
                        {selectedDate && (
                            <div style={{ marginTop: '2rem' }}>
                                <h2 className="reserve-section-title" style={{ fontSize: '1rem' }}><Clock size={18} className="text-primary" /> 날짜: {selectedDate} - 시간 선택</h2>
                                <div className="time-grid">
                                    {availableTimes.map(t => (
                                        <button
                                            key={t}
                                            className={`time-btn ${selectedTime === t ? 'active' : ''} ${fullyBookedTimes.includes(t) ? 'disabled' : ''}`}
                                            onClick={() => !fullyBookedTimes.includes(t) && setSelectedTime(t)}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="reserve-card">
                        <h2 className="reserve-section-title"><MessageSquare size={20} className="text-primary" /> 예약 메시지 (요청사항)</h2>
                        <textarea
                            className="msg-area"
                            placeholder="업체나 CCA에게 전달할 요청사항을 입력해주세요. (최대 200자)"
                            maxLength={200}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </section>

                    <div style={{ textAlign: 'right' }}>
                        <button
                            className="btn btn-primary"
                            disabled={!selectedDate || !selectedTime}
                            style={{ padding: '1rem 3rem', fontWeight: 950, fontSize: '1.1rem', borderRadius: '16px' }}
                            onClick={() => setStep(2)}
                        >
                            다음 단계 <ChevronRight size={20} />
                        </button>
                    </div>
                </>
            ) : (
                <section className="reserve-card">
                    <h2 className="reserve-section-title"><CheckCircle2 size={20} className="text-primary" /> 예약 내용 확인</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '2rem' }}>
                        <div className="conf-row">
                            <span className="conf-label">선택한 CCA</span>
                            <span className="conf-value">{selectedCCA.name} ({selectedCCA.partner})</span>
                        </div>
                        <div className="conf-row">
                            <span className="conf-label">예약 날짜</span>
                            <span className="conf-value">{selectedDate}</span>
                        </div>
                        <div className="conf-row">
                            <span className="conf-label">예약 시간</span>
                            <span className="conf-value">{selectedTime}</span>
                        </div>
                        <div className="conf-row" style={{ border: 'none' }}>
                            <span className="conf-label">요청 메시지</span>
                            <p style={{ fontWeight: 700, marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', width: '100%', background: 'var(--surface-alt)', padding: '1rem', borderRadius: '12px' }}>
                                {message || '입력된 요청사항이 없습니다.'}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-secondary" style={{ flex: 1, padding: '1rem', fontWeight: 800 }} onClick={() => setStep(1)}>
                            <ChevronLeft size={20} /> 수정하기
                        </button>
                        <button className="btn btn-primary" style={{ flex: 1, padding: '1rem', fontWeight: 950 }} onClick={handleReserve}>
                            예약 확정하기 <ArrowRight size={20} />
                        </button>
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
                        <AlertCircle size={14} /> 예약은 승인 대기 상태로 생성되며, CCA가 확인 후 최종 확정됩니다.
                    </div>
                </section>
            )}
        </div>
    );
};

export default ReservationCreate;
