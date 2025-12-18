import { useState } from 'react';

interface MeuPerfilSegurancaPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'home-logado' | 'meus-anuncios' | 'favoritos' | 'novo-anuncio' | 'perfil-info' | 'perfil-seguranca') => void;
}

const MeuPerfilSegurancaPage = ({ onNavigate }: MeuPerfilSegurancaPageProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Senhas não coincidem!');
      return;
    }
    // Mock update
    alert('Senha alterada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Segurança</h1>
        {/* Alterar Senha */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#61452a] focus:border-[#61452a]"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors"
            >
              Alterar Senha
            </button>
            <button
              type="button"
              onClick={() => onNavigate('perfil-info')}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Voltar
            </button>
          </div>
        </form>

        {/* Termos de Privacidade */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Termos de Privacidade</h2>
          <p className="text-sm text-gray-600 mt-2">Saiba como tratamos seus dados pessoais e quais são seus direitos.</p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setShowPrivacy(true)}
              className="px-5 py-2 bg-[#61452a] text-white rounded-lg hover:bg-[#503a22] transition-colors"
            >
              Ver Termos
            </button>
            <button
              type="button"
              onClick={() => onNavigate('perfil-info')}
              className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
            >
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Modal de Privacidade */}
        {showPrivacy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowPrivacy(false)} />
            <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Termos de Privacidade</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPrivacy(false)}
                  aria-label="Fechar"
                >
                  ✕
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-gray-700 max-h-[60vh] overflow-y-auto">
                <p>
                  Coletamos seu nome, e-mail e, opcionalmente, telefone e foto de perfil para facilitar sua experiência na plataforma.
                </p>
                <p>
                  Seus dados são armazenados de forma segura e utilizados apenas para autenticação, exibição de perfil, comunicação com anunciantes e melhoria dos serviços.
                </p>
                <p>
                  Você pode solicitar a exclusão dos seus dados a qualquer momento. Ao continuar usando o serviço, você concorda com estes termos.
                </p>
                <p>
                  Para dúvidas, contate: contato@temvagaai.com.br.
                </p>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-200"
                  onClick={() => setShowPrivacy(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeuPerfilSegurancaPage;