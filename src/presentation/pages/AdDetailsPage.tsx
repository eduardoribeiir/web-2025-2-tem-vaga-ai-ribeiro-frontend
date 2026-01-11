import { useState, useEffect, useCallback } from 'react';
import { useAds } from '../hooks/useAds';
import { useFavorites } from '../context/FavoritesContext';
import { AdGallery } from '../components/AdGallery';
import { AdHeader } from '../components/AdHeader';
import { DescriptionBlock } from '../components/DescriptionBlock';
import { AmenitiesBlock } from '../components/AmenitiesBlock';
import { RulesBlock } from '../components/RulesBlock';
import { ContactPanel } from '../components/ContactPanel';
import { ContactModal } from '../components/ContactModal';
import { AuthModal } from '../components/AuthModal';

interface AdDetailsPageProps {
  adId: string;
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
  isLoggedIn: boolean;
}

const AdDetailsPage = ({ adId, onNavigate, isLoggedIn }: AdDetailsPageProps) => {
  const { getAdById } = useAds();
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadAd = async () => {
      const adData = await getAdById(adId);
      setAd(adData);
      setLoading(false);
    };
    loadAd();
  }, [adId, getAdById]);

  const handleContactSubmit = useCallback((data: any) => {
    console.log('Mensagem enviada:', data);
    alert('Mensagem enviada com sucesso! O locador entrará em contato em breve.');
    setShowContactModal(false);
  }, []);

  const handleToggleFavorite = useCallback(() => {
    if (isLoggedIn) {
      if (ad?.id) toggleFavorite(ad.id);
    } else {
      setShowAuthModal(true);
    }
  }, [isLoggedIn, ad?.id, toggleFavorite]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61452a] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando anúncio...</p>
        </div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Anúncio não encontrado</h2>
          <button
            onClick={() => onNavigate('home-logado')}
            className="px-6 py-3 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 text-sm text-gray-600">
          <button
            onClick={() => onNavigate('home-logado')}
            className="hover:text-gray-900 flex items-center gap-2 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{ad.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Coluna esquerda: galeria + detalhes */}
          <div className="space-y-6">
            <AdGallery images={ad.images} title={ad.title} />
            <AdHeader
              title={ad.title}
              location={ad.location}
              category={ad.category}
              price={ad.price}
              createdAt={ad.created_at}
            />
            <DescriptionBlock text={ad.description} />
            <div className="grid md:grid-cols-2 gap-4">
              <AmenitiesBlock 
                amenities={Array.isArray(ad.amenities) ? ad.amenities : []} 
                customAmenities={ad.custom_amenities}
              />
              <RulesBlock 
                rules={Array.isArray(ad.rules) ? ad.rules : []} 
                customRules={ad.custom_rules}
              />
            </div>
          </div>

          {/* Coluna direita: painel de contato */}
          <ContactPanel
            price={ad.price}
            onContactClick={() => setShowContactModal(true)}
            onFavoriteClick={handleToggleFavorite}
            isFavorite={ad?.id ? isFavorite(ad.id) : false}
          />
        </div>
      </div>

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        adTitle={ad.title}
        adSeller={ad.seller}
        adLocation={ad.location}
        onSubmit={handleContactSubmit}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={() => onNavigate('login')}
        onRegister={() => onNavigate('register')}
      />
    </div>
  );
};

export default AdDetailsPage;