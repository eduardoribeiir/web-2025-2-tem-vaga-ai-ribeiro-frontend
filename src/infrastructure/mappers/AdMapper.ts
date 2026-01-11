/**
 * Ad Mapper - Separates data transformation logic from repository
 * Single Responsibility Principle: Only handles data mapping
 */
import { Ad } from '../../domain/entities/Ad';

export interface AdDTO {
  id: number;
  title: string;
  description: string;
  seller?: string;
  location?: string;
  cep?: string;
  price: number;
  category_id: number;
  bedrooms?: number;
  bathrooms?: number;
  rules?: string[];
  amenities?: string[];
  custom_rules?: string;
  custom_amenities?: string;
  images?: string[];
  status: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}

// Category mapping (should be moved to a separate service/config)
const CATEGORY_MAP: Record<string, number> = {
  'apartamento': 1,
  'casa': 2,
  'kitnet': 3,
  'quarto': 4,
  'residencial': 5,
  'aluguel': 1,
  'venda': 1,
  'serviço': 5,
  'outro': 5
};

const ID_TO_CATEGORY: Record<number, string> = {
  1: 'aluguel',
  2: 'aluguel',
  3: 'aluguel',
  4: 'aluguel',
  5: 'outro'
};

export class AdMapper {
  /**
   * Map API DTO to domain entity
   */
  static toDomain(dto: AdDTO): Ad {
    return {
      id: dto.id.toString(),
      title: dto.title,
      description: dto.description,
      seller: dto.seller ?? undefined,
      location: dto.location ?? undefined,
      cep: dto.cep,
      price: dto.price,
      category: this.getCategoryFromId(dto.category_id) as 'aluguel' | 'venda' | 'serviço' | 'outro',
      bedrooms: dto.bedrooms,
      bathrooms: dto.bathrooms,
      rules: dto.rules || [],
      amenities: dto.amenities || [],
      custom_rules: dto.custom_rules,
      custom_amenities: dto.custom_amenities,
      images: dto.images || [],
      status: dto.status as 'draft' | 'published' | 'reserved' | 'completed' | 'cancelled' | undefined,
      postedBy: dto.user_id?.toString() || '',
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
  }

  /**
   * Map domain entity to API DTO
   */
  static toDTO(ad: Omit<Ad, 'id'> & { id?: string }): Partial<AdDTO> {
    return {
      id: ad.id ? parseInt(ad.id) : undefined,
      title: ad.title,
      description: ad.description,
      seller: ad.seller,
      location: ad.location,
      cep: ad.cep,
      price: ad.price,
      category_id: this.getCategoryId(ad.category),
      bedrooms: ad.bedrooms,
      bathrooms: ad.bathrooms,
      rules: ad.rules || [],
      amenities: ad.amenities || [],
      custom_rules: ad.custom_rules,
      custom_amenities: ad.custom_amenities,
      images: ad.images || [],
      status: ad.status,
    };
  }

  /**
   * Map array of DTOs to domain entities
   */
  static toDomainList(dtos: AdDTO[]): Ad[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  private static getCategoryId(category: string): number {
    const slug = category.toLowerCase();
    return CATEGORY_MAP[slug] || 1;
  }

  private static getCategoryFromId(categoryId: number): string {
    return ID_TO_CATEGORY[categoryId] || 'aluguel';
  }
}
