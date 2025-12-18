import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface MeuPerfilInformacoesPPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca') => void;
}

const MeuPerfilInformacoesPPage = ({ onNavigate }: MeuPerfilInformacoesPPageProps) => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user?.avatarUrl);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string) || '');
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, avatarUrl });
    alert('Perfil atualizado!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Informações Pessoais</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Foto de perfil" className="w-16 h-16 rounded-full object-cover border" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#61452a] text-white flex items-center justify-center text-xl font-bold">
                {(name || email || '?').charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <label htmlFor="avatar" className="text-sm font-medium text-gray-700">Foto de perfil</label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="mt-2 block text-sm"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const b64 = await fileToBase64(file);
                    setAvatarUrl(b64);
                  }
                }}
              />
              <p className="text-xs text-gray-500 mt-1">PNG/JPG até 2MB</p>
            </div>
          </div>

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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(88) 99999-9999"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
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