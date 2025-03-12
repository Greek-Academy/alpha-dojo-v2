import { Status, Submission } from '@/domain/entities/submission';
import {
  SubmissionDTO,
  submissionRequiredDTO,
  SubmissionRequiredDTO,
} from './submission-response';
import { SupportedLanguage } from '@/domain/entities/supported-language';
import { ApiJudgeRepository } from '../judge/judge-repository';
import { JudgeUseCase } from '@/usecases/judge-usecase';
import {
  SubmissionFilter,
  SubmissionRepository,
} from '@/domain/repositories/submission-repository';
import { ResultAsync } from 'neverthrow';
import { normalizeError } from '@/lib/err-utils';
import { StrapiError } from '../strapi/strapi-error';
import { fetchStrapiData } from '../strapi/strapi-utils';

export const newSubmissionFromRequiredDTO = async (
  submission: SubmissionRequiredDTO
) => {
  return newSubmissionFromDTO(
    submission,
    submission.attributes.author.data.id.toString(),
    submission.attributes.problem.data.id.toString(),
    submission.attributes.language.data.attributes.name
  );
};

export const newSubmissionFromDTO = async (
  submission: SubmissionDTO,
  authorId: string,
  problemId: string,
  language: SupportedLanguage
) => {
  const judgeRepository = new ApiJudgeRepository();
  const judgeUseCase = new JudgeUseCase(judgeRepository);
  const testResult = await judgeUseCase.getSubmission(
    submission.attributes.test_result_id
  );
  const status: Status = testResult.isOk()
    ? testResult.value.status === 'accepted'
      ? // TODO: レビュー機能を実装
        'FINISHED'
      : 'FAILED'
    : 'PENDING';

  return new Submission(
    submission.id.toString(),
    authorId,
    problemId,
    language,
    submission.attributes.code,
    // TODO: テスト結果取得処理
    status,
    submission.attributes.test_result_id,
    new Date(submission.attributes.createdAt),
    new Date(submission.attributes.updatedAt)
  );
};

export class ApiSubmissionRepository implements SubmissionRepository {
  // TODO: Authorization はログイン時のトークンを使用する
  getSubmissionById = (id: string) =>
    fetchStrapiData<SubmissionRequiredDTO>(
      `/submissions/${id}`,
      submissionRequiredDTO,
      {
        populate: '*',
      },
      process.env.NEXT_PUBLIC_STRAPI_JWT ?? ''
    )
      .andThen((subm) =>
        ResultAsync.fromPromise(
          newSubmissionFromRequiredDTO(subm),
          normalizeError
        ).mapErr(StrapiError.fromUnknown)
      )
      .mapErr((err) => err.toResponseError());

  getSubmissions = (filters?: SubmissionFilter) =>
    fetchStrapiData<SubmissionRequiredDTO[]>(
      '/submissions',
      submissionRequiredDTO.array(),
      {
        populate: '*',
        ...(filters
          ? {
              filters: {
                author: {
                  id: {
                    $eq: filters.authorId
                      ? Number(filters.authorId)
                      : undefined,
                  },
                },
                language: {
                  name: {
                    $eq: filters.language,
                  },
                },
                problem: {
                  id: {
                    $eq: filters.problemId
                      ? Number(filters.problemId)
                      : undefined,
                  },
                },
                test_result_id: {
                  $eq: filters.testResultId,
                },
              },
            }
          : null),
      },
      process.env.NEXT_PUBLIC_STRAPI_JWT ?? ''
    )
      .andThen((subms) =>
        ResultAsync.fromPromise(
          Promise.all(subms.map((subm) => newSubmissionFromRequiredDTO(subm))),
          normalizeError
        ).mapErr(StrapiError.fromUnknown)
      )
      .mapErr((err) => err.toResponseError());
}
