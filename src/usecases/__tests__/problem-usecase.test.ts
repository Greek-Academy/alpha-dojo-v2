import { ProblemUseCase } from '@/usecases/problem-usecase';
import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';

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

  const mockAuthToken: string = 'authToken';

  beforeEach(() => {
    jest.clearAllMocks();

    mockProblemRepository = {
      getProblems: jest.fn().mockImplementation(async (authToken: string) => {
        if (authToken !== mockAuthToken)
          // Invalid AuthToken
          throw new TypeError();

        return mockProblems;
      }),
      getProblem: jest
        .fn()
        .mockImplementation(async (id: number, authToken: string) => {
          if (authToken !== mockAuthToken)
            // invalid authToken
            throw new TypeError();

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
    const problems = await problemUseCase.getAllProblems(mockAuthToken);
    expect(problems.length).toBe(2);
    expect(mockProblemRepository.getProblems).toHaveBeenCalledTimes(1);
  });

  it('should throw TypeError (invalid authToken)', async () => {
    await expect(problemUseCase.getAllProblems('')).rejects.toThrow(
      new TypeError()
    );
  });

  it('should return a problem', async () => {
    const problem = await problemUseCase.getProblem(1, mockAuthToken);
    expect(problem).toBe(mockProblems[0]);
    expect(mockProblemRepository.getProblem).toHaveBeenCalledTimes(1);
  });

  it('should throw TypeError (invalid authToken)', async () => {
    await expect(problemUseCase.getProblem(1, '')).rejects.toThrow(
      new TypeError()
    );
  });

  it('should throw TypeError (not found)', async () => {
    await expect(problemUseCase.getProblem(3, mockAuthToken)).rejects.toThrow(
      new TypeError()
    );
  });
});
