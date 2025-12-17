export interface Ad {
  id: string;
  title: string;
  description: string;
  seller: string; // em vez de company
  location: string;
  price?: number; // em vez de salary
  category: 'aluguel' | 'venda' | 'serviço' | 'outro'; // em vez de type
  images?: string[]; // array de URLs das imagens
  postedBy: string; // user email
}