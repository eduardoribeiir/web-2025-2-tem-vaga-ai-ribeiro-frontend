/**
 * Refactored Create Ad Use Case - Contains business logic and validation
 * Not just a simple delegation anymore
 */
import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';

export interface CreateAdInput {
  title: string;
  description: string;
  price: number;
  category: string;
  seller?: string;
  location?: string;
  cep?: string;
  bedrooms?: number;
  bathrooms?: number;
  rules?: string[];
  amenities?: string[];
  custom_rules?: string;
  custom_amenities?: string;
  images?: string[];
  status?: string;
}

export class CreateAdUseCaseRefactored {
  constructor(private adsRepository: IAdsRepository) {}

  async execute(input: CreateAdInput): Promise<Ad> {
    // Business validation
    this.validate(input);

    // Build ad entity
    const ad: Omit<Ad, 'id'> = {
      title: input.title.trim(),
      description: input.description.trim(),
      price: input.price,
      category: input.category as 'aluguel' | 'venda' | 'serviço' | 'outro',
      seller: input.seller?.trim() ?? undefined,
      location: input.location?.trim() ?? undefined,
      cep: input.cep?.trim(),
      bedrooms: input.bedrooms,
      bathrooms: input.bathrooms,
      rules: input.rules || [],
      amenities: input.amenities || [],
      custom_rules: input.custom_rules?.trim(),
      custom_amenities: input.custom_amenities?.trim(),
      images: input.images || [],
      status: (input.status || 'published') as 'draft' | 'published' | 'reserved' | 'completed' | 'cancelled',
      postedBy: '', // Will be set by backend
    };

    // Persist
    return await this.adsRepository.create(ad);
  }

  private validate(input: CreateAdInput): void {
    if (!input.title || input.title.trim().length === 0) {
      throw new Error('Title is required');
    }

    if (input.title.length < 10) {
      throw new Error('Title must be at least 10 characters');
    }

    if (input.title.length > 100) {
      throw new Error('Title must not exceed 100 characters');
    }

    if (!input.description || input.description.trim().length === 0) {
      throw new Error('Description is required');
    }

    if (input.description.length < 20) {
      throw new Error('Description must be at least 20 characters');
    }

    if (input.price <= 0) {
      throw new Error('Price must be greater than zero');
    }

    if (input.price > 1000000) {
      throw new Error('Price seems unreasonably high');
    }

    if (input.bedrooms !== undefined && input.bedrooms < 0) {
      throw new Error('Bedrooms cannot be negative');
    }

    if (input.bathrooms !== undefined && input.bathrooms < 0) {
      throw new Error('Bathrooms cannot be negative');
    }

    if (input.images && input.images.length > 5) {
      throw new Error('Maximum 5 images allowed');
    }
  }
}
