import { ResponseError } from '@/domain/entities/error';
import { Problem } from '@/domain/entities/problem';
import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { ResultAsync } from 'neverthrow';

export class ProblemUseCase {
  constructor(private readonly problemRepository: ProblemRepository) {}

  getAllProblems: () => ResultAsync<Problem[], ResponseError> = this.problemRepository.getProblems;
}
