import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomeLogadoPage from './pages/HomeLogadoPage';
import MeusAnunciosPage from './pages/MeusAnunciosPage';
import FavoritosPage from './pages/FavoritosPage';
import NovoAnuncioPage from './pages/NovoAnuncioPage';
import MeuPerfilInformacoesPPage from './pages/MeuPerfilInformacoesPPage';
import MeuPerfilSegurancaPage from './pages/MeuPerfilSegurancaPage';
import AdDetailsPage from './pages/AdDetailsPage';
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

type Page = 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details';

const routeMap: Record<Page, string> = {
  home: '/',
  login: '/login',
  register: '/register',
  'home-logado': '/home-logado',
  'meus-anuncios': '/meus-anuncios',
  favoritos: '/favoritos',
  'novo-anuncio': '/novo-anuncio',
  'perfil-info': '/perfil-info',
  'perfil-seguranca': '/perfil-seguranca',
  'ad-details': '/ad/:id',
};

const FloatingNav = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return null;

  const go = (path: string) => navigate(path);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm shadow-lg rounded-full px-6 py-3 border border-gray-200">
      <div className="flex gap-4 items-center">
        <button onClick={() => go('/home-logado')} className="px-4 py-2 rounded-full transition-all bg-gray-100 text-gray-700 hover:bg-gray-200">
          Início
        </button>
        <button onClick={() => go('/meus-anuncios')} className="px-4 py-2 rounded-full transition-all bg-gray-100 text-gray-700 hover:bg-gray-200">
          Meus Anúncios
        </button>
        <button onClick={() => go('/novo-anuncio')} className="px-4 py-2 rounded-full transition-all bg-gray-100 text-gray-700 hover:bg-gray-200">
          Novo Anúncio
        </button>
        <button onClick={() => go('/favoritos')} className="px-4 py-2 rounded-full transition-all bg-gray-100 text-gray-700 hover:bg-gray-200">
          Favoritos
        </button>
        <button onClick={() => go('/perfil-info')} className="px-4 py-2 rounded-full transition-all bg-gray-100 text-gray-700 hover:bg-gray-200">
          Perfil
        </button>
        <button onClick={() => { logout(); go('/'); }} className="px-4 py-2 rounded-full transition-all bg-red-50 text-red-600 hover:bg-red-100">
          Sair
        </button>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const buildOnNavigate = (navigate: ReturnType<typeof useNavigate>) => (page: Page, adId?: string) => {
  if (page === 'ad-details' && adId) {
    navigate(`/ad/${adId}`);
    return;
  }
  navigate(routeMap[page] || '/');
};

const AdDetailsRoute = ({ onNavigate }: { onNavigate: (page: Page, adId?: string) => void }) => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  return <AdDetailsPage adId={id || ''} onNavigate={onNavigate} isLoggedIn={isAuthenticated} />;
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const onNavigate = buildOnNavigate(navigate);

  const handleLogin = (user: { email: string; name?: string }) => {
    login(user);
    navigate('/home-logado');
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      <FloatingNav />
      <Routes>
        <Route path="/" element={<HomePage onNavigate={onNavigate} />} />
        <Route path="/login" element={<LoginPage onNavigate={onNavigate} onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onNavigate={onNavigate} onLogin={handleLogin} />} />
        <Route path="/ad/:id" element={<AdDetailsRoute onNavigate={onNavigate} />} />

        <Route
          path="/home-logado"
          element={
            <PrivateRoute>
              <HomeLogadoPage onNavigate={onNavigate} />
            </PrivateRoute>
          }
        />
        <Route
          path="/meus-anuncios"
          element={
            <PrivateRoute>
              <MeusAnunciosPage onNavigate={onNavigate} />
            </PrivateRoute>
          }
        />
        <Route
          path="/favoritos"
          element={
            <PrivateRoute>
              <FavoritosPage onNavigate={onNavigate} />
            </PrivateRoute>
          }
        />
        <Route
          path="/novo-anuncio"
          element={
            <PrivateRoute>
              <NovoAnuncioPage onNavigate={onNavigate} />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil-info"
          element={
            <PrivateRoute>
              <MeuPerfilInformacoesPPage onNavigate={onNavigate} />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil-seguranca"
          element={
            <PrivateRoute>
              <MeuPerfilSegurancaPage onNavigate={onNavigate} />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? '/home-logado' : '/'} replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;