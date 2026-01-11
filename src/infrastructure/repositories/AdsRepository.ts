import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';
import { httpClient } from '../api/HttpClient';

// Mapeamento de categorias (slug -> ID)
const CATEGORY_MAP: Record<string, number> = {
  'apartamento': 1,
  'casa': 2,
  'kitnet': 3,
  'quarto': 4,
  'residencial': 5,
  'aluguel': 1, // fallback
  'venda': 1,   // fallback
  'serviço': 5, // fallback
  'outro': 5    // fallback
};

// Mapeamento reverso (ID -> slug)
const ID_TO_CATEGORY: Record<number, string> = {
  1: 'aluguel',
  2: 'aluguel',
  3: 'aluguel',
  4: 'aluguel',
  5: 'outro'
};

const getCategoryId = (category: string): number => {
  const slug = category.toLowerCase();
  return CATEGORY_MAP[slug] || 1; // default: apartamento
};

const getCategoryFromId = (categoryId: number): string => {
  return ID_TO_CATEGORY[categoryId] || 'aluguel';
};

export class AdsRepository implements IAdsRepository {
  async getAll(): Promise<Ad[]> {
    const ads = await httpClient.get<any[]>('/ads');
    return ads.map(ad => ({
      id: ad.id.toString(),
      title: ad.title,
      description: ad.description,
      seller: ad.seller,
      location: ad.location,
      cep: ad.cep,
      price: ad.price,
      category: getCategoryFromId(ad.category_id),
      bedrooms: ad.bedrooms,
      bathrooms: ad.bathrooms,
      rules: ad.rules || [],
      amenities: ad.amenities || [],
      custom_rules: ad.custom_rules,
      custom_amenities: ad.custom_amenities,
      images: ad.images || [],
      status: ad.status,
      postedBy: ad.user_id?.toString() || '',
      created_at: ad.created_at,
      updated_at: ad.updated_at,
    }));
  }

  async getById(id: string): Promise<Ad | null> {
    try {
      const ad = await httpClient.get<any>(`/ads/${id}`);
      return {
        id: ad.id.toString(),
        title: ad.title,
        description: ad.description,
        seller: ad.seller,
        location: ad.location,
        cep: ad.cep,
        price: ad.price,
        category: getCategoryFromId(ad.category_id),
        bedrooms: ad.bedrooms,
        bathrooms: ad.bathrooms,
        rules: ad.rules || [],
        amenities: ad.amenities || [],
        custom_rules: ad.custom_rules,
        custom_amenities: ad.custom_amenities,
        images: ad.images || [],
        status: ad.status,
        postedBy: ad.user_id?.toString() || '',
        created_at: ad.created_at,
        updated_at: ad.updated_at,
      };
    } catch {
      return null;
    }
  }

  async getByUser(userEmail: string): Promise<Ad[]> {
    const ads = await httpClient.get<any[]>('/ads/me');
    return ads.map(ad => ({
      id: ad.id.toString(),
      title: ad.title,
      description: ad.description,
      seller: ad.seller,
      location: ad.location,
      cep: ad.cep,
      price: ad.price,
      category: getCategoryFromId(ad.category_id),
      bedrooms: ad.bedrooms,
      bathrooms: ad.bathrooms,
      rules: ad.rules || [],
      amenities: ad.amenities || [],
      custom_rules: ad.custom_rules,
      custom_amenities: ad.custom_amenities,
      images: ad.images || [],
      status: ad.status,
      postedBy: ad.user_id?.toString() || userEmail || '',
      created_at: ad.created_at,
      updated_at: ad.updated_at,
    }));
  }

  async create(ad: Omit<Ad, 'id'>): Promise<Ad> {
    const created = await httpClient.post<any>('/ads', {
      title: ad.title,
      description: ad.description,
      seller: ad.seller,
      location: ad.location,
      cep: ad.cep,
      price: ad.price,
      category_id: getCategoryId(ad.category),
      bedrooms: ad.bedrooms,
      bathrooms: ad.bathrooms,
      rules: ad.rules || [],
      amenities: ad.amenities || [],
      custom_rules: ad.custom_rules,
      custom_amenities: ad.custom_amenities,
      images: ad.images || [],
      status: ad.status,
    });
    return {
      id: created.id.toString(),
      title: created.title,
      description: created.description,
      seller: created.seller,
      location: created.location,
      cep: created.cep,
      price: created.price,
      category: getCategoryFromId(created.category_id),
      bedrooms: created.bedrooms,
      bathrooms: created.bathrooms,
      rules: created.rules || [],
      amenities: created.amenities || [],
      custom_rules: created.custom_rules,
      custom_amenities: created.custom_amenities,
      images: created.images || [],
      status: created.status,
      postedBy: created.user_id?.toString() || ad.postedBy,
      created_at: created.created_at,
      updated_at: created.updated_at,
    };
  }

  async update(id: string, updates: Partial<Ad>): Promise<Ad | null> {
    try {
      const updated = await httpClient.put<any>(`/ads/${id}`, {
        title: updates.title,
        description: updates.description,
        seller: updates.seller,
        location: updates.location,
        cep: updates.cep,
        price: updates.price,
        category_id: updates.category ? getCategoryId(updates.category) : undefined,
        bedrooms: updates.bedrooms,
        bathrooms: updates.bathrooms,
        rules: updates.rules,
        amenities: updates.amenities,
        custom_rules: updates.custom_rules,
        custom_amenities: updates.custom_amenities,
        images: updates.images,
        status: updates.status,
      });
      return {
        id: updated.id.toString(),
        title: updated.title,
        description: updated.description,
        seller: updated.seller,
        location: updated.location,
        cep: updated.cep,
        price: updated.price,
        category: getCategoryFromId(updated.category_id),
        bedrooms: updated.bedrooms,
        bathrooms: updated.bathrooms,
        rules: updated.rules || [],
        amenities: updated.amenities || [],
        custom_rules: updated.custom_rules,
        custom_amenities: updated.custom_amenities,
        images: updated.images || [],
        status: updated.status,
        postedBy: updated.user_id?.toString() || updates.postedBy || '',
      };
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await httpClient.delete(`/ads/${id}`);
      return true;
    } catch {
      return false;
    }
  }
}