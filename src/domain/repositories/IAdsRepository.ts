import { Ad } from '../entities/Ad';

export interface IAdsRepository {
  getAll(): Promise<Ad[]>;
  getById(id: string): Promise<Ad | null>;
  getByUser(userEmail: string): Promise<Ad[]>;
  create(ad: Omit<Ad, 'id'>): Promise<Ad>;
  update(id: string, ad: Partial<Ad>): Promise<Ad | null>;
  delete(id: string): Promise<boolean>;
}