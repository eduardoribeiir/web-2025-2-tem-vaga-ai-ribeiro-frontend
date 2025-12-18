interface ContactPanelProps {
  price?: number;
  onContactClick: () => void;
  onFavoriteClick: () => void;
  isFavorite: boolean;
}

export const ContactPanel = ({ price, onContactClick, onFavoriteClick, isFavorite }: ContactPanelProps) => {
  const formatPrice = (value?: number) =>
    value || value === 0
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      : '';

  return (
    <aside className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 sticky top-20">
        <div>
          <p className="text-xs uppercase text-gray-500">Aluguel mensal</p>
          <div className="text-2xl font-bold text-gray-900">{formatPrice(price)}</div>
          <p className="text-sm text-gray-500">Contas incluídas</p>
        </div>

        <div className="space-y-2">
          <button
            onClick={onContactClick}
            className="w-full bg-[#61452a] text-white py-3 rounded-lg font-semibold hover:bg-[#503a22] transition-colors"
          >
            Entrar em contato
          </button>
          <button
            onClick={onFavoriteClick}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              isFavorite
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {isFavorite ? '❤️ Salvo nos favoritos' : '🤍 Salvar nos favoritos'}
          </button>
        </div>

        <div className="space-y-2 text-sm text-gray-700 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Disponível imediatamente
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Visitas presenciais e virtuais
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pagamento negociável
          </div>
        </div>
      </div>
    </aside>
  );
};
