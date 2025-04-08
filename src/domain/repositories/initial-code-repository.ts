import { InitialCode } from '@/domain/entities/initial-code';
import { SupportedLanguage } from '../entities/supported-language';
import { ResultAsync } from 'neverthrow';
import { ResponseError } from '../entities/error';

export interface InitialCodeFilters {
  problemId?: string;
  language?: SupportedLanguage;
}

export interface InitialCodeRepository {
  getInitialCodeById: (id: string) => ResultAsync<InitialCode, ResponseError>;
  getInitialCodes: (
    filters?: InitialCodeFilters
  ) => ResultAsync<InitialCode[], ResponseError>;
}
