import { useState } from 'react';
import { useComments } from '../hooks/useComments';
import { useAuth } from '../context/AuthContext';

interface Comment {
  id: number;
  user_name: string;
  content: string;
  created_at: string;
  replies: Comment[];
}

interface CommentsSectionProps {
  adId: string;
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

export const CommentsSection = ({ adId, isLoggedIn, onLoginRequired }: CommentsSectionProps) => {
  const { comments, total, loading, createComment, fetchComments } = useComments(adId);
  const { user } = useAuth();
  const [showAll, setShowAll] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await createComment(newComment);
      setNewComment('');
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: number) => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }

    if (!replyContent.trim()) return;

    setSubmitting(true);
    try {
      await createComment(replyContent, parentId);
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShowMore = async () => {
    setShowAll(true);
    await fetchComments(); // Carregar todos os comentários
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `${diffMins}min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12 mt-3' : 'border-b pb-4'}`}>
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-[#61452a] text-white flex items-center justify-center font-medium flex-shrink-0">
          {comment.user_name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900">{comment.user_name || 'Usuário'}</span>
            <span className="text-sm text-gray-500">{formatDate(comment.created_at)}</span>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>
          {!isReply && (
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-sm text-[#61452a] hover:underline"
            >
              {replyingTo === comment.id ? 'Cancelar' : 'Responder'}
            </button>
          )}

          {/* Formulário de resposta */}
          {replyingTo === comment.id && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReply(comment.id);
              }}
              className="mt-3 flex gap-2"
            >
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Escreva sua resposta..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61452a]"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={submitting || !replyContent.trim()}
                className="px-4 py-2 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          )}

          {/* Respostas aninhadas */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading && comments.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Comentários</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#61452a] mx-auto"></div>
          <p className="mt-2 text-gray-500">Carregando comentários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Comentários {total > 0 && <span className="text-gray-500 font-normal">({total})</span>}
      </h3>

      {/* Formulário de novo comentário */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-[#61452a] text-white flex items-center justify-center font-medium flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isLoggedIn ? "Adicione um comentário..." : "Faça login para comentar"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61452a] resize-none"
              rows={3}
              disabled={!isLoggedIn || submitting}
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!isLoggedIn || submitting || !newComment.trim()}
                className="px-6 py-2 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Enviando...' : 'Comentar'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Lista de comentários */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p>Ainda não há comentários neste anúncio.</p>
          <p className="text-sm mt-1">Seja o primeiro a comentar!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}

          {/* Botão "Ver mais" */}
          {!showAll && total > 3 && (
            <button
              onClick={handleShowMore}
              className="w-full py-3 text-[#61452a] font-medium hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
            >
              Ver todos os {total} comentários
            </button>
          )}
        </div>
      )}
    </div>
  );
};
