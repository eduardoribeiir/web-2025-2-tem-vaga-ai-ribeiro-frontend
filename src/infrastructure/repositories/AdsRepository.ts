import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';

const STORAGE_KEY = 'temVagaAi.ads';

// Semente de anúncios para carregar em primeira execução.
const baseAds: Ad[] = [
  {
    id: '1',
    title: 'Vaga em república mista no Centro',
    description: 'Vaga disponível em república mista no centro de Quixadá. Ambiente tranquilo, próximo à universidade. R$ 350/mês (inclui água, luz e internet).',
    seller: 'República Estudantil Centro',
    location: 'Centro, Quixadá',
    price: 350,
    category: 'aluguel',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583845112203-29e0c3aba608?auto=format&fit=crop&w=800&q=80'
    ],
    postedBy: 'user@example.com',
  },
  {
    id: '2',
    title: 'Apartamento compartilhado - 3 quartos',
    description: 'Apartamento de 3 quartos para estudantes. Próximo ao campus, seguro e bem localizado. R$ 400/mês por pessoa.',
    seller: 'Apartamento Universitário',
    location: 'Próximo ao Campus, Quixadá',
    price: 400,
    category: 'aluguel',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583845112203-29e0c3aba608?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    ],
    postedBy: 'user@example.com',
  },
  {
    id: '3',
    title: 'Casa compartilhada feminina',
    description: 'Casa compartilhada exclusiva para mulheres estudantes. Ambiente familiar, cozinha equipada, área de estudo. R$ 380/mês.',
    seller: 'Casa das Estudantes',
    location: 'Bairro Educandário, Quixadá',
    price: 380,
    category: 'aluguel',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583845112203-29e0c3aba608?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    postedBy: 'other@example.com',
  },
  {
    id: '4',
    title: 'República masculina próxima à UFCA',
    description: 'República masculina a 5 minutos da Universidade Federal do Cariri. Wi-fi, lavanderia, sala de estudos. R$ 320/mês.',
    seller: 'República UFCA',
    location: 'Próximo à UFCA, Quixadá',
    price: 320,
    category: 'aluguel',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583845112203-29e0c3aba608?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    postedBy: 'user@example.com',
  },
  {
    id: '5',
    title: 'Kitnet mobiliada para estudante',
    description: 'Kitnet mobiliada ideal para estudante. Próxima ao centro, com mobília básica incluída. R$ 450/mês.',
    seller: 'Imobiliária Estudantil',
    location: 'Centro, Quixadá',
    price: 450,
    category: 'aluguel',
    images: [
      'https://images.unsplash.com/photo-1583845112203-29e0c3aba608?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80'
    ],
    postedBy: 'other@example.com',
  },
];

export class AdsRepository implements IAdsRepository {
  private ads: Ad[];

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed: Ad[] = stored ? JSON.parse(stored) : [];
    this.ads = [...baseAds, ...parsed];
  }

  private persistCustomAds() {
    const customAds = this.ads.filter(ad => !baseAds.some(base => base.id === ad.id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customAds));
  }

  async getAll(): Promise<Ad[]> {
    return this.ads;
  }

  async getById(id: string): Promise<Ad | null> {
    return this.ads.find(ad => ad.id === id) || null;
  }

  async getByUser(userEmail: string): Promise<Ad[]> {
    return this.ads.filter(ad => ad.postedBy === userEmail);
  }

  async create(ad: Omit<Ad, 'id'>): Promise<Ad> {
    const newAd: Ad = { ...ad, id: Date.now().toString() };
    this.ads.push(newAd);
    this.persistCustomAds();
    return newAd;
  }

  async update(id: string, updates: Partial<Ad>): Promise<Ad | null> {
    const index = this.ads.findIndex(ad => ad.id === id);
    if (index === -1) return null;
    this.ads[index] = { ...this.ads[index], ...updates };
    this.persistCustomAds();
    return this.ads[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.ads.findIndex(ad => ad.id === id);
    if (index === -1) return false;
    this.ads.splice(index, 1);
    this.persistCustomAds();
    return true;
  }
}