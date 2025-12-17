import { useState } from 'react';

interface RegisterPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
  onLogin: (user: { email: string; name?: string }) => void;
}

const RegisterPage = ({ onNavigate, onLogin }: RegisterPageProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register
    if (name && email && password) {
      onLogin({ name, email });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#61452a] to-[#8b5a3c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-[url('https://cearaselvagem.com/wp-content/uploads/2024/05/Cedro-e-Galinha-Choca-em-Quixada-1200x540-1.png')] bg-cover bg-center opacity-10"></div>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 bg-[#61452a] rounded-full flex items-center justify-center hover:bg-[#503a22] transition-colors"
              title="Voltar ao início"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 text-sm max-w-xs mx-auto">
            O portal que conecta estudantes universitários de Quixadá a vagas em repúblicas, apartamentos e casas compartilhadas.
          </p>
        </div>

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a] focus:z-10 sm:text-sm"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#61452a] focus:border-[#61452a] focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a] focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#61452a] hover:bg-[#503a22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#61452a]"
            >
              Criar conta
            </button>
          </div>
          <div className="text-center">
            <button onClick={() => onNavigate('login')} className="text-[#61452a] hover:text-[#503a22]">
              Já tem conta? Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;