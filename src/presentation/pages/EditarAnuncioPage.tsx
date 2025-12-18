import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdsRepository } from '../../infrastructure/repositories/AdsRepository';
import { UpdateAdUseCase } from '../../application/useCases/UpdateAdUseCase';

interface EditarAnuncioPageProps {
  adId: string;
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
}

const adsRepository = new AdsRepository();
const updateAdUseCase = new UpdateAdUseCase(adsRepository);

const EditarAnuncioPage = ({ adId, onNavigate }: EditarAnuncioPageProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [cep, setCep] = useState('');
  const [salary, setSalary] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [type, setType] = useState<'aluguel' | 'venda' | 'serviço' | 'outro'>('aluguel');
  const [rules, setRules] = useState<string[]>([]);
  const [customRules, setCustomRules] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [customAmenities, setCustomAmenities] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');

  useEffect(() => {
    const loadAd = async () => {
      try {
        const ad = await adsRepository.getById(adId);
        if (ad) {
          setTitle(ad.title);
          setDescription(ad.description);
          setCompany(ad.seller);
          setLocation(ad.location);
          setCep(ad.cep || '');
          setSalary(ad.price?.toString() || '');
          setBedrooms(ad.bedrooms?.toString() || '');
          setBathrooms(ad.bathrooms?.toString() || '');
          setType(ad.category);
          setRules(ad.rules || []);
          setCustomRules(ad.custom_rules || '');
          setAmenities(ad.amenities || []);
          setCustomAmenities(ad.custom_amenities || '');
          setImages(ad.images || []);
          setStatus(ad.status === 'draft' ? 'draft' : 'published');
        }
      } catch (error) {
        console.error('Erro ao carregar anúncio:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAd();
  }, [adId]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadError('');
    const newImages: string[] = [];

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Arquivos devem ter no máximo 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Você precisa estar logado para editar um anúncio');
      return;
    }

    setSaving(true);

    try {
      await updateAdUseCase.execute(adId, {
        id: adId,
        title,
        description,
        seller: company,
        location,
        cep,
        price: salary ? parseFloat(salary) : undefined,
        bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
        bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
        category: type,
        rules,
        amenities,
        custom_rules: customRules,
        custom_amenities: customAmenities,
        images,
        status,
        postedBy: user.email
      });

      alert('Anúncio atualizado com sucesso!');
      onNavigate('meus-anuncios');
    } catch (error) {
      console.error('Erro ao atualizar anúncio:', error);
      alert('Erro ao atualizar anúncio. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen pt-20">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] pt-20">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Editar Anúncio</h1>
          <p className="text-sm text-gray-500">Atualize as informações do seu anúncio</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Título do Anúncio</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Ex.: Quarto em república próximo à UFC"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Categoria</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'aluguel' | 'venda' | 'serviço' | 'outro')}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
              >
                <option value="aluguel">Aluguel</option>
                <option value="venda">Venda</option>
                <option value="serviço">Serviço</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Vendedor/Anunciante</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Nome do anunciante"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Localização</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Ex.: Centro, Quixadá"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">CEP (opcional)</label>
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Ex.: 63900-000"
              />
            </div>
            <div className="space-y-2"></div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
              placeholder="Descreva os detalhes da vaga..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Preço/mês (R$)</label>
              <input
                type="number"
                step="0.01"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Ex.: 500.00"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Quartos (opcional)</label>
              <input
                type="number"
                min="0"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Ex.: 2"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Banheiros (opcional)</label>
              <input
                type="number"
                min="0"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Ex.: 1"
              />
            </div>
            <div className="space-y-2"></div>
          </div>

          {/* Regras */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Regras do Imóvel</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Proibido fumar', 'Proibido animais', 'Proibido festas', 'Silêncio após 22h', 'Visitas permitidas'].map(rule => (
                <label key={rule} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rules.includes(rule)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRules([...rules, rule]);
                      } else {
                        setRules(rules.filter(r => r !== rule));
                      }
                    }}
                    className="w-4 h-4 text-[#61452a] border-gray-300 rounded focus:ring-[#61452a]"
                  />
                  {rule}
                </label>
              ))}
            </div>
            <input
              type="text"
              value={customRules}
              onChange={(e) => setCustomRules(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
              placeholder="Outras regras (ex.: Entrada após 18h, Limpeza compartilhada...)"
            />
          </div>

          {/* Comodidades */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Comodidades e Inclusões</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Água inclusa', 'Luz inclusa', 'Internet inclusa', 'Mobiliado', 'Ar-condicionado', 'Lavanderia'].map(amenity => (
                <label key={amenity} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAmenities([...amenities, amenity]);
                      } else {
                        setAmenities(amenities.filter(a => a !== amenity));
                      }
                    }}
                    className="w-4 h-4 text-[#61452a] border-gray-300 rounded focus:ring-[#61452a]"
                  />
                  {amenity}
                </label>
              ))}
            </div>
            <input
              type="text"
              value={customAmenities}
              onChange={(e) => setCustomAmenities(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
              placeholder="Outras comodidades (ex.: Academia, Piscina, Churrasqueira...)"
            />
          </div>

          <div className="space-y-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex justify-between">
                <span>Fotos (até 5)</span>
                <span className="text-xs text-gray-500">{images.length}/5 fotos</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={images.length >= 5}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60 disabled:bg-gray-50"
              />
              {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-20 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status do Anúncio */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Status do Anúncio</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
            >
              <option value="draft">Rascunho (privado)</option>
              <option value="published">Publicado (visível para todos)</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#61452a] text-white font-medium py-3 rounded-lg hover:bg-[#503a22] transition-colors disabled:bg-gray-400"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('meus-anuncios')}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarAnuncioPage;
