import { InitialCode } from '@/domain/entities/initial-code';
import { python, typescript } from '@/domain/entities/language';
import {
  InitialCodeFilters,
  InitialCodeRepository,
} from '@/domain/repositories/initial-code-repository';
import { InitialCodeUseCase } from '../initial-code-usecase';
import { errAsync, okAsync } from 'neverthrow';
import { ResponseError } from '@/domain/entities/error';

jest.mock('@/domain/repositories/initial-code-repository');

const mockInitialCodes: InitialCode[] = [
  new InitialCode(
    'initial-code-1',
    typescript,
    'example-code-1',
    new Date(),
    new Date()
  ),
  new InitialCode(
    'initial-code-2',
    typescript,
    'example-code-2',
    new Date(),
    new Date()
  ),
  new InitialCode(
    'initial-code-3',
    python,
    'example-code-3',
    new Date(),
    new Date()
  ),
];

describe('InitialCodeUseCase', () => {
  let mockInitialCodeRepository: jest.Mocked<InitialCodeRepository>;
  let initialCodeUseCase: InitialCodeUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    mockInitialCodeRepository = {
      getInitialCodeById: jest.fn().mockImplementation((id: string) => {
        const matched = mockInitialCodes.filter(
          (initialCode) => initialCode.id === id
        );
        return matched.length === 1
          ? okAsync(matched[0])
          : errAsync(new ResponseError('Not Found', 'not-found'));
      }),

      getInitialCodes: jest
        .fn()
        .mockImplementation((filters?: InitialCodeFilters) =>
          okAsync(
            mockInitialCodes.filter(
              (initialCode) =>
                filters?.language === undefined ||
                initialCode.language === filters.language
            )
          )
        ),
    };
    initialCodeUseCase = new InitialCodeUseCase(mockInitialCodeRepository);
  });

  it('should return a initialCode', async () => {
    const initialCodeId = mockInitialCodes[0].id;
    const initialCodeResponse =
      await initialCodeUseCase.fetchInitialCodeById(initialCodeId);
    expect(initialCodeResponse.isOk() && initialCodeResponse.value.id).toBe(
      initialCodeId
    );
    expect(mockInitialCodeRepository.getInitialCodeById).toHaveBeenCalledTimes(
      1
    );
  });

  it('should throw an exception (initialCode not found)', async () => {
    const initialCodeResponse =
      await initialCodeUseCase.fetchInitialCodeById('invalid-id');
    expect(
      initialCodeResponse.isErr() && initialCodeResponse.error.errorCode
    ).toBe('not-found');
    expect(mockInitialCodeRepository.getInitialCodeById).toHaveBeenCalledTimes(
      1
    );
  });

  it('should return all initialCodes', async () => {
    const initialCodesResponse = await initialCodeUseCase.fetchInitialCodes();
    expect(
      initialCodesResponse.isOk() && initialCodesResponse.value.length
    ).toBe(mockInitialCodes.length);
    expect(mockInitialCodeRepository.getInitialCodes).toHaveBeenCalledTimes(1);
  });

  it('should return initialCodes based on filters', async () => {
    const initialCodesResponse = await initialCodeUseCase.fetchInitialCodes({
      language: typescript,
    });
    expect(
      initialCodesResponse.isOk() && initialCodesResponse.value.length
    ).toBe(2);
    expect(mockInitialCodeRepository.getInitialCodes).toHaveBeenCalledTimes(1);
  });
});
