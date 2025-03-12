import { JudgeRepository } from '@/domain/repositories/judge-repository';
import { JudgeUseCase } from '../judge-usecase';
import { TestResult } from '@/domain/entities/test-result';
import { okAsync } from 'neverthrow';

jest.mock('@/domain/repositories/judge-repository');

describe('JudgeUseCase', () => {
  let mockJudgeRepository: jest.Mocked<JudgeRepository>;
  let judgeUseCase: JudgeUseCase;

  const mockToken: string = 'valid token';

  const mockTestResult: TestResult = new TestResult(
    '1',
    'hello, world\n',
    1,
    376,
    null,
    null,
    'accepted',
    new Date(),
    new Date()
  );

  beforeEach(() => {
    jest.clearAllMocks();

    mockJudgeRepository = {
      createSubmission: jest.fn().mockReturnValue(okAsync(mockToken)),
      getSubmission: jest.fn().mockReturnValue(okAsync(mockTestResult)),
    };
    judgeUseCase = new JudgeUseCase(mockJudgeRepository);
  });

  it('should return submission token', async () => {
    const submissionToken = await judgeUseCase.createSubmission(
      'TYPESCRIPT',
      'valid source code',
      'valid stdin'
    );
    expect(submissionToken.isOk()).toBe(true);
    expect(submissionToken.isOk() && submissionToken.value).toBe(mockToken);
    expect(mockJudgeRepository.createSubmission).toHaveBeenCalledTimes(1);
  });

  it('should return test result', async () => {
    const testResult = await judgeUseCase.getSubmission(mockToken);
    expect(testResult.isOk()).toBe(true);
    expect(testResult.isOk() && testResult.value.id).toBe('1');
    expect(mockJudgeRepository.getSubmission).toHaveBeenCalledTimes(1);
  });
});
