import { useAds } from '../hooks/useAds';
import { useState, useMemo } from 'react';

interface HomeLogadoPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
}

const heroImage =
  'https://cearaselvagem.com/wp-content/uploads/2024/05/Cedro-e-Galinha-Choca-em-Quixada-1200x540-1.png';

const HomeLogadoPage = ({ onNavigate }: HomeLogadoPageProps) => {
  const { ads, loading } = useAds();
  
  interface FilterState {
    priceMin: number;
    priceMax: number;
    neighborhoods: string[];
    housingTypes: string[];
  }

  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 1000,
    neighborhoods: [],
    housingTypes: []
  });

  const filteredAds = useMemo(() => {
    return ads.filter(ad => {
      if (ad.price && (ad.price < filters.priceMin || ad.price > filters.priceMax)) {
        return false;
      }
      if (filters.neighborhoods.length > 0) {
        const adNeighborhood = ad.location?.toLowerCase() || '';
        const hasMatch = filters.neighborhoods.some(n => adNeighborhood.includes(n.toLowerCase()));
        if (!hasMatch) return false;
      }
      if (filters.housingTypes.length > 0) {
        const adCategory = ad.category?.toLowerCase() || '';
        const hasMatch = filters.housingTypes.some(t => adCategory.includes(t.toLowerCase()));
        if (!hasMatch) return false;
      }
      return true;
    });
  }, [ads, filters]);

  const formatPrice = (value?: number) => {
    if (!value && value !== 0) return '';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value);
  };

  const getImage = (images?: string[]) =>
    images && images.length > 0
      ? images[0]
      : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';

  const bedsIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12V7a2 2 0 012-2h1a2 2 0 012 2v5m8 0V9a2 2 0 00-2-2h-3m-6 5h14m-14 0v5m0-5V9m14 3v5" />
    </svg>
  );

  const bathIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10V6a5 5 0 0110 0v4m-9 4h8m-9 0H5m11 0h2m-9 4h6" />
    </svg>
  );

  if (loading) return <div className="flex items-center justify-center min-h-screen pt-20">Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#61452a]/80 via-[#61452a]/70 to-[#8b5a3c]/60" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-white">
          <h1 className="text-3xl font-semibold mb-6">Encontre sua vaga em Quixadá</h1>
          <div className="max-w-2xl">
            <div className="bg-white rounded-lg shadow-lg flex items-center px-4 py-3 text-gray-700">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Busque por bairro ou título..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-sm text-gray-600 mb-6">{filteredAds.length} vagas encontradas</p>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Filtros - iguais aos da Home */}
          <aside>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sticky top-20 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-6">
              <h3 className="font-semibold text-gray-900">Filtros</h3>

              {/* Faixa de Preço */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-3">Faixa de Preço</label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Mín</span>
                      <input
                        type="number"
                        min={0}
                        max={2000}
                        value={filters.priceMin}
                        onChange={(e) => setFilters(prev => ({ ...prev, priceMin: Math.min(Math.max(0, parseInt(e.target.value) || 0), prev.priceMax) }))}
                        className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#61452a]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Máx</span>
                      <input
                        type="number"
                        min={0}
                        max={2000}
                        value={filters.priceMax}
                        onChange={(e) => setFilters(prev => ({ ...prev, priceMax: Math.max(prev.priceMin, Math.min(parseInt(e.target.value) || 0, 2000)) }))}
                        className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#61452a]"
                      />
                    </div>
                  </div>

                  {/* Dual Range Slider */}
                  <div className="relative pt-2">
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div 
                        className="absolute h-2 bg-[#61452a] rounded-full"
                        style={{
                          left: `${(filters.priceMin / 2000) * 100}%`,
                          right: `${100 - (filters.priceMax / 2000) * 100}%`
                        }}
                      />
                    </div>
                    {/* Min Slider */}
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={filters.priceMin}
                      onChange={(e) => {
                        const newMin = Math.min(parseInt(e.target.value), filters.priceMax);
                        setFilters(prev => ({ ...prev, priceMin: newMin }));
                      }}
                      className="absolute w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer pointer-events-none"
                      style={{ zIndex: filters.priceMin > 1000 ? 5 : 3, top: 0 } as any}
                    />
                    {/* Max Slider */}
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={filters.priceMax}
                      onChange={(e) => {
                        const newMax = Math.max(parseInt(e.target.value), filters.priceMin);
                        setFilters(prev => ({ ...prev, priceMax: newMax }));
                      }}
                      className="absolute w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer pointer-events-none"
                      style={{ zIndex: filters.priceMax < 1000 ? 5 : 4, top: 0 } as any}
                    />
                  </div>

                  <div className="text-xs text-gray-600 flex justify-between bg-gray-50 p-2 rounded">
                    <span>R$ {filters.priceMin}</span>
                    <span>R$ {filters.priceMax}</span>
                  </div>
                </div>
              </div>

              {/* Bairro */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-3">Bairro</label>
                <div className="space-y-2">
                  {['Campo Novo', 'Centro', 'Planalto Universitário', 'São João'].map(item => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={filters.neighborhoods.includes(item)}
                        onChange={() => setFilters(prev => ({
                          ...prev,
                          neighborhoods: prev.neighborhoods.includes(item)
                            ? prev.neighborhoods.filter(n => n !== item)
                            : [...prev.neighborhoods, item]
                        }))}
                        className="w-4 h-4 text-[#61452a] border-gray-300 rounded focus:ring-[#61452a]"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tipo de Moradia */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-3">Tipo de Moradia</label>
                <div className="space-y-2">
                  {['República', 'Apartamento', 'Casa', 'Quarto Individual'].map(item => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={filters.housingTypes.includes(item)}
                        onChange={() => setFilters(prev => ({
                          ...prev,
                          housingTypes: prev.housingTypes.includes(item)
                            ? prev.housingTypes.filter(t => t !== item)
                            : [...prev.housingTypes, item]
                        }))}
                        className="w-4 h-4 text-[#61452a] border-gray-300 rounded focus:ring-[#61452a]"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[#61452a] text-white font-medium py-2 rounded-lg hover:bg-[#503a22] transition-colors">
                Aplicar Filtros
              </button>

              <style>{`
                input[type="range"] { -webkit-appearance: none; appearance: none; }
                input[type="range"]::-webkit-slider-thumb {
                  -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #61452a; cursor: pointer; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); pointer-events: auto;
                }
                input[type="range"]::-moz-range-thumb {
                  width: 18px; height: 18px; border-radius: 50%; background: #61452a; cursor: pointer; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); pointer-events: auto;
                }
                input[type="range"]::-webkit-slider-runnable-track { background: transparent; border: none; }
                input[type="range"]::-moz-range-track { background: transparent; border: none; }
              `}</style>
            </div>
          </aside>

          {/* Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAds.map(ad => (
              <article
                key={ad.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer overflow-hidden flex flex-col h-[340px]"
                onClick={() => onNavigate('ad-details', ad.id)}
              >
                <div className="h-40 w-full bg-gray-100 overflow-hidden">
                  <img src={getImage(ad.images)} alt={ad.title} className="w-full h-full object-cover" />
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
                    {ad.location || 'Quixadá'} {ad.cep && `(${ad.cep})`}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-700">
                    <span className="flex items-center gap-1">{bedsIcon} {ad.bedrooms ? `${ad.bedrooms}` : '—'}</span>
                    <span className="flex items-center gap-1">{bathIcon} {ad.bathrooms ? `${ad.bathrooms}` : '—'}</span>
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeLogadoPage;