import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    ArrowUpDown,
    Heart,
    Building2,
    Sparkles,
    ChevronDown,
    User
} from 'lucide-react';

const CCAList: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPartner, setSelectedPartner] = useState('전체 업체');
    const [selectedGrade, setSelectedGrade] = useState('전체 등급');
    const [sortBy, setSortBy] = useState('인기순');

    const partners = ['전체 업체', '블루 JTV', '레드 엔터', '골드 케어', '스타 JTV'];
    const grades = ['전체 등급', 'S클래스', 'A클래스', '신규'];
    const sortOptions = ['인기순', '최신순', '평점순'];

    const allCCAs = [
        { id: 1, name: '미나', partner: '블루 JTV', grade: 'S클래스', age: 23, intro: '말라테 최고의 미소, 미나입니다.', likes: 1240, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
        { id: 2, name: '사랑', partner: '레드 엔터', grade: 'A클래스', age: 21, intro: '활기찬 에너지로 즐거움을 드릴게요!', likes: 980, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
        { id: 3, name: '유리', partner: '블루 JTV', grade: 'S클래스', age: 24, intro: '품격 있는 대화를 원하신다면 유리와 함께.', likes: 2100, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1' },
        { id: 4, name: '지니', partner: '골드 케어', grade: '신규', age: 22, intro: '새로운 매력을 보여드릴 지니입니다.', likes: 850, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
        { id: 5, name: '하니', partner: '스타 JTV', grade: 'A클래스', age: 23, intro: '해피 바이러스 하니입니다~!', likes: 1100, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9' },
        { id: 6, name: '리아', partner: '레드 엔터', grade: 'S클래스', age: 20, intro: '차분하고 세심한 서비스로 모십니다.', likes: 720, image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df' },
        { id: 7, name: '모모', partner: '블루 JTV', grade: 'A클래스', age: 21, intro: '오늘 밤 주인공은 바로 당신!', likes: 1560, image: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c' },
        { id: 8, name: '나나', partner: '스타 JTV', grade: 'S클래스', age: 25, intro: '베테랑의 관록을 보여드릴게요.', likes: 2300, image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604' },
    ];

    const filteredCCAs = allCCAs.filter(cca => {
        const matchPartner = selectedPartner === '전체 업체' || cca.partner === selectedPartner;
        const matchGrade = selectedGrade === '전체 등급' || cca.grade === selectedGrade;
        const matchSearch = cca.name.includes(searchQuery);
        return matchPartner && matchGrade && matchSearch;
    });

    return (
        <div className="cca-list-page">
            <style>{`
                .cca-list-page { display: flex; flex-direction: column; gap: 2rem; }
                
                .header-card { background: white; border: 1px solid var(--border); border-radius: 24px; padding: 2rem; }
                .title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
                
                .search-bar { position: relative; flex: 1; max-width: 500px; }
                .search-bar input { width: 100%; padding: 0.85rem 1rem 0.85rem 3rem; border-radius: 16px; border: 1px solid var(--border); background: var(--surface-alt); font-weight: 700; }
                .search-bar svg { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }

                .filter-controls { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }
                .select-wrapper { position: relative; display: flex; align-items: center; gap: 0.5rem; background: var(--surface-alt); border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 12px; cursor: pointer; }
                .select-wrapper select { border: none; background: transparent; font-weight: 800; font-size: 0.85rem; appearance: none; padding-right: 1.5rem; cursor: pointer; color: var(--text); }
                .select-wrapper .chevron { position: absolute; right: 0.75rem; pointer-events: none; color: var(--text-muted); }

                /* Instagram Style Grid */
                .cca-ig-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
                .cca-ig-card { border-radius: 20px; overflow: hidden; background: white; border: 1px solid var(--border); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
                .cca-ig-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); border-color: var(--primary); }
                
                .cca-img-wrap { position: relative; aspect-ratio: 1; overflow: hidden; }
                .cca-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
                .cca-ig-card:hover .cca-img-wrap img { transform: scale(1.08); }

                .cca-grade-badge { position: absolute; top: 1rem; left: 1rem; background: rgba(99, 102, 241, 0.9); backdrop-filter: blur(8px); color: white; padding: 0.25rem 0.6rem; border-radius: 8px; font-size: 0.7rem; font-weight: 800; }
                .cca-like-badge { position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); color: white; padding: 0.25rem 0.6rem; border-radius: 50px; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 0.25rem; }

                .cca-info { padding: 1.25rem; }
                .cca-top-info { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
                .cca-name { font-size: 1.15rem; font-weight: 950; color: var(--text); }
                .cca-partner-name { font-size: 0.8rem; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 0.25rem; }
                
                .cca-intro-box { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; height: 2.6rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

                @media (max-width: 1024px) {
                    .cca-ig-grid { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 768px) {
                    .cca-ig-grid { grid-template-columns: repeat(2, 1fr); }
                    .header-card { padding: 1.5rem; }
                    .title-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .search-bar { max-width: 100%; }
                }
            `}</style>

            <div className="header-card">
                <div className="title-row">
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 950 }}>전체 CCA 리스트</h1>
                    <div className="search-bar">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="이름으로 검색하세요..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="filter-controls">
                    <div className="select-wrapper">
                        <Building2 size={16} className="text-primary" />
                        <select value={selectedPartner} onChange={(e) => setSelectedPartner(e.target.value)}>
                            {partners.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <ChevronDown size={14} className="chevron" />
                    </div>

                    <div className="select-wrapper">
                        <Sparkles size={16} className="text-warning" />
                        <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                            {grades.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <ChevronDown size={14} className="chevron" />
                    </div>

                    <div style={{ marginLeft: 'auto' }} className="select-wrapper">
                        <ArrowUpDown size={16} />
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            {sortOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={14} className="chevron" />
                    </div>
                </div>
            </div>

            <div className="cca-ig-grid">
                {filteredCCAs.map(cca => (
                    <div key={cca.id} className="cca-ig-card" onClick={() => navigate(`/cca/${cca.id}`)}>
                        <div className="cca-img-wrap">
                            <img src={cca.image} alt={cca.name} />
                            <div className="cca-grade-badge">{cca.grade}</div>
                            <div className="cca-like-badge">
                                <Heart size={12} fill="white" /> {cca.likes}
                            </div>
                        </div>
                        <div className="cca-info">
                            <div className="cca-top-info">
                                <span className="cca-name">{cca.name} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 700 }}>({cca.age})</span></span>
                            </div>
                            <div className="cca-partner-name">
                                <Building2 size={14} /> {cca.partner}
                            </div>
                            <p className="cca-intro-box" style={{ marginTop: '0.75rem' }}>{cca.intro}</p>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCCAs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                    <User size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                    <p style={{ fontWeight: 800 }}>조건에 맞는 CCA가 없습니다.</p>
                </div>
            )}
        </div>
    );
};

export default CCAList;
