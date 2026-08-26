import type { Locale } from '../entities/locale.ts';
import type {
  Dictionary,
  TranslationRepository,
} from '../interfaces/translation-repository.interface.ts';

export class GetDictionaryUseCase {
  constructor(private readonly repository: TranslationRepository) {}

  execute(locale: Locale): Promise<Dictionary> {
    return this.repository.getDictionary(locale);
  }
}
