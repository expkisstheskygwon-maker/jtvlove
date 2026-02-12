import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    User,
    Clock,
    Eye,
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Share2,
    Flag,
    Paperclip,
    Send,
    X,
    CornerDownRight
} from 'lucide-react';

const PostDetail: React.FC = () => {
    const { id: _id } = useParams();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [replyTo, setReplyTo] = useState<number | null>(null);

    // Mock Post Data
    const post = {
        id: 1,
        board: '자유게시판',
        title: '오늘 말라테 블루 JTV 가보신 분 계신가요?',
        content: `안녕하세요! 오늘 말라테 블루 JTV 가보신 분들 중에 실시간 분위기 어떤지 궁금해서 글 남깁니다.
        
지금 가려는 중인데 금요일이라 사람 엄청 많을 것 같네요... 
혹시 대기 시간이나 CCA분들 지명 가능한지 아시는 분 계시면 댓글 부탁드립니다!!

날씨도 덥고 마닐라 트래픽 장난 아니네요 ㅠㅠ 다들 불금 보내세요!`,
        author: '필핀초보',
        date: '2026-02-12 18:45',
        views: 124,
        likes: 12,
        dislikes: 1,
        attachments: [
            { name: 'malate_traffic.jpg', size: '1.2MB' }
        ]
    };

    // Mock Comments
    const [comments] = useState([
        { id: 101, author: 'JTV매니아', text: '방금 나왔는데 불금이라 확실히 사람 많아요! 지금 오시면 30분 정도 대기하셔야 할 듯...', date: '10분 전', likes: 2, level: 0 },
        { id: 102, author: '필핀초보', text: '헉 30분이나... 감사합니다! 그래도 가봐야겠네요 ㅎㅎ', date: '5분 전', likes: 1, level: 1, parentId: 101 },
        { id: 103, author: '베테랑', text: '블루는 9시 넘어가면 무조건 지명 미리 하셔야 돼요. 인기 카운터는 이미 지명 솔드아웃일 수도 있어요.', date: '지금', likes: 5, level: 0 }
    ]);

    const handleReport = () => {
        alert('신고가 접수되었습니다. 관리자가 검토 후 처리 예정입니다.');
        setShowReportModal(false);
    };

    return (
        <div className="post-detail-page">
            <style>{`
                .post-detail-page { max-width: 900px; margin: 0 auto; padding-bottom: 5rem; }
                
                .post-header-nav { margin: 2rem 0; display: flex; align-items: center; justify-content: space-between; }
                .back-btn { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-weight: 800; cursor: pointer; transition: color 0.2s; background: none; border: none; }
                .back-btn:hover { color: var(--primary); }

                .post-container { background: white; border: 1px solid var(--border); border-radius: 32px; overflow: hidden; }
                
                .post-main { padding: 3rem; }
                .post-cat-badge { display: inline-block; padding: 0.4rem 0.85rem; background: var(--surface-alt); border-radius: 8px; font-size: 0.8rem; font-weight: 950; color: var(--primary); margin-bottom: 1.5rem; }
                .post-title { font-size: 2.25rem; font-weight: 950; line-height: 1.3; margin-bottom: 1.5rem; }
                
                .post-info-row { display: flex; align-items: center; gap: 1.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border); margin-bottom: 2rem; }
                .info-item { display: flex; align-items: center; gap: 0.4rem; color: var(--text-muted); font-size: 0.9rem; font-weight: 700; }
                
                .post-content { font-size: 1.15rem; line-height: 1.8; font-weight: 600; white-space: pre-wrap; min-height: 200px; }
                
                .attachments { margin-top: 3rem; padding: 1.5rem; background: var(--surface-alt); border-radius: 20px; }
                .attach-item { display: flex; align-items: center; gap: 0.75rem; color: var(--primary); font-weight: 800; font-size: 0.9rem; text-decoration: none; }

                .post-actions { display: flex; justify-content: center; gap: 1rem; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border); }
                .action-pill { display: flex; align-items: center; gap: 0.6rem; padding: 0.8rem 1.75rem; border-radius: 50px; border: 1.5px solid var(--border); background: white; font-weight: 900; cursor: pointer; transition: all 0.2s; }
                .action-pill:hover { border-color: var(--primary); color: var(--primary); background: var(--surface-alt); }
                .action-pill.active { border-color: var(--primary); background: var(--primary); color: white; }

                /* Comments Section */
                .comments-section { margin-top: 3rem; }
                .comments-title { font-size: 1.5rem; font-weight: 950; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem; }
                
                .comment-input-box { display: flex; gap: 1rem; background: white; padding: 1.5rem; border: 1px solid var(--border); border-radius: 24px; margin-bottom: 3rem; }
                .comment-textarea { flex: 1; border: none; background: transparent; font-weight: 600; font-size: 1rem; resize: none; min-height: 24px; }
                .comment-textarea:focus { outline: none; }
                
                .comment-item { padding: 2rem; border-bottom: 1px solid var(--border); position: relative; }
                .comment-item.reply { margin-left: 3.5rem; background: var(--surface-alt); border-radius: 24px; margin-bottom: 1rem; border-bottom: none; }
                .reply-indicator { position: absolute; left: -2.5rem; top: 2.5rem; color: var(--border); }

                .comment-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
                .comment-author { font-weight: 900; font-size: 1.05rem; }
                .comment-date { font-size: 0.85rem; color: var(--text-muted); font-weight: 700; }
                .comment-text { font-size: 1rem; line-height: 1.6; font-weight: 600; margin-bottom: 1rem; }
                
                .comment-footer { display: flex; gap: 1.5rem; }
                .comment-action { font-size: 0.85rem; font-weight: 850; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; gap: 0.3rem; }
                .comment-action:hover { color: var(--primary); }

                /* Report Modal */
                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
                .modal-box { background: white; border-radius: 32px; width: 100%; max-width: 500px; padding: 2.5rem; position: relative; }
                .modal-title { font-size: 1.5rem; font-weight: 950; margin-bottom: 1.5rem; color: #ef4444; display: flex; align-items: center; gap: 0.75rem; }
                
                @media (max-width: 768px) {
                    .post-main { padding: 1.5rem; }
                    .post-title { font-size: 1.5rem; }
                    .post-actions { flex-wrap: wrap; }
                    .action-pill { flex: 1; min-width: 120px; padding: 0.7rem 1rem; font-size: 0.85rem; }
                    .comment-item.reply { margin-left: 1.5rem; }
                }
            `}</style>

            <div className="post-header-nav">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> 뒤로가기
                </button>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><Share2 size={18} /></button>
                    <button className="btn btn-secondary" style={{ padding: '0.5rem', color: '#ef4444' }} onClick={() => setShowReportModal(true)}><Flag size={18} /></button>
                </div>
            </div>

            <article className="post-container">
                <div className="post-main">
                    <span className="post-cat-badge">{post.board}</span>
                    <h1 className="post-title">{post.title}</h1>

                    <div className="post-info-row">
                        <div className="info-item"><User size={16} /> {post.author}</div>
                        <div className="info-item"><Clock size={16} /> {post.date}</div>
                        <div className="info-item"><Eye size={16} /> {post.views}</div>
                    </div>

                    <div className="post-content">
                        {post.content}
                    </div>

                    {post.attachments.length > 0 && (
                        <div className="attachments">
                            <h4 style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>첨부파일</h4>
                            {post.attachments.map((file, idx) => (
                                <a key={idx} href="#" className="attach-item">
                                    <Paperclip size={16} />
                                    {file.name} <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>({file.size})</span>
                                </a>
                            ))}
                        </div>
                    )}

                    <div className="post-actions" id="interactions">
                        <button className={`action-pill ${liked ? 'active' : ''}`} onClick={() => { setLiked(!liked); setDisliked(false); }}>
                            <ThumbsUp size={20} /> 추천 {post.likes + (liked ? 1 : 0)}
                        </button>
                        <button className={`action-pill ${disliked ? 'active' : ''}`} onClick={() => { setDisliked(!disliked); setLiked(false); }}>
                            <ThumbsDown size={20} /> 비추천 {post.dislikes + (disliked ? 1 : 0)}
                        </button>
                    </div>
                </div>
            </article>

            <section className="comments-section">
                <h3 className="comments-title">
                    <MessageCircle size={24} /> 댓글 {comments.length}
                </h3>

                <div className="comment-input-box">
                    <textarea
                        className="comment-textarea"
                        placeholder={replyTo ? "댓글의 답글을 작성하세요..." : "선플은 작성자에게 큰 힘이 됩니다."}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '0 1.5rem', borderRadius: '16px' }}
                        disabled={!commentText.trim()}
                    >
                        <Send size={18} />
                    </button>
                </div>

                <div className="comment-list">
                    {comments.map(comment => (
                        <div key={comment.id} className={`comment-item ${comment.level > 0 ? 'reply' : ''}`}>
                            {comment.level > 0 && <CornerDownRight className="reply-indicator" size={24} />}
                            <div className="comment-header">
                                <span className="comment-author">{comment.author}</span>
                                <span className="comment-date">{comment.date}</span>
                            </div>
                            <p className="comment-text">{comment.text}</p>
                            <div className="comment-footer">
                                <div className="comment-action" onClick={() => setReplyTo(comment.id)}>답글 쓰기</div>
                                <div className="comment-action"><ThumbsUp size={14} /> {comment.likes}</div>
                                <div className="comment-action"><Flag size={14} /> 신고</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Report Modal */}
            {showReportModal && (
                <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', cursor: 'pointer' }} onClick={() => setShowReportModal(false)}><X size={24} /></div>
                        <h2 className="modal-title"><Flag size={24} /> 게시글 신고하기</h2>
                        <p style={{ fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>신고 사유를 선택해주세요. 무분별한 신고는 제재 대상이 될 수 있습니다.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                            {['영리목적/홍보성', '게시판 성격 부적절', '욕설/비하 발언', '도배성 게시글', '개인정보 노출', '기타'].map(reason => (
                                <label key={reason} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'var(--surface-alt)', borderRadius: '12px', cursor: 'pointer', fontWeight: 800 }}>
                                    <input type="radio" name="report_reason" /> {reason}
                                </label>
                            ))}
                        </div>

                        <textarea
                            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-alt)', minHeight: '100px', marginBottom: '2rem', fontWeight: 600 }}
                            placeholder="상세 사유를 입력해주세요 (선택사항)"
                        ></textarea>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowReportModal(false)}>취소</button>
                            <button className="btn btn-primary" style={{ flex: 1, backgroundColor: '#ef4444' }} onClick={handleReport}>신고하기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
