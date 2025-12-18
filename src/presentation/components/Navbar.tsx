import { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details', adId?: string) => void;
  isLoggedIn?: boolean;
  userEmail?: string;
  userName?: string;
  userAvatarUrl?: string;
  onLogout?: () => void;
  currentPage?: string;
}

const Navbar = ({ onNavigate, isLoggedIn = false, userEmail, userName, userAvatarUrl, onLogout, currentPage }: NavbarProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (page: string) => currentPage === page;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo e Nome */}
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
          onClick={() => onNavigate(isLoggedIn ? 'home-logado' : 'home')}
        >
          <img src="/logo tem vaga ai.png" alt="Tem Vaga Aí?" className="h-10" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#61452a] leading-none">Tem Vaga Aí?</span>
            <span className="text-xs text-gray-500">Quixadá</span>
          </div>
        </div>

        {/* Menu Central (apenas para logado) */}
        {isLoggedIn && (
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('home-logado')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isActive('home-logado')
                  ? 'bg-[#f0e6d2] text-[#61452a]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Encontrar Vagas
            </button>
            <button
              onClick={() => onNavigate('favoritos')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isActive('favoritos')
                  ? 'bg-[#f0e6d2] text-[#61452a]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Favoritos
            </button>
            <button
              onClick={() => onNavigate('meus-anuncios')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isActive('meus-anuncios')
                  ? 'bg-[#f0e6d2] text-[#61452a]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Meus Anúncios
            </button>
          </div>
        )}

        {/* Lado Direito */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Botão Novo Anúncio */}
              <button
                onClick={() => onNavigate('novo-anuncio')}
                className="hidden sm:inline-block px-4 py-2 bg-[#61452a] text-white rounded-lg font-medium hover:bg-[#503a22] transition-colors"
              >
                + Novo Anúncio
              </button>

              {/* Menu Usuário */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-[#61452a] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {(userName || userEmail || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-xs text-gray-500">Conectado como</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{userName || userEmail}</p>
                    </div>
                    <button
                      onClick={() => {
                        onNavigate('perfil-info');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Informações Pessoais
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('perfil-seguranca');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Segurança
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        onLogout?.();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Login e Cadastro (não logado) */}
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-[#61452a] font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-4 py-2 bg-[#61452a] text-white font-medium rounded-lg hover:bg-[#503a22] transition-colors"
              >
                Cadastrar
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
