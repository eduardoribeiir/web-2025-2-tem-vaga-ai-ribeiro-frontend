import { useAds } from '../hooks/useAds';
import { useState, useMemo } from 'react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
}

interface FilterState {
  priceRange: [number, number];
  neighborhoods: string[];
  housingTypes: string[];
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const { ads, loading } = useAds();

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    neighborhoods: [],
    housingTypes: []
  });

  const filteredAds = useMemo(() => {
    return ads.filter(ad => {
      // Filter by price
      if (ad.price && (ad.price < filters.priceRange[0] || ad.price > filters.priceRange[1])) {
        return false;
      }

      // Filter by neighborhood
      if (filters.neighborhoods.length > 0) {
        const adNeighborhood = ad.location?.toLowerCase() || '';
        const hasMatchingNeighborhood = filters.neighborhoods.some(neighborhood =>
          adNeighborhood.includes(neighborhood.toLowerCase())
        );
        if (!hasMatchingNeighborhood) return false;
      }

      // Filter by housing type
      if (filters.housingTypes.length > 0) {
        const adCategory = ad.category?.toLowerCase() || '';
        const hasMatchingType = filters.housingTypes.some(type =>
          adCategory.includes(type.toLowerCase())
        );
        if (!hasMatchingType) return false;
      }

      return true;
    });
  }, [ads, filters]);

  const updatePriceRange = (min: number, max: number) => {
    setFilters(prev => ({ ...prev, priceRange: [min, max] }));
  };

  const toggleNeighborhood = (neighborhood: string) => {
    setFilters(prev => ({
      ...prev,
      neighborhoods: prev.neighborhoods.includes(neighborhood)
        ? prev.neighborhoods.filter(n => n !== neighborhood)
        : [...prev.neighborhoods, neighborhood]
    }));
  };

  const toggleHousingType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      housingTypes: prev.housingTypes.includes(type)
        ? prev.housingTypes.filter(t => t !== type)
        : [...prev.housingTypes, type]
    }));
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header baseado no protótipo */}
      <div className="bg-gradient-to-br from-[#61452a] to-[#8b5a3c] text-white py-16 px-4 relative overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-[url('https://cearaselvagem.com/wp-content/uploads/2024/05/Cedro-e-Galinha-Choca-em-Quixada-1200x540-1.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
            <img src="/logo tem vaga ai.png" alt="Tem Vaga Aí?" className="h-20 md:h-32" />
            <p className="text-lg md:text-xl text-center md:text-left max-w-md">
              O portal que conecta estudantes universitários de Quixadá a vagas em repúblicas, apartamentos e casas compartilhadas.
            </p>
          </div>
          <div className="relative max-w-lg mx-auto mb-8">
            <input
              type="text"
              placeholder="Busque por bairro ou título..."
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-lg"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-lg">{ads.length} vagas encontradas</p>
        </div>
      </div>

      {/* Content - Filtros e Lista de vagas */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Filtros</h2>

              {/* Faixa de Preço */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Faixa de Preço</label>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute h-2 bg-[#61452a] rounded-full"
                        style={{
                          left: `${(filters.priceRange[0] / 1000) * 100}%`,
                          right: `${100 - (filters.priceRange[1] / 1000) * 100}%`
                        }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[0]}
                      onChange={(e) => updatePriceRange(Number(e.target.value), filters.priceRange[1])}
                      className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                      style={{ zIndex: 3 }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => updatePriceRange(filters.priceRange[0], Number(e.target.value))}
                      className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                      style={{ zIndex: 4 }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>R$ {filters.priceRange[0]}</span>
                    <span>R$ {filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Bairro */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Bairro</label>
                <div className="space-y-2">
                  {['Campo Novo', 'Centro', 'Planalto Universitário', 'São João'].map(neighborhood => (
                    <label key={neighborhood} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.neighborhoods.includes(neighborhood)}
                        onChange={() => toggleNeighborhood(neighborhood)}
                        className="w-4 h-4 text-[#61452a] border-gray-300 rounded focus:ring-[#61452a]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{neighborhood}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tipo de Moradia */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de Moradia</label>
                <div className="space-y-2">
                  {['República', 'Apartamento', 'Casa', 'Quarto Individual'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.housingTypes.includes(type)}
                        onChange={() => toggleHousingType(type)}
                        className="w-4 h-4 text-[#61452a] border-gray-300 rounded focus:ring-[#61452a]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Botão Aplicar Filtros */}
              <button
                onClick={() => {
                  // Os filtros já são aplicados automaticamente via useMemo
                  console.log('Filtros aplicados:', filters);
                }}
                className="w-full bg-[#61452a] text-white py-3 px-4 rounded-lg hover:bg-[#503a22] transition-colors font-medium"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>

          {/* Lista de vagas */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-lg text-gray-600">{filteredAds.length} vagas encontradas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredAds.map(ad => (
                <div
                  key={ad.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => onNavigate('ad-details', ad.id)}
                >
                  {/* Image Gallery */}
                  {ad.images && ad.images.length > 0 && (
                    <div className="relative h-48 bg-gray-200">
                      <div className="grid grid-cols-2 h-full">
                        {/* First image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={ad.images[0]}
                            alt={`${ad.title} - imagem 1`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Second image with overlay */}
                        <div className="relative overflow-hidden">
                          <img
                            src={ad.images[1]}
                            alt={`${ad.title} - imagem 2`}
                            className="w-full h-full object-cover"
                          />
                          {/* +3 overlay */}
                          {ad.images.length > 2 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="text-white text-2xl font-bold">+{ad.images.length - 2}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4 min-h-[3rem]">
                      <h3 className="text-xl font-semibold text-gray-900 flex-1 pr-4">{ad.title}</h3>
                      {ad.price && <span className="text-2xl font-bold text-green-600 whitespace-nowrap">R$ {ad.price}</span>}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with login/register */}
      <div className="bg-white py-12 px-4 border-t">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Entre para acessar mais funcionalidades</h2>
          <p className="text-gray-600 mb-8">Gerencie seus anúncios, salve favoritos e conecte-se com outros estudantes</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('login')}
              className="px-8 py-3 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors font-medium"
            >
              Entrar
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// Custom styles for range sliders
const styles = `
.slider-thumb::-webkit-slider-thumb {
  appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: white;
  border: 2px solid #61452a;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.slider-thumb::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: white;
  border: 2px solid #61452a;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}