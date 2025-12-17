import { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { adsRepositoryInstance } from '../../infrastructure/repositories/adsRepositoryInstance';
import { Ad } from '../../domain/entities/Ad';

interface FavoritosPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
}

const FavoritosPage = ({ onNavigate }: FavoritosPageProps) => {
  const { favorites } = useFavorites();
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const load = async () => {
      const all = await adsRepositoryInstance.getAll();
      setAds(all.filter(ad => favorites.includes(ad.id)));
    };
    load();
  }, [favorites]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Favoritos</h1>
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
              <div key={ad.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('ad-details', ad.id)}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{ad.title}</h3>
                <p className="text-gray-600 mb-2">{ad.seller}</p>
                <p className="text-gray-500 text-sm mb-2">{ad.location}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{ad.description}</p>
                {ad.price && <p className="text-green-600 font-medium">R$ {ad.price}</p>}
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mt-2">{ad.category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritosPage;