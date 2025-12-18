import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';
import { httpClient } from '../api/HttpClient';

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
      category: ad.category,
      bedrooms: ad.bedrooms,
      bathrooms: ad.bathrooms,
      rules: ad.rules || [],
      amenities: ad.amenities || [],
      custom_rules: ad.custom_rules,
      custom_amenities: ad.custom_amenities,
      images: ad.images || [],
      status: ad.status,
      postedBy: ad.user_id?.toString() || '',
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
        category: ad.category,
        bedrooms: ad.bedrooms,
        bathrooms: ad.bathrooms,
        rules: ad.rules || [],
        amenities: ad.amenities || [],
        custom_rules: ad.custom_rules,
        custom_amenities: ad.custom_amenities,
        images: ad.images || [],
        status: ad.status,
        postedBy: ad.user_id?.toString() || '',
      };
    } catch {
      return null;
    }
  }

  async getByUser(userEmail: string): Promise<Ad[]> {
    const ads = await httpClient.get<any[]>('/users/me/ads');
    return ads.map(ad => ({
      id: ad.id.toString(),
      title: ad.title,
      description: ad.description,
      seller: ad.seller,
      location: ad.location,
      cep: ad.cep,
      price: ad.price,
      category: ad.category,
      bedrooms: ad.bedrooms,
      bathrooms: ad.bathrooms,
      rules: ad.rules || [],
      amenities: ad.amenities || [],
      custom_rules: ad.custom_rules,
      custom_amenities: ad.custom_amenities,
      images: ad.images || [],
      status: ad.status,
      postedBy: ad.user_id?.toString() || userEmail || '',
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
      category: ad.category,
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
      category: created.category,
      bedrooms: created.bedrooms,
      bathrooms: created.bathrooms,
      rules: created.rules || [],
      amenities: created.amenities || [],
      custom_rules: created.custom_rules,
      custom_amenities: created.custom_amenities,
      images: created.images || [],
      status: created.status,
      postedBy: created.user_id?.toString() || ad.postedBy,
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
        category: updates.category,
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
        category: updated.category,
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