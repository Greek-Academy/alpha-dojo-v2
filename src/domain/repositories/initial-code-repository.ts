import { InitialCode } from '@/domain/entities/initial-code';
import { Language } from '../entities/language';
import { ResultAsync } from 'neverthrow';
import { ResponseError } from '../entities/error';

export interface InitialCodeFilters {
  problemId?: string;
  language?: Language;
}

export interface InitialCodeRepository {
  getInitialCodeById: (id: string) => ResultAsync<InitialCode, ResponseError>;
  getInitialCodes: (
    filters?: InitialCodeFilters
  ) => ResultAsync<InitialCode[], ResponseError>;
}
