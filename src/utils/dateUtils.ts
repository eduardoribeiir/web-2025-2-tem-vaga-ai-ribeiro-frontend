/**
 * Calcula o tempo relativo desde uma data até agora
 * @param dateString - Data no formato ISO ou timestamp
 * @returns String formatada (ex: "hoje", "há 2 dias", "há 3 meses")
 */
export function getRelativeTime(dateString: string | Date | undefined): string {
  if (!dateString) {
    console.log('getRelativeTime: No date provided');
    return 'Recente';
  }

  const date = new Date(dateString);
  const now = new Date();
  
  console.log('getRelativeTime:', {
    input: dateString,
    parsed: date,
    now: now,
    isValid: !isNaN(date.getTime())
  });
  
  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateString);
    return 'Data inválida';
  }
  
  // Calcula diferença em milissegundos
  const diffMs = now.getTime() - date.getTime();
  
  console.log('Difference in ms:', diffMs);
  
  // Converte para diferentes unidades
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // Retorna formato apropriado
  if (diffMinutes < 1) return 'agora mesmo';
  if (diffMinutes < 60) return `há ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
  if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  if (diffDays === 0) return 'hoje';
  if (diffDays === 1) return 'ontem';
  if (diffDays < 7) return `há ${diffDays} dias`;
  if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
  if (diffMonths < 12) return `há ${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`;
  return `há ${diffYears} ano${diffYears > 1 ? 's' : ''}`;
}
