import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Search,
    Eye,
    Clock,
    User,
    ChevronLeft,
    ArrowUpDown,
    PlusCircle,
    ChevronRight,
    MessageCircle
} from 'lucide-react';

const BoardDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('최신순');

    // Mock Data based on board id
    const boardNames: any = {
        free: '자유게시판',
        review: '업체/CCA 후기',
        qa: '문의/질문',
        hot: '인기 게시판',
        membership: '회원 모집'
    };

    const categories = ['전체', '잡담', '정보', '유머', '공지'];

    const mockPosts = [
        { id: 1, title: '오늘 말라테 블루 JTV 가보신 분 계신가요?', author: '필핀초보', date: '10분 전', views: 124, comments: 5, category: '질문' },
        { id: 2, title: '미나님 인터뷰 영상 대박이네요 ㅋㅋㅋ', author: 'JTV매니아', date: '35분 전', views: 890, comments: 24, category: '정보' },
        { id: 3, title: '주말에 필리핀 여행 갈 때 팁 알려드림', author: '베테랑', date: '2시간 전', views: 2450, comments: 85, category: '잡담' },
        { id: 4, title: '[공지] 커뮤니티 매너 준수 부탁드립니다.', author: '관리자', date: '어제', views: 5600, comments: 12, category: '공지' },
        { id: 5, title: '레드 엔터테인먼트 신규 CCA 추천 받습니다.', author: '여행가A', date: '어제', views: 420, comments: 8, category: '질문' },
        { id: 6, title: '여기 분위기 좋네요 자주 올게요!', author: '뉴비임당', date: '어제', views: 150, comments: 2, category: '잡담' },
        { id: 7, title: '필리핀 마닐라 맛집 추천 리스트 (2026)', author: '미식가', date: '2일 전', views: 12000, comments: 142, category: '정보' },
    ];

    return (
        <div className="board-detail-page">
            <style>{`
                .board-detail-page { max-width: 1000px; margin: 0 auto; padding-bottom: 5rem; }
                
                .board-header { margin: 2rem 0; display: flex; align-items: center; justify-content: space-between; }
                .back-btn { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-weight: 800; cursor: pointer; transition: color 0.2s; background: none; border: none; padding: 0; }
                .back-btn:hover { color: var(--primary); }
                
                .board-title-box { display: flex; align-items: center; gap: 1rem; margin-top: 1rem; }
                .board-title-box h1 { font-size: 2rem; font-weight: 950; }

                .controls-row { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin-top: 2rem; background: white; padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); }
                
                .search-input-wrap { position: relative; flex: 1; min-width: 300px; }
                .search-input-wrap input { width: 100%; padding: 0.85rem 1rem 0.85rem 3rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-alt); font-weight: 700; font-size: 0.95rem; }
                .search-input-wrap svg { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
                
                .category-chips { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.25rem; }
                .chip { padding: 0.5rem 1.25rem; border-radius: 50px; background: var(--surface-alt); font-weight: 850; font-size: 0.85rem; color: var(--text-muted); cursor: pointer; border: 1px solid transparent; white-space: nowrap; }
                .chip.active { background: white; border-color: var(--primary); color: var(--primary); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1); }

                /* Post Table Style */
                .post-list { margin-top: 1.5rem; background: white; border-radius: 24px; border: 1px solid var(--border); overflow: hidden; }
                .post-item { display: grid; grid-template-columns: 80px 1fr 150px 120px; align-items: center; padding: 1.25rem 2rem; border-bottom: 1px solid var(--border); cursor: pointer; transition: all 0.2s; }
                .post-item:last-child { border-bottom: none; }
                .post-item:hover { background: var(--surface-alt); }
                
                .post-cat { font-size: 0.75rem; font-weight: 900; color: var(--text-muted); background: #f3f4f6; padding: 0.25rem 0.6rem; border-radius: 6px; width: fit-content; }
                .post-cat.공지 { background: #fee2e2; color: #ef4444; }
                
                .post-title { font-size: 1.05rem; font-weight: 850; color: var(--text); display: flex; align-items: center; gap: 0.5rem; }
                .comment-count { color: var(--primary); font-size: 0.85rem; font-weight: 900; margin-left: 0.25rem; }
                
                .post-meta { display: flex; align-items: center; gap: 0.25rem; color: var(--text-muted); font-size: 0.85rem; font-weight: 700; }
                
                .write-fab { position: fixed; bottom: 3rem; right: 3rem; background: var(--primary); color: white; border-radius: 50px; padding: 1rem 2rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 900; box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4); border: none; cursor: pointer; z-index: 100; transition: transform 0.2s; }
                .write-fab:hover { transform: scale(1.05); }

                @media (max-width: 768px) {
                    .post-item { grid-template-columns: 1fr; gap: 0.5rem; }
                    .post-meta-row { display: flex; justify-content: space-between; margin-top: 0.5rem; }
                    .post-item .post-cat { margin-bottom: 0.5rem; }
                    .write-fab { bottom: 2rem; right: 2rem; padding: 1rem; width: 60px; height: 60px; justify-content: center; }
                    .write-fab span { display: none; }
                }
            `}</style>

            <div className="board-header">
                <button className="back-btn" onClick={() => navigate('/community')}>
                    <ChevronLeft size={20} /> 커뮤니티 목록으로
                </button>
            </div>

            <div className="board-title-box">
                <h1>{boardNames[id || 'free']}</h1>
                <span style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: '1.25rem' }}>{mockPosts.length}개의 게시글</span>
            </div>

            <div className="controls-row">
                <div className="category-chips">
                    {categories.map(c => <div key={c} className={`chip ${c === '전체' ? 'active' : ''}`}>{c}</div>)}
                </div>

                <div className="search-input-wrap">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="제목이나 내용으로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--surface-alt)', padding: '0.4rem 0.85rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <ArrowUpDown size={16} className="text-muted" />
                    <select
                        style={{ background: 'transparent', border: 'none', fontWeight: 850, fontSize: '0.85rem', color: 'var(--text)', cursor: 'pointer' }}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option>최신순</option>
                        <option>인기순</option>
                        <option>댓글순</option>
                    </select>
                </div>
            </div>

            <div className="post-list">
                {mockPosts.map(post => (
                    <div key={post.id} className="post-item" onClick={() => navigate(`/community/post/${post.id}`)}>
                        <div className={`post-cat ${post.category}`}>{post.category}</div>
                        <div className="post-title">
                            {post.title}
                            {post.comments > 0 && <span className="comment-count"><MessageCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px' }} /> {post.comments}</span>}
                        </div>
                        <div className="post-meta"><User size={14} /> {post.author}</div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="post-meta"><Clock size={14} /> {post.date}</div>
                            <div className="post-meta"><Eye size={14} /> {post.views}</div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="write-fab" onClick={() => navigate('/community/write', { state: { boardId: id } })}>
                <PlusCircle size={24} />
                <span>새 글 쓰기</span>
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', gap: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }} disabled><ChevronLeft size={18} /></button>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>1</button>
                <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>2</button>
                <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>3</button>
                <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}><ChevronRight size={18} /></button>
            </div>
        </div>
    );
};

export default BoardDetail;
