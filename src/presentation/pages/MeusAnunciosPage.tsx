import { useUserAds } from '../hooks/useUserAds';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { AdsRepository } from '../../infrastructure/repositories/AdsRepository';
import { DeleteAdUseCase } from '../../application/useCases/DeleteAdUseCase';
import { UpdateAdUseCase } from '../../application/useCases/UpdateAdUseCase';
import { getRelativeTime } from '../../utils/dateUtils';

interface MeusAnunciosPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details' | 'editar-anuncio', adId?: string) => void;
}

const adsRepository = new AdsRepository();
const deleteAdUseCase = new DeleteAdUseCase(adsRepository);

const placeholder =
  'https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=800&q=80';

const MeusAnunciosPage = ({ onNavigate }: MeusAnunciosPageProps) => {
  const { user } = useAuth();
  const { ads, loading, error, refetch } = useUserAds(user?.email || '');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [completing, setCompleting] = useState<string | null>(null);
  const [reactivating, setReactivating] = useState<string | null>(null);
  const formatPrice = (value?: number) =>
    value || value === 0
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      : '';

  const handleDelete = async (adId: string) => {
    if (!confirm('Tem certeza que deseja excluir este anúncio?')) {
      return;
    }

    setDeleting(adId);
    try {
      const success = await deleteAdUseCase.execute(adId);
      if (success) {
        alert('Anúncio excluído com sucesso!');
        refetch();
      } else {
        alert('Erro ao excluir anúncio. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir anúncio. Tente novamente.');
    } finally {
      setDeleting(null);
    }
  };

  const handlePublish = async (ad: any) => {
    if (!confirm('Deseja publicar este rascunho?')) {
      return;
    }

    setPublishing(ad.id);
    try {
      const updateUseCase = new UpdateAdUseCase(adsRepository);
      await updateUseCase.execute(ad.id, {
        ...ad,
        status: 'published'
      });
      alert('Anúncio publicado com sucesso!');
      refetch();
    } catch (error) {
      console.error('Erro ao publicar:', error);
      alert('Erro ao publicar anúncio. Tente novamente.');
    } finally {
      setPublishing(null);
    }
  };

  const handleComplete = async (ad: any) => {
    if (!confirm('Marcar como concluído? O anúncio será movido para "Concluídos".')) {
      return;
    }

    setCompleting(ad.id);
    try {
      const updateUseCase = new UpdateAdUseCase(adsRepository);
      await updateUseCase.execute(ad.id, {
        ...ad,
        status: 'completed'
      });
      alert('Anúncio marcado como concluído!');
      refetch();
    } catch (error) {
      console.error('Erro ao concluir:', error);
      alert('Erro ao concluir anúncio. Tente novamente.');
    } finally {
      setCompleting(null);
    }
  };

  const handleReactivate = async (ad: any) => {
    setReactivating(ad.id);
    try {
      // Navega para a página de edição onde o usuário pode revisar e republicar
      onNavigate('editar-anuncio', ad.id);
    } catch (error) {
      console.error('Erro ao reativar:', error);
      alert('Erro ao reativar anúncio. Tente novamente.');
    } finally {
      setReactivating(null);
    }
  };

  const publishedAds = ads.filter((ad: any) => ad.status === 'published' || !ad.status);
  const draftAds = ads.filter((ad: any) => ad.status === 'draft');
  const completedAds = ads.filter((ad: any) => ad.status === 'completed');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f7f7f7] text-gray-600">Carregando...</div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f7f7]">
        <p className="text-red-600 mb-4">Erro ao carregar anúncios: {error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Meus Anúncios</h1>
            <p className="text-sm text-gray-500">
              {publishedAds.length} publicados, {draftAds.length} rascunhos, {completedAds.length} concluídos
            </p>
          </div>
          <button
            onClick={() => onNavigate('novo-anuncio')}
            className="px-4 py-2 bg-[#61452a] text-white text-sm rounded-lg hover:bg-[#503a22] transition-colors"
          >
            Criar anúncio
          </button>
        </div>

        {ads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Você ainda não tem anúncios.</p>
            <button
              onClick={() => onNavigate('novo-anuncio')}
              className="px-6 py-2 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors"
            >
              Criar Primeiro Anúncio
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {draftAds.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Rascunhos ({draftAds.length})</h2>
                <div className="space-y-4">
                  {draftAds.map(ad => (
                    <article
                      key={ad.id}
                      className="bg-yellow-50 rounded-xl shadow-sm border border-yellow-200 hover:shadow-md transition overflow-hidden p-4 flex gap-4"
                    >
                      <div 
                        onClick={() => onNavigate('ad-details', ad.id)}
                        className="w-32 h-24 bg-gray-100 overflow-hidden rounded-lg flex-shrink-0 cursor-pointer hover:opacity-90 transition"
                      >
                        <img src={(ad as any).images?.[0] || placeholder} alt={ad.title} className="w-full h-full object-cover opacity-75" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">{ad.title || 'Rascunho sem título'}</h3>
                            <div className="text-xs text-gray-600 flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {ad.location || 'Localização indefinida'} {ad.cep && `(${ad.cep})`}
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">{ad.description || 'Sem descrição'}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="inline-flex px-2 py-1 text-[11px] rounded-full bg-yellow-100 text-yellow-800 font-medium">
                              Rascunho
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('editar-anuncio', ad.id);
                            }}
                            className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePublish(ad)}
                            disabled={publishing === ad.id}
                            className="px-3 py-2 text-xs font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors disabled:bg-green-300"
                          >
                            {publishing === ad.id ? 'Publicando...' : 'Publicar'}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(ad.id);
                            }}
                            disabled={deleting === ad.id}
                            className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:bg-red-300"
                          >
                            {deleting === ad.id ? 'Excluindo...' : 'Excluir'}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {publishedAds.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Publicados ({publishedAds.length})</h2>
                <div className="space-y-4">
                  {publishedAds.map(ad => (
              <article
                key={ad.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition overflow-hidden p-4 flex gap-4"
              >
                <div 
                  onClick={() => onNavigate('ad-details', ad.id)}
                  className="w-32 h-24 bg-gray-100 overflow-hidden rounded-lg flex-shrink-0 cursor-pointer hover:opacity-90 transition"
                >
                  <img src={(ad as any).images?.[0] || placeholder} alt={ad.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">{ad.title}</h3>
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {ad.location || 'Quixadá'} {ad.cep && `(${ad.cep})`}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span>🛏️ {ad.bedrooms ? `${ad.bedrooms}` : '—'}</span>
                        <span>🚿 {ad.bathrooms ? `${ad.bathrooms}` : '—'}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{ad.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-base font-semibold text-gray-900">
                        {formatPrice(ad.price)} <span className="text-gray-500 font-normal text-xs">/mês</span>
                      </div>
                      <span className="inline-flex px-2 py-1 mt-2 text-[11px] rounded-full bg-[#ecfdf3] text-[#166534]">
                        Disponível
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-1 bg-[#eef2ff] text-[#4c1d95] rounded-full capitalize">
                      {ad.category || 'República'}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      Postado {getRelativeTime((ad as any).created_at)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() => onNavigate('ad-details', ad.id)}
                      className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#61452a] text-white hover:bg-[#503a22] transition-colors"
                    >
                      Visualizar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('editar-anuncio', ad.id);
                      }}
                      className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComplete(ad);
                      }}
                      disabled={completing === ad.id}
                      className="px-3 py-2 text-xs font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors disabled:bg-green-300"
                    >
                      {completing === ad.id ? 'Concluindo...' : 'Concluído'}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(ad.id);
                      }}
                      disabled={deleting === ad.id}
                      className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:bg-red-300"
                    >
                      {deleting === ad.id ? 'Excluindo...' : 'Excluir'}
                    </button>
                  </div>
                </div>
              </article>
                  ))}
                </div>
              </div>
            )}

            {completedAds.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Concluídos ({completedAds.length})</h2>
                <div className="space-y-4">
                  {completedAds.map(ad => (
                    <article
                      key={ad.id}
                      className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 hover:shadow-md transition overflow-hidden p-4 flex gap-4 opacity-75"
                    >
                      <div 
                        onClick={() => onNavigate('ad-details', ad.id)}
                        className="w-32 h-24 bg-gray-100 overflow-hidden rounded-lg flex-shrink-0 cursor-pointer hover:opacity-90 transition"
                      >
                        <img src={(ad as any).images?.[0] || placeholder} alt={ad.title} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-700 leading-tight line-clamp-2">{ad.title}</h3>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {ad.location || 'Quixadá'} {ad.cep && `(${ad.cep})`}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>🛏️ {ad.bedrooms ? `${ad.bedrooms}` : '—'}</span>
                              <span>🚿 {ad.bathrooms ? `${ad.bathrooms}` : '—'}</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">{ad.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-base font-semibold text-gray-700">
                              {formatPrice(ad.price)} <span className="text-gray-400 font-normal text-xs">/mês</span>
                            </div>
                            <span className="inline-flex px-2 py-1 mt-2 text-[11px] rounded-full bg-gray-200 text-gray-600 font-medium">
                              Concluído
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 text-[11px]">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                            {ad.category || 'República'}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            Finalizado {getRelativeTime((ad as any).updated_at || (ad as any).created_at)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <button
                            onClick={() => onNavigate('ad-details', ad.id)}
                            className="px-3 py-2 text-xs font-semibold rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition-colors"
                          >
                            Visualizar
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReactivate(ad);
                            }}
                            disabled={reactivating === ad.id}
                            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#61452a] text-white hover:bg-[#503a22] transition-colors disabled:bg-[#4a3721]"
                          >
                            {reactivating === ad.id ? 'Reativando...' : 'Anunciar novamente'}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(ad.id);
                            }}
                            disabled={deleting === ad.id}
                            className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:bg-red-300"
                          >
                            {deleting === ad.id ? 'Excluindo...' : 'Excluir'}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusAnunciosPage;