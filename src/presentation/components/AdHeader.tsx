interface AdHeaderProps {
  title: string;
  location: string;
  category: string;
  price?: number;
}

export const AdHeader = ({ title, location, category, price }: AdHeaderProps) => {
  const formatPrice = (value?: number) =>
    value || value === 0
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      : '';

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <p className="text-xs uppercase text-gray-500">Moradia em {location}</p>
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">{title}</h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">{category}</span>
            <span className="px-2 py-1 rounded-full bg-[#ecfdf3] text-[#166534]">Contas inclusas</span>
          </div>
        </div>
        {price && (
          <div className="text-right whitespace-nowrap">
            <div className="text-2xl font-bold text-gray-900">{formatPrice(price)}</div>
            <p className="text-sm text-gray-500">por mês</p>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-sm text-gray-700 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Locador verificado</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Postado há 3 dias</span>
        </div>
      </div>
    </div>
  );
};
