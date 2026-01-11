import { useState, useEffect } from 'react';
import { HttpClient } from '../../infrastructure/api/HttpClient';

const httpClient = new HttpClient();

interface Comment {
  id: number;
  ad_id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  content: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string | null;
  replies: Comment[];
}

interface CommentsResponse {
  comments: Comment[];
  total: number;
  showing: number;
}

export const useComments = (adId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async (limit?: number) => {
    setLoading(true);
    setError(null);
    try {
      const url = limit 
        ? `/comments/ad/${adId}?limit=${limit}`
        : `/comments/ad/${adId}`;
      
      const response = await httpClient.get<CommentsResponse>(url);
      setComments(response.comments);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar comentários');
      console.error('Erro ao buscar comentários:', err);
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (content: string, parentId?: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Você precisa estar logado para comentar');
      }

      const response = await httpClient.post<Comment>('/comments', {
        ad_id: parseInt(adId),
        content,
        parent_id: parentId || null
      });

      // Recarregar comentários após criar
      await fetchComments();
      return response;
    } catch (err: any) {
      setError(err.message || 'Erro ao criar comentário');
      throw err;
    }
  };

  const updateComment = async (commentId: number, content: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Você precisa estar logado');
      }

      await httpClient.put(`/comments/${commentId}`, { content });
      await fetchComments();
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar comentário');
      throw err;
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Você precisa estar logado');
      }

      await httpClient.delete(`/comments/${commentId}`);
      await fetchComments();
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar comentário');
      throw err;
    }
  };

  useEffect(() => {
    if (adId) {
      fetchComments(3).catch(err => {
        console.error('Erro ao carregar comentários iniciais:', err);
        // Não bloqueia a renderização em caso de erro
      });
    }
  }, [adId]);

  return {
    comments,
    total,
    loading,
    error,
    fetchComments,
    createComment,
    updateComment,
    deleteComment
  };
};
