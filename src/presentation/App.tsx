import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomeLogadoPage from './pages/HomeLogadoPage';
import MeusAnunciosPage from './pages/MeusAnunciosPage';
import FavoritosPage from './pages/FavoritosPage';
import NovoAnuncioPage from './pages/NovoAnuncioPage';
import EditarAnuncioPage from './pages/EditarAnuncioPage';
import MeuPerfilInformacoesPPage from './pages/MeuPerfilInformacoesPPage';
import MeuPerfilSegurancaPage from './pages/MeuPerfilSegurancaPage';
import AdDetailsPage from './pages/AdDetailsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

type Page = 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'editar-anuncio' | 'perfil-info' | 'perfil-seguranca' | 'ad-details';

const routeMap: Record<Page, string> = {
  home: '/',
  login: '/login',
  register: '/register',
  'home-logado': '/home-logado',
  'meus-anuncios': '/meus-anuncios',
  favoritos: '/favoritos',
  'novo-anuncio': '/novo-anuncio',
  'editar-anuncio': '/editar-anuncio/:id',
  'perfil-info': '/perfil-info',
  'perfil-seguranca': '/perfil-seguranca',
  'ad-details': '/ad/:id',
};

// Central navbar will be rendered here using shared component

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const buildOnNavigate = (navigate: ReturnType<typeof useNavigate>) => (page: Page, adId?: string) => {
  if (page === 'ad-details' && adId) {
    navigate(`/ad/${adId}`);
    return;
  }
  if (page === 'editar-anuncio' && adId) {
    navigate(`/editar-anuncio/${adId}`);
    return;
  }
  navigate(routeMap[page] || '/');
};

const AdDetailsRoute = ({ onNavigate }: { onNavigate: (page: Page, adId?: string) => void }) => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  return <AdDetailsPage adId={id || ''} onNavigate={onNavigate} isLoggedIn={isAuthenticated} />;
};

const EditarAnuncioRoute = ({ onNavigate }: { onNavigate: (page: Page, adId?: string) => void }) => {
  const { id } = useParams<{ id: string }>();
  return <EditarAnuncioPage adId={id || ''} onNavigate={onNavigate} />;
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { pathname } = useLocation();
  const onNavigate = buildOnNavigate(navigate);

  const currentPage: string =
    pathname === '/' ? 'home' :
    pathname.startsWith('/home-logado') ? 'home-logado' :
    pathname.startsWith('/favoritos') ? 'favoritos' :
    pathname.startsWith('/meus-anuncios') ? 'meus-anuncios' :
    pathname.startsWith('/novo-anuncio') ? 'novo-anuncio' :
    pathname.startsWith('/editar-anuncio') ? 'editar-anuncio' :
    pathname.startsWith('/perfil-info') ? 'perfil-info' :
    pathname.startsWith('/perfil-seguranca') ? 'perfil-seguranca' :
    pathname.startsWith('/ad/') ? 'ad-details' : '';

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      <Navbar
        onNavigate={onNavigate}
        isLoggedIn={isAuthenticated}
        userEmail={user?.email}
        userName={user?.name}
        userAvatarUrl={user?.avatarUrl}
        onLogout={logout}
        currentPage={currentPage}
      />
      <div className="pt-16">
      <Routes>
        <Route path="/" element={<HomePage onNavigate={onNavigate} />} />
        <Route path="/login" element={<LoginPage onNavigate={onNavigate} />} />
        <Route path="/register" element={<RegisterPage onNavigate={onNavigate} />} />
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
          path="/editar-anuncio/:id"
          element={
            <PrivateRoute>
              <EditarAnuncioRoute onNavigate={onNavigate} />
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
      <Footer />
      </div>
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