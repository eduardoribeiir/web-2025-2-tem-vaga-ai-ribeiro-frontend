/**
 * Refactored Ads Repository - Uses Mapper for data transformation
 * Single Responsibility: Only handles data persistence logic
 */
import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';
import { httpClient } from '../api/HttpClient';
import { AdMapper, AdDTO } from '../mappers/AdMapper';

export class AdsRepositoryRefactored implements IAdsRepository {
  async getAll(): Promise<Ad[]> {
    const dtos = await httpClient.get<AdDTO[]>('/ads');
    return AdMapper.toDomainList(dtos);
  }

  async getById(id: string): Promise<Ad | null> {
    try {
      const dto = await httpClient.get<AdDTO>(`/ads/${id}`);
      return AdMapper.toDomain(dto);
    } catch {
      return null;
    }
  }

  async getByUser(_userEmail: string): Promise<Ad[]> {
    const dtos = await httpClient.get<AdDTO[]>('/ads/me');
    return AdMapper.toDomainList(dtos);
  }

  async create(ad: Omit<Ad, 'id'>): Promise<Ad> {
    const dto = AdMapper.toDTO(ad);
    const created = await httpClient.post<AdDTO>('/ads', dto);
    return AdMapper.toDomain(created);
  }

  async update(id: string, ad: Partial<Ad>): Promise<Ad> {
    const dto = AdMapper.toDTO({ ...ad, id } as Ad);
    const updated = await httpClient.put<AdDTO>(`/ads/${id}`, dto);
    return AdMapper.toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    await httpClient.delete(`/ads/${id}`);
    return true;
  }

  async updateStatus(id: string, status: string): Promise<Ad> {
    const updated = await httpClient.put<AdDTO>(`/ads/${id}/status?new_status=${status}`, {});
    return AdMapper.toDomain(updated);
  }
}
