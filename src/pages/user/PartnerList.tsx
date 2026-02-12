import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    MapPin,
    Star,
    Filter,
    ArrowUpDown,
    LayoutGrid
} from 'lucide-react';

const PartnerList: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('전체 지역');
    const [sortBy, setBy] = useState('인기순');

    const regions = ['전체 지역', '마닐라 말라테', '파사이 에드사', '마카티 피불고스', '퀘존 시티', '오르티가스'];
    const sortOptions = ['인기순', '최신순', '평점순'];

    const allPartners = [
        { id: 1, name: '블루 JTV (Blue JTV)', region: '마닐라 말라테', rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1571948482861-ee29d915993b', intro: '최고급 시설과 검증된 서비스로 모시는 말라테 최고의 명소입니다.', tags: ['프리미엄', '대형룸'] },
        { id: 2, name: '레드 엔터테인먼트', region: '파사이 에드사', rating: 4.8, reviews: 95, image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2', intro: '즐거움이 끊이지 않는 화려한 스테이지와 최고의 파티 분위기.', tags: ['파티', '라이브'] },
        { id: 3, name: '골드 케어', region: '마카티 피불고스', rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', intro: '프라이빗한 공간에서 즐기는 편안한 대화와 세심한 케어 서비스.', tags: ['프라이빗', '정통JTV'] },
        { id: 4, name: '스타 JTV', region: '퀘존 시티', rating: 4.6, reviews: 74, image: 'https://images.unsplash.com/photo-1571948482861-ee29d915993b', intro: '로컬 인기 CCA들이 대거 포진한 퀘존의 핫플레이스 스타 JTV.', tags: ['로컬인기', '가성비'] },
        { id: 5, name: '문라이트 나이트', region: '오르티가스', rating: 4.9, reviews: 156, image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2', intro: '품격 있는 밤을 위한 완벽한 선택, 오르티가스의 새로운 기준.', tags: ['세련된', '신규오픈'] },
        { id: 6, name: '오로라 라운지', region: '마닐라 말라테', rating: 4.5, reviews: 42, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', intro: '아늑한 분위기와 친절한 서비스가 돋보이는 모던 JTV.', tags: ['아늑한', '친절'] },
    ];

    const filteredPartners = allPartners.filter(p => {
        const matchRegion = selectedRegion === '전체 지역' || p.region === selectedRegion;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchRegion && matchSearch;
    });

    return (
        <div className="partner-list-page">
            <style>{`
        .partner-list-page { display: flex; flex-direction: column; gap: 2rem; }
        
        .list-header { background: white; border: 1px solid var(--border); border-radius: 24px; padding: 2rem; }
        .search-row { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .search-box { flex: 1; position: relative; }
        .search-box input { width: 100%; padding: 1rem 1rem 1rem 3rem; border-radius: 16px; border: 1px solid var(--border); background: var(--surface-alt); font-weight: 600; }
        .search-box svg { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }

        .filter-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .filter-group { display: flex; align-items: center; gap: 0.75rem; }
        .filter-chip { padding: 0.6rem 1.25rem; border-radius: 50px; border: 1px solid var(--border); background: white; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .filter-chip:hover { border-color: var(--primary); color: var(--primary); }
        .filter-chip.active { background: var(--primary); border-color: var(--primary); color: white; }

        .sort-select { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer; }

        .grid-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .card { background: white; border: 1px solid var(--border); border-radius: 24px; overflow: hidden; transition: all 0.3s; cursor: pointer; }
        .card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); border-color: var(--primary); }
        
        .card-img-wrap { position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; }
        .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .card:hover .card-img-wrap img { transform: scale(1.05); }
        
        .rating-badge { position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); color: white; padding: 0.35rem 0.75rem; border-radius: 50px; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; gap: 0.25rem; }
        .region-badge { position: absolute; bottom: 1rem; left: 1rem; background: white; color: var(--text); padding: 0.35rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 0.25rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

        .card-content { padding: 1.5rem; }
        .card-title { font-size: 1.25rem; font-weight: 900; margin-bottom: 0.5rem; color: var(--text); }
        .card-intro { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem; height: 2.7rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .card-tags { display: flex; gap: 0.5rem; }
        .tag { padding: 0.25rem 0.6rem; background: var(--surface-alt); border-radius: 8px; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }

        @media (max-width: 768px) {
          .search-row { flex-direction: column; }
          .grid-container { grid-template-columns: 1fr; }
        }
      `}</style>

            <div className="list-header">
                <h1 style={{ fontSize: '1.75rem', fontWeight: 950, marginBottom: '1.5rem' }}>전체 업체 리스트</h1>

                <div className="search-row">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="찾으시는 업체명을 입력하세요..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="filter-row">
                    <div className="filter-group">
                        <Filter size={18} className="text-primary" />
                        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {regions.map(r => (
                                <div
                                    key={r}
                                    className={`filter-chip ${selectedRegion === r ? 'active' : ''}`}
                                    onClick={() => setSelectedRegion(r)}
                                >
                                    {r}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sort-select">
                        <ArrowUpDown size={18} />
                        <select
                            style={{ border: 'none', background: 'transparent', fontWeight: 800, color: 'var(--text)', cursor: 'pointer' }}
                            value={sortBy}
                            onChange={(e) => setBy(e.target.value)}
                        >
                            {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid-container">
                {filteredPartners.map(p => (
                    <div key={p.id} className="card" onClick={() => navigate(`/partners/${p.id}`)}>
                        <div className="card-img-wrap">
                            <img src={p.image} alt={p.name} />
                            <div className="rating-badge">
                                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                {p.rating}
                            </div>
                            <div className="region-badge">
                                <MapPin size={12} />
                                {p.region}
                            </div>
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">{p.name}</h3>
                            <p className="card-intro">{p.intro}</p>
                            <div className="card-tags">
                                {p.tags.map(t => <span key={t} className="tag">#{t}</span>)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPartners.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                    <LayoutGrid size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                    <p style={{ fontWeight: 800 }}>검색 결과와 일치하는 업체가 없습니다.</p>
                </div>
            )}
        </div>
    );
};

export default PartnerList;
