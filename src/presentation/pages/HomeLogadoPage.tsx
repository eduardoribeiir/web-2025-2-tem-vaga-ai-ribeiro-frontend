import { useAds } from '../hooks/useAds';

interface HomeLogadoPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
}

const HomeLogadoPage = ({ onNavigate: _onNavigate }: HomeLogadoPageProps) => {
  const { ads, loading } = useAds();

  if (loading) return <div className="flex items-center justify-center min-h-screen pt-20">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header baseado no protótipo */}
      <div className="bg-[#61452a] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Tem Vaga Aí?</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Encontre sua vaga em Quixadá
          </p>
          <div className="relative max-w-lg mx-auto mb-8">
            <input
              type="text"
              placeholder="Busque por bairro ou título..."
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-lg"
            />
            <svg className="absolute left-4 top-4.5 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-lg">{ads.length} vagas encontradas</p>
        </div>
      </div>

      {/* Content - Lista de vagas */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ads.map(ad => (
            <div
              key={ad.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer"
              onClick={() => _onNavigate('ad-details', ad.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{ad.title}</h3>
                {ad.price && <span className="text-2xl font-bold text-green-600">R$ {ad.price}</span>}
              </div>
              <p className="text-gray-600 mb-3 font-medium">{ad.seller}</p>
              <p className="text-gray-500 text-sm mb-4">{ad.location}</p>
              <p className="text-gray-700 mb-4 leading-relaxed">{ad.description}</p>
              <div className="flex justify-between items-center">
                <span className="inline-block bg-[#61452a] text-white text-sm px-3 py-1 rounded-full">
                  {ad.category}
                </span>
                <button className="text-[#61452a] hover:text-[#503a22] font-medium">
                  Ver detalhes →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLogadoPage;