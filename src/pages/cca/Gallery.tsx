import React, { useState } from 'react';
import {
    Plus,
    Heart,
    MessageCircle,
    Share2,
    X,
    Image as ImageIcon,
    Video,
    Music,
    Trash2,
    Edit3,
    Upload,
    Tag
} from 'lucide-react';

interface Comment {
    id: string;
    author: string;
    content: string;
    date: string;
    isCCA?: boolean;
    replies?: Comment[];
}

interface MediaItem {
    id: string;
    type: 'image' | 'video' | 'sound';
    url: string;
    thumbnail: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
    views: number;
    hashtags: string[];
    date: string;
}

const CCAGallery: React.FC = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([
        {
            id: '1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
            thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
            description: '오늘 날씨가 너무 좋네요! ☀️ 다들 즐거운 하루 보내세요.',
            likes: 124,
            comments: 12,
            shares: 5,
            views: 450,
            hashtags: ['일상', '날씨좋다', '미나'],
            date: '2024-02-12'
        },
        {
            id: '2',
            type: 'video',
            url: '#',
            thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
            description: '새로운 댄스 연습 중! 💃 기대해 주세요.',
            likes: 215,
            comments: 45,
            shares: 20,
            views: 1200,
            hashtags: ['댄스', '연습', 'KPOP'],
            date: '2024-02-11'
        },
        {
            id: '3',
            type: 'sound',
            url: '#',
            thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
            description: '오늘의 노래 연습 한 소절 🎤',
            likes: 89,
            comments: 8,
            shares: 2,
            views: 310,
            hashtags: ['노래', '보컬', '연습생'],
            date: '2024-02-10'
        },
        {
            id: '4',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            description: '즐거운 퇴근길!',
            likes: 95,
            comments: 5,
            shares: 1,
            views: 280,
            hashtags: ['퇴근', '행복'],
            date: '2024-02-09'
        }
    ]);

    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newMedia, setNewMedia] = useState({ description: '', hashtags: '' });
    const [comments] = useState<Comment[]>([
        { id: '1', author: '유저1', content: '너무 예쁘세요!', date: '12:30' },
        { id: '2', author: '미나', content: '감사합니다! ㅎㅎ', date: '12:35', isCCA: true },
        { id: '3', author: '유저2', content: '오늘 어디 가시나요?', date: '13:00' }
    ]);

    const handleUpload = () => {
        // Mock upload logic
        setShowUploadModal(false);
        alert('미디어가 성공적으로 업로드되었습니다!');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('정말 이 미디어를 삭제하시겠습니까?')) {
            setMediaItems(mediaItems.filter(item => item.id !== id));
            setSelectedItem(null);
        }
    };

    return (
        <div className="cca-gallery-view">
            <style>{`
                .cca-gallery-view { padding-bottom: 5rem; }
                .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem; }
                .gallery-item { position: relative; aspect-ratio: 1; border-radius: 12px; overflow: hidden; cursor: pointer; border: 1px solid var(--border); }
                .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
                .gallery-item:hover img { transform: scale(1.1); }
                
                .item-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; gap: 1.5rem; color: white; }
                .gallery-item:hover .item-overlay { opacity: 1; }
                
                .media-type-icon { position: absolute; top: 10px; right: 10px; color: white; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }

                .stat-tag { display: flex; align-items: center; gap: 0.4rem; font-weight: 700; font-size: 0.9rem; }
                
                /* Detail Modal Styles */
                .media-detail-container { display: grid; grid-template-columns: 1fr 400px; height: 80vh; max-width: 1200px; width: 95vw; background: var(--surface); border-radius: 24px; overflow: hidden; }
                .media-player-side { background: #000; display: flex; align-items: center; justify-content: center; position: relative; }
                .media-player-side img, .media-player-side video { max-width: 100%; max-height: 100%; }
                
                .interaction-side { display: flex; flex-direction: column; background: var(--surface); border-left: 1px solid var(--border); }
                .interaction-header { padding: 1rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
                .interaction-body { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1.5rem; }
                .comment-list { display: flex; flex-direction: column; gap: 1rem; }
                .comment-item { display: flex; gap: 0.75rem; font-size: 0.9rem; }
                .comment-item.cca-reply { margin-left: 1.5rem; color: var(--primary); }
                
                .interaction-footer { padding: 1rem; border-top: 1px solid var(--border); }
                .action-btns { display: flex; gap: 1rem; margin-bottom: 0.75rem; }
                .stats-line { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; margin-bottom: 0.5rem; }

                .upload-btn { position: fixed; bottom: 2rem; right: 2rem; width: 60px; height: 60px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); cursor: pointer; z-index: 100; transition: transform 0.2s; }
                .upload-btn:hover { transform: scale(1.1); }

                @media (max-width: 900px) {
                    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
                    .media-detail-container { grid-template-columns: 1fr; height: 90vh; }
                    .interaction-side { height: 400px; }
                }
            `}</style>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 900 }}>미디어 갤러리 관리</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>나의 일상을 공유하고 팬들과 소통하세요.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div className="badge badge-primary">총 {mediaItems.length}개 게시물</div>
                </div>
            </div>

            <div className="gallery-grid">
                {mediaItems.map(item => (
                    <div key={item.id} className="gallery-item" onClick={() => setSelectedItem(item)}>
                        <img src={item.thumbnail} alt="" />
                        <div className="item-overlay">
                            <div className="stat-tag"><Heart size={20} fill="white" /> {item.likes}</div>
                            <div className="stat-tag"><MessageCircle size={20} fill="white" /> {item.comments}</div>
                        </div>
                        <div className="media-type-icon">
                            {item.type === 'video' && <Video size={18} />}
                            {item.type === 'sound' && <Music size={18} />}
                            {item.type === 'image' && <ImageIcon size={18} />}
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Floating Button */}
            <div className="upload-btn" onClick={() => setShowUploadModal(true)}>
                <Plus size={32} />
            </div>

            {/* Detail Modal */}
            {selectedItem && (
                <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="media-detail-container" onClick={e => e.stopPropagation()}>
                        <div className="media-player-side">
                            {selectedItem.type === 'image' && <img src={selectedItem.url} alt="" />}
                            {selectedItem.type === 'video' && <div className="text-white">Video Player Placeholder</div>}
                            {selectedItem.type === 'sound' && <div className="text-white text-center"><Music size={64} /><p className="mt-4">Audio Player Placeholder</p></div>}

                            <button className="btn btn-secondary icon-btn" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white' }} onClick={() => setSelectedItem(null)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="interaction-side">
                            <div className="interaction-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', padding: '2px' }}>
                                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>미나</div>
                                    </div>
                                    <span style={{ fontWeight: 800 }}>미나 (본인)</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn btn-secondary icon-btn" onClick={() => { setShowEditModal(true); setNewMedia({ description: selectedItem.description, hashtags: selectedItem.hashtags.join(' ') }); }}>
                                        <Edit3 size={18} />
                                    </button>
                                    <button className="btn btn-secondary icon-btn text-danger" onClick={() => handleDelete(selectedItem.id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="interaction-body">
                                <div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.5rem' }}>{selectedItem.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                        {selectedItem.hashtags.map(tag => (
                                            <span key={tag} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>#{tag}</span>
                                        ))}
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{selectedItem.date}</p>
                                </div>

                                <div className="comment-list">
                                    {comments.map(comment => (
                                        <div key={comment.id} className={`comment-item ${comment.isCCA ? 'cca-reply' : ''}`}>
                                            <div style={{ fontWeight: 700, minWidth: '40px' }}>{comment.author}</div>
                                            <div style={{ flex: 1 }}>
                                                {comment.content}
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{comment.date}</div>
                                            </div>
                                            {comment.isCCA && <button className="text-danger" style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.7rem' }}>삭제</button>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="interaction-footer">
                                <div className="action-btns">
                                    <Heart size={24} className="cursor-pointer" />
                                    <MessageCircle size={24} className="cursor-pointer" />
                                    <Share2 size={24} className="cursor-pointer" onClick={() => alert('링크가 복사되었습니다!')} />
                                </div>
                                <div className="stats-line">좋아요 {selectedItem.likes}개 · 조회 {selectedItem.views}회 · 공유 {selectedItem.shares}회</div>
                                <div className="input-box" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.75rem' }}>
                                    <input type="text" placeholder="댓글 달기..." style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, padding: '0.75rem 0' }} />
                                    <button style={{ border: 'none', background: 'none', color: 'var(--primary)', fontWeight: 800 }}>게시</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
                    <div className="modal-container" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ fontWeight: 900 }}>새 게시물 만들기</h3>
                            <button className="btn btn-secondary icon-btn" onClick={() => setShowUploadModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ border: '2px dashed var(--border)', borderRadius: '16px', padding: '3rem', textAlign: 'center', cursor: 'pointer' }}>
                                <Upload size={48} className="text-muted" style={{ margin: '0 auto 1rem' }} />
                                <p style={{ fontWeight: 700 }}>파일을 드래그하거나 클릭하여 업로드</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>사진, 영상, 사운드 지원</p>
                            </div>

                            <div className="field-group">
                                <label>설명 (최대 200자)</label>
                                <textarea
                                    className="input-box"
                                    placeholder="하고 싶은 말을 입력하세요..."
                                    style={{ minHeight: '100px' }}
                                    maxLength={200}
                                    value={newMedia.description}
                                    onChange={e => setNewMedia({ ...newMedia, description: e.target.value })}
                                />
                            </div>

                            <div className="field-group">
                                <label>해시태그</label>
                                <div className="input-box" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.75rem' }}>
                                    <Tag size={18} className="text-muted" />
                                    <input
                                        type="text"
                                        placeholder="공백으로 구분하여 입력 (예: 일상 미나)"
                                        style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, padding: '0.75rem 0' }}
                                        value={newMedia.hashtags}
                                        onChange={e => setNewMedia({ ...newMedia, hashtags: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button className="btn btn-primary" style={{ padding: '1rem' }} onClick={handleUpload}>게시하기</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedItem && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-container" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ fontWeight: 900 }}>게시물 수정</h3>
                            <button className="btn btn-secondary icon-btn" onClick={() => setShowEditModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div className="field-group">
                                <label>설명 수정</label>
                                <textarea
                                    className="input-box"
                                    style={{ minHeight: '100px' }}
                                    value={newMedia.description}
                                    onChange={e => setNewMedia({ ...newMedia, description: e.target.value })}
                                />
                            </div>
                            <div className="field-group">
                                <label>해시태그 수정</label>
                                <input
                                    type="text"
                                    className="input-box"
                                    value={newMedia.hashtags}
                                    onChange={e => setNewMedia({ ...newMedia, hashtags: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>취소</button>
                                <button className="btn btn-primary" onClick={() => {
                                    setMediaItems(mediaItems.map(item => item.id === selectedItem.id ? { ...item, description: newMedia.description, hashtags: newMedia.hashtags.split(' ') } : item));
                                    setShowEditModal(false);
                                    setSelectedItem({ ...selectedItem, description: newMedia.description, hashtags: newMedia.hashtags.split(' ') });
                                }}>저장하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CCAGallery;
