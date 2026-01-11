import { useState } from 'react';
import { CreateAdUseCase } from '../../application/useCases/CreateAdUseCase';
import { adsRepositoryInstance } from '../../infrastructure/repositories/adsRepositoryInstance';
import { useAuth } from '../context/AuthContext';

interface NovoAnuncioPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca') => void;
}

const createAdUseCase = new CreateAdUseCase(adsRepositoryInstance);

const NovoAnuncioPage = ({ onNavigate }: NovoAnuncioPageProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [cep, setCep] = useState('');
  const [salary, setSalary] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [type, setType] = useState<'aluguel' | 'venda' | 'serviço' | 'outro'>('venda');
  const [rules, setRules] = useState<string[]>([]);
  const [customRules, setCustomRules] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [customAmenities, setCustomAmenities] = useState('');
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState('');

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string) || '');
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImagesChange = async (fileList: FileList | null) => {
    if (!fileList) return;
    setUploadError('');
    const remaining = 15 - images.length;
    if (remaining <= 0) {
      setUploadError('Você já atingiu o limite de 15 fotos.');
      return;
    }

    const selected = Array.from(fileList).slice(0, remaining);
    if (selected.length < fileList.length) {
      setUploadError('Apenas 15 fotos são permitidas por anúncio.');
    }

    const base64Images = await Promise.all(selected.map(fileToBase64));
    setImages(prev => [...prev, ...base64Images]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    if (!user?.email) {
      alert('Faça login para criar um anúncio.');
      onNavigate('login');
      return;
    }

    if (!isDraft && !(title && description && company && location)) {
      alert('Preencha os campos obrigatórios: Título, Descrição, Vendedor e Localização');
      return;
    }

    setSaving(true);
    try {
      await createAdUseCase.execute({
        title: title || 'Rascunho',
        description: description || 'Rascunho de anúncio',
        seller: company || 'Anunciante',
        location: location || 'A definir',
        cep,
        price: salary ? Number(salary) : undefined,
        category: type,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        bathrooms: bathrooms ? Number(bathrooms) : undefined,
        rules,
        amenities,
        custom_rules: customRules,
        custom_amenities: customAmenities,
        images,
        status: isDraft ? 'draft' : 'published',
        postedBy: user.email,
      });
      
      if (isDraft) {
        alert('Rascunho salvo com sucesso!');
      } else {
        alert('Anúncio publicado com sucesso!');
      }
      onNavigate('meus-anuncios');
    } catch (error) {
      console.error('Erro:', error);
      alert(isDraft ? 'Erro ao salvar rascunho' : 'Erro ao publicar anúncio');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="mb-6">
          <p className="text-sm text-gray-500">Publicar moradia</p>
          <h1 className="text-2xl font-semibold text-gray-900">Novo anúncio</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Ex.: Suíte mobiliada perto do campus"
                required
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
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Seu nome ou república"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Localização</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Bairro, cidade"
                required
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
                placeholder="Ex.: 63000-000"
              />
            </div>
            <div className="space-y-2"></div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
              placeholder="Destaque comodidades, regras e proximidades importantes"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Preço (opcional)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61452a]/60"
                placeholder="Ex.: 750"
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
                Fotos do imóvel <span className="text-gray-500 text-xs">{images.length}/15</span>
              </label>
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 hover:border-[#61452a]/60 cursor-pointer text-center"
              >
                <span className="text-sm font-medium text-gray-800">Clique ou arraste para enviar</span>
                <span className="text-xs text-gray-500">Até 15 fotos em JPG ou PNG</span>
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImagesChange(e.target.files)}
                />
              </label>
              {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
              {images.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((src, idx) => (
                    <div key={idx} className="relative group h-20 rounded-lg overflow-hidden bg-gray-100">
                      <img src={src} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 text-[10px] px-2 py-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors disabled:opacity-60"
            >
              {saving ? 'Publicando...' : 'Publicar anúncio'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={saving}
              className="px-5 py-2.5 bg-blue-500 text-white rounded-lg border border-blue-600 hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {saving ? 'Salvando...' : 'Salvar rascunho'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('meus-anuncios')}
              className="px-5 py-2.5 text-gray-700 hover:text-gray-900"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoAnuncioPage;