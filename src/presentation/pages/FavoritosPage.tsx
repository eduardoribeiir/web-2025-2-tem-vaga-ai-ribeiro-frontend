import { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { adsRepositoryInstance } from '../../infrastructure/repositories/adsRepositoryInstance';
import { Ad } from '../../domain/entities/Ad';
import { useAuth } from '../context/AuthContext';
import { httpClient } from '../../infrastructure/api/HttpClient';

interface FavoritosPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
}

const placeholder =
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';

const FavoritosPage = ({ onNavigate }: FavoritosPageProps) => {
  const { favorites, setFavorites } = useFavorites();
  const [ads, setAds] = useState<Ad[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (isAuthenticated) {
        try {
          const favAds = await httpClient.get<Ad[]>('/favorites');
          setAds(favAds);
          return;
        } catch {
          // fallback below
        }
      }
      const all = await adsRepositoryInstance.getAll();
      setAds(all.filter(ad => favorites.includes(ad.id)));
    };
    load();
  }, [favorites, isAuthenticated]);

  const formatPrice = (value?: number) =>
    value || value === 0
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      : '';

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Meus Favoritos</h1>
            <p className="text-sm text-gray-500">{ads.length} vagas salvas</p>
          </div>
          {ads.length > 0 && (
            <button
              onClick={() => setFavorites([])}
              className="text-xs text-red-500 border border-red-200 px-3 py-1 rounded-md hover:bg-red-50"
            >
              Limpar todos
            </button>
          )}
        </div>

        {ads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Você ainda não favoritou nenhum anúncio.</p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-2 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors"
            >
              Explorar Anúncios
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map(ad => (
              <article
                key={ad.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer overflow-hidden"
                onClick={() => onNavigate('ad-details', ad.id)}
              >
                <div className="h-40 w-full bg-gray-100 overflow-hidden">
                  <img src={(ad as any).images?.[0] || placeholder} alt={ad.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">{ad.title}</h3>
                  <div className="text-[13px] text-gray-700 font-semibold">
                    {formatPrice(ad.price)} <span className="text-gray-500 font-normal">/mês</span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {ad.location || 'Quixadá'}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-700">
                    <span className="flex items-center gap-1">🛏️ {ad.bedrooms || '—'}</span>
                    <span className="flex items-center gap-1">🚿 {ad.bathrooms || '—'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 text-[11px]">
                    <span className="px-2 py-1 bg-[#eef2ff] text-[#4c1d95] rounded-full capitalize">
                      {ad.category || 'República'}
                    </span>
                    <span className="px-2 py-1 bg-[#ecfdf3] text-[#166534] rounded-full">Contas Inclusas</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritosPage;