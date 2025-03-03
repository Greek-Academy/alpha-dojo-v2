import { TestCase } from '@/domain/entities/test-case';
import { TestCaseDTO } from '../dto/test-case-dto';

export const newTestCaseFromDTO = (
  testCase: TestCaseDTO,
  problemId: string
) => {
  return new TestCase(
    testCase.id.toString(),
    problemId,
    testCase.attributes.arguments,
    testCase.attributes.expect,
    new Date(testCase.attributes.createdAt),
    new Date(testCase.attributes.updatedAt)
  );
};
