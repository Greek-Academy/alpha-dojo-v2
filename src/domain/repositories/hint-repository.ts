import { ResultAsync } from 'neverthrow';
import { Hint } from '../entities/hint';
import { ResponseError } from '../entities/error';

export interface HintFilters {
  problemId?: string;
}

export interface HintRepository {
  getHintById: (id: string) => ResultAsync<Hint, ResponseError>;
  getHints: (filters?: HintFilters) => ResultAsync<Hint[], ResponseError>;
}
