import { ProblemUseCase } from '@/usecases/problem-usecase';
import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ResultAsync } from 'neverthrow';
import { ResponseError } from '@/domain/entities/error';

jest.mock('@/domain/repositories/problem-repository');

describe('ProblemUseCase', () => {
  let mockProblemRepository: jest.Mocked<ProblemRepository>;
  let problemUseCase: ProblemUseCase;

  const mockProblems: Problem[] = [
    new Problem(
      1,
      'title',
      'description',
      'Easy',
      'constraints',
      new Date(),
      new Date()
    ),
    new Problem(
      2,
      'title2',
      'description',
      'Medium',
      'constraints',
      new Date(),
      new Date()
    ),
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockProblemRepository = {
      getProblems: jest.fn().mockImplementation(() =>
        ResultAsync.fromPromise(
          new Promise((resolve) => {
            resolve(mockProblems);
          }),
          () => new ResponseError('mock error', 'unknown')
        )
      ),
    };
    problemUseCase = new ProblemUseCase(mockProblemRepository);
  });

  it('should return all problems', async () => {
    const problems = await problemUseCase.getAllProblems();
    expect(problems.isOk()).toBe(true);
    expect(problems.isOk() && problems.value.length).toBe(2);
    expect(mockProblemRepository.getProblems).toHaveBeenCalledTimes(1);
  });
});
