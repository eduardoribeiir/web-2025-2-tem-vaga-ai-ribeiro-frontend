import { useState, useEffect } from 'react';
import { useAds } from '../hooks/useAds';
import { useFavorites } from '../context/FavoritesContext';

interface AdDetailsPageProps {
  adId: string;
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
  isLoggedIn: boolean;
}

const AdDetailsPage = ({ adId, onNavigate, isLoggedIn }: AdDetailsPageProps) => {
  const { getAdById } = useAds();
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const loadAd = async () => {
      const adData = await getAdById(adId);
      setAd(adData);
      setLoading(false);
    };
    loadAd();
  }, [adId, getAdById]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envio do formulário
    alert('Mensagem enviada com sucesso! O locador entrará em contato em breve.');
    setShowContactModal(false);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61452a] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando anúncio...</p>
        </div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Anúncio não encontrado</h2>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com botão voltar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            {/* Imagem Principal */}
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
              <img
                src={ad.images?.[selectedImageIndex] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Miniaturas */}
            {ad.images && ad.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {ad.images.slice(0, 5).map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-[#61452a]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${ad.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {ad.images.length > 5 && (
                  <div className="aspect-square rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">+{ad.images.length - 5}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Informações do Anúncio */}
          <div className="space-y-6">
            {/* Título e Preço */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{ad.title}</h1>
              {ad.price && (
                <div className="text-3xl font-bold text-green-600">
                  R$ {ad.price}
                  <span className="text-sm text-gray-500 font-normal">/mês</span>
                </div>
              )}
            </div>

            {/* Informações Básicas */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{ad.location}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-700">{ad.seller}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="text-gray-700 capitalize">{ad.category}</span>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrição</h2>
              <p className="text-gray-700 leading-relaxed">{ad.description}</p>
            </div>

            {/* Ações */}
            <div className="space-y-3">
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full bg-[#61452a] text-white py-4 px-6 rounded-lg hover:bg-[#503a22] transition-colors font-semibold text-lg"
              >
                Entrar em Contato
              </button>
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    if (ad?.id) {
                      toggleFavorite(ad.id);
                    }
                  } else {
                    setShowAuthModal(true);
                  }
                }}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                {ad?.id && isFavorite(ad.id) ? '💔 Remover dos Favoritos' : '❤️ Adicionar aos Favoritos'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Contato */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Entrar em Contato</h2>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{ad?.title}</h3>
                <p className="text-gray-600 text-sm">Anunciado por: {ad?.seller}</p>
                <p className="text-gray-600 text-sm">{ad?.location}</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#61452a] focus:border-transparent transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#61452a] focus:border-transparent transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#61452a] focus:border-transparent transition-colors"
                    placeholder="(88) 99999-9999"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#61452a] focus:border-transparent transition-colors resize-none"
                    placeholder="Olá! Tenho interesse nesta vaga. Podemos conversar sobre os detalhes?"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors font-medium"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Autenticação */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Faça Login para Continuar</h2>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#61452a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  Para adicionar anúncios aos favoritos, você precisa estar logado em sua conta.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    onNavigate('login');
                  }}
                  className="w-full bg-[#61452a] text-white py-3 px-4 rounded-lg hover:bg-[#503a22] transition-colors font-semibold"
                >
                  Fazer Login
                </button>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    onNavigate('register');
                  }}
                  className="w-full bg-white border-2 border-[#61452a] text-[#61452a] py-3 px-4 rounded-lg hover:bg-[#61452a] hover:text-white transition-colors font-semibold"
                >
                  Criar Conta
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Continuar sem fazer login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdDetailsPage;