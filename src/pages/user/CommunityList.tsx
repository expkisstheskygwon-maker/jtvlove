import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MessageSquare,
    Users,
    Zap,
    HelpCircle,
    TrendingUp,
    ChevronRight,
    MessageCircle,
    FileText
} from 'lucide-react';

const CommunityList: React.FC = () => {
    const navigate = useNavigate();

    const boards = [
        {
            id: 'free',
            name: '자유게시판',
            desc: '일상, 잡담 등 자유로운 소통 공간입니다.',
            icon: <MessageSquare size={24} />,
            count: 12540,
            color: '#6366f1'
        },
        {
            id: 'review',
            name: '업체/CCA 후기',
            desc: '생생한 방문 후기와 알짜 정보를 공유하세요.',
            icon: <FileText size={24} />,
            count: 8420,
            color: '#ec4899'
        },
        {
            id: 'qa',
            name: '문의/질문',
            desc: '필리핀 여행이나 관리에 대해 무엇이든 물어보세요.',
            icon: <HelpCircle size={24} />,
            count: 3210,
            color: '#f59e0b'
        },
        {
            id: 'hot',
            name: '인기 게시판',
            desc: '실시간 가장 화제가 되고 있는 글들입니다.',
            icon: <Zap size={24} />,
            count: 450,
            color: '#f43f5e'
        },
        {
            id: 'membership',
            name: '회원 모집',
            desc: '함께 즐길 파티원이나 멤버를 구해보세요.',
            icon: <Users size={24} />,
            count: 1200,
            color: '#10b981'
        }
    ];

    return (
        <div className="community-list-page">
            <style>{`
                .community-list-page { max-width: 1000px; margin: 0 auto; padding-bottom: 5rem; }
                .hero-header { margin: 3rem 0; padding: 3rem; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 32px; color: white; position: relative; overflow: hidden; }
                .hero-header::after { content: ''; position: absolute; right: -50px; bottom: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%; }
                
                .hero-content h1 { font-size: 2.5rem; font-weight: 950; margin-bottom: 1rem; }
                .hero-content p { font-size: 1.1rem; opacity: 0.8; font-weight: 600; }

                .board-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
                .board-card { background: white; padding: 2.5rem; border-radius: 28px; border: 1px solid var(--border); display: flex; align-items: flex-start; gap: 1.5rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; position: relative; }
                .board-card:hover { transform: translateY(-8px); border-color: var(--primary); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
                
                .icon-box { min-width: 60px; height: 60px; border-radius: 18px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
                
                .board-info { flex: 1; }
                .board-info h3 { font-size: 1.35rem; font-weight: 950; margin-bottom: 0.5rem; color: var(--text); }
                .board-info p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; font-weight: 600; margin-bottom: 1.25rem; }
                
                .board-stats { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 800; color: var(--primary); background: var(--surface-alt); padding: 0.5rem 1rem; border-radius: 50px; width: fit-content; }
                
                .arrow-icon { position: absolute; right: 2.5rem; top: 2.5rem; color: var(--border); transition: all 0.3s; }
                .board-card:hover .arrow-icon { color: var(--primary); transform: translateX(5px); }

                @media (max-width: 768px) {
                    .board-grid { grid-template-columns: 1fr; }
                    .hero-header { padding: 2rem; }
                    .hero-content h1 { font-size: 1.8rem; }
                }
            `}</style>

            <header className="hero-header">
                <div className="hero-content">
                    <h1>커뮤니티 광장</h1>
                    <p>다양한 정보를 공유하고 다른 회원들과 소통해보세요.</p>
                </div>
            </header>

            <div className="board-grid">
                {boards.map(board => (
                    <div key={board.id} className="board-card" onClick={() => navigate(`/community/board/${board.id}`)}>
                        <div className="icon-box" style={{ background: board.color }}>
                            {board.icon}
                        </div>
                        <div className="board-info">
                            <h3>{board.name}</h3>
                            <p>{board.desc}</p>
                            <div className="board-stats">
                                <TrendingUp size={14} /> 총 {board.count.toLocaleString()}개의 게시글
                            </div>
                        </div>
                        <ChevronRight className="arrow-icon" />
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--surface-alt)', borderRadius: '32px', textAlign: 'center' }}>
                <MessageCircle size={48} className="text-muted" style={{ opacity: 0.3, marginBottom: '1.5rem' }} />
                <h3 style={{ fontWeight: 950, marginBottom: '0.5rem' }}>찾으시는 게시판이 없나요?</h3>
                <p style={{ color: 'var(--text-muted)', fontWeight: 700 }}>고객센터를 통해 새로운 게시판 개설을 요청하실 수 있습니다.</p>
                <button className="btn btn-secondary" style={{ marginTop: '1.5rem', padding: '0.85rem 2rem' }}>게시판 개설 요청</button>
            </div>
        </div>
    );
};

export default CommunityList;
