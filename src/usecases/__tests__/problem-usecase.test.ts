import { ProblemUseCase } from '@/usecases/problem-usecase';
import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { errAsync, okAsync } from 'neverthrow';
import { ResponseError } from '@/domain/entities/error';

jest.mock('@/domain/repositories/problem-repository');

describe('ProblemUseCase', () => {
  let mockProblemRepository: jest.Mocked<ProblemRepository>;
  let problemUseCase: ProblemUseCase;

  const mockProblems: Problem[] = [
    new Problem(
      '1',
      'title',
      'description',
      'Easy',
      'constraints',
      new Date(),
      new Date()
    ),
    new Problem(
      '2',
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
      getAllProblems: jest.fn().mockReturnValue(okAsync(mockProblems)),
      getProblemById: jest.fn().mockImplementation((id: string) => {
        const problem = mockProblems[Number(id) - 1];
        if (!problem)
          // not found
          return errAsync(new ResponseError('Not Found', 'not-found'));

        return okAsync(problem);
      }),
    };
    problemUseCase = new ProblemUseCase(mockProblemRepository);
  });

  it('should return all problems', async () => {
    const problems = await problemUseCase.fetchAllProblems();
    expect(problems.isOk()).toBe(true);
    expect(problems.isOk() && problems.value.length).toBe(2);
    expect(mockProblemRepository.getAllProblems).toHaveBeenCalledTimes(1);
  });

  it('should return a problem', async () => {
    const problem = await problemUseCase.fetchProblemById('1');
    expect(problem.isOk() && problem.value.id).toBe('1');
    expect(mockProblemRepository.getProblemById).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception (problem not found)', async () => {
    const problem = await problemUseCase.fetchProblemById('3');
    expect(problem.isErr() && problem.error.errorCode).toBe('not-found');
    expect(mockProblemRepository.getProblemById).toHaveBeenCalledTimes(1);
  });
});
