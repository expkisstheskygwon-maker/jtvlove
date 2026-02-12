import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ChevronLeft,
    Image as ImageIcon,
    FileText,
    Paperclip,
    X,
    Info,
    Lock,
    Eye
} from 'lucide-react';

const PostCreate: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialBoardId = location.state?.boardId || 'free';

    const [board, setBoard] = useState(initialBoardId);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments([...attachments, ...Array.from(e.target.files)]);
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('게시글이 성공적으로 등록되었습니다!');
        navigate(`/community/board/${board}`);
    };

    return (
        <div className="post-create-page">
            <style>{`
                .post-create-page { max-width: 800px; margin: 0 auto; padding-bottom: 5rem; }
                
                .header-row { margin: 2rem 0; display: flex; align-items: center; justify-content: space-between; }
                .back-btn { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-weight: 800; cursor: pointer; background: none; border: none; }
                
                .editor-container { background: white; border: 1px solid var(--border); border-radius: 32px; padding: 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
                
                .form-section { margin-bottom: 2rem; }
                .form-label { display: block; font-weight: 950; margin-bottom: 0.75rem; font-size: 1rem; color: var(--text); }
                
                .select-box { width: 100%; padding: 1rem; border-radius: 16px; border: 1.5px solid var(--border); background: var(--surface-alt); font-weight: 800; font-size: 1rem; appearance: none; cursor: pointer; transition: border-color 0.2s; }
                .select-box:focus { border-color: var(--primary); outline: none; }

                .title-input { width: 100%; padding: 1.25rem; font-size: 1.5rem; font-weight: 900; border: none; border-bottom: 2px solid var(--border); color: var(--text); transition: border-color 0.2s; }
                .title-input:focus { border-color: var(--primary); outline: none; }
                .title-input::placeholder { color: var(--border); }

                .content-area { width: 100%; min-height: 400px; padding: 1.5rem 0; font-size: 1.15rem; font-weight: 600; border: none; line-height: 1.8; resize: none; color: var(--text); }
                .content-area:focus { outline: none; }
                .content-area::placeholder { color: var(--border); }

                .toolbar { display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin: 2rem 0; }
                .tool-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.25rem; border-radius: 12px; background: var(--surface-alt); color: var(--text-muted); font-weight: 850; font-size: 0.9rem; cursor: pointer; border: none; transition: all 0.2s; }
                .tool-btn:hover { background: #eee; color: var(--text); }
                
                .attachment-pill { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--surface-alt); padding: 0.5rem 1rem; border-radius: 8px; font-weight: 800; font-size: 0.85rem; margin-right: 0.5rem; margin-bottom: 0.5rem; }
                .remove-file { cursor: pointer; color: #ef4444; }

                .anonymous-check { display: flex; align-items: center; gap: 0.75rem; background: var(--surface-alt); padding: 1rem 1.5rem; border-radius: 16px; cursor: pointer; transition: background 0.2s; }
                .anonymous-check:hover { background: #eee; }
                .anonymous-check input { width: 20px; height: 20px; cursor: pointer; accent-color: var(--primary); }
                .anonymous-check span { font-weight: 850; font-size: 0.95rem; }

                .submit-btn { width: 100%; padding: 1.25rem; border-radius: 16px; background: var(--primary); color: white; font-size: 1.15rem; font-weight: 950; border: none; cursor: pointer; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3); transition: transform 0.2s; margin-top: 2rem; }
                .submit-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
                .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

                @media (max-width: 768px) {
                    .editor-container { padding: 1.5rem; border-radius: 20px; }
                    .title-input { font-size: 1.25rem; }
                    .content-area { font-size: 1rem; }
                    .toolbar { overflow-x: auto; padding: 1rem 0; }
                }
            `}</style>

            <div className="header-row">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> 취소하고 돌아가기
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 800, fontSize: '0.9rem' }}>
                    <Info size={16} /> 게시판 운영 원칙을 준수해주세요.
                </div>
            </div>

            <form onSubmit={handleSubmit} className="editor-container">
                <div className="form-section">
                    <label className="form-label">게시판 선택</label>
                    <select className="select-box" value={board} onChange={(e) => setBoard(e.target.value)}>
                        <option value="free">자유게시판</option>
                        <option value="review">업체/CCA 후기</option>
                        <option value="qa">문의/질문</option>
                        <option value="membership">회원 모집</option>
                    </select>
                </div>

                <input
                    type="text"
                    className="title-input"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    required
                />

                <div className="toolbar">
                    <label className="tool-btn">
                        <ImageIcon size={18} /> 이미지 추가
                        <input type="file" hidden accept="image/*" multiple onChange={handleFileChange} />
                    </label>
                    <label className="tool-btn">
                        <Paperclip size={18} /> 파일 첨부
                        <input type="file" hidden multiple onChange={handleFileChange} />
                    </label>
                    <div style={{ flex: 1 }}></div>
                    <div className="tool-btn" style={{ background: 'none' }}><Eye size={18} /> 미리보기</div>
                </div>

                {attachments.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        {attachments.map((file, idx) => (
                            <div key={idx} className="attachment-pill">
                                <FileText size={14} />
                                <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                                <X size={14} className="remove-file" onClick={() => removeAttachment(idx)} />
                            </div>
                        ))}
                    </div>
                )}

                <textarea
                    className="content-area"
                    placeholder="내용을 입력하세요. 저속한 표현이나 타인을 비방하는 내용은 제재를 받을 수 있습니다."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
                    <label className="anonymous-check">
                        <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                        <Lock size={18} />
                        <span>익명으로 작성하기</span>
                    </label>
                </div>

                <button type="submit" className="submit-btn" disabled={!title || !content}>
                    게시글 등록하기
                </button>
            </form>
        </div>
    );
};

export default PostCreate;
