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
  const [salary, setSalary] = useState('');
  const [type, setType] = useState<'aluguel' | 'venda' | 'serviço' | 'outro'>('venda');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) {
      alert('Faça login para criar um anúncio.');
      onNavigate('login');
      return;
    }

    if (title && description && company && location) {
      setSaving(true);
      await createAdUseCase.execute({
        title,
        description,
        seller: company,
        location,
        price: salary ? Number(salary) : undefined,
        category: type,
        images: [],
        postedBy: user.email,
      });
      setSaving(false);
      onNavigate('meus-anuncios');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Novo Anúncio</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vendedor/Anunciante</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preço (opcional)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'aluguel' | 'venda' | 'serviço' | 'outro')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
            >
              <option value="aluguel">Aluguel</option>
              <option value="venda">Venda</option>
              <option value="serviço">Serviço</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors disabled:opacity-60"
            >
              {saving ? 'Salvando...' : 'Criar Anúncio'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('meus-anuncios')}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
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