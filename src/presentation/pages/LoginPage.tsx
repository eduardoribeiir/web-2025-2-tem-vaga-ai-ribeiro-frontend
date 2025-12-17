import { useState } from 'react';

interface LoginPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
  onLogin: (user: { email: string; name?: string }) => void;
}

const LoginPage = ({ onNavigate: _onNavigate, onLogin: _onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    if (email && password) {
      _onLogin({ email });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#61452a] to-[#8b5a3c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-[url('https://cearaselvagem.com/wp-content/uploads/2024/05/Cedro-e-Galinha-Choca-em-Quixada-1200x540-1.png')] bg-cover bg-center opacity-10"></div>
      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => _onNavigate('home')}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors"
              title="Voltar ao início"
            >
              <svg className="w-6 h-6 text-[#61452a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          </div>
          <p className="text-white/80 text-sm max-w-xs mx-auto">
            O portal que conecta estudantes universitários de Quixadá a vagas em repúblicas, apartamentos e casas compartilhadas.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Entrar</h2>
            <p className="text-gray-600 mt-2">Acesse sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#61452a] focus:border-transparent transition-colors"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#61452a] focus:border-transparent transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#61452a] text-white py-3 px-4 rounded-lg hover:bg-[#503a22] transition-colors font-medium"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <button
                onClick={() => _onNavigate('register')}
                className="text-[#61452a] hover:text-[#503a22] font-medium"
              >
                Cadastre-se
              </button>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>contato@temvagaai.com.br</p>
            <p className="mt-1">© 2025 Tem Vaga Aí? Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
