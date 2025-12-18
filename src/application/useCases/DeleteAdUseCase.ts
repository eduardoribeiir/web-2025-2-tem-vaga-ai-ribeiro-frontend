import { IAdsRepository } from '../../domain/repositories/IAdsRepository';

export class DeleteAdUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.adsRepository.delete(id);
  }
}
