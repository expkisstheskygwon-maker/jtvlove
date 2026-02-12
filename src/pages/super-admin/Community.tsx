import React, { useState } from 'react';
import {
    MessageSquare,
    Layout,
    AlertOctagon,
    BarChart3,
    Plus,
    Search,
    Filter,
    Eye,
    Trash2,
    EyeOff,
    Move,
    Megaphone,
    CheckCircle2,
    XCircle,
    TrendingUp
} from 'lucide-react';

// Types
interface Board {
    id: string;
    name: string;
    description: string;
    totalPosts: number;
    totalComments: number;
    todayPosts: number;
    isActive: boolean;
}

interface Post {
    id: string;
    boardName: string;
    title: string;
    author: string;
    createdAt: string;
    views: number;
    comments: number;
    likes: number;
    isReported: boolean;
    isHidden: boolean;
    isNotice: boolean;
}

interface Report {
    id: string;
    type: 'post' | 'comment';
    targetTitle: string;
    author: string;
    reporter: string;
    reason: string;
    createdAt: string;
    status: 'pending' | 'resolved' | 'rejected';
}

const CommunityManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'boards' | 'posts' | 'comments' | 'reports' | 'stats'>('boards');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBoard, setSelectedBoard] = useState('all');

    // Mock Data
    const boards: Board[] = [
        { id: 'b1', name: '자유게시판', description: '자유로운 소통 공간', totalPosts: 1240, totalComments: 8500, todayPosts: 42, isActive: true },
        { id: 'b2', name: '업체후기', description: '솔직한 업체 방문 후기', totalPosts: 850, totalComments: 4200, todayPosts: 15, isActive: true },
        { id: 'b3', name: 'CCA소식', description: 'CCA들의 새로운 소식', totalPosts: 320, totalComments: 1540, todayPosts: 8, isActive: true },
        { id: 'b4', name: '이벤트', description: '진행 중인 이벤트 안내', totalPosts: 120, totalComments: 800, todayPosts: 2, isActive: true },
    ];

    const posts: Post[] = [
        { id: 'p1', boardName: '업체후기', title: '마닐라 바 다녀왔습니다!', author: '김유저', createdAt: '2026-02-12 15:30', views: 420, comments: 12, likes: 45, isReported: false, isHidden: false, isNotice: false },
        { id: 'p2', boardName: '자유게시판', title: '[공지] 서비스 점검 안내', author: '관리자', createdAt: '2026-02-12 10:00', views: 1250, comments: 0, likes: 0, isReported: false, isHidden: false, isNotice: true },
        { id: 'p3', boardName: '자유게시판', title: '질문이 있습니다.', author: '이유저', createdAt: '2026-02-11 22:15', views: 85, comments: 3, likes: 2, isReported: true, isHidden: false, isNotice: false },
    ];

    const reports: Report[] = [
        { id: 'r1', type: 'post', targetTitle: '질문이 있습니다.', author: '이유저', reporter: '박신고', reason: '부적절한 내용', createdAt: '2026-02-12 11:20', status: 'pending' },
        { id: 'r2', type: 'comment', targetTitle: '댓글: 여기 진짜 별로네요', author: '최유저', reporter: '신고왕', reason: '욕설 및 비방', createdAt: '2026-02-12 09:45', status: 'resolved' },
    ];

    return (
        <div className="community-view">
            <style>{`
        .community-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .view-header { display: flex; justify-content: space-between; align-items: flex-end; }
        
        .tab-container { display: flex; gap: 2rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; }
        .tab { padding: 0.75rem 0.5rem; cursor: pointer; color: var(--text-muted); font-weight: 500; font-size: 0.9375rem; position: relative; transition: all 0.2s; }
        .tab.active { color: var(--primary); font-weight: 700; }
        .tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: var(--primary); }
        
        .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .input-box { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0.625rem 1rem; color: var(--text); outline: none; display: flex; align-items: center; gap: 0.5rem; }
        .input-box input, .input-box select { background: transparent; border: none; color: inherit; outline: none; width: 100%; }

        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .board-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; position: relative; transition: 0.2s; }
        .board-card:hover { border-color: var(--primary); transform: translateY(-4px); }
        .board-card .drag-handle { position: absolute; top: 1rem; right: 1rem; color: var(--text-muted); cursor: grab; }

        .table-container { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        th { background: rgba(255, 255, 255, 0.02); padding: 1rem; text-align: left; color: var(--text-muted); font-weight: 600; border-bottom: 1px solid var(--border); }
        td { padding: 1rem; border-bottom: 1px solid var(--border); }

        .badge-status { padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
        .badge-pending { background: rgba(245, 158, 11, 0.1); color: #fbbf24; }
        .badge-resolved { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .badge-rejected { background: rgba(100, 116, 139, 0.1); color: #94a3b8; }

        .action-btn { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-muted); transition: 0.2s; }
        .action-btn:hover { background: var(--surface-alt); color: var(--text); }
        .action-btn.delete:hover { color: var(--error); }

        .stat-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .stat-value { font-weight: 700; color: var(--text); }
      `}</style>

            <div className="view-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>커뮤니티 관리</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>게시판 설정, 게시글 및 댓글 필터링, 신고 내역을 통합 관리합니다.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary"><Plus size={18} /> 새 게시판 추가</button>
                    <button className="btn btn-primary"><Megaphone size={18} /> 전체 공지 작성</button>
                </div>
            </div>

            <div className="tab-container">
                <div className={`tab ${activeTab === 'boards' ? 'active' : ''}`} onClick={() => setActiveTab('boards')}>게시판 관리</div>
                <div className={`tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>게시글 관리</div>
                <div className={`tab ${activeTab === 'comments' ? 'active' : ''}`} onClick={() => setActiveTab('comments')}>댓글 관리</div>
                <div className={`tab ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
                    신고 관리 <span className="badge badge-error" style={{ marginLeft: '4px' }}>2</span>
                </div>
                <div className={`tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>커뮤니티 통계</div>
            </div>

            <div className="toolbar">
                <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
                    <div className="input-box" style={{ width: '320px' }}>
                        <Search size={18} className="text-muted" />
                        <input type="text" placeholder="검색어를 입력하세요..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    {activeTab !== 'boards' && activeTab !== 'stats' && (
                        <div className="input-box">
                            <Filter size={18} className="text-muted" />
                            <select value={selectedBoard} onChange={(e) => setSelectedBoard(e.target.value)}>
                                <option value="all">모든 게시판</option>
                                {boards.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {activeTab === 'boards' && (
                <div className="card-grid">
                    {boards.map(board => (
                        <div key={board.id} className="board-card">
                            <div className="drag-handle"><Move size={18} /></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Layout size={20} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{board.name}</h3>
                                    <span style={{ fontSize: '0.75rem', color: board.isActive ? 'var(--primary)' : 'var(--text-muted)' }}>
                                        {board.isActive ? '• 활성 상태' : '• 비활성'}
                                    </span>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>{board.description}</p>
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                <div className="stat-item"><span className="text-muted">전체 게시글</span><span className="stat-value">{board.totalPosts.toLocaleString()}</span></div>
                                <div className="stat-item"><span className="text-muted">전체 댓글</span><span className="stat-value">{board.totalComments.toLocaleString()}</span></div>
                                <div className="stat-item"><span className="text-muted">오늘 등록</span><span className="stat-value text-primary">+{board.todayPosts}</span></div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1, height: '36px', fontSize: '0.8rem' }}>상세 설정</button>
                                <button className="btn btn-secondary" style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'posts' && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>게시판</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회/댓글/추천</th>
                                <th>상태</th>
                                <th style={{ width: '120px' }}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.boardName}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {post.isNotice && <span className="badge badge-primary" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>공지</span>}
                                            {post.isReported && <AlertOctagon size={14} className="text-error" />}
                                            <span style={{ fontWeight: 600 }}>{post.title}</span>
                                        </div>
                                    </td>
                                    <td>{post.author}</td>
                                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.createdAt}</td>
                                    <td>{post.views} / {post.comments} / {post.likes}</td>
                                    <td>
                                        {post.isHidden ? <span className="text-muted">숨김</span> : <span className="text-primary">노출</span>}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            <div className="action-btn" title="보기"><Eye size={16} /></div>
                                            <div className="action-btn" title="숨김"><EyeOff size={16} /></div>
                                            <div className="action-btn" title="이동"><Move size={16} /></div>
                                            <div className="action-btn delete" title="삭제"><Trash2 size={16} /></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'reports' && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>대상 제목/내용</th>
                                <th>작성자</th>
                                <th>신고자</th>
                                <th>사유</th>
                                <th>상태</th>
                                <th style={{ width: '100px' }}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(report => (
                                <tr key={report.id}>
                                    <td><span className={`badge ${report.type === 'post' ? 'badge-info' : 'badge-secondary'}`} style={{ fontSize: '0.7rem' }}>{report.type === 'post' ? '글' : '댓글'}</span></td>
                                    <td style={{ fontWeight: 600 }}>{report.targetTitle}</td>
                                    <td>{report.author}</td>
                                    <td>{report.reporter}</td>
                                    <td style={{ color: 'var(--error)', fontSize: '0.85rem' }}>{report.reason}</td>
                                    <td>
                                        <span className={`badge-status badge-${report.status}`}>
                                            {report.status === 'pending' ? '대기' : report.status === 'resolved' ? '처리완료' : '기각'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            <div className="action-btn" title="상세"><Eye size={16} /></div>
                                            <div className="action-btn" title="처리"><CheckCircle2 size={16} className="text-primary" /></div>
                                            <div className="action-btn delete" title="기각"><XCircle size={16} /></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'stats' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
                        <div className="board-card">
                            <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingUp size={18} className="text-primary" /> 주간 활동량 추이</h3>
                            <div style={{ height: '240px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem' }}>
                                {[30, 45, 60, 42, 85, 120, 150].map((h, i) => (
                                    <div key={i} style={{ flex: 1, background: 'var(--primary)', height: `${h}px`, borderRadius: '4px 4px 0 0', opacity: 0.5 + (i * 0.1) }} title={`Day ${i + 1}: ${h} posts`} />
                                ))}
                            </div>
                        </div>
                        <div className="board-card">
                            <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>🔥 인기 게시글 TOP 5</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                        <span style={{ fontWeight: 800, color: i <= 3 ? 'var(--primary)' : 'var(--text-muted)' }}>{i}</span>
                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>마닐라 여행 꿀팁 모음집</div>
                                            <div style={{ fontSize: '0.70rem', color: 'var(--text-muted)' }}>조회수 1,240 • 추천 85</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <div className="board-card" style={{ padding: '1.25rem' }}>
                            <div className="stat-item" style={{ marginBottom: '0.25rem' }}><span className="text-muted">전체 게시물 수</span><BarChart3 size={20} className="text-primary" /></div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>4,821 <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 400 }}>+5.2%</span></div>
                        </div>
                        <div className="board-card" style={{ padding: '1.25rem' }}>
                            <div className="stat-item" style={{ marginBottom: '0.25rem' }}><span className="text-muted">전체 댓글 수</span><MessageSquare size={20} className="text-secondary" /></div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>24,912 <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 400 }}>+12.4%</span></div>
                        </div>
                        <div className="board-card" style={{ padding: '1.25rem' }}>
                            <div className="stat-item" style={{ marginBottom: '0.25rem' }}><span className="text-muted">누적 신고 건수</span><AlertOctagon size={20} className="text-error" /></div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>142 <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 400 }}>-2.1%</span></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunityManagement;
