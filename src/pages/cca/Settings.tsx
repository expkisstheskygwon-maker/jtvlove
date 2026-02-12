import React, { useState } from 'react';
import {
    Camera,
    User,
    Info,
    Edit3,
    MessageCircle,
    Heart,
    Share2,
    Upload,
    Video,
    Music,
    Save,
    Eye,
    Plus,
    X,
    Instagram,
    ExternalLink,
    Sparkles,
    Trash
} from 'lucide-react';

const CCASettings: React.FC = () => {
    const [accentColor, setAccentColor] = useState('#6366f1');
    const [tags, setTags] = useState<string[]>(['여행', '맛집탐방', '필라테스']);
    const [tagInput, setTagInput] = useState('');

    // Mock Data
    const [profile, setProfile] = useState({
        nickname: '미나 (Mina)',
        realName: '김미나',
        age: 23,
        height: 165,
        weight: 48,
        affiliation: '블루 JTV (Blue JTV)',
        bio: '밝은 에너지로 즐거운 시간을 약속드려요! ✨',
        preferredStyle: '다정하고 예의 바른 분',
        mbti: 'ENFP',
        zodiac: '천칭자리',
        oneLiner: '오늘보다 내일 더 빛나는 미나입니다.',
        contactStyle: '자주',
        restStyle: '집콕',
        friendCircle: '깊게',
        alcohol: '가끔',
        smoking: '비흡연',
        pets: '강아지',
        sns: {
            kakao: 'mina_love',
            instagram: 'mina_insta',
            facebook: 'https://fb.com/mina'
        }
    });

    const stats = {
        likes: 1248,
        shares: 342,
        views: 8902,
        comments: 156
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim() && tags.length < 10) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="cca-settings-view">
            <style>{`
        .cca-settings-view { max-width: 800px; margin: 0 auto; padding-bottom: 8rem; }
        
        /* Layout Sections */
        .settings-section { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; margin-bottom: 2rem; transition: transform 0.2s; }
        .settings-section:hover { border-color: var(--primary); }
        .section-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
        .section-header h2 { font-size: 1.25rem; font-weight: 800; }
        
        /* Form Elements */
        .field-group { margin-bottom: 1.5rem; }
        .field-group label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; }
        .input-box { width: 100%; padding: 0.85rem 1rem; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 12px; color: var(--text); outline: none; transition: all 0.2s; }
        .input-box:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
        .input-box:read-only { opacity: 0.6; cursor: not-allowed; }
        
        /* Profile Main Editor */
        .main-pfp-editor { display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .pfp-preview { width: 120px; height: 120px; border-radius: 50%; background: var(--surface-alt); border: 2px dashed var(--border); display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer; overflow: hidden; }
        .pfp-preview img { width: 100%; height: 100%; object-fit: cover; }
        .pfp-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; opacity: 0; transition: opacity 0.2s; }
        .pfp-preview:hover .pfp-overlay { opacity: 1; }

        .color-picker-wrap { display: flex; align-items: center; gap: 1rem; padding: 0.5rem; background: var(--surface-alt); border-radius: 50px; width: fit-content; border: 1px solid var(--border); }
        .color-circle { width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; cursor: pointer; position: relative; overflow: hidden; }
        .color-circle input { position: absolute; inset: -5px; opacity: 0; cursor: pointer; }

        /* Tag Input */
        .tags-container { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
        .tag { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.8rem; background: var(--primary); color: white; border-radius: 50px; font-size: 0.85rem; font-weight: 600; }
        
        /* Media Grid Manager */
        .media-manager-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1rem; }
        .media-slot { aspect-ratio: 1; border-radius: 12px; border: 2px dashed var(--border); background: var(--surface-alt); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; color: var(--text-muted); transition: all 0.2s; }
        .media-slot:hover { border-color: var(--primary); color: var(--primary); background: rgba(99, 102, 241, 0.05); }
        
        /* Floating Actions */
        .floating-footer { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); width: calc(100% - 2rem); max-width: 800px; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 1.25rem 2rem; display: flex; justify-content: space-between; align-items: center; z-index: 1000; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        
        .stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .stat-pill { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: var(--surface-alt); border-radius: 16px; border: 1px solid var(--border); }

        @media (max-width: 768px) {
          .cca-settings-view { padding: 1rem; }
          .main-pfp-editor { flex-direction: column; text-align: center; }
          .stat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

            <div className="settings-header" style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem' }}>프로필 성장 설정</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>나만의 매력을 발산할 수 있는 프로필을 완성해보세요.</p>
            </div>

            {/* Main Section */}
            <section className="settings-section">
                <div className="section-header">
                    <User className="text-primary" />
                    <h2>메인 프로필 설정</h2>
                </div>
                <div className="main-pfp-editor">
                    <div className="pfp-preview">
                        <Camera size={32} />
                        <div className="pfp-overlay"><Upload size={24} /></div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className="field-group">
                            <label>닉네임 (활동 이름)</label>
                            <input type="text" className="input-box" value={profile.nickname} onChange={e => setProfile({ ...profile, nickname: e.target.value })} />
                        </div>
                        <div className="field-group">
                            <label>프로필 메인 색상</label>
                            <div className="color-picker-wrap">
                                <div className="color-circle" style={{ background: accentColor }}>
                                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{accentColor.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Basic Info */}
            <section className="settings-section">
                <div className="section-header">
                    <Info className="text-primary" />
                    <h2>기본 정보</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="field-group">
                        <label>본명</label>
                        <input type="text" className="input-box" value={profile.realName} readOnly />
                    </div>
                    <div className="field-group">
                        <label>소속 업체</label>
                        <input type="text" className="input-box" value={profile.affiliation} readOnly />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="field-group">
                        <label>나이</label>
                        <input type="number" className="input-box" value={profile.age} onChange={e => setProfile({ ...profile, age: parseInt(e.target.value) })} />
                    </div>
                    <div className="field-group">
                        <label>키 (cm)</label>
                        <input type="number" className="input-box" value={profile.height} onChange={e => setProfile({ ...profile, height: parseInt(e.target.value) })} />
                    </div>
                    <div className="field-group">
                        <label>몸무게 (kg)</label>
                        <input type="number" className="input-box" value={profile.weight} onChange={e => setProfile({ ...profile, weight: parseInt(e.target.value) })} />
                    </div>
                </div>
                <div className="field-group">
                    <label>SNS 채널</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <div className="input-box" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem' }}>
                                <MessageCircle size={18} className="text-muted" />
                                <input type="text" placeholder="카카오톡 ID" style={{ border: 'none', background: 'transparent', outline: 'none', color: 'inherit', width: '100%' }} value={profile.sns.kakao} />
                            </div>
                            <div className="input-box" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem' }}>
                                <Instagram size={18} className="text-muted" />
                                <input type="text" placeholder="인스타그램 ID" style={{ border: 'none', background: 'transparent', outline: 'none', color: 'inherit', width: '100%' }} value={profile.sns.instagram} />
                            </div>
                        </div>
                        <div className="input-box" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem' }}>
                            <ExternalLink size={18} className="text-muted" />
                            <input type="text" placeholder="기타 SNS / 페이스북 URL" style={{ border: 'none', background: 'transparent', outline: 'none', color: 'inherit', width: '100%' }} value={profile.sns.facebook} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Details */}
            <section className="settings-section">
                <div className="section-header">
                    <Edit3 className="text-primary" />
                    <h2>자기소개 및 취향</h2>
                </div>
                <div className="field-group">
                    <label>소개 문구 (최대 300자)</label>
                    <textarea className="input-box" style={{ minHeight: '120px', resize: 'none' }} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value.slice(0, 300) })}></textarea>
                    <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{profile.bio.length} / 300</div>
                </div>
                <div className="field-group">
                    <label>한 줄 스토리 (최대 50자)</label>
                    <input type="text" className="input-box" placeholder="나를 표현하는 한 줄" value={profile.oneLiner} onChange={e => setProfile({ ...profile, oneLiner: e.target.value.slice(0, 50) })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="field-group">
                        <label>선호하는 스타일</label>
                        <input type="text" className="input-box" value={profile.preferredStyle} onChange={e => setProfile({ ...profile, preferredStyle: e.target.value })} />
                    </div>
                    <div className="field-group">
                        <label>관심사 (최대 10개)</label>
                        <input type="text" className="input-box" placeholder="엔터로 추가" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleAddTag} />
                        <div className="tags-container">
                            {tags.map((tag, i) => (
                                <span key={i} className="tag">{tag} <X size={14} className="cursor-pointer" onClick={() => removeTag(i)} /></span>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="field-group">
                        <label>MBTI</label>
                        <select className="input-box" value={profile.mbti} onChange={e => setProfile({ ...profile, mbti: e.target.value })}>
                            {['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'].map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field-group">
                        <label>별자리</label>
                        <select className="input-box" value={profile.zodiac} onChange={e => setProfile({ ...profile, zodiac: e.target.value })}>
                            {['물병', '물고기', '양', '황소', '쌍둥이', '게', '사자', '처녀', '천칭', '전갈', '사수', '염소'].map(z => (
                                <option key={z} value={z + '자리'}>{z}자리</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="field-group">
                        <label>연락 스타일</label>
                        <select className="input-box" value={profile.contactStyle} onChange={e => setProfile({ ...profile, contactStyle: e.target.value })}>
                            <option value="자주">자주</option>
                            <option value="보통">보통</option>
                            <option value="가끔">가끔</option>
                        </select>
                    </div>
                    <div className="field-group">
                        <label>휴식 스타일</label>
                        <select className="input-box" value={profile.restStyle} onChange={e => setProfile({ ...profile, restStyle: e.target.value })}>
                            <option value="집콕">집콕</option>
                            <option value="외출">외출</option>
                            <option value="운동">운동</option>
                        </select>
                    </div>
                    <div className="field-group">
                        <label>주량</label>
                        <select className="input-box" value={profile.alcohol} onChange={e => setProfile({ ...profile, alcohol: e.target.value })}>
                            <option value="안 마심">안 마심</option>
                            <option value="가끔">가끔</option>
                            <option value="자주">자주</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Media Manager */}
            <section className="settings-section">
                <div className="section-header">
                    <Sparkles className="text-primary" />
                    <h2>미디어 갤러리 관리</h2>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    사진은 최대 30장, 영상은 100MB, 사운드는 50MB까지 업로드 가능합니다.
                </p>
                <div className="media-manager-grid">
                    <div className="media-slot">
                        <Plus size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>사진 추가</span>
                    </div>
                    <div className="media-slot">
                        <Video size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>영상 추가</span>
                    </div>
                    <div className="media-slot">
                        <Music size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>사운드 추가</span>
                    </div>
                    {[1, 2, 3].map(i => (
                        <div key={i} className="media-slot" style={{ border: 'none', position: 'relative' }}>
                            <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=200`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(239, 68, 68, 0.8)', color: 'white', padding: '0.3rem', borderRadius: '8px', cursor: 'pointer' }}>
                                <Trash size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats View */}
            <section className="settings-section">
                <div className="section-header">
                    <Heart className="text-primary" />
                    <h2>활동 통계 (최근 30일)</h2>
                </div>
                <div className="stat-grid">
                    <div className="stat-pill">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Heart size={20} className="text-danger" fill="currentColor" />
                            <span style={{ fontWeight: 600 }}>총 좋아요</span>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>{stats.likes.toLocaleString()}</span>
                    </div>
                    <div className="stat-pill">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Share2 size={20} className="text-primary" />
                            <span style={{ fontWeight: 600 }}>공유 횟수</span>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>{stats.shares.toLocaleString()}</span>
                    </div>
                    <div className="stat-pill">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Eye size={20} className="text-success" />
                            <span style={{ fontWeight: 600 }}>프로필 조회</span>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>{stats.views.toLocaleString()}</span>
                    </div>
                    <div className="stat-pill">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <MessageCircle size={20} className="text-warning" />
                            <span style={{ fontWeight: 600 }}>누적 댓글</span>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>{stats.comments.toLocaleString()}</span>
                    </div>
                </div>
            </section>

            {/* Floating Actions */}
            <div className="floating-footer">
                <button className="btn btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Eye size={18} /> 미리보기
                </button>
                <button className="btn btn-primary" style={{ padding: '0.75rem 3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', fontWeight: 800 }}>
                    <Save size={20} /> 설정 저장하기
                </button>
            </div>
        </div>
    );
};

export default CCASettings;
