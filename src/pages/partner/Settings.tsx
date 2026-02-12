import React, { useState } from 'react';
import {
    Camera,
    Image as ImageIcon,
    Phone,
    MessageCircle,
    Clock,
    MapPin,
    Upload,
    Download,
    Plus,
    Trash2,
    Video,
    Music,
    Heart,
    Share2,
    MessageSquare,
    Eye,
    Save,
    Send,
    FileSpreadsheet
} from 'lucide-react';

type SettingsTab = 'basic' | 'intro' | 'media' | 'menu';

const PartnerSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('basic');
    const [accentColor, setAccentColor] = useState('#6366f1');

    // Multi-input states
    const [phones, setPhones] = useState(['010-1234-5678']);
    const [regions] = useState(['앙헬레스', '세부', '클락', '마카티', '말라떼']);
    const [selectedRegion, setSelectedRegion] = useState('앙헬레스');

    return (
        <div className="settings-view">
            <style>{`
        .settings-view { display: flex; flex-direction: column; gap: 2rem; padding-bottom: 5rem; }
        
        .hero-banner-editor {
          position: relative;
          height: 240px;
          border-radius: 24px;
          background: #1f2937;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          cursor: pointer;
        }
        .hero-banner-editor:hover .banner-overlay { opacity: 1; }

        .profile-pic-container {
          position: absolute;
          bottom: -40px;
          left: 40px;
          width: 120px;
          height: 120px;
          border-radius: 30px;
          background: var(--surface);
          border: 4px solid var(--bg);
          overflow: hidden;
          z-index: 10;
        }
        .profile-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          cursor: pointer;
        }
        .profile-pic-container:hover .profile-overlay { opacity: 1; }

        .settings-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 2rem;
        }

        .tab-nav {
          display: flex;
          gap: 1.5rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 2rem;
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
        }
        .tab-item {
          padding: 1rem 0.5rem;
          color: var(--text-muted);
          font-weight: 500;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
        }
        .tab-item.active {
          color: var(--primary);
          font-weight: 700;
        }
        .tab-item.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--primary);
          border-radius: 3px 3px 0 0;
        }

        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-muted); }
        
        .multi-input-row { display: flex; gap: 0.75rem; margin-bottom: 0.5rem; }
        
        .grid-layout { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        
        .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; }
        .media-item { aspect-ratio: 1; border-radius: 12px; background: var(--surface-alt); overflow: hidden; position: relative; border: 1px solid var(--border); }
        .media-item img { width: 100%; height: 100%; object-fit: cover; }
        .media-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 0.5rem; background: rgba(0,0,0,0.6); display: flex; gap: 0.5rem; font-size: 0.7rem; }

        .color-picker-btn { width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; cursor: pointer; position: relative; }
        
        .action-bar {
          position: fixed;
          bottom: 24px;
          right: 24px;
          left: 24px;
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(12px);
          padding: 1rem 2rem;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
        }

        @media (max-width: 768px) {
          .grid-layout { grid-template-columns: 1fr; }
          .hero-banner-editor { height: 160px; }
          .profile-pic-container { width: 90px; height: 90px; left: 20px; bottom: -30px; }
          .action-bar { left: 12px; right: 12px; bottom: 84px; padding: 0.75rem 1rem; }
        }
      `}</style>

            <div style={{ paddingBottom: '2rem' }}>
                <div className="hero-banner-editor">
                    <div className="banner-overlay">
                        <div style={{ textAlign: 'center' }}>
                            <ImageIcon size={32} />
                            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>배너 이미지 변경 (1920x500)</div>
                        </div>
                    </div>
                    <div className="profile-pic-container">
                        <div className="profile-overlay">
                            <Camera size={24} />
                        </div>
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>G</div>
                    </div>
                </div>
            </div>

            <div className="settings-card" style={{ marginTop: '1rem' }}>
                <div className="tab-nav">
                    <div className={`tab-item ${activeTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveTab('basic')}>기본 정보</div>
                    <div className={`tab-item ${activeTab === 'intro' ? 'active' : ''}`} onClick={() => setActiveTab('intro')}>업체 소개</div>
                    <div className={`tab-item ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>미디어 갤러리</div>
                    <div className={`tab-item ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>메뉴 관리</div>
                </div>

                {activeTab === 'basic' && (
                    <div className="grid-layout">
                        <div>
                            <div className="input-group">
                                <label>업체명 (수정 불가)</label>
                                <input type="text" className="form-input" value="골든 JTV" readOnly style={{ opacity: 0.6 }} />
                                <p className="form-hint" style={{ marginTop: '0.4rem' }}>업체명 변경은 슈퍼관리자에게 문의해주세요.</p>
                            </div>

                            <div className="input-group">
                                <label>대표 색상 (Theme Color)</label>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div className="color-picker-btn" style={{ background: accentColor }}>
                                        <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} style={{ opacity: 0, inset: 0, position: 'absolute', cursor: 'pointer' }} />
                                    </div>
                                    <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{accentColor.toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>연락처 관리</label>
                                {phones.map((p, i) => (
                                    <div key={i} className="multi-input-row">
                                        <div className="input-box" style={{ flex: 1 }}>
                                            <Phone size={16} className="text-muted" />
                                            <input type="text" value={p} onChange={(e) => {
                                                const newPhones = [...phones];
                                                newPhones[i] = e.target.value;
                                                setPhones(newPhones);
                                            }} />
                                        </div>
                                        {i > 0 && <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => setPhones(phones.filter((_, idx) => idx !== i))}><Trash2 size={16} /></button>}
                                    </div>
                                ))}
                                <button className="btn btn-secondary" style={{ width: '100%', borderStyle: 'dashed' }} onClick={() => setPhones([...phones, ''])}>
                                    <Plus size={16} /> 연락처 추가
                                </button>
                            </div>

                            <div className="input-group">
                                <label>위치 및 지역</label>
                                <div className="input-box" style={{ marginBottom: '0.75rem' }}>
                                    <MapPin size={16} className="text-muted" />
                                    <input type="text" placeholder="상세 주소를 입력하세요" />
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {regions.map(r => (
                                        <span key={r} onClick={() => setSelectedRegion(r)} style={{
                                            padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.8rem', cursor: 'pointer',
                                            background: selectedRegion === r ? 'var(--primary)' : 'var(--surface-alt)',
                                            color: selectedRegion === r ? 'white' : 'var(--text-muted)',
                                            border: '1px solid ' + (selectedRegion === r ? 'var(--primary)' : 'var(--border)')
                                        }}>{r}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="input-group">
                                <label>SNS 채널</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div className="input-box">
                                        <MessageCircle size={16} color="#3AB54A" />
                                        <input type="text" placeholder="카카오톡 ID" />
                                    </div>
                                    <div className="input-box">
                                        <Send size={16} color="#0088cc" />
                                        <input type="text" placeholder="텔레그램 ID" />
                                    </div>
                                    <div className="input-box">
                                        <ImageIcon size={16} color="#E4405F" />
                                        <input type="text" placeholder="인스타그램 ID" />
                                    </div>
                                    <div className="input-box">
                                        <ImageIcon size={16} color="#1877F2" />
                                        <input type="text" placeholder="페이스북 URL" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>운영 시간 (Operating Hours)</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    <div className="input-box">
                                        <Clock size={16} className="text-muted" />
                                        <input type="time" defaultValue="18:00" />
                                    </div>
                                    <div className="input-box">
                                        <Clock size={16} className="text-muted" />
                                        <input type="time" defaultValue="04:00" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>쇼업 시간 (Show-up Hours)</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    <div className="input-box">
                                        <Clock size={16} className="text-muted" />
                                        <input type="time" defaultValue="19:30" />
                                    </div>
                                    <div className="input-box">
                                        <Clock size={16} className="text-muted" />
                                        <input type="time" defaultValue="01:00" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'intro' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label>업체 소개 문구 (최대 500자)</label>
                            <textarea className="form-input" rows={6} placeholder="고객들에게 보여줄 업체 소개를 입력하세요..." style={{ width: '100%', resize: 'none' }}></textarea>
                        </div>

                        <div style={{ background: 'var(--surface-alt)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h4 style={{ fontWeight: 700 }}>홍보용 PDF 생성</h4>
                                <button className="btn btn-secondary"><Download size={18} /> 샘플 보기</button>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>입력하신 업체 정보와 사진을 바탕으로 고객 공유용 홍보 PDF를 자동 생성합니다.</p>
                            <button className="btn btn-primary" style={{ width: '100%' }}>PDF 생성 및 다운로드</button>
                        </div>
                    </div>
                )}

                {activeTab === 'media' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>전체 미디어 (12/20)</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-secondary"><Video size={16} /> 영상 추가</button>
                                <button className="btn btn-secondary"><Music size={16} /> 사운드 추가</button>
                                <button className="btn btn-primary"><Plus size={16} /> 사진 추가</button>
                            </div>
                        </div>

                        <div className="media-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="media-item" style={{ cursor: 'pointer' }}>
                                    <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 1 }}>
                                        <button style={{ background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '4px', padding: '0.2rem', color: 'white' }}>
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                    <div style={{ width: '100%', height: '100%', background: `url(https://picsum.photos/seed/${i + 50}/400/400) center/cover` }} />
                                    <div className="media-info">
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Heart size={10} fill="#ef4444" stroke="none" /> 24</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MessageSquare size={10} /> 3</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Share2 size={10} /> 12</span>
                                    </div>
                                </div>
                            ))}
                            <div className="media-item" style={{ borderStyle: 'dashed', borderWidth: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                <Upload size={24} />
                                <span style={{ fontSize: '0.75rem' }}>드래그 앤 드롭</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'menu' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="grid-layout">
                            <div style={{ background: 'var(--surface-alt)', padding: '1.5rem', borderRadius: '16px' }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ImageIcon size={18} className="text-primary" /> 메뉴판 사진 업로드
                                </h4>
                                <div style={{ height: '200px', border: '2px dashed var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                    <Upload size={32} className="text-muted" />
                                    <button className="btn btn-secondary btn-sm">파일 선택</button>
                                </div>
                            </div>
                            <div style={{ background: 'var(--surface-alt)', padding: '1.5rem', borderRadius: '16px' }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FileSpreadsheet size={18} className="text-secondary" /> 엑셀 대량 등록
                                </h4>
                                <div style={{ height: '200px', border: '2px dashed var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                    <FileSpreadsheet size={32} className="text-muted" />
                                    <button className="btn btn-secondary btn-sm">엑셀 업로드</button>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>양식 다운로드</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>웹 에디터 직접 입력</h4>
                            <div style={{ minHeight: '300px', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', background: 'white', color: '#1f2937' }}>
                                <p style={{ color: '#9ca3af' }}>여기에 업체 메뉴와 가격을 자유롭게 입력하세요...</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="action-bar">
                <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Clock size={16} /> 최근 저장: 10분 전
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end' }}>
                    <button className="btn btn-secondary" style={{ flex: 1, maxWidth: '140px' }}><Eye size={18} /> 미리보기</button>
                    <button className="btn btn-primary" style={{ flex: 1, maxWidth: '200px' }}><Save size={18} /> 변경사항 저장</button>
                </div>
            </div>
        </div>
    );
};

export default PartnerSettings;
