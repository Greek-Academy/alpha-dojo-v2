import { ResponseError } from '@/domain/entities/error';
import { Hint } from '@/domain/entities/hint';
import { HintRepository } from '@/domain/repositories/hint-repository';
import { err, ok } from 'neverthrow';
import { HintUseCase } from '../hint-usecase';

jest.mock('@/domain/repositories/hint-repository');

const mockHints: Hint[] = [
  new Hint('hint-1', 3, 'example hint 1', new Date(), new Date()),
  new Hint('hint-2', 12, 'example hint 2', new Date(), new Date()),
  new Hint('hint-3', 8, 'example hint 3', new Date(), new Date()),
  new Hint('hint-4', 8, 'example hint 4', new Date(), new Date()),
  new Hint('hint-5', 6, 'example hint 5', new Date(), new Date()),
];

describe('HintUseCase', () => {
  let mockHintRepository: jest.Mocked<HintRepository>;
  let hintUseCase: HintUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    mockHintRepository = {
      getHintById: jest.fn().mockImplementation((id: string) => {
        const matched = mockHints.filter((hint) => hint.id === id);
        return matched.length > 0
          ? ok(matched[0])
          : err(new ResponseError('Not Found', 'not-found'));
      }),

      getHints: jest.fn().mockReturnValue(ok(mockHints)),
    };

    hintUseCase = new HintUseCase(mockHintRepository);
  });

  it('should return a hint', async () => {
    const hint = await hintUseCase.fetchHintById('hint-2');
    expect(hint.isOk() && hint.value.id).toBe('hint-2');
    expect(mockHintRepository.getHintById).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception (hint not found)', async () => {
    const hint = await hintUseCase.fetchHintById('hint-0');
    expect(hint.isErr() && hint.error.errorCode).toBe('not-found');
    expect(mockHintRepository.getHintById).toHaveBeenCalledTimes(1);
  });

  it('should return sorted hints', async () => {
    const hints = await hintUseCase.fetchHints({
      problemId: 'exampleProblemId',
    });
    expect(hints.isOk() && hints.value.map((hint) => hint.id)).toStrictEqual([
      'hint-1',
      'hint-5',
      'hint-3',
      'hint-4',
      'hint-2',
    ]);
    expect(mockHintRepository.getHints).toHaveBeenCalledTimes(1);
  });
});
