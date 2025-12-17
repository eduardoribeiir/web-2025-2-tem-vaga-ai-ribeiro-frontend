import { AdsRepository } from './AdsRepository';

// Instância única para compartilhar estado (incluindo persistência em localStorage)
export const adsRepositoryInstance = new AdsRepository();
