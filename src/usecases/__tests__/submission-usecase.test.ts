import {
  SubmissionFilters,
  SubmissionRepository,
} from '@/domain/repositories/submission-repository';
import { getSubmissionStatus, SubmissionUseCase } from '../submission-usecase';
import { Submission, SubmissionToCreate } from '@/domain/entities/submission';
import { errAsync, okAsync } from 'neverthrow';
import { ResponseError } from '@/domain/entities/error';
import { TestResult } from '@/domain/entities/test-result';

jest.mock('@/domain/repositories/submission-repository');

const mockSubms: Submission[] = [
  new Submission(
    'submission-1',
    'user-1',
    'problem-1',
    'TYPESCRIPT',
    'exampleCode-1',
    true,
    true,
    'test-result-1',
    new Date(),
    new Date()
  ),
  new Submission(
    'submission-2',
    'user-2',
    'problem-2',
    'PYTHON',
    'exampleCode-2',
    true,
    false,
    'test-result-2',
    new Date(),
    new Date()
  ),
  new Submission(
    'submission-3',
    'user-2',
    'problem-1',
    'TYPESCRIPT',
    'exampleCode-3',
    false,
    false,
    'test-result-3',
    new Date(),
    new Date()
  ),
];

const mockTestResults: TestResult[] = [
  new TestResult('', '', 0, 0, '', '', 'accepted', new Date(), new Date()),
  new TestResult(
    '',
    '',
    0,
    0,
    '',
    '',
    'compilation-error',
    new Date(),
    new Date()
  ),
];

describe('SubmissionUseCase', () => {
  let mockSubmRepository: jest.Mocked<SubmissionRepository>;
  let submUseCase: SubmissionUseCase;

  const mockSubmToCreate: SubmissionToCreate = new SubmissionToCreate(
    'user-3',
    'problem-3',
    'TYPESCRIPT',
    'exampleCode-4'
  );

  beforeEach(() => {
    jest.clearAllMocks();

    mockSubmRepository = {
      getSubmissionById: jest.fn().mockImplementation((id: string) => {
        const matched = mockSubms.filter((subm) => subm.id === id);
        return matched.length === 1
          ? okAsync(mockSubms.filter((subm) => subm.id === id)[0])
          : errAsync(new ResponseError('Not Found', 'not-found'));
      }),

      getSubmissions: jest
        .fn()
        .mockImplementation((filters?: SubmissionFilters) =>
          okAsync(
            mockSubms.filter(
              (subm) =>
                filters === undefined ||
                ((filters.authorId === undefined ||
                  subm.authorId === filters.authorId) &&
                  (filters.language === undefined ||
                    subm.language === filters.language) &&
                  (filters.problemId === undefined ||
                    subm.problemId === filters.problemId) &&
                  (filters.testResultId === undefined ||
                    subm.problemId === filters.problemId))
            )
          )
        ),

      postSubmission: jest
        .fn()
        .mockImplementation((subm: SubmissionToCreate) =>
          okAsync(
            new Submission(
              'submission-4',
              subm.authorId,
              subm.problemId,
              subm.language,
              subm.codeText,
              true,
              true,
              'test-result-4',
              new Date(),
              new Date()
            )
          )
        ),
    };
    submUseCase = new SubmissionUseCase(mockSubmRepository);
  });

  it('should return a submission', async () => {
    const subm = await submUseCase.fetchSubmissionById('submission-1');
    expect(subm.isOk() && subm.value.id).toBe('submission-1');
    expect(mockSubmRepository.getSubmissionById).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception (submission not found)', async () => {
    const subm = await submUseCase.fetchSubmissionById('submission-0');
    expect(subm.isErr() && subm.error.errorCode).toBe('not-found');
    expect(mockSubmRepository.getSubmissionById).toHaveBeenCalledTimes(1);
  });

  it('should return all submissions', async () => {
    const subms = await submUseCase.fetchSubmissions();
    expect(subms.isOk() && subms.value.length).toBe(3);
    expect(mockSubmRepository.getSubmissions).toHaveBeenCalledTimes(1);
  });

  it('should return submissions based on filters', async () => {
    const subms = await submUseCase.fetchSubmissions({
      authorId: 'user-2',
      problemId: 'problem-1',
    });
    expect(subms.isOk() && subms.value.length).toBe(1);
    expect(mockSubmRepository.getSubmissions).toHaveBeenCalledTimes(1);
  });

  it('should return submissions based on filters', async () => {
    const subms = await submUseCase.fetchSubmissions({
      language: 'TYPESCRIPT',
    });
    expect(subms.isOk() && subms.value.length).toBe(2);
    expect(mockSubmRepository.getSubmissions).toHaveBeenCalledTimes(1);
  });

  it('should return no submissions', async () => {
    const subms = await submUseCase.fetchSubmissions({
      authorId: 'user-2',
      testResultId: 'test-result-1',
    });
    expect(subms.isOk() && subms.value.length).toBe(0);
    expect(mockSubmRepository.getSubmissions).toHaveBeenCalledTimes(1);
  });

  it('should return a new submission', async () => {
    const subm = await submUseCase.postSubmission(mockSubmToCreate);
    expect(subm.isOk() && subm.value.authorId).toBe('user-3');
    expect(mockSubmRepository.postSubmission).toHaveBeenCalledTimes(1);
  });
});

describe('getSubmissionStatus', () => {
  it('should return FAILED', () => {
    const status = getSubmissionStatus(mockSubms[0], mockTestResults[1]);
    expect(status).toBe('FAILED');
  });

  it('should return IN_REVIEW', () => {
    const status = getSubmissionStatus(mockSubms[2], mockTestResults[0]);
    expect(status).toBe('IN_REVIEW');
  });

  it('should return REVIEWED', () => {
    const status = getSubmissionStatus(mockSubms[1], mockTestResults[0]);
    expect(status).toBe('REVIEWED');
  });

  it('should return FINISHED', () => {
    const status = getSubmissionStatus(mockSubms[0], mockTestResults[0]);
    expect(status).toBe('FINISHED');
  });
});
