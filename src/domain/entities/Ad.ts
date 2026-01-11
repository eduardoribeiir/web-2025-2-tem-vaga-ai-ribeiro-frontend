export interface Ad {
  id: string;
  title: string;
  description: string;
  seller?: string; // em vez de company
  location?: string;
  cep?: string;
  price?: number; // em vez de salary
  category: 'aluguel' | 'venda' | 'serviço' | 'outro'; // em vez de type
  bedrooms?: number;
  bathrooms?: number;
  rules?: string[]; // regras selecionadas
  amenities?: string[]; // comodidades selecionadas
  custom_rules?: string; // regras customizadas
  custom_amenities?: string; // comodidades customizadas
  images?: string[]; // array de URLs das imagens
  status?: 'draft' | 'published' | 'completed' | 'reserved' | 'cancelled'; // status do anúncio
  postedBy: string; // user email
  created_at?: string; // data de criação
  updated_at?: string; // data de atualização
}