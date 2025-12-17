import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface MeuPerfilInformacoesPPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca') => void;
}

const MeuPerfilInformacoesPPage = ({ onNavigate }: MeuPerfilInformacoesPPageProps) => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ ...(user || {}), name, email });
    alert('Perfil atualizado!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Informações Pessoais</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => onNavigate('perfil-seguranca')}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Segurança
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeuPerfilInformacoesPPage;