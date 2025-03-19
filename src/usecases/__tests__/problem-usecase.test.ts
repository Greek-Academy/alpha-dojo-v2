import { ProblemUseCase } from '@/usecases/problem-usecase';
import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { okAsync } from 'neverthrow';

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
      getProblemById: jest.fn().mockImplementation(async (id: number) => {
        const problem = mockProblems[id - 1];
        if (!problem)
          // not found
          throw new TypeError();

        return problem;
      }),
    };
    problemUseCase = new ProblemUseCase(mockProblemRepository);
  });

  it('should return all problems', async () => {
    const problems = await problemUseCase.getAllProblems();
    expect(problems.isOk()).toBe(true);
    expect(problems.isOk() && problems.value.length).toBe(2);
    expect(mockProblemRepository.getAllProblems).toHaveBeenCalledTimes(1);
  });

  it('should return a problem', async () => {
    const problem = await problemUseCase.getProblemById(1);
    expect(problem).toBe(mockProblems[0]);
    expect(mockProblemRepository.getProblemById).toHaveBeenCalledTimes(1);
  });

  it('should throw TypeError (not found)', async () => {
    await expect(problemUseCase.getProblemById(3)).rejects.toThrow(
      new TypeError()
    );
  });
});
