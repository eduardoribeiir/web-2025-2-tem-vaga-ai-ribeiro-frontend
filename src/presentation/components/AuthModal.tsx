interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export const AuthModal = ({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Faça login para continuar</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Fechar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#61452a] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-gray-600">
              Para salvar anúncios favoritos, você precisa estar logado em sua conta.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onLogin}
              className="w-full bg-[#61452a] text-white py-3 px-4 rounded-lg hover:bg-[#503a22] transition font-semibold"
            >
              Fazer login
            </button>
            <button
              onClick={onRegister}
              className="w-full bg-white border-2 border-[#61452a] text-[#61452a] py-3 px-4 rounded-lg hover:bg-[#61452a] hover:text-white transition font-semibold"
            >
              Criar conta
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm py-2"
          >
            Continuar sem login
          </button>
        </div>
      </div>
    </div>
  );
};
